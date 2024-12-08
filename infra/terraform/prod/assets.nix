{ config, lib, pkgs, radio-media, ... }:
let
  assetBucketName = "cvqb2gwr-assets";
  giantSwitch = pkgs.mkRadioManifest {
    name = "giant-switch";
    src = radio-media + "/giant-switch";
    baseUrl = "/giant-switch";
  };
in {
  resource.google_storage_bucket.assets = {
    name = assetBucketName;
    force_destroy = false;
    uniform_bucket_level_access = true;
    location      = "US"; # Multi-region so assets are closer to users.
    storage_class = "STANDARD";
  };
  data.google_iam_policy.assets.binding = [
    {
      role = "roles/storage.admin";
      members = [
        "projectOwner:${lib.tfRef "data.google_project.this.project_id"}"
      ];
    }
    {
      # legacyObjectReader grants `get` without `list`.
      role = "roles/storage.legacyObjectReader";
      members = ["allUsers"];
    }
  ];
  resource.google_storage_bucket_iam_policy.assets = {
    bucket = lib.tfRef "google_storage_bucket.assets.name";
    policy_data = lib.tfRef "data.google_iam_policy.assets.policy_data";
  };

  module.asset_files = {
    source = "hashicorp/dir/template";
    base_dir = "${pkgs.hunt2025.assets}";
  };

  # Can't use google_storage_bucket_object because we don't want to delete old files.
  resource.terraform_data.assets = {
    triggers_replace = [
      (lib.tfRef "google_storage_bucket.assets.name")
      (lib.tfRef "{for path, value in module.asset_files.files : path => value.digests.sha256}")
    ];
    provisioner.local-exec = {
      command = "${pkgs.google-cloud-sdk}/bin/gsutil -m rsync -r ${pkgs.hunt2025.assets} gs://${lib.tfRef "google_storage_bucket.assets.name"}";
    };
  };

  module.giant_switch_files = {
    source = "hashicorp/dir/template";
    base_dir = "${giantSwitch}";
  };

  resource.terraform_data.giant-switch = {
    triggers_replace = [
      (lib.tfRef "google_storage_bucket.assets.name")
      (lib.tfRef "{for path, value in module.giant_switch_files.files : path => value.digests.sha256}")
    ];
    provisioner.local-exec = {
      command = "${pkgs.google-cloud-sdk}/bin/gsutil -m rsync -r ${giantSwitch} gs://${lib.tfRef "google_storage_bucket.assets.name"}/giant-switch";
    };
  };
}