{ pkgs, config, lib, self, ... }:
# Inspired by https://fzakaria.com/2021/06/22/setting-up-a-nix-google-cloud-storage-gcs-binary-cache.html
{
  ci.github.repositories.radio-media = {};
  ci.nix.cache.bucket = "rb8tcjeo-nix-cache";
  ci.nix.cache.users = [
    # Give deploy VM access to our Nix cache.
    (lib.tfRef "data.terraform_remote_state.prod.outputs.google_service_account.deploy-vm.member")
  ];
  ci.nix.cache.viewers = [
    (lib.tfRef "google_service_account.staging-vm.member")
  ];

  ci.nix.cache.arRepo = "images";
  gcp.ar.images = {
    repoId = "rb8tcjeo-images";
    location = "us"; # Free egress to us-*
    description = "mitmh2025 images";
  };

  ci.triggers.nix-cache-trigger = {
    repository = "hunt2025";
    script = ''
      nix-fast-build -f .#ciBuildTargets -j 1 --no-nom --skip-cached --debug --eval-workers 1 --eval-max-memory-size 1024  --copy-to ${config.ci.nix.cache.s3Url}
    '';
  };
  ci.triggers.autopush = {
    repository = "hunt2025";
    script = ''
      (
        set +x
        umask 0077
        echo "$''${AUTOPUSH_KEY}" > /keys/autopush_key
      )
      # Deploy to dev
      NIX_SSHOPTS="-i /keys/autopush_key -o StrictHostKeyChecking=no" nixos-rebuild switch --flake .#staging/dev --fast --target-host root@dev.mitmh2025.com
      nix copy '.#nixosConfigurations."staging/dev".config.system.build.toplevel' --to ${config.ci.nix.cache.s3Url}
    '';
    secrets.AUTOPUSH_KEY = lib.tfRef "google_secret_manager_secret_version.autopush_key.id";
  };

  # Make sure you have run
  # `gcloud auth configure-docker us-docker.pkg.dev`
  # or
  # `docker-credential-gcr configure-docker --registries=us-docker.pkg.dev`
}
