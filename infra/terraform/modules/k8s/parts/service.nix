{ config, namespace, name, provider, lib, ... }:
{
  options = with lib; {
    port = mkOption {
      type = types.nullOr types.port;
      default = null;
    };
    expose = mkOption {
      type = types.bool;
      default = false;
    };
    backendService = mkEnableOption "Create a google_compute_backend_service";
    service = mkOption {
      type = types.nullOr types.anything;
      default = null;
    };
  };
  config = lib.mkMerge [
    {
      service = lib.mkIf (config.port != null) {
        metadata = {
          inherit namespace name;
          annotations."cloud.google.com/neg" = lib.mkMerge [
            (lib.mkIf config.expose (builtins.toJSON {
              exposed_ports."${toString config.port}".name = "${namespace}-${name}";
            }))
            (lib.mkIf (!config.expose) (builtins.toJSON {
              ingress = false;
            }))
          ];
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
      resource.kubernetes_service_v1.${name} = lib.mkIf (config.port != null) config.service;
    }
    (lib.mkIf config.backendService {
      data.google_compute_network_endpoint_group."${namespace}-${name}" = {
        depends_on = ["kubernetes_service_v1.${name}"];
        name = "${namespace}-${name}";
        inherit (provider.google) zone;
      };
      resource.google_compute_backend_service.${name} = {
        inherit name;
        load_balancing_scheme = "EXTERNAL_MANAGED";
        backend = [{
          balancing_mode = "RATE";
          # If we had more than one backend, this would be used to belance between them.
          max_rate_per_endpoint = 1;
          group = lib.tfRef "data.google_compute_network_endpoint_group.${namespace}-${name}.self_link";
        }];
        health_checks = [(lib.tfRef "google_compute_health_check.healthz.id")];
        log_config.enable = true;
      };
    })
  ];
}