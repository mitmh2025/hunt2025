{ lib, self, ... }:
{
  gce.instance.prod = {
    route53.zone = "mitmh2025";
    machineType = "e2-highmem-2"; # 2 vCPU, 16 GB RAM
    bootDisk.size = 200;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
      9443 # Authentik HTTPS
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/prod";
  };
  # Make builds faster
  resource.google_compute_disk.deploy.type = lib.mkForce "pd-ssd";
  # Give it the ability to perform deploys
  gcp.serviceAccount.prod-vm = {
    hmacKey.enable = true;
    iamRoles = [
      "owner"
    ];
  };
}
