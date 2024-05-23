{ lib
, nodejs_22
, postgresql
, playwright-driver
, buildNpmPackage
, makeWrapper
}:
let
  package = builtins.fromJSON (builtins.readFile ./package.json);
  nodejs = nodejs_22;
in buildNpmPackage {
  pname = package.name;
  inherit (package) version;

  src = ./.;
  npmDepsHash = "sha256-3h1zc99LaS3i+zscbPdgpPYePXA78lRUEtLzC5yPmaw=";

  inherit nodejs;

  buildInputs = [
    postgresql
  ];

  nativeBuildInputs = [
    postgresql
    makeWrapper
  ];

  nativeCheckInputs = [
    playwright-driver.browsers
  ];

  postInstall = ''
    cp -R dist $out/lib/node_modules/hunt2025/dist
    makeWrapper ${nodejs}/bin/node $out/bin/hunt2025 \
      --add-flags $out/lib/node_modules/hunt2025/dist/server-bundle.js
  '';
}
