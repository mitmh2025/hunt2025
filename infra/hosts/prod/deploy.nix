{ config, lib, pkgs, self, ... }:
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
      sops.defaultSopsFile = ../../secrets/staging.yaml;
      virtualisation.vmVariant = {
        systemd.services.google-guest-agent.enable = false;
        systemd.services.google-startup-scripts.enable = false;
        systemd.services.google-shutdown-scripts.enable = false;
      };
    }
    {
      users.users.deploy = {
        isNormalUser = true;
        openssh = config.users.users.root.openssh;
      };
      environment.systemPackages = [
        terraformWrapper
        self.packages.${config.nixpkgs.system}.terraform
      ];
      systemd.services.atlantis.path = [
        terraformWrapper
      ];
      services.atlantis = {
        enable = true;
        user = "deploy";
        config = {
          # https://www.runatlantis.io/docs/access-credentials.html#github-app
          gh-org = "mitmh2025";
          repo-allowlist = "github.com/mitmh2025/*";
          atlantis-url = "https://atlantis.mitmh2025.com";
          gh-team-allowlist = "Tech:plan, Tech:apply, Tech:import";

          emoji-reaction = "thumbsup";
          enable-diff-markdown-format = true;
          hide-prev-plan-comments = true;

          # Set these to create a new app.
          gh-user = "fake";
          gh-token = "fake";

          # Then set these with your new app's info.
          # gh-app-id = "<your id>";
          # gh-app-slug = "<your app slug>";
          # gh-app-key-file = "atlantis-app-key.pem";
          # gh-webhook-secret = "<your secret>";
          # write-git-creds = true;

          # Always apply the post-merge config
          checkout-strategy = "merge";
          include-git-untracked-files = true;

          tf-distribution = "opentofu";
          tf-download = false;
        };
        repos = [{
          id = "github.com/mitmh2025/hunt2025";
          plan_requirements = ["mergeable"];
          apply_requirements = ["mergeable"];
          import_requirements = ["mergeable"];
          workflow = "hunt2025";
        }];
        workflows.hunt2025 = {
          # https://www.runatlantis.io/blog/2024/integrating-atlantis-with-opentofu
          plan.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix build -o config.tf.json ".#terraformConfigurations.$PROJECT_NAME"''; }
            { run = ''nix run .#terraform -- init''; }
            { run.command = ''nix run .#terraform -- plan -input=false -out=$PLANFILE''; run.output = "strip_refreshing"; }
          ];
          apply.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix run .#terraform -- apply $PLANFILE''; }
          ];
          import.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix build -o config.tf.json ".#terraformConfigurations.$PROJECT_NAME"''; }
            { run = ''nix run .#terraform -- init''; }
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
            # TODO: Enable Authentik
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
