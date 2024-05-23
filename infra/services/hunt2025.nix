{ config, pkgs, lib, ... }:
{
  config = {
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
      # FIXME: Use a real key in production.
      environment.JWT_SECRET = "%m";

      serviceConfig = {
        ExecStart = "${pkgs.hunt2025}/bin/hunt2025";
        Restart = "always";
        RestartSec = "5s";
        User = "hunt2025";
        Group = "hunt2025";
      };
    };
  };
}