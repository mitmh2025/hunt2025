import { useState } from "react";
import { styled } from "styled-components";
import { Lightbox, type Render, type Slide } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import renderRoot from "../../../utils/renderRoot";
import rootUrl from "../../utils/rootUrl";
import ambiance0 from "./assets/ambiance/ambiance0.jpg";
import ambiance1 from "./assets/ambiance/ambiance1.jpg";
import ambiance2 from "./assets/ambiance/ambiance2.jpg";
import ambiance3 from "./assets/ambiance/ambiance3.jpg";
import ambiance4 from "./assets/ambiance/ambiance4.jpg";
import ambiance5 from "./assets/ambiance/ambiance5.jpg";
import ambiance6 from "./assets/ambiance/ambiance6.jpg";
import ambiance7 from "./assets/ambiance/ambiance7.jpg";
import bar0 from "./assets/bar/bar0.jpg";
import bar1 from "./assets/bar/bar1.jpg";
import bar2 from "./assets/bar/bar2.jpg";
import bar3 from "./assets/bar/bar3.jpg";
import bar4 from "./assets/bar/bar4.jpg";
import bar5 from "./assets/bar/bar5.jpg";
import bar6 from "./assets/bar/bar6.jpg";
import bar7 from "./assets/bar/bar7.jpg";
import bar8 from "./assets/bar/bar8.jpg";
import bar9 from "./assets/bar/bar9.jpg";
import barVideoThumbnail from "./assets/bar/video-thumbnail.jpg";
import press0 from "./assets/press/press0.jpg";
import press1 from "./assets/press/press1.jpg";
import press2 from "./assets/press/press2.jpg";
import press3 from "./assets/press/press3.jpg";
import press4 from "./assets/press/press4.jpg";
import press5 from "./assets/press/press5.jpg";
import speakeasy0 from "./assets/speakeasy/speakeasy0.jpg";
import speakeasy1 from "./assets/speakeasy/speakeasy1.jpg";
import speakeasy2 from "./assets/speakeasy/speakeasy2.jpg";
import speakeasy3 from "./assets/speakeasy/speakeasy3.jpg";
import speakeasy4 from "./assets/speakeasy/speakeasy4.jpg";
import speakeasy5 from "./assets/speakeasy/speakeasy5.jpg";

/* eslint-disable @typescript-eslint/consistent-type-definitions -- need to match library definitions */
declare module "yet-another-react-lightbox" {
  interface YoutubeSlide extends GenericSlide {
    youtubeTitle: string;
    youtubeId: string;
  }

  interface SlideTypes {
    youtube: YoutubeSlide;
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions -- (end of library definitions) */

const barSlides: Slide[] = [
  {
    type: "youtube",
    youtubeTitle: "The Gala Bar",
    youtubeId: "79kwaEXzE9s",
    thumbnail: barVideoThumbnail,
  },
  {
    type: "image",
    src: bar0,
    description: (
      <>
        Six of the bartenders standing in front of the Gala bar, clockwise from
        top-left: Elan, Alex, Denis, Andrew, Ollie, and Casey
      </>
    ),
  },
  {
    type: "image",
    src: bar1,
    description: (
      <>
        Baby (Simone) takes a break from chatting with solvers to chat with the
        bartenders, left-to-right: rfong, Keri, Gita, Eric, Ariel, and Elan
      </>
    ),
  },
  {
    type: "image",
    src: bar2,
    description: <>Bartender Kate mixes up an alcohol-free martini</>,
  },
  {
    type: "image",
    src: bar3,
    description: <>Bartender Ben challenges a solver to a game of Sumo</>,
  },
  {
    type: "image",
    src: bar4,
    description: (
      <>
        A team of solvers just wants to collect their bill from last night, but
        Bartender Elan makes them apologize for the mess they made first
      </>
    ),
  },
  {
    type: "image",
    src: bar5,
    description: (
      <>
        Bartender Gita looks on as a team attempts to collect the 56 receipts
        for the{" "}
        <a
          href={`${rootUrl}/puzzles/eponymous_forensic_accountant`}
          target="_blank"
          rel="noreferrer"
        >
          Eponymous Forensic Accountant
        </a>
      </>
    ),
  },
  {
    type: "image",
    src: bar6,
    description: (
      <>
        A team showed up to get their nails painted, and Bartender Fuzzy was
        happy to oblige
      </>
    ),
  },
  {
    type: "image",
    src: bar7,
    description: (
      <>
        On Friday afternoon, Diodes &amp; Microcircuits Telephone installed a
        new phone into the backbar which bartenders could remotely operate for
        the interactions for{" "}
        <a href={`${rootUrl}/puzzles/in_communicado_tonight`}>
          In Communicado Tonight
        </a>
      </>
    ),
  },
  {
    type: "image",
    src: bar8,
    description: (
      <>
        At one point, we experienced some brief downtime in our internal
        operational tools, meaning that we were unable to distribute physical
        puzzles or complete other activities. Our bartenders were instructed to
        stall. Bartender Kate took a group of solvers and taught them to do the
        Charleston
      </>
    ),
  },
  {
    type: "image",
    src: bar9,
    description: (
      <>
        A team proves to Bartender Gita that their artwork submission was in
        fact painted with their fingers
      </>
    ),
  },
];

const ambianceSlides: Slide[] = [
  {
    type: "image",
    src: ambiance0,
    description: (
      <>
        The Providence Crime Transplantations pose for a dashing team photo at
        the photo booth
      </>
    ),
  },
  {
    type: "image",
    src: ambiance1,
    description: (
      <>
        This plinth, which was supposed to hold the Shadow Diamond, sat empty
        all weekend after the diamond went missing
      </>
    ),
  },
  {
    type: "image",
    src: ambiance2,
    description: (
      <>
        A wedding cake of suitable grandeur for the stature of the two engaged
        parties (although it{" "}
        <a
          href={`${rootUrl}/interactions/the_vault`}
          target="_blank"
          rel="noreferrer"
        >
          did go missing on Sunday morning
        </a>
        )
      </>
    ),
  },
  {
    type: "image",
    src: ambiance3,
    description: (
      <>
        As the Gala was being held at an art gallery, numerous{" "}
        <a
          href={`${rootUrl}/puzzles/art_history`}
          target="_blank"
          rel="noreferrer"
        >
          paintings
        </a>{" "}
        were placed on display
      </>
    ),
  },
  {
    type: "image",
    src: ambiance4,
    description: (
      <>
        Teams often sat at the Gala for short (or sometimes long) periods of
        time to work on puzzles
      </>
    ),
  },
  {
    type: "image",
    src: ambiance5,
    description: (
      <>
        Don’t let their smile fool you — those mocktails looked better than they
        tasted!
      </>
    ),
  },
  {
    type: "image",
    src: ambiance6,
    description: <>An “old-timey” camera setup for the photo booth</>,
  },
  {
    type: "image",
    src: ambiance7,
    description: (
      <>
        Many teams took advantage of the photo booth to take team or group
        photos
      </>
    ),
  },
];

const speakeasySlides: Slide[] = [
  {
    type: "image",
    src: speakeasy0,
    description: (
      <>
        The primary location of the Speakeasy, better known as the Stata Center
        Patil/Kiva Seminar Room, set up as{" "}
        <a
          href={`${rootUrl}/interactions/the_crime_scene`}
          target="_blank"
          rel="noreferrer"
        >
          The Crime Scene
        </a>{" "}
        (as it was for most of the weekend)
      </>
    ),
  },
  {
    type: "image",
    src: speakeasy1,
    description: <>Speakeasy operator Maddie taking a brief break</>,
  },
  {
    type: "image",
    src: speakeasy2,
    description: (
      <>
        Rover (Joel) and Papa (Teddy) schmoozing with guests at the Gala bar.
        (Rover is famously un-chatty, so one has to assume that he is laughing
        rather than talking)
      </>
    ),
  },
  {
    type: "image",
    src: speakeasy3,
    description: (
      <>
        Gladys (Joanna) flashes a rare smile while waiting to meet with a team
        at the bar
      </>
    ),
  },
  {
    type: "image",
    src: speakeasy4,
    description: (
      <>
        Billie (Alex) and Baby (Anisa) strike a pose between scenes in the
        Speakeasy
      </>
    ),
  },
  {
    type: "image",
    src: speakeasy5,
    description: (
      <>Even when wearing a face mask, Carter (tinaun) always has a mustache</>
    ),
  },
];

const pressSlides: Slide[] = [
  {
    type: "image",
    src: press0,
    description: (
      <>
        James and Li-Mei, members of the Press, visit a team to learn how their
        Hunt experience is going.
      </>
    ),
  },
  {
    type: "image",
    src: press1,
    description: <>Press member Robin provides hints to a team at the Gala</>,
  },
  {
    type: "image",
    src: press2,
    description: <>Three solvers corner press member Nathan to ask for help</>,
  },
  {
    type: "image",
    src: press3,
    description: <>Press member Atul answers questions at the Gala</>,
  },
  {
    type: "image",
    src: press4,
    description: (
      <>
        Members of the Press and of D&amp;M (Rebecca, Evan, Steve, Kevin, Fuzzy,
        and Melanie) look on as a team attempts to play the Star-Spangled Banner
        using their radio
      </>
    ),
  },
  {
    type: "image",
    src: press5,
    description: (
      <>
        By Sunday evening, teams had learned that the Press could be very
        loose-lipped about what they knew, and the Gala became a bustle of
        activity
      </>
    ),
  },
];

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 920px;
  aspect-ratio: 4 / 3;
`;

const renderSlide: Render["slide"] = ({ slide }) => {
  switch (slide.type) {
    case "youtube":
      return (
        <iframe
          style={{ width: "100%", height: "100%" }}
          title={slide.youtubeTitle}
          src={`https://www.youtube.com/embed/${slide.youtubeId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      );
    default:
      return undefined;
  }
};

const Carousel = ({ slides }: { slides: Slide[] }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <CarouselContainer>
        <Lightbox
          plugins={[Captions, Inline, Thumbnails]}
          index={index}
          slides={slides}
          render={{ slide: renderSlide }}
          on={{
            view: ({ index }) => {
              if (!open) {
                setIndex(index);
              }
            },
            click: () => {
              setOpen(true);
            },
          }}
          styles={{
            root: {
              "--yarl__color_backdrop": "var(--black)",
            },
            slide: {
              cursor: "zoom-in",
            },
          }}
        />
      </CarouselContainer>

      <Lightbox
        plugins={[Captions]}
        index={index}
        slides={slides}
        render={{ slide: renderSlide }}
        open={open}
        close={() => {
          setOpen(false);
        }}
        on={{
          view: ({ index }) => {
            if (open) {
              setIndex(index);
            }
          },
        }}
      />
    </>
  );
};

const carousels: [string, Slide[]][] = [
  ["gala-carousel-bar", barSlides],
  ["gala-carousel-ambiance", ambianceSlides],
  ["gala-carousel-characters", speakeasySlides],
  ["gala-carousel-press", pressSlides],
];

for (const [id, slides] of carousels) {
  const el = document.getElementById(id);
  if (el) {
    renderRoot(el, <Carousel slides={slides} />);
  }
}
