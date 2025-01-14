{ config, lib, ... }:
{
  options = with lib; {
    k8s = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: let
        namespace = name;
      in {
        options.deployments = mkOption {
          type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
            options = {
              image = mkOption {
                type = types.str;
              };
              env = mkOption {
                type = types.attrsOf (types.str);
                default = {};
              };
              secretEnv = mkOption {
                type = types.attrsOf types.str;
                default = {};
              };
              envValueFrom = mkOption {
                type = types.attrsOf types.anything;
                default = {};
              };
              replicas = mkOption {
                type = types.ints.positive;
                default = 1;
              };
              port = mkOption {
                type = types.nullOr types.port;
                default = null;
              };
              # Below this point are parts of raw k8s resources, to set extra attributes.
              service = mkOption {
                type = types.nullOr types.anything;
                default = null;
              };
              secret = mkOption {
                type = types.anything;
              };
              deployment = mkOption {
                type = types.anything;
              };
              container = mkOption {
                type = types.anything;
              };
              template = mkOption {
                type = types.anything;
              };
              resource = mkOption {
                type = types.anything;
              };
            };
            config = {
              resource.kubernetes_deployment_v1.${name} = config.deployment;
              container = {
                inherit name;
                inherit (config) image;
                env = lib.attrsToList config.env ++ (lib.mapAttrsToList (key: _: {
                  name = key;
                  value_from = [{
                    secret_key_ref = [{
                      inherit key name;
                    }];
                  }];
                }) config.secretEnv) ++ (lib.mapAttrsToList (name: value_from: {
                  inherit name;
                  value_from = [value_from];
                }) config.envValueFrom);
              };
              template = {
                metadata.labels.app = name;
                spec.container = [config.container];
              };
              deployment = {
                metadata = {
                  inherit namespace name;
                  labels.app = name;
                };
                spec = {
                  inherit (config) replicas;
                  selector.match_labels.app = name;
                  inherit (config) template;
                };
              };
              secret = {
                metadata = {
                  inherit namespace name;
                };
                data = config.secretEnv;
              };
              resource.kubernetes_secret_v1.${name} = lib.mkIf (config.secret.data != {}) config.secret;
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
          }));
          default = {};
        };
      }));
      default = {};
    };
  };
  config = {
    resource = lib.mkMerge (
      lib.mapAttrsToList (_: namespace: lib.mkMerge (
        lib.mapAttrsToList (_: d: d.resource) namespace.deployments)
      ) config.k8s
    );
  };
}
