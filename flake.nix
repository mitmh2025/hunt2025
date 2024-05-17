{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
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
          local
        ]);
        terraformBin = "${terraform}/bin/tofu";
        terraformConfiguration = terranix.lib.terranixConfiguration {
          inherit system;
          modules = [ ./infra/config.nix ];
        };
      in {
        legacyPackages = pkgs;
        defaultPackage = terraformConfiguration;
        # nix develop
        devShell = pkgs.mkShell {
          buildInputs = [
            terraform
            terranix.defaultPackage.${system}
          ];
        };
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
        defaultApp = self.apps.${system}.apply;
      }) // {
        nixosConfigurations.server = nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          modules = [
            {
              nixpkgs.overlays = [
                self.overlays.default
              ];
            }
            ./infra/server.nix
          ];
        };
        overlays.default = import ./infra/pkgs/all-packages.nix;
      };
}
