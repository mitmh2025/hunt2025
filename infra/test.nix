{ nixosTest
, self
}:

nixosTest {
  name = "hunt2025-vm-test";
  nodes.server = { config, pkgs, lib, ... }: {
    imports = self.baseNixosModules ++ [
      ./services/postgres.nix
      ./services/redis.nix
    ];
    nixpkgs.overlays = [(final: prev: {
      hunt2025 = prev.hunt2025.override {
        withDevDeps = true;
      };
    })];
    hunt2025.site = {
      enable = true;
      db_env = "ci";
    };
    # Explicitly disable e-mails.
    systemd.services.hunt2025.environment.EMAIL_FROM = "";
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
