{ config, pkgs, lib, ... }:
let
  cfg = config.hunt2025.ops;
in {
  options = with lib; {
    hunt2025.ops = {
      enable = mkEnableOption "Hunt site";
      port = mkOption {
        type = with types; coercedTo ints.u16 (n: toString n) str;
        default = 3002;
        description = "Port or path to listen on";
      };
      apiBaseUrl = mkOption {
        type = types.str;
        default = "http://localhost:3000/api";
        description = "Base URL for API requests";
      };
      oauthServer = mkOption {
        type = types.str;
      };
    };
  };
  config = lib.mkIf cfg.enable {
    users.users.hunt2025-ops = {
      isSystemUser = true;
      group = "hunt2025-ops";
    };
    users.groups.hunt2025-ops = {};

    systemd.services.hunt2025-ops = let
      deps = [
        "hunt2025.service"
      ];
    in {
      description = "Hunt 2025 Ops";

      wantedBy = ["multi-user.target"];
      wants = deps;
      after = deps;

      environment.OPSSITE_PORT = cfg.port;
      environment.OPSSITE_STATIC_PATH = "${pkgs.hunt2025.ops}/share/ops/static";
      environment.API_BASE_URL = cfg.apiBaseUrl;
      environment.OAUTH_SERVER = cfg.oauthServer;

      serviceConfig = {
        ExecStart = "${pkgs.hunt2025.misc}/bin/ops";
        Restart = "always";
        RestartSec = "5s";
        User = "hunt2025-ops";
        Group = "hunt2025-ops";
        UMask = "0007";
      };
    };
  };
}
