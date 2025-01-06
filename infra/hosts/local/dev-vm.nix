{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    ./dev-vm-base.nix
  ];
  config = {
    environment.systemPackages = with pkgs; [
      dig
    ];
    nixpkgs.overlays = [(final: prev: {
      hunt2025 = prev.hunt2025.overrideAttrs {
        npmBuildScript = "build-all-dev";
      };
    })];
    hunt2025.site = {
      enable = true;
      db_env = "ci";
    };
    hunt2025.ops = {
      enable = true;
      oauthServer = "http://localhost:3004/.well-known/openid-configuration";
    };
    systemd.services.hunt2025.environment = {
      EMAIL_FROM = "MIT Mystery Hunt 2025 <info@mitmh2025.com>";
    };
    hunt.radio.enable = true;
    services.thingsboard.provision.enable = true;
    services.sync2tb.enable = true;
    services.sync2k8s.enable = true;
    virtualisation.vmVariant = {
      virtualisation.memorySize = lib.mkForce 4096;
      virtualisation.diskSize = 5192;
      virtualisation.forwardPorts = [
        # hunt2025
        { from = "host"; host.port = 3000; guest.port = 3000; }
        { from = "host"; host.port = 3001; guest.port = 3001; }
        { from = "host"; host.port = 3002; guest.port = 3002; }
        { from = "host"; host.port = 3003; guest.port = 3003; }
        { from = "host"; host.port = 3004; guest.port = 3004; }
      ];
    };
  };
}
