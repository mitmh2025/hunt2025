{ config, namespace, lib, ... }:
{
  options.statefulSet = with lib; mkOption {
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
        statefulSet = mkOption {
          type = types.anything;
        };
        template = mkOption {
          type = types.anything;
        };
      };
      config = {
        resource.kubernetes_stateful_set_v1.${name} = config.statefulSet;

        template = {
          metadata.labels.app = name;
          spec.container = [config.container];
        };
        statefulSet = {
          metadata = {
            inherit namespace name;
            labels.app = name;
          };
          spec = {
            inherit (config) replicas;
            selector.match_labels.app = name;
            service_name = name;
            inherit (config) template;
          };
        };
        service = {
          spec.cluster_ip = "None";
        };
      };
    }));
    default = {};
  };
  config = {
    resource = lib.mkMerge (
        lib.mapAttrsToList (_: d: d.resource) config.statefulSet
    );
  };
}
