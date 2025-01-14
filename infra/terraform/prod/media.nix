{ lib, self, config, pkgs, ... }:
{
  gce.instance.media = {
    route53.zone = "mitmh2025";
    machineType = "e2-medium"; # 2 vCPU (capped at 50%), 4 GB RAM
    bootDisk.size = 100;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
    ];
    firewall.allowedUDPPorts = [
      50000 # MediaMTX RTP
      50001 # MediaMTX RTCP
      50189 # MediaMTX WebRTC
    ];
    useSops = true;
    nixosConfiguration = self.nixosConfigurations."prod/media";
  };

  gcp.ar.images.images.radio.sourceImage = pkgs.radioImage;
  k8s.prod.statefulSet.sync2k8s = lib.mkIf false {
    image = lib.tfRef config.gcp.ar.images.images.misc.urlRef;
    env = {
      API_BASE_URL = "http://api/api";
      OUTPUT_BASE_URL = "rtsp://media.${config.provider.google.zone}.c.${config.provider.google.project}.internal:8554";
      LIQUIDSOAP_IMAGE = lib.tfRef config.gcp.ar.images.images.radio.urlRef;
    };
    secretEnv = {
      FRONTEND_API_SECRET = lib.tfRef "random_password.frontend_api_secret.result";
      REDIS_URL = ''redis://default:${lib.tfRef "random_password.valkey.result"}@redis'';
    };
    container = {
      args = ["sync2k8s"];
      resources = {
        limits.cpu = "1";
        limits.memory = "1Gi";
        requests.cpu = "200m";
        requests.memory = "100Mi";
      };
    };
  };
}
