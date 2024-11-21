{ mkShell
, awscli2
, google-cloud-sdk
, terraform
, gh
, google-cloud-sql-proxy
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
    google-cloud-sql-proxy
    awscli2
    terraform
    gh
    (terranix.packages.${system}.default.override {
      nix = nixVersions.latest;
    })
    kubectl
  ];
}
