{ dockerTools
, writeTextDir
, git
, nix
, nix-fast-build
, nixos-rebuild
, openssh
, coreutils
, s3Url
, deployKeys
, lib
}:
dockerTools.buildLayeredImage {
  name = "nix-cache";
  tag = "latest";
  maxLayers = 120;
  contents = [
    (dockerTools.fakeNss.override {
      extraPasswdLines = map
        (nr: "nixbld${toString nr}:x:${toString (30000+nr)}:30000:Nix build user ${toString nr}:/var/empty:/bin/nologin")
        (lib.range 1 32);
      extraGroupLines = ["nixbld:!:30000:${lib.concatMapStringsSep "," (nr: "nixbld${toString nr}") (lib.range 1 32)}"];
    })
    (writeTextDir "etc/nix/nix.conf" ''
      extra-experimental-features = nix-command flakes
      substituters = ${s3Url} https://cache.nixos.org/
      require-sigs = false
    '')
    (writeTextDir "etc/gitconfig" (lib.generators.toGitINI {
      url = lib.mapAttrs' (
        repo: args:
        lib.nameValuePair
          "ssh://git@github-${repo}/mitmh2025/${repo}"
          {
            insteadOf = "ssh://git@github.com/mitmh2025/${repo}";
          }
      ) deployKeys;
    }))
    (writeTextDir "etc/ssh/ssh_config" (
      lib.concatStringsSep "\n" (lib.mapAttrsToList (
        repo: args:
        ''
          Host github-${repo}
            Hostname github.com
            IdentityFile /keys/${repo}_deploy_key
        ''
      ) deployKeys)
    ))
    (writeTextDir "etc/ssh/ssh_known_hosts" ''
      github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl
      github.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEmKSENjQEezOmxkZMy7opKgwFB9nkt5YRrYMjNuG5N87uRgg6CLrbo5wAdT/y6v0mKV0U2w0WZ2YB/++Tpockg=
      github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=
    '')
    dockerTools.binSh
    dockerTools.caCertificates
    git
    nix
    nix-fast-build
    nixos-rebuild
    openssh
    coreutils
  ];
  extraCommands = ''
    mkdir -p nix/var/nix/gcroots
    ln -sf /nix/var/nix/profiles nix/var/nix/gcroots/profiles
    mkdir -m 1777 tmp
  '';
}
