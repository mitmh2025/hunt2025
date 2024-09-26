{ mkShell
, icecast
, liquidsoap
, piper-tts
, piper-voices
, janus-gateway
, gst_all_1
, linkFarm
, lib
, pkgs
}:

let
  janusConfigFiles = (lib.evalModules {
    modules = [ ./../infra/services/janus.nix ];
    specialArgs = { inherit pkgs; };
  }).config.services.janus.configFiles;
  janusConfigDir = linkFarm "janus-config" janusConfigFiles;
in mkShell {
  buildInputs = [
    icecast
    liquidsoap
    piper-tts
    janus-gateway
    janus-gateway.doc

    # Video/Audio data composition framework tools like "gst-inspect", "gst-launch" ...
    gst_all_1.gstreamer
    # Common plugins like "filesrc" to combine within e.g. gst-launch
    gst_all_1.gst-plugins-base
    # Specialized plugins separated by quality
    gst_all_1.gst-plugins-good
    gst_all_1.gst-plugins-bad
    gst_all_1.gst-plugins-ugly
  ];

  shellHook = ''
    export JANUS_CONFIG_DIR=${janusConfigDir}
    export JANUS_DOC=${janus-gateway.doc}
    export PIPER_VOICES=${piper-voices}
  '';
}
