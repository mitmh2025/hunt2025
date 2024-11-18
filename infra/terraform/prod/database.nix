{ config, lib, ... }:
{
  gcp.services.servicenetworking.enable = true;
  gcp.services.sqladmin.enable = true;

  gcp.vpc.default.googleManagedServices.enable = true;

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
      database_flags = lib.attrsToList {
        "cloudsql.iam_authentication" = "on";
      };
    };
    lifecycle.ignore_changes = ["settings[0].disk_size"];
  };
  resource.google_sql_database.prod-hunt2025 = {
    name = "hunt2025";
    instance = lib.tfRef "resource.google_sql_database_instance.prod.name";
    charset = "UTF8";
    collation = "en_US.UTF8";
  };
  resource.google_sql_user.k8s-prod-api = {
    # Note: for Postgres only, GCP requires omitting the ".gserviceaccount.com" suffix
    # from the service account email due to length limits on database usernames.
    name = lib.tfRef ''trimsuffix(google_service_account.k8s-prod-api.email, ".gserviceaccount.com")'';
    instance = lib.tfRef "google_sql_database_instance.prod.name";
    type = "CLOUD_IAM_SERVICE_ACCOUNT";
  };
  resource.random_password.sql-prod-terraform = {
    keepers.name = lib.tfRef "google_sql_database_instance.prod.name";
    min_lower = 1;
    min_numeric = 1;
    min_upper = 1;
    special = true;
    min_special = 1;
    length = 32;
  };
  # N.B. Cloud SQL *requires* that permissions be granted by a built-in (non-IAM) user.
  resource.google_sql_user.terraform = {
    name = "terraform";
    password = lib.tfRef "random_password.sql-prod-terraform.result";
    instance = lib.tfRef "google_sql_database_instance.prod.name";
  };
}
