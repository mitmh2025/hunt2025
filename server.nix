{ config, lib, pkgs, ... }:
{
  config = {
    system.stateVersion = "24.05";

    # Allow console login with no password
    users.users.root.hashedPassword = "";
    users.mutableUsers = false;

    # Don't build documentation
    documentation.nixos.enable = false;

    services.nginx = {
      enable = true;
    };
  };
}
