{ config, lib, ... }:
let
  cfg = config.gce.instance;
in {
  options = with lib; {
    gce.project.metadata = mkOption {
      default = {};
      type = types.attrsOf types.str;
    };
    gce.instance = mkOption {
      default = {};
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
        options = {
          name = mkOption {
            type = types.str;
            default = name;
            description = "VM name";
          };
          machineType = mkOption {
            type = types.str;
            description = "Machine type";
          };
          hostname = mkOption {
            type = types.nullOr types.str;
            default = null;
          };
          bootDisk.size = mkOption {
            type = types.ints.positive;
            default = 20;
          };
          bootDisk.image = mkOption {
            type = types.str;
            default = "nixos";
          };
          firewall = let
            canonicalizePortList =
              ports: lib.unique (builtins.sort builtins.lessThan ports);
          in {
            allowedTCPPorts = mkOption {
              type = types.listOf types.port;
              default = [];
              apply = canonicalizePortList;
            };
            allowedUDPPorts = mkOption {
              type = types.listOf types.port;
              default = [];
              apply = canonicalizePortList;
            };
          };
          useSops = mkEnableOption "Provision a key for sops secrets";
          objects.serviceAccount = mkOption {
            type = types.anything;
          };
          resource.google_compute_disk = mkOption {
            type = types.anything;
          };
          resource.google_compute_instance = mkOption {
            type = types.anything;
          };
          resource.google_compute_firewall = mkOption {
            type = types.anything;
          };
          readyWhen = mkOption {
            type = types.listOf types.str;
            default = [];
            description = "A list of Terraform resource identifiers that must be depended on for this instance to be ready.";
          };
        };
        config = {
          readyWhen = [
            "google_compute_instance.${name}"
            "google_compute_firewall.${name}"
          ];
          objects.serviceAccount.displayName = "Used by the ${config.name} VM";
          resource.google_compute_disk = {
            inherit (config) name;
            inherit (config.bootDisk) size image;
            type = "pd-balanced";
            # Don't destroy and recreate when the image changes.
            lifecycle.ignore_changes = ["image"];
          };
          resource.google_compute_instance = {
            inherit (config) name;
            hostname = lib.mkIf (config.hostname != null) config.hostname;
            machine_type = config.machineType;

            desired_status = "RUNNING";

            boot_disk.source = lib.tfRef "google_compute_disk.${config.name}.self_link";

            lifecycle.ignore_changes = ["boot_disk[0].initialize_params[0].image"]; # Don't recreate if there's a new base image

            network_interface = {
              network = "default";
              access_config = [{ # Request a public IP
                # https://cloud.google.com/compute/docs/instances/create-ptr-record
                public_ptr_domain_name = lib.mkIf (config.hostname != null) "${config.hostname}.";
              }];
            };

            tags = [name];

            metadata.enable-oslogin = "FALSE"; # Doesn't work with non-@mit.edu accounts.

            metadata.serial-port-enable = "TRUE"; # Allow ssh to access the instance's serial console.

            service_account = {
              email = lib.tfRef "google_service_account.${name}-vm.email";
              scopes = ["cloud-platform"];
            };

            allow_stopping_for_update = true;
          };
          resource.google_compute_firewall = {
            inherit (config) name;
            network = lib.tfRef "data.google_compute_network.default.name";

            source_ranges = [
              "0.0.0.0/0"
            ];

            allow = [
              {
                protocol = "tcp";
                ports = map toString config.firewall.allowedTCPPorts;
              }
              {
                protocol = "udp";
                ports = map toString config.firewall.allowedUDPPorts;
              }
            ];

            target_tags = [name];
          };
        };
      }));
    };
  };
  config = lib.mkIf (cfg != {}) {
    gcp.services.compute.enable = true;
    resource.google_compute_project_metadata_item = lib.mapAttrs (key: value: {
      inherit key value;
    }) config.gce.project.metadata;
    data.google_compute_network.default = {
      name = "default";
    };
    gcp.serviceAccount = lib.mapAttrs' (
      key: value:
      lib.nameValuePair
      "${key}-vm"
      value.objects.serviceAccount
    ) cfg;
    resource.google_compute_disk = lib.mapAttrs (_: value: value.resource.google_compute_disk) cfg;
    resource.google_compute_instance = lib.mapAttrs (_: value: value.resource.google_compute_instance) cfg;
    resource.google_compute_firewall = lib.mapAttrs (_: value: value.resource.google_compute_firewall) cfg;
    sops.keys = lib.mapAttrs (name: value: {
      users = [(lib.tfRef "google_service_account.${name}-vm.member")];
    }) (lib.filterAttrs (_: value: value.useSops) cfg);
  };
}
