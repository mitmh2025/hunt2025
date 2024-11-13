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
    route53.zone = "mitmh2025";
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
    nixosConfiguration = self.nixosConfigurations."staging/staging";
  };

  # Make sure aliases are configured so ACME challenges work.
  resource.nix_store_path_copy.staging_nixos.depends_on =
    builtins.map (n: "aws_route53_record.${n}") stagingAliases;

  route53.mitmh2025.rr = lib.genAttrs stagingAliases (name: {
    type = "CNAME";
    ttl = "300";
    records = [
      (lib.tfRef "aws_route53_record.staging.fqdn")
    ];
  });
}
