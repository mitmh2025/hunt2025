{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
    terranix = {
      url = "github:terranix/terranix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    authentik.url = "github:nix-community/authentik-nix";
    authentik.inputs.nixpkgs.follows = "nixpkgs";
    authentik.inputs.flake-utils.follows = "flake-utils";
    authentik.inputs.flake-compat.follows = "flake-compat";
    sops-nix.url = "github:Mic92/sops-nix";
    sops-nix.inputs.nixpkgs.follows = "nixpkgs";
    home-manager.url = "github:nix-community/home-manager";
    home-manager.inputs.nixpkgs.follows = "nixpkgs";
    radio-media.url = "git+ssh://git@github.com/mitmh2025/radio-media";
    radio-media.flake = false;
  };

  outputs = { self, nixpkgs, flake-utils, terranix, authentik, sops-nix, home-manager, radio-media, ... }:
    let
      findModules = dir:
        builtins.concatLists (builtins.attrValues (builtins.mapAttrs
          (name: type:
            if type == "regular" then [{
              name = builtins.elemAt (builtins.match "(.*)\\.nix" name) 0;
              value = dir + "/${name}";
            }] else if (
              builtins.readDir (dir + "/${name}"))
            ? "default.nix" then [{
              inherit name;
              value = dir + "/${name}";
            }] else
              findModules (dir + "/${name}")) (builtins.readDir dir)));
    in flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ self.overlays.default ];
        };
        inherit (pkgs) lib;
        terraform = pkgs.opentofu.withPlugins (p: with p; [
          aws
          (google.override {
            rev = "v6.11.1";
            hash = "sha256-Gz6jMZFn7HfRVtNrFuRJlBfokMBpW3rjOYyYXSeT7dY=";
            vendorHash = "sha256-hwWHtrPmzJJT7OUcjiqt7a6Nf1GLvoEcepqIAHv5bsI=";
          })
          local
          random
          tls
          github
          kubernetes
          postgresql
          (mkProvider {
            owner = "krostar";
            repo = "terraform-provider-nix";
            rev = "v0.0.8";
            hash = "sha256-E742kf5pO6LK5aTVq5gukF0KqIB87tnweDf+GxvSUF8=";
            vendorHash = "sha256-nVXzFE4iBHiqVusryteoqoJ5h2EheQpIISLjAXAsaNw=";
            provider-source-address = "registry.terraform.io/krostar/nix";
          })
          ((mkProvider {
            owner = "bsquare-corp";
            repo = "terraform-provider-skopeo2";
            rev = "v1.1.1";
            hash = "sha256-vpX3C+pXGG3w+OeK+LUpeiG8rD4HWU7b3KSOa6WUeQg=";
            vendorHash = "sha256-uvj7Ann2dh4ZgiThesY8A3Vshsjxn0cJVCqg+bXTYag=";
            provider-source-address = "registry.terraform.io/bsquare-corp/skopeo2";
          }).overrideAttrs {
            tags = [ "containers_image_openpgp" ];
          })
        ]);
        terraformBin = "${terraform}/bin/tofu";
        mkTFConfig = modules: terranix.lib.terranixConfiguration {
          inherit system;
          pkgs = pkgs // {
            lib = (pkgs.lib.extend (import ./infra/terraform/helpers.nix pkgs)).extend (_: _: {
              inherit mkTFModule;
            });
          };
          modules = (builtins.attrValues self.terranixModules) ++ modules;
          extraArgs = {
            inherit self;
          };
        };
        mkTFModule = modules: let
          module = pkgs.linkFarm "module" [{
            name = "config.tf.json";
            path = mkTFConfig modules;
          }];
        in "${module}";
      in {
        legacyPackages = pkgs;
        packages = {
          terraformConfigurations = lib.genAttrs [
            "prod"
            "staging"
            "dev"
          ] (name: mkTFConfig [ ./infra/terraform/${name} ]);
          inherit terraform;
        };
        # nix develop
        devShells.infra = pkgs.callPackage ./infra/shell.nix {
          inherit terraform terranix;
        };
        devShells.hunt2025 = pkgs.callPackage ./site/shell.nix {};
        devShells.radioman = pkgs.callPackage ./radioman/shell.nix {};
        apps = (lib.mapAttrs (_: terraformConfiguration: {
          # nix run ".#staging.apply"
          apply = {
            type = "app";
            program = toString (pkgs.writers.writeBash "apply" ''
              if [[ -e config.tf.json ]]; then rm -f config.tf.json; fi
              cp ${terraformConfiguration} config.tf.json \
                && ${terraformBin} init -upgrade \
                && ${terraformBin} apply "$@"
            '');
          };
          # nix run ".#staging.destroy"
          destroy = {
            type = "app";
            program = toString (pkgs.writers.writeBash "destroy" ''
              if [[ -e config.tf.json ]]; then rm -f config.tf.json; fi
              cp ${terraformConfiguration} config.tf.json \
                && ${terraformBin} init -upgrade \
                && ${terraformBin} destroy
            '');
          };
        }) self.packages.${system}.terraformConfigurations) // {
          # nix run
          # TODO: use ${system} to allow running from macOS
          default = {
            type = "app";
            program = "${self.nixosConfigurations."local/dev-vm".config.system.build.vm}/bin/run-dev-vm-vm";
          };
          dev-vm-base = {
            type = "app";
            program = "${self.nixosConfigurations."local/dev-vm-base".config.system.build.vm}/bin/run-dev-vm-base-vm";
          };
        };
        dockerImages.nix-cache = import ./infra/lib/docker-image.nix {
          name = "nix-cache";
          inherit pkgs;
          modules = self.baseNixosModules ++ [
            ./infra/containers/nix-cache.nix
          ];
        };
      }) // {
        inherit self;
        terranixModules = builtins.listToAttrs (findModules ./infra/terraform/modules);
        nixosModules = builtins.listToAttrs (findModules ./infra/modules);
        baseNixosModules = (builtins.attrValues self.nixosModules) ++ [
          {
            nixpkgs.overlays = [
              self.overlays.default
            ];
          }
          sops-nix.nixosModules.sops
          home-manager.nixosModules.home-manager
        ];
        nixosConfigurations = nixpkgs.lib.genAttrs [
          "gce-image"
          "local/dev-vm-base"
          "local/dev-vm"
          "staging/staging"
          "staging/dev"
          "prod/deploy"
        ] (name: nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          specialArgs = {
            inherit self authentik radio-media;
          };
          modules = [
            ./infra/hosts/${name}.nix
            {
              system.name = builtins.baseNameOf name;
            }
          ] ++ self.baseNixosModules;
        });
        overlays.default = import ./infra/pkgs/all-packages.nix { inherit self; };
        ciBuildTargets = {
          inherit (self.packages.x86_64-linux) terraformConfigurations;
          staging = self.nixosConfigurations."staging/staging".config.system.build.toplevel;
        };
      };
}
