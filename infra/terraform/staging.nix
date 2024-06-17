{ lib, ... }:
{
  resource.google_service_account.staging = {
    account_id = "staging-vm";
    display_name = "Used by the staging VM";
  };

  resource.google_compute_instance.staging = {
    name = "staging";
    machine_type = "e2-small"; # 0.5 vCPU, 2 GB RAM

    boot_disk.initialize_params = {
      image = lib.tfRef "google_compute_image.nixos.id";
      size = 20;
      type = "pd-balanced";
    };

    lifecycle.ignore_changes = ["boot_disk[0].initialize_params[0].image"]; # Don't recreate if there's a new base image

    network_interface = {
      network = "default";
      access_config = { # Request a public IP
        # TODO: https://cloud.google.com/compute/docs/instances/create-ptr-record
        # public_ptr_domain_name = "staging.mitmh2025.com";
      };
    };

    hostname = "staging.mitmh2025.com";

    metadata.enable-oslogin = "FALSE"; # Doesn't work with non-@mit.edu accounts.

    service_account = {
      email = lib.tfRef "google_service_account.staging.email";
      scopes = ["cloud-platform"];
    };
  };
}
