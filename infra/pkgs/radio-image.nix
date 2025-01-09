{ dockerTools
, liquidsoap
, radio-stream
, lib
}: dockerTools.buildLayeredImage {
  name = "radio";
  contents = [
    dockerTools.caCertificates
    liquidsoap
    radio-stream
    dockerTools.binSh
  ];
  config = {
    Entrypoint = [
      (lib.getExe radio-stream)
    ];
    Env = [
      "HTTP_PORT=80"
      "STATE_DIRECTORY=/state"
      "LIQ_CACHE_SYSTEM_DIR=/lib/liq-cache"
      "LIQ_CACHE_USER_DIR=/lib/liq-cache"
    ];
    WorkingDir = "/state";
    ExposedPorts = {
      "80/tcp" = {};
    };
    Volumes = {
      "/state/" = {};
    };
  };
}
