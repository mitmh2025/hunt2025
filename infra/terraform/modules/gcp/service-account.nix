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
          hmacKey.enable = mkEnableOption "Create an HMAC key for accessing Google Cloud Storage, and store it in Google Secret Manager";
        };
      }));
    };
  };
  config = lib.mkMerge [
    {
      gcp.services.cloudresourcemanager.enable = true;
      data.google_project.this = {};
      resource.google_service_account = lib.mapAttrs (_: account: {
        account_id = account.name;
        display_name = account.displayName;
      }) config.gcp.serviceAccount;
      resource.google_project_iam_member = lib.filterAttrs (_: v: v.for_each != {}) (lib.mapAttrs (accountName: account: {
        for_each = lib.genAttrs account.iamRoles (role: "roles/${role}");
        project = lib.tfRef "data.google_project.this.project_id";
        role = lib.tfRef "each.value";
        member = lib.tfRef "google_service_account.${accountName}.member";
      }) config.gcp.serviceAccount);
      output.google_service_account.value = let
        account = name: ''"${name}": { "member": google_service_account.${name}.member, "email": google_service_account.${name}.email }'';
      in lib.tfRef ''{${lib.concatMapStringsSep ", " account (builtins.attrNames config.resource.google_service_account)}}'';
    }
    (let
      hmac = (lib.mapAttrsToList (name: _: {
        resource.google_storage_hmac_key.${name} = {
          service_account_email = lib.tfRef "google_service_account.${name}.email";
        };

        resource.google_secret_manager_secret."${name}-hmac-id" = {
          secret_id = "${name}-hmac-id";
          replication.auto = {};
        };

        resource.google_secret_manager_secret."${name}-hmac-secret" = {
          secret_id = "${name}-hmac-secret";
          replication.auto = {};
        };

        resource.google_secret_manager_secret_version."${name}-hmac-id" = {
          secret = lib.tfRef "google_secret_manager_secret.${name}-hmac-id.id";
          secret_data = lib.tfRef "google_storage_hmac_key.${name}.access_id";
        };

        resource.google_secret_manager_secret_version."${name}-hmac-secret" = {
          secret = lib.tfRef "google_secret_manager_secret.${name}-hmac-secret.id";
          secret_data = lib.tfRef "google_storage_hmac_key.${name}.secret";
        };

        data.google_iam_policy."${name}-hmac-secret".binding = [
          {
            role = "roles/secretmanager.secretAccessor";
            members = [
              (lib.tfRef "google_service_account.${name}.member")
            ];
          }
        ];

        resource.google_secret_manager_secret_iam_policy."${name}-hmac-id" = {
          secret_id = lib.tfRef "google_secret_manager_secret.${name}-hmac-id.secret_id";
          policy_data = lib.tfRef "data.google_iam_policy.${name}-hmac-secret.policy_data";
        };

        resource.google_secret_manager_secret_iam_policy."${name}-hmac-secret" = {
          secret_id = lib.tfRef "google_secret_manager_secret.${name}-hmac-secret.secret_id";
          policy_data = lib.tfRef "data.google_iam_policy.${name}-hmac-secret.policy_data";
        };
      }) (lib.filterAttrs (_: v: v.hmacKey.enable) config.gcp.serviceAccount));
    in {
      gcp.services.secretmanager.enable = lib.mkIf (hmac != []) true;
      # Can't just use a top-level list here because that would create infinite recursion.
      resource = lib.mkMerge (map (v: v.resource) hmac);
      data = lib.mkMerge (map (v: v.data) hmac);
    })
  ];
}
