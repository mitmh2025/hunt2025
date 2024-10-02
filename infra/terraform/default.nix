{ lib, ... }:
{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers = {
    aws.source = "registry.terraform.io/hashicorp/aws";
    google.source = "registry.terraform.io/hashicorp/google";
    local.source = "registry.terraform.io/hashicorp/local";
    nix.source = "registry.terraform.io/krostar/nix";
    skopeo2.source = "registry.terraform.io/bsquare-corp/skopeo2";
  };

  provider.google = {
    project = "mitmh2025-staging-gcp";
    region = "us-east5"; # Ohio
    zone = "us-east5-a";
  };

  provider.aws = [
    {
      alias = "puzzup";
      allowed_account_ids = [891377012427];
      region = "us-east-1";
      profile = "mitmh2025-puzzup";
    }
    {
      # default
      allowed_account_ids = [767398012733];
      region = "us-east-1";
      profile = "mitmh2025-staging";
    }
  ];

  imports = [
    ./base-image.nix
    ./ci.nix
    ./state.nix
    ./staging.nix
    ./mail.nix
    ./staticsite.nix
  ];

  resource.google_project_service = lib.genAttrs [
    "compute"
    "cloudkms"
    "secretmanager"
    "cloudbuild"
    "artifactregistry"
  ] (svc: {
    service = "${svc}.googleapis.com";

    disable_on_destroy = false;
  });

  route53.mitmh2025 = {
    provider = "puzzup";
    domain = "mitmh2025.com";
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

  data.google_iam_policy.sops-staging-key = {
    binding.role = "roles/cloudkms.cryptoKeyDecrypter";
    binding.members = [
      (lib.tfRef "google_service_account.staging-vm.member")
    ];
  };

  resource.google_kms_crypto_key_iam_policy.sops-staging-key = {
    crypto_key_id = lib.tfRef "google_kms_crypto_key.sops-staging-key.id";
    policy_data = lib.tfRef "data.google_iam_policy.sops-staging-key.policy_data";
  };

  data.google_compute_network.default = {
    name = "default";
  };
}
