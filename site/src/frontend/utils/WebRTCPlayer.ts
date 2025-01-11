// Forked from https://github.com/Eyevinn/webrtc-player/blob/main/src/index.ts
// To fix reconnect events and correctly re-create srcObject on reconnect

import EventEmitter from "events";
import { type Adapter, WHEPAdapter } from "./WHEPAdapter";

enum Message {
  NO_MEDIA = "no-media",
  MEDIA_RECOVERED = "media-recovered",
  PEER_CONNECTION_FAILED = "peer-connection-failed",
  PEER_CONNECTION_CONNECTED = "peer-connection-connected",
  INITIAL_CONNECTION_FAILED = "initial-connection-failed",
  CONNECT_ERROR = "connect-error",
  PLAYER_MUTED = "player-muted",
  PLAYER_UNMUTED = "player-unmuted",
}

export type MediaConstraints = {
  audioOnly?: boolean;
  videoOnly?: boolean;
};

const MediaConstraintsDefaults: MediaConstraints = {
  audioOnly: false,
  videoOnly: false,
};

type WebRTCPlayerOptions = {
  video: HTMLVideoElement;
  iceServers?: RTCIceServer[];
  debug?: boolean;
  vmapUrl?: string;
  statsTypeFilter?: string; // regexp
  detectTimeout?: boolean;
  timeoutThreshold?: number;
  mediaConstraints?: MediaConstraints;
};

const RECONNECT_ATTEMPTS = 2;

export class WebRTCPlayer extends EventEmitter {
  private videoElement: HTMLVideoElement;
  private peer: RTCPeerConnection | null = null;
  private iceServers: RTCIceServer[];
  private debug: boolean;
  private channelUrl: URL | null = null;
  private authKey?: string = undefined;
  private reconnectAttemptsLeft: number = RECONNECT_ATTEMPTS;
  private adapter: Adapter | null = null;
  private statsInterval: ReturnType<typeof setInterval> | undefined;
  private statsTypeFilter: string | undefined = undefined;
  private msStatsInterval = 5000;
  private mediaTimeoutOccured = false;
  private mediaTimeoutThreshold = 30000;
  private timeoutThresholdCounter = 0;
  private bytesReceived = 0;
  private mediaConstraints: MediaConstraints;

  constructor(opts: WebRTCPlayerOptions) {
    super();
    this.mediaConstraints = {
      ...MediaConstraintsDefaults,
      ...opts.mediaConstraints,
    };
    this.videoElement = opts.video;
    this.statsTypeFilter = opts.statsTypeFilter;
    this.mediaTimeoutThreshold =
      opts.timeoutThreshold ?? this.mediaTimeoutThreshold;

    this.iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
    if (opts.iceServers) {
      this.iceServers = opts.iceServers;
    }
    this.debug = !!opts.debug;
    this.videoElement.addEventListener("volumechange", () => {
      if (this.videoElement.muted) {
        this.emit(Message.PLAYER_MUTED);
      } else {
        this.emit(Message.PLAYER_UNMUTED);
      }
    });
  }

  async load(channelUrl: URL, authKey: string | undefined = undefined) {
    this.channelUrl = channelUrl;
    this.authKey = authKey;
    await this.connect();
  }

  private log(...args: unknown[]) {
    if (this.debug) {
      console.log("WebRTC-player", ...args);
    }
  }

  private error(...args: unknown[]) {
    console.error("WebRTC-player", ...args);
  }

  private async onConnectionStateChange() {
    if (this.peer?.connectionState === "failed") {
      this.emit(Message.PEER_CONNECTION_FAILED);
      this.peer.close();

      if (this.reconnectAttemptsLeft <= 0) {
        this.error("Connection failed, reconnecting failed");
        return;
      }

      this.log(
        `Connection failed, recreating peer connection, attempts left ${this.reconnectAttemptsLeft}`,
      );
      await this.connect();
      this.reconnectAttemptsLeft--;
    } else if (this.peer?.connectionState === "connected") {
      this.log("Connected");
      this.emit(Message.PEER_CONNECTION_CONNECTED);
      this.reconnectAttemptsLeft = RECONNECT_ATTEMPTS;
    }
  }

  private onErrorHandler(error: string) {
    this.log(`onError=${error}`);
    switch (error) {
      case "reconnectneeded":
        this.peer && this.peer.close();
        this.videoElement.srcObject = null;
        this.setupPeer();
        this.peer && this.adapter?.resetPeer(this.peer);
        this.adapter?.connect().catch((err: unknown) => {
          this.error(err);
        });
        break;
      case "connectionfailed":
        this.peer && this.peer.close();
        this.videoElement.srcObject = null;
        this.emit(Message.INITIAL_CONNECTION_FAILED);
        break;
      case "connecterror":
        this.peer && this.peer.close();
        this.peer && this.adapter?.resetPeer(this.peer);
        this.emit(Message.CONNECT_ERROR);
        break;
    }
  }

  private async onConnectionStats() {
    if (this.peer && this.statsTypeFilter) {
      let bytesReceivedBlock = 0;
      const stats = await this.peer.getStats(null);

      stats.forEach((report: { type: string; bytesReceived: number }) => {
        if (!this.statsTypeFilter || report.type.match(this.statsTypeFilter)) {
          this.emit(`stats:${report.type}`, report);
        }

        //inbound-rtp attribute bytesReceived from stats report will contain the total number of bytes received for this SSRC.
        //In this case there are several SSRCs. They are all added together in each onConnectionStats iteration and compared to their value during the previous iteration.
        if (report.type.match("inbound-rtp")) {
          bytesReceivedBlock += report.bytesReceived;
        }
      });

      if (bytesReceivedBlock <= this.bytesReceived) {
        this.timeoutThresholdCounter += this.msStatsInterval;

        if (
          !this.mediaTimeoutOccured &&
          this.timeoutThresholdCounter >= this.mediaTimeoutThreshold
        ) {
          this.emit(Message.NO_MEDIA);
          this.mediaTimeoutOccured = true;
        }
      } else {
        this.bytesReceived = bytesReceivedBlock;
        this.timeoutThresholdCounter = 0;

        if (this.mediaTimeoutOccured) {
          this.emit(Message.MEDIA_RECOVERED);
          this.mediaTimeoutOccured = false;
        }
      }
    }
  }

  private setupPeer() {
    this.peer = new RTCPeerConnection({ iceServers: this.iceServers });
    this.peer.onconnectionstatechange = this.onConnectionStateChange.bind(this);
    this.peer.ontrack = this.onTrack.bind(this);
  }

  private onTrack(event: RTCTrackEvent) {
    for (const stream of event.streams) {
      if (stream.id === "feedbackvideomslabel") {
        continue;
      }

      console.log(
        "Set video element remote stream to " + stream.id,
        " audio " +
          String(stream.getAudioTracks().length) +
          " video " +
          String(stream.getVideoTracks().length),
      );

      console.log("Creating new srcObject");
      this.videoElement.srcObject = new MediaStream();

      // We might have one stream of both audio and video, or separate streams for audio and video
      for (const track of stream.getTracks()) {
        console.log("Adding track", track);
        this.videoElement.srcObject.addTrack(track);
      }
    }
  }

  private async connect() {
    this.setupPeer();

    if (!this.peer) {
      throw new Error("missing peer");
    }

    if (!this.channelUrl) {
      throw new Error("missing channelUrl");
    }

    this.adapter = new WHEPAdapter(
      this.peer,
      this.channelUrl,
      this.onErrorHandler.bind(this),
      this.mediaConstraints,
      this.authKey,
    );

    if (this.debug) {
      this.adapter.enableDebug();
    }

    this.statsInterval = setInterval(() => {
      this.onConnectionStats().catch((err: unknown) => {
        this.error(err);
      });
    }, this.msStatsInterval);
    try {
      await this.adapter.connect();
    } catch (error) {
      console.error(error);
      this.stop();
    }
  }

  mute() {
    this.videoElement.muted = true;
  }

  unmute() {
    this.videoElement.muted = false;
  }

  async unload() {
    await this.adapter?.disconnect();
    this.stop();
  }

  stop() {
    clearInterval(this.statsInterval);
    this.peer?.close();
    this.videoElement.srcObject = null;
    this.videoElement.load();
  }

  destroy() {
    this.stop();
    this.removeAllListeners();
  }
}
