import React from "react";
import { styled } from "styled-components";
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

const PuzzleContent = () => {
  return (
    <>
      <div className="flavor">
        <p>
          This &ldquo;elite&rdquo; firm wasn&rsquo;t built in a day, but their
          results are always a little off. They ignore a letter from each file,
          and even though they keep track of the dollars and cents, they just
          cut things off there.
        </p>
      </div>
      <div>
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
                  <MO>&#x2212;</MO>
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
                  <MN>x</MN>
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
                <MO>&#x2212;</MO>
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
                <MO>&#x2212;</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>2</MN>
                </MSub>
                <MO>&#x2212;</MO>
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
              <MO>&#x2212;</MO>
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
                  <MO>&#x2212;</MO>
                  <MSub>
                    <MI>x</MI>
                    <MN>6</MN>
                  </MSub>
                  <MO>&#x2212;</MO>
                  <MSub>
                    <MI>y</MI>
                    <MN>3</MN>
                  </MSub>
                  <MO>&#x2212;</MO>
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
                <MO>&#x2212;</MO>
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
                <MO>&#x2212;</MO>
                <MSub>
                  <MI>x</MI>
                  <MN>6</MN>
                </MSub>
                <MO>&#x2212;</MO>
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
                    <MO>&#x2212;</MO>
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
                  <MO>&#x2212;</MO>
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

        <VCenteredDiv>
          <BoundedImg src={img_01} />
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_02} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>-34</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_03} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>-11</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_04} />
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_05} />
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_06} />
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_07} />
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_08} />
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_09} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>2</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_10} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>8</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_11} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>11</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_12} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>16</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
        <VCenteredDiv>
          <BoundedImg src={img_13} />
          <Formula>
            <MO>&#x00d7;</MO>
            <MSup>
              <MN>10</MN>
              <MN>23</MN>
            </MSup>
          </Formula>
        </VCenteredDiv>
      </div>
    </>
  );
};

export default PuzzleContent;
