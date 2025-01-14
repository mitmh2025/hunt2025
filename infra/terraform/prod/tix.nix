{ lib, self, config, pkgs, ... }:
{
  gce.instance.tix = {
    route53.zone = "mitmh2025";
    machineType = "e2-medium"; # 2 vCPU (capped at 50%), 4 GB RAM
    bootDisk.size = 50;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/tix";
  };
}
