{ config, lib, pkgs, ... }:
let
    image = pkgs.dockerTools.buildLayeredImage {
      name = "site";
      contents = with pkgs; [
        dockerTools.caCertificates
        hunt2025.out
      ];
      config.Cmd = ["hunt2025"];
    };
  in {
  resource.skopeo2_copy.site = {
    depends_on = ["google_artifact_registry_repository.images"];
    source_image = "docker-archive:${image}";
    destination_image = "docker://${config.gcp.ar.images.url}/site:${image.imageTag}";
    keep_image = true; # Ensure that old replica sets can keep running.
  };
  resource.random_password.jwt_secret = {
    length = 32;
  };
  resource.random_password.frontend_api_secret = {
    length = 64;
  };
  resource.kubernetes_secret_v1.api = {
    metadata.namespace = "prod";
    metadata.name = "api";
    data = {
      JWT_SECRET = lib.tfRef "random_password.jwt_secret.result";
      FRONTEND_API_SECRET = lib.tfRef "random_password.frontend_api_secret.result";
    };
  };
  resource.kubernetes_deployment_v1.api = {
    depends_on = ["skopeo2_copy.site"];
    metadata.namespace = "prod";
    metadata.name = "api";
    metadata.labels.app = "api";
    spec = {
      replicas = 1;
      min_ready_seconds = 30;
      selector.match_labels.app = "api";
      template = {
        metadata.labels.app = "api";
        spec.service_account_name = lib.tfRef "kubernetes_service_account_v1.k8s-prod-api.metadata[0].name";
        spec.container = [{
          name = "api";
          image = "${config.gcp.ar.images.url}/site:${image.imageTag}";
          env = lib.attrsToList {
            # TODO: Add setting to only run API server.
            PORT = "80";
            # TODO: REDIS_URL = "redis://localhost:6379";
            DB_ENV = "production";
            DB_INSTANCE_CONNECTION_NAME = "mitmh2025:us-east5:prod";
            DB_AUTH_TYPE = "IAM";
            DB_NAME = lib.tfRef "postgresql_database.hunt2025.name";
            DB_USER = lib.tfRef "google_sql_user.k8s-prod-api.name";
            #OTEL_METRICS_EXPORTER=console
            #OTEL_LOGS_EXPORTER=console
            #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
          } ++ [
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
      ingress = true;
    }; #''{"exposed_ports": {"80":{"name": "NEG_NAME"}}}'';
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
}
