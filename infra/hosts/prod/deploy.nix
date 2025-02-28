{ config, options, lib, pkgs, self, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
    ../../services/deploy.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/prod/deploy.yaml;
      virtualisation.vmVariant = {
        systemd.services.google-guest-agent.enable = false;
        systemd.services.google-startup-scripts.enable = false;
        systemd.services.google-shutdown-scripts.enable = false;
      };
      hunt.deploy.serviceAccountName = "deploy-vm";
    }
  ];
}
