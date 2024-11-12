{ lib, self, ... }:
let
  stagingAliases = [
    "auth"
    "things"
    "tix"
    "media"
  ];
in {
  gce.instance.staging = {
    machineType = "e2-custom-medium-5120"; # 1 vCPU, 5 GB RAM
    bootDisk.image = lib.tfRef "google_compute_image.nixos.id";
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
      8883 # MQTTs
    ];
    firewall.allowedUDPPorts = [
      50000 # MediaMTX RTP
      50001 # MediaMTX RTCP
      50189 # MediaMTX WebRTC
    ];
    useSops = true;
  };

  resource.nix_store_path_copy.staging_nixos = {
    depends_on = [
      "google_compute_firewall.staging"
    ] ++ (builtins.map (n: "aws_route53_record.${n}") stagingAliases);
    store_path = "${self.nixosConfigurations."staging/staging".config.system.build.toplevel}";
    to = "ssh-ng://root@\${aws_route53_record.staging.fqdn}";
    check_sigs = false;

    # TODO: Switch to deploy-rs so we get magic rollback?

    provisioner.remote-exec = {
      connection = {
        type = "ssh";
        user = "root";
        agent = true;
        host = lib.tfRef "aws_route53_record.staging.fqdn";
      };
      inline = [
        "${self.nixosConfigurations."staging/staging".config.system.build.toplevel}/bin/switch-to-configuration switch"
      ];
    };
  };

  route53.mitmh2025.rr = {
    staging = {
      type = "A";
      ttl = "300";
      records = [
        (lib.tfRef "resource.google_compute_instance.staging.network_interface.0.access_config.0.nat_ip")
      ];
    };
  } // (lib.genAttrs stagingAliases (name: {
    type = "CNAME";
    ttl = "300";
    records = [
      (lib.tfRef "aws_route53_record.staging.fqdn")
    ];
  }));
}
