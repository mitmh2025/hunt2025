{ config, lib, ... }:
{
  options = with lib; {
    route53 = mkOption {
      type = types.attrsOf (types.submodule ({ config, ... }: {
        options = {
          gcp_dns_authorizations = mkOption {
            type = types.listOf types.str;
            default = [];
          };
        };
        config = {
          rr = lib.listToAttrs (map (domain: let
            id = lib.tfSanitize domain;
          in lib.nameValuePair "acme_${id}" {
            name = lib.tfRef "google_certificate_manager_dns_authorization.${id}.dns_resource_record[0].name";
            type = lib.tfRef "google_certificate_manager_dns_authorization.${id}.dns_resource_record[0].type";
            ttl = "300";
            records = [
              (lib.tfRef "google_certificate_manager_dns_authorization.${id}.dns_resource_record[0].data")
            ];
          }) config.gcp_dns_authorizations);
        };
      }));
    };
  };
}