{ config, lib, pkgs, ... }:
{
  gcp.services.certificatemanager.enable = true;
  # Guide to using GCLB with GKE:
  # https://cloud.google.com/kubernetes-engine/docs/how-to/standalone-neg
  resource.google_compute_firewall.fw-allow-health-check-and-proxy = {
    name = "fw-allow-health-check-and-proxy";
    network = lib.tfRef "data.google_compute_network.default.name";
    # https://cloud.google.com/load-balancing/docs/https#firewall-rules
    direction = "INGRESS";
    source_ranges = [
      "130.211.0.0/22"
      "35.191.0.0/16"
    ];
    target_tags = ["gke-k8s"];
    allow = [{
      protocol = "tcp";
    }];
  };
  resource.google_compute_backend_bucket.assets = {
    name = "assets-bucket";
    description = "Static assets";
    bucket_name = lib.tfRef "google_storage_bucket.assets.name";
    enable_cdn = true;
    cdn_policy = {
      cache_mode = "CACHE_ALL_STATIC";
      client_ttl = 3600;
      default_ttl = 3600;
      max_ttl = 86400;
      negative_caching = true;
      serve_while_stale = 86400;
    };
  };
  resource.google_compute_health_check.healthz = {
    name = "healthz";
    http_health_check.port = 80;
    http_health_check.request_path = "/healthz";
  };
  data.google_compute_network_endpoint_group.prod-api = {
    depends_on = ["kubernetes_service_v1.api"];
    name = "prod-api";
    inherit (config.provider.google) zone;
  };
  resource.google_compute_backend_service.api = {
    name = "api";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    backend = [{
      balancing_mode = "RATE";
      # If we had more than one backend, this would be used to belance between them.
      max_rate_per_endpoint = 1;
      group = lib.tfRef "data.google_compute_network_endpoint_group.prod-api.self_link";
    }];
    health_checks = [(lib.tfRef "google_compute_health_check.healthz.id")];
    log_config.enable = true;
  };
  data.google_compute_network_endpoint_group.prod-regsite = {
    depends_on = ["kubernetes_service_v1.regsite"];
    name = "prod-regsite";
    inherit (config.provider.google) zone;
  };
  resource.google_compute_backend_service.regsite = {
    depends_on = ["kubernetes_service_v1.regsite"];
    name = "regsite";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    backend = [{
      balancing_mode = "RATE";
      # If we had more than one backend, this would be used to belance between them.
      max_rate_per_endpoint = 1;
      group = lib.tfRef "data.google_compute_network_endpoint_group.prod-regsite.self_link";
    }];
    health_checks = [(lib.tfRef "google_compute_health_check.healthz.id")];
    log_config.enable = true;
  };
  gcp.loadBalancer.mitmh2025 = {
    certificateMapName = "mitmh2025";
    urlMap = {
      host_rule = [
        {
          hosts = ["www.mitmh2025.com"];
          path_matcher = "www";
        }
        {
          hosts = ["mitmh2025.com"];
          path_matcher = "root";
        }
      ];
      # If a host doesn't match, just redirect to www.
      default_url_redirect = {
        https_redirect = true;
        host_redirect = "www.mitmh2025.com";
        path_redirect = "/";
        redirect_response_code = "FOUND";
        strip_query = true;
      };
      path_matcher = [
        {
          name = "www";
          default_service = lib.tfRef "google_compute_backend_service.regsite.id";

          path_rule = [
            {
              paths = ["/api" "/api/*"];
              service = lib.tfRef "google_compute_backend_service.api.id";
            }
            {
              paths = ["/static/*"];
              service = lib.tfRef "google_compute_backend_bucket.assets.id";
            }
          ];
        }
        {
          name = "root";
          default_url_redirect = {
            https_redirect = true;
            host_redirect = "www.mitmh2025.com";
            redirect_response_code = "MOVED_PERMANENTLY_DEFAULT";
            strip_query = false;
          };
        }
      ];
      test = [
        {
          host = "www.mitmh2025.com";
          path = "/static/main.js";
          service = lib.tfRef "google_compute_backend_bucket.assets.id";
        }
        {
          host = "www.mitmh2025.com";
          path = "/api";
          service = lib.tfRef "google_compute_backend_service.api.id";
        }
        {
          host = "www.mitmh2025.com";
          path = "/api/register";
          service = lib.tfRef "google_compute_backend_service.api.id";
        }
        {
          host = "www.mitmh2025.com";
          path = "/";
          service = lib.tfRef "google_compute_backend_service.regsite.id";
        }
      ];
    };
  };
  gcp.certificate.www = {
    domains = [
      "www.mitmh2025.com"
    ];
  };
  gcp.certificate.mitmh2025.domains = [
    "mitmh2025.com"
  ];
  gcp.certificateMap.mitmh2025 = {
    defaultCertificateName = "www";
    host."mitmh2025.com" = "mitmh2025";
  };
  route53.mitmh2025.gcp_dns_authorizations = [
    "www.mitmh2025.com"
    "mitmh2025.com"
  ];
  route53.mitmh2025.rr.www = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.mitmh2025.address")];
  };
  route53.mitmh2025.rr.www-v6 = {
    name = "www";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.mitmh2025-v6.address")];
  };
  route53.mitmh2025.rr.root = {
    name = lib.tfRef "data.aws_route53_zone.mitmh2025.name";
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.mitmh2025.address")];
  };
  route53.mitmh2025.rr.root-v6 = {
    name = lib.tfRef "data.aws_route53_zone.mitmh2025.name";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.mitmh2025-v6.address")];
  };

  gcp.certificate.two-pi-noir.domains = [
    "two-pi-noir.agency"
  ];
  gcp.certificate.www-two-pi-noir.domains = [
    "www.two-pi-noir.agency"
  ];
  route53.two-pi-noir.gcp_dns_authorizations = [
    "two-pi-noir.agency"
    "www.two-pi-noir.agency"
  ];
  gcp.certificateMap.two-pi-noir = {
    defaultCertificateName = "www-two-pi-noir";
    host."two-pi-noir.agency" = "two-pi-noir";
  };

  gcp.loadBalancer.two-pi-noir = {
    certificateMapName = "two-pi-noir";
    urlMap = {
      host_rule = [
        {
          hosts = ["www.two-pi-noir.agency"];
          path_matcher = "www";
        }
        {
          hosts = ["two-pi-noir.agency"];
          path_matcher = "root";
        }
      ];
      # If a host doesn't match, just redirect to www.
      default_url_redirect = {
        https_redirect = true;
        host_redirect = "www.two-pi-noir.agency";
        path_redirect = "/";
        redirect_response_code = "FOUND";
        strip_query = true;
      };
      path_matcher = [
        {
          name = "www";
          # TODO: Set default_service to the main web server.
          default_service = lib.tfRef "google_compute_backend_bucket.assets.id";

          path_rule = [
            {
              paths = ["/api" "/api/*"];
              service = lib.tfRef "google_compute_backend_service.api.id";
            }
            {
              paths = ["/static/*"];
              service = lib.tfRef "google_compute_backend_bucket.assets.id";
            }
          ];
        }
        {
          name = "root";
          default_url_redirect = {
            https_redirect = true;
            host_redirect = "www.two-pi-noir.agency";
            redirect_response_code = "MOVED_PERMANENTLY_DEFAULT";
            strip_query = false;
          };
        }
      ];
      test = [
        # The `google` provider doesn't support `expectedOutputUrl` yet.
        # {
        #   host = "two-pi-noir.agency";
        #   path = "/foo";
        #   expected_output_url = "https://www.two-pi-noir.agency/foo";
        # }
        # {
        #   host = "two-pi-noir.agency";
        #   path = "/api";
        #   expected_output_url = "https://www.two-pi-noir.agency/api";
        # }
        {
          host = "www.two-pi-noir.agency";
          path = "/static/main.js";
          service = lib.tfRef "google_compute_backend_bucket.assets.id";
        }
        {
          host = "www.two-pi-noir.agency";
          path = "/api";
          service = lib.tfRef "google_compute_backend_service.api.id";
        }
        {
          host = "www.two-pi-noir.agency";
          path = "/api/register";
          service = lib.tfRef "google_compute_backend_service.api.id";
        }
      ];
    };
  };

  route53.two-pi-noir.rr.root = {
    name = lib.tfRef "data.aws_route53_zone.two-pi-noir.name";
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir.address")];
  };
  route53.two-pi-noir.rr.root-v6 = {
    name = lib.tfRef "data.aws_route53_zone.two-pi-noir.name";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir-v6.address")];
  };
  route53.two-pi-noir.rr.www = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir.address")];
  };
  route53.two-pi-noir.rr.www-v6 = {
    name = "www";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir-v6.address")];
  };
}
