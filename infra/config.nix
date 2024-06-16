{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers.local = {
    source = "registry.terraform.io/hashicorp/local";
  };
  terraform.required_providers.google = {
    source = "registry.terraform.io/hashicorp/google";
  };

  provider.google = {
    project = "mitmh2025-staging-gcp";
    region = "us-east5"; # Ohio
  };

  # $ gcloud kms keyrings create sops --location global
  resource.google_kms_key_ring.sops = {
    name = "sops";
    location = "global";
  };
  # $ gcloud kms keys create sops-staging-key --location global --keyring sops --purpose encryption
  resource.google_kms_crypto_key.sops-staging-key = {
    name = "sops-staging-key";
    key_ring = "\${google_kms_key_ring.sops.id}";
    purpose = "ENCRYPT_DECRYPT";
  };
}
