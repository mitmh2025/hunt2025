{ config, lib, pkgs, ... }:
let
  cfg = config.services.thingsboard.provision;
in {
  options = with lib; {
    services.thingsboard.provision = {
      enable = mkEnableOption "Provision ThingsBoard";
      environmentFile = mkOption {
        type = types.nullOr types.path;
        default = null;
      };
      ruleChainsFile = mkOption {
        type = types.nullOr types.path;
        default = null;
      };
    };
  };
  config = lib.mkIf cfg.enable {
    systemd.services.thingsboard-provision = {
      description = "Provision ThingsBoard IOT Platform";

      wantedBy = ["multi-user.target"];
      wants = [
        "thingsboard.service"
      ];
      after = [
        "thingsboard.service"
      ];

      environment.TB_RULE_CHAINS = lib.mkIf (cfg.ruleChainsFile != null ) cfg.ruleChainsFile;

      serviceConfig = {
        EnvironmentFile = lib.mkIf (cfg.environmentFile != null) cfg.environmentFile;
        ExecStart = "${pkgs.radioman}/bin/tbprovision";
        Type = "oneshot";
        RemainAfterExit = true;
        TimeoutStartSec = "15min";
        User = "thingsboard";
        Group = "thingsboard";
      };
    };
  };
}