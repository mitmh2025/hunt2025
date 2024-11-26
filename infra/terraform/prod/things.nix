{ lib, self, ... }:
{
  gce.instance.things = {
    route53.zone = "mitmh2025";
    machineType = "e2-medium"; # 2 vCPU (capped at 50%), 4 GB RAM
    bootDisk.size = 20;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
      8883 # MQTTs
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/things";
  };
  gcp.serviceAccount.things-vm = {
    iamRoles = [
      "cloudsql.client"
      "cloudsql.instanceUser"
    ];
  };
}
