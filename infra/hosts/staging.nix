{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    "${modulesPath}/virtualisation/google-compute-config.nix"
    ./base.nix
    ../services/postgres.nix
    ../services/redis.nix
    ../services/authentik
    ../services/hunt2025.nix
    ../services/thingsboard.nix
  ];
  config = {
    sops.defaultSopsFile = ./../secrets/staging.yaml;

    security.acme.acceptTerms = true;
    security.acme.defaults.email = "hunt2025-tech@googlegroups.com";

    hunt2025.site = {
      db_env = "ci";  # N.B. We use "ci" to trigger a database reseed on startup.
      port = "%t/hunt2025/hunt2025.sock";
      apiBaseUrl = "http://localhost/api";
    };

    services.thingsboard = {
      enable = true;
    };

    users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025" ];
    systemd.services.hunt2025 = {
      serviceConfig.RuntimeDirectory = "hunt2025";
      # Remove database every time the service restarts.
      preStart = ''
        ${config.services.postgresql.package}/bin/psql hunt2025 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
      '';
    };

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
      upstreams.thingsboard.servers."127.0.0.1:8080" = {};
      virtualHosts = {
        "staging.mitmh2025.com" = {
          forceSSL = true;
          enableACME = true;
          locations."/" = {
            proxyPass = "http://hunt2025";
            proxyWebsockets = true;
          };
        };
        "things.mitmh2025.com" = {
          forceSSL = true;
          enableACME = true;
          locations."/" = {
            proxyPass = "http://thingsboard";
            proxyWebsockets = true;
          };
        };
        "localhost" = {
          # Expose plain HTTP on localhost for use by the frontend
          locations."/api".proxyPass = "http://hunt2025";
        };
      };
    };
  };
}
