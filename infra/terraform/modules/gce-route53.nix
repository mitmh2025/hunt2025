{ config, lib, ... }:
let
  inherit (config) route53;
  cfg = lib.filterAttrs (_: i: i.route53.zone != null) config.gce.instance;
in {
  options = with lib; {
    gce.instance = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
        options = {
          route53.zone = mkOption {
            type = types.nullOr types.str;
            default = null;
          };
          route53.aliases = mkOption {
            type = types.listOf types.str;
            default = [];
          };
        };
        config = {
          hostname = lib.mkIf (config.route53.zone != null) "${name}.${route53.${config.route53.zone}.domain}";
        };
      }));
    };
  };
  config = {
    route53 = let
      zones = builtins.groupBy (i: i.value.route53.zone) (lib.attrsToList cfg);
    in lib.mapAttrs (_: instances: {
      rr = lib.listToAttrs (lib.concatMap (i: [
        (i // {
          value = {
            type = "A";
            ttl = "300";
            records = [
              (lib.tfRef "resource.google_compute_instance.${i.name}.network_interface.0.access_config.0.nat_ip")
            ];
          };
        })
      ] ++ map (alias: lib.nameValuePair alias {
        type = "CNAME";
        ttl = "300";
        records = [
          (lib.tfRef "aws_route53_record.${i.name}.fqdn")
        ];
      }) i.value.route53.aliases) instances);
    }) zones;
  };
}
