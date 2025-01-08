import React from "react";
import { styled } from "styled-components";
import { CaveatFont } from "../../assets/SharedFonts";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import ouija1 from "./assets/1.mp4";
import ouija10 from "./assets/10.mp4";
import ouija11 from "./assets/11.mp4";
import ouija12 from "./assets/12.mp4";
import ouija13 from "./assets/13.mp4";
import ouija14 from "./assets/14.mp4";
import ouija15 from "./assets/15.mp4";
import ouija16 from "./assets/16.mp4";
import ouija17 from "./assets/17.mp4";
import ouija18 from "./assets/18.mp4";
import ouija19 from "./assets/19.mp4";
import ouija2 from "./assets/2.mp4";
import ouija20 from "./assets/20.mp4";
import ouija21 from "./assets/21.mp4";
import ouija22 from "./assets/22.mp4";
import ouija23 from "./assets/23.mp4";
import ouija24 from "./assets/24.mp4";
import ouija25 from "./assets/25.mp4";
import ouija3 from "./assets/3.mp4";
import ouija4 from "./assets/4.mp4";
import ouija5 from "./assets/5.mp4";
import ouija6 from "./assets/6.mp4";
import ouija7 from "./assets/7.mp4";
import ouija8 from "./assets/8.mp4";
import ouija9 from "./assets/9.mp4";
import note1 from "./assets/note1.png";
import note10 from "./assets/note10.png";
import note11 from "./assets/note11.png";
import note12 from "./assets/note12.png";
import note13 from "./assets/note13.png";
import note14 from "./assets/note14.png";
import note15 from "./assets/note15.png";
import note16 from "./assets/note16.png";
import note17 from "./assets/note17.png";
import note18 from "./assets/note18.png";
import note19 from "./assets/note19.png";
import note2 from "./assets/note2.png";
import note20 from "./assets/note20.png";
import note21 from "./assets/note21.png";
import note22 from "./assets/note22.png";
import note23 from "./assets/note23.png";
import note24 from "./assets/note24.png";
import note25 from "./assets/note25.png";
import note3 from "./assets/note3.png";
import note4 from "./assets/note4.png";
import note5 from "./assets/note5.png";
import note6 from "./assets/note6.png";
import note7 from "./assets/note7.png";
import note8 from "./assets/note8.png";
import note9 from "./assets/note9.png";
import ouija from "./assets/ouija.png";

export const ORDERED_NOTES: [string, string][] = [
  [
    note1,
    "Donor’s Notes: Another attempt by my tragically misled friend to show evidence and convince me that spiritualism is real. Pray-now, I did take careful notes of my thoughts in the pages, and signed the copy of course.",
  ],
  [note2, "Donor’s Notes: Another message. Please, who even is Meslom?"],
  [
    note3,
    "Donor’s Notes: Another supposed WWI narrative from beyond and this time with things to say from that infamous Lodge.",
  ],
  [
    note4,
    "Donor’s Notes: As a master of illusions I can attest, the evidence for Spiritualism here is but a mere hallucination itself. Pray-tell, I’ll seek elsewhere for a more credible and rational read on the topic that won’t put you into a magnetic sleep as well.",
  ],
  [
    note5,
    "Donor’s Notes: As a renowned skeptic, I quickly found myself bored and unimpressed by the supposed ‘spiritual’ ramblings of Mr. Parker in this book. The only thing it inspired in me was a desire to escape its dull pages.",
  ],
  [
    note6,
    "Donor’s Notes: I can quickly see through the so-called discourse delivered by the spirit and Mrs. Richmond. Nothing more than a sham, this day or the one after.",
  ],
  [
    note7,
    "Donor’s Notes: I was enthralled by this insightful book. His exposé describes the dangers of blind faith both modern and ancient. Delusion is indeed the answer-be quick all you frauds and hide from the reverend’s wise words.",
  ],
  [
    note8,
    "Donor’s Notes: “It isn’t” is the answer–pray, this title is marred by mis-statements which even the humblest of magicians could refute.",
  ],
  [
    note9,
    "Donor’s Notes: Lady? Tiger? Neither? Don’t waste your time on this farce, as I say no to this deceitful attempt at resurrecting a great writer.",
  ],
  [
    note10,
    "Donor’s Notes: No real interest in “fair play”. The author will say try their parlor tricks, and for a price.",
  ],
  [
    note11,
    "Donor’s Notes: Not only does it provide pragmatic examples in math, but it also cleverly incorporates the accompanying bicycle deck. Pray-answer, what could make it a more engaging way for young minds to improve their computational skills?",
  ],
  [
    note12,
    "Donor’s Notes: Not sure how I feel about Fletcherising. Pray-answer, would this remedy improve longevity, wouldn’t we be hearing about it from someone older than young Horace?",
  ],
  [
    note13,
    "Donor’s Notes: Now, I have read some far-fetched philosophy in my time, but this book takes the cake. These ramblings about the progressive development of nature are nothing but a jumbled mess, and a disgrace to the “author”.",
  ],
  [
    note14,
    "Donor’s Notes: On magic for the broadest audience of pre-professionals with many hands-on examples. Say, why can’t we have more like these.",
  ],
  [
    note15,
    "Donor’s Notes: Potter discovers and uncovers the deceitful practices of spiritualism. Pray-look here for the facts explained.",
  ],
  [
    note16,
    "Donor’s Notes: Such a practical guide to start any magician’s curriculum without the need of complex and pricey items that the professionals may use. I can tell this title will be one to recommend.",
  ],
  [
    note17,
    "Donor’s Notes: The English review calls this “A most pleasing and excellent little work. Its especial value consists in the numerous epitaphs in the verse which it supplies.” Tell me magician doesn’t fall under sundry world callings when committing me to the churchyard.",
  ],
  [
    note18,
    "Donor’s Notes: The one thing I had hoped this book would tell me was why a native woman is writing Christmas poems from the beyond. It did not. Maybe they learned to commune from Mrs. Doyle.",
  ],
  [
    note19,
    "Donor’s Notes: The supposed letters from a husband beyond the grave on earth lacked any substance. They tell a tale untrue, but were more importantly quite dull.",
  ],
  [
    note20,
    "Donor’s Notes: This is one philosophy that I don’t care to delve into now or in the future. As someone who has applied and witnessed the application of science to these proceedings, I can attest that the mere idea of a scientific séance is absurd.",
  ],
  [
    note21,
    "Donor’s Notes: This prince and his medium has quickly tried my nerves. I’m not sure which are more farcical, the stories from his life or the stories after. This reads as pure fabrication from cover to cover.",
  ],
  [
    note22,
    "Donor’s Notes: This so-called “experimental” work demonstrates no real proof of the existence of spirits, or planes of the afterlife. One might as well pray-look to the heavens, and hope for a sign. Using flimsy “scriptural” evidence and misguided beliefs, these musings on Christian deity and locals are nothing but.",
  ],
  [
    note23,
    "Donor’s Notes: To think a late editor had the time to meet all of these spirits. If I were to pray to talk to one each night, it might take me over two months. Additionally, I’d hope Faraday would have better things to do.",
  ],
  [
    note24,
    "Donor’s Notes: Upon reading this supposed discourse, I was sorely disappointed. Be quick to avoid this textual disaster, for it is nothing more than a collection of ramblings and nonsensical ruminations from the supposed world of spirits.",
  ],
  [
    note25,
    "Donor’s Notes: What a disappointment this book was. Filled with unsubstantiated claims and pseudo-scientific theories, this book serves as a mere charlatan’s attempt at profiting from people’s fears and hopes for life after death with no true answer-be quick, I told myself and only skim this book lest I waste my own future.",
  ],
];

const ORDERED_VIDEOS: string[][] = [
  [ouija1, ouija2, ouija3, ouija4, ouija5],
  [ouija6, ouija7, ouija8, ouija9, ouija10],
  [ouija11, ouija12, ouija13, ouija14, ouija15],
  [ouija16, ouija17, ouija18, ouija19, ouija20],
  [ouija21, ouija22, ouija23, ouija24, ouija25],
];

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em 0;
`;

const StyledNote = styled(LinkedImage)`
  display: block;
  width: 814px;
  margin-bottom: 1em;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <CaveatFont />
      <p className="puzzle-flavor">
        When he started this collection, he didn’t know he would go on to
        testify in congress.
      </p>
      <LinkedImage src={ouija} alt="A Ouija board." />
      <FlexWrapper>
        <>
          <p>
            <strong>Video Links</strong>
          </p>
          <table>
            {ORDERED_VIDEOS.map((row, i) => (
              <tr key={`video-row-${i}`}>
                {row.map((href, j) => (
                  <td key={`video-${i}-${j}`}>
                    <a href={href} target="_blank" rel="noreferrer">
                      {`Video ${i * 5 + j + 1}`}
                    </a>
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </>
      </FlexWrapper>
      <FlexWrapper>
        {ORDERED_NOTES.map(([src, alt], i) => (
          <StyledNote
            className={NO_COPY_CLASS}
            key={`note-${i}`}
            src={src}
            alt={alt}
          />
        ))}
      </FlexWrapper>
      <table className={COPY_ONLY_CLASS}>
        {ORDERED_NOTES.map(([_, alt], i) => (
          <tr key={i}>
            <td>{alt}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Puzzle;
