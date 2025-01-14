{ config, lib, ... }:
{
  options = with lib; {
    k8s = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: let
        namespace = name;
      in {
        config._module.args.namespace = namespace;
        options.resource = mkOption {
          type = types.attrsOf types.anything;
          default = {};
        };
        imports = [
          ./deployment.nix
          ./stateful-set.nix
        ];
      }));
      default = {};
    };
  };
  config = {
    resource = lib.mkMerge (lib.mapAttrsToList (_: namespace: namespace.resource) config.k8s);
  };
}
