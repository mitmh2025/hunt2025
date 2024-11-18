{ config, lib, ... }:
{
  options = with lib; {
    gcp.certificate = mkOption {
      default = {};
      type = types.tfAttrsOf (types.submodule ({ name, config, ...} : {
        options = {
          scope = mkOption {
            type = types.str;
          };
          domains = mkOption {
            type = types.listOf types.str;
          };
          resource = mkOption {
            type = types.anything;
          };
        };
        config = {
          resource.google_certificate_manager_certificate.${name} = {
            inherit name;
            inherit (config) scope;
            managed.domains = config.domains;
            managed.dns_authorizations = lib.map (id: lib.tfRef "google_certificate_manager_dns_authorization.${id}.id") (lib.attrNames config.resource.google_certificate_manager_dns_authorization);
          };
          resource.google_certificate_manager_certificate_map.${name} = {
            inherit name;
          };
          resource.google_certificate_manager_certificate_map_entry.${name} = {
            inherit name;
            map = lib.tfRef "google_certificate_manager_certificate_map.${name}.name";
            certificates = [
              (lib.tfRef "google_certificate_manager_certificate.${name}.id")
            ];
            matcher = "PRIMARY";
          };
          resource.google_certificate_manager_dns_authorization = lib.listToAttrs (lib.map (domain: let
            name = lib.tfSanitize domain;
          in lib.nameValuePair name {
            inherit name;
            depends_on = ["google_project_service.certificatemanager"];
            location = "global";
            inherit domain;
          }) config.domains);
        };
      }));
    };
  };
  config = {
    resource.google_certificate_manager_certificate = lib.mergeAttrsList (lib.mapAttrsToList (_: value: value.resource.google_certificate_manager_certificate) config.gcp.certificate);
    resource.google_certificate_manager_dns_authorization = lib.mergeAttrsList (lib.mapAttrsToList (_: value: value.resource.google_certificate_manager_dns_authorization) config.gcp.certificate);
    resource.google_certificate_manager_certificate_map = lib.mergeAttrsList (lib.mapAttrsToList (_: value: value.resource.google_certificate_manager_certificate_map) config.gcp.certificate);
    resource.google_certificate_manager_certificate_map_entry = lib.mergeAttrsList (lib.mapAttrsToList (_: value: value.resource.google_certificate_manager_certificate_map_entry) config.gcp.certificate);
  };
}