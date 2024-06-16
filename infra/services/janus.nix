{ config, pkgs, lib, ... }:
let
  configFormat = pkgs.formats.libconfig {};
  cfg = config.services.janus;
in {
  options = with lib; {
    services.janus.settings = mkOption {
      type = types.submodule {
        freeformType = configFormat.type;
      };
    };
    services.janus.plugins = mkOption {
      type = types.attrsOf (types.submodule {
        options.settings = mkOption {
          inherit (configFormat) type;
        };
      });
      default = {};
    };
    services.janus.transports = mkOption {
      type = types.attrsOf (types.submodule {
        options.settings = mkOption {
          inherit (configFormat) type;
        };
      });
      default = {};
    };
    services.janus.configFiles = mkOption {
      type = types.attrsOf types.package;
    };
  };
  config = {
    services.janus = {
      settings = {
        general = {
          plugins_folder = "${pkgs.janus-gateway}/lib/janus/plugins";
          transports_folder = "${pkgs.janus-gateway}/lib/janus/transports";
          events_folder = "${pkgs.janus-gateway}/lib/janus/events";
          loggers_folder = "${pkgs.janus-gateway}/lib/janus/loggers";
          debug_level = 4;

          token_auth = true;
          admin_secret = "hackme";
        };
        nat.nice_debug = false;
        # TODO: events.broadcast = true; will send stats
      };
      plugins.streaming.settings = {
        general = {
          admin_key = "hackme";
          string_ids = true;
        };
      };
      transports.http.settings = {
        general = {
          http = true;
          port = 8088;
        };
        admin = {
          admin_http = true;
          admin_port = 7088;
        };
      };
      # TODO: Configure `mqtt` transport
      # TODO: Configure `websockets` transport
      # TODO: Configure `pfunix` transport
    };
    services.janus.configFiles = let
      files = {
        "janus.jcfg" = cfg.settings;
      }
      // (lib.mapAttrs' (name: value: lib.nameValuePair "janus.plugin.${name}.jcfg" value.settings) cfg.plugins)
      // (lib.mapAttrs' (name: value: lib.nameValuePair "janus.transport.${name}.jcfg" value.settings) cfg.transports)
      ;
    in lib.mapAttrs configFormat.generate files;
  };
}