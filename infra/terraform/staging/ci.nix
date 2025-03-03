{ pkgs, config, lib, self, ... }:
# Inspired by https://fzakaria.com/2021/06/22/setting-up-a-nix-google-cloud-storage-gcs-binary-cache.html
{
  ci.github.repositories = {
    radio-media = {};
    mediamtx = {};
  };
  ci.nix.cache.bucket = "rb8tcjeo-nix-cache";
  ci.nix.cache.users = [
    # Give deploy VM access to our Nix cache.
    (lib.tfRef "data.terraform_remote_state.prod.outputs.google_service_account.prod-vm.member")
  ];

  ci.nix.cache.arRepo = "images";
  gcp.ar.images = {
    repoId = "rb8tcjeo-images";
    location = "us"; # Free egress to us-*
    description = "mitmh2025 images";
  };

  # Make sure you have run
  # `gcloud auth configure-docker us-docker.pkg.dev`
  # or
  # `docker-credential-gcr configure-docker --registries=us-docker.pkg.dev`
}
