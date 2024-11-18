{ config, lib, ... }:
{
  options = with lib; {
    gcp.ar = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
        options = {
          repoId = mkOption {
            type = types.str;
            default = name;
          };
          location = mkOption {
            type = types.str;
          };
          description = mkOption {
            type = types.nullOr types.str;
            default = null;
          };
          readers = mkOption {
            type = types.listOf types.str;
            default = [];
          };
          writers = mkOption {
            type = types.listOf types.str;
            default = [];
          };
          resource = mkOption {
            type = types.anything;
            readOnly = true;
          };
          data = mkOption {
            type = types.anything;
            readOnly = true;
          };
          url = mkOption {
            type = types.str;
            readOnly = true;
            default = let
              registry = "${lib.tfRef "google_artifact_registry_repository.${name}.location"}-docker.pkg.dev";
            in "${registry}/${lib.tfRef "google_artifact_registry_repository.${name}.project"}/${lib.tfRef "google_artifact_registry_repository.${name}.name"}";
          };
        };
        config = {
          resource.google_artifact_registry_repository.${name} = {
            repository_id = config.repoId;
            inherit (config) location;
            description = lib.mkIf (config.description != null) config.description;
            format = "DOCKER";
          };

          data.google_iam_policy."ar-${name}".binding = [
            {
              role = "roles/artifactregistry.reader";
              members = config.readers;
            }
            {
              role = "roles/artifactregistry.writer";
              members = config.writers;
            }
          ];

          resource.google_artifact_registry_repository_iam_policy.${name} = {
            project = lib.tfRef "google_artifact_registry_repository.${name}.project";
            location = lib.tfRef "google_artifact_registry_repository.${name}.location";
            repository = lib.tfRef "google_artifact_registry_repository.${name}.name";
            policy_data = lib.tfRef "data.google_iam_policy.ar-${name}.policy_data";
          };
        };
      }));
      default = {};
    };
  };
  config = {
    gcp.services.artifactregistry.enable = lib.mkIf (config.gcp.ar != {}) true;
    resource = lib.mkMerge (lib.mapAttrsToList (_: repo: repo.resource) config.gcp.ar);
    data = lib.mkMerge (lib.mapAttrsToList (_: repo: repo.data) config.gcp.ar);
  };
}
