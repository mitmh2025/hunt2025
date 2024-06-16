{ mkShell
, google-cloud-sdk
, terraform
, nixVersions
, terranix
, system
}:
mkShell {
  buildInputs = [
    google-cloud-sdk
    terraform
    (terranix.defaultPackage.${system}.override {
      nix = nixVersions.latest;
    })
  ];
}