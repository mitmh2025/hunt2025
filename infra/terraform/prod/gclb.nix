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
  data.google_compute_network_endpoint_group.prod-api = {
    depends_on = ["kubernetes_service_v1.api"];
    name = "prod-api";
    inherit (config.provider.google) zone;
  };
  resource.google_compute_health_check.healthz = {
    name = "healthz";
    http_health_check.port = 80;
    http_health_check.request_path = "/healthz";
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
  };
  resource.google_compute_url_map.default = {
    name = "default";

    host_rule = [{
      hosts = ["www.mitmh2025.com" "prod.mitmh2025.com"];
      path_matcher = "www";
    }];
    # TODO: Set default_service to the main web server.
    default_service = lib.tfRef "google_compute_backend_bucket.assets.id";
    path_matcher = [{
      name = "www";
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
    }];
    test = [
      {
        host = "prod.mitmh2025.com";
        path = "/static/main.js";
        service = lib.tfRef "google_compute_backend_bucket.assets.id";
      }
      {
        host = "prod.mitmh2025.com";
        path = "/api";
        service = lib.tfRef "google_compute_backend_service.api.id";
      }
      {
        host = "prod.mitmh2025.com";
        path = "/api/register";
        service = lib.tfRef "google_compute_backend_service.api.id";
      }
    ];
  };
  resource.google_compute_target_https_proxy.default = {
    name = "default";
    url_map = lib.tfRef "google_compute_url_map.default.id";
    certificate_map = "//certificatemanager.googleapis.com/${lib.tfRef "google_certificate_manager_certificate_map.www.id"}";
  };
  resource.google_compute_global_address.www = {
    name = "www";
  };
  resource.google_compute_global_address.www-v6 = {
    name = "www-v6";
    ip_version = "IPV6";
  };
  gcp.certificate.www = {
    scope = "DEFAULT";
    domains = [
      "www.mitmh2025.com"
      "prod.mitmh2025.com"
    ];
  };
  route53.mitmh2025.gcp_dns_authorizations = [
    "www.mitmh2025.com"
    "prod.mitmh2025.com"
  ];
  resource.google_compute_global_forwarding_rule.default = {
    name = "default";
    ip_protocol = "TCP";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    port_range = "443";
    target = lib.tfRef "google_compute_target_https_proxy.default.id";
    ip_address = lib.tfRef "google_compute_global_address.www.id";
  };
  resource.google_compute_global_forwarding_rule.default-v6 = {
    name = "default-v6";
    ip_protocol = "TCP";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    port_range = "443";
    target = lib.tfRef "google_compute_target_https_proxy.default.id";
    ip_address = lib.tfRef "google_compute_global_address.www-v6.id";
  };
  resource.google_compute_url_map.http = {
    name = "http";
    default_url_redirect = {
      https_redirect = true;
      redirect_response_code = "MOVED_PERMANENTLY_DEFAULT";
      strip_query = false;
    };
  };
  resource.google_compute_target_http_proxy.default = {
    name = "default";
    url_map = lib.tfRef "google_compute_url_map.http.id";
  };
  resource.google_compute_global_forwarding_rule.http = {
    name = "http";
    ip_protocol = "TCP";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    port_range = "80";
    target = lib.tfRef "google_compute_target_http_proxy.default.id";
    ip_address = lib.tfRef "google_compute_global_address.www.id";
  };
  resource.google_compute_global_forwarding_rule.http-v6 = {
    name = "http-v6";
    ip_protocol = "TCP";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    port_range = "80";
    target = lib.tfRef "google_compute_target_http_proxy.default.id";
    ip_address = lib.tfRef "google_compute_global_address.www-v6.id";
  };
  route53.mitmh2025.rr.prod = {
    type = "A";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.www.address")];
  };
  route53.mitmh2025.rr.prod-v6 = {
    name = "prod";
    type = "AAAA";
    ttl = "300";
    records = [(lib.tfRef "google_compute_global_address.www-v6.address")];
  };
}
