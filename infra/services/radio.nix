{ config, pkgs, lib, ... }:
{
  config = {
    services.mediamtx = {
      enable = true;
      settings = {
        # GCE doesn't give a public IP directly to the VM.
        webrtcIPsFromInterfaces = false;
        # Just use a domain name to talk to us.
        webrtcAdditionalHosts = [
          "media.mitmh2025.com"
        ];
        webrtcTrustedProxies = [
          "127.0.0.1"
        ];
        webrtcICEServers2 = [
          {
            url = "stun:stun.l.google.com:19302";
          }
        ];
        paths.music = {
          runOnInit = ''
            ${lib.getExe pkgs.ffmpeg} -re -stream_loop -1 -i ${./../../radioman/spy-suite.mp3} -vn -c:a libopus -ar 48000 -b:a 128k -packet_loss 1 -fec true -f rtsp rtsp://localhost:$RTSP_PORT/$MTX_PATH
          '';
          runOnInitRestart = true;
        };
      };
    };
    services.nginx = {
      upstreams.mediamtx.servers."127.0.0.1:8889" = {};
      virtualHosts = {
        "media.mitmh2025.com" = {
          forceSSL = true;
          enableACME = true;
          locations."= /".return = 404; # Don't proxy / itself
          locations."/" = {
            proxyPass = "http://mediamtx";
            proxyWebsockets = true;
          };
        };
      };
    };
  };
}
