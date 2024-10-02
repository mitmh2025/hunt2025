{ lib, self, ... }:
# Inspired by https://fzakaria.com/2021/06/22/setting-up-a-nix-google-cloud-storage-gcs-binary-cache.html
let
  cacheBucket = "rb8tcjeo-nix-cache";
in {
  # Create a bucket to cache Nix artifacts.

  resource.google_storage_bucket.nix-cache = {
    name          = cacheBucket;
    force_destroy = false;
    location      = "US"; # Multi-region bucket
    storage_class = "STANDARD";

    uniform_bucket_level_access = true;
    public_access_prevention = "enforced"; # Always require credentials
  };

  # Create a service account for Cloud Build and grant it access to the bucket.

  gcp.serviceAccount.cloud-build = {
    displayName = "Google Cloud Build service account";
    iamRoles = [
      "serviceusage.serviceUsageConsumer"
      "iam.serviceAccountUser"
      "logging.logWriter"
    ];
  };

  data.google_iam_policy.nix-cache.binding = [
    {
      role = "roles/storage.objectUser";
      members = [
        (lib.tfRef "google_service_account.cloud-build.member")
      ];
    }
    {
      role = "roles/storage.objectViewer";
      members = [
        (lib.tfRef "google_service_account.staging-vm.member")
      ];
    }
  ];

  resource.google_storage_bucket_iam_policy.nix-cache = {
    bucket = lib.tfRef "google_storage_bucket.nix-cache.name";
    policy_data = lib.tfRef "data.google_iam_policy.nix-cache.policy_data";
  };

  # Create HMAC key for accessing the bucket and store it in Secret Manager.

  resource.google_storage_hmac_key.cloud-build = {
    service_account_email = lib.tfRef "google_service_account.cloud-build.email";
  };

  resource.google_secret_manager_secret.cloud-build-hmac-id = {
    secret_id = "cloud-build-hmac-id";
    replication.auto = {};
  };

  resource.google_secret_manager_secret.cloud-build-hmac-secret = {
    secret_id = "cloud-build-hmac-secret";
    replication.auto = {};
  };

  resource.google_secret_manager_secret_version.cloud-build-hmac-id = {
    secret = lib.tfRef "google_secret_manager_secret.cloud-build-hmac-id.id";
    secret_data = lib.tfRef "google_storage_hmac_key.cloud-build.access_id";
  };

  resource.google_secret_manager_secret_version.cloud-build-hmac-secret = {
    secret = lib.tfRef "google_secret_manager_secret.cloud-build-hmac-secret.id";
    secret_data = lib.tfRef "google_storage_hmac_key.cloud-build.secret";
  };

  data.google_iam_policy.cloud-build-hmac-secret.binding = [
    {
      role = "roles/secretmanager.secretAccessor";
      members = [
        (lib.tfRef "google_service_account.cloud-build.member")
      ];
    }
  ];

  resource.google_secret_manager_secret_iam_policy.cloud-build-hmac-id = {
    secret_id = lib.tfRef "google_secret_manager_secret.cloud-build-hmac-id.secret_id";
    policy_data = lib.tfRef "data.google_iam_policy.cloud-build-hmac-secret.policy_data";
  };

  resource.google_secret_manager_secret_iam_policy.cloud-build-hmac-secret = {
    secret_id = lib.tfRef "google_secret_manager_secret.cloud-build-hmac-secret.secret_id";
    policy_data = lib.tfRef "data.google_iam_policy.cloud-build-hmac-secret.policy_data";
  };

  # Cloud Build trigger
  resource.google_cloudbuild_trigger.nix-cache-trigger = {
    name = "nix-cache-trigger";
    location = "us-east5";

    github.owner = "mitmh2025";
    github.name = "hunt2025";
    github.push.branch = "^main$";

    substitutions = {
      _AWS_ACCESS_KEY_ID_SECRET = lib.tfRef "google_secret_manager_secret_version.cloud-build-hmac-id.name";
      _AWS_SECRET_ACCESS_KEY_SECRET = lib.tfRef "google_secret_manager_secret_version.cloud-build-hmac-secret.name";
      _CACHE_BUCKET = lib.tfRef "google_storage_bucket.nix-cache.name";
      _LOGS_BUCKET = "gs://${lib.tfRef "google_storage_bucket.nix-cache.name"}/ci-logs";
    };

    service_account = lib.tfRef "google_service_account.cloud-build.id";

    filename = "infra/cloudbuild/nix-cache.yaml";
  };
}
