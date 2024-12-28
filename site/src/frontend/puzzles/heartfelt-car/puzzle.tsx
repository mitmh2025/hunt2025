import React from "react";

export const Clues = [
  "Australian designer returns home to care for her ill mother & takes revenge on her childhood accusers, making a splash with burning red fabric.",
  "Blonde painter ventures forth & seeks lantern lollapalooza (fake mom objects!)",
  "GM turns team into prizewinner by listening to economist’s advice.",
  "The showstopper number about an unusually measured length of time is sung by many broke artists, and only one dies by the end.",
  "Rodent with big ambitions becomes crackerjack chef with the help of a hapless apprentice.",
  "A cowboy, an astronaut, a cowgirl, two root vegetables, a dinosaur, and a dog smash their way out of plaything hell after an accidental journey. After their daring rescue they find their way to a new home with an imaginative little girl.",
  "A book loving brunette rejects the record-breaker egg consumer and falls for a cursed prince in an enchanted castle instead.",
  "Shy lady seeks the sensation of insomnia, helped by a pea, so she (and everyone else) can finally get married, despite the queen’s efforts.",
  "When a socialite and lawyer encounter each other in a San Francisco pet shop, they rapidly become the charming romantic headliner in his family’s small town, until wildlife attacks.",
  "Irrepressible thoughts of death haunt this doll until she becomes knockout human.",
  "Miracle worker in Montana helps girl and her horse heal after a terrible accident (and falls for her mom).",
  "A big furry creature and a cyclopean being with spindly green arms arrive ready to learn in this standout tale of the underdog. They join up with a bicephalous, binocular cryptid with an inexplicable love for turtlenecks, a fuzzy purple bowlegged dude, a squishable blob with too many eyes, and a mustachioed walking octopus.",
  "A weatherman encounters the very uncomfortable phenomenon of repeated deja vu.",
];

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        I remember where I was when I saw every one of these masterpieces, or
        should I say ripsnorters? It’s almost as if I were really standing
        there! I just have to check the lengths of the scripts.
      </p>

      <ul>
        {Clues.map((clue, index) => (
          <li key={index}>{clue}</li>
        ))}
      </ul>

      <p>
        <a
          href="https://www.google.com/maps/d/viewer?mid=1JHAxaoI2EjrkO8UkNswbSWVH1-fLJbE"
          target="_blank"
          rel="noopener noreferrer"
        >
          Map
        </a>
      </p>
    </>
  );
};

export default Puzzle;
