import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../../components/ContentWithNavBar";
import { Math, MSup, MI, MO, MN } from "../../../components/MathML";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../../../components/PageLayout";

export function aboutHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>About the Hunt</PageTitle>
        </PageHeader>
        <PageMain>
          <h2>Hunt mechanics</h2>
          <h3>Keys 🗝️ and Unlocking Puzzles</h3>
          <p>
            Unlocking a new puzzle requires a key 🗝️. All puzzles that can be
            unlocked will show one in the associated round page and the list of
            all puzzles. Simply click to unlock. Doing so will spend one of your
            keys.
          </p>
          <p>
            Each regular puzzle requires one key to unlock, and will provide one
            key upon solving.
          </p>
          <p>
            Metapuzzles and certain other puzzles (including those released
            through stray leads) will generally not require any keys to unlock,
            nor provide any keys upon solving.
          </p>
          <p>
            Your trainee squad will start out with 9 keys 🗝️, and thus be able
            to explore 9 leads simultaneously (excluding stray leads and
            metapuzzles). There are generally very few ways to increase your
            number of keys.
          </p>
          <p>
            Before being unlocked, a puzzle will display a brief summary of what
            you can expect to find on the puzzle page. It is up to you to decide
            which leads you’re most excited to investigate at any time.
          </p>
          <h3>Submitting Answers</h3>
          <p>
            Every puzzle has an answer submission box on the puzzle page, which
            ignores spaces, capitalization, and punctuation. If you guess too
            many incorrect answers for a puzzle in a given time frame, there
            will be a delay before you can guess again. Specifically, for a
            given puzzle, you can make{" "}
            <Math>
              <MI>n</MI>
              <MO>+</MO>
              <MN>1</MN>
            </Math>{" "}
            guesses in any{" "}
            <Math>
              <MSup>
                <MI>n</MI>
                <MN>2</MN>
              </MSup>
            </Math>
            -minute time window.
          </p>
          <p>
            The answer checker is fairly generous about confirming partial
            answers to puzzles, including intermediate and final cluephrases,
            and these do not count as incorrect guesses. In general, we
            recommend submitting cluephrases, especially if you believe a puzzle
            resolves to an actionable instruction—the answer checker may give
            more specifics about this instruction. Please always submit these
            instructions to the answer checker before coming to the Gala bar to
            act on them.
          </p>
          <h3>Clues 🔎</h3>
          <p>
            Over the course of the investigation, you may also earn Clues 🔎,
            which can be used to instantly get the answer to a (non-meta) puzzle
            that you have unlocked. Spending a clue gives you the answer to a
            puzzle, which you can then submit to solve the puzzle (and receive a
            key for solving, if the puzzle would have otherwise granted one).
          </p>
          <p>
            Clues can also be exchanged for keys, at a rate of 1 clue to 3 keys.
            This is unidirectional, and keys cannot be exchanged for clues. In
            practical terms, this means trading a free answer for an increased
            number of puzzles you can solve simultaneously. When and if to make
            these trades is up to you.
          </p>
          <h3>Events</h3>
          <p>
            Events are the primary way to earn additional clues and keys. Each
            event has a page where you can submit its answer after completion
            and receive a reward of either 1 or 2 clues. Clues can then be used,
            or exchanged for keys, at any time.
          </p>
          <p>
            To be clear, events are extremely valuable for your overall ability
            to proceed in your investigation. There are four events and the
            schedule is accessible from the home page. We highly recommend
            attending.
          </p>
          <h3>Hints</h3>
          <p>
            From time to time, puzzles may become eligible for hinting. Hints
            will only become available when we have unlocked hinting for that
            puzzle AND you have had that puzzle open for a certain period of
            time. It is worth checking in on puzzles that you have had open for
            extended periods in case hints have become available.
          </p>
          <p>
            To request a hint, click the “Request a Hint” button and type out as
            much detail as you can about where you are stuck. The more you tell
            us about your progress, the more context we will have to provide a
            suitable hint. Your team may only have one unanswered hint across
            all puzzles at a time.
          </p>
          <h3>Physical Puzzles and Interactions</h3>
          <p>
            Some puzzles, or parts of puzzles, are physical or interactive and
            can only be done on campus. For fairness, we have only one version
            of any puzzle or interaction for all teams.
          </p>
          <p>
            When a puzzle obviously consists of a physical object pickup or
            interactive event from the start, its pre-unlock summary will say
            this. However, not all puzzles with on-campus elements will be
            labeled as such, because discovering this is part of solving.
          </p>
          <p>
            We will not run physical puzzle pickups or interactions while the
            Gala bar is closed. We recommend against spending your keys on
            obviously physical/on-campus puzzles during this time or whenever
            your team does not have available on-campus solvers.
          </p>
          <h2>Hunt Website</h2>
          <p>
            Our Hunt website has been primarily tested in the latest versions of
            Chrome and Firefox. We cannot make any promises about behavior in
            other browsers. Where possible, we’ve provided a copy-to-clipboard
            button, which is primarily tested against Google Sheets, but we
            cannot always guarantee perfect fidelity to the puzzle page. The
            puzzle as displayed on this website is canonical, and as always,
            “the spreadsheet is not the puzzle” (unless it is the puzzle).
          </p>
          <h2>Getting In Touch</h2>
          <p>
            There are lots of great reasons to visit or contact us—if a puzzle
            instructs you to, if you think there is an erratum or technical
            issue, if you are not having fun and want extra help, or if you just
            want to say hi!
          </p>
          <p>
            If you need to reach out, the easiest option is to visit us at the
            Gala bar. The bar staff can direct any questions to the right
            people. The second best option is email, at{" "}
            <a
              href="mailto:info@mitmh2025.com"
              target="_blank"
              rel="noreferrer"
            >
              info@mitmh2025.com
            </a>
            . In an urgent situation, you can also call us at 617-324-7732.
          </p>
          <h2>The Gala</h2>
          <p>
            The Gala bar is the hub of this entire investigation—and an ongoing
            party. The Finster family, members of the Two P.I. Noir staff, and
            anyone else you need to meet can be found there. We expect that Two
            P.I. Noir trainees will visit frequently throughout the weekend—to
            accomplish tasks, request additional help, interact with suspects,
            or just socialize with us or trainees on other teams. You are
            welcome and encouraged to visit any time the Gala event space is
            open.
          </p>
          <h3>Location and Access</h3>
          <p>
            In MIT terms, the Gala bar is in the Stata Center (
            <a
              href="https://whereis.mit.edu/?go=32"
              target="_blank"
              rel="noreferrer"
            >
              Building 32
            </a>
            ) 4th Floor R&amp;D Commons. Stata can be a bit confusing, but
            coming up the Dreyfoos (not Gates) elevator bank to the 4th floor
            should get you very close. Note that the Gates elevators and many
            doors do have card readers, so if you are having difficulty with
            Atlas access, there is another easy option: take the Building 36
            elevators to the 4th floor, turn right and then right again, so
            you’re facing Stata. Then just walk straight through the hallway and
            the skybridge and keep going until you’re in the Gala.
          </p>
          <h3>Hours</h3>
          <p>
            The Gala bar will be open during approximately the same hours that
            solvers are allowed on campus, 6AM-1AM, give or take a bit for setup
            and teardown (last call is 12:45). Outside this time, you will be
            unable to pick up physical puzzles or interact with characters.
          </p>
          <h3>Who’s Who</h3>
          <p>
            All of the suspects in this investigation will typically be around
            the Gala, and are recognizable from the polaroid profiles on the
            homepage. If you ever need to speak with a suspect, the easiest
            thing to do is ask at the bar.
          </p>
          <p>
            Gala bar staff are your primary contacts for anything you need, or
            anything you want to leave for the Two P.I. Noir team. They can be
            found behind the bar, typically wearing an apron and tie. You should
            generally go see them first.
          </p>
          <p>
            Members of the press (recognizable by their “PRESS” hats) are
            available if you’d like additional help on puzzles, advice on
            navigating the investigation, or have any puzzle-related questions
            or clarifications. Note that the press may be unable or unwilling to
            help teams of Two P.I. Noir trainees that are already doing well.
          </p>
          <h2>Your Radio</h2>
          <p>
            Each on-campus team will have received a radio from Mr. Finster,
            which is critical for completing the investigation. This is a
            complex technological device, so instructions for care and use are
            here: <a href="/radio">Radio Instruction Manual</a>
          </p>
          <p>
            The radio host, Miss Terry Hunter, and primary music stream are
            never puzzle content.
          </p>
          <p>
            Do not attempt to hack, disassemble, or otherwise alter your radio.
            We do not have spares, and damaging your radio is likely to result
            in your being unable to complete parts of the investigation.
          </p>
          <h2>Physical Access</h2>
          <p>
            Physical access to campus is now managed by a system called Atlas.
            For visitors, this is different from the previous Tim Tickets
            system. The Atlas rollout to visitors has been a little bumpy, and
            we strongly recommend getting it configured before coming to campus.
          </p>
          <p>
            For non-affiliates, MIT has provided{" "}
            <a
              href="https://kb.mit.edu/confluence/display/istcontrib/Atlas+-+Visitor+Guest+Account+and+MIT+Guest+ID+Setup+on+iOS+and+Android+Devices"
              target="_blank"
              rel="noreferrer"
            >
              instructions for setting up an Atlas guest account
            </a>
            , although we are aware of reports that this workflow does not work
            consistently (and particularly that the Okta Verify step doesn’t
            appear to be necessary). It is also possible to migrate an existing
            Tim Tickets guest account to Atlas when you first open the Atlas
            app. Please use the linked instructions for more details.
          </p>
          <p>
            After setting up your account and mobile ID, you should be able to
            add the Mystery Hunt event through the{" "}
            <a
              href="https://all.atlas-apps.mit.edu/3BNEVwtLFroMcFzeA"
              target="_blank"
              rel="noreferrer"
            >
              event link here
            </a>
            . This enables your Atlas mobile ID to open doors around campus for
            the duration of the Hunt.
          </p>
          <p>
            MIT Alumni should also download and install the Atlas app, but
            instead of logging in as a guest, click “alumni login” and use your
            Infinite Connection credentials. Alumni should not need to use the
            event link.
          </p>
          <p>
            To be fully transparent, we are aware that non-affiliate visitors
            (and some alumni) have had a lot of challenges with the Atlas
            rollout and setup. In particular, adding events from links has been
            inconsistent, and sometimes takes 10+ attempts, or requires opening
            the link via a mobile browser. Our best advice at this time is a
            combination of persistence and superstitious voodoo. We promise that
            this is not a puzzle we wrote for you, but running enterprise-scale
            access control for a hundred-year-old campus is hard, and we
            continue to appreciate the Institute’s efforts to help us welcome
            guests to campus.
          </p>
          <h2>Sponsors</h2>
          <p>
            The MIT Mystery Hunt is made possible by tens of thousands of hours
            of volunteer time and a desire of writing teams to give back to the
            community, but it also requires real money to run. It would not be
            possible without the generous donations to MIT Puzzle Club from MIT
            alumni and puzzle community members, and the very generous support
            of our sponsors.
          </p>
          <h3>Gold Sponsors</h3>
          <p>TODO(mprat)</p>
          <h3>Silver Sponsors</h3>
          <p>TODO(mprat)</p>
          <h3>Bronze Sponsors</h3>
          <p>TODO(mprat)</p>
          <p>Additional thanks to SOLE, CAC, and MIT PD.</p>
        </PageMain>
      </>
    </PageWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "About the Hunt",
    },
    teamState,
  );
}
