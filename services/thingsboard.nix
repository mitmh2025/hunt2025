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
  };
}
