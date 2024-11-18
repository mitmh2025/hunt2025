{ config, lib, pkgs, ... }:
{
  gcp.services.certificatemanager.enable = true;
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
          paths = ["/static"];
          service = lib.tfRef "google_compute_backend_bucket.assets.id";
        }
      ];
    }];
  };
  resource.google_compute_target_https_proxy.default = {
    name = "default";
    url_map = lib.tfRef "google_compute_url_map.default.id";
    certificate_map = "//certificatemanager.googleapis.com/${lib.tfRef "google_certificate_manager_certificate_map.www.id"}";
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
  # TODO: A second forwarding rule for port 80 that redirects to 443.
  resource.google_compute_global_forwarding_rule.default = {
    name = "default";
    ip_protocol = "TCP";
    load_balancing_scheme = "EXTERNAL_MANAGED";
    port_range = "443";
    target = lib.tfRef "google_compute_target_https_proxy.default.id";
  };
}