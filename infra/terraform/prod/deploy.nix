{ lib, self, ... }:
{
  # The Cloud Build API uses the consumer project, not the resource project, so we have to enable it here.
  gcp.services.cloudbuild.enable = true;
  resource.google_compute_disk.deploy.type = lib.mkForce "pd-ssd";
  gce.instance.deploy = {
    route53.zone = "mitmh2025";
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/deploy";
  };
  gcp.serviceAccount.deploy-vm = {
    hmacKey.enable = true;
    iamRoles = [
      "owner"
    ];
  };
}
