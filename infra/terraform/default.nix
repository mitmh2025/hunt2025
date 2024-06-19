{ lib, ... }:
{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers = {
    aws.source = "registry.terraform.io/hashicorp/aws";
    google.source = "registry.terraform.io/hashicorp/google";
    local.source = "registry.terraform.io/hashicorp/local";
    nix.source = "registry.terraform.io/krostar/nix";
  };

  provider.google = {
    project = "mitmh2025-staging-gcp";
    region = "us-east5"; # Ohio
    zone = "us-east5-a";
  };

  provider.aws = {
    allowed_account_ids = [891377012427];
    region = "us-east-1";
  };

  imports = [
    ./base-image.nix
    ./state.nix
    ./staging.nix
  ];

  resource.google_project_service = lib.genAttrs [
    "compute"
    "cloudkms"
  ] (svc: {
    service = "${svc}.googleapis.com";

    disable_on_destroy = false;
  });

  data.aws_route53_zone.mitmh2025 = {
    name = "mitmh2025.com.";
  };

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

  data.google_compute_network.default = {
    name = "default";
  };
}
