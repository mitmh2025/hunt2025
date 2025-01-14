{ config, pkgs, lib, modulesPath, ... }:
let
  cfg = config.services.zammad;
  format = pkgs.formats.json {};
  autoWizard = format.generate "auto_wizard.json" {
    Settings = lib.mapAttrsToList (name: value: {
      inherit name value;
    }) cfg.settings;
    Channels = cfg.channels;
    EmailAddresses = cfg.addresses;
  };
in {
  disabledModules = [ "services/development/zammad.nix" ];
  imports = let
    origModule = import (modulesPath + "/services/development/zammad.nix");
  in [({ config, pkgs, lib, ...} @ args: let prev = origModule args; in {
    inherit (prev) options;
    config = lib.recursiveUpdate prev.config {
      content.systemd.services.zammad-web.preStart = prev.config.content.systemd.services.zammad-web.preStart + ''
        cp ${config.sops.templates."auto_wizard.json".path} ./auto_wizard.json
        chmod +w ./auto_wizard.json
        ./script/rails zammad:setup:auto_wizard[./auto_wizard.json]
        sed -i -e "s|:debug|:info|" ./config/environments/production.rb
      '';
    };
  })];

  options = with lib; {
    services.zammad = {
      settings = mkOption {
        type = types.attrsOf format.type;
        default = {};
        description = "Settings to enforce at Zammad startup";
      };
      channels = mkOption {
        type = types.listOf format.type;
        default = [];
      };
      addresses = mkOption {
        type = types.listOf format.type;
        default = [];
      };
    };
  };

  config = lib.mkIf cfg.enable {
    sops.templates."auto_wizard.json" = {
      group = "zammad";
      mode = "0440";
      file = autoWizard;
    };
  };
}