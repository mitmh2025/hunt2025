final: prev: {
  hunt2025 = final.callPackage ../../site {};
  thingsboard = final.callPackage ./thingsboard {};

  hunt2025-vm-test = final.callPackage ../test.nix {};

  piper-voices = final.callPackage ./piper-voices.nix {};

  liquidsoap = if final.stdenv.isDarwin then (prev.liquidsoap.override (old: {
    # Remove optional dependencies that don't build on Darwin.
    runtimePackages = with final; [
      curl
      ffmpeg
      yt-dlp
    ];
    ocamlPackages = old.ocamlPackages.overrideScope (ocaml-final: ocaml-prev: {
      alsa = null;
      alsa-lib = null;
      dssi = null; # Requires ALSA
      inotify = null;
      ctypes-foreign = ocaml-prev.ctypes-foreign.overrideAttrs {
        # One test fails with Wincompatible-function-pointer-types
        doCheck = false;
      };
      # Dune tries to compile C++ code with clang (instead of clang++)
      # https://github.com/ocaml/dune/pull/5185
      soundtouch = null;
      taglib = null;
    });
  })).overrideAttrs (old: {
    nativeBuildInputs = with final; old.nativeBuildInputs ++ [
      # Needs `codesign` to build on Darwin.
      darwin.sigtool
    ];
  }) else prev.liquidsoap;
}
