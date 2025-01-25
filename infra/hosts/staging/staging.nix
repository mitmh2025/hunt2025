{ config, lib, pkgs, radio-media, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
    ../../services/postgres.nix
    ../../services/redis.nix
    ../../services/authentik
    ../../services/k3s.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/staging.yaml;
    }
    {
      hunt2025.site = {
        enable = true;
        db_env = "ci";  # N.B. We use "ci" to trigger a database reseed on startup.
        port = "%t/hunt2025/hunt2025.sock";
        regsitePort = "%t/hunt2025/hunt2025-reg.sock";
        apiBaseUrl = "http://localhost/api";
        jwksUri = "https://auth.mitmh2025.com/application/o/staging-ops/jwks/";
      };

      users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025" ];
      systemd.services.hunt2025 = {
        serviceConfig.RuntimeDirectory = "hunt2025";
        # Remove database every time the service restarts.
        preStart = ''
          ${config.services.postgresql.package}/bin/psql hunt2025 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
        '';
      };
      services.redis.servers.hunt2025 = {
        save = []; # Don't persist any state
        appendOnly = false;
      };
      # Restart Redis whenever the site is restarted (to clear the state).
      systemd.services.redis-hunt2025.partOf = ["hunt2025.service"];
    }
    {
      hunt2025.ops = {
        enable = true;
        port = "%t/hunt2025-ops/ops.sock";
        apiBaseUrl = "http://localhost/api";
        oauthServer = "https://auth.mitmh2025.com/application/o/staging-ops/.well-known/openid-configuration";
      };
      sops.secrets."authentik/apps/staging-ops/client_id" = {};
      sops.secrets."authentik/apps/staging-ops/client_secret" = {};
      sops.templates."ops/env" = {
        owner = "hunt2025-ops";
        content = ''
          OAUTH_CLIENT_ID=${config.sops.placeholder."authentik/apps/staging-ops/client_id"}
          OAUTH_CLIENT_SECRET=${config.sops.placeholder."authentik/apps/staging-ops/client_secret"}
        '';
      };
      users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025-ops" ];
      systemd.services.hunt2025-ops = {
        serviceConfig = {
          EnvironmentFile = config.sops.templates."ops/env".path;
          RuntimeDirectory = "hunt2025-ops";
        };
      };
    }
    {
      sops.secrets."site/environment" = {};
      systemd.services.hunt2025.serviceConfig.EnvironmentFile = [config.sops.secrets."site/environment".path];
      systemd.services.hunt2025.environment.EMAIL_TRANSPORT = "postmark";
    }
    {
      environment.etc."aws/config".source = let
        awsAuth = lib.getExe pkgs.aws-credential-process;
      in (pkgs.formats.ini {}).generate "aws-config" {
        "profile mitmh2025-puzzup".credential_process = "${awsAuth} 891377012427 GCPStagingStaging";
      };
      systemd.services.hunt2025.environment = {
        EMAIL_FROM = "MIT Mystery Hunt 2025 <info@mitmh2025.com>";
        AWS_CONFIG_FILE = "/etc/aws/config";
        AWS_SDK_LOAD_CONFIG = "true";
        AWS_PROFILE = "mitmh2025-puzzup";
      };
    }
    {
      systemd.services.hunt2025.environment = {
        CONTROL_ROOM_BASE_URL = "wss://staging.mitmh2025.com/";
      };
      sops.secrets."control_room/mediamtx_token" = {};
      sops.templates."control_room/env" = {
        owner = "control_room";
        content = ''
          MEDIAMTX_TOKEN=${config.sops.placeholder."control_room/mediamtx_token"}
        '';
      };
      hunt2025.controlRoom = {
        enable = true;
        environmentFile = config.sops.templates."control_room/env".path;
      };
    }
    {
      services.nginx = {
        enable = true;

        additionalModules = with pkgs.nginxModules; [
          vts
        ];
        appendHttpConfig = ''
          vhost_traffic_status_zone;
        '';
        recommendedTlsSettings = true;
        recommendedOptimisation = true;
        recommendedGzipSettings = true;
        recommendedProxySettings = true;

        upstreams.hunt2025.servers."unix:/run/hunt2025/hunt2025.sock" = {};
        upstreams.hunt2025-reg.servers."unix:/run/hunt2025/hunt2025-reg.sock" = {};
        upstreams.hunt2025-ops.servers."unix:/run/hunt2025-ops/ops.sock" = {};
        upstreams.control_room.servers."127.0.0.1:8086" = {};
        upstreams.thingsboard.servers."127.0.0.1:8080" = {};
        virtualHosts = {
          "staging.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025";
              proxyWebsockets = true;
            };
            locations."= /radio-manifest.json" = {
              alias = "${pkgs.hunt2025}/lib/hunt2025/dist/radio-manifest.json";
              # Copy Authentik configuration
              extraConfig = config.services.nginx.virtualHosts."staging.mitmh2025.com".locations."/".extraConfig;
            };
            locations."/static/" = {
              alias = "${pkgs.hunt2025.assets}/static/";
              extraConfig = "expires max;";
            };
            locations."= /puzzle/control_room/ws" = {
              proxyPass = "http://control_room";
              proxyWebsockets = true;
            };
            locations."/JaPCdoKSO193/host/ws/" = {
              proxyPass = "http://control_room";
              proxyWebsockets = true;
            };
          };
          "reg.staging.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025-reg";
              proxyWebsockets = true;
            };
            locations."/static/".alias = "${pkgs.hunt2025.assets}/static/";
          };
          "ops.staging.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025-ops";
              proxyWebsockets = true;
            };
            locations."/api".proxyPass = "http://hunt2025";
          };
          "localhost" = {
            # Expose plain HTTP on localhost for use by the frontend
            locations."/api".proxyPass = "http://hunt2025";
          };
        };
      };
    }
  ];
}
