let
  stateBucket = "rb8tcjeo-tfstate";
in {
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers.local = {
    source = "registry.terraform.io/hashicorp/local";
  };
  terraform.required_providers.google = {
    source = "registry.terraform.io/hashicorp/google";
  };

  provider.google = {
    project = "mitmh2025-staging-gcp";
    region = "us-east5"; # Ohio
  };

  resource.google_storage_bucket.tfstate = {
    name          = stateBucket;
    force_destroy = false;
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

  terraform.backend.gcs = {
    bucket = stateBucket;
    prefix = "terraform/state";
  };

  # $ gcloud kms keyrings create sops --location global
  resource.google_kms_key_ring.sops = {
    name = "sops";
    location = "global";
  };
  # $ gcloud kms keys create sops-staging-key --location global --keyring sops --purpose encryption
  resource.google_kms_crypto_key.sops-staging-key = {
    name = "sops-staging-key";
    key_ring = "\${google_kms_key_ring.sops.id}";
    purpose = "ENCRYPT_DECRYPT";
  };
}
