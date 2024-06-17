{ lib, ... }:
{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers = {
    local.source = "registry.terraform.io/hashicorp/local";
    google.source = "registry.terraform.io/hashicorp/google";
  };

  provider.google = {
    project = "mitmh2025-staging-gcp";
    region = "us-east5"; # Ohio
  };

  imports = [
    ./base-image.nix
    ./state.nix
  ];

  resource.google_project_service = lib.genAttrs [
    "compute"
    "cloudkms"
  ] (svc: {
    service = "${svc}.googleapis.com";

    disable_on_destroy = false;
  });

  # $ gcloud kms keyrings create sops --location global
  resource.google_kms_key_ring.sops = {
    name = "sops";
    location = "global";
  };
  # $ gcloud kms keys create sops-staging-key --location global --keyring sops --purpose encryption
  resource.google_kms_crypto_key.sops-staging-key = {
    name = "sops-staging-key";
    key_ring = lib.tfRef "google_kms_key_ring.sops.id";
    purpose = "ENCRYPT_DECRYPT";
  };
}
