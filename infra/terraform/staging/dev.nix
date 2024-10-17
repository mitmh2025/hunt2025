{ lib, self, ... }:
{
  gce.instance.dev = {
    machineType = "e2-micro"; # 1 vCPU, 1 GB RAM
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
  };

  route53.mitmh2025.rr = {
    dev = {
      type = "A";
      ttl = "300";
      records = [
        (lib.tfRef "resource.google_compute_instance.dev.network_interface.0.access_config.0.nat_ip")
      ];
    };
  };

  resource.tls_private_key.autopush_key.algorithm = "ED25519";

  resource.google_compute_instance.dev.metadata.ssh-keys = ''
    root:${lib.tfRef "tls_private_key.autopush_key.public_key_openssh"}
  '';

  resource.google_secret_manager_secret.autopush_key = {
    secret_id = "autopush-key";
    replication.auto = {};
  };

  resource.google_secret_manager_secret_version.autopush_key = {
    secret = lib.tfRef "google_secret_manager_secret.autopush_key.id";
    secret_data = lib.tfRef "tls_private_key.autopush_key.private_key_pem";
  };

  data.google_iam_policy.autopush_key_secret.binding = [
    {
      role = "roles/secretmanager.secretAccessor";
      members = [
        (lib.tfRef "google_service_account.cloud-build.member")
      ];
    }
  ];

  resource.google_secret_manager_secret_iam_policy.autopush_key = {
    secret_id = lib.tfRef "google_secret_manager_secret.autopush_key.secret_id";
    policy_data = lib.tfRef "data.google_iam_policy.autopush_key_secret.policy_data";
  };
}
