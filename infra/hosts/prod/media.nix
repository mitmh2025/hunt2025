{ config, options, lib, pkgs, self, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
  ];
  config = lib.mkMerge [
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
      services.mediamtx.settings = {
        api = true; # :9997
        metrics = true; # :9998

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
  ];
}
