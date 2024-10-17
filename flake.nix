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
    sops-nix.inputs.nixpkgs-stable.follows = "nixpkgs";
    radio-media.url = "git+ssh://git@github.com/mitmh2025/radio-media";
    radio-media.flake = false;
  };

  outputs = { self, nixpkgs, flake-utils, terranix, authentik, sops-nix, radio-media, ... }:
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
        terraform = pkgs.opentofu.withPlugins (p: with p; [
          aws
          google
          local
          tls
          github
          (mkProvider rec {
            owner = "krostar";
            repo = "terraform-provider-nix";
            rev = "v${version}";
            version = "0.0.8";
            hash = "sha256-E742kf5pO6LK5aTVq5gukF0KqIB87tnweDf+GxvSUF8=";
            vendorHash = "sha256-nVXzFE4iBHiqVusryteoqoJ5h2EheQpIISLjAXAsaNw=";
            provider-source-address = "registry.terraform.io/krostar/nix";
          })
          ((mkProvider rec {
            owner = "bsquare-corp";
            repo = "terraform-provider-skopeo2";
            rev = "v${version}";
            version = "1.1.1";
            hash = "sha256-vpX3C+pXGG3w+OeK+LUpeiG8rD4HWU7b3KSOa6WUeQg=";
            vendorHash = "sha256-uvj7Ann2dh4ZgiThesY8A3Vshsjxn0cJVCqg+bXTYag=";
            provider-source-address = "registry.terraform.io/bsquare-corp/skopeo2";
          }).overrideAttrs {
            tags = [ "containers_image_openpgp" ];
          })
        ]);
        terraformBin = "${terraform}/bin/tofu";
        terraformConfiguration = terranix.lib.terranixConfiguration {
          inherit system;
          pkgs = pkgs // {
            lib = pkgs.lib.extend (import ./infra/terraform/helpers.nix pkgs);
          };
          modules = (builtins.attrValues self.terranixModules) ++ [ ./infra/terraform ];
          extraArgs = {
            inherit self;
          };
        };
      in {
        legacyPackages = pkgs;
        packages = {
          inherit terraformConfiguration;
        };
        # nix develop
        devShells.infra = pkgs.callPackage ./infra/shell.nix {
          inherit terraform terranix;
        };
        devShells.hunt2025 = pkgs.callPackage ./site/shell.nix {};
        devShells.radioman = pkgs.callPackage ./radioman/shell.nix {};
        # nix run ".#apply"
        apps.apply = {
          type = "app";
          program = toString (pkgs.writers.writeBash "apply" ''
            if [[ -e config.tf.json ]]; then rm -f config.tf.json; fi
            cp ${terraformConfiguration} config.tf.json \
              && ${terraformBin} init \
              && ${terraformBin} apply "$@"
          '');
        };
        # nix run ".#destroy"
        apps.destroy = {
          type = "app";
          program = toString (pkgs.writers.writeBash "destroy" ''
            if [[ -e config.tf.json ]]; then rm -f config.tf.json; fi
            cp ${terraformConfiguration} config.tf.json \
              && ${terraformBin} init \
              && ${terraformBin} destroy
          '');
        };
        # nix run
        # TODO: use ${system} to allow running from macOS
        apps.default = {
          type = "app";
          program = "${self.nixosConfigurations.dev-vm.config.system.build.vm}/bin/run-nixos-vm";
        };
        apps.dev-vm-base = {
          type = "app";
          program = "${self.nixosConfigurations.dev-vm-base.config.system.build.vm}/bin/run-nixos-vm";
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
        ];
        nixosConfigurations = nixpkgs.lib.genAttrs [
          "gce-image"
          "dev-vm-base"
          "dev-vm"
          "staging"
        ] (name: nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          specialArgs = {
            inherit authentik radio-media;
          };
          modules = self.baseNixosModules ++ [
            ./infra/hosts/${name}.nix
          ];
        });
        overlays.default = import ./infra/pkgs/all-packages.nix { inherit self; };
      };
}
