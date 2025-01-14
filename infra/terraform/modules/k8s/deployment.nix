{ config, namespace, lib, ... }:
{
  options.deployment = with lib; mkOption {
    type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
      config._module.args.namespace = namespace;
      imports = [
        ./parts/resource.nix
        ./parts/container.nix
        ./parts/service.nix
      ];
      options = {
        replicas = mkOption {
          type = types.ints.positive;
          default = 1;
        };
        deployment = mkOption {
          type = types.anything;
        };
        template = mkOption {
          type = types.anything;
        };
      };
      config = {
        resource.kubernetes_deployment_v1.${name} = config.deployment;

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
      };
    }));
    default = {};
  };
  config = {
    resource = lib.mkMerge (
        lib.mapAttrsToList (_: d: d.resource) config.deployment
    );
  };
}
