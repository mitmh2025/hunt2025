{ config, options, lib, pkgs, radio-media, ... }:
{
  imports = [
    ../../services/gce-vm.nix
    ../base.nix
    ../../services/postgres.nix
    ../../services/redis.nix
    ../../services/deploy.nix
    ../../services/authentik
  ];
  config = lib.mkMerge [
    {
      sops.defaultSopsFile = ../../secrets/prod/prod.yaml;
      sops.secrets.ssh_key.sopsFile = ../../secrets/prod/deploy.yaml;
      hunt.deploy = {
        serviceAccountName = "prod-vm";
        awsRoleName = "GCPProdProd";
      };
    }
    {
      swapDevices = [{
        device = "/var/lib/swapfile";
        size = 16*1024; # 16 GiB
      }];
    }
    {
      hunt2025.site = {
        enable = true;
        db_env = "staging";
        port = "%t/hunt2025/hunt2025.sock";
        regsitePort = "%t/hunt2025/hunt2025-reg.sock";
        apiBaseUrl = "http://localhost/api";
        jwksUri = "https://auth.mitmh2025.com/application/o/ops/jwks/";
      };

      services.postgresql.package = pkgs.postgresql_16;

      users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025" ];
      systemd.services.hunt2025 = {
        serviceConfig.RuntimeDirectory = "hunt2025";
      };
      services.redis.servers.hunt2025 = {};
    }
    {
      hunt2025.ops = {
        enable = true;
        port = "%t/hunt2025-ops/ops.sock";
        apiBaseUrl = "http://localhost/api";
        oauthServer = "https://auth.mitmh2025.com/application/o/ops/.well-known/openid-configuration";
      };
      sops.secrets."authentik/apps/ops/client_id".sopsFile = ../../secrets/prod/site.yaml;
      sops.secrets."authentik/apps/ops/client_secret".sopsFile = ../../secrets/prod/site.yaml;
      sops.templates."ops/env" = {
        owner = "hunt2025-ops";
        content = ''
          OAUTH_CLIENT_ID=${config.sops.placeholder."authentik/apps/ops/client_id"}
          OAUTH_CLIENT_SECRET=${config.sops.placeholder."authentik/apps/ops/client_secret"}
        '';
      };
      users.users."${config.services.nginx.user}".extraGroups = [ "hunt2025-ops" ];
      systemd.services.hunt2025-ops = {
        serviceConfig = {
          EnvironmentFile = config.sops.templates."ops/env".path;
          RuntimeDirectory = "hunt2025-ops";
        };
      };
    }
    {
      sops.secrets."postmark/token".sopsFile = ../../secrets/prod/site.yaml;
      sops.secrets."postmark/stream".sopsFile = ../../secrets/prod/site.yaml;
      sops.secrets."site/JWT_SECRET".sopsFile = ../../secrets/prod/site.yaml;
      sops.secrets."site/FRONTEND_API_SECRET".sopsFile = ../../secrets/prod/site.yaml;
      sops.secrets."site/DATA_API_SECRET".sopsFile = ../../secrets/prod/site.yaml;
      sops.templates."site/environment" = {
        owner = "hunt2025";
        content = ''
          EMAIL_POSTMARK_TOKEN=${config.sops.placeholder."postmark/token"}
          EMAIL_POSTMARK_STREAM=${config.sops.placeholder."postmark/stream"}
          JWT_SECRET="${config.sops.placeholder."site/JWT_SECRET"}"
          FRONTEND_API_SECRET="${config.sops.placeholder."site/FRONTEND_API_SECRET"}"
          DATA_API_SECRET="${config.sops.placeholder."site/DATA_API_SECRET"}"
        '';
      };
      systemd.services.hunt2025.serviceConfig.EnvironmentFile = [config.sops.templates."site/environment".path];
      systemd.services.hunt2025.environment = {
        EMAIL_FROM = "MIT Mystery Hunt 2025 <info@mitmh2025.com>";
        EMAIL_TRANSPORT = "postmark";
      };
    }
    {
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

        upstreams.hunt2025.servers."unix:/run/hunt2025/hunt2025.sock" = {};
        upstreams.hunt2025-reg.servers."unix:/run/hunt2025/hunt2025-reg.sock" = {};
        upstreams.hunt2025-ops.servers."unix:/run/hunt2025-ops/ops.sock" = {};
        virtualHosts = {
          "www.two-pi-noir.agency" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025";
              proxyWebsockets = true;
            };
            locations."= /radio-manifest.json" = {
              alias = "${pkgs.hunt2025}/lib/hunt2025/dist/radio-manifest.json";
            };
            locations."/static/" = {
              alias = "${pkgs.hunt2025.assets}/static/";
              extraConfig = "expires max;";
            };
          };
          "www.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025-reg";
              proxyWebsockets = true;
            };
            locations."/static/".alias = "${pkgs.hunt2025.assets}/static/";
          };
          "ops.mitmh2025.com" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://hunt2025-ops";
              proxyWebsockets = true;
            };
            locations."/api".proxyPass = "http://hunt2025";
          };
          "two-pi-noir.agency" = {
            addSSL = true;
            enableACME = true;
            globalRedirect = "www.two-pi-noir.agency";
          };
          "mitmh2025.com" = {
            addSSL = true;
            enableACME = true;
            globalRedirect = "www.mitmh2025.com";
          };
          "www.two-pi-noir.com" = {
            addSSL = true;
            enableACME = true;
            globalRedirect = "www.two-pi-noir.agency";
          };
          "two-pi-noir.com" = {
            addSSL = true;
            enableACME = true;
            globalRedirect = "www.two-pi-noir.agency";
          };
          "localhost" = {
            # Expose plain HTTP on localhost for use by the frontend
            locations."/api".proxyPass = "http://hunt2025";
          };
        };
      };
    }
    {
      systemd.services.atlantis.path = [
        # Give Atlantis a normal user path.
        "/run/current-system/sw"
      ];
      systemd.services.atlantis.restartTriggers = [
        options.services.atlantis.configPath.default
      ];
      sops.secrets."atlantis/gh-app-id".sopsFile = ../../secrets/prod/deploy.yaml;
      sops.secrets."atlantis/gh-app-slug".sopsFile = ../../secrets/prod/deploy.yaml;
      sops.secrets."atlantis/gh-app-key-file" = {
        sopsFile = ../../secrets/prod/deploy.yaml;
        owner = config.users.users.deploy.name;
      };
      sops.secrets."atlantis/gh-webhook-secret".sopsFile = ../../secrets/prod/deploy.yaml;
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
          gh-team-allowlist = "Tech:plan, Tech:apply, Tech:import, Tech:unlock";

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

          # Don't run a plan unless it's specifically requested
          disable-autoplan = true;

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
            {
              run.command = ''nix build -o config.tf.json ".#terraformConfigurations.$PROJECT_NAME"'';
              run.output = "hide";
            }
            { run = ''nix run .#terraform -- init -upgrade''; }
            {
              run.command = ''nix run .#terraform -- plan -input=false -out=$PLANFILE'';
              run.output = "strip_refreshing";
            }
          ];
          apply.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            { run = ''nix run .#terraform -- apply $PLANFILE''; }
          ];
          import.steps = [
            { env.name = "TF_IN_AUTOMATION"; env.value = "true"; }
            {
              run.command = ''nix build -o config.tf.json ".#terraformConfigurations.$PROJECT_NAME"'';
              run.output = "hide";
            }
            { run = ''nix run .#terraform -- init -upgrade''; }
            { run = ''nix run .#terraform -- import -input=false $(printf '%s' $COMMENT_ARGS | sed 's/,/ /' | tr -d '\\')''; }
          ];
        };
      };
      services.nginx = {
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
