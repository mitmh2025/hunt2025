{ liquidsoap
, radio-media
, runCommand
, makeBinaryWrapper
, lib
}: runCommand "radio-stream" {
  src = ../../radioman;
  nativeBuildInputs = [
    makeBinaryWrapper
  ];
  makeWrapperArgs = let
    env = {
      MUSIC_DIR = builtins.path {
        path = "${radio-media}/music";
      };
      QUIXOTIC_SHOE_DIR = builtins.path {
        path = "${radio-media}/quixotic-shoe";
      };
      ICY_BOX_DIR = builtins.path {
        path = "${radio-media}/icy-box";
      };
      LIQ_CACHE_USER_DIR = "$out/lib/liq-cache";
    };
  in builtins.concatLists (lib.mapAttrsToList (name: value: ["--set" name value]) env);
} ''
  mkdir -p $out/bin $out/lib/liq-cache
  makeWrapperArgs+=( --add-flags $src/radio.liq)
  makeWrapper ${lib.getExe liquidsoap} $out/bin/radio-stream ''${makeWrapperArgs[@]}
  $out/bin/radio-stream --cache-only
''