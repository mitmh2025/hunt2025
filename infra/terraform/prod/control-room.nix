{ config, lib, pkgs, ... }:
{
  gcp.ar.images.images.plump-himalayas.sourceImage = pkgs.dockerTools.buildLayeredImage {
    name = "plump-himalayas";
    contents = with pkgs; [
      dockerTools.caCertificates
      plump-himalayas
      dockerTools.binSh
    ];
    config.Cmd = ["plump-himalayas"];
  };

  sops.keys.media = {};
  data.sops_file.media.source_file = "${../../secrets/prod/media.yaml}";
  k8s.prod.statefulSet.control-room = {
    image = lib.tfRef config.gcp.ar.images.images.plump-himalayas.urlRef;
    port = 80;
    expose = true;
    env = {
      MEDIAMTX_API_URL = "http://media.${config.provider.google.zone}.c.${config.provider.google.project}.internal:9997";
      JWKS_URI = "https://www.mitmh2025.com/api/jwks";
    };
    secretEnv = {
      MEDIAMTX_TOKEN = lib.tfRef ''data.sops_file.media.data["control_room.mediamtx_token"]'';
    };
    container = {
      liveness_probe = {
        http_get = {
          path = "/healthz";
          port = 80;
        };
        initial_delay_seconds = 3;
        period_seconds = 3;
      };
    };
  };
}