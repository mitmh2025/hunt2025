{ config, lib, pkgs, ... }:
{
  services.authentik.apps.atlantis = {
    name = "Atlantis";
    type = "proxy";
    host = "atlantis.mitmh2025.com";
    groups = ["authentik Admins"];
  };
}
