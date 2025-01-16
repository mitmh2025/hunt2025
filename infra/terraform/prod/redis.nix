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
      save 60 1
    '';
  };
  k8s.prod.statefulSet.redis = {
    image = lib.tfRef config.gcp.ar.images.images.valkey.urlRef;
    port = 6379;
    template = {
      spec.volume = [
        {
          name = "config";
          config_map.name = lib.tfRef "kubernetes_config_map_v1.valkey.metadata[0].name";
        }
        {
          name = "secret";
          secret.secret_name = lib.tfRef "kubernetes_secret_v1.valkey.metadata[0].name";
        }
      ];
    };
    container = {
      name = "valkey";
      args = ["valkey-server" "/config/valkey.conf"];
      liveness_probe = {
        tcp_socket.port = 6379;
        initial_delay_seconds = 3;
        period_seconds = 3;
      };
      volume_mount = [
        { name = "valkey-data"; mount_path = "/data"; }
        { name = "config"; mount_path = "/config"; read_only = true; }
        { name = "secret"; mount_path = "/secret"; read_only = true; }
      ];
    };
    statefulSet.spec = {
      persistent_volume_claim_retention_policy = {
        when_deleted = "Retain";
        when_scaled = "Retain";
      };
      volume_claim_template = [{
        metadata.name = "valkey-data";
        spec = {
          access_modes = ["ReadWriteOnce"];
          resources.requests.storage = "50Gi";
          storage_class_name = "standard-rwo";
        };
      }];
    };
  };
}
