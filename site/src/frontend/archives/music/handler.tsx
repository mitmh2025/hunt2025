import type { ParamsDictionary } from "express-serve-static-core";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import { AuthorsNote } from "../../components/PuzzleLayout";
import type { PageRenderer } from "../../utils/renderApp";
import rootUrl from "../../utils/rootUrl";
import closingTime from "./assets/closing-time.mp3";
import crimeScene from "./assets/crime-scene.mp3";
import ferdinand from "./assets/ferdinand.mp3";
import finale1 from "./assets/finale-1.mp3";
import finale2 from "./assets/finale-2.mp3";
import finale3 from "./assets/finale-3.mp3";
import gladys from "./assets/gladys.mp3";
import katrina from "./assets/katrina.mp3";
import kickoff from "./assets/kickoff.mp3";
import papa from "./assets/papa.mp3";
import safehouse from "./assets/safehouse.mp3";
import wdnmBreaking from "./assets/wdnm-breakingnews.mp3";
import wdnmConfidential from "./assets/wdnm-confidential.mp3";
import wdnmStandard from "./assets/wdnm-standard.mp3";
import wdnmWeather from "./assets/wdnm-weather.mp3";

const StyledAudio = styled.audio`
  display: block;
  width: 100%;
`;

const AudioPlayer = styled.div`
  margin: 1em 0;
`;

const handler: PageRenderer<ParamsDictionary> = () => {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Music</PageTitle>
        </PageHeader>
        <PageMain>
          <NotoColorEmojiFont />

          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <AuthorsNote>
            Musical themes throughout the Hunt were often heavily inspired by
            major discoveries about characters and plotpoints. As such, there
            are equally major plot spoilers on this page.
          </AuthorsNote>

          <p>
            Hunt featured original music that was composed and arranged by the
            team, used in{" "}
            <a href="https://www.youtube.com/watch?v=cWPZ61YgY6s">Kickoff</a>{" "}
            and each of the major in-person interactions: (
            <a href={`${rootUrl}/interactions/the_crime_scene`}>
              The Crime Scene
            </a>
            ,{" "}
            <a href={`${rootUrl}/interactions/the_safehouse`}>The Safehouse</a>,{" "}
            <a href={`${rootUrl}/interactions/the_vault`}>The Vault</a>, and the
            confrontations of{" "}
            <a href={`${rootUrl}/interactions/confront_katrina`}>Katrina</a>,{" "}
            <a href={`${rootUrl}/interactions/confront_gladys`}>Gladys</a>,{" "}
            <a href={`${rootUrl}/interactions/confront_carter`}>Carter</a>, and{" "}
            <a href={`${rootUrl}/interactions/confront_papa`}>Papa</a>). All of
            the interactions (other than The Safehouse) included vamps, played
            on loop to underscore the activity that solvers needed to complete;
            an in-room operator would advance the score when teams completed the
            activity.
          </p>

          <p>
            Each of these pieces is featured in context in the pre-recorded
            video versions of the interactions (except for The Vault, which was
            not pre-recorded), we’ve also included each of them below.
          </p>

          <h2>Motifs</h2>

          <p>
            In addition to being the inspiration for{" "}
            <a href="https://youtu.be/2qwjMkvlAyI?si=eJSEVdwlD-OgRE2n&t=605">
              the plot and characters
            </a>
            , “Hush Little Baby” served as the primary inspiration for the music
            throughout the Hunt, which used variations of the lullaby as a
            repeated motif. Several of the major characters had their own
            motifs, which were often featured either when they were leading a
            scene or an interaction with players:
          </p>

          <ul>
            <li>
              <strong>Carter</strong>: Carter’s motif combined “Hush Little
              Baby” with “La Vie en Rose”, symbolizing both his obsession with
              France (especially French patisserie) and his somewhat blind
              infatuation with Gladys.
            </li>
            <li>
              <strong>Gladys</strong>: While Carter was so smitten with Gladys
              as to be blind to her faults, Gladys’s motif, like Gladys herself,
              hid darker secrets. It featured a minor transposition of “La Vie
              en Rose” combined with elements inspired by the “Imperial March”
              from Star Wars.
            </li>
            <li>
              <strong>Katrina</strong>: Katrina’s motif featured “Hush Little
              Baby” re-imagined as a tango (representing her constant dance
              around the truth as an undercover cop)
            </li>
            <li>
              <strong>Papa</strong>: As befitting his role as MITropolis’s crime
              boss, Papa’s motif combined “Hush Little Baby” with a theme
              inspired by the Love Theme from The Godfather.
            </li>
            <li>
              <strong>Billie</strong>: Billie’s melodic motif again drew on
              “Hush Little Baby”, but as our guide into the world of noir, was
              distinctively represented by a less orchestral and more jazzy
              lounge feel.
            </li>
          </ul>

          <h2>Kickoff</h2>

          <p>
            The music for kickoff starts with an more formal orchestral scoring,
            introducing each character’s themes as they themselves enter the
            frame. When the diamond is discovered to be missing and the noir
            theme is introduced, the music shifts to Billie’s jazz style.
            Because this music was scored to the video, it includes sections of
            silence, especially in the second half, where the jazz music
            underscores Billie’s inner monologue but not external dialogue with
            the other characters.
          </p>

          <AudioPlayer className="audio-player" data-src={kickoff}>
            <StyledAudio src={kickoff} preload="metadata" controls />
          </AudioPlayer>

          <h2>The Crime Scene and The Safehouse</h2>

          <p>
            These scores are variations on Billie’s motif and style. For the
            Crime Scene, there is a vamp in the middle while teams search the
            crime scene for evidence, eventually discovering the fake Shadow
            Diamond.
          </p>

          <h3>The Crime Scene</h3>
          <AudioPlayer
            className="audio-player"
            data-src={crimeScene}
            data-loop-start="92.727"
            data-loop-end="112.727"
          >
            <StyledAudio src={crimeScene} preload="metadata" controls />
          </AudioPlayer>

          <h3>The Safehouse</h3>
          <AudioPlayer className="audio-player" data-src={safehouse}>
            <StyledAudio src={safehouse} preload="metadata" controls />
          </AudioPlayer>

          <h2>The Vault</h2>

          <p>
            The finale featured three different compositions, each of which was
            designed to lead into the next. The first segment featured reprises
            of all of the characters’ themes coming together, as the characters
            themselves converged on the Finster family vault. It looped in the
            background as teams planned their attempts to break into the vault
            (although it faded out while teams were actually making an attempt —
            no background music while you’re doing foley work!).
          </p>

          <AudioPlayer
            className="audio-player"
            data-src={finale1}
            data-loop-start="0"
            data-loop-end="442.6"
          >
            <StyledAudio src={finale1} preload="metadata" controls />
          </AudioPlayer>

          <p>
            After teams entered the vault and Katrina revealed her role as an
            undercover police officer, the music faded to a variation on her
            theme.
          </p>

          <AudioPlayer className="audio-player" data-src={finale2}>
            <StyledAudio src={finale2} preload="metadata" controls />
          </AudioPlayer>

          <p>
            And finally, after Baby slammed the vault door shut for her grand
            denouement, Katrina’s theme faded out and was replaced with a new
            dissonant variation on “Hush Little Baby”, which vamped in the
            background as the characters tied up the loose ends of the plot,
            before the police sirens of Katrina’s backup faded in from the
            distance.
          </p>

          <AudioPlayer
            className="audio-player"
            data-src={finale3}
            data-loop-start="159.4"
            data-loop-end="183.8"
          >
            <StyledAudio src={finale3} preload="metadata" controls />
          </AudioPlayer>

          <h2>Confrontations</h2>

          <p>
            Each of the confrontation interactions after solving a capstone
            super-meta featured a different score. Each was an extended version
            of the motif of the character being confronted. Each also included a
            vamp in the middle to underscore whatever activity teams needed to
            complete in order to extract a favor out of the character.
          </p>

          <h3>Confronting Carter</h3>
          <AudioPlayer
            className="audio-player"
            data-src={ferdinand}
            data-loop-start="156"
            data-loop-end="177"
          >
            <StyledAudio src={ferdinand} preload="metadata" controls />
          </AudioPlayer>

          <h3>Confronting Katrina</h3>
          <AudioPlayer
            className="audio-player"
            data-src={katrina}
            data-loop-start="76.5"
            data-loop-end="93.5"
          >
            <StyledAudio src={katrina} preload="metadata" controls />
          </AudioPlayer>

          <h3>Confronting Gladys</h3>
          <AudioPlayer
            className="audio-player"
            data-src={gladys}
            data-loop-start="76.8"
            data-loop-end="102.4"
          >
            <StyledAudio src={gladys} preload="metadata" controls />
          </AudioPlayer>

          <h3>Confronting Papa</h3>
          <AudioPlayer
            className="audio-player"
            data-src={papa}
            data-loop-start="160.5"
            data-loop-end="172.5"
          >
            <StyledAudio src={papa} preload="metadata" controls />
          </AudioPlayer>

          <h2>Other Music</h2>

          <p>
            The <a href={`${rootUrl}/virtual_radio`}>WDNM 2π PM</a> radio stream
            featured four different “bumpers” to introduce various segments. A
            standard bumper:
          </p>

          <AudioPlayer className="audio-player" data-src={wdnmStandard}>
            <StyledAudio src={wdnmStandard} preload="metadata" controls />
          </AudioPlayer>

          <p>MITropolis Confidential:</p>

          <AudioPlayer className="audio-player" data-src={wdnmConfidential}>
            <StyledAudio src={wdnmConfidential} preload="metadata" controls />
          </AudioPlayer>

          <p>Breaking news segments:</p>

          <AudioPlayer className="audio-player" data-src={wdnmBreaking}>
            <StyledAudio src={wdnmBreaking} preload="metadata" controls />
          </AudioPlayer>

          <p>
            And <a href={`${rootUrl}/puzzles/a_weathered_note`}>the weather</a>:
          </p>
          <AudioPlayer className="audio-player" data-src={wdnmWeather}>
            <StyledAudio src={wdnmWeather} preload="metadata" controls />
          </AudioPlayer>

          <p>
            And finally, although we were not able to integrate it into the WDNM
            broadcast, we arranged a jazz cover of “Closing Time” by Semisonic
            intended to encourage teams to go home every night at 1:00 AM when
            campus closed for the evening:
          </p>

          <AudioPlayer className="audio-player" data-src={closingTime}>
            <StyledAudio src={closingTime} preload="metadata" controls />
          </AudioPlayer>
        </PageMain>
      </>
    </PageWrapper>
  );

  return {
    node,
    title: "Music",
    entrypoints: ["archive_music"] as const,
  };
};

export default handler;
