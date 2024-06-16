{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    "${modulesPath}/virtualisation/google-compute-config.nix"
    ../services/postgres.nix
    ../services/redis.nix
    #../services/thingsboard.nix
  ];
  config = {
    system.stateVersion = "24.05";

    # Allow console login with no password
    users.users.root.hashedPassword = "";

    # Don't build documentation
    documentation.nixos.enable = false;

    services.nginx = {
      enable = true;
    };
  };
}
