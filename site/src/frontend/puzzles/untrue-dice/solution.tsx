import React from "react";
import { styled } from "styled-components";
import { Math, MFrac, MI, MN, MO, MSub } from "./mathml";

const CenteredTable = styled.table`
  th, td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid black;
    border-collapse: collapse;
  } 

  border: 1px solid black;
  border-collapse: collapse;
`;

const UniformTable = styled(CenteredTable)`
  margin: 24px 0px;
  td {
    min-width: 4em;
    padding: 4px;
  }
`

const Solution = () => {
  return (
    <div>
      <p>
        This metapuzzle has two feeders, one made up of the <Math display="inline"><MI>x</MI></Math> variables and one made up of
        the <Math display="inline"><MI>y</MI></Math> variables.  These feeders, MILLIMETERS and SLIVERS, are made up of letters
        that can be interpreted as Roman numerals or &ldquo;leetspeak&rdquo; numbers, except for one
        letter each, as clued by the flavortext (&ldquo;ignore a letter from each file&rdquo;).
      </p>
      <p>
        The inequalities give confirmation that solvers have split the feeders into component
        variables correctly.  The variables are:
      </p>

      <UniformTable>
        <tbody>
          <tr>
            <td><Math><MSub><MI>x</MI><MN>1</MN></MSub></Math></td>
            <td><Math><MSub><MI>x</MI><MN>2</MN></MSub></Math></td>
            <td><Math><MSub><MI>x</MI><MN>3</MN></MSub></Math></td>
            <td><Math><MSub><MI>x</MI><MN>4</MN></MSub></Math></td>
            <td><Math><MSub><MI>x</MI><MN>5</MN></MSub></Math></td>
            <td><Math><MSub><MI>x</MI><MN>6</MN></MSub></Math></td>
            <td>-</td>
            <td><Math><MSub><MI>x</MI><MN>7</MN></MSub></Math></td>
          </tr>
          <tr>
            <td>MI</td>
            <td>L</td>
            <td>LI</td>
            <td>M</td>
            <td>ET</td>
            <td>E</td>
            <td>R</td>
            <td>S</td>
          </tr>
          <tr>
            <td>1001</td>
            <td>50</td>
            <td>51</td>
            <td>1000</td>
            <td>37</td>
            <td>3</td>
            <td></td>
            <td>5</td>
          </tr>
        </tbody>
      </UniformTable>

      <UniformTable>
        <tbody>
          <tr>
            <td><Math><MSub><MI>y</MI><MN>1</MN></MSub></Math></td>
            <td><Math><MSub><MI>y</MI><MN>2</MN></MSub></Math></td>
            <td><Math><MSub><MI>y</MI><MN>3</MN></MSub></Math></td>
            <td>-</td>
            <td><Math><MSub><MI>y</MI><MN>4</MN></MSub></Math></td>
          </tr>
          <tr>
            <td>SL</td>
            <td>IV</td>
            <td>E</td>
            <td>R</td>
            <td>S</td>
          </tr>
          <tr>
            <td>51</td>
            <td>4</td>
            <td>3</td>
            <td></td>
            <td>5</td>
          </tr>
        </tbody>
      </UniformTable>

      <p>
        Evaluating each expression, solvers find that they are not quite in numerical order.
        However, each has a discrepancy from a well-known constant (with powers of 10 omitted), and
        the expressions are in order by the true value.  These constants are clued by the images below,
        along with the accompanying powers of 10.  Taking the difference between the true value
        truncated to the hundredths place and the calculated expression (as per the flavortext:
        &ldquo;They keep track of the dollars and cents, but they&rsquo;re apt to just cut things off there&rdquo;)
        and interpreting these two decimal digits as letters with 0.01=A, 0.02=B, etc. gives the
        answer ROUNDING ERROR.
      </p>

      <CenteredTable>
        <thead>
          <tr>
            <th>Constant</th>
            <th>Picture</th>
            <th>Constant value (sans powers of 10)</th>
            <th>Expression number</th>
            <th>Calculated value</th>
            <th>Difference</th>
            <th>Extracted letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Zero</td>
            <td>Goose egg</td>
            <td>0</td>
            <td>1</td>
            <td>0.18</td>
            <td>0.18</td>
            <td>R</td>
          </tr>
          <tr>
            <td>Planck&rsquo;s constant</td>
            <td>Plank</td>
            <td>6.62</td>
            <td>10</td>
            <td>6.77</td>
            <td>0.15</td>
            <td>O</td>
          </tr>
          <tr>
            <td>Gravitational Constant (G)</td>
            <td>Cavendish experiment</td>
            <td>6.67</td>
            <td>11</td>
            <td>6.46</td>
            <td>0.21</td>
            <td>U</td>
          </tr>
          <tr>
            <td>Square root of two</td>
            <td>Square tree roots</td>
            <td>1.41</td>
            <td>2</td>
            <td>1.27</td>
            <td>0.14</td>
            <td>N</td>
          </tr>
          <tr>
            <td>Golden ratio</td>
            <td>Golden ratio spiral</td>
            <td>1.61</td>
            <td>4</td>
            <td>1.65</td>
            <td>0.04</td>
            <td>D</td>
          </tr>
          <tr>
            <td>e</td>
            <td>Integral of <Math display="inline"><MI>f</MI><MO stretchy={true} symmetric={true}>(</MO><MI>x</MI><MO stretchy={true} symmetric={true}>)</MO><MO>=</MO><MFrac><MN>1</MN><MI>x</MI></MFrac></Math></td>
            <td>2.71</td>
            <td>5</td>
            <td>2.8</td>
            <td>0.09</td>
            <td>I</td>
          </tr>
          <tr>
            <td>pi</td>
            <td>Pie</td>
            <td>3.14</td>
            <td>8</td>
            <td>3</td>
            <td>0.14</td>
            <td>N</td>
          </tr>
          <tr>
            <td>Ideal gas constant (n)</td>
            <td>Gas pump</td>
            <td>8.31</td>
            <td>12</td>
            <td>8.24</td>
            <td>0.07</td>
            <td>G</td>
          </tr>
          <tr>
            <td>Taxicab number</td>
            <td>Taxi</td>
            <td>17.29</td>
            <td>13</td>
            <td>17.34</td>
            <td>0.05</td>
            <td>E</td>
          </tr>
          <tr>
            <td>Speed of light</td>
            <td>Lightbulb</td>
            <td>2.99</td>
            <td>6</td>
            <td>3.17</td>
            <td>0.18</td>
            <td>R</td>
          </tr>
          <tr>
            <td>1 Astronomical Unit (AU)</td>
            <td>Solar system</td>
            <td>1.49</td>
            <td>3</td>
            <td>1.31</td>
            <td>0.18</td>
            <td>R</td>
          </tr>
          <tr>
            <td>1 parsec</td>
            <td>Millenium Falcon</td>
            <td>3.08</td>
            <td>7</td>
            <td>2.93</td>
            <td>0.15</td>
            <td>O</td>
          </tr>
          <tr>
            <td>Avogadro&rsquo;s number</td>
            <td>Avocado</td>
            <td>6.02</td>
            <td>9</td>
            <td>6.2</td>
            <td>0.18</td>
            <td>R</td>
          </tr>
        </tbody>
      </CenteredTable>
    </div>
  );
};

export default Solution;
