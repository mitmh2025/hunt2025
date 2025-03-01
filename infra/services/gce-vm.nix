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
      # Wait for a DHCP lease before we reach initrd.target
      # See https://www.freedesktop.org/software/systemd/man/latest/bootup.html
      boot.initrd.systemd.targets.initrd = {
        after = ["systemd-network-wait-online@eth0.service"];
        wants = ["systemd-network-wait-online@eth0.service"];
      };
      # initrd-cleanup.service will stop resolved before initrd-nixos-activation (which includes setupSecrets) starts, so we need to make sure /etc/resolv.conf doesn't contain resolved's stub resolver.
      # N.B. For some reason, we end up with 1.1.1.1/8.8.8.8 instead of the DHCP DNS servers, but that still seems to work.
      boot.initrd.systemd = {
        contents."/etc/systemd/resolved.conf".text = lib.mkForce ''
          [Resolve]
          DNSStubListener=no
        '';
        tmpfiles.settings.systemd-resolved-stub."/etc/resolv.conf".L.argument = lib.mkForce "/run/systemd/resolve/resolv.conf";
      };
      system.nssDatabases.hosts = lib.mkOrder 401 ["myhostname"]; # Ensure local hostname is not resolved via DNS
    }
  ];
}
