{ config, options, lib, pkgs, self, ... }:
let
  # Atlantis < 0.30.0 requires that there be a "terraform" binary on the path.
  # Remove when we move to Atlantis 0.30.0.
  terraformWrapper = pkgs.writeShellScriptBin "terraform" ''
    if [ "$1" = "version" ]; then
      ${self.packages.${config.nixpkgs.system}.terraform}/bin/tofu "$@" | sed 's/OpenTofu/Terraform/'
      exit 0
    fi
    exec ${self.packages.${config.nixpkgs.system}.terraform}/bin/tofu "$@"
  '';
in {
  options.hunt.deploy = {
    serviceAccountName = lib.mkOption {
      type = lib.types.str;
    };
    awsRoleName = lib.mkOption {
      type = lib.types.str;
      default = "GCPProdDeploy";
    };
  };
  config = lib.mkMerge [
    {
      nix.package = pkgs.nixVersions.latest;
      nix.settings = {
        substituters = [
          "s3://rb8tcjeo-nix-cache?endpoint=https://storage.googleapis.com"
          "https://cache.nixos.org/"
        ];
        require-sigs = false;
        always-allow-substitutes = true;
      };
      # Keep old derivations around to improve build speed.
      nix.gc.automatic = false;
    }
    {
      sops.secrets.ssh_key = {
        owner = config.users.users.deploy.name;
      };
      home-manager.users.deploy = let
        sshKeyPath = config.sops.secrets.ssh_key.path;
      in { config, ... }: {
        home.stateVersion = "24.11";
        home.file.".docker/config.json".source = (pkgs.formats.json {}).generate "docker-config.json" {
          credHelpers."us-docker.pkg.dev" = "gcloud";
        };
        home.file.".ssh/id_ed25519".source = config.lib.file.mkOutOfStoreSymlink sshKeyPath;
      };
    }
    {
      environment.etc."aws/config".source = let
        hmacAuth = lib.getExe (pkgs.writeShellApplication {
          name = "hmac-credential-process";
          runtimeInputs = with pkgs; [
            google-cloud-sdk
            jq
          ];
          text = ''
            SERVICE_ACCOUNT=$1
            mkdir -p ~/.aws
            umask 0077
            if [ ! -r ~/".aws/credentials-$SERVICE_ACCOUNT" ]; then
              (
                gcloud secrets versions access --format=json --secret "$SERVICE_ACCOUNT"-hmac-id latest \
                && gcloud secrets versions access --format=json --secret "$SERVICE_ACCOUNT"-hmac-secret latest
              ) | jq -s '
                [ .[]
                  | {
                    key: .name | split("/") | .[3] | split("-") | .[-1],
                    value: .payload.data | @base64d
                  }
                ]
                | from_entries
                | {
                  Version: 1,
                  AccessKeyId: .id,
                  SecretAccessKey: .secret
                }' > ~/".aws/credentials-$SERVICE_ACCOUNT"
            fi
            cat ~/".aws/credentials-$SERVICE_ACCOUNT"
          '';
        });
        awsAuth = lib.getExe pkgs.aws-credential-process;
      in (pkgs.formats.ini {}).generate "aws-config" {
        "profile gcs" = {
          endpoint_url = "https://storage.googleapis.com";
          credential_process = "${hmacAuth} ${config.hunt.deploy.serviceAccountName}";
        };
        "profile mitmh2025-puzzup".credential_process = "${awsAuth} 891377012427 ${config.hunt.deploy.awsRoleName}";
        "profile mitmh2025-staging".credential_process = "${awsAuth} 767398012733 ${config.hunt.deploy.awsRoleName}";
      };
      systemd.globalEnvironment = {
        AWS_CONFIG_FILE = "/etc/aws/config";
        AWS_SDK_LOAD_CONFIG = "true";
        AWS_PROFILE = "gcs";
      };
      environment.sessionVariables = {
        AWS_CONFIG_FILE = "/etc/aws/config";
        AWS_SDK_LOAD_CONFIG = "true";
        AWS_PROFILE = "gcs";
      };
    }
    {
      users.users.deploy = {
        isNormalUser = true;
        inherit (config.users.users.root) openssh;
      };
      environment.systemPackages = with pkgs; [
        terraformWrapper
        self.packages.${config.nixpkgs.system}.terraform
        git
        google-cloud-sdk
        awscli2
        kubectl
      ];
    }
    {
      # Convenience utilities
      environment.systemPackages = with pkgs; [
        sops
        vim
        ((emacsPackagesFor emacs-nox).emacsWithPackages (
          epkgs: with epkgs; [
            nix-mode
            typescript-mode
            yaml-mode
          ]
        ))
      ];
    }
    {
      # Attemp to prevent large builds from OOMing the whole machine
      systemd = {
        # Create a separate slice for nix-daemon that is
        # memory-managed by the userspace systemd-oomd killer
        slices."nix-daemon".sliceConfig = {
          ManagedOOMMemoryPressure = "kill";
          ManagedOOMMemoryPressureLimit = "50%";
        };
        services."nix-daemon".serviceConfig.Slice = "nix-daemon.slice";

        # If a kernel-level OOM event does occur anyway,
        # strongly prefer killing nix-daemon child processes
        services."nix-daemon".serviceConfig = {
          # Start throttling memory usage at 50%
          MemoryHigh = "50%";
          # OOM-kill a child at 90% usage
          MemoryMax = "90%";
          # If the system overall will OOM, strongly prefer to kill a build
          OOMScoreAdjust = 1000;
        };
      };
    }
  ];
}