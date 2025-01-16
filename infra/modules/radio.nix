{ config, lib, ... }:
let
  cfg = config.hunt.radio;
in {
  options = with lib; {
    hunt.radio = {
      enable = mkEnableOption "hunt radio";
      externalHostname = mkOption {
        type = types.nullOr types.str;
        default = null;
      };
      jwksUri = mkOption {
        type = types.nullOr types.str;
        default = "${config.hunt2025.site.apiBaseUrl}/jwks";
      };
      record = mkEnableOption "Record streams";
    };
  };
  config = lib.mkIf cfg.enable {
    systemd.services.mediamtx.serviceConfig = {
      StateDirectory = "mediamtx";
    };
    services.mediamtx = {
      enable = true;
      settings = let
        recordPath = "/var/lib/mediamtx/recordings/%path/%Y-%m-%d_%H-%M-%S-%f";
      in {
        # GCE doesn't give a public IP directly to the VM.
        webrtcIPsFromInterfaces = cfg.externalHostname == null;
        # Just use a domain name to talk to us.
        webrtcAdditionalHosts = lib.mkIf (cfg.externalHostname != null) [
          cfg.externalHostname
        ];
        webrtcTrustedProxies = [
          "127.0.0.1"
        ];
        webrtcICEServers2 = [
          {
            url = "stun:stun.l.google.com:19302";
          }
        ];
        # Use MIT GUEST-compatible ports.
        rtpAddress = ":50000";
        rtcpAddress = ":50001";
        webrtcLocalUDPAddress = ":50189";

        authMethod = lib.mkIf (cfg.jwksUri != null) "jwt";
        authJWTJWKS = lib.mkIf (cfg.jwksUri != null) cfg.jwksUri;
        authJWTClaimKey = "media";

        api = true; # :9997
        metrics = true; # :9998

        paths."~teams/(\\d+)/radio" = {
          inherit (cfg) record;

          recordPartDuration = "10s";
          recordSegmentDuration = "1h";
          recordDeleteAfter = "0s";
        };

        paths."~control_room/(.*)" = {
          inherit (cfg) record;
          recordPartDuration = "10s";
          recordSegmentDuration = "1h";
          recordDeleteAfter = "0s";
        };
      };
    };
    services.nginx = lib.mkIf (cfg.externalHostname != null) {
      upstreams.mediamtx.servers."127.0.0.1:8889" = {};
      virtualHosts = {
        "${cfg.externalHostname}" = {
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