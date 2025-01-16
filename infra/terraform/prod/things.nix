{ lib, self, config, pkgs, ... }:
{
  gce.instance.things = {
    route53.zone = "mitmh2025";
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
      8883 # MQTTs
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/things";
  };
  gcp.serviceAccount.things-vm = {
    iamRoles = [
      "cloudsql.client"
      "cloudsql.instanceUser"
    ];
  };

  sops.keys.things = {};
  data.sops_file.things.source_file = "${../../secrets/prod/things.yaml}";

  k8s.prod.statefulSet.sync2tb = {
    image = lib.tfRef config.gcp.ar.images.images.misc.urlRef;
    env = {
      API_BASE_URL = "http://api/api";
      MEDIA_BASE_URL = "https://media.mitmh2025.com";
      TB_BASE_URL = "https://things.mitmh2025.com";
      TB_USERNAME = "radioman@mitmh2025.com";
      FILE_MANIFEST_URL = "https://www.two-pi-noir.agency${lib.tfRef ''jsondecode(file("${pkgs.hunt2025}/lib/hunt2025/dist/radio-manifest.json"))["current_radio_manifest"]''}";
    };
    secretEnv = {
      FRONTEND_API_SECRET = lib.tfRef "random_password.frontend_api_secret.result";
      REDIS_URL = ''redis://default:${lib.tfRef "random_password.valkey.result"}@redis'';
      TB_PASSWORD = lib.tfRef ''data.sops_file.things.data["radioman.password"]'';
    };
    container = {
      args = ["sync2tb"];
    };
  };
}
