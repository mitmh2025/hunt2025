import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import baby from "./assets/baby.jpg";
import billie from "./assets/billie.jpg";
import cake from "./assets/cake.jpg";
import car from "./assets/car.jpg";
import katrina from "./assets/katrina.jpg";
import veil from "./assets/veil.jpg";

const Blockquote = styled.blockquote`
  margin-top: 0;
  margin-left: 0;
  padding: 0.5rem 1rem;
  border-left: 5px solid var(--gray-300);
  font-style: italic;
`;

const FinaleImageContainer = styled.p`
  text-align: center;
  & img {
    width: 75%;
  }
`;

const Interaction = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Your leads are coming together. Stay by the phone.
      </p>

      <AuthorsNoteBlock>
        <p>
          Teams that reach this page have successfully completed the 2025 MIT
          Mystery Hunt: The Case of the Shadow Diamond. Congratulations!
        </p>

        <p>
          The 6 teams that reached this point while HQ was open during Mystery
          Hunt were able to complete some variation of our finale sequence. We
          learned quickly that the full endgame as origianlly envisioned
          was…somewhat challenging for us to execute from a logistics and
          staffing perspective. Cardinality, as the winning team, got the full
          experience; all other teams that finished the Hunt saw an abbreviated
          version.
        </p>

        <p>
          You can see much of the full experience, including the dramatic
          conclusion as performed by our cast, in this video:
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/BLo3LVkh51Y"
          title="The Vault - MITMH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: "100%", height: "100%", aspectRatio: "16 / 9" }}
        />

        <p>
          Or if you’d prefer to read about what happened, we’ve captured below
          the full experience as it was envisioned. (Our thanks to Cardinality
          for sharing the linked and inline photos below with us)
        </p>
      </AuthorsNoteBlock>

      <p>
        Upon completing all super-metas and capstone interactions, the team
        receives five phone calls in rapid succession, each demanding a portion
        of the team offer assistance. After arriving at the designated meeting
        place, each group is given a different task to complete, enroute to an
        important stop at the family vault.
      </p>

      <h2>The Journey to the Vault</h2>

      <h3>Billie</h3>

      <Blockquote>
        It’s Billie. I think we’re getting close to the end of this, but I need
        your help. There’s a lot of you, so send about twenty percent of your
        team to meet me at Hart Nautical Gallery. Send your shrewdest
        negotiators.
      </Blockquote>

      <p>
        Billie explains that they know where Rover is holed up, but when they
        arrive the door is locked and Rover refuses to exit. A nearby locksmith
        offers to help, for a price. A pun-based trading game follows,
        culminating in the locksmith opening the door.
      </p>

      <ul>
        <li>
          Dave, formerly David, accepts his lost ID and offers a pickle in
          gratitude.
        </li>
        <li>
          The cook, who didn’t relish running out, accepts a pickle and offers
          toothpaste.
        </li>
        <li>
          The crestfallen dentist accepts toothpaste and offers shoelaces.
        </li>
        <li>
          The druggist, unsure what his new shoes were laced with, accepts
          shoelaces and offers a toupee.
        </li>
        <li>
          The locksmith, who feels compelled to change his locks, accepts the
          toupee and opens the door.
        </li>
      </ul>

      <p>
        Rover slips out the back, believing he’s lost Billie and the group, who
        follow him to the vault.
      </p>

      <h3>Katrina</h3>

      <Blockquote>
        Officer Mockingbird calling. I’m ready to make arrests, but I’ll need
        your help. Send maybe 20% of your group, including your best wordsmiths,
        to meet me next to the Park Room.
      </Blockquote>

      <p>
        Katrina explains that she’s going to the courthouse to get a warrant and
        she’ll need the group to make their case, being sure to use the phrases
        “probable cause,” “actus reus,” “mens rea,” and “ignorantia juris non
        excusat.” The judge immediately falls asleep, prompting Katrina to
        recall that, “She used to be a beat cop” and thus arguments must be
        presented in the form of a rap.
      </p>

      <p>
        The group plead their case in rhythm and rhyme and, armed with a
        warrant, proceed to the vault.
      </p>

      <h3>Papa</h3>

      <Blockquote>
        This is Papa Finster. I’m down my right- and left-hand men, so you’re
        going to have to do. Send about 20% of your group to meet me at the
        table in the 3rd floor hallway of building 35. Be sure to send some good
        navigators.
      </Blockquote>

      <p>
        Papa explains that he’s on his way to the vault on the third floor of
        Edgerton, Germeshaisen, and Grier, for reasons he refuses to divulge,
        but with Rover missing will need the group to drive his Duesenberg.
      </p>

      <p>
        He hands over the controls to a{" "}
        <a href={car} target="_blank" rel="noreferrer">
          difficult-to-drive RC car
        </a>{" "}
        (truly, Rover must have had the magic touch) and, when prompted, insists
        that no stairs or elevators be used and that his car not be exposed to
        the elements. The direct route includes two stairs, forcing much more
        circuitous navigation through the corridors of MITropolis.
      </p>

      <h3>Gladys</h3>

      <Blockquote>
        This is Gladys Finster. I’m ready to get what I promised you, but I have
        some important stops to make and you seem… competent. Send maybe 20% of
        your group — the ones who know how to be discreet and don’t mind doing a
        little heavy lifting — to meet me at the man with the shiny nose.
      </Blockquote>

      <p>
        Gladys intends to make good on her promise of a bribe, which she’ll have
        to retrieve from the vault, but first she’ll need to make several
        socially important stops. With Rover missing, this group will have to
        do. Enroute, they collect:
      </p>

      <ul>
        <li>
          A replacement{" "}
          <a href={cake} target="_blank" rel="noreferrer">
            cake
          </a>{" "}
          for the one Ferdinand ate, which she insists must be hidden from all
          directions, despite being several feet tall.
        </li>
        <li>
          A box full of jingle bells she insists must remain a surprise and
          therefore cannot be heard.
        </li>
        <li>
          Her{" "}
          <a href={veil} target="_blank" rel="noreferrer">
            wedding veil
          </a>{" "}
          (an enormous length of plastic wrap), which she insists must not be
          allowed to stick to itself.
        </li>
        <li>
          A new flag pole (an 8’ length of lumber, in a nod to the{" "}
          <a
            href="https://puzzles.mit.edu/2018/full/puzzle/fear_encounter.html"
            target="_blank"
            rel="noreferrer"
          >
            2018 funaround
          </a>
          ). which she insists must be hidden.
        </li>
      </ul>

      <p>
        Her route to the vault, as one might expect, includes narrow corridors
        and stairwells.
      </p>

      <h3>Ferdinand</h3>

      <Blockquote>
        Hello, it’s me, Carter. I’ve got a plan to get the heat off my back and
        you’re gonna help me. Then I can get you what I promised. Oh there’s so
        many of you, send about 20% of your group — the really conniving ones —
        to meet me on the first floor of building 2.
      </Blockquote>

      <p>
        Ferdinand explains that he has no choice but to make his exit and will
        need the group to collect some identity documents from a bureaucrat who
        already knows him as Ferdinand Carter. He quickly briefs the group on
        the target’s name and key biographical information before slapping a
        fake mustache on one member and shoving them through the door. A
        babelfish dispenser game follows, in which the bureaucrat identifies one
        incorrect detail about each impersonator shoved through the door and the
        group must incrementally compile a complete impersonation:
      </p>

      <ul>
        <li>Named Chase Bushwacker</li>
        <li>
          Has brown hair and blue eyes and was born on April 2nd in Bermuda to
          Harriet and Benedict
        </li>
        <li>Wears a mustache</li>
        <li>
          Nervously touches his ear whenever saying a word beginning with b
        </li>
        <li>Speaks in a British accent</li>
        <li>Limps</li>
        <li>
          Extremely allergic to flowers and inevitably sneezes when entering the
          room
        </li>
      </ul>

      <p>
        On (or after) their fifth attempt, the group successfully obtains the
        identity documents and heads for Ferdinand’s security deposit box.
      </p>

      <h2>Cracking The Vault</h2>

      <p>
        All paths having converged on the vault, Papa is reluctantly convinced
        to open it, but cannot, as Sidecar recently installed an audio lock to
        which only he knew the passcode. Undeterred, Billie drills the lock and
        invites the reassembled team to open it.
      </p>

      <p>
        By pressing their eye to the drill hole, a single person on the team can
        see the internal mechanism of the vault. Pressing a nearby button causes
        a silent film to play, visible only to them. After, the film plays
        again, this time on a large screen visible to all and accompanied by
        audio recorded in the room during the hidden playing. This is a foley
        game and the team must record sensible audio for the film using props in
        the room without audibly communicating during the recording.
        Additionally, five points in the film are marked with a prominent white
        dot and must include a sound made with one of the feelies accumulated
        during the weekend.
      </p>

      <ul>
        <li>
          The radio, in instrument mode, is used for a musical performance
        </li>
        <li>Katrina’s whistle serves as a police whistle</li>
        <li>
          Papa’s contract is used to compel him to produce his trademark belly
          laugh
        </li>
        <li>Gladys’ beaded necklace makes the sound of a chain</li>
        <li>
          Ferdinand’s deck of cards produces the sound of rifling through papers
        </li>
      </ul>

      <p>
        Once successful, the vault door unlocks and the group proceeds into the
        family vault.
      </p>

      <h2>Inside the Vault: The Dramatic Finale</h2>

      <FinaleImageContainer>
        <LinkedImage
          src={katrina}
          alt="Officer Mockingbird arrests the Finster crew"
        />
      </FinaleImageContainer>

      <p>
        Officer Mockingbird seizes the moment and attempts to arrest everyone,
        only for Baby to slip out and slam the door shut, locking everyone
        inside.
      </p>

      <FinaleImageContainer>
        <LinkedImage
          src={baby}
          alt="Baby, now Theresa Candy, reveals her true identity"
        />
      </FinaleImageContainer>

      <p>
        Baby reveals that she was behind the theft and the forgery, using the
        real stolen Shadow Diamond as a way to start a new life as her own
        woman, free of the Finster family. After announcing that she would be
        re-taking her birth name of Theresa Candy, she disappears.
      </p>

      <FinaleImageContainer>
        <LinkedImage
          src={billie}
          alt="Billie pockets the coin for the insurance money"
        />

        <p>
          As distant sirens grow closer, Billie spots the coin{" "}
          <a href="/2025/heist">Papa’s crew stole so long ago</a> and pockets it
          as evidence, offering the group instead some of Gladys’ counterfeit
          jewelry. (For runners up, the drawer is empty, already picked over by
          persons unknown.)
        </p>
      </FinaleImageContainer>
    </>
  );
};

export default Interaction;
