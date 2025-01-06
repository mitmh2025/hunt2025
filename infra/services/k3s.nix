{ config, ... }:
{
  services.k3s = {
    enable = true;
    role = "server";
    gracefulNodeShutdown.enable = true;
    extraFlags = [
      "--disable=traefik"
    ];
    images = [
      config.services.k3s.package.airgapImages
    ];
  };
}