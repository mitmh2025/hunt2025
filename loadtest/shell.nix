{ python3
, lib
, pkgs
, mkShell
, stdenv
}:

mkShell {
  buildInputs = with pkgs; [
    poetry
    (python3.withPackages (ps: with ps; [
      #locust
      #har2locust
      ws4py
      pyjwt
    ]))
  ];

  LD_LIBRARY_PATH = "${stdenv.cc.cc.lib}/lib";
}
