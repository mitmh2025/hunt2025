{ lib, self, ... }:
{
  gce.instance.deploy = {
    route53.zone = "mitmh2025";
    route53.aliases = [
      "atlantis"
    ];
    machineType = "e2-medium"; # 2 vCPU, 4 GB RAM
    bootDisk.size = 50;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/deploy";
  };
  gcp.serviceAccount.deploy-vm.hmacKey.enable = true;
}
