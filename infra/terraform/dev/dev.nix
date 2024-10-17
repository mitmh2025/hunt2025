{ lib, self, ... }:
{
  gcp.serviceAccount.dev-vm = {
    displayName = "Used by the dev VM";
  };

  gce.instance.dev = {
    machineType = "e2-micro"; # 1 vCPU, 1 GB RAM
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
  };

  resource.nix_store_path_copy.dev_nixos = {
    depends_on = [
      "google_compute_firewall.dev"
    ];
    store_path = "${self.nixosConfigurations.dev.config.system.build.toplevel}";
    to = "ssh-ng://root@\${aws_route53_record.dev.fqdn}";
    check_sigs = false;

    # TODO: Switch to deploy-rs so we get magic rollback?

    provisioner.remote-exec = {
      connection = {
        type = "ssh";
        user = "root";
        agent = true;
        host = lib.tfRef "aws_route53_record.dev.fqdn";
      };
      inline = [
        "${self.nixosConfigurations.dev.config.system.build.toplevel}/bin/switch-to-configuration switch"
      ];
    };
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
