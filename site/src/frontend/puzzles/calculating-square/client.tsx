import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import {
  Lightbox,
  ImageSlide,
  isImageSlide,
  type Render,
  type Slide,
  type SlideImage,
} from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import panorama1Thumbnail from "./assets/panorama/01-thumbnail.jpg";
import panorama1 from "./assets/panorama/01.jpg";
import panorama2Thumbnail from "./assets/panorama/02-thumbnail.jpg";
import panorama2 from "./assets/panorama/02.jpg";
import panorama3Thumbnail from "./assets/panorama/03-thumbnail.jpg";
import panorama3 from "./assets/panorama/03.jpg";
import panorama4Thumbnail from "./assets/panorama/04-thumbnail.jpg";
import panorama4 from "./assets/panorama/04.jpg";
import panorama5Thumbnail from "./assets/panorama/05-thumbnail.jpg";
import panorama5 from "./assets/panorama/05.jpg";
import panorama6Thumbnail from "./assets/panorama/06-thumbnail.jpg";
import panorama6 from "./assets/panorama/06.jpg";
import puzzle01 from "./assets/puzzle/01.jpg";
import puzzle02 from "./assets/puzzle/02.jpg";
import puzzle03 from "./assets/puzzle/03.jpg";
import puzzle04 from "./assets/puzzle/04.jpg";
import puzzle05 from "./assets/puzzle/05.jpg";
import puzzle06 from "./assets/puzzle/06.jpg";
import puzzle07 from "./assets/puzzle/07.jpg";
import puzzle08 from "./assets/puzzle/08.jpg";
import puzzle09 from "./assets/puzzle/09.jpg";
import puzzle10 from "./assets/puzzle/10.jpg";
import puzzle11 from "./assets/puzzle/11.jpg";
import puzzle12 from "./assets/puzzle/12.jpg";
import puzzle13 from "./assets/puzzle/13.jpg";
import puzzle14 from "./assets/puzzle/14.jpg";
import puzzle15 from "./assets/puzzle/15.jpg";
import puzzle16 from "./assets/puzzle/16.jpg";
import puzzle17 from "./assets/puzzle/17.jpg";
import puzzle18 from "./assets/puzzle/18.jpg";
import puzzle19 from "./assets/puzzle/19.jpg";
import puzzle20 from "./assets/puzzle/20.jpg";
import puzzle21 from "./assets/puzzle/21.jpg";
import puzzle22 from "./assets/puzzle/22.jpg";
import puzzle23 from "./assets/puzzle/23.jpg";

declare module "yet-another-react-lightbox" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- this is extending an existing type
  interface SlideImage extends GenericSlide {
    targets?: {
      x: number;
      y: number;
      width: number;
      height: number;
      target?: Slide;
    }[];
  }
}

const zoomSlides = new Map<number, SlideImage>([
  [1, { type: "image", src: puzzle01 }],
  [2, { type: "image", src: puzzle02 }],
  [3, { type: "image", src: puzzle03 }],
  [4, { type: "image", src: puzzle04 }],
  [5, { type: "image", src: puzzle05 }],
  [6, { type: "image", src: puzzle06 }],
  [7, { type: "image", src: puzzle07 }],
  [8, { type: "image", src: puzzle08 }],
  [9, { type: "image", src: puzzle09 }],
  [10, { type: "image", src: puzzle10 }],
  [11, { type: "image", src: puzzle11 }],
  [12, { type: "image", src: puzzle12 }],
  [13, { type: "image", src: puzzle13 }],
  [14, { type: "image", src: puzzle14 }],
  [15, { type: "image", src: puzzle15 }],
  [16, { type: "image", src: puzzle16 }],
  [17, { type: "image", src: puzzle17 }],
  [18, { type: "image", src: puzzle18 }],
  [19, { type: "image", src: puzzle19 }],
  [20, { type: "image", src: puzzle20 }],
  [21, { type: "image", src: puzzle21 }],
  [22, { type: "image", src: puzzle22 }],
  [23, { type: "image", src: puzzle23 }],
]);

const slides: SlideImage[] = [
  {
    type: "image",
    src: panorama1,
    thumbnail: panorama1Thumbnail,
    alt: "Borderline Panorama 1",
    width: 15328,
    height: 3632,
    targets: [
      {
        x: 9562,
        y: 71,
        width: 4425,
        height: 3441,
        target: zoomSlides.get(13),
      },
      {
        x: 5149,
        y: 795,
        width: 1400,
        height: 2301,
        target: zoomSlides.get(23),
      },
    ],
  },
  {
    type: "image",
    src: panorama2,
    thumbnail: panorama2Thumbnail,
    alt: "Borderline Panorama 2",
    width: 16720,
    height: 3712,
    targets: [
      {
        x: 6457,
        y: 704,
        width: 1804,
        height: 2607,
        target: zoomSlides.get(3),
      },
      {
        x: 15499,
        y: 660,
        width: 1133,
        height: 1980,
        target: zoomSlides.get(8),
      },
      {
        x: 8151,
        y: 77,
        width: 1386,
        height: 1408,
        target: zoomSlides.get(10),
      },
      {
        x: 14531,
        y: 1265,
        width: 968,
        height: 1221,
        target: zoomSlides.get(15),
      },
      {
        x: 5071,
        y: 286,
        width: 1870,
        height: 2189,
        target: zoomSlides.get(16),
      },
      {
        x: 2222,
        y: 2662,
        width: 924,
        height: 605,
        target: zoomSlides.get(17),
      },
      // Move this one last so it stacks on top of 16
      {
        x: 4917,
        y: 1738,
        width: 803,
        height: 1122,
        target: zoomSlides.get(7),
      },
    ],
  },
  {
    type: "image",
    src: panorama3,
    thumbnail: panorama3Thumbnail,
    alt: "Borderline Panorama 3",
    width: 17808,
    height: 3696,
    targets: [
      {
        x: 11473,
        y: 1034,
        width: 1034,
        height: 1705,
        target: zoomSlides.get(4),
      },
      {
        x: 5698,
        y: 1639,
        width: 638,
        height: 880,
        target: zoomSlides.get(6),
      },
      {
        x: 506,
        y: 484,
        width: 1496,
        height: 2178,
        target: zoomSlides.get(8),
      },
      {
        x: 0,
        y: 1221,
        width: 594,
        height: 1265,
        target: zoomSlides.get(15),
      },
      {
        x: 14553,
        y: 1452,
        width: 1947,
        height: 1177,
        target: zoomSlides.get(20),
      },
    ],
  },
  {
    type: "image",
    src: panorama4,
    thumbnail: panorama4Thumbnail,
    alt: "Borderline Panorama 4",
    width: 19376,
    height: 3760,
    targets: [
      {
        x: 9174,
        y: 1386,
        width: 1232,
        height: 1386,
        target: zoomSlides.get(12),
      },
      {
        x: 15774,
        y: 176,
        width: 3498,
        height: 2090,
        target: zoomSlides.get(14),
      },
      {
        x: 3531,
        y: 2200,
        width: 1716,
        height: 869,
        target: zoomSlides.get(19),
      },
      {
        x: 0,
        y: 1298,
        width: 671,
        height: 1111,
        target: zoomSlides.get(20),
      },
    ],
  },
  {
    type: "image",
    src: panorama5,
    thumbnail: panorama5Thumbnail,
    alt: "Borderline Panorama 5",
    width: 17168,
    height: 3248,
    targets: [
      {
        x: 14614,
        y: 691,
        width: 1088,
        height: 1450,
        target: zoomSlides.get(1),
      },
      {
        x: 16060,
        y: 154,
        width: 825,
        height: 1639,
        target: zoomSlides.get(2),
      },
      {
        x: 9086,
        y: 44,
        width: 3454,
        height: 2398,
        target: zoomSlides.get(11),
      },
      {
        x: 0,
        y: 363,
        width: 1749,
        height: 2189,
        target: zoomSlides.get(14),
      },
      {
        x: 2717,
        y: 121,
        width: 2508,
        height: 1804,
        target: zoomSlides.get(21),
      },
    ],
  },
  {
    type: "image",
    src: panorama6,
    thumbnail: panorama6Thumbnail,
    alt: "Borderline Panorama 6",
    width: 16160,
    height: 3600,
    targets: [
      {
        x: 252,
        y: 1510,
        width: 296,
        height: 1080,
        target: zoomSlides.get(1),
      },
      {
        x: 1001,
        y: 572,
        width: 1364,
        height: 1881,
        target: zoomSlides.get(2),
      },
      {
        x: 3465,
        y: 330,
        width: 1848,
        height: 2552,
        target: zoomSlides.get(5),
      },
      {
        x: 9889,
        y: 748,
        width: 1518,
        height: 1881,
        target: zoomSlides.get(9),
      },
      {
        x: 11132,
        y: 561,
        width: 1782,
        height: 1760,
        target: zoomSlides.get(18),
      },
      {
        x: 12441,
        y: 462,
        width: 1166,
        height: 1243,
        target: zoomSlides.get(22),
      },
    ],
  },
];

const ThumbnailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const Thumbnail = styled.a`
  flex: 1 1 calc(50% - 1rem);
  min-width: 378px;
  cursor: zoom-in;

  & img {
    width: 100%;
    height: auto;
  }
`;

const PanoramaLightboxContainer = styled.div`
  position: relative;
`;

const PuzzleImageButton = styled.button`
  position: absolute;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  outline: none;
  cursor: zoom-in;
`;

const PuzzleImage = ({
  x,
  y,
  width,
  height,
  target,
  setPuzzleLightboxSlide,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  target: Slide;
  setPuzzleLightboxSlide: (slide: Slide) => void;
}) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPuzzleLightboxSlide(target);
    },
    [setPuzzleLightboxSlide, target],
  );

  const style: React.CSSProperties = {
    left: `${100 * x}%`,
    top: `${100 * y}%`,
    width: `${100 * width}%`,
    height: `${100 * height}%`,
  };

  return <PuzzleImageButton onClick={onClick} style={style} />;
};

const App = () => {
  const [index, setIndex] = useState(-1);
  const [puzzleLightboxSlide, setPuzzleLightboxSlide] =
    useState<SlideImage | null>(null);
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const index = parseInt(e.currentTarget.dataset.index ?? "-1", 10);
    if (index >= 0) {
      setIndex(index);
    }
  }, []);
  const close = useCallback(() => {
    if (puzzleLightboxSlide === null) setIndex(-1);
  }, [puzzleLightboxSlide]);
  const closePuzzle = useCallback(() => {
    setPuzzleLightboxSlide(null);
  }, []);

  const render: NonNullable<Render["slide"]> = useCallback(({ slide }) => {
    if (!isImageSlide(slide)) return undefined;

    const { width: slideWidth, height: slideHeight } = slide;

    return (
      <PanoramaLightboxContainer>
        <ImageSlide slide={slide} />
        {slide.targets?.map((target, i) => {
          if (!target.target) return null;
          if (!slideWidth || !slideHeight) return null;
          const x = target.x / slideWidth;
          const y = target.y / slideHeight;
          const width = target.width / slideWidth;
          const height = target.height / slideHeight;

          return (
            <PuzzleImage
              key={i}
              x={x}
              y={y}
              width={width}
              height={height}
              target={target.target}
              setPuzzleLightboxSlide={setPuzzleLightboxSlide}
            />
          );
        })}
      </PanoramaLightboxContainer>
    );
  }, []);

  return (
    <>
      <p>
        You can click on these panorama images of{" "}
        <a href="http://borderline.mit.edu/" target="_blank" rel="noreferrer">
          The Borderline
        </a>{" "}
        to view them full-screen. From there, there are a handful of specific
        points where you can zoom in even further, which you may find useful.
      </p>

      <ThumbnailContainer>
        {slides.map((slide, i) => (
          <Thumbnail key={i} data-index={i} onClick={onClick}>
            <img src={slide.src} alt={slide.alt} />
          </Thumbnail>
        ))}
      </ThumbnailContainer>

      <Lightbox
        open={index >= 0}
        index={index}
        close={close}
        slides={slides}
        carousel={{ finite: true }}
        thumbnails={{ height: 40 }}
        plugins={[Thumbnails, Zoom]}
        render={{ slide: render }}
      />

      <Lightbox
        open={puzzleLightboxSlide !== null}
        close={closePuzzle}
        slides={[...(puzzleLightboxSlide ? [puzzleLightboxSlide] : [])]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
};

const elem = document.getElementById("borderline-personality-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #borderline-personality-root was nowhere to be found",
  );
}
