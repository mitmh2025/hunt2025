{ lib, self, ... }:
let
  stagingAliases = [
    "auth"
    "things"
    "tix"
  ];
in {
  resource.google_service_account.staging = {
    account_id = "staging-vm";
    display_name = "Used by the staging VM";
  };

  resource.google_compute_instance.staging = {
    name = "staging";
    machine_type = "e2-medium"; # 1 vCPU, 4 GB RAM

    boot_disk.initialize_params = {
      image = lib.tfRef "google_compute_image.nixos.id";
      size = 20;
      type = "pd-balanced";
    };

    lifecycle.ignore_changes = ["boot_disk[0].initialize_params[0].image"]; # Don't recreate if there's a new base image

    network_interface = {
      network = "default";
      access_config = [{ # Request a public IP
        # https://cloud.google.com/compute/docs/instances/create-ptr-record
        public_ptr_domain_name = "staging.mitmh2025.com.";
      }];
    };

    tags = ["staging"];

    hostname = "staging.mitmh2025.com";

    metadata.enable-oslogin = "FALSE"; # Doesn't work with non-@mit.edu accounts.

    service_account = {
      email = lib.tfRef "google_service_account.staging.email";
      scopes = ["cloud-platform"];
    };

    allow_stopping_for_update = true;
  };

  resource.google_compute_firewall.staging = {
    name = "staging";
    network = lib.tfRef "data.google_compute_network.default.name";

    source_ranges = [
      "0.0.0.0/0"
    ];

    allow = [
      {
        protocol = "tcp";
        ports = [
          "22" # SSH
          "80" # HTTP
          "443" # HTTPS
          "8883" # MQTTs
          "8889" # MediaMTX WebRTC
        ];
      }
      {
        protocol = "udp";
        ports = [
          "8000" # MediaMTX RTP
          "8001" # MediaMTX RTCP
          "8189" # MediaMTX WebRTC
        ];
      }
    ];

    target_tags = ["staging"];
  };

  resource.nix_store_path_copy.staging_nixos = {
    depends_on = [
      "google_compute_firewall.staging"
    ] ++ (builtins.map (n: "aws_route53_record.${n}") stagingAliases);
    store_path = "${self.nixosConfigurations.staging.config.system.build.toplevel}";
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
        "${self.nixosConfigurations.staging.config.system.build.toplevel}/bin/switch-to-configuration switch"
      ];
    };
  };

  resource.aws_route53_record = {
    staging = {
      zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
      name = "staging";
      type = "A";
      ttl = "300";
      records = [
        (lib.tfRef "resource.google_compute_instance.staging.network_interface.0.access_config.0.nat_ip")
      ];
    };
  } // (lib.genAttrs stagingAliases (name: {
    zone_id = lib.tfRef "data.aws_route53_zone.mitmh2025.zone_id";
    inherit name;
    type = "CNAME";
    ttl = "300";
    records = [
      (lib.tfRef "aws_route53_record.staging.fqdn")
    ];
  }));
}
