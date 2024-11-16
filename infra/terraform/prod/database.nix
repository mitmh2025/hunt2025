{ config, lib, ... }:
{
  gcp.services.servicenetworking.enable = true;
  gcp.services.sqladmin.enable = true;

  resource.google_compute_global_address.google-managed-services-default = {
    name = "google-managed-services-default";
    depends_on = [
      "google_project_service.sqladmin"
    ];
    purpose = "VPC_PEERING";
    address_type = "INTERNAL";
    prefix_length = 16;
    network = lib.tfRef "data.google_compute_network.default.id";
  };
  resource.google_service_networking_connection.google-managed-services-default = {
    network = lib.tfRef "google_compute_global_address.google-managed-services-default.network";
    service = "servicenetworking.googleapis.com";
    reserved_peering_ranges = [
      (lib.tfRef "google_compute_global_address.google-managed-services-default.name")
    ];
  };
  resource.google_sql_database_instance.prod = {
    name = "prod";
    database_version = "POSTGRES_16";
    deletion_protection = true;
    depends_on = [
      "google_project_service.sqladmin"
      "google_service_networking_connection.google-managed-services-default"
    ];
    settings = {
      edition = "ENTERPRISE";
      tier = "db-f1-micro";
      availability_type = "ZONAL";
      location_preference.zone = config.provider.google.zone;
      ip_configuration = {
        ipv4_enabled = true;
        private_network = lib.tfRef "data.google_compute_network.default.self_link";
        enable_private_path_for_google_cloud_services = true;
      };
      connector_enforcement = "REQUIRED";
      deletion_protection_enabled = true;
      disk_size = 10;
      disk_autoresize = true;
      maintenance_window.day = 2; # Tuesday
      deny_maintenance_period = {
        start_date = "2025-1-16";
        end_date = "2025-1-22";
        time = "00:00:00";
      };
      backup_configuration = {
        enabled = true;
        point_in_time_recovery_enabled = true;
      };
    };
    lifecycle.ignore_changes = ["settings[0].disk_size"];
  };
}
