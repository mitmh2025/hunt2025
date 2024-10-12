{ hunt2025
, playwright-driver
, redis
, mkShell
}:

mkShell {
  inputsFrom = [
    hunt2025
  ];

  nativeBuildInputs = [
    playwright-driver.browsers
  ];

  buildInputs = [
    redis
  ];

  shellHook = ''
    export PLAYWRIGHT_BROWSERS_PATH=${playwright-driver.browsers}
    export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
  '';
}
