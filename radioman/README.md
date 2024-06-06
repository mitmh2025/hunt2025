# Radio server experiments

This directory contains a number of experiments for how we might feed audio to radios.

## Janus

This directory contains a Nix expression that builds a Janus config directory. To enter a shell with the configuration, run

```
nix shell .#radioman
```

To launch Janus, from that shell run

```
python -m http.server -d $JANUS_DOC/share/janus/html/ &
janus -F $JANUS_CONFIG_DIR
```

You can access http://localhost:8000/demos/admin.html for the Janus admin interface (password `hackme`) and  http://localhost:8000/demos/streaming.html for the Janus streaming demo.

### Create a token

Before the streaming demo can connect, you'll need to create an authentication token. You can use the admin demo, or you can use the API request "Create Token" in the [Bruno](https://www.usebruno.com/) project at `./janus-bruno/`. Unfortunately the only way to enter a token in the Streaming demo is to use Chrome's Dev Tools. (Set a breakpoint on the `new Janus` call and uncomment the `//		token: "mytoken",` line with the token you created in the API.)

In the production deployment, we would automate creation of authentication tokens for each team.

### Create a stream

To create a stream, run the "Create Session", "Attach Session", and "Create Stream" requests in Bruno. Sessions have a relatively short life-span, so you'll need to run them in fairly quick succession. The config in the API request expects Opus RTP data on port 1235.

## Generate audio

### FFmpeg

To simultaneously play audio locally and into Janus, run

```
ffmpeg -v +verbose -re -i input.mp3 -f pulse original -c:a libopus -b:a 64k -f rtp rtp://127.0.0.1:1235?buffer_size=8192
```

I use Audacity and `qpwgraph` to record ffmpeg's audio into the left channel and Chrome's audio into the right channel to allow measurement of the round-trip delay. I found that the WebRTC audio actually arrived about 400ms *faster* than the ffmpeg audio, so there must be a large output buffer in ffmpeg's audio output.

### Gstreamer

To simultaneously play audio locally and into Janus, run

```
gst-launch-1.0 filesrc location=input.mp3 ! decodebin ! tee name=decoder ! queue ! audioconvert ! audioresample ! autoaudiosink decoder. ! queue ! audioconvert ! audioresample ! opusenc ! rtpopuspay ! udpsink host=127.0.0.1 port=1235
```

### LiquidSoap

To run LiquidSoap, run

```
liquidsoap server.liq -- -m /path/to/music/
```

You can access http://localhost:8001/telnet to run the `trigger_announcement` command.
