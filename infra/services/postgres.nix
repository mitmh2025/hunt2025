{ config, lib, pkgs, ... }:
{
  config = {
    services.postgresql = {
      enable = true;
      ensureDatabases = [ "hunt2025" ];
      ensureUsers = [{
        name = "hunt2025";
        ensureDBOwnership = true;
      }];
    };

    services.postgresqlBackup = {
      enable = true;
      startAt = "*-*-* *:15:00";
    };
  };
}
