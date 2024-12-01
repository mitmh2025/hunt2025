{ config, lib, pkgs, ... }:
{
  gcp.ar.images.images.site.sourceImage = pkgs.dockerTools.buildLayeredImage {
    name = "site";
    contents = with pkgs; [
      dockerTools.caCertificates
      hunt2025.out
      aws-credential-process
      dockerTools.binSh
    ];
    config.Cmd = ["hunt2025"];
  };
  resource.random_password.jwt_secret = {
    length = 32;
  };
  resource.random_password.data_api_secret = {
    length = 64;
    special = false;
  };
  resource.random_password.frontend_api_secret = {
    length = 64;
  };
  resource.kubernetes_secret_v1.api = {
    metadata.namespace = "prod";
    metadata.name = "api";
    data = {
      JWT_SECRET = lib.tfRef "random_password.jwt_secret.result";
      DATA_API_SECRET = lib.tfRef "random_password.data_api_secret.result";
      FRONTEND_API_SECRET = lib.tfRef "random_password.frontend_api_secret.result";
      REDIS_URL = ''redis://default:${lib.tfRef "random_password.valkey.result"}@redis'';
    };
  };
  resource.kubernetes_config_map_v1.api = {
    metadata.namespace = "prod";
    metadata.name = "api";
    data."aws-config" = lib.generators.toINI {} {
      "profile mitmh2025-puzzup".credential_process = "/bin/aws-credential-process 891377012427 K8sProdAPI";
    };
  };
  resource.kubernetes_deployment_v1.api = {
    metadata.namespace = "prod";
    metadata.name = "api";
    metadata.labels.app = "api";
    spec = {
      replicas = 1;
      selector.match_labels.app = "api";
      template = {
        metadata.labels.app = "api";
        spec.service_account_name = lib.tfRef "kubernetes_service_account_v1.k8s-prod-api.metadata[0].name";
        spec.volume = [{
          name = "config";
          config_map.name = lib.tfRef "kubernetes_config_map_v1.api.metadata[0].name";
        }];
        spec.container = [{
          name = "api";
          image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
          volume_mount = [{
            name = "config";
            mount_path = "/config";
          }];
          env = lib.attrsToList {
            PORT = "80";
            HUNT_COMPONENTS = "api";
            DB_ENV = "production";
            DB_INSTANCE_CONNECTION_NAME = "mitmh2025:us-east5:prod";
            DB_AUTH_TYPE = "IAM";
            DB_NAME = lib.tfRef "postgresql_database.hunt2025.name";
            DB_USER = lib.tfRef "google_sql_user.k8s-prod-api.name";
            AWS_CONFIG_FILE = "/config/aws-config";
            AWS_SDK_LOAD_CONFIG = "true";
            AWS_PROFILE = "mitmh2025-puzzup";
            EMAIL_FROM = "info@mitmh2025.com";
            #OTEL_METRICS_EXPORTER=console
            #OTEL_LOGS_EXPORTER=console
            #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
          } ++ [
            {
              name = "REDIS_URL";
              value_from = [{
                secret_key_ref = [{
                  key = "REDIS_URL";
                  name = "api";
                }];
              }];
            }
            {
              name = "JWT_SECRET";
              value_from = [{
                secret_key_ref = [{
                  key = "JWT_SECRET";
                  name = "api";
                }];
              }];
            }
            {
              name = "FRONTEND_API_SECRET";
              value_from = [{
                secret_key_ref = [{
                  key = "FRONTEND_API_SECRET";
                  name = "api";
                }];
              }];
            }
            {
              name = "DATA_API_SECRET";
              value_from = [{
                secret_key_ref = [{
                  key = "DATA_API_SECRET";
                  name = "api";
                }];
              }];
            }
          ];
          resources = {
            limits.cpu = "1";
            limits.memory = "512Mi";
            requests.cpu = "250m";
            requests.memory = "150Mi";
          };
          liveness_probe = {
            http_get = {
              path = "/healthz";
              port = 80;
            };
            initial_delay_seconds = 3;
            period_seconds = 3;
          };
        }];
      };
    };
  };
  resource.kubernetes_service_v1.api = {
    metadata.namespace = "prod";
    metadata.name = "api";
    metadata.annotations."cloud.google.com/neg" = builtins.toJSON {
      exposed_ports."80".name = "prod-api";
    };
    lifecycle.ignore_changes = [
      ''metadata[0].annotations["cloud.google.com/neg-status"]''
    ];
    spec = {
      type = "ClusterIP";
      selector.app = "api";
      port = [
        {
          port = 80;
          protocol = "TCP";
          target_port = 80;
        }
      ];
    };
  };
  resource.kubernetes_deployment_v1.regsite = {
    metadata.namespace = "prod";
    metadata.name = "regsite";
    metadata.labels.app = "regsite";
    spec = {
      replicas = 1;
      selector.match_labels.app = "regsite";
      template = {
        metadata.labels.app = "regsite";
        spec.container = [{
          name = "regsite";
          image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
          env = lib.attrsToList {
            PORT = "81"; # Unused
            REGSITE_PORT = "80";
            HUNT_COMPONENTS = "reg";
            REGISTRATION_CLOSED = "1";
            API_BASE_URL = "http://api/api";
            #OTEL_METRICS_EXPORTER=console
            #OTEL_LOGS_EXPORTER=console
            #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
          } ++ [
            {
              name = "FRONTEND_API_SECRET";
              value_from = [{
                secret_key_ref = [{
                  key = "FRONTEND_API_SECRET";
                  name = "api";
                }];
              }];
            }
          ];
          resources = {
            limits.cpu = "1";
            limits.memory = "512Mi";
            requests.cpu = "250m";
            requests.memory = "150Mi";
          };
          liveness_probe = {
            http_get = {
              path = "/healthz";
              port = 80;
            };
            initial_delay_seconds = 3;
            period_seconds = 3;
          };
        }];
      };
    };
  };
  resource.kubernetes_service_v1.regsite = {
    metadata.namespace = "prod";
    metadata.name = "regsite";
    metadata.annotations."cloud.google.com/neg" = builtins.toJSON {
      exposed_ports."80".name = "prod-regsite";
    };
    lifecycle.ignore_changes = [
      ''metadata[0].annotations["cloud.google.com/neg-status"]''
    ];
    spec = {
      type = "ClusterIP";
      selector.app = "regsite";
      port = [
        {
          port = 80;
          protocol = "TCP";
          target_port = 80;
        }
      ];
    };
  };
}
