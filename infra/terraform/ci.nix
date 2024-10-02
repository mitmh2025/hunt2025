{ pkgs, lib, self, ... }:
# Inspired by https://fzakaria.com/2021/06/22/setting-up-a-nix-google-cloud-storage-gcs-binary-cache.html
let
  cacheBucket = "rb8tcjeo-nix-cache";
  repoUrl = "${lib.tfRef "google_artifact_registry_repository.images.location"}-docker.pkg.dev/${lib.tfRef "google_artifact_registry_repository.images.project"}/${lib.tfRef "google_artifact_registry_repository.images.name"}";
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
      "cloudbuild.builds.builder" # TODO: Minimize these permissions
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

  # Artifact Registry
  resource.google_artifact_registry_repository.images = {
    repository_id = "rb8tcjeo-images";
    location = "us"; # Free egress to us-*
    description = "mitmh2025 images";
    format = "DOCKER";
  };

  data.google_iam_policy.ar-images.binding = [
    {
      role = "roles/artifactregistry.writer";
      members = [
        (lib.tfRef "google_service_account.cloud-build.member")
      ];
    }
  ];

  resource.google_artifact_registry_repository_iam_policy.images = {
    project = lib.tfRef "google_artifact_registry_repository.images.project";
    location = lib.tfRef "google_artifact_registry_repository.images.location";
    repository = lib.tfRef "google_artifact_registry_repository.images.name";
    policy_data = lib.tfRef "data.google_iam_policy.ar-images.policy_data";
  };

  # Make sure you have run `gcloud auth configure-docker us-docker.pkg.dev`

  resource.terraform_data.nix-cache-image = let
    image = pkgs.dockerTools.buildLayeredImage {
      name = "nix-cache";
      tag = "latest";
      maxLayers = 120;
      contents = with pkgs; [
        dockerTools.binSh
        nix-fast-build
      ];
    };
    imageTar = pkgs.runCommand "${image.name}-tar" {} ''gunzip -c ${image} > $out'';
  in {
    depends_on = ["google_artifact_registry_repository.images"];
    # I can't find a provider that can push a Docker image?!
    # (There's `docker_image` in the official Docker provider, but that can't push a tarball and only works if you have a running Docker daemon.)
    provisioner.local-exec.command = ''
      ${pkgs.crane}/bin/crane push ${imageTar} ${repoUrl}/nix-cache
    '';
  };

  # Cloud Build trigger
  resource.google_cloudbuild_trigger.nix-cache-trigger = let
    cacheBucket = lib.tfRef "google_storage_bucket.nix-cache.name";
    s3Url = "s3://${cacheBucket}?endpoint=https://storage.googleapis.com";
  in {
    depends_on = [
      "terraform_data.nix-cache-image"
    ];
    name = "nix-cache-trigger";
    location = "us-east5";

    github.owner = "mitmh2025";
    github.name = "hunt2025";
    github.push.branch = "^main$";

    build.step = [{
      name = "${repoUrl}/nix-cache";
      script = ''
        nix-fast-build -f .#apps.x86_64-linux.apply.program --option extra-substituters ${s3Url} --option require-sigs false --no-nom --skip-cached --copy-to ${s3Url}
      '';
      secret_env = [
        "AWS_ACCESS_KEY_ID"
        "AWS_SECRET_ACCESS_KEY"
      ];
    }];

    build.available_secrets.secret_manager = [
      {
        env = "AWS_ACCESS_KEY_ID";
        version_name = lib.tfRef "google_secret_manager_secret_version.cloud-build-hmac-id.name";
      }
      {
        env = "AWS_SECRET_ACCESS_KEY";
        version_name = lib.tfRef "google_secret_manager_secret_version.cloud-build-hmac-secret.name";
      }
    ];

    build.logs_bucket = "gs://${lib.tfRef "google_storage_bucket.nix-cache.name"}/ci-logs";

    service_account = lib.tfRef "google_service_account.cloud-build.id";
  };
}
