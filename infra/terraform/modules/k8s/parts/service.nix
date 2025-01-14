{ config, namespace, name, lib, ... }:
{
  options = with lib; {
    port = mkOption {
      type = types.nullOr types.port;
      default = null;
    };
    service = mkOption {
      type = types.nullOr types.anything;
      default = null;
    };
  };
  config = {
    service = lib.mkIf (config.port != null) {
      metadata = {
        inherit namespace name;
        annotations."cloud.google.com/neg" = builtins.toJSON {
          exposed_ports."${toString config.port}".name = "${namespace}-${name}";
        };
      };
      lifecycle.ignore_changes = [
        ''metadata[0].annotations["cloud.google.com/neg-status"]''
      ];
      spec = {
        type = "ClusterIP";
        selector.app = name;
        port = [
          {
            inherit (config) port;
            protocol = "TCP";
            target_port = config.port;
          }
        ];
      };
    };
    resource.kubernetes_service_v1.${name} = lib.mkIf (config.service != null) config.service;
  };
}