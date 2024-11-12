{ config, lib, ... }:
let
  cfg = config.sops.keys;
in {
  options = with lib; {
    sops.keys = mkOption {
      type = types.tfAttrsOf (types.submodule ({ name, config, ... }: {
        options = {
          users = mkOption {
            type = types.listOf types.str;
            default = [];
          };
          data = mkOption {
            type = types.anything;
          };
          resource = mkOption {
            type = types.anything;
          };
        };
        config = {
          # $ gcloud kms keys create sops-staging-key --location global --keyring sops --purpose encryption
          resource.google_kms_crypto_key."sops-${name}-key" = {
            name = "sops-${name}-key";
            key_ring = lib.tfRef "google_kms_key_ring.sops.id";
            purpose = "ENCRYPT_DECRYPT";
          };
          data.google_iam_policy."sops-${name}-key" = {
            binding.role = "roles/cloudkms.cryptoKeyDecrypter";
            binding.members = config.users;
          };
          resource.google_kms_crypto_key_iam_policy."sops-${name}-key" = {
            crypto_key_id = lib.tfRef "google_kms_crypto_key.sops-${name}-key.id";
            policy_data = lib.tfRef "data.google_iam_policy.sops-${name}-key.policy_data";
          };
        };
      }));
      default = {};
    };
  };
  config = lib.mkIf (cfg != {}) (lib.mkMerge [
    {
      gcp.services.cloudkms.enable = true;
    
      # $ gcloud kms keyrings create sops --location global
      resource.google_kms_key_ring.sops = {
        name = "sops";
        location = "global";
      };
    }
    {
      resource = lib.mkMerge (lib.mapAttrsToList (_: repo: repo.resource) cfg);
      data = lib.mkMerge (lib.mapAttrsToList (_: repo: repo.data) cfg);
    }
  ]);
}