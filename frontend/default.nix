{ lib
, nodejs_21
, buildNpmPackage
, makeWrapper
}:
let package = builtins.fromJSON (builtins.readFile ./package.json);
in buildNpmPackage {
  pname = package.name;
  inherit (package) version;

  src = ./.;

  npmDepsHash = "sha256-ZULMuUdf1uzKSDXaFJRE4GSxds3U8pU743UhwNQ9iGY=";

  nodejs = nodejs_21;

  nativeBuildInputs = [ makeWrapper ];

  installPhase = ''
    runHook preInstall
    mkdir -p $out/share
    cp -R dist $out/share/hunt2025
    cp package.json $out/share/hunt2025/
    makeWrapper ${nodejs_21}/bin/node $out/bin/hunt2025 \
      --add-flags $out/share/hunt2025/server-bundle.js
    runHook postInstall
  '';
}