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
    kubernetes.source = "registry.terraform.io/hashicorp/kubernetes";
  };

  provider.google = {
    project = "mitmh2025";
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
  ];

  state.bucket.name = "cvqb2gwr-tfstate";
  state.bucket.users = [
    (lib.tfRef "google_service_account.deploy-vm.member")
  ];

  route53.mitmh2025 = {
    provider = "puzzup";
    domain = "mitmh2025.com";
  };

  gce.nix.image = {
    bucket.name = "cvqb2gwr-gce-images";
    nixosConfiguration = self.nixosConfigurations.gce-image;
  };

  imports = [
    ../base.nix
    ./deploy.nix
    ./database.nix
    ./gke.nix
    ./gclb.nix
    ./assets.nix
  ];
}
