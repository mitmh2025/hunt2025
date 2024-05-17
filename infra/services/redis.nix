{ config, lib, pkgs, ... }:
{
  config = {
    services.redis.servers.hunt2025 = {
      enable = true;
    };  
  };
}