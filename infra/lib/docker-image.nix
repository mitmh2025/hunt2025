{ name, pkgs, modules }:
let
  nixosConfiguration = pkgs.nixos ([
    ./container-systemd.nix
    "${pkgs.path}/nixos/modules/profiles/minimal.nix"
  ] ++ modules);
  image = pkgs.dockerTools.buildLayeredImage {
    inherit name;
    tag = "latest";
    maxLayers = 120;
    includeNixDB = true;
    contents = [
      (pkgs.runCommand "root-init" {} ''
        mkdir -p $out/usr/sbin
        ln -s ${nixosConfiguration.config.system.build.toplevel}/init $out/usr/sbin/init
      '')
    ];
    config.Cmd = ["/usr/sbin/init"];
    config.Env = [
      "PATH=/usr/bin:/run/current-system/sw/bin/"
      "container=docker"
    ];

    config.StopSignal = "SIGRTMIN+3";

    # service.volumes = [
    #   "/sys/fs/cgroup:/sys/fs/cgroup:ro"
    # ];
    # service.tmpfs = [
    #   "/run"          # noexec is fine because exes should be symlinked from elsewhere anyway
    #   "/run/wrappers" # noexec breaks this intentionally
    # ] ++ lib.optional (config.nixos.evaluatedConfig.boot.tmp.useTmpfs) "/tmp:exec,mode=777";
    # service.tty = true;
    # service.defaultExec = [config.nixos.build.x-arion-defaultShell "-l"];
  };
in {
  inherit nixosConfiguration image;
}
