{ lib, self, ... }:
{
  # Run everything in prod as a single VM post-hunt

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

  route53.mitmh2025.rr.ops = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };
  route53.mitmh2025.rr.www = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };
  route53.mitmh2025.rr.root = {
    name = lib.tfRef "data.aws_route53_zone.mitmh2025.name";
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };

  route53.two-pi-noir.rr.root = {
    name = lib.tfRef "data.aws_route53_zone.two-pi-noir.name";
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };
  route53.two-pi-noir.rr.www = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };

  route53.two-pi-noir-com.rr.root = {
    name = lib.tfRef "data.aws_route53_zone.two-pi-noir-com.name";
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };
  route53.two-pi-noir-com.rr.www = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_address.prod.address")];
  };
}
