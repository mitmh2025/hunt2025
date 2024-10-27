{ lib
, nodejs_22
, postgresql
, playwright-driver
, buildNpmPackage
, makeWrapper
, withDevDeps ? false
}:
let
  package = builtins.fromJSON (builtins.readFile ./package.json);
  nodejs = nodejs_22;
in buildNpmPackage {
  pname = package.name;
  inherit (package) version;

  src = ./.;
  npmDepsHash = "sha256-iczTWBiNu1U0aNArYT3eUlf2/zVbjhntn0mFH7wl5aQ=";

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

  dontNpmPrune = if withDevDeps then true else null;

  postInstall = ''
    cp -R dist $out/lib/node_modules/hunt2025/dist
    mv $out/lib/node_modules/hunt2025 $out/lib/hunt2025
    rmdir $out/lib/node_modules
    makeWrapper ${nodejs}/bin/node $out/bin/hunt2025 \
      --add-flags --enable-source-maps \
      --add-flags $out/lib/hunt2025/dist/server-bundle.js
  '';
}
