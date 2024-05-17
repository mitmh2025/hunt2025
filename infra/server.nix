{ config, lib, pkgs, ... }:
{
  imports = [
    ./services/thingsboard.nix
  ];
  config = {
    system.stateVersion = "24.05";

    # Allow console login with no password
    users.users.root.hashedPassword = "";
    users.mutableUsers = false;

    # Don't build documentation
    documentation.nixos.enable = false;

    services.nginx = {
      enable = true;
    };

    services.postgresql = {
      enable = true;
      ensureDatabases = [
        "mitmh2025"
      ];
      ensureUsers = [
        {
          name = "mitmh2025";
          ensureDBOwnership = true;
        }
      ];
    };

    services.postgresqlBackup = {
      enable = true;
      startAt = "*-*-* *:15:00";
    };

    users.users.mitmh2025 = {
      isSystemUser = true;
      group = "mitmh2025";
      extraGroups = [
        config.services.redis.servers.mitmh2025.user
      ];
    };
    users.groups.mitmh2025 = {};

    services.redis.servers.mitmh2025 = {
      enable = true;
    };
  };
}
