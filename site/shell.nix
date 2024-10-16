{ hunt2025
, playwright-driver
, redis
, mkShell
, lib
}:

mkShell rec {
  inputsFrom = [
    hunt2025
  ];

  nativeBuildInputs = [
    playwright-driver.browsers
  ];

  buildInputs = [
    redis
  ];

  passthru.shellEnv = {
    PLAYWRIGHT_BROWSERS_PATH = "${playwright-driver.browsers}";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
  };

  shellHook = lib.concatStringsSep "\n" (lib.mapAttrsToList (k: v: "export ${k}=${v}") passthru.shellEnv);
}
