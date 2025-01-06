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
    systemd.services.hunt2025.environment = {
      EMAIL_FROM = "MIT Mystery Hunt 2025 <info@mitmh2025.com>";
    };
    services.thingsboard.provision.enable = true;
    services.sync2tb.enable = true;
    virtualisation.vmVariant = {
      virtualisation.diskSize = 2048;
      virtualisation.forwardPorts = [
        # hunt2025
        { from = "host"; host.port = 3000; guest.port = 3000; }
      ];
    };
  };
}
