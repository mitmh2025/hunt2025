{ lib, self, ... }:
{
  gce.instance.dev = {
    route53.zone = "mitmh2025";
    route53.aliases = [
      "reg.dev"
    ];
    machineType = "e2-medium"; # 1 vCPU, 4 GB RAM
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    useSops = true;
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

  data.google_iam_policy.autopush_key_secret.binding = lib.mkIf (cfg.triggers != {}) [
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
