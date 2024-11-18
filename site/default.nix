{ lib
, nodejs_22
, postgresql
, playwright-driver
, buildNpmPackage
, rsync
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
  npmDepsHash = "sha256-BuMVbc9NM5QOoIRExfcv8HLIShQl/JZwpMdq5wDIuz0=";

  inherit nodejs;

  buildInputs = [
    postgresql
  ];

  nativeBuildInputs = [
    postgresql
    rsync
    makeWrapper
  ];

  nativeCheckInputs = [
    playwright-driver.browsers
  ];

  dontNpmPrune = if withDevDeps then true else null;

  outputs = [ "out" "assets" ];

  postInstall = ''
    mkdir -p $assets
    cp -R dist/static $assets/static
    rsync -r --exclude static/ dist $out/lib/node_modules/hunt2025/
    mv $out/lib/node_modules/hunt2025 $out/lib/hunt2025
    rmdir $out/lib/node_modules
    makeWrapper ${nodejs}/bin/node $out/bin/hunt2025 \
      --add-flags --enable-source-maps \
      --add-flags $out/lib/hunt2025/dist/server-bundle.js
  '';
}
