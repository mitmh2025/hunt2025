{
  config = {
    system.stateVersion = "24.05";

    # Allow console login with no password
    users.users.root.hashedPassword = "";

    # Don't build documentation
    documentation.nixos.enable = false;
  };
}
