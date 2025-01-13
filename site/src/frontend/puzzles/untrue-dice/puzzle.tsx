import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import {
  Math,
  MFrac,
  MI,
  MN,
  MO,
  MRoot,
  MRow,
  MSqrt,
  MSub,
  MSup,
} from "../../components/MathML";
import img_01 from "./assets/01.jpg";
import img_02 from "./assets/02.jpg";
import img_03 from "./assets/03.jpg";
import img_04 from "./assets/04.jpg";
import img_05 from "./assets/05.jpg";
import img_06 from "./assets/06.jpg";
import img_07 from "./assets/07.jpg";
import img_08 from "./assets/08.jpg";
import img_09 from "./assets/09.jpg";
import img_10 from "./assets/10.jpg";
import img_11 from "./assets/11.jpg";
import img_12 from "./assets/12.jpg";
import img_13 from "./assets/13.jpg";

const SpacedBlock = styled.div`
  margin: 32px 0px;
`;

const PaddedMath = styled(Math)`
  margin: 8px 0px;
  font-size: 24px;
`;

const Formula = styled(Math)`
  math-style: normal;
  font-size: 24px;
`;

// Notes on operators:
// Plus can be just the ASCII +
// Minus should be U+2212 MINUS SIGN

const BoundedImg = styled.img`
  max-width: 200px;
`;

const VCenteredDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const images: [image: string, exponent: number | undefined][] = [
  [img_01, undefined],
  [img_02, -34],
  [img_03, -11],
  [img_04, undefined],
  [img_05, undefined],
  [img_06, undefined],
  [img_07, undefined],
  [img_08, undefined],
  [img_09, 2],
  [img_10, 8],
  [img_11, 11],
  [img_12, 16],
  [img_13, 23],
];

const CopyContent = () => {
  type Reference = (subscript: number) => string;
  type Formula = (x: Reference, y: Reference) => string;

  const formulas: Formula[] = [
    (x, y) => `(${x(6)} * ${y(3)}) / ${x(2)}`,
    (x, y) =>
      `((${x(5)} - (${x(2)} / ${y(4)})) / pow(${x(6)} + ${y(2)} + ${y(3)}, 2)) + (${x(3)} / ${y(1)})`,
    (x, y) => `(pow(${x(6)}, ${y(2)}) + ${x(2)}) / (pow(${x(7)}, 2) * ${y(2)})`,
    (x, y) =>
      `(${x(1)} * ${y(3)}) / (${y(2)} * ${y(4)} * (${y(2)} * ${y(3)} + ${x(1)} - ${x(4)}) * (${x(7)} + sqrt(${y(2)})))`,
    (x, y) => `(${x(7)} + ${y(2)} + ${y(4)}) / ${x(7)}`,
    (x, y) =>
      `(${x(5)} * ${x(6)} * ${y(3)} + ${y(1)} - ${x(2)} - (${x(3)} / ${y(3)})) / pow(${x(4)}, 2/3)`,
    (x, y) =>
      `${x(6)} - ${x(1)} / ((${x(2)} + ${x(3)} + ${x(5)} + ${y(4)}) * (${x(5)} * ${y(3)} - ${x(6)} - ${y(3)} - ${y(4)}))`,
    (x, y) => `pow(${y(1)} - ${y(3)} * (${x(6)} + ${y(4)}), 1/3)`,
    (x, y) => `(${x(5)} - ${x(6)} - ${y(3)}) / ${y(4)}`,
    (x, y) =>
      `(${x(5)} + (pow(${x(4)}, 2) * (${x(7)} - ${y(3)})) / pow(${y(4)}, 5)) / (${x(5)} + ${x(6)} + ${y(2)} * ${y(3)} * ${y(4)})`,
    (x, y) =>
      `((${y(1)} / ${x(6)}) * (${x(4)} / ${x(2)} - ${x(7)} / ${y(4)})) / ${x(2)}`,
    (x, y) => `(${x(3)} * ${y(2)} + sqrt(${y(2)})) / (${x(7)} * ${y(4)})`,
    (x, y) => `(${x(3)} * ${y(1)}) / (${x(2)} * ${y(3)})`,
  ];

  return (
    <>
      <br className={COPY_ONLY_CLASS} />
      <table className={COPY_ONLY_CLASS}>
        <tr>
          <td>??? → x1, x2, x3, x4, x5, x6, _, x7</td>
        </tr>
        <tr>
          <td>??? → y1, y2, y3, _, y4</td>
        </tr>

        <tr />

        <tr />

        <tr>
          <td>
            x_6 &lt; x_7 &lt;&lt; x_5 &lt; x_2 &lt; x_3 &lt;&lt;&lt; x_4 &lt;
            x_1
          </td>
        </tr>
        <tr>
          <td>y_3 &lt; y_2 &lt; y_4 &lt;&lt; y_1</td>
        </tr>

        <tr />

        <tr>
          <td>&nbsp;</td>
          <td>Fill in values here ↓</td>
        </tr>
        {Array.from({ length: 7 }, (_, i) => (
          <tr key={i}>
            <td>x_{i + 1} =</td>
          </tr>
        ))}
        <tr />
        {Array.from({ length: 4 }, (_, i) => (
          <tr key={i}>
            <td>y_{i + 1} =</td>
          </tr>
        ))}

        <tr />

        {formulas.map((formula, i) => {
          const xOffset =
            -i /* beginning of formulas */ -
            1 /* spacer */ -
            4 /* y values */ -
            1 /* spacer */ -
            7 /* x values */ -
            1; /* 0-indexed */
          const yOffset =
            -i /* beginning of formulas */ -
            1 /* spacer */ -
            4 /* y values */ -
            1; /* 0-indexed */
          const x: Reference = (x) => `R[${x + xOffset}]C[0]`;
          const y: Reference = (y) => `R[${y + yOffset}]C[0]`;
          return (
            <tr key={`formula-${i}`}>
              <td>
                {formula(
                  (x) => `x_${x}`,
                  (y) => `y_${y}`,
                )}
              </td>
              <td data-sheets-formula={`=${formula(x, y)}`} />
            </tr>
          );
        })}

        <tr />

        {images.map(([image, exponent], i) => (
          <tr key={`image-${i}`}>
            <td>
              {/* eslint-disable-next-line jsx-a11y/alt-text -- spoilers */}
              <img src={image} />
            </td>
            <td>{exponent && `* 10^${exponent}`}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

const PuzzleContent = () => {
  return (
    <>
      <div className="flavor">
        <p>
          This “elite” firm wasn‘t built in a day, but their results are always
          a little off. They ignore a letter from each file, and even though
          they keep track of the dollars and cents, they just cut things off
          there.
        </p>
      </div>
      <ContentWrapper className={NO_COPY_CLASS}>
        <SpacedBlock>
          <PaddedMath display="block">
            <MRow>
              <MI>???</MI>
              <MO>→</MO>
              <MSub>
                <MI>x</MI>
                <MN>1</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>x</MI>
                <MN>2</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>x</MI>
                <MN>3</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>x</MI>
                <MN>4</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>x</MI>
                <MN>5</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>x</MI>
                <MN>6</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MI>_</MI>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>x</MI>
                <MN>7</MN>
              </MSub>
            </MRow>
          </PaddedMath>

          <PaddedMath display="block">
            <MRow>
              <MI>???</MI>
              <MO>→</MO>
              <MSub>
                <MI>y</MI>
                <MN>1</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>y</MI>
                <MN>2</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>y</MI>
                <MN>3</MN>
              </MSub>
              <MO separator={true}>,</MO>
              <MI>_</MI>
              <MO separator={true}>,</MO>
              <MSub>
                <MI>y</MI>
                <MN>4</MN>
              </MSub>
            </MRow>
          </PaddedMath>
        </SpacedBlock>
        <SpacedBlock>
          <PaddedMath display="block">
            <MRow>
              <MSub>
                <MI>x</MI>
                <MN>6</MN>
              </MSub>
              <MO>&lt;</MO>
              <MSub>
                <MI>x</MI>
                <MN>7</MN>
              </MSub>
              <MO>&lt;&lt;</MO>
              <MSub>
                <MI>x</MI>
                <MN>5</MN>
              </MSub>
              <MO>&lt;</MO>
              <MSub>
                <MI>x</MI>
                <MN>2</MN>
              </MSub>
              <MO>&lt;</MO>
              <MSub>
                <MI>x</MI>
                <MN>3</MN>
              </MSub>
              <MO>&lt;&lt;&lt;</MO>
              <MSub>
                <MI>x</MI>
                <MN>4</MN>
              </MSub>
              <MO>&lt;</MO>
              <MSub>
                <MI>x</MI>
                <MN>1</MN>
              </MSub>
            </MRow>
          </PaddedMath>

          <PaddedMath display="block">
            <MRow>
              <MSub>
                <MI>y</MI>
                <MN>3</MN>
              </MSub>
              <MO>&lt;</MO>
              <MSub>
                <MI>y</MI>
                <MN>2</MN>
              </MSub>
              <MO>&lt;</MO>
              <MSub>
                <MI>y</MI>
                <MN>4</MN>
              </MSub>
              <MO>&lt;&lt;</MO>
              <MSub>
                <MI>y</MI>
                <MN>1</MN>
              </MSub>
            </MRow>
          </PaddedMath>
        </SpacedBlock>

        {/* Formula 1 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>6</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
              </MRow>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>2</MN>
                </MSub>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 2 */}
        <SpacedBlock>
          <Formula>
            <MRow>
              <MFrac>
                <MRow>
                  <MSub>
                    <MI>x</MI>
                    <MN>5</MN>
                  </MSub>
                  <MO>-</MO>
                  <MFrac>
                    <MRow>
                      <MSub>
                        <MI>x</MI>
                        <MO>2</MO>
                      </MSub>
                    </MRow>
                    <MRow>
                      <MSub>
                        <MI>y</MI>
                        <MO>4</MO>
                      </MSub>
                    </MRow>
                  </MFrac>
                </MRow>
                <MRow>
                  <MSup>
                    <MRow>
                      <MO stretchy={true} symmetric={true}>
                        (
                      </MO>
                      <MSub>
                        <MI>x</MI>
                        <MN>6</MN>
                      </MSub>
                      <MO>+</MO>
                      <MSub>
                        <MI>y</MI>
                        <MN>2</MN>
                      </MSub>
                      <MO>+</MO>
                      <MSub>
                        <MI>y</MI>
                        <MN>3</MN>
                      </MSub>
                      <MO stretchy={true} symmetric={true}>
                        )
                      </MO>
                    </MRow>
                    <MN>2</MN>
                  </MSup>
                </MRow>
              </MFrac>
              <MO>+</MO>
              <MFrac>
                <MRow>
                  <MSub>
                    <MI>x</MI>
                    <MN>3</MN>
                  </MSub>
                </MRow>
                <MRow>
                  <MSub>
                    <MI>y</MI>
                    <MN>1</MN>
                  </MSub>
                </MRow>
              </MFrac>
            </MRow>
          </Formula>
        </SpacedBlock>

        {/* Formula 3 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSup>
                  <MSub>
                    <MI>x</MI>
                    <MN>6</MN>
                  </MSub>
                  <MSub>
                    <MI>y</MI>
                    <MN>2</MN>
                  </MSub>
                </MSup>
                <MO>+</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>2</MN>
                </MSub>
              </MRow>
              <MRow>
                <MSup>
                  <MSub>
                    <MI>x</MI>
                    <MN>7</MN>
                  </MSub>
                  <MN>2</MN>
                </MSup>
                <MSub>
                  <MI>y</MI>
                  <MN>2</MN>
                </MSub>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 4 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>1</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
              </MRow>
              <MRow>
                <MSub>
                  <MI>y</MI>
                  <MN>2</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>4</MN>
                </MSub>
                <MO stretchy={true} symmetric={true}>
                  (
                </MO>
                <MSub>
                  <MI>y</MI>
                  <MN>2</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>1</MN>
                </MSub>
                <MO>-</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>4</MN>
                </MSub>
                <MO stretchy={true} symmetric={true}>
                  )
                </MO>
                <MO stretchy={true} symmetric={true}>
                  (
                </MO>
                <MSub>
                  <MI>x</MI>
                  <MN>7</MN>
                </MSub>
                <MO>+</MO>
                <MSqrt>
                  <MSub>
                    <MI>y</MI>
                    <MN>2</MN>
                  </MSub>
                </MSqrt>
                <MO stretchy={true} symmetric={true}>
                  )
                </MO>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 5 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>7</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>2</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>4</MN>
                </MSub>
              </MRow>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>7</MN>
                </MSub>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 6 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>5</MN>
                </MSub>
                <MSub>
                  <MI>x</MI>
                  <MN>6</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>1</MN>
                </MSub>
                <MO>-</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>2</MN>
                </MSub>
                <MO>-</MO>
                <MFrac>
                  <MSub>
                    <MI>x</MI>
                    <MN>3</MN>
                  </MSub>
                  <MSub>
                    <MI>y</MI>
                    <MN>3</MN>
                  </MSub>
                </MFrac>
              </MRow>
              <MRow>
                <MSup>
                  <MSub>
                    <MI>x</MI>
                    <MN>4</MN>
                  </MSub>
                  <MFrac>
                    <MN>2</MN>
                    <MN>3</MN>
                  </MFrac>
                </MSup>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 7 */}
        <SpacedBlock>
          <Formula>
            <MRow>
              <MSub>
                <MI>x</MI>
                <MN>6</MN>
              </MSub>
              <MO>-</MO>
              <MFrac>
                <MSub>
                  <MI>x</MI>
                  <MN>1</MN>
                </MSub>
                <MRow>
                  <MO stretchy={true} symmetric={true}>
                    (
                  </MO>
                  <MSub>
                    <MI>x</MI>
                    <MN>2</MN>
                  </MSub>
                  <MO>+</MO>
                  <MSub>
                    <MI>x</MI>
                    <MN>3</MN>
                  </MSub>
                  <MO>+</MO>
                  <MSub>
                    <MI>x</MI>
                    <MN>5</MN>
                  </MSub>
                  <MO>+</MO>
                  <MSub>
                    <MI>y</MI>
                    <MN>4</MN>
                  </MSub>
                  <MO stretchy={true} symmetric={true}>
                    )
                  </MO>
                  <MO stretchy={true} symmetric={true}>
                    (
                  </MO>
                  <MSub>
                    <MI>x</MI>
                    <MN>5</MN>
                  </MSub>
                  <MSub>
                    <MI>y</MI>
                    <MN>3</MN>
                  </MSub>
                  <MO>-</MO>
                  <MSub>
                    <MI>x</MI>
                    <MN>6</MN>
                  </MSub>
                  <MO>-</MO>
                  <MSub>
                    <MI>y</MI>
                    <MN>3</MN>
                  </MSub>
                  <MO>-</MO>
                  <MSub>
                    <MI>y</MI>
                    <MN>4</MN>
                  </MSub>
                  <MO stretchy={true} symmetric={true}>
                    )
                  </MO>
                </MRow>
              </MFrac>
            </MRow>
          </Formula>
        </SpacedBlock>

        {/* Formula 8 */}
        <SpacedBlock>
          <Formula>
            <MRoot>
              <MRow>
                <MSub>
                  <MI>y</MI>
                  <MN>1</MN>
                </MSub>
                <MO>-</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
                <MO stretchy={true} symmetric={true}>
                  (
                </MO>
                <MSub>
                  <MI>x</MI>
                  <MN>6</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>4</MN>
                </MSub>
                <MO stretchy={true} symmetric={true}>
                  )
                </MO>
              </MRow>
              <MN>3</MN>
            </MRoot>
          </Formula>
        </SpacedBlock>

        {/* Formula 9 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>5</MN>
                </MSub>
                <MO>-</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>6</MN>
                </MSub>
                <MO>-</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
              </MRow>
              <MSub>
                <MI>y</MI>
                <MN>4</MN>
              </MSub>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 10 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>5</MN>
                </MSub>
                <MO>+</MO>
                <MFrac>
                  <MRow>
                    <MSup>
                      <MSub>
                        <MI>x</MI>
                        <MN>4</MN>
                      </MSub>
                      <MN>2</MN>
                    </MSup>
                    <MO stretchy={true} symmetric={true}>
                      (
                    </MO>
                    <MSub>
                      <MI>x</MI>
                      <MN>7</MN>
                    </MSub>
                    <MO>-</MO>
                    <MSub>
                      <MI>y</MI>
                      <MN>3</MN>
                    </MSub>
                    <MO stretchy={true} symmetric={true}>
                      )
                    </MO>
                  </MRow>
                  <MRow>
                    <MSup>
                      <MSub>
                        <MI>y</MI>
                        <MN>4</MN>
                      </MSub>
                      <MN>5</MN>
                    </MSup>
                  </MRow>
                </MFrac>
              </MRow>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>5</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>6</MN>
                </MSub>
                <MO>+</MO>
                <MSub>
                  <MI>y</MI>
                  <MN>2</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>4</MN>
                </MSub>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 11 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MO stretchy={true} symmetric={true}>
                  (
                </MO>
                <MFrac>
                  <MSub>
                    <MI>y</MI>
                    <MN>1</MN>
                  </MSub>
                  <MSub>
                    <MI>x</MI>
                    <MN>6</MN>
                  </MSub>
                </MFrac>
                <MO stretchy={true} symmetric={true}>
                  )
                </MO>
                <MO stretchy={true} symmetric={true}>
                  (
                </MO>
                <MRow>
                  <MFrac>
                    <MSub>
                      <MI>x</MI>
                      <MN>4</MN>
                    </MSub>
                    <MSub>
                      <MI>x</MI>
                      <MN>2</MN>
                    </MSub>
                  </MFrac>
                  <MO>-</MO>
                  <MFrac>
                    <MSub>
                      <MI>x</MI>
                      <MN>7</MN>
                    </MSub>
                    <MSub>
                      <MI>y</MI>
                      <MN>4</MN>
                    </MSub>
                  </MFrac>
                </MRow>
                <MO stretchy={true} symmetric={true}>
                  )
                </MO>
              </MRow>
              <MSub>
                <MI>x</MI>
                <MN>2</MN>
              </MSub>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 12 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>3</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>2</MN>
                </MSub>
                <MO>+</MO>
                <MSqrt>
                  <MSub>
                    <MI>y</MI>
                    <MN>2</MN>
                  </MSub>
                </MSqrt>
              </MRow>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>7</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>4</MN>
                </MSub>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        {/* Formula 13 */}
        <SpacedBlock>
          <Formula>
            <MFrac>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>3</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>1</MN>
                </MSub>
              </MRow>
              <MRow>
                <MSub>
                  <MI>x</MI>
                  <MN>2</MN>
                </MSub>
                <MSub>
                  <MI>y</MI>
                  <MN>3</MN>
                </MSub>
              </MRow>
            </MFrac>
          </Formula>
        </SpacedBlock>

        <hr />

        {images.map(([image, exponent], i) => (
          <VCenteredDiv key={i}>
            <BoundedImg src={image} />
            {exponent && (
              <Formula>
                <MO>×</MO>
                <MSup>
                  <MN>10</MN>
                  <MN>{exponent}</MN>
                </MSup>
              </Formula>
            )}
          </VCenteredDiv>
        ))}
      </ContentWrapper>

      <CopyContent />
    </>
  );
};

export default PuzzleContent;
