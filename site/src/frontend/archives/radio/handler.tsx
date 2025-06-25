import type { ParamsDictionary } from "express-serve-static-core";
import React from "react";
import { css, styled } from "styled-components";
import manifest from "../../../../dist/radio-manifest.json";
import { MFrac, MI, MN, MRow, Math as MathML } from "../../components/MathML";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import { AuthorsNote } from "../../components/PuzzleLayout";
import { Mono } from "../../components/StyledUI";
import { deviceMax, deviceMin } from "../../utils/breakpoints";
import { type PageRenderer } from "../../utils/renderApp";
import rootUrl from "../../utils/rootUrl";
import assemblyInstructions from "./assets/assembly-instructions.pdf";
import circleSticker from "./assets/circle-sticker.svg";
import enclosureBackPlatePDF from "./assets/enclosure-back-plate.pdf";
import enclosureBackPlateSVG from "./assets/enclosure-back-plate.svg";
import enclosureDialPDF from "./assets/enclosure-dial.pdf";
import enclosureDialSVG from "./assets/enclosure-dial.svg";
import enclosureFabricPDF from "./assets/enclosure-fabric.pdf";
import enclosureFabricSVG from "./assets/enclosure-fabric.svg";
import enclosureFrequencyKnobSTEP from "./assets/enclosure-frequency-knob.step";
import enclosureFrequencyKnobSTL from "./assets/enclosure-frequency-knob.stl";
import enclosureFrontPlatePDF from "./assets/enclosure-front-plate.pdf";
import enclosureFrontPlateSVG from "./assets/enclosure-front-plate.svg";
import enclosureLegBraceSTEP from "./assets/enclosure-leg-brace.step";
import enclosureLegBraceSTL from "./assets/enclosure-leg-brace.stl";
import enclosureLegSTEP from "./assets/enclosure-leg.step";
import enclosureLegSTL from "./assets/enclosure-leg.stl";
import enclosureRingSTEP from "./assets/enclosure-ring.step";
import enclosureRingSTL from "./assets/enclosure-ring.stl";
import enclosureShellSTEP from "./assets/enclosure-shell.step";
import enclosureShellSTL from "./assets/enclosure-shell.stl";
import enclosureTopBraceSTEP from "./assets/enclosure-top-brace.step";
import enclosureTopBraceSTL from "./assets/enclosure-top-brace.stl";
import enclosureVolumeKnobSTEP from "./assets/enclosure-volume-knob.step";
import enclosureVolumeKnobSTL from "./assets/enclosure-volume-knob.stl";
import frontPCBBOM from "./assets/front-pcb-bom.csv";
import frontPCBBottomSVG from "./assets/front-pcb-bottom.svg";
import frontPCBCPL from "./assets/front-pcb-cpl.csv";
import frontPCBGerber from "./assets/front-pcb-gerber.zip";
import frontPCBSchematic from "./assets/front-pcb-schematic.pdf";
import frontPCBTopSVG from "./assets/front-pcb-top.svg";
import hallPCBBOM from "./assets/hall-pcb-bom.csv";
import hallPCBBottomSVG from "./assets/hall-pcb-bottom.svg";
import hallPCBCPL from "./assets/hall-pcb-cpl.csv";
import hallPCBGerber from "./assets/hall-pcb-gerber.zip";
import hallPCBSchematic from "./assets/hall-pcb-schematic.pdf";
import hallPCBTopSVG from "./assets/hall-pcb-top.svg";
import mainPCBBOM from "./assets/main-pcb-bom.csv";
import mainPCBBottomSVG from "./assets/main-pcb-bottom.svg";
import mainPCBCPL from "./assets/main-pcb-cpl.csv";
import mainPCBGerber from "./assets/main-pcb-gerber.zip";
import mainPCBSchematic from "./assets/main-pcb-schematic.pdf";
import mainPCBTopSVG from "./assets/main-pcb-top.svg";
import image from "./assets/radio-render.png";
import triangleSticker from "./assets/triangle-sticker.svg";
import warningSticker from "./assets/warning-sticker.svg";

type Board = { width: number; height: number; url: string };
type BoardHiglight = {
  x: number;
  y: number;
  width: number;
  height: number;
  className: string;
  key?: string;
};

const MainBoardTop: Board = {
  width: 316.38,
  height: 284.18,
  url: mainPCBTopSVG,
};

const MainBoardBottom: Board = {
  width: 316.38,
  height: 284.18,
  url: mainPCBBottomSVG,
};

const FrontBoardTop: Board = {
  width: 218.99,
  height: 122.62,
  url: frontPCBTopSVG,
};

const FrontBoardBottom: Board = {
  width: 218.99,
  height: 122.62,
  url: frontPCBBottomSVG,
};

const HallBoardTop: Board = {
  width: 43.24,
  height: 43.24,
  url: hallPCBTopSVG,
};

const HallBoardBottom: Board = {
  width: 43.24,
  height: 43.24,
  url: hallPCBBottomSVG,
};

const MAIN_BOARD_EXPANSION_COMPONENTS: BoardHiglight[] = [
  {
    x: 126.61,
    y: 51.984,
    width: 144.72,
    height: 70.489,
    className: "feather",
  },
  {
    x: 289.405,
    y: 188.103,
    width: 25.95,
    height: 17.866,
    className: "i2c",
  },
];
const MAIN_BOARD_COMPONENTS: BoardHiglight[] = [
  {
    x: 17.973,
    y: 49.496,
    width: 62.395,
    height: 44.658,
    className: "microcontroller",
  },
  {
    x: 91.82,
    y: 51.644,
    width: 34.653,
    height: 20.79,
    className: "accelerometer",
  },
  {
    x: 109.12,
    y: 21.113,
    width: 50.975,
    height: 27.134,
    className: "fm",
  },
  {
    x: 65.594,
    y: 3.512,
    width: 82.203,
    height: 12.473,
    className: "fm-antenna",
  },
  {
    x: 192.275,
    y: 179.655,
    width: 74.183,
    height: 34.008,
    className: "dac",
  },
  {
    x: 202.075,
    y: 123.96,
    width: 63.364,
    height: 42.003,
    className: "flash",
  },
  {
    x: 61.223,
    y: 150.205,
    width: 74.537,
    height: 65.44,
    className: "pmic",
  },
  {
    x: 273.135,
    y: 2.665,
    width: 13.575,
    height: 12.298,
    className: "photoresistor",
  },
  {
    x: 0,
    y: 168.515,
    width: 39.793,
    height: 33.475,
    className: "usb",
  },
  {
    x: 0.074,
    y: 208.823,
    width: 40.408,
    height: 29.767,
    className: "audio-jack",
  },
  {
    x: 272.105,
    y: 28.636,
    width: 43.995,
    height: 79.121,
    className: "daughterboards",
  },
  {
    x: 33.375,
    y: 120.751,
    width: 26.926,
    height: 21.599,
    className: "misc-connectors",
    key: "toggle-connector",
  },
  {
    x: 285.663,
    y: 110.66,
    width: 30.457,
    height: 71.29,
    className: "misc-connectors",
  },
  {
    x: 291.495,
    y: 214.71,
    width: 22.076,
    height: 12.891,
    className: "touch",
  },
  {
    x: 70.453,
    y: 219.03,
    width: 215.287,
    height: 60.48,
    className: "battery",
  },
  {
    x: 5.702,
    y: 149.248,
    width: 21.147,
    height: 17.17,
    className: "led",
  },
];

const MAIN_BOARD_BOTTOM_COMPONENTS: BoardHiglight[] = [
  {
    x: 172.567,
    y: 4.079,
    width: 80.223,
    height: 11.906,
    className: "fm-antenna",
  },
];

const FRONT_DAUGHTERBOARD_COMPONENTS: BoardHiglight[] = [
  {
    x: 1.413,
    y: 2.84,
    width: 68.76,
    height: 88.58,
    className: "potentiometers",
    key: "frequency-potentiometer",
  },
  {
    x: 148.828,
    y: 2.84,
    width: 68.722,
    height: 88.58,
    className: "potentiometers",
    key: "volume-potentiometer",
  },
  {
    x: 175.72,
    y: 99.492,
    width: 16.077,
    height: 17.17,
    className: "led",
  },
  {
    x: 96.645,
    y: 32.899,
    width: 36.875,
    height: 35.734,
    className: "power",
  },
  {
    x: 79.884,
    y: 90.1,
    width: 65.594,
    height: 31.18,
    className: "connector",
  },
];

const HALL_BOARD_COMPONENTS: BoardHiglight[] = [
  {
    x: 26.653,
    y: 25.488,
    width: 10.769,
    height: 9.434,
    className: "hall-effect",
  },
  {
    x: 1.332,
    y: 12.644,
    width: 12.047,
    height: 17.91,
    className: "connector",
  },
];

const HighlightedBoard = ({
  board,
  highlights,
  style,
  highlightGap = 6,
  highlightStrokeWidth = 2,
}: {
  board: Board;
  highlights: BoardHiglight[];
  style?: React.CSSProperties;
  highlightGap?: number;
  highlightStrokeWidth?: number;
}) => {
  const viewBoxOverage = highlightGap + highlightStrokeWidth;

  return (
    <svg
      viewBox={`-${viewBoxOverage} -${viewBoxOverage} ${board.width + 2 * viewBoxOverage} ${board.height + 2 * viewBoxOverage}`}
      style={style}
    >
      <image
        href={board.url}
        x="0"
        y="0"
        width={board.width}
        height={board.height}
      />
      {highlights.map((h) => (
        /* Need to expand all dimensions by stroke width + padding */
        <rect
          key={h.key ?? h.className}
          className={`highlight ${h.className}`}
          fill="transparent"
          strokeWidth={highlightStrokeWidth}
          stroke="var(--gold-300)"
          x={h.x - highlightGap}
          y={h.y - highlightGap}
          width={h.width + 2 * highlightGap}
          height={h.height + 2 * highlightGap}
        />
      ))}
    </svg>
  );
};

const Command = styled.pre`
  white-space: pre-wrap;
  text-indent: -2rem;
  padding-left: 2rem;
`;

const RadioImage = styled.img`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const WhiteBackgroundImage = styled.img`
  width: 100%;
  padding: 2%;
  background-color: var(--white);
`;

const PCBDiagrams = styled.div<{ $flex?: string }>`
  flex: ${({ $flex }) => $flex ?? "1"};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: var(--black);

  @media ${deviceMax.md} {
    flex-direction: row;
  }

  .diagram {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  svg,
  img {
    width: 100%;
    max-width: 550px;
    height: 100%;
  }
`;

const PCBTable = styled.div<{
  $highlightIds: string[];
}>`
  display: flex;
  position: relative;

  @media ${deviceMax.md} {
    flex-direction: column;
  }

  & > * {
    @media ${deviceMin.lg} {
      position: sticky;
      top: 0;
      align-self: flex-start;
    }
  }

  & ${PCBDiagrams} {
    @media screen {
      position: sticky;
      top: 0;
    }
  }

  ul {
    margin-top: 0;
    flex: 1;
  }

  & .highlight {
    opacity: 0;

    @media print {
      opacity: 1;
    }
  }

  & .description {
    color: var(--gray-300);

    @media print {
      color: var(--black);
    }
  }

  ${({ $highlightIds }) =>
    $highlightIds.map(
      (id) => css`
        &:has(.${id}:hover),
        &:has(.${id}:focus) {
          & .highlight.${id} {
            opacity: 1;
          }
          & .description.${id} {
            color: var(--white);
          }
        }
      `,
    )}
`;

const handler: PageRenderer<ParamsDictionary> = () => {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>The Radio</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <RadioImage src={image} alt="The radio" />

          <AuthorsNote>
            This page contains unredacted spoilers for radio-related puzzles.
          </AuthorsNote>

          <p>
            After kickoff, each on-campus team received a radio as a party favor
            from Robert “Papa” Finster. This radio was used for several puzzles
            over the course of the weekend and included a bevy of both
            off-the-shelf and custom components assembled by us. If you’d like
            more information about how teams interacted with the radio, you can
            see the <a href={`${rootUrl}/radio`}>Radio Instruction Booklet</a>{" "}
            (which was also distributed to teams in physical form).
          </p>

          <p>
            The radio was a complex device, housing three custom PCBs, a
            speaker, a battery, and a collection of buttons and dials inside an
            enclosure made of 3D-printed PLA and lasercut plywood and fabric.
            Included here are complete plans for the radios as we manufactured
            them, although given that we were producing 100+ units, our
            decisions may not translate well to smaller scale production. We
            have included some notes at the bottom of the page around known
            issues with the current design, but have not attempted to correct
            them.
          </p>

          <p>
            While we have included a detailed breakdown of the radio below,
            we’ve made the three projects containing most of the development of
            the radio public (and attempted to clean up our mess a bit in
            anticipation of visitors), in case you would like to jump straight
            to the source:
          </p>

          <ul>
            <li>
              <a
                href="https://oshwlab.com/mitmh2025/radio-v1-0"
                target="_blank"
                rel="noreferrer"
              >
                EasyEDA Pro
              </a>
              : Custom electronics
            </li>
            <li>
              <a
                href="https://cad.onshape.com/documents/19479495b63c79c337072d67/w/74a25c3b3a0344f179dbe647/e/01c785df928963556607ff9d"
                target="_blank"
                rel="noreferrer"
              >
                Onshape
              </a>
              : Enclosure and mechanical design
            </li>
            <li>
              <a
                href="https://github.com/mitmh2025/radio"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              : Firmware
            </li>
          </ul>

          <h2>Table of Contents</h2>

          <ul style={{ marginTop: 0 }}>
            <li>
              <a href="#hacking">Hacking Your Radio</a>
            </li>
            <li>
              <a href="#electronics">Custom Electronics</a>
            </li>
            <li>
              <a href="#enclosure">Enclosure</a>
            </li>
            <li>
              <a href="#firmware">Firmware and Software</a>
            </li>
            <li>
              <a href="#parts">Parts</a>
            </li>
            <li>
              <a href="#assembly">Assembly</a>
            </li>
            <li>
              <a href="#issues">Known Issues</a>
            </li>
          </ul>

          <hr />

          <h2 id="hacking">Hacking Your Radio</h2>

          <p>
            If you still have a radio from Mystery Hunt, here are a few tips and
            tricks on getting continued use out of it.
          </p>

          <h3>Serial Console</h3>

          <p>
            The ESP32-S3 microcontroller has built-in support for a USB-based
            serial console. However, in order to prevent teams from causing
            problems with their radio during Hunt, it is disabled by default.
            This means the radio does not appear as a USB device (other than
            briefly at power-on).
          </p>

          <p>
            To temporarily enable the built-in serial console (until the next
            time the radio firmware restarts):
          </p>

          <ol>
            <li>Turn the radio off.</li>
            <li>
              While holding down both the triangle and circle button, turn the
              radio back on.
            </li>
            <li>
              You should see a brief orange flash from the status LED (next to
              the volume dial). Make sure to continue holding the buttons until
              you see this.
            </li>
          </ol>

          <p>
            You should then be able to plug the radio into a computer and
            connect to it. You’ll need to open a terminal and use a serial
            console program to do so. If that’s not something you’re familiar
            with, you can try following Adafruit’s guides for{" "}
            <a href="https://learn.adafruit.com/adafruit-esp32-s3-feather/advanced-serial-console-on-windows">
              Windows
            </a>
            ,{" "}
            <a href="https://learn.adafruit.com/adafruit-esp32-s3-feather/advanced-serial-console-on-mac-and-linux">
              macOS
            </a>{" "}
            (although you will need to use <code>/dev/cu.*</code> instead of{" "}
            <code>/dev/tty.*</code>) , or{" "}
            <a href="https://learn.adafruit.com/adafruit-esp32-s3-feather/advanced-serial-console-on-linux">
              Linux
            </a>
            . Those instructions aren’t written specifically for the radio, but
            they are for a similar board.
          </p>

          <p>
            If you’ve successfully connected, when you press “Enter”, you should
            see a prompt that says “<code>radio&gt;</code>”. It’s OK if it
            immediately scrolls off screen (your radio is probably quite unhappy
            to not be in range of MIT’s WiFi); log messages won’t interfere with
            your console commands. The process can be somewhat fiddly,
            especially if the firmware crashes for some reason, so if you don’t
            see a prompt, then try repeating the process.
          </p>

          <p>
            Once this is done, you can permanently enable the serial console by
            running the following command:
          </p>

          <Command>nvs-set radio:tbattrs en_console u8 1</Command>

          <p>
            This will eliminate the need to do the two-button boot going
            forward.
          </p>

          <p>
            (This command won’t print anything if it succeeds; you can tell if
            it worked if the radio prints the “<code>radio&gt;</code>” prompt
            again. The command works by poisoning the radio’s local
            configuration cache, which would normally be overwritten by our
            ThingsBoard management server, but since that’s now been
            decommissioned, local updates will persist.)
          </p>

          <h3>Useful Commands</h3>

          <p>To enable all stations made available by puzzle unlock:</p>

          <ul>
            <li>
              <code>nvs-set radio:tbattrs en_knocks u8 1</code>
              <br />
              To allow ”activating” Station π as instructed by{" "}
              <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
                Songs on the Radio
              </a>{" "}
              (but does not, on its own, enable the station)
            </li>
            <li>
              <code>nvs-set radio:tbattrs en_funaround u8 1</code>
              <br />
              To enable the station for{" "}
              <a href={`${rootUrl}/puzzles/the_thief`}>The Thief</a> (although
              this won’t accomplish much without our campus BLE beacon
              deployment)
            </li>
            <li>
              <code>nvs-set radio:tbattrs en_numbers u8 1</code>
              <br />
              To enable the station for{" "}
              <a href={`${rootUrl}/puzzles/can_do_transmissions`}>
                Can-Do Transmissions
              </a>
            </li>
            <li>
              <code>nvs-set radio:tbattrs en_rickroll u8 1</code>
              <br />
              To enable the station for{" "}
              <a href={`${rootUrl}/puzzles/given_up_blacklight`}>Given Up</a>,
              as experienced under blacklight (though again without our BLE
              beacons this won’t accomplish much)
            </li>
          </ul>

          <p>
            Replacing <code>1</code> with <code>0</code> will re-lock those
            stations (once you turn the radio off and on again).
          </p>

          <p>
            The state of{" "}
            <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
              Songs on the Radio
            </a>{" "}
            is controlled by two commands:
          </p>

          <ul>
            <li>
              <code>nvs-set radio:pi enabled u8 &lt;0|1&gt;</code>
              <br />
              To enable (1) or disable (0) Station π (separately from enabling
              or disabling the knock activation step)
            </li>
            <li>
              <code>pi-set-stage &lt;0|1|2|3|4|5&gt;</code>
              <br />
              To set the current level for Songs on the Radio. Stages are
              0-indexed, so setting to <code>0</code> corresponds to the first
              level (“Mary Had a Little Lamb”), while setting to <code>5</code>{" "}
              corresponds to having completed all songs.
            </li>
          </ul>

          <p>
            If you’d like, you can use the console to configure your radio to
            connect to non-MIT wifi, but given that we’ve decommissioned all of
            our radio infrastructure, this is only likely to be useful if you
            plan to setup similar infrastructure yourself. Note that both
            commands support basic shell-quoting but only ASCII characters.
          </p>

          <ul>
            <li>
              <code>nvs-set radio:wifi alt_ssid str &lt;SSID&gt;</code>
              <br />
              To set the SSID of the wifi network.
            </li>
            <li>
              <code>nvs-set radio:wifi alt_password str &lt;PASSWORD&gt;</code>
              <br />
              To set the password for the wifi network, if required, or
              <br />
              <code>nvs-rm radio:wifi alt_password</code>
              <br />
              If no password is required
            </li>
          </ul>

          <p>
            There is a vestigial <code>wifi-set-alt-network</code> command, but
            it does not seem to work.
          </p>

          <p>
            Finally, if you would like to try to stream music to your radio, it
            supports a 48000kHz, mono Opus stream over WebRTC which must be
            negotiated using{" "}
            <a href="https://www.ietf.org/archive/id/draft-murillo-whep-03.html">
              WHEP
            </a>
            . If you’re able to arrange for such a stream, you can set the WHEP
            URL to use for signaling with:
          </p>

          <Command>nvs-set radio:tbattrs whep_url str &lt;URL&gt;</Command>

          <h3>Firmware Updates</h3>

          <p>
            Once you’ve enabled the USB serial console, it should be possible to
            flash new firmware using either the standard{" "}
            <a href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/index.html">
              ESP-IDF
            </a>{" "}
            or{" "}
            <a href="https://docs.espressif.com/projects/arduino-esp32/en/latest/">
              Arduino
            </a>{" "}
            tools targeting the ESP32-S3. However, if you run into issues, you
            can also force the microcontroller into Joint Download Boot mode by
            holding down the button labeled <code>PROG</code> (connected to
            GPIO0) while pressing and releasing the button labeled{" "}
            <code>RST</code>.
          </p>

          <h3>Hardware Expandability</h3>

          <p>
            If you want to enhance your radio with additional capabilities,
            there are two expansion options built into the main PCB (hover or
            tap to highlight):
          </p>

          <PCBTable
            $highlightIds={MAIN_BOARD_EXPANSION_COMPONENTS.map(
              (h) => h.className,
            )}
          >
            <PCBDiagrams $flex="2">
              <div className="diagram">
                <HighlightedBoard
                  board={MainBoardTop}
                  highlights={MAIN_BOARD_EXPANSION_COMPONENTS}
                />
              </div>
            </PCBDiagrams>
            <ul>
              <li className="description feather">
                <strong>Adafruit Feather</strong>: This area of the PCB contains
                a footprint compatible with the{" "}
                <a href="https://learn.adafruit.com/adafruit-feather/feather-specification">
                  Adafruit Feather Specification
                </a>
                . It should be possible to use most FeatherWings of standard
                dimensions with the radio. Check the silkscreen for exact pin
                assignments; they are not the same as (e.g.) Adafruit’s ESP32-S3
                Feather, and not all pins are connected.
              </li>

              <li className="description i2c">
                <strong>Stemma QT / Qwiic</strong>: This area of the PCB
                contains an additional JST-PH 4-pin connector, compatible with{" "}
                <a href="https://learn.adafruit.com/introducing-adafruit-stemma-qt/technical-specs">
                  Adafruit STEMMA QT
                </a>{" "}
                and <a href="https://www.sparkfun.com/qwiic">SparkFun Qwiic</a>,
                which can be used for adding additional I²C peripherals.
              </li>
            </ul>
          </PCBTable>

          <hr />

          <h2 id="electronics">Custom Electronics</h2>

          <p>
            The core electronics of the radio consisted of 3 custom-designed
            PCBs: the main board, with most functionality, and two
            daughterboards — one attached to the front of the enclosure
            containing the two potentiometers and status LED, and the other
            attached to the rear containing the magnet sensor for{" "}
            <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
              Songs on the Radio
            </a>
            .
          </p>

          <p>
            We’ve made the{" "}
            <a href="https://oshwlab.com/mitmh2025/radio-v1-0">
              EasyEDA Pro project
            </a>{" "}
            public, but have also included annotated schematics and Gerber (PCB
            layout) files below, along with BOM and CPL files in a format that
            JLCPCB will accept:
          </p>

          <h3 id="main-pcb">Main Board</h3>

          <p>(Hover or tap to highlight)</p>

          <PCBTable
            $highlightIds={MAIN_BOARD_COMPONENTS.map((h) => h.className)}
          >
            <PCBDiagrams $flex="1">
              <div className="diagram">
                <HighlightedBoard
                  board={MainBoardTop}
                  highlights={MAIN_BOARD_COMPONENTS}
                />
                <span>Top</span>
              </div>
              <div className="diagram">
                <HighlightedBoard
                  board={MainBoardBottom}
                  highlights={MAIN_BOARD_BOTTOM_COMPONENTS}
                />
                <span>Bottom</span>
              </div>
            </PCBDiagrams>
            <ul>
              <li className="description microcontroller">
                <strong>Microcontroller</strong>: An ESP32-S3-MINI-N4R2 is the
                primary processor.
              </li>
              <li className="description dac">
                <strong>Audio DAC and amplifier</strong>: The TAS2505 is used
                for decoding I2S audio data to analog and amplifying both
                incoming digital audio from the microcontroller and analog audio
                from the FM tuner.
              </li>
              <li className="description fm">
                <strong>FM tuner</strong>: An SI4702 with a custom-tuned antenna
                is used for receiving FM broadcasts.
              </li>
              <li className="description fm-antenna">
                <strong>FM antenna</strong>: The FM antenna design is based on “
                <a
                  href="https://ieeexplore.ieee.org/document/6238213"
                  target="_blank"
                  rel="noreferrer"
                >
                  A miniaturized FM chip antennas for handset devices
                </a>
                ”, but with slightly changed dimensions based on our testing of
                optimal reception
              </li>
              <li className="description flash">
                <strong>Additional flash storage</strong>: Two W25Q128JV chips
                provide 16MB of storage each (or 32MB total), used for
                pre-loaded audio files, used whenever latency was critical or
                wifi was deemed too unreliable.
              </li>
              <li className="description pmic">
                <strong>Battery and power management</strong>: The IP5306 is
                used for switching between USB and battery power and charging
                the battery.
              </li>
              <li className="description accelerometer">
                <strong>Accelerometer</strong>: The MMA8451Q accelerometer is
                used for knock and tilt detection for Songs on the Radio.
              </li>
              <li className="description photoresistor">
                <strong>Photoresistor</strong>: This photoresistor is used for
                one of the note inputs for Songs on the Radio.
              </li>
              <li className="description led">
                <strong>Battery LED</strong>: An RGB LED (visible through the
                side of the enclosure) is used to indicate the current battery
                level and status. It is a WS2812 (NeoPixel) LED, meaning that it
                can be controlled with a single serial data line and
                daisy-chained to the LED on the front daughterboard.
              </li>
              <li className="description usb">
                <strong>USB connector</strong>: A USB-C connector is used for
                power, battery charging, and communication with the
                microcontroller.
              </li>
              <li className="description audio-jack">
                <strong>3.5mm audio jack</strong>: This jack is used for audio
                output (and additionally as an input for Songs on the Radio).
              </li>
              <li className="description daughterboards">
                <strong>Daughterboard connectors</strong>: A JST XH (2.54mm)
                7-pin connector connects to the front daughterboard, and a JST
                SH (1.0mm) 4-pin connector is used to connect the I²C bus to the
                magnet daughterboard.
              </li>
              <li className="description misc-connectors">
                <strong>Button, toggle, speaker connectors</strong>: JST XH
                (2.54mm) 2-pin connectors are used to connect the two buttons,
                the toggle switch, and the speaker.
              </li>
              <li className="description touch">
                <strong>Touch sensor</strong>: A wire soldered to this pad is
                connected to the carriage bolts in the radio’s feet for one of
                the note inputs for Songs on the Radio.
              </li>
              <li className="description battery">
                <strong>Battery</strong>: The radios included an 18650
                lithium-ion cell.
              </li>
            </ul>
          </PCBTable>

          <iframe
            src={`${mainPCBSchematic}#view=FitV&toolbar=0`}
            title="Main PCB Schematic"
            style={{ width: "100%", aspectRatio: Math.SQRT2 }}
          />

          <ul>
            <li>
              <a href={mainPCBSchematic} target="_blank" rel="noreferrer">
                Schematics
              </a>
            </li>
            <li>
              <a href={mainPCBGerber} target="_blank" rel="noreferrer">
                Gerber files
              </a>
            </li>
            <li>
              <a href={mainPCBBOM} target="_blank" rel="noreferrer">
                Bill of Materials
              </a>
            </li>
            <li>
              <a href={mainPCBCPL} target="_blank" rel="noreferrer">
                Component Placement List
              </a>
            </li>
          </ul>

          <h3 id="front-pcb">Front Daughterboard</h3>

          <p>
            The front daughterboard held the volume and frequency potentiometers
            and the front status indicator LED, all of which were connected back
            to the main PCB via a JST XH (2.54mm) 7-pin connector. Using a
            daughterboard simplified assembly (since the forced alignment made
            it impossible to mis-solder the potentiometer leads).
          </p>

          <PCBTable
            $highlightIds={FRONT_DAUGHTERBOARD_COMPONENTS.map(
              (h) => h.className,
            )}
          >
            <PCBDiagrams $flex="1">
              <div className="diagram">
                <HighlightedBoard
                  board={FrontBoardTop}
                  highlights={FRONT_DAUGHTERBOARD_COMPONENTS}
                />
                <span>Top</span>
              </div>
              <div className="diagram">
                <img
                  src={FrontBoardBottom.url}
                  alt="Bottom layer of the front daughterboard PCB"
                />
                <span>Bottom</span>
              </div>
            </PCBDiagrams>
            <ul>
              <li className="description potentiometers">
                <p>
                  <strong>Potentiometers</strong>: Two 10kΩ linear
                  switch-potentiometers are used to control the frequency and
                  volume (and turn the radio on and off). A switch-potentiometer
                  for volume + power helped to reduce the number of interactable
                  components. Reusing the same switch-potentiometer for the
                  frequency dial was necessary to ensure that both protruded by
                  the same distance from the daughterboard (allowing them to be
                  mounted flush to the front plate of the radio).
                </p>
                <p>
                  While the rest of the board was assembled by JLCPCB, these
                  potentiometers were soldered as part of assembly by D&amp;M.
                </p>
              </li>
              <li className="description led">
                <strong>Status LED</strong>: An RGB LED is used to indicate
                whether the radio is tuned to a valid station (and additionally,
                to indicate “shift” status for{" "}
                <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
                  Songs on the Radio
                </a>
                ). It is a WS2812 (NeoPixel) LED, meaning that it can be
                controlled with a single serial data line and daisy-chained
                behind the LED on the main PCB.
              </li>
              <li className="description power">
                <strong>Power management</strong>: The ESP32-S3 ADC can only
                distinguish voltages between 0V and roughly 3.1V. Additionally,
                to minimize the number of connectors required in the JST XH
                connector, only a 5V power rail is provided (as required for the
                LED). This AMS1117-ADJ-based LDO regulator converts the 5V rail
                to 3.06V, which is used as the maximum voltage for the two
                potentiometers.
              </li>
              <li className="description connector">
                <strong>Connector</strong>: Since through-hole soldering adds
                additional manufacturing cost, the daughterboard utilizes a
                surface-mount XH connector to connect to the main board.
              </li>
            </ul>
          </PCBTable>

          <iframe
            src={`${frontPCBSchematic}#view=FitV&toolbar=0`}
            title="Front PCB Schematic"
            style={{ width: "100%", aspectRatio: Math.SQRT2 }}
          />

          <ul>
            <li>
              <a href={frontPCBSchematic} target="_blank" rel="noreferrer">
                Schematics
              </a>
            </li>
            <li>
              <a href={frontPCBGerber} target="_blank" rel="noreferrer">
                Gerber files
              </a>
            </li>
            <li>
              <a href={frontPCBBOM} target="_blank" rel="noreferrer">
                Bill of Materials
              </a>
            </li>
            <li>
              <a href={frontPCBCPL} target="_blank" rel="noreferrer">
                Component Placement List
              </a>
            </li>
          </ul>

          <h3 id="hall-pcb">Hall Effect Daughterboard</h3>

          <p>
            This very small daughterboard (measuring only 15mm×15mm) contained
            an I²C hall effect sensor, used by{" "}
            <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
              Songs on the Radio
            </a>{" "}
            to detect the presence of a magnet. It was connected to the main PCB
            via a JST SH (1.0mm) 4-pin connector, compatible with both the
            Adafruit STEMMA QT and SparkFun Qwiic standards.
          </p>

          <PCBTable
            $highlightIds={HALL_BOARD_COMPONENTS.map((h) => h.className)}
          >
            <PCBDiagrams $flex="1">
              <div className="diagram">
                <HighlightedBoard
                  style={{ width: "50%" }}
                  board={HallBoardTop}
                  highlights={HALL_BOARD_COMPONENTS}
                  highlightGap={3}
                  highlightStrokeWidth={1}
                />
                <span>Top</span>
              </div>
              <div className="diagram">
                <HighlightedBoard
                  style={{ width: "50%" }}
                  board={HallBoardBottom}
                  highlights={[]}
                  highlightGap={3}
                  highlightStrokeWidth={1}
                />
                <span>Bottom</span>
              </div>
            </PCBDiagrams>
            <ul>
              <li className="description hall-effect">
                <strong>Hall-effect sensor</strong>: This I²C hall-effect sensor
                is used to measure magnetic flux density. It can measure in
                three dimensions, but the radio computes the total magnitude and
                uses that to detect the presence or absence of a magnet.
              </li>
              <li className="description connector">
                <strong>Connector</strong>: This JST SH connector was chosen for
                compatibility with existing standards for I²C peripherals.
              </li>
            </ul>
          </PCBTable>

          <iframe
            src={`${hallPCBSchematic}#view=FitV&toolbar=0`}
            title="Hall PCB Schematic"
            style={{ width: "100%", aspectRatio: Math.SQRT2 }}
          />

          <ul>
            <li>
              <a href={hallPCBSchematic} target="_blank" rel="noreferrer">
                Schematics
              </a>
            </li>
            <li>
              <a href={hallPCBGerber} target="_blank" rel="noreferrer">
                Gerber files
              </a>
            </li>
            <li>
              <a href={hallPCBBOM} target="_blank" rel="noreferrer">
                Bill of Materials
              </a>
            </li>
            <li>
              <a href={hallPCBCPL} target="_blank" rel="noreferrer">
                Component Placement List
              </a>
            </li>
          </ul>

          <h3>Manufacturing</h3>

          <p>
            We don’t necessarily advise attempting to make your own PCBs for the
            radio — the per-board cost at low volume will be substantial — but
            if you want to do so anyway, our boards were manufactured and
            assembled by <a href="https://jlcpcb.com/">JLCPCB</a> with the
            following options:
          </p>

          <dl>
            <dt>Base Material</dt>
            <dd>FR-4</dd>
            <dt>Layers</dt>
            <dd>4 (for main board), 2 (for both daughterboards)</dd>
            <dt>PCB Thickness</dt>
            <dd>1.6mm</dd>
            <dt>PCB Color</dt>
            <dd>Black</dd>
            <dt>Silkscreen</dt>
            <dd>White</dd>
            <dt>Material Type</dt>
            <dd>FR4-Standard TG 135-140</dd>
            <dt>Via Covering</dt>
            <dd>Untented</dd>
            <dt>Surface Finish</dt>
            <dd>HASL (with lead)</dd>
            <dt>Outer Copper Weight</dt>
            <dd>1 oz</dd>
            <dt>Inner Copper Weight</dt>
            <dd>0.5 oz</dd>
          </dl>

          <p>
            For the main boards, we additionally opted for JLCPCB’s “standard,”
            rather than “economic,” assembly due to the specific combination of
            options required; both daughterboards utilized “economic” assembly.
            For our large production runs, it was most cost-effective to
            panelize both daughterboards in a 3×3 grid with stamp hole (“mouse
            bite”) separation, but the Gerber files above are not panelized.
          </p>

          <hr />

          <h2 id="enclosure">Enclosure</h2>

          <p>
            The radio enclosure consisted of approximately 19 custom pieces, not
            counting parts which were ready for use as-acquired. The top,
            bottom, and sides consisted of a single 3D-printed “shell”. The
            front and rear facades were made from lasercut plywood, with
            lasercut fabric covering the front face (and hiding the screws used
            to attach the speaker and main PCB). The legs were 3D-printed (with
            holes to accommodate carriage bolts for the touch sensors). Two
            small 3D-printed brackets held the top of the lasercut front facade
            against the front of the shell, while 3D-printed leg braces aligned
            the legs with the shell and braced the bottom of the facade. The
            frequency dial was made from lasercut two-color engraving acrylic
            and covered with a 3D-printed ”ring”, the two knobs were 3D-printed,
            and the stickers for the two buttons were cut from vinyl using a
            cutting plotter. Finally, a custom warning vinyl sticker was affixed
            to the rear facade to warn users about breaking or altering their
            radio.
          </p>

          <p>
            The radio enclosure was primarily designed in OnShape. If you’d like
            to see how the parts below fit together, export parts to your own
            specifications, or just explore the design, we have made{" "}
            <a href="https://cad.onshape.com/documents/19479495b63c79c337072d67/w/74a25c3b3a0344f179dbe647/e/01c785df928963556607ff9d">
              the CAD model
            </a>{" "}
            public.
          </p>

          <h3 id="enclosure-shell">Shell</h3>

          <p>
            The radio shell was printed in black, basic PLA. In the interest of
            speed, we used a 0.6mm nozzle on a Prusa MK3S with a smooth plate.
            The model is designed to print accurately without supports with the
            front face down, and should print fine in that configuration with
            standard nozzles on most 3D printers.
          </p>

          <p>
            In addition to the aesthetic elements, the shell includes ribs
            across the top and bottom to limit flex (which also double as
            locations for screwing in the rear facade); alignment notches for
            the ring; the “I/O shield” for the USB jack, audio jack, and battery
            LED; and an inset to allow the rear facade to sit flush against the
            rear of the shell. (The front facade is held in place against the
            front surface of the shell by the top braces, and leg brace detailed
            below.)
          </p>

          <div
            className="radio-stl-render"
            data-url={enclosureShellSTL}
            data-aspect-ratio={2}
            data-distance={1.5}
          />

          <ul>
            <li>
              <a href={enclosureShellSTL} target="_blank" rel="noreferrer">
                STL
              </a>
            </li>
            <li>
              <a href={enclosureShellSTEP} target="_blank" rel="noreferrer">
                STEP
              </a>
            </li>
          </ul>

          <h3 id="enclosure-legs">Legs</h3>

          <p>
            The legs were printed upside-down using Hatchbox’s{" "}
            <a
              href="https://www.hatchbox3d.com/collections/pla-1-75mm/products/3d-pla-1kg1-75-shny-brnz"
              target="_blank"
              rel="noreferrer"
            >
              metallic finish bronze PLA filament
            </a>{" "}
            (the same filament as{" "}
            <a href={`${rootUrl}/puzzles/educational_rite_of_passage`}>
              Educational Rite of Passage
            </a>
            , but at a lower temperature for a more brushed finish).
          </p>

          <div
            className="radio-stl-render"
            data-url={enclosureLegSTL}
            data-aspect-ratio={3}
            data-latitude={-Math.PI / 4}
            data-longitude={Math.PI / 4}
          />

          <ul>
            <li>
              <a href={enclosureLegSTL} target="_blank" rel="noreferrer">
                STL
              </a>
            </li>
            <li>
              <a href={enclosureLegSTEP} target="_blank" rel="noreferrer">
                STEP
              </a>
            </li>
          </ul>

          <h3 id="enclosure-leg-braces">Leg Braces</h3>

          <p>
            These parts were printed in PLA (using whatever color was available,
            since they are internal). Each radio contained two of these braces,
            which aligned the legs. For the front legs, the brace also held the
            front facade against the front interior of the shell.
          </p>

          <div
            className="radio-stl-render"
            data-url={enclosureLegBraceSTL}
            data-aspect-ratio={3}
            data-latitude={Math.PI / 4}
            data-longitude={Math.PI / 4}
          />

          <ul>
            <li>
              <a href={enclosureLegBraceSTL} target="_blank" rel="noreferrer">
                STL
              </a>
            </li>
            <li>
              <a href={enclosureLegBraceSTEP} target="_blank" rel="noreferrer">
                STEP
              </a>
            </li>
          </ul>

          <h3 id="enclosure-top-braces">Top Braces</h3>

          <p>
            These parts were printed in PLA (again, using whatever color was
            available). The front facade was sandwiched between the shell and
            these braces, which were then screwed into the shell to hold the top
            of the front facade in place. (The angled side of the brace mates
            with a similarly angled protrusion in the shell, while the rounded
            cutout on the edges aligns with the support ribs of the shell.)
          </p>

          <div
            className="radio-stl-render"
            data-url={enclosureTopBraceSTL}
            data-aspect-ratio={3}
            data-latitude={Math.PI / 4}
            data-longitude={Math.PI / 4}
          />

          <ul>
            <li>
              <a href={enclosureTopBraceSTL} target="_blank" rel="noreferrer">
                STL
              </a>
            </li>
            <li>
              <a href={enclosureTopBraceSTEP} target="_blank" rel="noreferrer">
                STEP
              </a>
            </li>
          </ul>

          <h3 id="enclosure-ring">Ring</h3>

          <p>
            The ring was printed in black, basic PLA with supports (rounded side
            facing up). The ring was attached to the shell with super glue. It
            secured the frequency dial in place, added depth to the front of the
            radio, and added physical stops for the frequency knob (important
            because that potentiometer was also a switch-potentiometer, and we
            didn’t want it to be possible to turn it “off” accidentally).
          </p>

          <div
            className="radio-stl-render"
            data-url={enclosureRingSTL}
            data-aspect-ratio={2}
            data-latitude={0}
            data-longitude={0}
          />

          <ul>
            <li>
              <a href={enclosureRingSTL} target="_blank" rel="noreferrer">
                STL
              </a>
            </li>
            <li>
              <a href={enclosureRingSTEP} target="_blank" rel="noreferrer">
                STEP
              </a>
            </li>
          </ul>

          <h3 id="enclosure-knobs">Volume and Frequency Knobs</h3>

          <p>
            Both knobs were printed in black, basic PLA, and were designed to
            fit onto the shafts of the potentiometers. Both were designed to
            press-fit (the volume knob somewhat more tightly than the frequency
            knob) with no inherent alignment with the potentiometer shafts (a
            calibration process ensured that the frequency range did not exceed
            the measurable range of the potentiometers).
          </p>

          <div style={{ display: "flex" }}>
            <div
              style={{ width: "50%" }}
              className="radio-stl-render"
              data-url={enclosureVolumeKnobSTL}
              data-aspect-ratio={2}
              data-latitude={-Math.PI / 4}
              data-longitude={0}
              data-distance={4}
              data-hide-instructions={true}
            />
            <div
              style={{ width: "50%" }}
              className="radio-stl-render"
              data-url={enclosureFrequencyKnobSTL}
              data-aspect-ratio={2}
              data-latitude={-Math.PI / 4}
              data-longitude={0}
              data-hide-instructions={true}
            />
          </div>

          <ul>
            <li>
              <a href={enclosureVolumeKnobSTL} target="_blank" rel="noreferrer">
                Volume Knob STL
              </a>
            </li>
            <li>
              <a
                href={enclosureVolumeKnobSTEP}
                target="_blank"
                rel="noreferrer"
              >
                Volume Knob STEP
              </a>
            </li>
            <li>
              <a
                href={enclosureFrequencyKnobSTL}
                target="_blank"
                rel="noreferrer"
              >
                Frequency Knob STL
              </a>
            </li>
            <li>
              <a
                href={enclosureFrequencyKnobSTEP}
                target="_blank"
                rel="noreferrer"
              >
                Frequency Knob STEP
              </a>
            </li>
          </ul>

          <h3 id="enclosure-front">Front Faceplate</h3>

          <p>
            The front faceplate was lasercut from 1/8” plywood. Red lines should
            be fully cut through; blue lines should be scored.
          </p>

          <p>
            Note that line widths have been adjusted for legibility; if your
            lasercutter requires specific line widths for cuts vs. engravings,
            make sure to check and adjust as needed.
          </p>

          <WhiteBackgroundImage
            src={enclosureFrontPlateSVG}
            alt="Lasercut template for the front faceplate"
          />

          <ul>
            <li>
              <a href={enclosureFrontPlateSVG} target="_blank" rel="noreferrer">
                SVG
              </a>
            </li>
            <li>
              <a href={enclosureFrontPlatePDF} target="_blank" rel="noreferrer">
                PDF
              </a>
            </li>
          </ul>

          <h3 id="enclosure-back">Back Faceplate</h3>

          <p>
            The back faceplate was lasercut from 1/8” plywood. Again, red lines
            should be fully cut through, and blue lines should be scored. Areas
            with black fill should be engraved.
          </p>

          <p>
            As with the front faceplate above, line widths have been adjusted
            for legibility; if your lasercutter requires specific line widths
            for cuts vs. engravings, make sure to check and adjust as needed.
          </p>

          <WhiteBackgroundImage
            src={enclosureBackPlateSVG}
            alt="Lasercut template for the back faceplate"
          />

          <ul>
            <li>
              <a href={enclosureBackPlateSVG} target="_blank" rel="noreferrer">
                SVG
              </a>
            </li>
            <li>
              <a href={enclosureBackPlatePDF} target="_blank" rel="noreferrer">
                PDF
              </a>
            </li>
          </ul>

          <h3 id="enclosure-fabric">Front Plate Fabric Covering</h3>

          <p>
            The fabric covering on the front faceplate was lasercut from{" "}
            <a href="https://mytextilefabric.com/products/vintage-linen?variant=30149378900034">
              Vintage Linen
            </a>{" "}
            fabric in the color Oatmeal. The burlap-style fabric was important
            for appearances, but it also needed to be a tight enough weave to
            not be completely see-through. (As always with lasercutters, make
            sure not to use fabrics with any PVC or other unsafe materials.)
          </p>

          <p>
            Once again, line widths have been adjusted for legibility; if your
            lasercutter requires specific line widths for cuts vs. engravings,
            make sure to check and adjust as needed.
          </p>

          <WhiteBackgroundImage
            src={enclosureFabricSVG}
            alt="Lasercut template for the front fabric"
          />

          <ul>
            <li>
              <a href={enclosureFabricSVG} target="_blank" rel="noreferrer">
                SVG
              </a>
            </li>
            <li>
              <a href={enclosureFabricPDF} target="_blank" rel="noreferrer">
                PDF
              </a>
            </li>
          </ul>

          <h3 id="enclosure-dial">Frequency Dial</h3>

          <p>
            The frequency dial was lasercut from{" "}
            <a href="https://modifiedsupply.com/products/gemini-duets-contours-020-flexible-engraving-plastic-white-black?variant=42585825738992">
              0.020” adhesive-backed two-color white-to-black engraving plastic
            </a>
            . In the design files, black areas should be raster-engraved, and
            red lines should be fully cut through. Our lasercutter required
            significant amounts of calibration in order to ensure that the
            engraved lines looked sufficiently clean, and the resulting dials
            needed washing to remove residue from the white sections.
          </p>

          <WhiteBackgroundImage
            src={enclosureDialSVG}
            alt="Lasercut template for the frequency dial"
            style={{ maxWidth: "600px" }}
          />

          <ul>
            <li>
              <a href={enclosureDialSVG} target="_blank" rel="noreferrer">
                SVG
              </a>
            </li>
            <li>
              <a href={enclosureDialPDF} target="_blank" rel="noreferrer">
                PDF
              </a>
            </li>
          </ul>

          <h3 id="enclosure-button-stickers">Button Stickers</h3>

          <p>
            These two stickers, used to distinguish between the two buttons on
            the front of the radio, were cut from adhesive-backed white vinyl
            using a cutting plotter (such as a Cricut).
          </p>

          <div style={{ display: "flex", gap: "2rem" }}>
            <div style={{ width: "50%", maxWidth: "2cm" }}>
              <img
                style={{
                  background: "var(--white)",
                  padding: "10%",
                  width: "100%",
                }}
                src={triangleSticker}
                alt="Triangle sticker template"
              />
            </div>
            <div style={{ width: "50%", maxWidth: "2cm" }}>
              <img
                style={{
                  background: "var(--white)",
                  padding: "10%",
                  width: "100%",
                }}
                src={circleSticker}
                alt="Circle sticker template"
              />
            </div>
          </div>

          <ul>
            <li>
              <a href={triangleSticker} target="_blank" rel="noreferrer">
                Triangle sticker SVG
              </a>
            </li>
            <li>
              <a href={circleSticker} target="_blank" rel="noreferrer">
                Circle sticker SVG
              </a>
            </li>
          </ul>

          <h3 id="enclosure-warning-sticker">Warning Sticker</h3>

          <p>
            The right side of the back faceplate included a custom 3”
            glossy-finished vinyl sticker imploring teams to be careful with
            their radios. A sticker featuring a unique serial number and a
            barcode was affixed on top of the white space in the warning
            sticker, and was used to track assignments of individual radios to
            teams.
          </p>

          <WhiteBackgroundImage
            style={{ maxWidth: "3in" }}
            src={warningSticker}
            alt="Warning sticker containing the following text: Please do not attempt to disassemble, hack, or reflash your radio. You will need your radio all weekend and we do not have extras. If you think something is wrong with your radio, please contact HQ and we will tell you if it is functioning as intended. This sticker and its contents are not a puzzle and are not part of your hunt for the Shadow Diamond"
          />

          <ul>
            <li>
              <a href={warningSticker} target="_blank" rel="noreferrer">
                SVG
              </a>
            </li>
          </ul>

          <hr />

          <h2 id="firmware">Firmware and Software</h2>

          <p>
            The source code for the radio firmware can be found on{" "}
            <a href="https://github.com/mitmh2025/radio">GitHub</a>, and the{" "}
            <Mono>README.md</Mono> file includes instructions for setting up the
            development environment, building the firmware, and flashing it to
            the radio main board, as well as a walkthrough of the firmware
            organization.
          </p>

          <p>
            At first power-on, the firmware goes through a hardware calibration
            and validation process. Instructions for calibration are printed to
            the USB serial console. In addition to ensuring that all hardware
            components functioned correctly, this process allowed us to
            compensate for variation in both the reference voltage of the
            ESP32-S3 ADC and variability in the potentiometers. (Specifically,
            the potentiometers have a dead band of approximately 5% at both the
            top and bottom of their range, and we needed to ensure that those
            dead bands fell outside of the 180° sweep of the radio’s frequency
            tuner.)
          </p>

          <p>
            The firmware was primarily designed to be orchestrated by{" "}
            <a href="https://thingsboard.io/">ThingsBoard</a>, an open-source
            Internet of Things platform. The radio frequently reports extensive{" "}
            <a href="https://thingsboard.io/docs/user-guide/telemetry/">
              time-series telemetry data
            </a>
            , which allows monitoring the status of all radios. Individual
            stations (or puzzles) are enabled by setting{" "}
            <a href="https://thingsboard.io/docs/user-guide/attributes/#shared-attributes">
              device shared attributes
            </a>{" "}
            (with{" "}
            <a href="https://thingsboard.io/docs/user-guide/rpc/#server-side-rpc">
              server-initiated RPCs
            </a>{" "}
            for low-latency applications). In order to ensure that the radio can
            continue functioning even without connectivity to the ThingsBoard
            server, all shared attributes are cached locally in{" "}
            <a href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/api-reference/storage/nvs_flash.html">
              non-volatile storage
            </a>{" "}
            on the microcontroller. This cache is also used when the radio first
            powers on, prior to connecting to ThingsBoard.
          </p>

          <p>
            The 2π station was generated by a custom server written in{" "}
            <a href="https://www.liquidsoap.info/">Liquidsoap</a>. The source
            for that server is also{" "}
            <a href="https://github.com/mitmh2025/hunt2025/blob/main/radioman/radio.liq">
              on GitHub
            </a>
            . The Liquidsoap server streamed its output to{" "}
            <a href="https://github.com/bluenviron/mediamtx">MediaMTX</a>.
            Clients could stream the station from MediaMTX using WebRTC
            (negotiated using{" "}
            <a href="https://www.ietf.org/archive/id/draft-murillo-whep-03.html">
              WHEP
            </a>
            ). This was used both by the in-browser “virtual radio” and by the
            physical radios, allowing us to utilize the same stream for both. On
            the physical radio, we utilized the{" "}
            <a href="https://github.com/awslabs/amazon-kinesis-video-streams-webrtc-sdk-c">
              Amazon Kinesis Video Streams C WebRTC SDK
            </a>{" "}
            for WebRTC support, although we ultimately needed to make
            significant modifications for compatibility with the ESP32-S3 as a
            target platform and with our own interface requirements.
          </p>

          <p>
            Other than the 2π station, all functionality of the radio (including
            FM support and all other puzzle stations) is processed completely
            locally, in order to avoid dependency on a potentially unreliable
            network connection (especially for puzzles like{" "}
            <a href={`${rootUrl}/puzzles/the_thief`}>The Thief</a> which require
            the radio to transit between many locations on campus). In order to
            store audio files for those puzzles, the radio uses{" "}
            <a href="https://github.com/littlefs-project/littlefs">LittleFS</a>,
            backed by the 32MB of flash storage on the main PCB.
          </p>

          <p>
            If your radio is missing its audio file cache, you can update it by
            connecting to the USB serial console and running:
          </p>

          <Command>
            nvs-set radio:tbattrs file_manifest str https://puzzles.mit.edu
            {manifest.current_radio_manifest}
          </Command>

          <p>
            (You may additionally want to review the commands in the{" "}
            <a href="#hacking">Hacking Your Radio</a> section above to enable
            stations or features which were disabled at the start of Mystery
            Hunt.)
          </p>

          <hr />

          <h2 id="parts">Parts</h2>

          <p>
            Here is a complete list of parts required to assemble a radio,
            including both those we manufactured ourselves and those we
            purchased.
          </p>

          <p>
            Note that many links are for products sold in bulk, and may be
            easier to acquire in small quantities from other sources.
          </p>

          <ul>
            <li>
              1× <a href="#main-pcb">Main board</a>
            </li>
            <li>
              1× <a href="#front-pcb">Front daughterboard</a>
            </li>
            <li>
              1× <a href="#hall-pcb">Hall effect daughterboard</a>
            </li>
            <li>
              1× <a href="#enclosure-shell">Shell</a>
            </li>
            <li>
              4× <a href="#enclosure-legs">Legs</a>
            </li>
            <li>
              2× <a href="#enclosure-leg-braces">Leg braces</a>
            </li>
            <li>
              2× <a href="#enclosure-top-braces">Top braces</a>
            </li>
            <li>
              1× <a href="#enclosure-ring">Ring</a>
            </li>
            <li>
              1× <a href="#enclosure-knobs">Volume Knob</a>
            </li>
            <li>
              1× <a href="#enclosure-knobs">Frequency Knob</a>
            </li>
            <li>
              1× <a href="#enclosure-front">Front faceplate</a>
            </li>
            <li>
              1× <a href="#enclosure-back">Back faceplate</a>
            </li>
            <li>
              1× <a href="#enclosure-fabric">Front fabric covering</a>
            </li>
            <li>
              1× <a href="#enclosure-dial">Frequency dial</a>
            </li>
            <li>
              1×{" "}
              <a href="#enclosure-button-stickers">Triangle button sticker</a>
            </li>
            <li>
              1× <a href="#enclosure-button-stickers">Circle button sticker</a>
            </li>
            <li>
              1x <a href="#enclosure-warning-sticker">Warning sticker</a>
            </li>
            <li>
              1× 18650 battery. The batteries we used were rated for 3000mAh.
              The battery holder on the main PCB should be compatible with any
              18650 battery (including both those with and without button tops).
            </li>
            <li>
              1×{" "}
              <a href="https://www.adafruit.com/product/1313">
                3” 8Ω 1 Watt speaker
              </a>{" "}
              from Adafruit
            </li>
            <li>
              2×{" "}
              <a href="https://www.digikey.com/en/products/detail/same-sky-formerly-cui-devices/PTN24B-C1015K1B/22255059">
                10kΩ linear potentiometers with integrated switch
              </a>{" "}
              from DigiKey
            </li>
            <li>
              1×{" "}
              <a href="https://www.digikey.com/en/products/detail/e-switch/RA12131100/4028938">
                SPST rocker switch
              </a>{" "}
              from DigiKey
            </li>
            <li>
              4×{" "}
              <a href="https://www.digikey.com/en/products/detail/jst-sales-america-inc/R1-25-5/9739734">
                crimp ring connectors (compatible with 22AWG wire)
              </a>{" "}
              from DigiKey
            </li>
            <li>
              8×{" "}
              <a href="https://www.digikey.com/en/products/detail/qualtek/Q2-F3X-1-8-01-SS500FT/4517282">
                pre-cut 1/8” diameter 3-to-1 black heat shrink tubing
              </a>{" "}
              from DigiKey
              <br />
              (These could easily be replaced by any small-diameter heat shrink
              tubing)
            </li>
            <li>
              2×{" "}
              <a href="https://www.aliexpress.us/item/2255799910937843.html">
                black R13-507 16mm momentary pushbutton switches
              </a>{" "}
              from AliExpress
            </li>
            <li>
              4×{" "}
              <a href="https://www.aliexpress.us/item/2251832862795213.html">
                10cm 26AWG single-end JST XH (2.54mm) 2-pin cables
              </a>{" "}
              from AliExpress
            </li>
            <li>
              1×{" "}
              <a href="https://www.aliexpress.us/item/3256803927457003.html">
                20cm double-end JST XH (2.54mm) 7-pin cable
              </a>{" "}
              from AliExpress
            </li>
            <li>
              1×{" "}
              <a href="https://www.aliexpress.us/item/3256803175514107.html">
                10cm double-end reverse-side JST SH (1.0mm) 4-pin cable
              </a>{" "}
              from AliExpress
              <br />
              (Upgrading to 20cm cables would make assembly somewhat easier)
            </li>
            <li>
              4×{" "}
              <a href="https://www.aliexpress.us/item/2255799843596501.html">
                M3×30 nylon female-to-female standoffs
              </a>{" "}
              from AliExpress
            </li>
            <li>
              6×{" "}
              <a href="https://www.aliexpress.us/item/3256806811283223.html">
                M2×8mm Phillips ultra-thin-head wood screws
              </a>{" "}
              from AliExpress
            </li>
            <li>
              12×{" "}
              <a href="https://www.aliexpress.us/item/3256806711089952.html">
                M3×6mm Phillips ultra-thin-head bolt screws
              </a>{" "}
              from AliExpress
            </li>
            <li>
              4×{" "}
              <a href="https://www.aliexpress.us/item/3256802189339751.html">
                M3 flange nuts
              </a>{" "}
              from AliExpress
            </li>
            <li>
              4×{" "}
              <a href="https://www.aliexpress.us/item/3256805277746020.html">
                6mm tamper-evident stickers
              </a>{" "}
              from AliExpress
            </li>
            <li>
              4×{" "}
              <a href="https://boltdepot.com/Product-Details?product=2744">
                #10-24×2” carriage bolts
              </a>{" "}
              from Bolt Depot
            </li>
            <li>
              4×{" "}
              <a href="https://boltdepot.com/Product-Details?product=2645">
                #10-24 hex nuts
              </a>{" "}
              from Bolt Depot
            </li>
            <li>
              4×{" "}
              <a href="https://boltdepot.com/Product-Details?product=2955">
                #10 lock washers
              </a>{" "}
              from Bolt Depot
            </li>
            <li>
              Approximately 40cm of 22AWG silicone-insulated stranded wire
            </li>
            <li>A small (roughly 2 1/2”×1”) piece of clear PET</li>
            <li>Superglue</li>
            <li>Masking tape</li>
            <li>Solder</li>
          </ul>

          <hr />

          <h2 id="assembly">Assembly</h2>

          <p>
            The following assembly manual sets out the steps we followed in
            order to assemble the radios for Mystery Hunt. As has been noted
            elsewhere, this process was designed for assembling a high quantity
            of radios in an assembly line fashion, and may not be the best way
            to assemble radios in smaller quantities.
          </p>

          <iframe
            src={`${assemblyInstructions}#view=FitV&toolbar=0`}
            title="Assembly Instructions"
            style={{ width: "100%", aspectRatio: 11 / 8.5 }}
          />

          <ul>
            <li>
              <a href={assemblyInstructions} target="_blank" rel="noreferrer">
                Assembly Instructions
              </a>
            </li>
          </ul>

          <hr />

          <h2 id="issues">Known Issues</h2>

          <p>
            While we did our best to address issues prior to Mystery Hunt, there
            were several issues either still outstanding or discovered during
            Hunt. The designs on this page represent the radios as they were
            produced, and therefore do not include fixes for these issues.
          </p>

          <ul>
            <li>
              <strong>Battery reverse polarity</strong>: Our battery and power
              management circuit lacks reverse polarity protection for the 18650
              battery, so inserting the battery backwards will cause
              catastrophic damage to the radio.
            </li>

            <li>
              <strong>IP5306 failure</strong>: During Mystery Hunt, the IP5306
              power management IC on several radios became damaged (“let out the
              magic smoke”), resulting in failure of the radio. We were unable
              to succesfully diagnose the cause of this issue, although it
              seemed to be restricted to specific USB chargers. (We suspect —
              without confirmation — either some alternative charging protocol
              mistakenly delivering more than 5V over USB or unrestricted
              current draw from the two large downstream capacitors exceeding
              the IP5306’s maximum current rating.)
            </li>

            <li>
              <strong>USB in-rush current failures</strong>: The two large
              capacitors on the main PCB, designed to smooth transitions between
              USB and battery power, resulted in sufficient in-rush current when
              initially connected to USB that some USB chargers would de-power
              the USB port, resulting in the radio not powering on. It was
              possible to work around this issue by powering on the radio{" "}
              <em>before</em> connecting to USB (thus charging the capacitors
              off of battery power).
            </li>

            <li>
              <strong>
                Wifi configuration station (
                <MathML>
                  <MFrac>
                    <MRow>
                      <MN>7</MN>
                      <MI>π</MI>
                    </MRow>
                    <MRow>
                      <MN>5</MN>
                    </MRow>
                  </MFrac>
                </MathML>{" "}
                PM)
              </strong>
              : The wifi configuration station was intended to broadcast an SSID
              running a captive portal which teams could use to configure a
              secondary wifi network (in addition to the MIT wireless network,
              which was always hard-coded). However, during Mystery Hunt we
              discovered that, for an unknown reason, it was not possible to
              remain connected to the SSID for long enough to complete the
              configuration process.
            </li>

            <li>
              <strong>Vias in pads</strong>: The main PCB design in several
              cases included vias located under component pads. We saw a rate of
              failure (approximately 3%) that we suspect to be connected to
              these vias (especially those under SOIC package ICs).
            </li>
          </ul>
        </PageMain>
      </>
    </PageWrapper>
  );

  return {
    title: "The Radio",
    node,
    entrypoints: ["archive_radio"],
  };
};

export default handler;
