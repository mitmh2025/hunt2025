{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    #"${modulesPath}/virtualisation/google-compute-config.nix"
    ../services/postgres.nix
    ../services/redis.nix
    #../services/thingsboard.nix
  ];
  config = {
    system.stateVersion = "24.05";

    fileSystems."/" = {
      fsType = "ext4";
      device = "/dev/disk/by-label/nixos";
      autoResize = true;
    };
    boot.loader.systemd-boot.enable = true;

    # Allow console login with no password
    users.users.root.hashedPassword = "";
    users.mutableUsers = false;

    # Don't build documentation
    documentation.nixos.enable = false;

    networking.firewall.enable = false; # FIXME: Consider enabling and configuring?

    services.nginx = {
      enable = true;
    };

    virtualisation.vmVariant = {
      virtualisation.forwardPorts = [
        # Redis
        { from = "host"; host.port = 6379; guest.port = 6379; }
      ];
      services.redis.servers.hunt2025 = {
        bind = "0.0.0.0";
        port = 6379;
        settings.protected-mode = "no";
      };
    };
  };
}
