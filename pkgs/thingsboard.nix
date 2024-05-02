{ lib
, fetchFromGitHub
, jdk21
, jre
, makeWrapper
, proot
, stdenv
, maven }:

let
  defineMvnWrapper = ''
    mvn()
    {
        # Give access to ELF interpreter under FHS path, to be able to run
        # prebuilt binaries.
        "${lib.getExe proot}" -b "${stdenv.cc.libc}/lib:/lib64" mvn "$@"
    }
  '';
  postPatch = ''
    substituteInPlace pom.xml --replace-fail "<jar-plugin.version>3.4.0" "<jar-plugin.version>3.4.1"
  '';
  jdk = jdk21;
  mavenWithJdk = maven.override { inherit jdk; };
in mavenWithJdk.buildMavenPackage rec {
  pname = "thingsboard";
  version = "3.6.4";

  src = fetchFromGitHub {
    owner = "thingsboard";
    repo = pname;
    rev = "91a83a7e2a8dea403783d617a500c4059cf1e5c6"; # "v${version}";
    hash = "sha256-U8BfWqqAdA4fiqDsCezFWlq3+3jwn/395QSJggd6DiU=";
  };

  mvnParameters = "-DskipTests";

  mvnHash = "";

  mvnFetchExtraArgs = {
    preConfigure = defineMvnWrapper;
    inherit postPatch;
  };

  preConfigure = defineMvnWrapper;
  inherit postPatch;

  nativeBuildInputs = [ makeWrapper ];

  installPhase = ''
    mkdir -p $out/bin $out/share/thingsboard
    install -Dm644 application/target/thingsboard-${version}-boot.jar $out/share/thingsboard/thingsboard.jar

    makeWrapper ${jre}/bin/java $out/bin/thingsboard \
      --add-flags "-jar $out/share/thingsboard/thingsboard.jar"
  '';

  meta = with lib; {
    description = "Open-source IoT Platform - Device management, data collection, processing and visualization.";
    homepage = "https://github.com/thingsboard/thingsboard";
    license = licenses.asl20;
    maintainers = with maintainers; [ quentin ];
  };
}
