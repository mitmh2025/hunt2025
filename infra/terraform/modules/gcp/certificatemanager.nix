{ config, lib, ... }:
{
  options = with lib; {
    gcp.certificateMap = mkOption {
      default = {};
      type = types.tfAttrsOf (types.submodule ({ name, config, ...} : {
        options = {
          defaultCertificateName = mkOption {
            type = types.str;
          };
          host = mkOption {
            type = types.attrsOf types.str;
            default = {};
          };
          resource = mkOption {
            type = types.anything;
          };
        };
        config.resource = {
          google_certificate_manager_certificate_map.${name} = {
            inherit name;
          };
          google_certificate_manager_certificate_map_entry = {
            "${name}" = {
              inherit name;
              map = lib.tfRef "google_certificate_manager_certificate_map.${name}.name";
              certificates = [
                (lib.tfRef "google_certificate_manager_certificate.${config.defaultCertificateName}.id")
              ];
              matcher = "PRIMARY";
            };
          } // (lib.mapAttrs' (hostname: certName: let
              certMapName = "${name}-${hostname}";
            in lib.nameValuePair certMapName {
              name = certMapName;
              map = lib.tfRef "google_certificate_manager_certificate_map.${name}.name";
              certificates = [
                (lib.tfRef "google_certificate_manager_certificate.${certName}.id")
              ];
              inherit hostname;
            }) config.host);
        };
      }));
    };
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
    resource = lib.mkMerge (
      (lib.mapAttrsToList (_: certificate: certificate.resource) config.gcp.certificate)
      ++ (lib.mapAttrsToList (_: certificate: certificate.resource) config.gcp.certificateMap)
    );
    gcp.certificateMap = lib.mapAttrs (name: _: {
      defaultCertificateName = name;
    }) config.gcp.certificate;
  };
}