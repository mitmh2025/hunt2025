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
