{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-23.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: let
    overlay = (final: prev: {
      hunt2025 = final.callPackage ./frontend {};
    });
  in
    (flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ overlay ];
        };
      in {
        packages = rec {
          inherit (pkgs) hunt2025;
          default = hunt2025;
        };
      })) // {
        overlays.default = overlay;
      };
}
