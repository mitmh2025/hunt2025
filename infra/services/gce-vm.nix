{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    "${modulesPath}/virtualisation/google-compute-config.nix"
  ];
  config = lib.mkMerge [
    {
      # Enable compressed RAM
      boot.kernelParams = ["zswap.enabled=1"];

      # Allow serial console login
      systemd.services."serial-getty@ttyS0" = {
        # Undo what nixos/modules/profiles/headless.nix did
        enable = true;
        serviceConfig = config.systemd.services."serial-getty@".serviceConfig;
        overrideStrategy = "asDropin";
      };
    }
    {
      # Ensure network is available before sops tries to initialize secrets
      boot.initrd.systemd.enable = true;
      boot.initrd.network.enable = true;
      networking.useNetworkd = true;
      security.polkit.enable = true; # Allows networkd to set hostname
      boot.initrd.systemd.services.initrd-nixos-activation = let
        deps = [ "network-online.target" ];
      in {
        after = deps;
        wants = deps;
      };
      system.nssDatabases.hosts = lib.mkOrder 401 ["myhostname"]; # Ensure local hostname is not resolved via DNS
    }
  ];
}
