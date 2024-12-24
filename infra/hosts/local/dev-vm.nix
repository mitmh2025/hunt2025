{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    ./dev-vm-base.nix
  ];
  config = {
    hunt2025.site = {
      enable = true;
      db_env = "ci";
    };
    services.thingsboard.provision.enable = true;
    virtualisation.vmVariant = {
      virtualisation.forwardPorts = [
        # hunt2025
        { from = "host"; host.port = 3000; guest.port = 3000; }
      ];
    };
  };
}
