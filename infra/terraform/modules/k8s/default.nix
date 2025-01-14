{ config, lib, ... }:
let
  provider = config.provider;
in {
  options = with lib; {
    k8s = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: let
        namespace = name;
      in {
        config._module.args.namespace = namespace;
        config._module.args.provider = provider;
        options.resource = mkOption {
          type = types.attrsOf types.anything;
          default = {};
        };
        options.data = mkOption {
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
    data = lib.mkMerge (lib.mapAttrsToList (_: namespace: namespace.data) config.k8s);
  };
}
