{ lib, ... }:
{
  config = {
    system.stateVersion = "24.05";

    # Don't keep old generations around
    nix.gc.automatic = lib.mkDefault true;
    nix.gc.options = lib.mkDefault "-d";
    nix.settings.auto-optimise-store = true;

    # Allow console login with no password
    users.users.root.hashedPassword = "";

    users.users.root.openssh.authorizedKeys.keys = [
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCUtRBFYPQ0OicLdAVNJih4JZp0JsGnKM/jRnG4GzGGW/bvNYtcNRCNWKHkMKAZvHSxLw8H3UVDDpyYWPnCw75rSR9aAIOVMAa4ScQyBKPvPNEM55XQT+AW8oapeSDkVrvhxJpLf8vCBz0jx15meQgQm9T/CnmHnigojcGbxtwe8znL2VQoZZnrd9KW69a94CEQuJZAKIur0Y00NoMuZYhgRFQMmuxXlqlwJSohTPHziHUxLpp/oqHnwh6er7bZwHfw7pBwSrwOyd4z4P1uWwJf2G0ShpVR07HtTtHLWIR+08ms0MiRpkgdPNFc4M9vlG4ZwOUVEuyJbJIj9VZIssLehKXXvOFj6nFqGTgMfflxd5vuS4bPJd2wRJymi+LXFMZcrg/8q8+6FJqUlp46hC3gR8iYQpLHQ4vpZgjNXncm5hAJsKDzQMrpHHkjR4jMibqsSMTHFNdXgzu4lZ2U/bxz33dEA/hOWmoWKK+zh6fjtRdMgT2ygnbVCrDtRW8zlmD4g88c1a02slOnK4tnM8XQ8xHP+n6cGfrwM1vCpNtxGWTrt+DvfTLhJhB74VTNYc4cLAQQf1d+k+wjjreswMCmLC8scmoyRqkhvEqatoRqQaeo9DG8OTUSZnmezZX4r5cF+fOsKbFRzAwKDBQqeA8oW6egTVNNxpQDOBUrrlopCw== quentinmit@github/1"
      "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAsGMP08Nq2dliWfi3WnODNuaOrRUNuRegwC81atTgeNSndkYsgCXEPthiDrjRd2vpM06R4sMLAPUmvXQyEr8QqR+TUwrJq2eghhBycNXChXdPd9ahaSMsWReoyyRqc32OPidF6p/t9Rd+SAAAF6a+skcoV8Nu1HgGwMNe7ByuOub6HGTdvTo13PTuAlugcEhDfakaMkxZ41kXQbT5xPOWhKQY2vfZaC35gd86rPqM9Ols+4wEaByFXijsbWmEOr4wJmOfe4hWnO9sQFsC9oOrFBRd/XipQnMg522cepIY7nVMPi5UDYEe8O5dgs+7GrIKxWcwzdglBgE0nYp8xp6BDw== quentinmit@github/2"
      "ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBJnpteYlrAjDLqQuT2g+Uwzx5MImr6AGlCnd6fJrOQoUeXvFUyX6K+mJxymfjfPRVwbLQm551tpGyMzdzJv/0OU= ebroder@github"
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJjUJqRBgYdJNoIA6Ojb8O5tZcy0NtbKkOJ5WBaubb09 zarvox@github/1"
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMliU1eb/TIAv9hCxPnNiIJhKQsUjLlDvhrdVSzroElb zarvox@github/2"
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFQClsG3/sl09J6dFHLUqXDEdFzXiL6DYFEasA6oNYE4 zarvox@github/3"
    ];

    # Allow ACME certificates
    security.acme.acceptTerms = true;
    security.acme.defaults.email = "hunt2025-tech@googlegroups.com";

    # Don't build documentation
    documentation.nixos.enable = false;

    nix.settings.experimental-features = [
      "nix-command"
      "flakes"
    ];

    # Only use one set of packages
    home-manager.useGlobalPkgs = true;
    home-manager.useUserPackages = true;
  };
}
