{ config, options, lib, pkgs, self, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/prod/media.yaml;
    }
    {
      virtualisation.vmVariant = {
        systemd.services.google-guest-agent.enable = false;
        systemd.services.google-startup-scripts.enable = false;
        systemd.services.google-shutdown-scripts.enable = false;
      };
      services.nginx.enable = true;
    }
    {
      hunt.radio.enable = true;
      hunt.radio.externalHostname = "media.mitmh2025.com";
      hunt.radio.jwksUri = "https://www.mitmh2025.com/api/jwks";
      hunt.radio.record = true;
      services.mediamtx.settings = {
        pathDefaults = {
          # TODO:
          # record = true;
          # recordPath = "/var/lib/mediamtx/recordings/%path/%Y-%m-%d_%H-%M-%S-%f";
          # recordPartDuration = "1s";
          # recordSegmentDuration = "1h";
          # recordDeleteAfter = "24h";
          # runOnRecordSegmentComplete = ''# Upload to GCS'';
        };
      };
    }
    {
      sops.secrets."mediamtx/metrics_jwt" = {};
      sops.templates."otel/env" = {
        content = ''
          MEDIAMTX_METRICS_JWT=${config.sops.placeholder."mediamtx/metrics_jwt"}
        '';
      };
      systemd.services.opentelemetry-collector.serviceConfig.EnvironmentFile = config.sops.templates."otel/env".path;
      services.opentelemetry-collector = {
        enable = true;
        package = pkgs.opentelemetry-collector-contrib;
        settings = {
          receivers.prometheus.config = {
            scrape_configs = [
              {
                job_name = "mediamtx";
                scrape_interval = "10s";
                params.jwt = ["\${env:MEDIAMTX_METRICS_JWT}"];
                static_configs = [{
                  targets = ["localhost:9998"];
                }];
              }
            ];
          };
          processors.metricstransform.transforms = [
            {
              include = "_(conns|sessions)($|_)";
              match_type = "regexp";
              action = "update";
              operations = [{
                action = "aggregate_labels";
                label_set = [];
                aggregation_type = "sum";
              }];
            }
          ];
          processors.transform = {
            error_mode = "ignore";
            metric_statements = [
              {
                context = "metric";
                statements = [
                  ''convert_gauge_to_sum("cumulative", true) where IsMatch(name,"_bytes_(sent|received)$")''
                ];
              }
            ];
          };
          processors.resourcedetection = {
            detectors = ["env" "gcp"];
            timeout = "2s";
            override = false;
          };
          exporters.googlemanagedprometheus = {};
          service.pipelines.metrics = {
            receivers = ["prometheus"];
            processors = [
              "metricstransform"
              "transform"
              "resourcedetection"
            ];
            exporters = ["googlemanagedprometheus"];
          };
        };
      };
    }
  ];
}
