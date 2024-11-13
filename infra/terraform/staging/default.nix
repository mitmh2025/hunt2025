{ lib, self, ... }:
{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers = {
    aws.source = "registry.terraform.io/hashicorp/aws";
    google.source = "registry.terraform.io/hashicorp/google";
    local.source = "registry.terraform.io/hashicorp/local";
    nix.source = "registry.terraform.io/krostar/nix";
    skopeo2.source = "registry.terraform.io/bsquare-corp/skopeo2";
    tls.source = "registry.terraform.io/hashicorp/tls";
    github.source = "registry.terraform.io/integrations/github";
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

  provider.github = {
    owner = "mitmh2025";
  };

  state.bucket.name = "rb8tcjeo-tfstate";

  imports = [
    ./ci.nix
    ./staging.nix
    ./mail.nix
    ./staticsite.nix
    ./dev.nix
  ];

  route53.mitmh2025 = {
    provider = "puzzup";
    domain = "mitmh2025.com";
  };

  gce.nix.image = {
    bucket.name = "rb8tcjeo-gce-images";
    nixosConfiguration = self.nixosConfigurations.gce-image;
  };
}
