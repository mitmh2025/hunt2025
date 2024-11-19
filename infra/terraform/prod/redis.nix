{ config, lib, pkgs, ... }:
{
  gcp.ar.images.images.valkey.sourceImage = pkgs.dockerTools.buildLayeredImage {
    name = "valkey";
    contents = with pkgs; [
      dockerTools.binSh
      dockerTools.caCertificates
      valkey
    ];
    config.Cmd = ["valkey-server"];
  };
  resource.random_password.valkey = {
    length = 32;
    special = false;
  };
  resource.kubernetes_secret_v1.valkey = {
    metadata.namespace = "prod";
    metadata.name = "valkey";
    data = {
      aclfile = ''
        user default on ~* &* +@all >${lib.tfRef "random_password.valkey.result"}
      '';
      password = lib.tfRef "random_password.valkey.result";
    };
  };
  resource.kubernetes_config_map_v1.valkey = {
    metadata.namespace = "prod";
    metadata.name = "valkey";
    data."valkey.conf" = ''
      loglevel notice
      logfile ""
      aclfile /secret/aclfile
      dir /data
    '';
  };
  resource.kubernetes_persistent_volume_claim_v1.valkey-data = {
    metadata.namespace = "prod";
    metadata.name = "valkey-data";
    spec = {
      access_modes = ["ReadWriteOnce"];
      resources.requests.storage = "5Gi";
      storage_class_name = "standard-rwo";
    };
    wait_until_bound = false;
  };
  resource.kubernetes_pod_v1.redis = {
    metadata.namespace = "prod";
    metadata.name = "redis";
    metadata.labels.app = "redis";
    spec.volume = [
      {
        name = "data";
        persistent_volume_claim.claim_name = lib.tfRef "kubernetes_persistent_volume_claim_v1.valkey-data.metadata[0].name";
      }
      {
        name = "config";
        config_map.name = lib.tfRef "kubernetes_config_map_v1.valkey.metadata[0].name";
      }
      {
        name = "secret";
        secret.secret_name = lib.tfRef "kubernetes_secret_v1.valkey.metadata[0].name";
      }
    ];
    spec.container = [{
      name = "valkey";
      image = lib.tfRef config.gcp.ar.images.images.valkey.urlRef;
      args = ["valkey-server" "/config/valkey.conf"];
      resources = {
        limits.cpu = "2";
        limits.memory = "1Gi";
        requests.cpu = "500m";
        requests.memory = "250Mi";
      };
      liveness_probe = {
        tcp_socket.port = 6379;
        initial_delay_seconds = 3;
        period_seconds = 3;
      };
      volume_mount = [
        { name = "data"; mount_path = "/data"; }
        { name = "config"; mount_path = "/config"; read_only = true; }
        { name = "secret"; mount_path = "/secret"; read_only = true; }
      ];
    }];
  };
  resource.kubernetes_service_v1.redis = {
    metadata.namespace = "prod";
    metadata.name = "redis";
    metadata.annotations."cloud.google.com/neg" = builtins.toJSON {
      ingress = false;
    };
    spec = {
      cluster_ip = "None";
      selector.app = "redis";
      port = [
        {
          port = 6379;
          protocol = "TCP";
          target_port = 6379;
        }
      ];
    };
  };
}
