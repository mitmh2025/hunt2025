{ config, lib, ... }:
# Inspired by https://github.com/nix-community/terraform-nixos/blob/master/google_image_nixos_custom/main.tf
let
  configurationType = lib.types.addCheck
    (lib.types.uniq lib.types.attrs // {
      name = "configurationType";
    })
    (x: x._type or null == "configuration");
  cfg = config.gce.nix.image;
  base = cfg.nixosConfiguration;
  image = base.config.system.build.googleComputeImage;
  outHash = builtins.head (builtins.split "-" (builtins.baseNameOf image.outPath));
  imagePath = "nixos-image-${base.config.system.nixos.label}-${base.pkgs.stdenv.hostPlatform.system}.raw.tar.gz";
  imageName = builtins.replaceStrings
    ["." "_"]
    ["-" "-"]
    "nixos-${builtins.substring 0 12 outHash}-${base.config.system.nixos.label}-${base.pkgs.stdenv.hostPlatform.system}";
  imageFilename = "${outHash}-${imagePath}";
in {
  options = with lib; {
    gce.nix.image = {
      bucket.name = mkOption {
        type = types.nullOr types.str;
        default = null;
      };
      nixosConfiguration = mkOption {
        type = configurationType;
      };
    };
  };
  config = lib.mkIf (cfg.bucket.name != null) {
    gcp.services.compute.enable = true;
    resource.google_storage_bucket.gce-images = {
      name          = cfg.bucket.name;
      force_destroy = false;
      public_access_prevention = "enforced"; # Always require credentials
      location      = "US"; # Multi-region bucket
      storage_class = "STANDARD";
    };

    resource.google_storage_bucket_object.nixos = {
      name = "images/${imageFilename}";
      source = "${image}/${imagePath}";
      bucket = cfg.bucket.name;
      content_type = "application/tar+gzip";

      lifecycle.create_before_destroy = true;
      lifecycle.ignore_changes = ["detect_md5hash"]; # Ignore non-deterministic tarball builds (actual content changes will include a filename change)
    };

    resource.google_compute_image.nixos = {
      depends_on = ["google_project_service.compute"];
      name = imageName;
      family = "nixos";

      raw_disk.source = "https://${cfg.bucket.name}.storage.googleapis.com/\${google_storage_bucket_object.nixos.name}";

      lifecycle.create_before_destroy = true;
    };
  };
}
