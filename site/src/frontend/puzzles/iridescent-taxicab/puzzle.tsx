import React from "react";
import { styled } from "styled-components";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import certificate from "./assets/certificate.pdf";
import huntHome from "./assets/scavenger-hunt-home.pdf";
import huntSingle from "./assets/scavenger-hunt-single.pdf";

const Script = styled.blockquote`
  margin-left: 1em;
  border-left: 2px var(--gray-300) solid;
  padding-left: 1em;
`;

const Puzzle = (): JSX.Element => {
  return (
    <AuthorsNoteBlock>
      <p>
        During Mystery Hunt, teams were instructed to schedule judging for the
        Infinite Scavenger Hunt. Upon arrival at Building 8 near the exit to the
        Eastman Court, teams were given a list of 14 tasks and a briefing on the
        rules. The locations for the tasks were fixed, but the tasks themselves
        were on separate slips of laminated paper that could be swapped between
        locations. Teams were told that they had an Infinite amount of time to
        complete all of the tasks, either by carrying out the task in person for
        the judge if the task was on the first floor, or providing photo or
        video evidence for tasks on any other floor.
      </p>

      <p>
        The judge would then begin walking towards the 77 Massachusetts Ave exit
        of Lobby 7, and teams would discover that the amount of time was only as
        Infinite as the{" "}
        <a href="https://en.wikipedia.org/wiki/Infinite_Corridor">
          Infinite Corridor
        </a>
        .
      </p>

      <hr />

      <p>
        If you’d like to judge the Infinite Scavenger Hunt for your team, you
        will need:
      </p>

      <ul>
        <li>
          A copy of{" "}
          <a href={huntSingle} target="_blank" rel="noreferrer">
            the scavenger hunt instructions
          </a>
          . The tasks on the second page should be cut out along the borders,
          and then the slips and the first page should each be laminated. Use
          Blu Tack or some other temporary adhesive to assign the tasks to
          locations. (Critically, the Rubik’s Cube task should be assigned to a
          location on the first floor.)
        </li>
        <li>A dry-erase marker for tracking task completion</li>
        <li>A scrambled Rubik’s Cube</li>
        <li>A phone for sending and receiving photos and videos</li>
        <li>
          And, in case the team succeeds, a permanent marker and copies of the{" "}
          <a href={certificate} target="_blank" rel="noreferrer">
            completion certificate
          </a>{" "}
          and the{" "}
          <a href={huntHome} target="_blank" rel="noreferrer">
            home game
          </a>
          .
        </li>
      </ul>

      <p>When you arrive at Building 8, deliver the following script:</p>

      <Script>
        Welcome to the Infinite Scavenger Hunt! First, I’d like to request a
        phone number from someone in this group that can receive text messages.
        We’re going to request from you a number of tasks to be done at specific
        locations, that you can see on this sheet.{" "}
        <em>[Give the team the task list]</em> I’ll take this back in a minute
        or so, but you should feel free to take a photo of it or anything. Tasks
        at first floor locations will need to be carried out in person to the
        judge, that’s me. For all other locations, photos or videos are
        acceptable. Creativity in achieving the prompts will be accepted. Any
        questions? If not, I’ll take the task list back now. You will have an
        Infinite amount of time to complete the scavenger hunt, starting now.
      </Script>

      <p>
        Then begin walking towards Lobby 7 at a slow pace. It should take 5–7
        minutes to walk the full distance. As tasks are shown to you or you
        receive photos and videos, mark them on the task list using the
        dry-erase marker.
      </p>

      <p>Make sure to pause at the 5 first floor locations along the way:</p>

      <ul>
        <li>The DSME Breakerspace</li>
        <li>The poster for the Caving Club</li>
        <li>The Dollar Bill Lounge</li>
        <li>Lobby 10</li>
        <li>The MIT Seal at the entrance to Lobby 7</li>
      </ul>

      <p>
        If someone from the team is there waiting, allow them to demonstrate the
        task. Otherwise, stop and look around before continuing to walk.
      </p>

      <p>
        When you reach the exterior wall of Lobby 7, time has expired. If the
        team has succeeded, you can fill out the completion certificate using
        the permanent marker and give it to the team along with the home game.
        Otherwise, text them a selfie of you touching the wall with the text “An
        Infinite amount of time has elapsed! Please contact HQ again to
        reschedule.” (As is hopefully clear at this point, the capitalized “I”
        is important). If the team wishes to make another attempt, you should
        make sure to re-shuffle the tasks.
      </p>

      <p>
        While judging, you should reward creativity in any form. This can
        include creative interpretations of the tasks (”solving” a Rubik’s Cube
        is in the present continuous tense and therefore does not require that
        the Cube end up ”solved”), but also creativity with the overall
        structure. For instance, during Mystery Hunt, when we handed them the
        list of tasks, some teams used this opportunity to rearrange the tasks
        to something they could complete more easily.
      </p>

      <hr />

      <p>
        If you can not or do not want to run your own version of the Infinite
        Scavenger Hunt, you can instead collect your{" "}
        <a href={certificate} target="_blank" rel="noreferrer">
          completion certificate
        </a>{" "}
        and the{" "}
        <a href={huntHome} target="_blank" rel="noreferrer">
          home game
        </a>{" "}
        and solve the remainder of the puzzle.
      </p>
    </AuthorsNoteBlock>
  );
};

export default Puzzle;
