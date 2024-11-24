{ config, pkgs, lib, ... }:
let
  cfg = config.services.thingsboard;
  settingsFormat = pkgs.formats.yaml {};
  caseInsensitiveEnum = values:
    let
      elemType = lib.types.enum (builtins.map lib.toUpper values);
    in elemType // {
      check = x: elemType.check (lib.toUpper x);
    };
  logLevelType = caseInsensitiveEnum ["TRACE" "DEBUG" "INFO" "WARN" "ERROR" "ALL" "OFF"];
  writeXML = name: stylesheet: data: pkgs.runCommand name {
    inherit stylesheet;
    data = builtins.toXML data;
    passAsFile = ["data" "stylesheet"];

    nativeBuildInputs = [ pkgs.libxslt ];
  } ''
    xsltproc $stylesheetPath $dataPath > $out
  '';
  logbackStylesheet = ''
    <?xml version='1.0' encoding='UTF-8'?>
    <xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>
      <xsl:output indent="yes" />
      <xsl:template match='/expr/attrs'>
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE configuration&gt;</xsl:text>
        <configuration>
          <appender name="STDERR" class="ch.qos.logback.core.ConsoleAppender">
            <target>System.err</target>
            <encoder>
                <pattern>%d{ISO8601} [%thread] %-5level %logger{36} - %msg%n</pattern>
            </encoder>
          </appender>
          <xsl:for-each select="attr[@name = 'loggers']/attrs/attr">
            <logger name="{@name}" level="{string/@value}" />
          </xsl:for-each>
          <root level="{attr[@name = 'rootLevel']/string/@value}">
            <appender-ref ref="STDERR" />
          </root>
        </configuration>
      </xsl:template>
    </xsl:stylesheet>
  '';
  configDir = pkgs.linkFarm "thingsboard-config" {
    "logback.xml" = writeXML "logback.xml" logbackStylesheet cfg.logback;
    "thingsboard-local.yml" = settingsFormat.generate "thingsboard-local.yml" cfg.settings;
  };
in {
  options = with lib; {
    services.thingsboard = {
      enable = mkEnableOption "ThingsBoard";
      logback = {
        loggers = mkOption {
          type = types.attrsOf logLevelType;
          description = "Set of logger names with overridden log levels";
        };
        rootLevel = mkOption {
          type = logLevelType;
          default = "INFO";
          description = "Default log level";
        };
      };
      settings = mkOption {
        inherit (settingsFormat) type;
        default = {};
        description = "ThingsBoard configuration options";
      };
      datasource.createLocally = mkEnableOption "Use local Postgres database";
    };
  };
  config = lib.mkIf cfg.enable {
    services.thingsboard.logback.loggers = lib.mapAttrs (_: lib.mkDefault) {
      "org.thingsboard.server" = "INFO";
      "org.apache.kafka.common.utils.AppInfoParser" = "WARN";
      "org.apache.kafka.clients" = "WARN";
      "com.microsoft.azure.servicebus.primitives.CoreMessageReceiver" = "OFF";
    };
    services.postgresql = lib.mkIf cfg.datasource.createLocally {
      ensureDatabases = [
        "thingsboard"
      ];
      ensureUsers = [
        {
          name = "thingsboard";
          ensureDBOwnership = true;
        }
      ];
    };

    services.thingsboard.settings.spring.datasource = lib.mkIf cfg.datasource.createLocally {
      url = "jdbc:postgresql:thingsboard?socketFactory=org.newsclub.net.unix.AFUNIXSocketFactory$FactoryArg&socketFactoryArg=/run/postgresql/.s.PGSQL.5432";
      username = "thingsboard";
    };

    users.users.thingsboard = {
      isSystemUser = true;
      group = "thingsboard";
    };
    users.groups.thingsboard = {};

    environment.systemPackages = with pkgs; [
      thingsboard
    ];

    systemd.services.thingsboard = {
      description = "ThingsBoard IOT Platform";

      wantedBy = ["multi-user.target"];
      wants = lib.mkIf cfg.datasource.createLocally [
        "postgresql.service"
      ];

      environment = {
        LOADER_PATH = configDir;
      };

      # TODO: Provision OAuth2 client
      # https://thingsboard.io/docs/user-guide/oauth-2-support/#oauth-20-configuration-parameters

      # TODO: Set sysadmin password

      serviceConfig = {
        #ExecStartPre = "${pkgs.thingsboard}/bin/thingsboard-install";
        ExecStart = "${pkgs.thingsboard}/bin/thingsboard-server -XX:+IgnoreUnrecognizedVMOptions -XX:+HeapDumpOnOutOfMemoryError -XX:-UseBiasedLocking -XX:+UseTLAB -XX:+ResizeTLAB -XX:+PerfDisableSharedMem -XX:+UseCondCardMark -XX:+UseG1GC -XX:MaxGCPauseMillis=500 -XX:+UseStringDeduplication -XX:+ParallelRefProcEnabled -XX:MaxTenuringThreshold=10 -Xms256m -Xmx512m -Djna.debug_load=true -Dspring.profiles.active=local";
        Restart = "always";
        RestartSec = "5s";
        User = "thingsboard";
        Group = "thingsboard";
      };
    };
  };
}
