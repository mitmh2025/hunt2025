{ config, lib, pkgs, radio-media, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
    ../../services/postgres.nix
    ../../services/redis.nix
    ../../services/authentik
    ../../services/zammad.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/staging.yaml;
    }
    {
      hunt2025.site = {
        enable = true;
        db_env = "ci";  # N.B. We use "ci" to trigger a database reseed on startup.
        port = "%t/hunt2025/hunt2025.sock";
        apiBaseUrl = "http://localhost/api";
      };

      users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025" ];
      systemd.services.hunt2025 = {
        serviceConfig.RuntimeDirectory = "hunt2025";
        # Remove database every time the service restarts.
        preStart = ''
          ${config.services.postgresql.package}/bin/psql hunt2025 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
        '';
      };
    }
    {
      services.thingsboard = {
        enable = true;
        datasource.createLocally = true;
      };
    }
    {
      users.groups.acme-thingsboard = {};
      users.users.thingsboard.extraGroups = [ "acme-thingsboard" ];
      users.users."${config.services.nginx.user}".extraGroups = [ "acme-thingsboard" ];
      security.acme.certs."things.staging.mitmh2025.com".group = "acme-thingsboard";

      services.thingsboard.settings = let
        certDir = config.security.acme.certs."things.staging.mitmh2025.com".directory;
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
      hunt.radio = {
        enable = true;
        externalHostname = "media.staging.mitmh2025.com";
      };
      services.mediamtx.settings = {
        paths.music = {
          runOnInit = ''
            env MUSIC_DIR=${radio-media}/music/ OUTPUT_URL=rtsp://localhost:$RTSP_PORT/$MTX_PATH ${lib.getExe pkgs.liquidsoap} ${../../../radioman/station-break-test.liq}
          '';
          runOnInitRestart = true;
        };
        paths.ads = {
          runOnInit = ''
            ${lib.getExe pkgs.ffmpeg} -re -stream_loop -1 -i ${"${radio-media}/quixotic-shoe/ads.mp3"} -vn -c:a libopus -ar 48000 -b:a 128k -packet_loss 1 -fec true -f rtsp rtsp://localhost:$RTSP_PORT/$MTX_PATH
          '';
          runOnInitRestart = true;
        };
        paths.weather = {
          runOnInit = ''
            env MUSIC_DIR=${radio-media}/music/ BREAK_DIR=${radio-media}/icy-box/ OUTPUT_URL=rtsp://localhost:$RTSP_PORT/$MTX_PATH ${lib.getExe pkgs.liquidsoap} ${../../../radioman/station-break-test.liq}
          '';
          runOnInitRestart = true;
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

        upstreams.hunt2025.servers."unix:/run/hunt2025/hunt2025.sock" = {};
        upstreams.thingsboard.servers."127.0.0.1:8080" = {};
        virtualHosts = {
          "staging.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025";
              proxyWebsockets = true;
            };
            locations."= /radio-manifest.json" = {
              alias = "${pkgs.hunt2025}/lib/hunt2025/dist/radio-manifest.json";
              # Copy Authentik configuration
              extraConfig = config.services.nginx.virtualHosts."staging.mitmh2025.com".locations."/".extraConfig;
            };
            locations."/static/".alias = "${pkgs.hunt2025.assets}/static/";
          };
          "things.staging.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://thingsboard";
              proxyWebsockets = true;
            };
          };
          "localhost" = {
            # Expose plain HTTP on localhost for use by the frontend
            locations."/api".proxyPass = "http://hunt2025";
          };
        };
      };
    }
  ];
}
