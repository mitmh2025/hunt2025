{ lib
, nodejs_22
, postgresql
, buildNpmPackage
, importNpmLock
, makeWrapper
}:
let
  package = builtins.fromJSON (builtins.readFile ./package.json);
  nodejs = nodejs_22;
in buildNpmPackage {
  pname = package.name;
  inherit (package) version;

  src = ./..;
  npmDeps = importNpmLock {
    npmRoot = ./..;
  };
  npmConfigHook = importNpmLock.npmConfigHook;
  npmWorkspace = "radioman";

  inherit nodejs;

  buildInputs = [
    # TODO: This needs to be here because npm will try to build pg-native even though we don't use it.
    postgresql
  ];

  nativeBuildInputs = [
    postgresql
    makeWrapper
  ];

  dontNpmPrune = true; # Need esbuild at runtime.

  postInstall = ''
    # Work around https://github.com/NixOS/nixpkgs/pull/333759
    rm -rf $out/lib/node_modules/hunt2025/node_modules/hunt2025
    cp -rH node_modules/hunt2025 $out/lib/node_modules/hunt2025/node_modules/
    rm -r $out/lib/node_modules/hunt2025/node_modules/hunt2025/node_modules
    ln -s hunt2025/node_modules/hunt2025/shared-tsconfig.json $out/lib/node_modules/
    makeWrapper ${nodejs}/bin/node $out/bin/radioman \
      --chdir $out/lib/node_modules/hunt2025 \
      --add-flags --enable-source-maps \
      --add-flags "--import tsx/esm" \
      --add-flags $out/lib/node_modules/hunt2025/main.ts
  '';
}
