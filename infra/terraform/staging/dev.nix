{ lib, self, ... }:
{
  gce.instance.dev = {
    machineType = "e2-micro"; # 1 vCPU, 1 GB RAM
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
  };

  route53.mitmh2025.rr = {
    dev = {
      type = "A";
      ttl = "300";
      records = [
        (lib.tfRef "resource.google_compute_instance.dev.network_interface.0.access_config.0.nat_ip")
      ];
    };
  };
}
