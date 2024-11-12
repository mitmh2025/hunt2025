{ lib, config, ... }:
{
  options = with lib; {
    gcp.services = mkOption {
      type = types.attrsOf (types.submodule ({ name, ... }: {
        options.enable = mkEnableOption "Enable ${name}.googleapis.com";
      }));
      default = {};
    };
  };
  config = {
    resource.google_project_service = lib.mapAttrs (svc: _: {
      service = "${svc}.googleapis.com";

      disable_on_destroy = false;
    }) (lib.filterAttrs (_: svc: svc.enable) config.gcp.services);
  };
}