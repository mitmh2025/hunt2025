{ lib, self, ... }:
{
  gce.instance.media = {
    route53.zone = "mitmh2025";
    machineType = "e2-medium"; # 2 vCPU (capped at 50%), 4 GB RAM
    bootDisk.size = 100;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    firewall.allowedUDPPorts = [
      50000 # MediaMTX RTP
      50001 # MediaMTX RTCP
      50189 # MediaMTX WebRTC
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/media";
  };
}
