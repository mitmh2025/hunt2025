{ config, lib, pkgs, ... }:
{
  services.authentik.apps.staging = {
    name = "Staging";
    type = "proxy";
    host = "staging.mitmh2025.com";
    nginx = true;
    properties = [
      "email"
      "openid"
      "profile"
      "ak_proxy"
    ];
  };
}
