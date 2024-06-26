{ lib
, fetchFromGitHub
, jdk17
, jre_headless
, makeWrapper
, proot
, stdenv
, xmlstarlet
, maven
, systemdLibs
, mkYarnPackage
, fetchYarnDeps
}:

let
  pname = "thingsboard";
  version = "3.7.0-SNAPSHOT";
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
  src = fetchFromGitHub {
    owner = "thingsboard";
    repo = pname;
    rev = "91a83a7e2a8dea403783d617a500c4059cf1e5c6"; # "v${version}";
    hash = "sha256-U8BfWqqAdA4fiqDsCezFWlq3+3jwn/395QSJggd6DiU=";
  };
  ui-ngx = mkYarnPackage {
    inherit version;
    src = src + "/ui-ngx";

    packageJSON = ./package.json;
    offlineCache = fetchYarnDeps {
      yarnLock = src + "/ui-ngx/yarn.lock";
      hash = "sha256-wA6Xb2TERhwEwDwZcW387wPkjY0hG/HxN+gB0USAmFw=";
    };

    packageResolutions = {
      "echarts" = fetchFromGitHub {
        owner = "thingsboard";
        repo = "echarts";
        rev = "5.5.0-TB";
        hash = "sha256-8jGLzpYLgXe0qeEJUZQbd1rFGcenxw4FSbrvxM4NPDQ=";
      };
    };

    doDist = false;

    buildPhase = ''
      runHook preBuild
      yarn --offline run build:prod
      runHook postBuild
    '';

    installPhase = ''
      cp -r deps/thingsboard/target/generated-resources $out
    '';
  };
  postPatch = ''
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -u '//pom:jar-plugin.version' -v 3.4.1 \
      -d '//pom:plugin[./pom:artifactId="gradle-maven-plugin"]' \
      -d '//pom:plugin[./pom:executions/pom:execution/pom:id="install-deb"]' \
      -s '//pom:dependencyManagement/pom:dependencies' -t elem -n dependency \
      -s '//pom:dependencyManagement/pom:dependencies/dependency' -t elem -n groupId -v com.kohlschutter.junixsocket \
      -s '//pom:dependencyManagement/pom:dependencies/dependency' -t elem -n artifactId -v junixsocket-core \
      -s '//pom:dependencyManagement/pom:dependencies/dependency' -t elem -n version -v 2.9.1 \
      -s '//pom:dependencyManagement/pom:dependencies/dependency' -t elem -n type -v pom \
      pom.xml
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -s '//pom:dependencies' -t elem -n dependency \
      -s '//pom:dependencies/dependency' -t elem -n groupId -v com.kohlschutter.junixsocket \
      -s '//pom:dependencies/dependency' -t elem -n artifactId -v junixsocket-core \
      -s '//pom:dependencies/dependency' -t elem -n type -v pom \
      dao/pom.xml
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -u '//pom:resources/pom:resource/pom:directory' -v ${ui-ngx} \
      ui-ngx/pom.xml
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
  libPath = lib.makeLibraryPath [
    systemdLibs
  ];
in mavenWithJdk.buildMavenPackage rec {
  inherit pname version src;

  mvnParameters = "-DskipTests -Dskip.installyarn -Dskip.yarn -Dpkg.installFolder=$out/share/thingsboard -P'!yarn-build' -pl ${lib.concatStringsSep "," projectList}";

  mvnHash = "sha256-ENTnlIKQw2/fOtWkPzqaXavJifZoSlPP2h5o1pL9AkA=";

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
    rm $out/share/thingsboard/conf/logback.xml

    makeWrapper ${jre_headless}/bin/java $out/bin/thingsboard-install \
      --add-flags "-cp $out/share/thingsboard/thingsboard.jar \
        -Dloader.main=org.thingsboard.server.ThingsboardInstallApplication \
        -Dinstall.data_dir=$out/share/thingsboard/data \
        -Dspring.jpa.hibernate.ddl-auto=none \
        -Dinstall.upgrade=false" \
      --append-flags "org.springframework.boot.loader.launch.PropertiesLauncher"
    makeWrapper ${jre_headless}/bin/java $out/bin/thingsboard-server \
      --add-flags "-Djna.platform.library.path=${libPath} \
        -Dinstall.data_dir=$out/share/thingsboard/data" \
      --suffix LOADER_PATH , $out/share/thingsboard/conf,$out/share/thingsboard/extensions \
      --append-flags "-jar $out/share/thingsboard/thingsboard.jar"
  '';

  passthru = {
    inherit ui-ngx;
  };
  meta = with lib; {
    description = "Open-source IoT Platform - Device management, data collection, processing and visualization.";
    homepage = "https://github.com/thingsboard/thingsboard";
    license = licenses.asl20;
    maintainers = with maintainers; [ quentin ];
  };
}
