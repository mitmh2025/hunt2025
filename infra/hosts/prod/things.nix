{ config, options, lib, pkgs, self, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/prod/things.yaml;
      virtualisation.vmVariant = {
        systemd.services.google-guest-agent.enable = false;
        systemd.services.google-startup-scripts.enable = false;
        systemd.services.google-shutdown-scripts.enable = false;
      };
      services.nginx.enable = true;
    }
    {
      services.thingsboard.settings.spring.datasource = {
        url = "jdbc:postgresql:///thingsboard?" + lib.concatStringsSep "&" (lib.mapAttrsToList (name: value: "${name}=${lib.escapeURL value}") {
          cloudSqlInstance = "mitmh2025:us-east5:prod";
          ipTypes = "PRIVATE";
          socketFactory = "com.google.cloud.sql.postgres.SocketFactory";
          user = "things-vm@mitmh2025.iam";
          enableIamAuth = "true";
        });
        #username = "things";
      };
    }
    {
      users.groups.acme-thingsboard = {};
      users.users.thingsboard.extraGroups = [ "acme-thingsboard" ];
      users.users."${config.services.nginx.user}".extraGroups = [ "acme-thingsboard" ];
      security.acme.certs."things.mitmh2025.com".group = "acme-thingsboard";

      services.thingsboard.enable = true;
      services.thingsboard.settings = let
        certDir = config.security.acme.certs."things.mitmh2025.com".directory;
        credentials = {
          type = "PEM";
          pem.cert_file = "${certDir}/cert.pem";
          pem.key_file = "${certDir}/key.pem";
        };
      in {
        server.forward_headers_strategy = "NATIVE";
        device.connectivity = {
          mqtts.enabled = true;
          coaps.enabled = true;
        };
        transport.mqtt.ssl = {
          enabled = true;
          inherit credentials;
        };
        coap.dtls = {
          enabled = true;
          inherit credentials;
        };
      };
    }
    {
      services.nginx = {
        enable = true;

        additionalModules = with pkgs.nginxModules; [
          vts
        ];
        appendHttpConfig = ''
          vhost_traffic_status_zone;
        '';
        recommendedTlsSettings = true;
        recommendedOptimisation = true;
        recommendedGzipSettings = true;
        recommendedProxySettings = true;

        upstreams.thingsboard.servers."127.0.0.1:8080" = {};
        virtualHosts = {
          "things.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://thingsboard";
              proxyWebsockets = true;
            };
          };
        };
      };
    }
  ];
}
