{ config, pkgs, lib, ... }:
{
  config = {
    services.mediamtx = {
      enable = true;
      settings = {
        webrtcAdditionalHosts = [
          "things.mitmh2025.com"
        ];
        paths.music = {
          runOnInit = ''
            ${lib.getExe pkgs.ffmpeg} -re -stream_loop -1 -i ${./../../radioman/spy-suite.mp3} -vn -c:a libopus -ar 48000 -b:a 128k -packet_loss 1 -fec true -f rtsp rtsp://localhost:$RTSP_PORT/$MTX_PATH
          '';
          runOnInitRestart = true;
        };
      };
    };
  };
}