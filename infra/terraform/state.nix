let
  stateBucket = "rb8tcjeo-tfstate";
in {
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
}
