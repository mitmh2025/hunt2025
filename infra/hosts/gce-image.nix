{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    ./base.nix
    "${modulesPath}/virtualisation/google-compute-image.nix"
  ];
}
