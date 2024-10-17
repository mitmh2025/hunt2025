{ lib, ... }:
{
  # Nix's OpenTofu packaging uses registry.terraform.io for providers.
  terraform.required_providers = {
    nix.source = "registry.terraform.io/krostar/nix";
  };

  imports = [
    ./dev.nix
  ];
}
