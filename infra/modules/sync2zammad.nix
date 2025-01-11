{ config, lib, pkgs, ... }:
let
  cfg = config.services.sync2zammad;
in {
  options = with lib; {
    services.sync2zammad = {
      enable = mkEnableOption "sync2zammad";
      apiBaseUrl = mkOption {
        type = types.str;
      };
      zammadUrl = mkOption {
        type = types.str;
      };
      environmentFile = mkOption {
        type = types.nullOr types.path;
        default = null;
      };
    };
  };
  config = lib.mkIf cfg.enable {
    services.sync2zammad = {
      apiBaseUrl = lib.mkIf config.hunt2025.site.enable (lib.mkDefault config.hunt2025.site.apiBaseUrl);
      zammadUrl = lib.mkIf config.services.zammad.enable (lib.mkDefault "https://${config.hunt2025.tix.fqdn}");
    };
    users.users.sync2zammad = {
      isSystemUser = true;
      group = "sync2zammad";
      extraGroups = [
        config.services.redis.servers.hunt2025.user
      ];
    };
    users.groups.sync2zammad = {};
    systemd.services.sync2zammad = {
      description = "Sync hunt state with Zammad";

      wantedBy = ["multi-user.target"];
      wants = [
        "hunt2025.service"
      ];
      after = [
        "hunt2025.service"
      ];

      environment = {
        API_BASE_URL = cfg.apiBaseUrl;
        ZAMMAD_URL = cfg.zammadUrl;
        inherit (config.systemd.services.hunt2025.environment) FRONTEND_API_SECRET REDIS_URL;
      };

      serviceConfig = {
        EnvironmentFile = lib.mkIf (cfg.environmentFile != null) cfg.environmentFile;
        ExecStart = "${pkgs.hunt2025.misc}/bin/sync2zammad";
        RemainAfterExit = true;
        TimeoutStartSec = "15min";
        User = "sync2zammad";
        Group = "sync2zammad";
      };
    };
  };
}