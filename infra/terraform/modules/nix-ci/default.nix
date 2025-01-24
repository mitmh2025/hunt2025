{ pkgs, config, lib, ... }:
let
  cfg = config.ci;
  deployKeyNames = builtins.attrNames cfg.github.repositories;
  deployKeyForEach = lib.mapAttrs (_: _: {}) cfg.github.repositories;
in {
  options = with lib; {
    ci = {
      github.repositories = mkOption {
        type = types.attrsOf (types.submodule {});
        default = {};
      };
      nix.cache = {
        bucket = mkOption {
          type = types.nullOr types.str;
          default = null;
        };
        users = mkOption {
          type = types.listOf types.str;
          default = [];
          apply = v: lib.unique (builtins.sort builtins.lessThan v);
        };
        viewers = mkOption {
          type = types.listOf types.str;
          default = [];
          apply = v: lib.unique (builtins.sort builtins.lessThan v);
        };
        arRepo = mkOption {
          type = types.str;
          description = "Name of google_artifact_registry_repository resource";
        };
        s3Url = mkOption {
          type = types.str;
          default = "s3://${cfg.nix.cache.bucket}?endpoint=https://storage.googleapis.com";
        };
      };
      triggers = mkOption {
        type = types.tfAttrsOf (types.submoduleWith {
          specialArgs = {
            inherit deployKeyNames;
            inherit (cfg.nix.cache) s3Url;
          };
          modules = [(import ./trigger.nix)];
        });
        default = {};
      };
    };
  };
  config = lib.mkMerge [
    (lib.mkIf (cfg.github.repositories != {}) {
      gcp.services.secretmanager.enable = true;

      # Create a deploy key for GitHub repo access.

      resource.tls_private_key.github_deploy_key = {
        for_each = deployKeyForEach;
        algorithm = "ED25519";
      };

      resource.github_repository_deploy_key.gcp = {
        for_each = deployKeyForEach;
        title = "GCP - ${lib.tfRef "data.google_project.this.project_id"}";
        repository = lib.tfRef "each.key";
        key = lib.tfRef "tls_private_key.github_deploy_key[each.key].public_key_openssh";
        read_only = true;
      };

      resource.google_secret_manager_secret.github_deploy_key = {
        for_each = deployKeyForEach;
        secret_id = "github-deploy-key-${lib.tfRef "each.key"}";
        replication.auto = {};
      };

      resource.google_secret_manager_secret_version.github_deploy_key = {
        for_each = deployKeyForEach;
        secret = lib.tfRef "google_secret_manager_secret.github_deploy_key[each.key].id";
        secret_data = lib.tfRef "tls_private_key.github_deploy_key[each.key].private_key_pem";
      };

      data.google_iam_policy.github_deploy_key_secret.binding = (lib.mkIf (cfg.triggers != {}) [
        {
          role = "roles/secretmanager.secretAccessor";
          members = [
            (lib.tfRef "google_service_account.cloud-build.member")
          ];
        }
      ]);

      resource.google_secret_manager_secret_iam_policy.github_deploy_key = (lib.mkIf (cfg.triggers != {}) {
        for_each = deployKeyForEach;
        secret_id = lib.tfRef "google_secret_manager_secret.github_deploy_key[each.key].secret_id";
        policy_data = lib.tfRef "data.google_iam_policy.github_deploy_key_secret.policy_data";
      });
    })
    (lib.mkIf (cfg.nix.cache.bucket != null) {
      gcp.services.storage-api.enable = true;

      # Create a bucket to cache Nix artifacts.

      resource.google_storage_bucket.nix-cache = {
        name          = cfg.nix.cache.bucket;
        force_destroy = false;
        location      = "US"; # Multi-region bucket
        storage_class = "STANDARD";

        uniform_bucket_level_access = true;
        public_access_prevention = "enforced"; # Always require credentials
      };
      data.google_iam_policy.nix-cache.binding = [
        {
          role = "roles/storage.legacyBucketOwner";
          members = [
            "projectOwner:${lib.tfRef "data.google_project.this.project_id"}"
          ];
        }
        {
          role = "roles/storage.objectUser";
          members = cfg.nix.cache.users;
        }
        {
          role = "roles/storage.objectViewer";
          members = cfg.nix.cache.viewers;
        }
      ];

      resource.google_storage_bucket_iam_policy.nix-cache = {
        bucket = lib.tfRef "google_storage_bucket.nix-cache.name";
        policy_data = lib.tfRef "data.google_iam_policy.nix-cache.policy_data";
      };
    })
    (lib.mkIf (cfg.triggers != {}) {
      gcp.services.cloudbuild.enable = true;

      # Create a service account for Cloud Build and grant it access to the bucket.

      gcp.serviceAccount.cloud-build = {
        displayName = "Google Cloud Build service account";
        iamRoles = [
          "serviceusage.serviceUsageConsumer"
          "iam.serviceAccountUser"
          "logging.logWriter"
          "cloudbuild.builds.builder" # TODO: Minimize these permissions
        ];
        # Create HMAC key for accessing the bucket and store it in Secret Manager.
        hmacKey.enable = true;
      };
      ci.nix.cache.users = [(lib.tfRef "google_service_account.cloud-build.member")];

      gcp.ar.${cfg.nix.cache.arRepo}.writers = [
        (lib.tfRef "google_service_account.cloud-build.member")
      ];

      resource.skopeo2_copy.nix-cache-image = let
        image = pkgs.callPackage ./build-image.nix {
          inherit (cfg.nix.cache) s3Url;
          deployKeys = cfg.github.repositories;
        };
      in {
        source_image = "docker-archive:${image}";
        destination_image = "docker://${config.gcp.ar.${cfg.nix.cache.arRepo}.url}/nix-cache";
      };

      resource.google_cloudbuild_trigger = lib.mapAttrs (_: v: v.resource) cfg.triggers;
    })
  ];
}
