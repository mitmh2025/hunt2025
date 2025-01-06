{ config, ... }:
{
  users.groups.k3s = {};
  services.k3s = {
    enable = true;
    role = "server";
    gracefulNodeShutdown.enable = true;
    extraFlags = [
      "--disable=traefik"
      "--write-kubeconfig-group=k3s"
      "--write-kubeconfig-mode=640"
    ];
    images = [
      config.services.k3s.package.airgapImages
    ];
  };
}