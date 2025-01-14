{ config, lib, ... }:
{
  options = with lib; {
    resource = mkOption {
      type = types.anything;
      default = {};
    };
    data = mkOption {
      type = types.anything;
      default = {};
    };
  };
}