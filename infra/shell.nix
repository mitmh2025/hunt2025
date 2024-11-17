{ mkShell
, awscli2
, google-cloud-sdk
, terraform
, gh
, nixVersions
, terranix
, kubectl
, system
}:
mkShell {
  buildInputs = [
    (google-cloud-sdk.withExtraComponents (with google-cloud-sdk.components; [
      gke-gcloud-auth-plugin
    ]))
    awscli2
    terraform
    gh
    (terranix.defaultPackage.${system}.override {
      nix = nixVersions.latest;
    })
    kubectl
  ];
}