import Crunker from "crunker";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { newClient } from "../../../lib/api/client";
import radioImg from "../archives/radio/assets/radio-render.png";
import apiUrl from "../utils/apiUrl";
import { deviceMax } from "../utils/breakpoints";
import rootUrl from "../utils/rootUrl";
import { PageHeader, PageMain, PageTitle, PageWrapper } from "./PageLayout";
import { AuthorsNote } from "./PuzzleLayout";
import { Button } from "./StyledUI";
import breakingApple from "./radioPlayerAssets/audio/radio-breaking-apple.mp3";
import breakingCrimeScene from "./radioPlayerAssets/audio/radio-breaking-crime-scene.mp3";
import breakingFerdinand from "./radioPlayerAssets/audio/radio-breaking-ferdinand.mp3";
import breakingGladys from "./radioPlayerAssets/audio/radio-breaking-gladys.mp3";
import breakingKatrina from "./radioPlayerAssets/audio/radio-breaking-katrina.mp3";
import breakingPapa from "./radioPlayerAssets/audio/radio-breaking-papa.mp3";
import breakingSafehouse from "./radioPlayerAssets/audio/radio-breaking-safe-house.mp3";
import breakingVault from "./radioPlayerAssets/audio/radio-breaking-vault.mp3";
import confidentialBumper from "./radioPlayerAssets/audio/radio-bumper-confidential.mp3";
import confidentialComplete from "./radioPlayerAssets/audio/radio-confidential-complete.mp3";
import confidentialIntro from "./radioPlayerAssets/audio/radio-confidential-intro.mp3";
import confidentialKickoffRecap from "./radioPlayerAssets/audio/radio-confidential-kickoff-recap.mp3";
import confidentialOutro from "./radioPlayerAssets/audio/radio-confidential-outro.mp3";
import confidentialPartialA from "./radioPlayerAssets/audio/radio-confidential-partial-a.mp3";
import confidentialPartialB from "./radioPlayerAssets/audio/radio-confidential-partial-b.mp3";
import confidentialPartialC from "./radioPlayerAssets/audio/radio-confidential-partial-c.mp3";
import confidentialSIFerdinand from "./radioPlayerAssets/audio/radio-confidential-si-ferdinand.mp3";
import confidentialSIGladys from "./radioPlayerAssets/audio/radio-confidential-si-gladys.mp3";
import confidentialSIIntro from "./radioPlayerAssets/audio/radio-confidential-si-intro.mp3";
import confidentialSIKatrina from "./radioPlayerAssets/audio/radio-confidential-si-katrina.mp3";
import confidentialSIPapa from "./radioPlayerAssets/audio/radio-confidential-si-papa.mp3";
import eventSchedule from "./radioPlayerAssets/audio/radio-event-schedule.mp3";
import confidentialHandoffA from "./radioPlayerAssets/audio/radio-handoff-confidential-a.mp3";
import confidentialHandoffB from "./radioPlayerAssets/audio/radio-handoff-confidential-b.mp3";
import confidentialHandoffC from "./radioPlayerAssets/audio/radio-handoff-confidential-c.mp3";
import confidentialHandoffD from "./radioPlayerAssets/audio/radio-handoff-confidential-d.mp3";
import confidentialHandoffE from "./radioPlayerAssets/audio/radio-handoff-confidential-e.mp3";
import confidentialHandoffF from "./radioPlayerAssets/audio/radio-handoff-confidential-f.mp3";
import sponsorsHandoffA from "./radioPlayerAssets/audio/radio-handoff-sponsors-a.mp3";
import sponsorsHandoffB from "./radioPlayerAssets/audio/radio-handoff-sponsors-b.mp3";
import sponsorsHandoffC from "./radioPlayerAssets/audio/radio-handoff-sponsors-c.mp3";
import sponsorsHandoffD from "./radioPlayerAssets/audio/radio-handoff-sponsors-d.mp3";
import sponsorsHandoffE from "./radioPlayerAssets/audio/radio-handoff-sponsors-e.mp3";
import sponsorsHandoffF from "./radioPlayerAssets/audio/radio-handoff-sponsors-f.mp3";
import sponsorsHandoffG from "./radioPlayerAssets/audio/radio-handoff-sponsors-g.mp3";
import sponsorsHandoffH from "./radioPlayerAssets/audio/radio-handoff-sponsors-h.mp3";
import weatherHandoffA from "./radioPlayerAssets/audio/radio-handoff-weather-a.mp3";
import weatherHandoffB from "./radioPlayerAssets/audio/radio-handoff-weather-b.mp3";
import weatherHandoffC from "./radioPlayerAssets/audio/radio-handoff-weather-c.mp3";
import weatherHandoffD from "./radioPlayerAssets/audio/radio-handoff-weather-d.mp3";
import weatherHandoffE from "./radioPlayerAssets/audio/radio-handoff-weather-e.mp3";
import weatherHandoffF from "./radioPlayerAssets/audio/radio-handoff-weather-f.mp3";
import weatherHandoffG from "./radioPlayerAssets/audio/radio-handoff-weather-g.mp3";
import weatherHandoffH from "./radioPlayerAssets/audio/radio-handoff-weather-h.mp3";
import lastCallFriday from "./radioPlayerAssets/audio/radio-last-call-friday.mp3";
import lastCallSaturday from "./radioPlayerAssets/audio/radio-last-call-saturday.mp3";
import lastCallSunday from "./radioPlayerAssets/audio/radio-last-call-sunday.mp3";
import morningMonday from "./radioPlayerAssets/audio/radio-morning-monday.mp3";
import morningSaturday from "./radioPlayerAssets/audio/radio-morning-saturday.mp3";
import morningSunday from "./radioPlayerAssets/audio/radio-morning-sunday.mp3";
import musicIntroA from "./radioPlayerAssets/audio/radio-music-intro-a.mp3";
import musicIntroB from "./radioPlayerAssets/audio/radio-music-intro-b.mp3";
import musicIntroC from "./radioPlayerAssets/audio/radio-music-intro-c.mp3";
import musicIntroD from "./radioPlayerAssets/audio/radio-music-intro-d.mp3";
import musicIntroE from "./radioPlayerAssets/audio/radio-music-intro-e.mp3";
import musicOutroA from "./radioPlayerAssets/audio/radio-music-outro-a.mp3";
import musicOutroB from "./radioPlayerAssets/audio/radio-music-outro-b.mp3";
import musicOutroC from "./radioPlayerAssets/audio/radio-music-outro-c.mp3";
import musicOutroD from "./radioPlayerAssets/audio/radio-music-outro-d.mp3";
import release from "./radioPlayerAssets/audio/radio-release.mp3";
import shutdownFriday from "./radioPlayerAssets/audio/radio-shutdown-friday.mp3";
import shutdownSaturday from "./radioPlayerAssets/audio/radio-shutdown-saturday.mp3";
import shutdownSunday from "./radioPlayerAssets/audio/radio-shutdown-sunday.mp3";
import signoff from "./radioPlayerAssets/audio/radio-signoff.mp3";
import signonA from "./radioPlayerAssets/audio/radio-signon-a.mp3";
import signonB from "./radioPlayerAssets/audio/radio-signon-b.mp3";
import signonC from "./radioPlayerAssets/audio/radio-signon-c.mp3";
import signonD from "./radioPlayerAssets/audio/radio-signon-d.mp3";
import stationIdA from "./radioPlayerAssets/audio/radio-station-id-a.mp3";
import stationIdB from "./radioPlayerAssets/audio/radio-station-id-b.mp3";
import stationIdC from "./radioPlayerAssets/audio/radio-station-id-c.mp3";
import stationIdD from "./radioPlayerAssets/audio/radio-station-id-d.mp3";
import stationIdE from "./radioPlayerAssets/audio/radio-station-id-e.mp3";
import stationIdF from "./radioPlayerAssets/audio/radio-station-id-f.mp3";
import stationIdG from "./radioPlayerAssets/audio/radio-station-id-g.mp3";

const ConfidentialHandoffs = [
  confidentialHandoffA,
  confidentialHandoffB,
  confidentialHandoffC,
  confidentialHandoffD,
  confidentialHandoffE,
  confidentialHandoffF,
];

const SponsorHandoffs = [
  sponsorsHandoffA,
  sponsorsHandoffB,
  sponsorsHandoffC,
  sponsorsHandoffD,
  sponsorsHandoffE,
  sponsorsHandoffF,
  sponsorsHandoffG,
  sponsorsHandoffH,
];

const WeatherHandoffs = [
  weatherHandoffA,
  weatherHandoffB,
  weatherHandoffC,
  weatherHandoffD,
  weatherHandoffE,
  weatherHandoffF,
  weatherHandoffG,
  weatherHandoffH,
];

const MusicIntros = [
  musicIntroA,
  musicIntroB,
  musicIntroC,
  musicIntroD,
  musicIntroE,
];

const MusicOutros = [musicOutroA, musicOutroB, musicOutroC, musicOutroD];

const StationIDs = [
  stationIdA,
  stationIdB,
  stationIdC,
  stationIdD,
  stationIdE,
  stationIdF,
  stationIdG,
];

const ConfidentialSIOrder = ["katrina", "gladys", "papa", "ferdinand"] as const;
type ConfidentialSIKey = keyof typeof ConfidentialSIs;

const ConfidentialSIs = {
  ferdinand: confidentialSIFerdinand,
  gladys: confidentialSIGladys,
  katrina: confidentialSIKatrina,
  papa: confidentialSIPapa,
};

const Radio = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  img {
    max-width: 100%;

    @media ${deviceMax.sm} {
      display: none;
    }
  }
`;

const GeneratorCard = styled.div`
  background: var(--gray-900);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  padding: 2rem 1.5rem;
  color: var(--white);
`;

const GeneratorForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CapstoneOptions = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
`;

const SideInvestigationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 2rem;
  margin-top: 0.75rem;
`;

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const StyledLegend = styled.legend`
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--gold-400);
`;

const StyledLabel = styled.label`
  color: var(--white);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.span`
  font-size: 0.92em;
  color: var(--gray-400);
  font-style: italic;
`;

const FullWidthAudio = styled.audio`
  width: 100%;
  margin: 1rem 0;
`;

const LabeledAudioGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem 1.5rem;
  align-items: center;
  margin-bottom: 2rem;

  & ${FullWidthAudio} {
    margin: 0.5rem 0;
  }
`;

const StyledAudioTable = styled.table`
  width: 100%;
  margin-bottom: 2rem;
  border-collapse: collapse;
  th,
  td {
    padding: 0.5rem;
  }
  th {
    text-align: left;
  }
  thead th {
    border-bottom: 1px solid #ccc;
  }
  th:first-child,
  td:first-child {
    width: 1%;
    white-space: nowrap;
    padding: 0.5rem 1rem;
  }
`;

const CompactAudioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem 2rem;
  align-items: center;
  margin-bottom: 2rem;

  .audio-label-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: flex-start;
  }
  .audio-label-row span {
    font-weight: 500;
    margin-bottom: 0;
    text-align: left;
    min-width: 1.5em;
  }
`;

const ArchiveRadioPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [mainCapstone, setMainCapstone] = useState("none");
  const [sideInvestigations, setSideInvestigations] = useState<
    Set<ConfidentialSIKey>
  >(new Set());
  const audio = useRef<HTMLAudioElement>(null);

  // Initialize the generator with the team's current state
  useEffect(() => {
    void (async () => {
      try {
        const state = await newClient(apiUrl()).getMyTeamState();

        if (state.status !== 200) {
          console.warn(
            "Failed to fetch team state for radio player, defaulting to empty state.",
          );
          return;
        }

        const teamState = state.body.state;
        const interactionCopmlete = (name: string) =>
          Object.values(teamState.rounds).some(
            (r) => r.interactions?.[name]?.state === "completed",
          );

        if (interactionCopmlete("the_vault")) {
          setMainCapstone("the_vault");
        } else if (interactionCopmlete("the_safehouse")) {
          setMainCapstone("the_safehouse");
        } else if (interactionCopmlete("the_crime_scene")) {
          setMainCapstone("the_crime_scene");
        } else {
          setMainCapstone("none");
        }

        const sis = new Set<ConfidentialSIKey>();
        if (interactionCopmlete("confront_ferdinand")) {
          sis.add("ferdinand");
        }
        if (interactionCopmlete("confront_gladys")) {
          sis.add("gladys");
        }
        if (interactionCopmlete("confront_katrina")) {
          sis.add("katrina");
        }
        if (interactionCopmlete("confront_papa")) {
          sis.add("papa");
        }
        setSideInvestigations(sis);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleMainCapstoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainCapstone(e.target.value);
  };

  const handleSideInvestigationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value as ConfidentialSIKey;
    setSideInvestigations((prev) => {
      const next = new Set(prev);
      if (e.target.checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(false);

    const confidentialSequence: string[] = [];
    confidentialSequence.push(
      ConfidentialHandoffs[
        Math.floor(Math.random() * ConfidentialHandoffs.length)
      ] ?? confidentialHandoffA,
    );
    confidentialSequence.push(confidentialBumper);
    confidentialSequence.push(confidentialIntro);

    if (mainCapstone === "the_vault") {
      confidentialSequence.push(confidentialComplete);
    } else {
      switch (mainCapstone) {
        case "the_safehouse":
          confidentialSequence.push(confidentialPartialC);
          break;
        case "the_crime_scene":
          confidentialSequence.push(confidentialPartialB);
          break;
        case "none":
        default:
          confidentialSequence.push(confidentialPartialA);
          break;
      }

      if (sideInvestigations.size > 0) {
        confidentialSequence.push(confidentialSIIntro);
        ConfidentialSIOrder.forEach((si) => {
          if (sideInvestigations.has(si)) {
            confidentialSequence.push(ConfidentialSIs[si]);
          }
        });
      }
    }

    confidentialSequence.push(confidentialOutro);

    void (async () => {
      try {
        const crunker = new Crunker();

        const files = await crunker.fetchAudio(...confidentialSequence);
        const concat = await crunker.concatAudio(files);
        const { url } = crunker.export(concat, "audio/mpeg");

        if (audio.current) {
          audio.current.src = url;
          audio.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>WDNM 2π Virtual Radio Stream</PageTitle>
        </PageHeader>
        <PageMain>
          <Radio>
            <img src={radioImg} alt={"Rendering of Hunt radio"} />
          </Radio>

          <AuthorsNote>
            This page contains major story spoilers for the Hunt, some
            information which may make it easier to solve various puzzles, and
            one individual puzzle answer. (You’ll know it when you see it.)
          </AuthorsNote>

          <p>
            During Mystery Hunt, the <a href="/2025/extras/radio">Radios</a>{" "}
            could be tuned to WDNM 2π PM, a virtual radio station that was
            custom-generated for each team. When not feeding teams a{" "}
            <a href="/2025/extras/credits#radio-music">healthy diet of jazz</a>,
            WDNM was DJ’d by one{" "}
            <a href="https://puzzles.mit.edu/2018/">Ms. Terry Hunter</a>, who
            kept the broadcast personalized. In addition to periodic
            interjections (such as station ID breaks, as mandated by the FCC, of
            course, or event reminders), Terry would occasionally hand off to{" "}
            <a
              href={`${rootUrl}/puzzles/and_now_a_puzzling_word_from_our_sponsors`}
            >
              the station’s sponsors
            </a>{" "}
            or to{" "}
            <a href={`${rootUrl}/puzzles/a_weathered_note`}>
              Sonny, WDNM’s weatherman
            </a>{" "}
            for some more puzzling content. When major news happened (i.e. when
            a team solved a capstone metapuzzle), Terry would have a special
            breaking news bulletin. And once every three hours, Terry would host
            an episode of MITropolis Confidential, where she would review
            everything that had happened.
          </p>

          <p>
            This page allowed teams to listen to WDNM 2π when the physical radio
            wasn’t available, either because they were remote, or because the
            physical radio was away from team HQ.
          </p>

          <p>
            All of this was generated by a custom server written in{" "}
            <a href="https://www.liquidsoap.info/">Liquidsoap</a>. We ran one
            copy for each team, which listened for changes in that team’s state
            and generated their stream. (Source available{" "}
            <a href="https://github.com/mitmh2025/hunt2025/blob/main/radioman/radio.liq">
              on GitHub
            </a>
            ). The Liquidsoap server streamed its output to{" "}
            <a href="https://github.com/bluenviron/mediamtx">MediaMTX</a>.
            Clients could stream the station from MediaMTX using WebRTC
            (negotiated using{" "}
            <a href="https://www.ietf.org/archive/id/draft-murillo-whep-03.html">
              WHEP
            </a>
            ).
          </p>

          <p>
            While WDNM is no longer broadcasting, we weren’t ready to say
            goodbye to Terry just yet. We’ve included here recordings of Terry’s
            best lines, including a handful we didn’t have time to wire up for
            Hunt. We’ve also built a “MITropolis Confidential Generator”, which
            you can use to generate your own episodes of the interlude.
          </p>

          <h2>MITropolis Confidential Generator</h2>

          <p>
            During Hunt, MITropolis Confidential was scheduled to broadcast 6
            times per day, at 6:00 AM, 9:00 AM, 12:00 PM, 4:00 PM, 8:00 PM, and
            12:00 AM. On Friday at 12:50 PM, there was a special broadcast of
            MITropolis Confidential to recap the events of kickoff:
          </p>

          <FullWidthAudio
            controls
            preload="metadata"
            src={confidentialKickoffRecap}
          />

          <p>
            At all other times, the broadcast was based on teams’ current
            progress. Change the settings below to hear what MITropolis
            Confidential would sound like based on your team’s progress:
          </p>

          <GeneratorCard>
            <GeneratorForm onSubmit={handleSubmit}>
              <StyledFieldset>
                <StyledLegend>Main story capstones completed</StyledLegend>
                <CapstoneOptions>
                  <StyledLabel>
                    <input
                      type="radio"
                      name="mainCapstone"
                      value="none"
                      checked={mainCapstone === "none"}
                      onChange={handleMainCapstoneChange}
                      disabled={loading}
                    />
                    None
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="radio"
                      name="mainCapstone"
                      value="the_crime_scene"
                      checked={mainCapstone === "the_crime_scene"}
                      onChange={handleMainCapstoneChange}
                      disabled={loading}
                    />
                    The Crime Scene <Subtitle>(The Missing Diamond)</Subtitle>
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="radio"
                      name="mainCapstone"
                      value="the_safehouse"
                      checked={mainCapstone === "the_safehouse"}
                      onChange={handleMainCapstoneChange}
                      disabled={loading}
                    />
                    The Safehouse{" "}
                    <Subtitle>(The Murder in MITropolis)</Subtitle>
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="radio"
                      name="mainCapstone"
                      value="the_vault"
                      checked={mainCapstone === "the_vault"}
                      onChange={handleMainCapstoneChange}
                      disabled={loading}
                    />
                    The Vault
                  </StyledLabel>
                </CapstoneOptions>
              </StyledFieldset>
              <StyledFieldset>
                <StyledLegend>Side investigations completed</StyledLegend>
                <SideInvestigationsGrid>
                  <StyledLabel>
                    <input
                      type="checkbox"
                      name="sideInvestigation"
                      value="ferdinand"
                      checked={
                        sideInvestigations.has("ferdinand") ||
                        mainCapstone === "the_vault"
                      }
                      onChange={handleSideInvestigationChange}
                      disabled={mainCapstone === "the_vault" || loading}
                    />
                    Ferdinand <Subtitle>(The Background Check)</Subtitle>
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="checkbox"
                      name="sideInvestigation"
                      value="gladys"
                      checked={
                        sideInvestigations.has("gladys") ||
                        mainCapstone === "the_vault"
                      }
                      onChange={handleSideInvestigationChange}
                      disabled={mainCapstone === "the_vault" || loading}
                    />
                    Gladys <Subtitle>(The Paper Trail)</Subtitle>
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="checkbox"
                      name="sideInvestigation"
                      value="katrina"
                      checked={
                        sideInvestigations.has("katrina") ||
                        mainCapstone === "the_vault"
                      }
                      onChange={handleSideInvestigationChange}
                      disabled={mainCapstone === "the_vault" || loading}
                    />
                    Katrina <Subtitle>(The Stakeout)</Subtitle>
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="checkbox"
                      name="sideInvestigation"
                      value="papa"
                      checked={
                        sideInvestigations.has("papa") ||
                        mainCapstone === "the_vault"
                      }
                      onChange={handleSideInvestigationChange}
                      disabled={mainCapstone === "the_vault" || loading}
                    />
                    Papa <Subtitle>(The Illegal Search)</Subtitle>
                  </StyledLabel>
                </SideInvestigationsGrid>
              </StyledFieldset>
              <Button type="submit" disabled={loading}>
                Play
              </Button>
            </GeneratorForm>
          </GeneratorCard>
          <FullWidthAudio ref={audio} controls />

          <h2>Breaking News</h2>

          <p>
            While MITropolis Confidential would broadcast roughly every 3 hours,
            if a team solved a capstone supermetapuzzle and successfully
            completed the corresponding interaction, Terry would immediately
            play a breaking news update:
          </p>

          <LabeledAudioGrid>
            <span>The Crime Scene</span>
            <FullWidthAudio
              controls
              preload="metadata"
              src={breakingCrimeScene}
            />
            <span>The Safehouse</span>
            <FullWidthAudio
              controls
              preload="metadata"
              src={breakingSafehouse}
            />
            <span>The Vault</span>
            <FullWidthAudio controls preload="metadata" src={breakingVault} />
            <span>Confronting Carter</span>
            <FullWidthAudio
              controls
              preload="metadata"
              src={breakingFerdinand}
            />
            <span>Confronting Gladys</span>
            <FullWidthAudio controls preload="metadata" src={breakingGladys} />
            <span>Confronting Katrina</span>
            <FullWidthAudio controls preload="metadata" src={breakingKatrina} />
            <span>Confronting Papa</span>
            <FullWidthAudio controls preload="metadata" src={breakingPapa} />
          </LabeledAudioGrid>

          <p>
            Plus for one particular puzzle (
            <a href={`${rootUrl}/puzzles/he_shouldnt_have_eaten_the_apple`}>
              He Shouldn’t Have Eaten the Apple
            </a>
            ), when teams sent us the submission we had requested, Terry handed
            off the breaking news update to a special guest:
          </p>

          <FullWidthAudio controls preload="metadata" src={breakingApple} />

          <h2>Signing On</h2>

          <p>
            As teams returned to their HQ from kickoff with their new radios in
            hand, Terry signed onto WDNM 4 times starting at 12:34 PM, both to
            introduce herself and establish her role as a voice they could
            trust.
          </p>

          <LabeledAudioGrid>
            <span>12:34 PM</span>
            <FullWidthAudio controls preload="metadata" src={signonA} />
            <span>12:39 PM</span>
            <FullWidthAudio controls preload="metadata" src={signonB} />
            <span>12:44 PM</span>
            <FullWidthAudio controls preload="metadata" src={signonC} />
            <span>12:55 PM</span>
            <FullWidthAudio controls preload="metadata" src={signonD} />
          </LabeledAudioGrid>

          <h2>Puzzle Release</h2>

          <p>
            When puzzles were released to teams at 1:00 PM on Friday, Terry
            announced that over the radio:
          </p>

          <FullWidthAudio controls preload="metadata" src={release} />

          <h2>Event Reminders</h2>

          <p>
            On Friday and Saturday, Terry gave regular runthroughs of{" "}
            <a href={`${rootUrl}/rounds/events`}>events</a> that hadn’t happened
            yet. Here is the first update, which played on Friday afternoon.
            (There were three other versions for Saturday, but they mostly said
            the same thing minus events that had already occurred.)
          </p>

          <p>
            Terry also issued reminders at one hour and 15 minutes before each
            event.
          </p>

          <FullWidthAudio controls preload="metadata" src={eventSchedule} />

          <h2>Shutdown and Wakeup</h2>

          <p>
            Every night at 12:24 AM, Terry would announce last call at the Gala
            bar for any pickups before the Gala shut down for the night. At
            12:42 AM, she would announce that the Gala (and the rest of MIT’s
            campus) was closed for the evening. And finally, at 6:00 AM the
            following day, Terry would kick off the next day’s broadcast. We
            recorded wake-up announcements for Monday, just in case the Hunt ran
            long enough to need it, but fortunately we didn’t need to use it.
          </p>

          <StyledAudioTable>
            <thead>
              <tr>
                <th>Day</th>
                <th>Morning</th>
                <th>Last Call</th>
                <th>Shutdown</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Friday</th>
                <td></td>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={lastCallFriday}
                  />
                </td>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={shutdownFriday}
                  />
                </td>
              </tr>
              <tr>
                <th>Saturday</th>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={morningSaturday}
                  />
                </td>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={lastCallSaturday}
                  />
                </td>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={shutdownSaturday}
                  />
                </td>
              </tr>
              <tr>
                <th>Sunday</th>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={morningSunday}
                  />
                </td>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={lastCallSunday}
                  />
                </td>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={shutdownSunday}
                  />
                </td>
              </tr>
              <tr>
                <th>Monday</th>
                <td>
                  <FullWidthAudio
                    controls
                    preload="metadata"
                    src={morningMonday}
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </StyledAudioTable>

          <h2>Handoffs</h2>

          <p>
            For segments that happened repeatedly, Terry had a couple different
            variations of handoffs that were selected randomly.
          </p>

          <div style={{ display: "grid", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <h3>Confidential Handoffs</h3>
              <CompactAudioGrid>
                {ConfidentialHandoffs.map((src, i) => (
                  <div key={i} className="audio-label-row">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <FullWidthAudio controls preload="metadata" src={src} />
                  </div>
                ))}
              </CompactAudioGrid>
            </div>
            <div>
              <h3>Sponsor Handoffs</h3>
              <CompactAudioGrid>
                {SponsorHandoffs.map((src, i) => (
                  <div key={i} className="audio-label-row">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <FullWidthAudio controls preload="metadata" src={src} />
                  </div>
                ))}
              </CompactAudioGrid>
            </div>
            <div>
              <h3>Weather Handoffs</h3>
              <CompactAudioGrid>
                {WeatherHandoffs.map((src, i) => (
                  <div key={i} className="audio-label-row">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <FullWidthAudio controls preload="metadata" src={src} />
                  </div>
                ))}
              </CompactAudioGrid>
            </div>
            <div>
              <h3>Music Intros</h3>
              <CompactAudioGrid>
                {MusicIntros.map((src, i) => (
                  <div key={i} className="audio-label-row">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <FullWidthAudio controls preload="metadata" src={src} />
                  </div>
                ))}
              </CompactAudioGrid>
            </div>
            <div>
              <h3>Music Outros</h3>
              <CompactAudioGrid>
                {MusicOutros.map((src, i) => (
                  <div key={i} className="audio-label-row">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <FullWidthAudio controls preload="metadata" src={src} />
                  </div>
                ))}
              </CompactAudioGrid>
            </div>
            <div>
              <h3>Station IDs</h3>
              <CompactAudioGrid>
                {StationIDs.map((src, i) => (
                  <div key={i} className="audio-label-row">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <FullWidthAudio controls preload="metadata" src={src} />
                  </div>
                ))}
              </CompactAudioGrid>
            </div>
          </div>

          <h2>Signoff</h2>

          <p>
            There were a handful of announcements that we never included in the
            WDNM stream, such as announcements about published errata. We’ll
            leave you with this previously unplayed announcement from Terry,
            intended for the end of Mystery Hunt when we shut down the WDNM
            streams.
          </p>

          <FullWidthAudio controls preload="metadata" src={signoff} />
        </PageMain>
      </>
    </PageWrapper>
  );
};

export default ArchiveRadioPlayer;
