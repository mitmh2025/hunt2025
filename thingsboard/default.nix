{ lib
, maven
}:
maven.buildMavenPackage {
  pname = "hunt-thingsboard";
  version = "1.0.0";

  src = ./.;

  mvnHash = "sha256-ap9CEUZyE5z90KM0VjsEZHo4g8SeYMEuhGvYJPkMzBw=";

  installPhase = ''
    mkdir -p $out/share/thingsboard/extensions
    install -Dm644 target/hunt-thingsboard-*-hunt-nodes.jar $out/share/thingsboard/extensions
  '';
}