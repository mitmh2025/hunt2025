{ config, pkgs, lib, ... }:
{
  config = {
    sops.secrets."zammad/secret_key_base" = {
      owner = config.systemd.services.zammad-web.serviceConfig.User;
    };
    sops.secrets."zammad/smtp/user" = {};
    sops.secrets."zammad/smtp/password" = {};
    services.zammad = {
      enable = true;
      redis.port = 6389;  # Deconflict with Authentik
      secretKeyBaseFile = config.sops.secrets."zammad/secret_key_base".path;

      settings = {
        product_name = "Hunt 2025";
        organization = "Hunt 2025";
        timezone_default = "America/New_York";
        fqdn = "tix.mitmh2025.com";
        http_type = "https";
      };

      channels = let
        outbound = {
          adapter = "smtp";
          options = {
            host = "smtp.postmarkapp.com";
            port = 587;
            user = config.sops.placeholder."zammad/smtp/user";
            password = config.sops.placeholder."zammad/smtp/password";
            domain = "mitmh2025.com";
            enable_starttls_auto = true;
            ssl_verify = true;
          };
        };
      in [
        {
          id = 1;
          area = "Email::Notification";
          options.outbound = outbound;
          preferences.online_service_disable = true;
        }
        {
          id = 2;
          area = "Email::Account";
          options.inbound = { adapter = "null"; options = {}; };
          options.outbound = outbound;
          active = true;
        }
      ];

      addresses = [
        {
          id = 1;
          channel_id = 2;
          name = "Hunt 2025";
          email = "help@mitmh2025.com";
        }
        {
          id = 2;
          channel_id = 2;
          name = "Hints";
          email = "hints@mitmh2025.com";
        }
      ];
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