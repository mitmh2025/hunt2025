{ config, lib, pkgs, ... }:
{
  sops.secrets."authentik/apps/staging/client_id" = {};
  sops.secrets."authentik/apps/staging/client_secret" = {};

  services.authentik.apps.staging = {
    name = "Staging";
    app.attrs.group = "Staging";
    type = "proxy";
    host = "staging.mitmh2025.com";
    nginx = true;
  };

  services.authentik.apps.staging-reg = {
    name = "Staging Registration";
    app.attrs.group = "Staging";
    type = "proxy";
    host = "reg.staging.mitmh2025.com";
    nginx = true;
  };

  sops.secrets."authentik/apps/staging-ops/client_id" = {};
  sops.secrets."authentik/apps/staging-ops/client_secret" = { };
  services.authentik.apps.staging-ops = {
    name = "Staging Ops";
    app.attrs.group = "Staging";
    type = "oauth2";
    redirect_uris = "https://ops.staging.mitmh2025.com/auth/mitmh2025/callback";
    provider.attrs.access_token_validity = "days=7";
    properties = [
      "goauthentik.io/providers/oauth2/scope-email"
      "goauthentik.io/providers/oauth2/scope-openid"
      "goauthentik.io/providers/oauth2/scope-profile"
      "mitmh2025.com/oauth2/admin"
    ];
    groups = [
      "authentik Admins"
      "Ops"
    ];
  };

  services.authentik.apps.dev = {
    name = "Dev Autopush";
    app.attrs.group = "Dev";
    type = "proxy";
    host = "dev.mitmh2025.com";
  };

  services.authentik.apps.dev-reg = {
    name = "Dev Autopush Registration";
    app.attrs.group = "Dev";
    type = "proxy";
    host = "reg.dev.mitmh2025.com";
  };

  sops.secrets."authentik/apps/ops/client_id" = {
    sopsFile = ../../../secrets/prod/site.yaml;
  };
  sops.secrets."authentik/apps/ops/client_secret" = {
    sopsFile = ../../../secrets/prod/site.yaml;
  };
  services.authentik.apps.ops = {
    name = "Ops";
    type = "oauth2";
    redirect_uris = "https://ops.mitmh2025.com/auth/mitmh2025/callback";
    provider.attrs.access_token_validity = "days=7";
    properties = [
      "goauthentik.io/providers/oauth2/scope-email"
      "goauthentik.io/providers/oauth2/scope-openid"
      "goauthentik.io/providers/oauth2/scope-profile"
      "mitmh2025.com/oauth2/admin"
    ];
    groups = [
      "authentik Admins"
      "Ops"
    ];
  };
}
