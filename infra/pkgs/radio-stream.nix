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
      SCHEDULE_JSON = ../../radioman/schedule.json;
      ANNOUNCEMENTS_DIR = builtins.path {
        path = "${radio-media}/announcements";
      };
      MUSIC_DIR = builtins.path {
        path = "${radio-media}/music";
      };
      QUIXOTIC_SHOE_DIR = builtins.path {
        path = "${radio-media}/quixotic-shoe";
      };
      ICY_BOX_DIR = builtins.path {
        path = "${radio-media}/icy-box";
      };
      LIQ_CACHE_MAX_DAYS = "30000";
    };
  in builtins.concatLists (lib.mapAttrsToList (name: value: ["--set" name value]) env);
  meta.mainProgram = "radio-stream";
} ''
  mkdir -p $out/bin $out/lib/liq-cache
  makeWrapperArgs+=(--add-flags $src/radio.liq)
  makeWrapperArgs+=(--set-default LIQ_CACHE_USER_DIR $out/lib/liq-cache)
  makeWrapper ${lib.getExe liquidsoap} $out/bin/radio-stream ''${makeWrapperArgs[@]}
  $out/bin/radio-stream --cache-only
''