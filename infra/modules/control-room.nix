{ config, pkgs, lib, ... }:
let
  cfg = config.hunt2025.controlRoom;
in {
  options = with lib; {
    hunt2025.controlRoom = {
      enable = mkEnableOption "Control Room";
      environmentFile = mkOption {
        type = types.str;
      };
      mediamtxApiUrl = mkOption {
        type = types.str;
        default = "http://localhost:9997";
      };
    };
  };
  config = lib.mkIf cfg.enable {
    users.users.control_room = {
      isSystemUser = true;
      group = "control_room";
    };
    users.groups.control_room = {};

    systemd.services.control_room = let
      deps = [
        "mediamtx.service"
      ];
    in {
      description = "Control Room";

      wantedBy = ["multi-user.target"];
      wants = deps;
      after = deps;

      environment.MEDIAMTX_API_URL = cfg.mediamtxApiUrl;

      serviceConfig = {
        ExecStart = "${lib.getExe pkgs.plump-himalayas}";
        Restart = "always";
        RestartSec = "5s";
        User = "control_room";
        Group = "control_room";
      };
    };
  };
}
