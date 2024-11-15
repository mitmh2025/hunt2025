import React from "react";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.png";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        We’ve received temporal anomaly reports about timelines being tampered
        with such that certain events now involve someone almost completely
        different. Can you reconstruct the timeline and prevent temporal
        disaster?
      </p>
      <ul>
        <li>
          After accidentally overdosing on cordrazine, Brull runs through the
          time portal known as the Guardian of Forever and ends up in the year
          1930. Kirk and Spock wait until the Guardian of Forever cycles through
          all of history, then follow after in a rescue attempt.
        </li>
        <li>
          After pursuing the Borg Sphere through a temporal vortex to the year
          2063, an away team of Picard, Data, and Boothby beam down to Bozeman,
          Montana to find Zefram Cochrane, the inventor of the warp drive, and
          keep history on track.
        </li>
        <li>
          Sent hundreds of years in the past to 2024 by Q, Picard talks to his
          old friend Cretak in her bar – perhaps hoping that she’ll recognize
          him from the previous time that their paths crossed due to time
          travel, in 1893 – but she doesn’t remember him.
        </li>
        <li>
          With each of the crew of the Protostar fractured into separate phases
          where time is passing at vastly different rates, Rok-Tahk deals with
          the long loneliness of slowly passing time by snuggling with a small
          toy version of Chef while she sleeps and learning quantum science and
          other skills that will help her save the rest of the crew.
        </li>
        <li>
          Harry Kim and Chakotay return to 2375 from 15 years in the future to
          disrupt Voyager’s attempted quantum slipstream flight, which they
          alone know will lead to the crash landing and destruction of Voyager
          if allowed to proceed, bearing out Dolim’s initial concerns that the
          phase variance in the quantum slipstream drive made it into what he
          described as an Edsel, a disaster waiting to happen.
        </li>
        <li>
          Boimler stumbles through a portal and when he awakes on the Enterprise
          he sees Lore, a historical figure to him, and assumes that he’s
          dreaming. But when he pokes him he’s really there and he learns that
          he has traveled back in time about 120 years to stardate 2291.6.
        </li>
        <li>
          As the shuttle that Pike and Tyler are in is being drawn into a
          temporal rift where time does not move along a strictly linear course,
          Khan’s detection of deuterium bursts from their shuttle is what helps
          the Discovery crew rescue them.
        </li>
        <li>
          In an attempt to fulfill a causality loop and prevent his own death,
          Spock returns to the year 2237 when he was a child. He revisits his
          own childhood home on Vulcan, asking to stay there with his parents,
          Amanda Grayson and Tiron, by claiming to be a cousin.
        </li>
        <li>
          After traveling back to the year 1986, Hugh uses a helicopter to
          transport two whales to a spaceship so that those whales can
          facilitate communication with a hostile alien probe in the 23rd
          century.
        </li>
        <li>
          Archer and T’Ana are sent back in time to Detroit in the year 2004 to
          stop Xindi-Reptilians from creating a biological weapon.
        </li>
        <li>
          While in the holodeck playing through a program involving a
          timeline-altering device called the Chronogami, Tuvok gets annoyed
          that Rutherford is eating a sandwich and isn’t taking the story
          seriously.
        </li>
        <li>
          Two Vorgon time travelers from the 27th century use Picard to find an
          artifact that Ross has been hiding inside of a Horga’hn on Risa.
        </li>
        <li>
          In 2374, Winn alerts Sisko about a distress call from Captain Lisa
          Cusak who is stranded on a planet. The crew of the Defiant talk to her
          as they travel to her rescue, but when they get there they discover
          that she’d already died more than 3 years earlier and her
          conversations with them had all been time-shifted.
        </li>
      </ul>
      <LinkedImage
        src={image}
        alt="A graph. The x-axis ranges from 1967 to 2025, with tick labels every ten ticks, starting at 1970. The y-axis ranges from 3100s to 2100s. Short, horizontal black stripes with blue numbers 1 through 13 are scattered across the graph, mostly in order from left to right."
      />
    </>
  );
};

export default Puzzle;
