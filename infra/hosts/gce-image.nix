{ config, lib, pkgs, modulesPath, ... }:
{
  imports = [
    ./base.nix
    "${modulesPath}/virtualisation/google-compute-image.nix"
  ];

  # TODO: Report ssh host keys at startup
  # curl -X PUT --data @<(awk '{ print $2 }' /etc/ssh/ssh_host_ed25519_key.pub) http://metadata.google.internal/computeMetadata/v1/instance/guest-attributes/hostkeys/ssh-ed25519 -H "Metadata-Flavor: Google"
}
