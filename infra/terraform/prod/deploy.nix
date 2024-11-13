{ lib, self, ... }:
{
  gce.instance.deploy = {
    route53.zone = "mitmh2025";
    route53.aliases = [
      "atlantis"
    ];
    machineType = "e2-small"; # 2 vCPU, 2 GB RAM
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    #useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/deploy";
  };
}
