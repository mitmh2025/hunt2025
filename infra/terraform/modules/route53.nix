{ config, lib, ... }:
{
  options = with lib; {
    route53 = mkOption {
      type = types.attrsOf (types.submodule {
        options = {
          domain = mkOption {
            type = types.str;
          };
          provider = mkOption {
            type = with types; nullOr str;
            default = null;
          };
          rr = mkOption {
            type = types.tfAttrsOf (types.submodule ({ name, ... }: {
              freeformType = types.anything; # TODO: Use a better type?
              options = {
                name = mkOption {
                  type = types.str;
                  default = name;
                  description = "Record name";
                };
              };
            }));
            default = {};
          };
        };
      });
      default = {};
    };
  };
  config = {
    data.aws_route53_zone = lib.mapAttrs (name: zone: {
      provider = lib.mkIf (zone.provider != null) "aws.${zone.provider}";
      name = zone.domain;
    }) config.route53;
    resource.aws_route53_record = let
      zoneToRecords = zoneName: zone: lib.mapAttrs' (rrName: rr:
        lib.nameValuePair
          "${zoneName}_${rrName}"
          ({
            provider = lib.mkIf (zone.provider != null) "aws.${zone.provider}";
            zone_id = lib.tfRef "data.aws_route53_zone.${zoneName}.zone_id";
          } // rr)
      ) zone.rr;
    in lib.mergeAttrsList (
      lib.mapAttrsToList zoneToRecords config.route53
    );
  };
}