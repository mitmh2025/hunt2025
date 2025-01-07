{ self }:
final: prev: let
  ocamlPackagesOverlay = ocaml-final: ocaml-prev: {
    ffmpeg-base = rec {
      version = "1.2.0";

      src = final.fetchFromGitHub {
        owner = "savonet";
        repo = "ocaml-ffmpeg";
        rev = "refs/tags/v${version}";
        sha256 = "a5Wvk1LT8gcdlC1KLBtOIyvammvjH7uA8g2x8mCd0RU=";
      };

      inherit (prev.ocamlPackages.ffmpeg) meta;
    };
    saturn_lockfree = ocaml-prev.saturn_lockfree.overrideAttrs (old: let
      version = "0.4.1";
    in {
      inherit version;
      src = final.fetchurl {
        url = "https://github.com/ocaml-multicore/saturn/releases/download/${version}/saturn-${version}.tbz";
        hash = "sha256-tO1aqRGocuogHtE6MYPAMxv5jxbkYjCpttHRxUUpDr0=";
      };
      propagatedBuildInputs = with ocaml-final; [ domain_shims ];
    });
    mem_usage = ocaml-final.callPackage ({ lib, buildDunePackage, fetchFromGitHub }: buildDunePackage rec {
      pname = "mem_usage";
      version = "0.1.1";
      src = fetchFromGitHub {
        owner = "savonet";
        repo = "ocaml-mem_usage";
        rev = "v${version}";
        hash = "sha256-Ig0MZdCt0JTcCxp15E69K2SsoPd7cKr5XocTo25CCzs=";
      };

      minimalOCamlVersion = "4.08";

      meta = with lib; {
        homepage = "https://github.com/savonet/ocaml-mem_usage";
        description = "Cross-platform stats about memory usage";
        license = licenses.mit;
        maintainers = with maintainers; [ quentin ];
      };
    }) {};
  };
in {
  hunt2025 = final.callPackage ../../site {};
  radioman = final.callPackage ../../site/radioman {};
  thingsboard = final.callPackage ./thingsboard {};

  hunt2025-vm-test = final.callPackage ../test.nix { inherit self; };

  piper-voices = final.callPackage ./piper-voices.nix {};

  google-cloud-sdk = prev.google-cloud-sdk.override {
    python = final.python311;
  };

  liquidsoap = let
    version = "2.3.0";
    ocamlPackages = final.ocaml-ng.ocamlPackages_4_14.overrideScope ocamlPackagesOverlay;
    liquidsoap = (prev.liquidsoap.override (old: {
      ocamlPackages = old.ocamlPackages.overrideScope ocamlPackagesOverlay;
    })).overrideAttrs (old: {
      inherit version;
      src = old.src.override ({
        rev = "refs/tags/v${version}";
        hash = "sha256-wNOENkIQw8LWfceI24aa8Ja3ZkePgTIGdIpGgqs/3Ss=";
      });
      buildInputs = with ocamlPackages; old.buildInputs ++  [
        saturn_lockfree
        mem_usage
      ];
      postInstall = ''
        mkdir -p $out/share/liquidsoap-lang/cache
        $out/bin/liquidsoap --cache-stdlib
      '';
    });
  in if final.stdenv.isDarwin then (liquidsoap.override (old: {
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
  }) else liquidsoap;
  aws-credential-process = final.callPackage ./aws-credential-process.nix {};
  mkRadioManifest = final.callPackage ./mk-radio-manifest.nix {};
  hunt-thingsboard = final.callPackage ../../thingsboard {};

  mediamtx = prev.mediamtx.overrideAttrs {
    vendorHash = null;
    src = builtins.fetchGit {
      url = "ssh://git@github.com/mitmh2025/mediamtx.git";
      ref = "quentin/xr-dlrr";
      rev = "d56ef001999e2d310cc8cd9df0f2efaff52ca9ad";
    };
  };

  zammad = prev.zammad.overrideAttrs (old: {
    patches = (old.patches or []) ++ [
      ./zammad/saml-roles.patch
    ];
  });

  radio-stream = final.callPackage ./radio-stream.nix {
    inherit (self.inputs) radio-media;
  };
  radioImage = final.callPackage ./radio-image.nix {};
}
