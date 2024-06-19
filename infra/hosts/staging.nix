{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    "${modulesPath}/virtualisation/google-compute-config.nix"
    ./base.nix
    ../services/postgres.nix
    ../services/redis.nix
    #../services/thingsboard.nix
  ];
  config = {
    security.acme.acceptTerms = true;
    security.acme.defaults.email = "hunt2025-tech@googlegroups.com";

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

      virtualHosts = {
        "staging.mitmh2025.com" = {
          forceSSL = true;
          enableACME = true;
        };
      };
    };
  };
}
