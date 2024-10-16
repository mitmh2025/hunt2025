{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    #"${modulesPath}/virtualisation/google-compute-config.nix"
    ./base.nix
    ../services/postgres.nix
    ../services/redis.nix
  ];
  config = {
    system.stateVersion = "24.05";

    fileSystems."/" = {
      fsType = "ext4";
      device = "/dev/disk/by-label/nixos";
      autoResize = true;
    };
    boot.loader.systemd-boot.enable = true;

    users.mutableUsers = false;

    networking.firewall.enable = false; # FIXME: Consider enabling and configuring?

    services.nginx = {
      enable = true;
    };

    services.postgresql = {
      enableTCPIP = true;
      authentication = "host all all all md5";
    };

    services.thingsboard = {
      enable = true;
      logback.loggers = {
        "org.thingsboard.server" = "DEBUG";
        "org.thingsboard.server.actors.TbActorMailbox" = "INFO";
        "org.thingsboard.server.actors.service.ContextAwareActor" = "INFO";
      };
      logback.rootLevel = "DEBUG";
      datasource.createLocally = true;
    };

    virtualisation.vmVariant = {
      virtualisation.memorySize = 2048;
      virtualisation.forwardPorts = [
        # Redis
        { from = "host"; host.port = 6379; guest.port = 6379; }
        # Postgres
        { from = "host"; host.port = 5432; guest.port = 5432; }
        # ThingsBoard
        { from = "host"; host.port = 8080; guest.port = 8080; }
      ];
      services.redis.servers.hunt2025 = {
        bind = "0.0.0.0";
        port = 6379;
        settings.protected-mode = "no";
      };
    };
  };
}
