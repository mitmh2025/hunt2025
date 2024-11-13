{ config, lib, pkgs, ... }:
let
  cfg = config.services.atlantis;
  configFormat = pkgs.formats.yaml {};
  configYaml = configFormat.generate "atlantis.yml" cfg.config;
in {
  options = with lib; {
    services.atlantis = {
      enable = mkEnableOption "Atlantis CI/CD";
      user = mkOption {
        type = types.str;
      };
      config = mkOption {
        inherit (configFormat) type;
        default = {};
      };
      configPath = mkOption {
        type = types.path;
        default = configYaml;
      };
      repos = mkOption {
        type = types.listOf configFormat.type;
        default = [];
      };
      workflows = mkOption {
        type = types.attrsOf configFormat.type;
        default = {};
      };
    };
  };
  config = lib.mkIf cfg.enable {
    environment.systemPackages = with pkgs; [
      atlantis
    ];
    services.atlantis.config.repo-config = lib.mkIf (cfg.repos != [] || cfg.workflows != {}) (configFormat.generate "repos.yml" {
      inherit (cfg) repos workflows;
    });
    systemd.services.atlantis = {
      description = "Atlantis";

      wantedBy = ["multi-user.target"];
      wants = ["network-online.target"];
      after = ["network-online.target"];

      serviceConfig = {
        ExecStart = "${lib.getExe pkgs.atlantis} server --config ${cfg.configPath}";
        User = "deploy";
        Restart = "always";
        RestartSec = "5s";
      };
    };
  };
}
