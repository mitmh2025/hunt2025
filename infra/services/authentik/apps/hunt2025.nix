{ config, lib, pkgs, ... }:
{
  sops.secrets."authentik/apps/staging/client_id" = {};
  sops.secrets."authentik/apps/staging/client_secret" = {};

  services.authentik.apps.staging = {
    name = "Staging";
    type = "proxy";
    host = "staging.mitmh2025.com";
    nginx = true;
  };

  services.authentik.apps.dev = {
    name = "Dev Autopush";
    type = "proxy";
    host = "dev.mitmh2025.com";
  };
}
