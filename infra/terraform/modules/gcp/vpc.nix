{ config, lib, ... }:
let
  gmsNetworks = lib.filterAttrs (_: value: value.googleManagedServices.enable) config.gcp.vpc;
in {
  options = with lib; {
    gcp.vpc = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, ... }: {
        options = {
          googleManagedServices.enable = mkEnableOption "Create a google-managed-services peering";
        };
      }));
      default = {};
    };
  };
  config = {
    gcp.services.servicenetworking.enable = lib.mkIf (config.gcp.vpc != {}) true;
    resource.google_compute_global_address = lib.mapAttrs' (name: network: lib.nameValuePair "google-managed-services-${name}" {
      name = "google-managed-services-${name}";
      depends_on = [
        "google_project_service.servicenetworking"
      ];
      purpose = "VPC_PEERING";
      address_type = "INTERNAL";
      prefix_length = 16;
      network = lib.tfRef "data.google_compute_network.${name}.id";
    }) gmsNetworks;
    resource.google_service_networking_connection = lib.mapAttrs' (name: network: lib.nameValuePair "google-managed-services-${name}" {
      depends_on = ["google_compute_global_address.google-managed-services-${name}"];
      network = lib.tfRef "data.google_compute_network.${name}.id";
      service = "servicenetworking.googleapis.com";
      reserved_peering_ranges = [
        (lib.tfRef "google_compute_global_address.google-managed-services-${name}.name")
      ];
    }) gmsNetworks;
  };
}
