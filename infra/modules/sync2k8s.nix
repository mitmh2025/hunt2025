{ config, lib, pkgs, ... }:
let
  cfg = config.services.sync2k8s;
in {
  options = with lib; {
    services.sync2k8s = {
      enable = mkEnableOption "sync2k8s";
      apiBaseUrl = mkOption {
        type = types.str;
      };
      outputBaseUrl = mkOption {
        type = types.str;
      };
      environmentFile = mkOption {
        type = types.nullOr types.path;
        default = null;
      };
      radioImage = mkOption {
        type = types.package;
        default = pkgs.radioImage;
      };
    };
  };
  config = lib.mkIf cfg.enable {
    services.sync2k8s = {
      apiBaseUrl = lib.mkIf config.hunt2025.site.enable (lib.mkDefault config.hunt2025.site.apiBaseUrl);
      outputBaseUrl = lib.mkIf config.hunt.radio.enable (lib.mkDefault "rtsp://10.42.0.1:8554");
    };
    services.k3s.images = [
      cfg.radioImage
    ];
    users.users.sync2k8s = {
      isSystemUser = true;
      group = "sync2k8s";
      extraGroups = [
        config.services.redis.servers.hunt2025.user
        "k3s"
      ];
    };
    users.groups.sync2k8s = {};
    systemd.services.sync2k8s = {
      description = "Sync hunt state to Kubernetes";

      wantedBy = ["multi-user.target"];
      wants = [
        "k3s.service"
        "hunt2025.service"
      ];
      after = [
        "k3s.service"
        "hunt2025.service"
      ];

      environment = {
        KUBECONFIG = "/etc/rancher/k3s/k3s.yaml";
        API_BASE_URL = cfg.apiBaseUrl;
        OUTPUT_BASE_URL = cfg.outputBaseUrl;
        LIQUIDSOAP_IMAGE = "${cfg.radioImage.imageName}:${cfg.radioImage.imageTag}";
        inherit (config.systemd.services.hunt2025.environment) FRONTEND_API_SECRET REDIS_URL;
      };

      serviceConfig = {
        EnvironmentFile = lib.mkIf (cfg.environmentFile != null) cfg.environmentFile;
        ExecStart = "${pkgs.hunt2025.misc}/bin/sync2k8s";
        RemainAfterExit = true;
        TimeoutStartSec = "15min";
        User = "sync2k8s";
        Group = "sync2k8s";
      };
    };
  };
}