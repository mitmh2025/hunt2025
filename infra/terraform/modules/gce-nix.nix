{ config, lib, ... }:
let
  configurationType = lib.types.addCheck
    (lib.types.uniq lib.types.attrs // {
      name = "configurationType";
    })
    (x: x._type or null == "configuration");
  cfg = lib.filterAttrs (_: i: i.nixosConfiguration != null) config.gce.instance;
in {
  options = with lib; {
    gce.instance = mkOption {
      type = types.tfAttrsOf (types.submodule ({ config, name, ... }: {
        options = {
          nixosConfiguration = mkOption {
            type = types.nullOr configurationType;
            default = null;
          };
        };
        config = {
          bootDisk.image = lib.mkIf (config.nixosConfiguration != null) (lib.mkDefault (lib.tfRef "google_compute_image.nixos.id"));
        };
      }));
    };
  };
  config = {
    resource.nix_store_path_copy = lib.mapAttrs' (name: instance: lib.nameValuePair "${name}_nixos" {
      depends_on = [
        "google_compute_firewall.${name}"
        # Make sure aliases are configured so ACME challenges work.
      ] ++ builtins.map (n: "aws_route53_record.${n}") instance.route53.aliases;
      store_path = "${instance.nixosConfiguration.config.system.build.toplevel}";
      to = "ssh-ng://root@\${google_compute_instance.${name}.network_interface.0.access_config.0.nat_ip}";
      check_sigs = false;

      # TODO: Switch to deploy-rs so we get magic rollback?

      provisioner.remote-exec = {
        connection = {
          type = "ssh";
          user = "root";
          agent = true;
          host = lib.tfRef "google_compute_instance.${name}.network_interface.0.access_config.0.nat_ip";
        };
        inline = [
          "${instance.nixosConfiguration.config.system.build.toplevel}/bin/switch-to-configuration switch"
        ];
      };
    }) cfg;
  };
}
