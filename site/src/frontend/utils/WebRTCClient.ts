const RETRY_INTERVAL_MIN = 1000;
const RETRY_INTERVAL_BACKOFF_BASE = 1.5;
const RETRY_COUNT = 12;

export type WebRTCClientState =
  | "connecting"
  | "connected"
  | "disconnected"
  | "wait-reconnect";

type WebRTCClientOpts = {
  mediaElement: HTMLMediaElement;
  whepUrl: string;
  onStateChange: (state: WebRTCClientState) => void;
};

type OfferData = {
  iceUfrag: string;
  icePwd: string;
  medias: string[];
};

export class WebRTCClient {
  private mediaElement: HTMLMediaElement;
  private whepUrl: URL;
  private onStateChange: (state: WebRTCClientState) => void;
  private state: WebRTCClientState = "disconnected";
  private retriesLeft = RETRY_COUNT;
  private pc: RTCPeerConnection | null = null;
  private sessionUrl: string | null = null;
  private queuedCandidates: RTCIceCandidate[] = [];
  private offerData: OfferData | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private destroyed = false;

  constructor(opts: WebRTCClientOpts) {
    this.mediaElement = opts.mediaElement;
    this.whepUrl = new URL(opts.whepUrl);
    this.onStateChange = opts.onStateChange;
  }

  private setState(state: WebRTCClientState) {
    this.state = state;
    this.onStateChange(state);
  }

  connect() {
    if (this.destroyed) {
      return;
    }

    this.resetState();
    this.retriesLeft = RETRY_COUNT;

    this.loadStream();
  }

  private loadStream() {
    if (this.destroyed) {
      return;
    }

    this.setState("connecting");
    this.requestICEServers();
  }

  private requestICEServers() {
    fetch(this.whepUrl, {
      method: "OPTIONS",
    })
      .then((res) => {
        this.pc = new RTCPeerConnection({
          iceServers: this.linkToIceServers(res.headers.get("Link")),
          // https://webrtc.org/getting-started/unified-plan-transition-guide
        });

        const direction = "sendrecv";
        this.pc.addTransceiver("video", { direction });
        this.pc.addTransceiver("audio", { direction });

        this.pc.onicecandidate = (evt) => {
          this.onLocalCandidate(evt);
        };
        this.pc.oniceconnectionstatechange = () => {
          this.onConnectionState();
        };
        this.pc.ontrack = (evt) => {
          this.onTrack(evt);
        };

        this.createOffer();
      })
      .catch((err: unknown) => {
        this.onError(err instanceof Error ? err : new Error("unknown error"));
      });
  }

  private onConnectionState() {
    if (this.state === "wait-reconnect" || this.destroyed) {
      return;
    }

    if (this.pc?.iceConnectionState === "disconnected") {
      this.onError("peer connection closed");
    }
  }

  private createOffer() {
    this.pc
      ?.createOffer()
      .then((offer) => {
        const sections = offer.sdp?.split("m=") ?? [];

        for (let i = 0; i < sections.length; i++) {
          if (sections[i]?.startsWith("audio")) {
            sections[i] = this.enableStereoOpus(sections[i] ?? "");
            break;
          }
        }

        this.offerData = this.parseOffer(offer.sdp ?? "");
        this.pc
          ?.setLocalDescription(offer)
          .then(() => {
            this.sendOffer(offer);
          })
          .catch((err: unknown) => {
            this.onError(err);
          });
      })
      .catch((err: unknown) => {
        this.onError(err);
      });
  }

  private sendOffer(offer: RTCSessionDescriptionInit) {
    fetch(this.whepUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    })
      .then((res) => {
        switch (res.status) {
          case 201:
            break;
          case 404:
            this.onError(new Error("stream not found"));
            break;
          case 400:
            return res.text().then((e) => {
              this.onError(new Error(`400 error: ${e}`));
            });
          default:
            this.onError(new Error(`bad status code ${res.status}`));
            break;
        }

        this.sessionUrl = new URL(
          res.headers.get("location") ?? "",
          this.whepUrl,
        ).toString();

        return res.text().then((sdp) => {
          this.onRemoteAnswer(sdp);
        });
      })
      .catch((err: unknown) => {
        this.onError(err);
      });
  }

  private onRemoteAnswer(sdp: string) {
    if (this.state === "wait-reconnect" || this.destroyed) {
      return;
    }

    this.pc
      ?.setRemoteDescription(
        new RTCSessionDescription({
          type: "answer",
          sdp,
        }),
      )
      .then(() => {
        if (this.queuedCandidates.length !== 0) {
          this.sendLocalCandidates(this.queuedCandidates);
          this.queuedCandidates = [];
        }
      })
      .catch((err: unknown) => {
        this.onError(err);
      });
  }

  private enableStereoOpus(section: string) {
    let opusPayloadFormat = "";
    const lines = section.split("\r\n");

    for (const line of lines) {
      if (
        line.startsWith("a=rtpmap:") &&
        line.toLowerCase().includes("opus/")
      ) {
        opusPayloadFormat = line.slice("a=rtpmap:".length).split(" ")[0] ?? "";
        break;
      }
    }

    if (opusPayloadFormat === "") {
      return section;
    }

    for (let i = 0; i < lines.length; i++) {
      if (lines[i]?.startsWith("a=fmtp:" + opusPayloadFormat + " ")) {
        if (!lines[i]?.includes("stereo")) {
          lines[i] += ";stereo=1";
        }
        if (!lines[i]?.includes("sprop-stereo")) {
          lines[i] += ";sprop-stereo=1";
        }
      }
    }

    return lines.join("\r\n");
  }

  private parseOffer(sdp: string): OfferData {
    const ret = {
      iceUfrag: "",
      icePwd: "",
      medias: [] as string[],
    };

    for (const line of sdp.split("\r\n")) {
      if (line.startsWith("m=")) {
        ret.medias.push(line.slice("m=".length));
      } else if (ret.iceUfrag === "" && line.startsWith("a=ice-ufrag:")) {
        ret.iceUfrag = line.slice("a=ice-ufrag:".length);
      } else if (ret.icePwd === "" && line.startsWith("a=ice-pwd:")) {
        ret.icePwd = line.slice("a=ice-pwd:".length);
      }
    }

    return ret;
  }

  private linkToIceServers(links: string | null): RTCIceServer[] {
    if (!links) {
      return [];
    }

    return links.split(", ").map((link) => {
      const m = link.match(
        /^<(.+?)>; rel="ice-server"(; username="(.*?)"; credential="(.*?)"; credential-type="password")?/i,
      );

      if (!m?.[1]) {
        return {
          urls: [],
        };
      }

      const ret: RTCIceServer = {
        urls: [m[1]],
      };

      if (m[3] !== undefined && m[4] !== undefined) {
        ret.username = this.unquoteCredential(m[3]);
        ret.credential = this.unquoteCredential(m[4]);
      }

      return ret;
    });
  }

  private unquoteCredential(v: string): string {
    return JSON.parse(`"${v}"`) as string;
  }

  private generateSdpFragment(
    od: OfferData,
    candidates: RTCIceCandidate[],
  ): string {
    const candidatesByMedia: Record<number, RTCIceCandidate[]> = {};
    for (const candidate of candidates) {
      const mid = candidate.sdpMLineIndex;
      if (mid === null) {
        continue;
      }

      if (!candidatesByMedia[mid]) {
        candidatesByMedia[mid] = [];
      }
      candidatesByMedia[mid]?.push(candidate);
    }

    let frag =
      "a=ice-ufrag:" + od.iceUfrag + "\r\n" + "a=ice-pwd:" + od.icePwd + "\r\n";

    let mid = 0;

    for (const media of od.medias) {
      if (candidatesByMedia[mid] !== undefined) {
        frag += "m=" + media + "\r\n" + "a=mid:" + String(mid) + "\r\n";

        for (const candidate of candidatesByMedia[mid] ?? []) {
          frag += "a=" + candidate.candidate + "\r\n";
        }
      }
      mid++;
    }

    return frag;
  }

  private onLocalCandidate(evt: RTCPeerConnectionIceEvent) {
    if (this.state !== "connecting" || this.destroyed) {
      return;
    }

    if (evt.candidate !== null) {
      if (this.sessionUrl === null) {
        this.queuedCandidates.push(evt.candidate);
      } else {
        this.sendLocalCandidates([evt.candidate]);
      }
    }
  }

  private sendLocalCandidates(candidates: RTCIceCandidate[]) {
    if (!this.offerData) {
      console.warn('offerData is not set in "sendLocalCandidates"');
      return;
    }

    if (!this.sessionUrl) {
      console.warn('sessionUrl is not set in "sendLocalCandidates"');
      return;
    }

    fetch(this.sessionUrl + this.whepUrl.search, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/trickle-ice-sdpfrag",
        "If-Match": "*",
      },
      body: this.generateSdpFragment(this.offerData, candidates),
    })
      .then((res) => {
        switch (res.status) {
          case 204:
            break;
          case 404:
            this.onError(Error("stream not found"));
            break;
          default:
            this.onError(Error(`bad status code ${res.status}`));
        }
      })
      .catch((err: unknown) => {
        this.onError(err);
      });
  }

  private onTrack(evt: RTCTrackEvent) {
    if (this.state === "wait-reconnect" || this.destroyed) {
      return;
    }

    this.mediaElement.srcObject = new MediaStream();

    // We might have one stream of both audio and video, or separate streams for audio and video
    for (const track of evt.streams[0]?.getTracks() ?? []) {
      console.log("Adding track", track);
      this.mediaElement.srcObject.addTrack(track);
    }

    this.mediaElement
      .play()
      .then(() => {
        this.retriesLeft = RETRY_COUNT;
        this.setState("connected");
      })
      .catch((err: unknown) => {
        this.onError(err);
      });
  }

  private resetState() {
    if (this.pc !== null) {
      this.pc.close();
      this.pc = null;
    }

    if (this.sessionUrl) {
      fetch(this.sessionUrl, {
        method: "DELETE",
      }).catch((err: unknown) => {
        console.log("Error deleting WebRTC session:", err);
      });
    }

    this.sessionUrl = null;

    this.queuedCandidates = [];

    if (this.reconnectTimeout !== null) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  private onError(err: unknown) {
    if (this.state === "wait-reconnect" || this.destroyed) {
      return;
    }

    this.resetState();

    if (this.retriesLeft > 0) {
      this.retriesLeft--;
      const retryDelay =
        RETRY_INTERVAL_MIN *
        RETRY_INTERVAL_BACKOFF_BASE ** (RETRY_COUNT - this.retriesLeft);
      console.log(
        `WebRTC error. Retrying in ${retryDelay}ms (${this.retriesLeft} retries left)`,
        err,
      );

      this.setState("wait-reconnect");
      this.reconnectTimeout = setTimeout(() => {
        this.reconnectTimeout = null;
        this.loadStream();
      }, retryDelay);
    } else {
      console.log(`WebRTC error. No more retries left. Disconnecting.`, err);

      this.setState("disconnected");
    }
  }

  destroy() {
    this.resetState();
    this.destroyed = true;
  }
}
