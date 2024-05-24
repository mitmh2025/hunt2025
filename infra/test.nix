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
      hunt2025 = prev.hunt2025.override {
        withDevDeps = true;
      };
    })];
    systemd.services.hunt2025.environment.DB_ENV = lib.mkForce "ci";
    environment.systemPackages = [
      pkgs.nodejs_22
      (pkgs.writeShellScriptBin "hunt2025-playwright" ''
        export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
        export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
        export PLAYWRIGHT_HTML_REPORT=/tmp/playwright-report
        export PW_TEST_HTML_REPORT_OPEN=never
        set -ex
        cd ${pkgs.hunt2025}/lib/hunt2025
        exec ${pkgs.nodejs_22}/bin/npx playwright test --output /tmp/test-results --reporter=github,html
      '')
    ];
  };
  testScript = ''
    print("::endgroup::")
    print("::group::Run VM")
    server.start()
    server.wait_for_unit("hunt2025.service")
    server.wait_for_open_port(3000)
    status, stdout = server.execute("hunt2025-playwright")
    open(server.out_dir / "status", "w").write(str(status))
    server.copy_from_vm("/tmp/playwright-report", ".")
    print("::endgroup::")
    print(stdout)
  '';
}