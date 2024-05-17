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

  npmDepsHash = "sha256-uO9WFfLP0PdtgN8ULOKdzAYPpz75uSffLLW4lnagf98=";

  inherit nodejs;

  buildInputs = [
    postgresql
  ];

  nativeBuildInputs = [
    postgresql
    makeWrapper
  ];

  installPhase = ''
    runHook preInstall
    mkdir -p $out/share
    cp -R dist $out/share/hunt2025
    cp package.json $out/share/hunt2025/
    makeWrapper ${nodejs}/bin/node $out/bin/hunt2025 \
      --add-flags $out/share/hunt2025/server-bundle.js
    runHook postInstall
  '';
}
