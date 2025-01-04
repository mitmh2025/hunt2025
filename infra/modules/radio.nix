{ config, lib, ... }:
let
  cfg = config.hunt.radio;
in {
  options = with lib; {
    hunt.radio = {
      enable = mkEnableOption "hunt radio";
      externalHostname = mkOption {
        type = types.str;
      };
      jwksUri = mkOption {
        type = types.nullOr types.str;
        default = "${config.hunt2025.site.apiBaseUrl}/jwks";
      };
    };
  };
  config = lib.mkIf cfg.enable {
    services.mediamtx = {
      enable = true;
      settings = {
        # GCE doesn't give a public IP directly to the VM.
        webrtcIPsFromInterfaces = false;
        # Just use a domain name to talk to us.
        webrtcAdditionalHosts = [
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
      };
    };
    services.nginx = {
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