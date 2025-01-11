{ lib
, fetchFromGitHub
, jdk17
, jre
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
  version = "3.9";
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
    rev = "v${version}";
    hash = "sha256-evUz8jZFOa4w0arbLKvFP78sOvRCGswEoGT4c8E1FMs=";
  };
  ui-ngx = mkYarnPackage {
    inherit version;
    src = src + "/ui-ngx";

    packageJSON = ./package.json;
    offlineCache = fetchYarnDeps {
      yarnLock = src + "/ui-ngx/yarn.lock";
      hash = "sha256-+dGexbJpB1RfQLokapUYsUGwnU62ljPYim0fN4oZnbo=";
    };

    packageResolutions = {
      "echarts" = fetchFromGitHub {
        owner = "thingsboard";
        repo = "echarts";
        rev = "5.5.0-TB";
        hash = "sha256-UWutDlqMWchiIZXUOOO/vyOiTpo3UkD2GaaOPs9EGvw=";
      };
    };

    doDist = false;

    configurePhase = ''
      runHook preConfigure
      cp -r $node_modules node_modules
      chmod -R +w node_modules
      runHook postConfigure
    '';

    buildPhase = ''
      runHook preBuild
      yarn --offline run prepare
      yarn --offline run build:prod
      runHook postBuild
    '';

    installPhase = ''
      cp -r target/generated-resources $out
    '';
  };
  postPatch = ''
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -u '//pom:jar-plugin.version' -v 3.4.1 \
      -d '//pom:plugin[./pom:artifactId="gradle-maven-plugin"]' \
      -d '//pom:plugin[./pom:executions/pom:execution/pom:id="install-deb"]' \
      -d '//pom:plugin[./pom:artifactId="git-commit-id-maven-plugin"]' \
      -s '//pom:dependencyManagement/pom:dependencies' -t elem -n dependency \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n groupId -v com.kohlschutter.junixsocket \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n artifactId -v junixsocket-core \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n version -v 2.9.1 \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n type -v pom \
      -s '//pom:dependencyManagement/pom:dependencies' -t elem -n dependency \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n groupId -v com.google.cloud.sql \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n artifactId -v postgres-socket-factory \
      -s '//pom:dependencyManagement/pom:dependencies/dependency[last()]' -t elem -n version -v 1.21.0 \
      pom.xml
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -s '//pom:dependencies' -t elem -n dependency \
      -s '//pom:dependencies/dependency[last()]' -t elem -n groupId -v com.kohlschutter.junixsocket \
      -s '//pom:dependencies/dependency[last()]' -t elem -n artifactId -v junixsocket-core \
      -s '//pom:dependencies/dependency[last()]' -t elem -n type -v pom \
      -s '//pom:dependencies' -t elem -n dependency \
      -s '//pom:dependencies/dependency[last()]' -t elem -n groupId -v com.google.cloud.sql \
      -s '//pom:dependencies/dependency[last()]' -t elem -n artifactId -v postgres-socket-factory \
      dao/pom.xml
    xmlstarlet ed \
      --inplace \
      -N pom=http://maven.apache.org/POM/4.0.0 \
      -u '//pom:resources/pom:resource/pom:directory' -v ${ui-ngx} \
      ui-ngx/pom.xml
  '';
  jdk = jdk17;
  mavenWithJdk = maven.override { jdk_headless = jdk; };
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

  mvnHash = "sha256-LKU8zn8LurkuQBFcSM4n0UBNum8hJH1RoYMxgpvb7nk=";

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

    install -Dm644 application/target/thingsboard-*-boot.jar $out/share/thingsboard/thingsboard.jar
    cp -r application/target/{conf,data} $out/share/thingsboard/
    rm $out/share/thingsboard/conf/logback.xml

    makeWrapper ${jre}/bin/java $out/bin/thingsboard-install \
      --add-flags "-cp $out/share/thingsboard/thingsboard.jar \
        -Dloader.main=org.thingsboard.server.ThingsboardInstallApplication \
        -Dinstall.data_dir=$out/share/thingsboard/data \
        -Dspring.jpa.hibernate.ddl-auto=none \
        -Dinstall.upgrade=false" \
      --append-flags "org.springframework.boot.loader.launch.PropertiesLauncher"
    makeWrapper ${jre}/bin/java $out/bin/thingsboard-server \
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
