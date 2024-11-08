{ pkgs, config, lib, name, s3Url, deployKeyNames, ... }:
let
  registry = "${lib.tfRef "google_artifact_registry_repository.images.location"}-docker.pkg.dev";
  repoUrl = "${registry}/${lib.tfRef "google_artifact_registry_repository.images.project"}/${lib.tfRef "google_artifact_registry_repository.images.name"}";
in {
  options = with lib; {
    repository = mkOption {
      type = types.str;
    };
    script = mkOption {
      type = types.str;
    };
    secrets = mkOption {
      type = types.attrsOf types.str;
      default = {};
    };
    resource = mkOption {
      type = types.anything;
      readOnly = true;
    };
  };
  config.secrets = {
    AWS_ACCESS_KEY_ID = lib.tfRef "google_secret_manager_secret_version.cloud-build-hmac-id.name";
    AWS_SECRET_ACCESS_KEY = lib.tfRef "google_secret_manager_secret_version.cloud-build-hmac-secret.name";
  } // builtins.listToAttrs (lib.imap (i: repo: lib.nameValuePair
    "DEPLOY_KEY_${toString i}"
    (lib.tfRef "google_secret_manager_secret_version.github_deploy_key[\"${repo}\"].id")
  ) deployKeyNames);
  config.resource = {
    depends_on = [
      "skopeo2_copy.nix-cache-image"
    ];
    inherit name;
    location = "us-east5";

    github.owner = "mitmh2025";
    github.name = config.repository;
    github.push.branch = "^main$";

    approval_config.approval_required = false;

    build.timeout = "3600s";

    build.step = [{
      name = "${repoUrl}/nix-cache";
      script = let
        writeKey = i: repo: ''echo "$''${DEPLOY_KEY_${toString i}}" > "/keys/${repo}_deploy_key"'';
        writeKeys = lib.concatImapStringsSep "\n" writeKey deployKeyNames;
      in ''
        set -ex
        (
          set +x
          umask 0077
          mkdir -p /keys
          ${writeKeys}
        )
        ${config.script}
      '';
      secret_env = builtins.attrNames config.secrets;
    }];

    build.available_secrets.secret_manager = lib.mapAttrsToList (env: version_name: {
      inherit env version_name;
    }) config.secrets;

    build.logs_bucket = "gs://${lib.tfRef "google_storage_bucket.nix-cache.name"}/ci-logs";

    service_account = lib.tfRef "google_service_account.cloud-build.id";
  };
}
