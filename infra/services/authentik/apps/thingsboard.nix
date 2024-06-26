{ config, lib, pkgs, ... }:
{
  sops.secrets."authentik/apps/thingsboard/client_id" = {
    owner = config.systemd.services.thingsboard.serviceConfig.User;
  };
  sops.secrets."authentik/apps/thingsboard/client_secret" = {
    owner = config.systemd.services.thingsboard.serviceConfig.User;
  };
  services.authentik.apps.thingsboard = {
    name = "ThingsBoard";
    type = "oauth2";
    redirect_uris = "https://things.mitmh2025.com/login/oauth2/code/";
  };
}
