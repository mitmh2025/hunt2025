{ config, lib, ... }:
{
  options = with lib; {
    state.bucket = {
      name = mkOption {
        type = types.nullOr types.str;
        default = null;
      };
      users = mkOption {
        type = types.listOf types.str;
        default = [];
        apply = v: lib.unique (builtins.sort builtins.lessThan v);
      };
    };
  };
  config = lib.mkIf (config.state.bucket.name != null) {
    resource.google_storage_bucket.tfstate = {
      name          = config.state.bucket.name;
      force_destroy = false;
      uniform_bucket_level_access = true;
      public_access_prevention = "enforced"; # Always require credentials
      location      = "US"; # Multi-region bucket
      storage_class = "STANDARD";
      versioning.enabled = true; # Keep old state files
      lifecycle_rule = [{
        condition = {
          # Delete old versions if they are >14d old and there are 10 newer versions.
          with_state = "ARCHIVED";
          num_newer_versions = 10;
          days_since_noncurrent_time = 14;
        };
        action.type = "Delete";
      }];
    };

    data.google_iam_policy.tfstate.binding = [
      {
        role = "roles/storage.legacyBucketOwner";
        members = [
          "projectOwner:${lib.tfRef "data.google_project.this.project_id"}"
        ];
      }
      {
        role = "roles/storage.objectUser";
        members = config.state.bucket.users;
      }
    ];

    resource.google_storage_bucket_iam_policy.tfstate = {
      bucket = lib.tfRef "google_storage_bucket.tfstate.name";
      policy_data = lib.tfRef "data.google_iam_policy.tfstate.policy_data";
    };

    terraform.backend.gcs = {
      bucket = config.state.bucket.name;
      prefix = "terraform/state";
    };
  };
}
