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
  gcp.ar.images.images.misc.sourceImage = pkgs.dockerTools.buildLayeredImage {
    name = "misc";
    contents = with pkgs; [
      dockerTools.caCertificates
      hunt2025.misc
      dockerTools.binSh
    ];
  };
  sops.keys.site = {};
  data.sops_file.site.source_file = "${../../secrets/prod/site.yaml}";
  resource.tls_private_key.jwt_secret = {
    algorithm = "RSA";
  };
  resource.random_password.data_api_secret = {
    length = 64;
    special = false;
  };
  resource.random_password.frontend_api_secret = {
    length = 64;
  };
  resource.kubernetes_config_map_v1.api = {
    metadata.namespace = "prod";
    metadata.name = "api";
    data."aws-config" = lib.generators.toINI {} {
      "profile mitmh2025-puzzup".credential_process = "/bin/aws-credential-process 891377012427 K8sProdAPI";
    };
  };
  k8s.prod.deployment.api = {
    image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
    port = 80;
    expose = true;
    env = {
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
      EMAIL_FROM = "MIT Mystery Hunt 2025 <info@mitmh2025.com>";
      EMAIL_TRANSPORT = "postmark";
      JWKS_URI = "https://auth.mitmh2025.com/application/o/ops/jwks/";
      MEDIA_BASE_URL = "https://media.mitmh2025.com";
      #OTEL_METRICS_EXPORTER=console
      #OTEL_LOGS_EXPORTER=console
      #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
    };
    secretEnv = {
      JWT_SECRET = lib.tfRef "tls_private_key.jwt_secret.private_key_pem_pkcs8";
      DATA_API_SECRET = lib.tfRef "random_password.data_api_secret.result";
      FRONTEND_API_SECRET = lib.tfRef "random_password.frontend_api_secret.result";
      REDIS_URL = ''redis://default:${lib.tfRef "random_password.valkey.result"}@redis'';
      EMAIL_POSTMARK_TOKEN = lib.tfRef ''data.sops_file.site.data["postmark.token"]'';
      EMAIL_POSTMARK_STREAM = lib.tfRef ''data.sops_file.site.data["postmark.stream"]'';
    };
    container = {
      volume_mount = [{
        name = "config";
        mount_path = "/config";
      }];
      liveness_probe = {
        http_get = {
          path = "/healthz";
          port = 80;
        };
        initial_delay_seconds = 3;
        period_seconds = 3;
      };
    };
    template = {
      spec.service_account_name = lib.tfRef "kubernetes_service_account_v1.k8s-prod-api.metadata[0].name";
      spec.volume = [{
        name = "config";
        config_map.name = lib.tfRef "kubernetes_config_map_v1.api.metadata[0].name";
      }];
    };
  };
  k8s.prod.deployment.regsite = {
    image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
    port = 80;
    expose = true;
    # Don't update the regsite until the assets are updated.
    deployment.depends_on = [
      "terraform_data.assets"
    ];
    env = {
      PORT = "81"; # Unused
      REGSITE_PORT = "80";
      HUNT_COMPONENTS = "reg";
      API_BASE_URL = "http://api/api";
      #OTEL_METRICS_EXPORTER=console
      #OTEL_LOGS_EXPORTER=console
      #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
    };
    envValueFrom.FRONTEND_API_SECRET.secret_key_ref = [{
      key = "FRONTEND_API_SECRET";
      name = "api";
    }];
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
  k8s.prod.deployment.ui = {
    image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
    port = 80;
    expose = true;
    env = {
      PORT = "80";
      HUNT_COMPONENTS = "ui";
      API_BASE_URL = "http://api/api";
      #OTEL_METRICS_EXPORTER=console
      #OTEL_LOGS_EXPORTER=console
      #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
    };
    envValueFrom.FRONTEND_API_SECRET.secret_key_ref = [{
      key = "FRONTEND_API_SECRET";
      name = lib.tfRef "kubernetes_secret_v1.api.metadata[0].name";
    }];
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
  k8s.prod.deployment.ws = {
    image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
    port = 80;
    expose = true;
    env = {
      PORT = "80";
      HUNT_COMPONENTS = "ws";
      API_BASE_URL = "http://api/api";
      #OTEL_METRICS_EXPORTER=console
      #OTEL_LOGS_EXPORTER=console
      #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
    };
    envValueFrom.REDIS_URL.secret_key_ref = [{
      key = "REDIS_URL";
      name = lib.tfRef "kubernetes_secret_v1.api.metadata[0].name";
    }];
    envValueFrom.FRONTEND_API_SECRET.secret_key_ref = [{
      key = "FRONTEND_API_SECRET";
      name = lib.tfRef "kubernetes_secret_v1.api.metadata[0].name";
    }];
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
  k8s.prod.deployment.inteng = {
    image = lib.tfRef config.gcp.ar.images.images.site.urlRef;
    port = 80;
    env = {
      PORT = "80";
      HUNT_COMPONENTS = "inteng";
      API_BASE_URL = "http://api/api";
      #OTEL_METRICS_EXPORTER=console
      #OTEL_LOGS_EXPORTER=console
      #OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
    };
    envValueFrom.REDIS_URL.secret_key_ref = [{
      key = "REDIS_URL";
      name = lib.tfRef "kubernetes_secret_v1.api.metadata[0].name";
    }];
    envValueFrom.FRONTEND_API_SECRET.secret_key_ref = [{
      key = "FRONTEND_API_SECRET";
      name = lib.tfRef "kubernetes_secret_v1.api.metadata[0].name";
    }];
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
  gcp.ar.images.images.ops.sourceImage = pkgs.dockerTools.buildLayeredImage {
    name = "ops";
    contents = with pkgs; [
      dockerTools.caCertificates
      hunt2025.misc
      hunt2025.ops
      dockerTools.binSh
    ];
    config.Cmd = ["ops"];
  };
  k8s.prod.deployment.ops = {
    image = lib.tfRef config.gcp.ar.images.images.ops.urlRef;
    port = 80;
    expose = true;
    env = {
      OPSSITE_PORT = "80";
      OPSSITE_STATIC_PATH = "${pkgs.hunt2025.ops}/share/ops/static";
      API_BASE_URL = "http://api/api";
      OAUTH_SERVER = "https://auth.mitmh2025.com/application/o/ops/.well-known/openid-configuration";
      MEDIA_BASE_URL = "https://media.mitmh2025.com";
    };
    secretEnv = {
      OAUTH_CLIENT_ID = lib.tfRef ''data.sops_file.site.data["authentik.apps.ops.client_id"]'';
      OAUTH_CLIENT_SECRET = lib.tfRef ''data.sops_file.site.data["authentik.apps.ops.client_secret"]'';
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
