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

  installPhase = ''
    mkdir -p $out/lib
    cp -r radioman/dist/ $out/lib/radioman
    for i in sync2tb tbprovision tbutil; do
      makeWrapper ${nodejs}/bin/node $out/bin/$i \
        --add-flags --enable-source-maps \
        --add-flags $out/lib/radioman/$i.mjs
    done
  '';
}
