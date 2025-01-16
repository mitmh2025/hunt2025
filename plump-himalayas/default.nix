{ python3Packages
}:
python3Packages.buildPythonApplication {
  pname = "plump-himalayas";
  version = "0.0.1";

  src = ./.;

  pyproject = true;
  build-system = with python3Packages; [
    setuptools
  ];

  dependencies = with python3Packages; [
    aiohttp
    pyjwt
    cryptography
    dataclasses-json
  ];
}