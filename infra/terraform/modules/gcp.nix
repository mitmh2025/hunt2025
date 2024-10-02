{ config, lib, ... }:
{
  options = with lib; {
    gcp.serviceAccount = mkOption {
      default = {};
      type = types.tfAttrsOf (types.submodule ({ name, ... }: {
        options = {
          name = mkOption {
            type = types.str;
            default = name;
            description = "Account ID";
          };
          displayName = mkOption {
            type = types.nullOr types.str;
            default = null;
            description = "Display name";
          };
          iamRoles = mkOption {
            type = types.listOf types.str;
            default = [];
            description = "Project-level IAM roles to grant to this service account";
          };
        };
      }));
    };
  };
  config = {
    resource.google_service_account = lib.mapAttrs (_: account: {
      account_id = account.name;
      display_name = account.displayName;
    }) config.gcp.serviceAccount;
    resource.google_project_iam_member = lib.filterAttrs (_: v: v.for_each != {}) (lib.mapAttrs (accountName: account: {
      for_each = lib.genAttrs account.iamRoles (role: "roles/${role}");
      role = lib.tfRef "each.value";
      member = lib.tfRef "google_service_account.${accountName}.member";
    }) config.gcp.serviceAccount);
  };
}
