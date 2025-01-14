{ config, lib, ... }:
{
  options = with lib; {
    resource = mkOption {
      type = types.anything;
    };
  };
}