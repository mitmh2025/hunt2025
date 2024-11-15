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
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/prod/deploy.yaml;
      virtualisation.vmVariant = {
        systemd.services.google-guest-agent.enable = false;
        systemd.services.google-startup-scripts.enable = false;
        systemd.services.google-shutdown-scripts.enable = false;
      };
    }
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
        awsAuth = lib.getExe (pkgs.writeShellApplication {
          name = "aws-credential-process";
          runtimeInputs = with pkgs; [
            curl
            jq
            awscli2
          ];
          text = ''
            AUDIENCE="aws"
            ACCOUNT_ID=$1
            ROLE_ARN="arn:aws:iam::''${ACCOUNT_ID}:role/GCPProdDeploy"

            jwt_token=$(curl -sH "Metadata-Flavor: Google" "http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=''${AUDIENCE}&format=full&licenses=FALSE")

            jwt_sub=$(jq -R -r 'split(".") | .[1] | @base64d | fromjson | .sub' <<< "$jwt_token")

            (unset AWS_PROFILE; aws sts assume-role-with-web-identity --role-arn "$ROLE_ARN" --role-session-name "$jwt_sub" --web-identity-token "$jwt_token" | jq '.Credentials | .Version=1')
          '';
        });
      in (pkgs.formats.ini {}).generate "aws-config" {
        "profile gcs" = {
          endpoint_url = "https://storage.googleapis.com";
          credential_process = "${hmacAuth} deploy-vm";
        };
        "profile mitmh2025-puzzup".credential_process = "${awsAuth} 891377012427";
        "profile mitmh2025-staging".credential_process = "${awsAuth} 767398012733";
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
        openssh = config.users.users.root.openssh;
      };
      environment.systemPackages = with pkgs; [
        terraformWrapper
        self.packages.${config.nixpkgs.system}.terraform
        git
        google-cloud-sdk
        awscli2
      ];
      systemd.services.atlantis.path = [
        # Give Atlantis a normal user path.
        "/run/current-system/sw"
      ];
      systemd.services.atlantis.restartTriggers = [
        options.services.atlantis.configPath.default
      ];
      sops.secrets."atlantis/gh-app-id" = {};
      sops.secrets."atlantis/gh-app-slug" = {};
      sops.secrets."atlantis/gh-app-key-file" = {
        owner = config.users.users.deploy.name;
      };
      sops.secrets."atlantis/gh-webhook-secret" = {};
      sops.templates."atlantis.yaml" = {
        file = options.services.atlantis.configPath.default;
        owner = config.users.users.deploy.name;
      };
      services.atlantis = {
        enable = true;
        user = "deploy";
        configPath = config.sops.templates."atlantis.yaml".path;
        config = {
          # https://www.runatlantis.io/docs/access-credentials.html#github-app
          gh-org = "mitmh2025";
          repo-allowlist = "github.com/mitmh2025/*";
          atlantis-url = "https://atlantis.mitmh2025.com";
          gh-team-allowlist = "Tech:plan, Tech:apply, Tech:import";

          emoji-reaction = "+1";
          enable-diff-markdown-format = true;
          hide-prev-plan-comments = true;

          # Set these to create a new app.
          #gh-user = "fake";
          #gh-token = "fake";

          # Then set these with your new app's info.
          gh-app-id = config.sops.placeholder."atlantis/gh-app-id";
          gh-app-slug = config.sops.placeholder."atlantis/gh-app-slug";
          gh-app-key-file = config.sops.secrets."atlantis/gh-app-key-file".path;
          gh-webhook-secret = config.sops.placeholder."atlantis/gh-webhook-secret";
          write-git-creds = true;

          # Always apply the post-merge config
          checkout-strategy = "merge";
          #include-git-untracked-files = true;

          auto-merge = true;
          auto-merge-method = "merge";

          tf-distribution = "opentofu";
          tf-download = false;
        };
        repos = [{
          id = "github.com/mitmh2025/hunt2025";
          plan_requirements = [];
          apply_requirements = [];
          import_requirements = [];
          workflow = "hunt2025";
        }];
        workflows.hunt2025 = {
          # https://www.runatlantis.io/blog/2024/integrating-atlantis-with-opentofu
          plan.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix build -o config.tf.json ".#terraformConfigurations.$PROJECT_NAME"''; }
            { run = ''nix run .#terraform -- init -upgrade''; }
            { run.command = ''nix run .#terraform -- plan -input=false -out=$PLANFILE''; run.output = "strip_refreshing"; }
          ];
          apply.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix run .#terraform -- apply $PLANFILE''; }
          ];
          import.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix build -o config.tf.json ".#terraformConfigurations.$PROJECT_NAME"''; }
            { run = ''nix run .#terraform -- init -upgrade''; }
            { run = ''nix run .#terraform -- import -input=false $(printf '%s' $COMMENT_ARGS | sed 's/,/ /' | tr -d '\\')''; }            
          ];
        };
      };
      services.nginx = {
        enable = true;

        additionalModules = with pkgs.nginxModules; [
          vts
        ];
        appendHttpConfig = ''
          vhost_traffic_status_zone;
        '';
        recommendedTlsSettings = true;
        recommendedOptimisation = true;
        recommendedGzipSettings = true;
        recommendedProxySettings = true;

        upstreams.atlantis.servers."127.0.0.1:4141" = {};
        virtualHosts = {
          "atlantis.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://atlantis";
              proxyWebsockets = true;
            };
            authentik.enable = true;
            authentik.url = "https://auth.mitmh2025.com:9443";

            locations."/events" = {
              # Make sure that webhooks can be delivered without Authentik
              proxyPass = "http://atlantis";
            };
          };
        };
      };
    }
  ];
}
