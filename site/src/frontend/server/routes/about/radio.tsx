import { type Request } from "express";
import React from "react";
import { styled } from "styled-components";
import { wrapContentWithNavBar } from "../../../components/ContentWithNavBar";
import LinkedImage from "../../../components/LinkedImage";
import { Math, MFrac, MI, MN, MRow } from "../../../components/MathML";
import { AuthorsNote } from "../../../components/PuzzleLayout";
import lightIcon from "../../../puzzles/practical-fighter/assets/light.svg";
import magnetIcon from "../../../puzzles/practical-fighter/assets/magnet.svg";
import { deviceMax } from "../../../utils/breakpoints";
import { RadioWrapper } from "./StyledRadioPage";
import circle from "./assets/circle.svg";
import image1 from "./assets/image1.svg";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import stationPiNotes from "./assets/station-pi-notes.svg";
import triangle from "./assets/triangle.svg";

const Pi = () => <MI>π</MI>;

const TwoPi = () => (
  <Math>
    <MN>2</MN>
    <Pi />
  </Math>
);

const PiFraction = ({ num, denom }: { num: number; denom: number }) => (
  <Math>
    <MFrac>
      <MRow>
        <MN>{num}</MN>
        <Pi />
      </MRow>
      <MRow>
        <MN>{denom}</MN>
      </MRow>
    </MFrac>
  </Math>
);

const SizedImage = styled(LinkedImage)<{ $width: number }>`
  max-width: ${({ $width }) => $width}px;
`;

const CenteredImage = styled(SizedImage)`
  display: block;
  margin: 1em auto;
`;

const FlexWrapper = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: space-around;
`;

const InnerFlexWrapper = styled.div`
  display: inline-flex;
  gap: 1em;

  @media ${deviceMax.sm} {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLi = styled.li`
  margin-bottom: 1em;
`;

const BigCaps = styled.div`
  font-size: 36px;
  text-align: center;
`;

const BiggerCaps = styled.p`
  margin-top: 1em;
  font-size: 48px;
  text-align: center;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const IssuedDate = styled(CenteredDiv)`
  margin: 2em auto 0;
`;

const Logo = styled(CenteredImage)`
  margin-bottom: 3em;
`;

const Message = styled.div`
  margin: 1em;
  padding: 1em;
  background-color: var(--black);
  color: var(--white);
`;

const MessageInner = styled.div`
  border: 1px solid var(--white);
  padding: 1em;
`;

const StyledHr = styled.hr`
  color: var(--white);
  margin: 1em 0;
`;

const RadioIcon = styled.img`
  height: 1em;
`;

export function radioHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <RadioWrapper>
      <>
        <IssuedDate>Issued January 2025</IssuedDate>
        <BigCaps>Instruction</BigCaps>
        <BigCaps>Manual</BigCaps>
        <BiggerCaps>RADIO</BiggerCaps>
        <Logo $width={200} src={image1} alt="D&M" />
        <p>
          We hope you enjoy this radio as a memento of the Carter-Finster
          engagement gala. We’ve included instructions to ensure that you get
          the most out of this cutting edge piece of technology, custom
          manufactured by D&M (Diodes & Microcircuits) as part of the
          celebration of the season.
        </p>
        <hr />
        <Message>
          <MessageInner>
            <CenteredDiv>
              This is an out-of-universe message from Death and Mayhem.
            </CenteredDiv>
            <StyledHr />
            <CenteredDiv>
              Please{" "}
              <strong>
                do not attempt to disassemble, hack, or re-flash your radio
              </strong>
              .
            </CenteredDiv>
            <br />
            You will need your radio throughout the weekend, we cannot easily
            repair it, and we have very few extras. We are so excited to talk
            about and show off the insides…at wrapup. In the meantime, anything
            you need to do to the radio should be obvious, and if you think
            something is wrong with your radio, please contact HQ and we will
            tell you if it is functioning as intended. Happy hunting!
          </MessageInner>
        </Message>
        <FlexWrapper>
          <InnerFlexWrapper>
            <SizedImage
              $width={261}
              src={image2}
              alt="A diagram of a radio, with lines pointing to the frequency dial, volume control, LED status indicator, frequency selector, and two buttons."
            />
            <SizedImage
              $width={224}
              src={image3}
              alt="A diagram of the back of a radio, with lines pointing to the USB power port, battery indicator, headphone jack, and band switch."
            />
          </InnerFlexWrapper>
        </FlexWrapper>
        <h2 id="controls">Controls and Indicators</h2>
        <ol>
          <StyledLi>
            <strong>Volume and On/Off Switch</strong>: To turn your radio on,
            rotate the volume dial clockwise until you hear and feel a “click”.
            Continue rotating clockwise to increase the volume, or
            counterclockwise to decrease it.
            <br />
            <br />
            We are aware of an incompatibility with some radios and some USB
            chargers. If your radio does not turn on while plugged into USB
            power, unplug it, power it on, and then plug it back in.
            <br />
          </StyledLi>
          <StyledLi>
            <strong>Band Switch and Frequency Selector</strong>: Your radio is
            capable of receiving broadcasts over both traditional FM and the
            newly launched PM band (patent pending). To select between the two,
            use the toggle switch on the rear of your radio. The same frequency
            selector can be used for tuning in both the FM and PM bands. FM
            frequencies are labelled in solid black numbers; PM frequencies are
            labelled in outlined numbers.
            <br />
          </StyledLi>
          <StyledLi>
            <strong>USB Power and Battery Indicator</strong>: Your radio can be
            powered via a standard USB-C connection. It is additionally equipped
            with an onboard battery. We recommend keeping your radio plugged in
            when it is not otherwise in motion. In our testing, we found that
            the radio’s battery will last approximately 8-10 hours. However,
            your radio’s power consumption can vary based on the specific
            station that it is tuned to, so we recommend against relying too
            strictly on these estimates.
            <br />
            <br />
            The battery indicator on your radio will glow yellow when it is
            charging and green when it is fully charged. When its battery level
            is low, it will glow red.
            <br />
          </StyledLi>
          <StyledLi>
            <strong>Headphone Jack</strong>: Your radio’s included high-fidelity
            speaker should provide you with news and entertainment all weekend.
            However, if you are in a situation where outputting via speaker is
            inappropriate, the radio is also equipped with a standard 3.5mm
            headphone jack. Simply plugging in headphones is sufficient to
            change the preferred output device; no additional configuration is
            necessary. We additionally expect this to work with classroom A/V
            systems, if you find the included speaker underpowered for your
            space.
            <br />
          </StyledLi>
        </ol>
        <hr />
        <h2 id="stations">Stations</h2>
        <p>
          You should find your radio’s FM tuner to behave similarly to other FM
          receivers that you have encountered.
        </p>
        <p>
          Here is some additional information on currently broadcasting stations
          on the PM band. Make sure to check this page periodically, as there
          may be additional information available for newly discovered stations.
        </p>
        <h3 id="station-2pi">
          WDNM: <TwoPi />
        </h3>
        <p>
          Your radio should have arrived tuned to <TwoPi />, where WDNM will be
          coming to you live from the Gala Bar. WDNM is broadcasting important
          news updates all weekend, so we encourage you to make sure to listen
          in all weekend. If for some reason you find that you need to tune your
          radio away from <TwoPi />, an{" "}
          <a href="/virtual_radio">alternate virtual stream</a> is available.
        </p>
        <h3 id="station-7pi-over-5">
          Wireless Configuration: <PiFraction num={7} denom={5} />
        </h3>
        <p>
          If your radio is outside of MITropolis airspace and struggling to
          receive PM broadcasts, you may need to make alternative wireless
          arrangements.
        </p>
        <p>
          <strong>Note:</strong> Your radio is not able to connect to wireless
          networks with a captive portal, such as hotel networks that require a
          login. In such an environment, we recommend tethering off of a phone.
        </p>
        <p>
          Tune your radio to <PiFraction num={7} denom={5} />. Your radio will
          begin broadcasting its own wireless network with a name starting with
          “two-pi-radio-”. Use another device to connect to this network. If the
          device does not automatically open the wireless configuration page,
          use a web browser and navigate to 192.168.4.1 or to any website. The
          interface should look like this:
        </p>
        <CenteredImage
          $width={350}
          src={image4}
          alt="Two Pi Radio Wifi Configuration. Your radio can connect to MIT’s WiFi plus one additional network, which can be configured here. No secondary network currently configured. SSID: Scanning..."
        />
        <p>
          Once successfully configured, you may tune your radio back to its
          original station.
        </p>
        {teamState.state.puzzles.songs_on_the_radio?.answer !== undefined && (
          <>
            <h3 id="station-pi">
              Instrumental Mode: <Pi />
            </h3>
            <AuthorsNote>
              This station was originally discovered in connection with the
              puzzle{" "}
              <a href="/puzzles/songs_on_the_radio">Songs on the Radio</a>.
            </AuthorsNote>

            <p>
              Tuning your radio to <Pi /> will allow you to use your radio as a
              musical instrument. To play basic notes, you can use any of the
              following 4 inputs:
            </p>

            <ul>
              <li>Knock on the radio to play G4</li>
              <li>Touch one of the metal feet to play A4</li>
              <li>
                Press the <RadioIcon src={triangle} /> button to play B4
              </li>
              <li>
                Shine a light through the hole next to the{" "}
                <RadioIcon src={lightIcon} /> icon on the rear to play C5
              </li>
            </ul>

            <p>
              Additionally, each of these four notes can be shifted up or down
              the major scale by using a combination of two shift operations:
            </p>

            <ul>
              <li>
                Holding a magnet up to the <RadioIcon src={magnetIcon} /> icon
                on the rear.
              </li>
              <li>Plugging a 3.5mm plug into the headphone jack on the side</li>
            </ul>

            <p>
              On its own, the magnet results in all notes being a perfect fourth
              lower (i.e. D4, E4, F♯4, and G4 respectively). The headphone jack
              results in all notes being a perfect fifth higher (i.e. D5, E5,
              F♯5, and G5 respectively). And using both together results in all
              notes being a perfect octave higher (i.e. G5, A5, B5, and C6).
              Here is all 16 possible combinations shown on a staff:
            </p>

            <LinkedImage
              src={stationPiNotes}
              alt="A staff showing all 16 possible combinations of notes that can be played on the radio."
            />

            <p>
              Additionally, it is possible to apply a chromatic pitch bend
              effect by rotating the radio around the axis perpendicular to its
              front face (the “roll” axis). A rotation of 45° results in a
              half-step adjustment, while a rotation of 90° results in a
              full-step adjustment. Continuing in either direction beyond 90°
              brings the pitch back towards its original value.
            </p>
          </>
        )}
        {teamState.state.rounds.missing_diamond?.gates?.includes("mdg13") && (
          <>
            <h3 id="station-17pi-over-10">
              Chasing the Witness: <PiFraction num={17} denom={10} />
            </h3>
            <AuthorsNote>
              This station was originally discovered while solving{" "}
              <a href="/puzzles/the_thief">The Thief</a>.
            </AuthorsNote>

            <p>
              As you pursue the final witness in The Case of the Missing
              Diamond, you can tune to this station to follow Billie’s movements
              through MITropolis. You just need to follow them, but if you are
              lost, you can press the <RadioIcon src={triangle} /> button to
              pause or resume playback, and the <RadioIcon src={circle} />{" "}
              button to restart from the beginning.
            </p>

            <p>
              There’s no time to go backwards, though—you can’t let that witness
              get away!
            </p>
          </>
        )}
        {teamState.state.puzzles.given_up_blacklight?.locked === "unlocked" && (
          <>
            <h3 id="station-23pi-over-20">
              Given Up Again: <PiFraction num={23} denom={20} />
            </h3>

            <AuthorsNote>
              This station was originally discovered by shining your blacklight
              on the puzzle <a href="/puzzles/given_up_blacklight">Given Up</a>.
            </AuthorsNote>

            <p>
              No further information about this station is available at this
              time.
            </p>
          </>
        )}
        {teamState.state.puzzles.can_do_transmissions?.locked ===
          "unlocked" && (
          <>
            <h3 id="station-37pi-over-20">
              A Numbers Station: <PiFraction num={37} denom={20} />
            </h3>

            <AuthorsNote>
              This station was originally discovered in connection with the
              puzzle{" "}
              <a href="/puzzles/can_do_transmissions">Can Do Transmissions</a>.
            </AuthorsNote>

            <p>
              No further information about this station is available at this
              time.
            </p>
          </>
        )}
        <hr />
        <h2>Solving Issues</h2>
        <h3>My radio won’t turn on</h3>
        <p>
          Some radios have a known issue where they will not turn on while
          connected to USB power. Try disconnecting USB power, turning the radio
          on, and then re-connecting USB power. If this still does not work,
          please bring the radio by the Gala Bar.
        </p>
        <h3>My radio is not functioning properly</h3>
        <p>
          As always, the best first step is to try turning the radio off (and
          leaving it off for 3-5 seconds) then turning it back on. If that
          doesn’t work, make sure that you are able to receive the <TwoPi />{" "}
          stream to confirm your radio is connected to the wireless. If you are
          unable to connect or that does not resolve some other issue, please
          contact HQ and we will confirm if you need to bring the radio to the
          Gala Bar for debugging.
        </p>
        <hr />
        <h2>Additional Instructions</h2>
        <p>
          Because this is a cutting edge piece of technology, this page will be
          updated over the course of the weekend should we implement new
          features.
        </p>
        <hr />
        <h2 id="setlist">Setlist</h2>
        <AuthorsNote as="div">
          <p>
            During Mystery Hunt, when it was not playing other content, the 2π
            station would rotate through the following playlist of songs. We’ve
            included them here in the short-term, although watch out for our
            upcoming credits page for a more permanent home.
          </p>

          <p>
            Additionally, if you’d like to run your own Gala, here is a link to
            a{" "}
            <a href="https://drive.google.com/drive/folders/10DpW_xEtxgsa42OmK4zcH6xImdD3KZnb">
              Google Drive folder
            </a>{" "}
            with all of them.
          </p>
        </AuthorsNote>
        <ul>
          <li>Chroma by Aldus-X used under CC BY-NC license</li>
          <li>
            Good Ol Days - 2024 Remaster by Beat Mekanik used under CC BY
            license
          </li>
          <li>The Urban Gentry by Beat Mekanik used under CC BY license</li>
          <li>Blues for Oliver by Benny Golbin used under CC BY-NC license</li>
          <li>
            Grey Grey Joe by Blue Dot Sessions used under CC BY-NC license
          </li>
          <li>Laser Focus by Blue Dot Sessions used under CC BY-NC license</li>
          <li>Pacing by Blue Dot Sessions used under CC BY-NC license</li>
          <li>
            Spins and Never Falls by Blue Dot Sessions used under CC BY-NC
            license
          </li>
          <li>
            The Caspian Sea by Blue Dot Sessions used under CC BY-NC license
          </li>
          <li>
            Tower of Mirrors by Blue Dot Sessions used under CC BY-NC license
          </li>
          <li>
            Velvet Ladder by Blue Dot Sessions used under CC BY-NC license
          </li>
          <li>After All by Boom Boom Beckett used under CC BY-NC license</li>
          <li>Barbagil by Boom Boom Beckett used under CC BY-NC license</li>
          <li>C est pareil by Boom Boom Beckett used under CC BY-NC license</li>
          <li>
            Nella Nostra Bellezza by Boom Boom Beckett used under CC BY-NC
            license
          </li>
          <li>
            To Be a Master P. by Boom Boom Beckett used under CC BY-NC license
          </li>
          <li>
            Super Hero, Track by, Brolefilmer by brolefilmer used under Pixabay
            license
          </li>
          <li>Hello by Crowander used under CC BY-NC license</li>
          <li>Humbug by Crowander used under CC BY-NC license</li>
          <li>Jerry’s Back by Crowander used under CC BY-NC license</li>
          <li>The Puddle by Crowander used under CC BY-NC license</li>
          <li>ataraxy by Dee Yan-Key used under CC BY-NC license</li>
          <li>b-road by Dee Yan-Key used under CC BY-NC license</li>
          <li>Back Then by Dee Yan-Key used under CC BY-NC license</li>
          <li>bats by Dee Yan-Key used under CC BY-NC license</li>
          <li>big band by Dee Yan-Key used under CC BY-NC license</li>
          <li>Busy Bees by Dee Yan-Key used under CC BY-NC license</li>
          <li>childhood pictures by Dee Yan-Key used under CC BY-NC license</li>
          <li>City Tour by Dee Yan-Key used under CC BY-NC license</li>
          <li>cocktail reception by Dee Yan-Key used under CC BY-NC license</li>
          <li>cruise around by Dee Yan-Key used under CC BY-NC license</li>
          <li>
            Didn’t My Lord Deliver Daniel by Dee Yan-Key used under CC BY-NC
            license
          </li>
          <li>evening traffic by Dee Yan-Key used under CC BY-NC license</li>
          <li>Gambol by Dee Yan-Key used under CC BY-NC license</li>
          <li>garden party by Dee Yan-Key used under CC BY-NC license</li>
          <li>getaway by Dee Yan-Key used under CC BY-NC license</li>
          <li>
            Goin’ to Set Down an’ Rest a While by Dee Yan-Key used under CC
            BY-NC license
          </li>
          <li>
            He Never Said a Mumbling Word by Dee Yan-Key used under CC BY-NC
            license
          </li>
          <li>hindsight by Dee Yan-Key used under CC BY-NC license</li>
          <li>holiday traffic by Dee Yan-Key used under CC BY-NC license</li>
          <li>lounge by Dee Yan-Key used under CC BY-NC license</li>
          <li>minor sadness by Dee Yan-Key used under CC BY-NC license</li>
          <li>Night Elves by Dee Yan-Key used under CC BY-NC license</li>
          <li>Night Ride by Dee Yan-Key used under CC BY-NC license</li>
          <li>night sleeper by Dee Yan-Key used under CC BY-NC license</li>
          <li>old steam train by Dee Yan-Key used under CC BY-NC license</li>
          <li>Rainy Streets by Dee Yan-Key used under CC BY-NC license</li>
          <li>Romp by Dee Yan-Key used under CC BY-NC license</li>
          <li>rooftop garden by Dee Yan-Key used under CC BY-NC license</li>
          <li>Spring Flowers by Dee Yan-Key used under CC BY-NC license</li>
          <li>suburban train by Dee Yan-Key used under CC BY-NC license</li>
          <li>sunset boulevard by Dee Yan-Key used under CC BY-NC license</li>
          <li>swingin by Dee Yan-Key used under CC BY-NC license</li>
          <li>The Universe by Dee Yan-Key used under CC BY-NC license</li>
          <li>train journey by Dee Yan-Key used under CC BY-NC license</li>
          <li>Waltzing Mouse by Dee Yan-Key used under CC BY-NC license</li>
          <li>Winter Winds by Dee Yan-Key used under CC BY-NC license</li>
          <li>A Feather by Eric Van der Westen used under CC BY-NC license</li>
          <li>
            A Left Hook by Eric Van der Westen used under CC BY-NC license
          </li>
          <li>
            Blue Is All That’s Left by Eric Van der Westen used under CC BY-NC
            license
          </li>
          <li>Ici by Eric Van der Westen used under CC BY-NC license</li>
          <li>Mark by Eric Van der Westen used under CC BY-NC license</li>
          <li>
            Time-Out, Space-Out by Eric Van der Westen used under CC BY-NC
            license
          </li>
          <li>
            Water Surface by Eric Van der Westen used under CC BY-NC license
          </li>
          <li>Sailing Away by HoliznaCC0 used under CC0 license</li>
          <li>Gorgon Original by Jesse Spillane used under CC BY license</li>
          <li>
            Hands of a Pedestrian by Jesse Spillane used under CC BY license
          </li>
          <li>Scratch Pad by Jesse Spillane used under CC BY license</li>
          <li>Azurescent by Jonah Dempcy used under CC BY-NC license</li>
          <li>Lumen Arcanum by Jonah Dempcy used under CC BY-NC license</li>
          <li>
            Mother Matrix Most Mysterious by Jonah Dempcy used under CC BY-NC
            license
          </li>
          <li>Reticulating Flux by Jonah Dempcy used under CC BY-NC license</li>
          <li>Upsurge by Jonah Dempcy used under CC BY-NC license</li>
          <li>Organ Boogie by JuliusH used under Pixabay license</li>
          <li>
            Springtime — Big Band Swing Music by JuliusH used under Pixabay
            license
          </li>
          <li>
            Swing Sax — Big Band Miller Style by JuliusH used under Pixabay
            license
          </li>
          <li>
            Swing Train — Big Band Miller Style by JuliusH used under Pixabay
            license
          </li>
          <li>
            Waldhorn Orchester — French Horn Orchestra by JuliusH used under
            Pixabay license
          </li>
          <li>Backed Vibes Clean by Kevin MacLeod used under CC BY license</li>
          <li>Off to Osaka by Kevin MacLeod used under CC BY license</li>
          <li>Sassy Jazzy by LaFaena used under CC BY license</li>
          <li>Jazzy Reel by M33 Project used under CC BY-NC license</li>
          <li>
            Sax and Piano (free track) by Maarten Schellekens used under CC BY
            license
          </li>
          <li>
            A Simple Life by Marcos H. Bolanos used under CC BY-NC license
          </li>
          <li>
            The Circus Marched Down Bourbon Street — New Orleans Jazz by
            melodyayresgriffiths used under Pixabay license
          </li>
          <li>Big Band by Music_For_Videos used under Pixabay license</li>
          <li>Big Band Jazz by Music_For_Videos used under Pixabay license</li>
          <li>Spy by Music_For_Videos used under Pixabay license</li>
          <li>
            Big Band Swing — Jazzy Optimism by MusicInMedia used under Pixabay
            license
          </li>
          <li>A Body In The Alley by Patrick Davies used under CC0 license</li>
          <li>
            Art of the Groove (w/ Brent Jensen) by Rob Walker used under CC
            BY-NC license
          </li>
          <li>Dawn by Somewhere Off Jazz Street used under CC BY-NC license</li>
          <li>Echo by Somewhere Off Jazz Street used under CC BY-NC license</li>
          <li>Gave by Somewhere Off Jazz Street used under CC BY-NC license</li>
          <li>
            Ghost by Somewhere Off Jazz Street used under CC BY-NC license
          </li>
          <li>Comedy Swing by WaveMaster used under Pixabay license</li>
          <li>
            Ahmad by William Ross Chernoff’s Nomads used under CC BY license
          </li>
          <li>
            Four-Way by William Ross Chernoff’s Nomads used under CC BY license
          </li>
          <li>
            In Shadows by William Ross Chernoff’s Nomads used under CC BY
            license
          </li>
          <li>
            Makie Elkino by William Ross Chernoff’s Nomads used under CC BY
            license
          </li>
          <li>Blue House Boogie by Xennial used under CC BY license</li>
        </ul>
      </>
    </RadioWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "Radio Instruction Manual",
    },
    teamState,
  );
}
