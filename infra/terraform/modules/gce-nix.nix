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
    data.google_compute_instance_guest_attributes = lib.mapAttrs' (name: instance: lib.nameValuePair "${name}_hostkeys" {
      name = lib.tfRef "google_compute_instance.${name}.name";
      zone = lib.tfRef "google_compute_instance.${name}.zone";
      query_path = "hostkeys/";
    }) cfg;
    resource.nix_store_path_copy = lib.mapAttrs' (name: instance: lib.nameValuePair "${name}_nixos" {
      depends_on = [
        "google_compute_firewall.${name}"
        # Make sure aliases are configured so ACME challenges work.
      ] ++ builtins.map (n: "aws_route53_record.${n}") instance.route53.aliases;
      store_path = "${instance.nixosConfiguration.config.system.build.toplevel}";
      # Attempt to get the host's SSH key from guest attributes; if it's missing, we'll ust fall back on trusting the first key we see.
      to = ''ssh-ng://root@''${google_compute_instance.${name}.network_interface.0.access_config.0.nat_ip}%{ if data.google_compute_instance_guest_attributes.${name}_hostkeys.query_value != []}?base64-ssh-public-host-key=''${base64encode(coalesce([for attr in data.google_compute_instance_guest_attributes.${name}_hostkeys.query_value : "''${attr.key} ''${attr.value}"]...))}%{ endif }'';
      ssh_options = ["-oStrictHostKeyChecking=no"];
      lifecycle.ignore_changes = ["to" "ssh_options"];
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
