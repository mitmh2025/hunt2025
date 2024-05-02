{ lib
, fetchFromGitHub
, jdk17
, jre
, makeWrapper
, proot
, stdenv
, xmlstarlet
, maven
}:

let
  defineMvnWrapper = ''
    mvn()
    {
        # One of the deps that are downloaded and run needs zlib.
        #export LD_LIBRARY_PATH="${lib.makeLibraryPath [stdenv.cc.cc.lib]}"
        # Give access to ELF interpreter under FHS path, to be able to run
        # prebuilt binaries.
        "${lib.getExe proot}" -b "${stdenv.cc.libc}/lib:/lib64" mvn "$@"
    }
  '';
  postPatch = ''
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -u '//pom:jar-plugin.version' -v 3.4.1 \
      -d '//pom:plugin[./pom:artifactId="gradle-maven-plugin"]' \
      -d '//pom:plugin[./pom:executions/pom:execution/pom:id="install-deb"]' \
      pom.xml
  '';
  jdk = jdk17;
  mavenWithJdk = maven.override { inherit jdk; };
  projectList = [
    "-msa"
    "-msa/js-executor"
    "-msa/monitoring"
    "-msa/tb"
    "-msa/tb-node"
    "-msa/transport"
    "-msa/transport/coap"
    "-msa/transport/http"
    "-msa/transport/lwm2m"
    "-msa/transport/mqtt"
    "-msa/transport/snmp"
    "-msa/vc-executor-docker"
    "-msa/web-ui"
  ];
in mavenWithJdk.buildMavenPackage rec {
  pname = "thingsboard";
  version = "3.7.0-SNAPSHOT";

  src = fetchFromGitHub {
    owner = "thingsboard";
    repo = pname;
    rev = "91a83a7e2a8dea403783d617a500c4059cf1e5c6"; # "v${version}";
    hash = "sha256-U8BfWqqAdA4fiqDsCezFWlq3+3jwn/395QSJggd6DiU=";
  };

  mvnParameters = "-DskipTests -Dskip.installyarn -Dskip.yarn -P'!yarn-build' -pl ${lib.concatStringsSep "," projectList}";

  mvnHash = "sha256-Fr108n3GGl82jo4YT75/RCEvyJHgiRXF+nendwMWxaY=";

  mvnFetchExtraArgs = {
    preConfigure = defineMvnWrapper;
    inherit postPatch;

    nativeBuildInputs = [ mavenWithJdk xmlstarlet ];
  };

  preConfigure = defineMvnWrapper;
  inherit postPatch;

  nativeBuildInputs = [ makeWrapper xmlstarlet ];

  installPhase = ''
    mkdir -p $out/bin $out/share/thingsboard

    install -Dm644 application/target/thingsboard-${version}-boot.jar $out/share/thingsboard/thingsboard.jar
    cp -r application/target/{conf,data} $out/share/thingsboard/

    makeWrapper ${jre}/bin/java $out/bin/thingsboard-install \
      --add-flags "-cp $out/share/thingsboard/thingsboard.jar \
        -Dloader.main=org.thingsboard.server.ThingsboardInstallApplication \
        -Dinstall.data_dir=$out/share/thingsboard/data \
        -Dspring.jpa.hibernate.ddl-auto=none \
        -Dinstall.upgrade=false" \
      --append-flags "org.springframework.boot.loader.launch.PropertiesLauncher"
    makeWrapper ${jre}/bin/java $out/bin/thingsboard-server \
      --add-flags "-cp $out/share/thingsboard/thingsboard.jar" \
      --append-flags "org.thingsboard.server.ThingsboardServerApplication"
  '';

  meta = with lib; {
    description = "Open-source IoT Platform - Device management, data collection, processing and visualization.";
    homepage = "https://github.com/thingsboard/thingsboard";
    license = licenses.asl20;
    maintainers = with maintainers; [ quentin ];
  };
}
