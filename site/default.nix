{ lib
, nodejs_22
, postgresql
, playwright-driver
, buildNpmPackage
, importNpmLock
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
  npmDeps = importNpmLock {
    npmRoot = ./.;
  };
  npmConfigHook = importNpmLock.npmConfigHook;

  npmBuildScript = "build-all";

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

  outputs = [ "out" "assets" "misc" "ops" ];

  postInstall = ''
    mkdir -p $assets
    cp -R dist/static $assets/static

    rsync -r --exclude static/ --exclude misc/ dist $out/lib/node_modules/hunt2025/
    mv $out/lib/node_modules/hunt2025 $out/lib/hunt2025
    rmdir $out/lib/node_modules
    # Remove intermediate build files which might contain a reference to NodeJS's source code.
    find $out/lib/hunt2025 \( -name Makefile -or -name "*.d" -or -name "*.mk" -or -name config.gypi \) -delete
    makeWrapper ${nodejs}/bin/node $out/bin/hunt2025 \
      --add-flags --enable-source-maps \
      --add-flags $out/lib/hunt2025/dist/server-bundle.js

    mkdir -p $misc/lib
    cp -R dist/misc/ $misc/lib/misc
    for i in ops sync2tb sync2k8s tbprovision tbutil; do
      makeWrapper ${nodejs}/bin/node $misc/bin/$i \
          --add-flags --enable-source-maps \
          --add-flags $misc/lib/misc/$i.mjs
    done

    mkdir -p $ops/share/ops
    cp -R dist-ops/static $ops/share/ops/static
  '';
}
