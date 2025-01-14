{ config, namespace, name, lib, ...}:
{
  options = with lib; {
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
    container = mkOption {
      type = types.anything;
    };
    secret = mkOption {
      type = types.anything;
    };
  };
  config = {
    container = {
      name = lib.mkDefault name;
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
    secret = {
      metadata = {
        inherit namespace name;
      };
      data = config.secretEnv;
    };
    resource.kubernetes_secret_v1.${name} = lib.mkIf (config.secret.data != {}) config.secret;
  };
}