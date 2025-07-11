{ config, lib, pkgs, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
    ../../services/postgres.nix
    ../../services/redis.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/dev.yaml;
    }
    {
      nixpkgs.overlays = [(final: prev: {
        hunt2025 = prev.hunt2025.overrideAttrs {
          npmBuildScript = "build-all-dev";
        };
      })];
      hunt2025.site = {
        enable = true;
        db_env = "ci";  # N.B. We use "ci" to trigger a database reseed on startup.
        port = "%t/hunt2025/hunt2025.sock";
        regsitePort = "%t/hunt2025/hunt2025-reg.sock";
        apiBaseUrl = "http://localhost/api";
      };

      users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025" ];
      systemd.services.hunt2025 = {
        serviceConfig.RuntimeDirectory = "hunt2025";
        # Remove database every time the service restarts.
        preStart = ''
          ${config.services.postgresql.package}/bin/psql hunt2025 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
        '';
      };
    }
    {
      sops.secrets."site/environment" = {};
      systemd.services.hunt2025.serviceConfig.EnvironmentFile = [config.sops.secrets."site/environment".path];
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
        virtualHosts = {
          "dev.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025";
              proxyWebsockets = true;
            };
            locations."/static/".proxyPass = "http://hunt2025";
            authentik.enable = true;
            authentik.url = "https://staging.us-east5-a.c.mitmh2025-staging-gcp.internal:9443";
          };
          "reg.dev.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025-reg";
              proxyWebsockets = true;
            };
            authentik.enable = true;
            authentik.url = "https://staging.us-east5-a.c.mitmh2025-staging-gcp.internal:9443";
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
