{ config, lib, ... }:
{
  options = with lib; {
    gcp.ar = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
        options = {
          images = let
            repoName = name;
            repoConfig = config;
          in mkOption {
            default = {};
            type = types.attrsOf (types.submodule ({ name, config, ... }: {
              options = {
                sourceImage = mkOption {
                  type = types.addCheck types.package (x: x ? imageTag);
                };
                urlRef = mkOption {
                  type = types.str;
                  readOnly = true;
                };
                resource = mkOption {
                  type = types.anything;
                };
              };
              config = {
                resource.skopeo2_copy.${name} = {
                  depends_on = ["google_artifact_registry_repository.${repoName}"];
                  source_image = "docker-archive:${config.sourceImage}";
                  destination_image = "docker://${repoConfig.url}/site:${config.sourceImage.imageTag}";
                  keep_image = true; # Ensure that old replica sets can keep running.
                };
                urlRef = ''trimprefix(resource.skopeo2_copy.${name}.destination_image, "docker://")'';
              };
            }));
          };
        };
        config = {
          resource = lib.mkMerge (lib.mapAttrsToList (_: image: image.resource) config.images);
        };
      }));
    };
  };
  # config = {
  #   resource = lib.mkMerge (
  #     lib.concatMap
  #     (repo: lib.mapAttrsToList (_: image: image.resource) repo.images)
  #     config.gcp.ar
  #   );
  # };
}
