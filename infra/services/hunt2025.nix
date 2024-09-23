{ config, pkgs, lib, ... }:
let
  cfg = config.hunt2025.site;
in {
  options = with lib; {
    hunt2025.site = {
      db_env = mkOption {
        type = types.str;
        default = "production";
        description = "Value to pass as $DB_ENV";
      };
      port = mkOption {
        type = with types; coercedTo ints.u16 (n: toString n) str;
        default = 3000;
        description = "Port or path to listen on";
      };
      apiBaseUrl = mkOption {
        type = types.str;
        default = "http://localhost:3000/api";
        description = "Base URL for API requests";
      };
    };
  };
  config = {
    users.users.hunt2025 = {
      isSystemUser = true;
      group = "hunt2025";
      extraGroups = [
        config.services.redis.servers.hunt2025.user
      ];
    };
    users.groups.hunt2025 = {};

    systemd.services.hunt2025 = let
      deps = [
        "postgresql.service"
        "${config.services.redis.servers.hunt2025.user}.service"
      ];
    in {
      description = "Hunt 2025 Frontend";

      wantedBy = ["multi-user.target"];
      wants = deps;
      after = deps;

      environment.DB_ENV = cfg.db_env;
      environment.PORT = cfg.port;
      environment.API_BASE_URL = cfg.apiBaseUrl;
      # FIXME: Use a real key in production.
      environment.JWT_SECRET = "%m";
      # FIXME: Use a real key in production.
      environment.FRONTEND_API_SECRET = "%m";
      environment.REDIS_URL = "unix://${config.services.redis.servers.hunt2025.unixSocket}";

      serviceConfig = {
        ExecStart = "${pkgs.hunt2025}/bin/hunt2025";
        Restart = "always";
        RestartSec = "5s";
        User = "hunt2025";
        Group = "hunt2025";
        UMask = "0007";
      };
    };
  };
}
