{ lib, self, ... }:
{
  gce.instance.staging = {
    route53.zone = "mitmh2025";
    route53.aliases = [
      "reg.staging"
      "auth"
      "things.staging"
      "tix"
      "media.staging"
      "ops.staging"
    ];
    machineType = "e2-custom-medium-5120"; # 1 vCPU, 5 GB RAM
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
      8883 # MQTTs
      9443 # Authentik HTTPS
    ];
    firewall.allowedUDPPorts = [
      50000 # MediaMTX RTP
      50001 # MediaMTX RTCP
      50189 # MediaMTX WebRTC
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."staging/staging";
  };
}
