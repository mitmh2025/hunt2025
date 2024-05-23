{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    #"${modulesPath}/virtualisation/google-compute-config.nix"
    ./services/postgres.nix
    ./services/redis.nix
    ./services/hunt2025.nix
    #./services/thingsboard.nix
  ];
  config = {
    system.stateVersion = "24.05";

    fileSystems."/" = {
      fsType = "ext4";
      device = "/dev/disk/by-label/nixos";
      autoResize = true;
    };

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
        { from = "host"; host.port = 3000; guest.port = 3000; }
      ];
      hunt2025.site.db_env = "ci";
    };
  };
}
