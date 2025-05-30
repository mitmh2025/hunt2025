import type { ParamsDictionary } from "express-serve-static-core";
import type { PageRenderer } from "../../utils/renderApp";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../../components/PageLayout";
import rootUrl from "../../utils/rootUrl";
import { css, styled } from "styled-components";
import { deviceMax } from "../../utils/breakpoints";
import obverse from "./assets/obverse.png";
import reverse from "./assets/reverse.png";

type Highlight = {
  x: number;
  y: number;
  w: number;
  h: number;
  className: string;
  key?: string;
};
type HighlightBase = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

const ObverseBase: HighlightBase = {
  src: obverse,
  alt: "Obverse of the coin. Features the text “M.I.T. Mystery Hunt 2025. The Case of the Shadow Diamond” around the edge. The center contains a stylized image of Billie looking through a magnifying glass, with bars of the Vault behind them, and a diamond-shaped cutout",
  w: 530,
  h: 530,
};
const ReverseBase: HighlightBase = {
  src: reverse,
  alt: "Reverse of the coin. Features the text “M.I.T. Mystery Hunt 2025. Illegal Search. Paper Trail. Stakeout. Background Check.” around the edge. The center contains an image of the Gala bar, with references to various other elements of the Hunt",
  w: 530,
  h: 530,
};

const ObverseHighlights: Highlight[] = [
  { x: 206, y: 79, w: 113, h: 80, className: "diamond" },
];
// Note that these are z-stacked bottom to top, so later highlights will cover earlier ones
const ReverseHighlights: Highlight[] = [
  { x: 203, y: 83, w: 123, h: 69, className: "diamond" },
  {
    x: 92,
    y: 112,
    w: 53,
    h: 68,
    className: "illegal-search",
    key: "illegal-search-top",
  },
  {
    x: 109,
    y: 284,
    w: 130,
    h: 54,
    className: "illegal-search",
    key: "illegal-search-bottom",
  },
  { x: 289, y: 189, w: 148, h: 86, className: "murder-in-mitropolis" },
  { x: 419, y: 164, w: 48, h: 51, className: "stakeout" },
  { x: 144, y: 152, w: 119, h: 129, className: "phone" },
  { x: 59, y: 231, w: 56, h: 103, className: "cash-register" },
  { x: 372, y: 272, w: 81, h: 73, className: "radio" },
  { x: 92, y: 296, w: 59, h: 56, className: "papertrail" },
  { x: 136, y: 295, w: 53, h: 61, className: "martini" },
  { x: 302, y: 320, w: 104, h: 58, className: "background-check" },
  { x: 259, y: 332, w: 56, h: 40, className: "glasses" },
];

const HighlightedImage = ({
  base,
  highlights,
  highlightGap = 10,
  highlightStroke = 4,
}: {
  base: HighlightBase;
  highlights: Highlight[];
  highlightGap?: number;
  highlightStroke?: number;
}) => {
  const viewBoxOverage = highlightGap + highlightStroke;

  return (
    <svg
      role="img"
      aria-label={base.alt}
      viewBox={`-${viewBoxOverage} -${viewBoxOverage} ${base.w + 2 * viewBoxOverage} ${base.h + 2 * viewBoxOverage}`}
    >
      <image href={base.src} x="0" y="0" width={base.w} height={base.h} />
      {highlights.map((h) => (
        /* Need to expand all dimensions by stroke width + padding */
        <rect
          key={h.key ?? h.className}
          className={`highlight ${h.className}`}
          fill="transparent"
          strokeWidth={highlightStroke}
          stroke="var(--teal-300)"
          x={h.x - highlightGap}
          y={h.y - highlightGap}
          width={h.w + 2 * highlightGap}
          height={h.h + 2 * highlightGap}
        />
      ))}
    </svg>
  );
};

const CoinHighlights = styled.div<{ $highlightClasses?: string[] }>`
  .coin-images {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    position: sticky;
    top: 0;
    padding-bottom: 1rem;

    @media screen {
      background-color: var(--black);
    }

    @media (${deviceMax.sm}) and (not (print)) {
      flex-direction: column;
    }

    .coin-image {
      flex: 1;

      svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(2px 4px 6px black);
      }
    }
  }

  .coin-details {
    li {
      margin-bottom: 0.5rem;
    }
  }

  .highlight {
    opacity: 0;

    @media print {
      opacity: 1;
    }
  }

  .description {
    color: var(--gray-300);

    @media print {
      color: var(--black);
    }
  }

  ${({ $highlightClasses }) =>
    $highlightClasses?.map(
      (c) => css`
        &:has(.${c}:hover),
        &:has(.${c}:focus) {
          & .highlight.${c} {
            opacity: 1;
          }
          & .description.${c} {
            color: var(--white);
          }
        }
      `,
    )}
`;

const coinHandler: PageRenderer<ParamsDictionary> = () => {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Coin</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <p>
            As is MIT Mystery Hunt tradition, Cardinality won the 2025 Mystery
            Hunt by finding a coin (or in our case, a coin for each member of
            the team). After a handful of misdirects in{" "}
            <a href={`${rootUrl}/interactions/the_vault`}>the finale</a> (Baby
            and the Shadow Diamond were lost in the wind; Billie claimed Papa’s
            stolen coin from <a href="/2025/heist/">the MIT Mystery Heist</a>{" "}
            for the insurance claim), Cardinality discovered a cache of
            counterfeit jewelry manufactured as part of{" "}
            <a href={`${rootUrl}/interactions/confront_gladys`}>
              Gladys’s criminal empire
            </a>
            .
          </p>

          <p>
            Our coin was made from a zinc alloy which was die-struck and then
            plated with silver and antiqued. The obverse of the coin shows
            Billie looking through a magnifying glass with the window of the{" "}
            <a href={`${rootUrl}/interactions/the_vault`}>
              Finster family vault
            </a>{" "}
            stylized as prison bars behind them. The reverse shows the Gala bar,
            littered with various props and memorabilia.
          </p>

          <CoinHighlights
            $highlightClasses={[
              ...new Set([
                ...ObverseHighlights.map((h) => h.className),
                ...ReverseHighlights.map((h) => h.className),
              ]),
            ]}
          >
            <div className="coin-images">
              <div className="coin-image">
                <HighlightedImage
                  base={ObverseBase}
                  highlights={ObverseHighlights}
                />
              </div>
              <div className="coin-image">
                <HighlightedImage
                  base={ReverseBase}
                  highlights={ReverseHighlights}
                />
              </div>
            </div>
            <div className="coin-details">
              <p>
                The design of the coin features a number of details, calling
                back to some of our favorite elements and moments from the Hunt:
              </p>

              <ul>
                <li className="description diamond">
                  <strong>The Missing Diamond</strong>: As the Shadow Diamond
                  was never recovered, it is absent from both the Vault and the
                  Gala backbar. (Fun fact: the cutouts in the actual Gala bar
                  were motivated by the design of the coin!) The cutout also
                  allows hanging the coin from a chain and wearing it as a
                  pendant.
                </li>
                <li className="description illegal-search">
                  <strong>The Illegal Search</strong>: Two shelves of the Gala
                  backbar feature books instead of bottles, a reference to{" "}
                  <a href={`${rootUrl}/rounds/illegal_search?node=bookcase`}>
                    Papa’s Bookcase
                  </a>
                  .
                </li>
                <li className="description papertrail">
                  <strong>The Paper Trail</strong>: The receipt spike on the bar
                  is a reference to one of the items investigated in{" "}
                  <a href={`${rootUrl}/rounds/paper_trail`}>The Paper Trail</a>.
                  (It also references the use of receipts to deliver information
                  at the Gala, including most hilariously in{" "}
                  <a href={`${rootUrl}/puzzles/eponymous_forensic_accountant`}>
                    Eponymous Forensic Accountant
                  </a>
                  ).
                </li>
                <li className="description stakeout">
                  <strong>The Stakeout</strong>: A polaroid developing in the
                  corner of the Gala bar references the photos of Katrina
                  collected in{" "}
                  <a href={`${rootUrl}/rounds/stakeout`}>The Stakeout</a>.
                </li>
                <li className="description background-check">
                  <strong>The Background Check</strong>: The newspaper on the
                  bar refers to the collected stories of Carter’s past cons in{" "}
                  <a href={`${rootUrl}/rounds/background_check`}>
                    The Background Check
                  </a>
                  .
                </li>
                <li className="description murder-in-mitropolis">
                  <strong>The Murder in MITropolis</strong>: While “The Murder
                  in MITropolis” does’t appear on the edge of the coin (we
                  thought the word “murder” might attract too much suspicion),
                  one shelf of the Gala backbar shows the MITropolis skyline{" "}
                  <a href={`${rootUrl}/rounds/murder_in_mitropolis`}>
                    from that round
                  </a>{" "}
                  in place of bottles.
                </li>
                <li className="description martini">
                  <strong>Shaken, Not Stirred</strong>: While the Gala bar did
                  not serve alcohol, we did serve teams martinis as part of{" "}
                  <a
                    href={`${rootUrl}/puzzles/and_now_a_puzzling_word_from_our_sponsors`}
                  >
                    And Now, a Puzzling Word From Our Sponsors
                  </a>
                  .
                </li>
                <li className="description phone">
                  <strong>Switchboard Hero</strong>: The phone at the bar seemed
                  to break constantly, even as teams continued to fix it in the
                  process of solving{" "}
                  <a href={`${rootUrl}/puzzles/in_communicado_tonight`}>
                    In Communicado Tonight
                  </a>
                  .
                </li>
                <li className="description cash-register">
                  <strong>Cash Registers</strong>: While the Gala bartenders
                  used tablet computers to track team visits and puzzle
                  distribution, we didn’t want those to distract from the
                  overall Art Deco feel of the bar, so three cash registers
                  served to disguise the tablets.
                </li>
                <li className="description radio">
                  <strong>WDNM 2π PM</strong>: Each team on campus received{" "}
                  <a href="/2025/extras/radio">a custom-manufactured radio</a>,
                  used throughout the Hunt. We’ve stolen one back and left it on
                  the bar.
                </li>
                <li className="description glasses">
                  <strong>Hidden in Plain Sight</strong>: The Groucho glasses
                  call back to the event{" "}
                  <a href={`${rootUrl}/puzzles/tailing_a_lead`}>
                    Tailing a Lead
                  </a>
                  , along with the newspaper, serving double duty between the
                  event and{" "}
                  <a href={`${rootUrl}/rounds/background_check`}>
                    The Background Check
                  </a>
                  .
                </li>
              </ul>
            </div>
          </CoinHighlights>
        </PageMain>
      </>
    </PageWrapper>
  );

  return {
    node,
    title: "Coin",
  };
};

export default coinHandler;
