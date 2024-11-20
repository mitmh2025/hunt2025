{ config, lib, pkgs, ... }:
{
  options = with lib; {
    gcp.loadBalancer = mkOption {
      default = {};
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
        options = {
          urlMap = mkOption { type = types.attrs; };
          certificateMapName = mkOption { type = types.str; };
          resource = mkOption { type = types.anything; };
        };
        config = {
          resource.google_compute_url_map.${name} = {
            inherit name;
          } // config.urlMap;
          resource.google_compute_target_https_proxy.${name} = {
            inherit name;
            url_map = lib.tfRef "google_compute_url_map.${name}.id";
            certificate_map = "//certificatemanager.googleapis.com/${lib.tfRef "google_certificate_manager_certificate_map.${config.certificateMapName}.id"}";
          };
          resource.google_compute_global_address.${name} = {
            inherit name;
          };
          resource.google_compute_global_address."${name}-v6" = {
            name = "${name}-v6";
            ip_version = "IPV6";
          };
          resource.google_compute_global_forwarding_rule.${name} = {
            inherit name;
            ip_protocol = "TCP";
            load_balancing_scheme = "EXTERNAL_MANAGED";
            port_range = "443";
            target = lib.tfRef "google_compute_target_https_proxy.${name}.id";
            ip_address = lib.tfRef "google_compute_global_address.${name}.id";
          };
          resource.google_compute_global_forwarding_rule."${name}-v6" = {
            name = "${name}-v6";
            ip_protocol = "TCP";
            load_balancing_scheme = "EXTERNAL_MANAGED";
            port_range = "443";
            target = lib.tfRef "google_compute_target_https_proxy.${name}.id";
            ip_address = lib.tfRef "google_compute_global_address.${name}-v6.id";
          };
          resource.google_compute_url_map."${name}-http" = {
            name = "${name}-http";
            default_url_redirect = {
              https_redirect = true;
              redirect_response_code = "MOVED_PERMANENTLY_DEFAULT";
              strip_query = false;
            };
          };
          resource.google_compute_target_http_proxy.${name} = {
            inherit name;
            url_map = lib.tfRef "google_compute_url_map.${name}-http.id";
          };
          resource.google_compute_global_forwarding_rule."${name}-http" = {
            name = "${name}-http";
            ip_protocol = "TCP";
            load_balancing_scheme = "EXTERNAL_MANAGED";
            port_range = "80";
            target = lib.tfRef "google_compute_target_http_proxy.${name}.id";
            ip_address = lib.tfRef "google_compute_global_address.${name}.id";
          };
          resource.google_compute_global_forwarding_rule."${name}-http-v6" = {
            name = "${name}-http-v6";
            ip_protocol = "TCP";
            load_balancing_scheme = "EXTERNAL_MANAGED";
            port_range = "80";
            target = lib.tfRef "google_compute_target_http_proxy.${name}.id";
            ip_address = lib.tfRef "google_compute_global_address.${name}-v6.id";
          };
        };
      }));
    };
  };
  config = {
    resource = lib.mkMerge (lib.mapAttrsToList (_: lb: lb.resource) config.gcp.loadBalancer);
  };
}