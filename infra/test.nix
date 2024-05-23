{ nixosTest
}:

nixosTest {
  name = "hunt2025-vm-test";
  nodes.server = { config, pkgs, lib, ... }: {
    imports = [
      ./services/postgres.nix
      ./services/redis.nix
      ./services/hunt2025.nix
    ];
    nixpkgs.overlays = [(final: prev: {
      hunt2025 = prev.hunt2025.overrideAttrs (old: {
        # Keep dev dependencies so we can use playwright
        dontNpmPrune = true;
        postInstall = old.postInstall + ''
          cp package-lock.json $out/lib/node_modules/hunt2025/
        '';
      });
    })];
    systemd.services.hunt2025.environment.DB_ENV = lib.mkForce "ci";
    environment.systemPackages = [
      pkgs.nodejs_22
      (pkgs.writeShellScriptBin "hunt2025-playwright" ''
        export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
        export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
        set -ex
        cd ${pkgs.hunt2025}/lib/node_modules/hunt2025
        exec ${pkgs.nodejs_22}/bin/npx playwright test --output /tmp/test-results
      '')
    ];
  };
  testScript = ''
    server.start()
    server.wait_for_unit("hunt2025.service")
    server.execute("hunt2025-playwright")
    server.copy_from_vm("/tmp/test-results", "test-results")
  '';
}