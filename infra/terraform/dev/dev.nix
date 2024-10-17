{ lib, self, ... }:
{
  resource.nix_store_path_copy.dev_nixos = {
    store_path = "${self.nixosConfigurations.dev.config.system.build.toplevel}";
    to = "ssh-ng://root@dev.mitmh2025.com";
    check_sigs = false;

    # TODO: Switch to deploy-rs so we get magic rollback?

    provisioner.remote-exec = {
      connection = {
        type = "ssh";
        user = "root";
        agent = true;
        host = "dev.mitmh2025.com";
      };
      inline = [
        "${self.nixosConfigurations.dev.config.system.build.toplevel}/bin/switch-to-configuration switch"
      ];
    };
  };
}
