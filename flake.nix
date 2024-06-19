{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    terranix = {
      url = "github:terranix/terranix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, terranix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ self.overlays.default ];
        };
        terraform = pkgs.opentofu.withPlugins (p: with p; [
          aws
          google
          local
          (mkProvider rec {
            owner = "krostar";
            repo = "terraform-provider-nix";
            rev = "v${version}";
            version = "0.0.8";
            hash = "sha256-E742kf5pO6LK5aTVq5gukF0KqIB87tnweDf+GxvSUF8=";
            vendorHash = "sha256-nVXzFE4iBHiqVusryteoqoJ5h2EheQpIISLjAXAsaNw=";
            provider-source-address = "registry.terraform.io/krostar/nix";
          })
        ]);
        terraformBin = "${terraform}/bin/tofu";
        terraformConfiguration = terranix.lib.terranixConfiguration {
          inherit system;
          modules = [ ./infra/terraform ];
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
              && ${terraformBin} apply
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
      }) // {
        inherit self;
        nixosConfigurations = nixpkgs.lib.genAttrs [
          "gce-image"
          "dev-vm-base"
          "dev-vm"
          "staging"
        ] (name: nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          modules = [
            {
              nixpkgs.overlays = [
                self.overlays.default
              ];
            }
            ./infra/hosts/${name}.nix
          ];
        });
        overlays.default = import ./infra/pkgs/all-packages.nix;
      };
}
