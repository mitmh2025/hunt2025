{ config, lib, pkgs, ... }:
{
  sops.keys.site = {};
  resource.tls_private_key.jwt_secret = {
    algorithm = "RSA";
  };
  resource.random_password.data_api_secret = {
    length = 64;
    special = false;
  };
  resource.random_password.frontend_api_secret = {
    length = 64;
  };
}
