{ pkgs, config, lib, self, ... }:
# Inspired by https://fzakaria.com/2021/06/22/setting-up-a-nix-google-cloud-storage-gcs-binary-cache.html
let
  registry = "${lib.tfRef "google_artifact_registry_repository.images.location"}-docker.pkg.dev";
  repoUrl = "${registry}/${lib.tfRef "google_artifact_registry_repository.images.project"}/${lib.tfRef "google_artifact_registry_repository.images.name"}";
  s3Url = "s3://${config.resource.google_storage_bucket.nix-cache.name}?endpoint=https://storage.googleapis.com";
  deployKeys = {
    radio-media = {};
  };
  deployKeyNames = builtins.attrNames deployKeys;
in {
  # Create a deploy key for GitHub repo access.

  resource.tls_private_key.github_deploy_key = {
    for_each = deployKeys;
    algorithm = "ED25519";
  };

  resource.github_repository_deploy_key.gcp = {
    for_each = deployKeys;
    title = "GCP - ${lib.tfRef "data.google_project.this.project_id"}";
    repository = lib.tfRef "each.key";
    key = lib.tfRef "tls_private_key.github_deploy_key[each.key].public_key_openssh";
    read_only = true;
  };

  resource.google_secret_manager_secret.github_deploy_key = {
    for_each = deployKeys;
    secret_id = "github-deploy-key-${lib.tfRef "each.key"}";
    replication.auto = {};
  };

  resource.google_secret_manager_secret_version.github_deploy_key = {
    for_each = deployKeys;
    secret = lib.tfRef "google_secret_manager_secret.github_deploy_key[each.key].id";
    secret_data = lib.tfRef "tls_private_key.github_deploy_key[each.key].private_key_pem";
  };

  data.google_iam_policy.github_deploy_key_secret.binding = [
    {
      role = "roles/secretmanager.secretAccessor";
      members = [
        (lib.tfRef "google_service_account.cloud-build.member")
      ];
    }
  ];

  resource.google_secret_manager_secret_iam_policy.github_deploy_key = {
    for_each = deployKeys;
    secret_id = lib.tfRef "google_secret_manager_secret.github_deploy_key[each.key].secret_id";
    policy_data = lib.tfRef "data.google_iam_policy.github_deploy_key_secret.policy_data";
  };

  # Create a bucket to cache Nix artifacts.

  resource.google_storage_bucket.nix-cache = {
    name          = "rb8tcjeo-nix-cache";
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
      role = "roles/storage.legacyBucketOwner";
      members = [
        "projectOwner:${lib.tfRef "data.google_project.this.project_id"}"
      ];
    }
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

  # Make sure you have run
  # `gcloud auth configure-docker us-docker.pkg.dev`
  # or
  # `docker-credential-gcr configure-docker --registries=us-docker.pkg.dev`
  resource.skopeo2_copy.nix-cache-image = let
    image = pkgs.dockerTools.buildLayeredImage {
      name = "nix-cache";
      tag = "latest";
      maxLayers = 120;
      contents = with pkgs; [
        (pkgs.writeTextDir "etc/nix/nix.conf" ''
          extra-experimental-features = nix-command flakes
          substituters = ${s3Url} https://cache.nixos.org/
          require-sigs = false
          build-users-group =
        '')
        (pkgs.writeTextDir "etc/gitconfig" (lib.generators.toGitINI {
          url = lib.mapAttrs' (
            repo: args:
            lib.nameValuePair
              "ssh://git@github-${repo}/mitmh2025/${repo}"
              {
                insteadOf = "ssh://git@github.com/mitmh2025/${repo}";
              }
          ) deployKeys;
        }))
        (pkgs.writeTextDir "etc/ssh/ssh_config" (
          lib.concatStringsSep "\n" (lib.mapAttrsToList (
            repo: args:
            ''
              Host github-${repo}
                Hostname github.com
                IdentityFile /keys/${repo}_deploy_key
            ''
          ) deployKeys)
        ))
        (pkgs.writeTextDir "etc/ssh/ssh_known_hosts" ''
          github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl
          github.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEmKSENjQEezOmxkZMy7opKgwFB9nkt5YRrYMjNuG5N87uRgg6CLrbo5wAdT/y6v0mKV0U2w0WZ2YB/++Tpockg=
          github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=
        '')
        dockerTools.binSh
        dockerTools.caCertificates
        dockerTools.fakeNss
        git
        nix
        nix-fast-build
        openssh
        coreutils
      ];
      extraCommands = ''
        mkdir -p nix/var/nix/gcroots
        ln -sf /nix/var/nix/profiles nix/var/nix/gcroots/profiles
      '';
    };
  in {
    source_image = "docker-archive:${image}";
    destination_image = "docker://${repoUrl}/nix-cache";
  };

  # Cloud Build trigger

  resource.google_cloudbuild_trigger.nix-cache-trigger = {
    depends_on = [
      "skopeo2_copy.nix-cache-image"
    ];
    name = "nix-cache-trigger";
    location = "us-east5";

    github.owner = "mitmh2025";
    github.name = "hunt2025";
    github.push.branch = "^main$";

    approval_config.approval_required = false;

    build.step = [{
      name = "${repoUrl}/nix-cache";
      script = let
        writeKey = i: repo: ''echo "$''${DEPLOY_KEY_${toString i}}" > "/keys/${repo}_deploy_key"'';
        writeKeys = lib.concatImapStringsSep "\n" writeKey deployKeyNames;
      in ''
        (
          umask 0077
          mkdir -p /keys
          ${writeKeys}
        )
        nix-fast-build -f .#ciBuildTargets --option extra-substituters ${s3Url} --option require-sigs false --no-nom --skip-cached --eval-workers 1 --eval-max-memory-size 1024  --copy-to ${s3Url}
      '';
      secret_env = [
        "AWS_ACCESS_KEY_ID"
        "AWS_SECRET_ACCESS_KEY"
      ] ++ (lib.imap (i: repo: "DEPLOY_KEY_${toString i}") deployKeyNames);
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
    ] ++ (lib.imap (i: repo: {
      env = "DEPLOY_KEY_${toString i}";
      version_name = lib.tfRef "google_secret_manager_secret_version.github_deploy_key[\"${repo}\"].id";
    }) deployKeyNames);

    build.logs_bucket = "gs://${lib.tfRef "google_storage_bucket.nix-cache.name"}/ci-logs";

    service_account = lib.tfRef "google_service_account.cloud-build.id";
  };
}
