import type { ParamsDictionary } from "express-serve-static-core";
import { styled } from "styled-components";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../../components/PageLayout";
import type { PageRenderer } from "../../utils/renderApp";
import rootUrl from "../../utils/rootUrl";
import hero from "./assets/hero.png";

const SizedImage = styled.img`
  width: 100%;
`;

const handler: PageRenderer<ParamsDictionary> = () => {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>The Gala</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <div>
            <SizedImage
              src={hero}
              alt="A mockup of the design for the Gala bar"
            />
          </div>

          <p>
            Within the universe of the Hunt, the Gala was a party thrown to
            celebrate the engagement of Gladys Finster and Ferdinand Carter. It
            served as the framing device for the entire Hunt — it was the
            location from which the Shadow Diamond was stolen — but as Papa
            didn’t want to draw attention to the embarrassment of having the gem
            go missing, the party was to continue as planned.
          </p>

          <p>
            Outside of the Hunt’s story, set up in the R&amp;D Commons on the
            4th floor of the Stata Center, the Gala was the real-world hub for
            in-person Hunt activities. It served as an open Hunt Headquarters,
            where on-duty members of Death &amp; Mayhem were available for story
            interactions, physical puzzle pickups, hints, or just to say “hi.”
            While we had an additional back-of-house, private headquarters in a
            nearby room, team members were generally encouraged to hang out at
            the Gala and socialize when possible.
          </p>

          <h2>The Bar</h2>

          <div id="gala-carousel-bar" />

          <p>
            The most prominent feature of the Gala was a 20-foot-long bar (with
            no alcohol, of course). The bar was staffed full-time with
            team-members dressed as bartenders. They served as first
            point-of-contact for any time solvers visited the Gala, and handled
            distribution of physical puzzles, running post-puzzle interactions,
            and collecting items that solvers had been instructed to make and
            bring us. In addition to pure physical puzzles that needed to be
            picked up, many of our puzzles were specifically written around
            creating interactions at the Gala bar, and teams found themselves
            frequently coming back to speak with the bartenders. The
            interactions created many memorable moments and an atmosphere of
            constant activity, as teams attempted to seduce our bar staff, beat
            them at card games or darts, or settle their outstanding bill in
            order to get access to answers or more puzzle content.
          </p>

          <p>
            As for the bar itself, the bartop was built out of wood, while the
            backbar consisted of decorative coverings over standard wire
            shelves. The bartop was curved in order to give it more presence,
            allow more solvers to be served at once, and to better separate the
            spaces in front of and behind the bar. On the bar sat three “cash
            registers,” which hid tablet computers used by the bartenders to
            track which teams had successfully unlocked which interactions. The
            diamond-shaped cutouts at the top of the backbar reflect the missing
            status of the Shadow Diamond and match the{" "}
            <a href="/2025/extras/coin">cutout in the design of the coin</a>.
            The “bottles” of the backbar were lasercut and sandblasted acrylic
            and lit from below with RGB LEDs, displaying a range of effects.
            These bottles called back to the LED-lit shelves of memories from
            the{" "}
            <a href="https://puzzles.mit.edu/2018/">
              2018 “Inside Out”-themed MIT Mystery Hunt
            </a>
            . The bottles were also held up with barrel bolts; when opened, they
            would flip down to allow access to physical puzzles, which were
            stored behind the bottles. On one side the backbar, a large phone
            was installed which the bartenders could remotely operate for{" "}
            <a href={`${rootUrl}/puzzles/in_communicado_tonight`}>
              In Communicado Tonight
            </a>
            .
          </p>

          <h2>Ambiance</h2>

          <div id="gala-carousel-ambiance" />

          <p>
            The Gala was designed to serve many goals: beyond being just a
            framing device, it allowed solvers to immerse themselves in the
            story and world, and served as both a point of contact with the
            writing team and “neutral territory” for social gathering with
            solvers on other teams. In addition to the bar, there were high and
            low tables for socializing or puzzle-solving, decorative elements
            such as the engagement cake and{" "}
            <a href={`${rootUrl}/puzzles/art_history`}>paintings</a>, and a
            constant stream of era-appropriate background music. Teams were
            encouraged to dress up for Papa’s fancy shindig, and a photo booth,
            complete with backdrop, props, and an old-timey camera, rounded out
            the Gala so that visitors could strut their stuff on the red carpet
            and record it for posterity.
          </p>

          <h2>Characters and The Speakeasy</h2>

          <div id="gala-carousel-characters" />

          <p>
            As teams reached milestones in the Hunt, they were instructed to
            confront characters with what they’d learn. Upon showing up at the
            Gala bar to do so, they were whisked away to the Speakeasy for a
            private interaction. (After all, you can’t have them blabbing out
            secrets in the middle of the party!) Each of these interactions
            involved speaking with one or more characters, doing some light
            puzzle activity, and learning more about the unfolding story. The
            Speakeasy was staffed full-time by a lighting and{" "}
            <a href="/2025/extras/music">music</a> operator and a stage manager
            who coordinated teams’ interactions.
          </p>

          <p>
            Cast members cycled back and forth between doing scripted
            performances in the Speakeasy and unscripted meet-and-greets in the
            Gala. The characters of the Hunt could be found in the Gala when
            they weren’t otherwise occupied, and schmoozed with guests who came
            to visit, further helping to breathe life into the story of the
            Hunt.
          </p>

          <h2>The Press Corps</h2>

          <div id="gala-carousel-press" />

          <p>
            Finally, investigators-in-training were encouraged to visit the
            Press Pool at the Gala if they needed additional support, where
            members of the Press (i.e. Death &amp; Mayhem puzzle editors and
            authors, complete with spiffy hats) spent much of the weekend
            swapping scoops. They were available to give live hints, look at
            potential errata, answer questions about overall Hunt structure, and
            validate teams’ skill at{" "}
            <a href={`${rootUrl}/puzzles/trainees_first_recital`}>
              playing music on their radio
            </a>
            .
          </p>

          <p>
            (They would like you to know, however, that if they never hear the
            Star-Spangled Banner played on a Mystery Hunt radio again, it will
            be too soon.)
          </p>
        </PageMain>
      </>
    </PageWrapper>
  );

  return { node, title: "The Gala", entrypoints: ["archive_gala"] };
};

export default handler;
