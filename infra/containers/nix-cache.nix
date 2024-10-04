{ pkgs, lib, ... }:
{
  nix.settings = {
    extra-experimental-features = "nix-command flakes";
  };

  systemd.sockets.nix-daemon.enable = true;
  systemd.services.nix-daemon.enable = true;

  environment.systemPackages = with pkgs; [
    nix
    nix-fast-build
  ];
}
