{ config, lib, pkgs, ... }:
{
  sops.secrets."authentik/apps/thingsboard-staging/client_id" = {
    owner = config.systemd.services.thingsboard.serviceConfig.User;
  };
  sops.secrets."authentik/apps/thingsboard-staging/client_secret" = {
    owner = config.systemd.services.thingsboard.serviceConfig.User;
  };
  services.authentik.apps.thingsboard-staging = {
    name = "ThingsBoard Staging";
    type = "oauth2";
    redirect_uris = "https://things.staging.mitmh2025.com/login/oauth2/code/";
    groups = ["authentik Admins"];
  };
}
