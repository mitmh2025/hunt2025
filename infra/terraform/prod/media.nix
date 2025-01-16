{ lib, self, config, pkgs, ... }:
{
  gce.instance.media = {
    route53.zone = "mitmh2025";
    machineType = "e2-standard-4";
    # 64 Kbps * 200 teams * 72 hours ≈ 400 GB
    bootDisk.size = 1000;
    firewall.allowedTCPPorts = [
      22 # SSH
      80 # HTTP
      443 # HTTPS
      8554 # MediaMTX RTSP
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
  k8s.prod.statefulSet.sync2k8s = {
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
    template.spec.service_account_name = lib.tfRef "kubernetes_service_account_v1.sync2k8s.metadata[0].name";
    statefulSet.depends_on = ["kubernetes_limit_range_v1.radio"];
  };

  resource.kubernetes_service_account_v1.sync2k8s = {
    metadata = {
      name = "sync2k8s";
      namespace = lib.tfRef "kubernetes_namespace_v1.prod.metadata[0].name";
    };
  };

  resource.kubernetes_role_binding_v1.sync2k8s-radio = {
    metadata.namespace = lib.tfRef "kubernetes_namespace_v1.radio.metadata[0].name";
    metadata.name = "radio";
    subject = [{
      kind = "ServiceAccount";
      name = lib.tfRef "kubernetes_service_account_v1.sync2k8s.metadata[0].name";
      namespace = lib.tfRef "kubernetes_namespace_v1.prod.metadata[0].name";
    }];
    role_ref = [{
      api_group = "rbac.authorization.k8s.io";
      kind = "ClusterRole";
      name = "edit";
    }];
  };

  resource.kubernetes_namespace_v1.radio.metadata.name = "radio";
  resource.kubernetes_limit_range_v1.radio = {
    metadata.namespace = lib.tfRef "kubernetes_namespace_v1.radio.metadata[0].name";
    metadata.name = "radio";
    spec.limit = [
      {
        type = "Container";
        # Experimentally discovered
        default_request = {
          cpu = "0.1";
          memory = "125Mi";
        };
        # Just to stop runaway processes
        default = {
          cpu = "1";
          memory = "512Mi";
        };
      }
    ];
  };
}
