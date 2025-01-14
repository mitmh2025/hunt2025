{ config, options, lib, pkgs, self, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../../services/zammad.nix
    ../base.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/prod/tix.yaml;
      virtualisation.vmVariant = {
        systemd.services.google-guest-agent.enable = false;
        systemd.services.google-startup-scripts.enable = false;
        systemd.services.google-shutdown-scripts.enable = false;
      };
      services.nginx.enable = true;
    }
    {
      hunt2025.tix = {
        domain = "mitmh2025.com";
        authentikApp = "tix";
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
      };
    }
  ];
}
