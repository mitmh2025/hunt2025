{ config, pkgs, ... }:

{
  config = {
    services.postgresql = {
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
      wants = [
        "postgresql.service"
      ];

      environment = {
        SPRING_DATASOURCE_URL = "jdbc:postgresql:thingsboard?socketFactory=org.newsclub.net.unix.AFUNIXSocketFactory$FactoryArg&socketFactoryArg=/run/postgresql/.s.PGSQL.5432";
        SPRING_DATASOURCE_USERNAME = "thingsboard";
      };

      serviceConfig = {
        #ExecStartPre = "${pkgs.thingsboard}/bin/thingsboard-install";
        ExecStart = "${pkgs.thingsboard}/bin/thingsboard-server -Djna.debug_load=true";
        Restart = "always";
        RestartSec = "5s";
        User = "thingsboard";
        Group = "thingsboard";
      };
    };
  };
}
