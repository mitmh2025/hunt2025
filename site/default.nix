{ lib
, nodejs_22
, postgresql
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

  npmDepsHash = "sha256-SaeODbiAnGHhx3SmLZ1V7iY8eHlsoeP6ib7GLq7Vufw=";

  inherit nodejs;

  buildInputs = [
    postgresql
  ];

  nativeBuildInputs = [
    postgresql
    makeWrapper
  ];

  postInstall = ''
    cp -R dist $out/lib/node_modules/hunt2025/dist
    makeWrapper ${nodejs}/bin/node $out/bin/hunt2025 \
      --add-flags $out/lib/node_modules/hunt2025/dist/server-bundle.js
  '';
}
