{ lib, self, ... }:
{
  # The Cloud Build API uses the consumer project, not the resource project, so we have to enable it here.
  gcp.services.cloudbuild.enable = true;
  resource.google_compute_disk.deploy.type = lib.mkForce "pd-ssd";
  gce.instance.deploy = {
    route53.zone = "mitmh2025";
    route53.aliases = [
      "atlantis"
    ];
    machineType = "e2-custom-2-8192"; # 2 vCPU, 8 GB RAM
    # SSD persistent disks have a limit of 30 IOPS and 0.48 MiB/s per GiB of capacity.
    # https://cloud.google.com/compute/docs/disks/performance#zonal_pd
    # Even though we don't need 100 GiB of capacity, this will give us 48 MiB/s throughput.
    bootDisk.size = 100;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/deploy";
  };
  gcp.serviceAccount.deploy-vm = {
    hmacKey.enable = true;
    iamRoles = [
      "owner"
    ];
  };
}
