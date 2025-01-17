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
      client_ttl = 31536000;
      default_ttl = 31536000;
      max_ttl = 31536000;
      negative_caching = false;
      serve_while_stale = 86400;
    };
  };
  resource.google_compute_health_check.healthz = {
    name = "healthz";
    http_health_check.port = 80;
    http_health_check.request_path = "/healthz";
  };
  k8s.prod.deployment.api.backendService.enable = true;
  k8s.prod.deployment.regsite.backendService.enable = true;
  k8s.prod.deployment.ops.backendService.enable = true;
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
        {
          hosts = ["ops.mitmh2025.com"];
          path_matcher = "ops";
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
          name = "ops";
          default_service = lib.tfRef "google_compute_backend_service.ops.id";

          path_rule = [
            {
              paths = ["/api" "/api/*"];
              service = lib.tfRef "google_compute_backend_service.api.id";
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
  gcp.certificate.ops.domains = [
    "ops.mitmh2025.com"
  ];
  gcp.certificateMap.mitmh2025 = {
    defaultCertificateName = "www";
    host."mitmh2025.com" = "mitmh2025";
    host."ops.mitmh2025.com" = "ops";
  };
  route53.mitmh2025.gcp_dns_authorizations = [
    "www.mitmh2025.com"
    "mitmh2025.com"
    "ops.mitmh2025.com"
  ];
  route53.mitmh2025.rr.ops = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.mitmh2025.address")];
  };
  route53.mitmh2025.rr.ops-v6 = {
    name = "ops";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.mitmh2025-v6.address")];
  };
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
  gcp.certificate.two-pi-noir-com.domains = [
    "two-pi-noir.com"
  ];
  gcp.certificate.www-two-pi-noir-com.domains = [
    "www.two-pi-noir.com"
  ];
  gcp.certificateMap.two-pi-noir = {
    defaultCertificateName = "www-two-pi-noir";
    host."two-pi-noir.agency" = "two-pi-noir";
    host."two-pi-noir.com" = "two-pi-noir-com";
    host."www.two-pi-noir.com" = "www-two-pi-noir-com";
  };
  route53.two-pi-noir-com.gcp_dns_authorizations = [
    "two-pi-noir.com"
    "www.two-pi-noir.com"
  ];

  k8s.prod.deployment.ui.backendService.enable = true;
  k8s.prod.deployment.ws.backendService = {
    enable = true;
    timeoutSec = 86400;
  };
  k8s.prod.statefulSet.control-room.backendService = {
    enable = true;
    timeoutSec = 86400;
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
          hosts = [
            "two-pi-noir.agency"
            "www.two-pi-noir.com"
            "two-pi-noir.com"
          ];
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
          default_service = lib.tfRef "google_compute_backend_service.ui.id";

          path_rule = [
            {
              paths = ["/api" "/api/*"];
              service = lib.tfRef "google_compute_backend_service.api.id";
            }
            {
              paths = ["/static/*" "/giant-switch/*"];
              service = lib.tfRef "google_compute_backend_bucket.assets.id";
            }
            {
              paths = ["/ws"];
              service = lib.tfRef "google_compute_backend_service.ws.id";
            }
            {
              paths = [
                "/puzzle/control_room/ws"
                "/JaPCdoKSO193/host/ws/*"
              ];
              service = lib.tfRef "google_compute_backend_service.control-room.id";
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
          path = "/";
          service = lib.tfRef "google_compute_backend_service.ui.id";
        }
        {
          host = "www.two-pi-noir.agency";
          path = "/ws";
          service = lib.tfRef "google_compute_backend_service.ws.id";
        }
        {
          host = "www.two-pi-noir.agency";
          path = "/static/main.js";
          service = lib.tfRef "google_compute_backend_bucket.assets.id";
        }
        {
          host = "www.two-pi-noir.agency";
          path = "/giant-switch/manifest.json";
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
        {
          host = "www.two-pi-noir.agency";
          path = "/JaPCdoKSO193/host/ws/one";
          service = lib.tfRef "google_compute_backend_service.control-room.id";
        }
        {
          host = "www.two-pi-noir.agency";
          path = "/puzzle/control_room/ws";
          service = lib.tfRef "google_compute_backend_service.control-room.id";
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

  route53.two-pi-noir-com.rr.root = {
    name = lib.tfRef "data.aws_route53_zone.two-pi-noir-com.name";
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir.address")];
  };
  route53.two-pi-noir-com.rr.root-v6 = {
    name = lib.tfRef "data.aws_route53_zone.two-pi-noir-com.name";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir-v6.address")];
  };
  route53.two-pi-noir-com.rr.www = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir.address")];
  };
  route53.two-pi-noir-com.rr.www-v6 = {
    name = "www";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.two-pi-noir-v6.address")];
  };
}
