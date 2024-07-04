{ config, pkgs, lib, ... }:
{
  options = with lib; {
    services.zammad.settings = mkOption {
      type = with types; attrsOf anything;
      default = {};
      description = "Settings to enforce at Zammad startup";
    };
  };
  config = {
    sops.secrets."zammad/secret_key_base" = {
      owner = config.systemd.services.zammad-web.serviceConfig.User;
    };
    services.zammad = {
      enable = true;
      redis.port = 6389;  # Deconflict with Authentik
      secretKeyBaseFile = config.sops.secrets."zammad/secret_key_base".path;

      settings = {
        system_init_done = true;
        organization = "Hunt 2025";
        timezone_default = "America/New_York";
        fqdn = "tix.mitmh2025.com";
        http_type = "https";
      };
    };
    services.nginx = {
      upstreams.zammad.servers."127.0.0.1:${toString config.services.zammad.port}" = {};
      upstreams.zammad-websocket.servers."127.0.0.1:${toString config.services.zammad.websocketPort}" = {};
      virtualHosts = {
        "tix.mitmh2025.com" = {
          forceSSL = true;
          enableACME = true;
          locations."/" = {
            proxyPass = "http://zammad";
            proxyWebsockets = true;
          };
          locations."/ws" = {
            proxyPass = "http://zammad-websocket";
            proxyWebsockets = true;
          };
        };
      };
    };
  };
}