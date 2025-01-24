{ lib, self, ... }:
{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers = {
    aws.source = "registry.terraform.io/hashicorp/aws";
    google.source = "registry.terraform.io/hashicorp/google";
    local.source = "registry.terraform.io/hashicorp/local";
    random.source = "registry.terraform.io/hashicorp/random";
    nix.source = "registry.terraform.io/krostar/nix";
    skopeo2.source = "registry.terraform.io/bsquare-corp/skopeo2";
    tls.source = "registry.terraform.io/hashicorp/tls";
    kubernetes.source = "registry.terraform.io/hashicorp/kubernetes";
    postgresql.source = "registry.terraform.io/cyrilgdn/postgresql";
    sops.source = "registry.terraform.io/carlpett/sops";
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

  provider.sops = {};

  state.bucket.name = "cvqb2gwr-tfstate";
  state.bucket.users = [
    (lib.tfRef "google_service_account.deploy-vm.member")
  ];

  route53.mitmh2025 = {
    provider = "puzzup";
    domain = "mitmh2025.com";
  };

  route53.two-pi-noir = {
    provider = "puzzup";
    domain = "two-pi-noir.agency";
  };

  route53.two-pi-noir-com = {
    provider = "puzzup";
    domain = "two-pi-noir.com";
  };

  gce.nix.image = {
    bucket.name = "cvqb2gwr-gce-images";
    nixosConfiguration = self.nixosConfigurations.gce-image;
  };

  gcp.ar.images = {
    repoId = "cvqb2gwr-images";
    location = "us";
  };

  imports = [
    ../base.nix
    ./deploy.nix
    ./database.nix
    ./gke.nix
    ./gclb.nix
    ./assets.nix
    ./site.nix
    ./redis.nix
    ./mail.nix
    ./scaling.nix
  ];
}
