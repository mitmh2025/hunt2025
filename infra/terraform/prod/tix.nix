{ lib, self, config, pkgs, ... }:
{
  gce.instance.tix = {
    route53.zone = "mitmh2025";
    firewall.allowedTCPPorts = [
      22 # SSH
      25 # SMTP
      80 # HTTP
      443 # HTTPS
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/tix";
  };

  sops.keys.tix = {};
  data.sops_file.tix.source_file = "${../../secrets/prod/tix.yaml}";

  k8s.prod.statefulSet.sync2zammad = {
    image = lib.tfRef config.gcp.ar.images.images.misc.urlRef;
    env = {
      API_BASE_URL = "http://api/api";
      ZAMMAD_URL = "https://tix.mitmh2025.com";
    };
    secretEnv = {
      FRONTEND_API_SECRET = lib.tfRef "random_password.frontend_api_secret.result";
      REDIS_URL = ''redis://default:${lib.tfRef "random_password.valkey.result"}@redis'';
      ZAMMAD_SECRET = lib.tfRef ''data.sops_file.tix.data["zammad.sync2zammad_token"]'';
    };
    container.args = ["sync2zammad"];
  };
}
