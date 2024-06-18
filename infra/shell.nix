{ mkShell
, awscli2
, google-cloud-sdk
, terraform
, nixVersions
, terranix
, system
}:
mkShell {
  buildInputs = [
    google-cloud-sdk
    awscli2
    terraform
    (terranix.defaultPackage.${system}.override {
      nix = nixVersions.latest;
    })
  ];
}