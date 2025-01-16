{ lib, self, ... }:
{
  gce.instance.staging = {
    route53.zone = "mitmh2025";
    route53.aliases = [
      "reg.staging"
      "auth"
      "things.staging"
      "tix.staging"
      "media.staging"
      "ops.staging"
    ];
    machineType = "e2-standard-4"; # 4 vCPU, 16 GB RAM
    bootDisk.size = 100;
    firewall.allowedTCPPorts = [
      22 # SSH
      25 # SMTP
      80 # HTTP
      443 # HTTPS
      8554 # MediaMTX RTSP
      8883 # MQTTs
      9443 # Authentik HTTPS
    ];
    firewall.allowedUDPPorts = [
      50000 # MediaMTX RTP
      50001 # MediaMTX RTCP
      50189 # MediaMTX WebRTC
    ];
    firewall.allow = [{
      # MediaMTX whatever
      protocol = "udp";
      ports = ["1024-65535"];
    }];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."staging/staging";
  };
}
