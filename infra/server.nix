{ config, lib, pkgs, ... }:
{
  imports = [
    ./services/postgres.nix
    ./services/redis.nix
    #./services/thingsboard.nix
  ];
  config = {
    system.stateVersion = "24.05";

    # Allow console login with no password
    users.users.root.hashedPassword = "";
    users.mutableUsers = false;

    # Don't build documentation
    documentation.nixos.enable = false;

    networking.firewall.enable = false; # FIXME: Consider enabling and configuring?

    services.nginx = {
      enable = true;
    };

    users.users.hunt2025 = {
      isSystemUser = true;
      group = "hunt2025";
      extraGroups = [
        config.services.redis.servers.hunt2025.user
      ];
    };
    users.groups.hunt2025 = {};

    systemd.services.hunt2025 = {
      description = "Hunt 2025 Frontend";

      wantedBy = ["multi-user.target"];
      wants = [
        "postgresql.service"
        "${config.services.redis.servers.hunt2025.user}.service"
      ];

      environment.DB_ENV = "production";

      serviceConfig = {
        ExecStart = "${pkgs.hunt2025}/bin/hunt2025";
        Restart = "always";
        RestartSec = "5s";
        User = "hunt2025";
        Group = "hunt2025";
      };
    };

    virtualisation.vmVariant = {
      virtualisation.forwardPorts = [
        { from = "host"; host.port = 3000; guest.port = 3000; }
      ];
    };
  };
}
