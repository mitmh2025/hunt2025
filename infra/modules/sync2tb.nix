{ config, lib, pkgs, ... }:
let
  cfg = config.services.sync2tb;
in {
  options = with lib; {
    services.sync2tb = {
      enable = mkEnableOption "Provision ThingsBoard";
      apiBaseUrl = mkOption {
        type = types.str;
      };
      tbBaseUrl = mkOption {
        type = types.str;
      };
      mediaBaseUrl = mkOption {
        type = types.nullOr types.str;
        default = null;
      };
      environmentFile = mkOption {
        type = types.nullOr types.path;
        default = null;
      };
    };
  };
  config = lib.mkIf cfg.enable {
    services.sync2tb = {
      apiBaseUrl = lib.mkIf config.hunt2025.site.enable (lib.mkDefault config.hunt2025.site.apiBaseUrl);
      tbBaseUrl = lib.mkIf config.services.thingsboard.enable (lib.mkDefault "http://localhost:8080");
      mediaBaseUrl = lib.mkIf (config.hunt.radio.enable && config.hunt.radio.externalHostname != null) (lib.mkDefault "https://${config.hunt.radio.externalHostname}");
    };
    users.users.sync2tb = {
      isSystemUser = true;
      group = "sync2tb";
      extraGroups = [
        config.services.redis.servers.hunt2025.user
      ];
    };
    users.groups.sync2tb = {};
    systemd.services.sync2tb = {
      description = "Sync hunt state to Thingsboard";

      wantedBy = ["multi-user.target"];
      wants = [
        "thingsboard.service"
        "hunt2025.service"
      ];
      after = [
        "thingsboard.service"
        "hunt2025.service"
      ];

      environment = {
        API_BASE_URL = cfg.apiBaseUrl;
        MEDIA_BASE_URL = cfg.mediaBaseUrl;
        TB_BASE_URL = cfg.tbBaseUrl;
        TB_USERNAME = lib.mkDefault "radioman@mitmh2025.com";
        inherit (config.systemd.services.hunt2025.environment) FRONTEND_API_SECRET REDIS_URL;
      };

      serviceConfig = {
        EnvironmentFile = lib.mkIf (cfg.environmentFile != null) cfg.environmentFile;
        ExecStart = "${pkgs.hunt2025.misc}/bin/sync2tb";
        RemainAfterExit = true;
        TimeoutStartSec = "15min";
        User = "sync2tb";
        Group = "sync2tb";
      };
    };
  };
}