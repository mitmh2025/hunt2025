{ mkShell
, awscli2
, google-cloud-sdk
, terraform
, gh
, nixVersions
, terranix
, system
}:
mkShell {
  buildInputs = [
    google-cloud-sdk
    awscli2
    terraform
    gh
    (terranix.defaultPackage.${system}.override {
      nix = nixVersions.latest;
    })
  ];
}