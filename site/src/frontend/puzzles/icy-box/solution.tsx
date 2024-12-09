import React from "react";
import { styled } from "styled-components";

const StyledTable = styled.table`
  margin-bottom: 1em;
  td,
  th {
    padding: 1px 8px;
  }
`;

const Mono = styled.span`
  font-family: monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The note presented on the webpage will indicate several clues pointing
        to news articles about an antique dress and a hidden note with a code.
        The clues to find this article include:
      </p>
      <ul>
        <li>
          Reference to hiding a note in the dress (just as the actual note with
          the codes was hidden in the dress)
        </li>
        <li>Ms. Bennet (name found on the dress)</li>
        <li>7/1/87 (date listed in the codebook—July 1 1887)</li>
        <li>War Department (department that created the codebook)</li>
      </ul>
      <p>
        News articles will reveal the real life mystery on the code found in the
        dress and how this puzzle was eventually solved. One key piece of
        information is that the original solver of the real life mystery used an
        1887 war department codebook used for transmitting weather reports.
      </p>
      <p>
        The second portion of the clue is understanding how to use the
        broadcasted weather reports on the provided radio. The codebook can be
        used to translate these weather reports. There is also an indication on
        the note that points to listening for the clues. The broadcasted weather
        reports are tied to this same puzzle and that the codebook needs to be
        used to uncover the next step. The broadcasts contain the following
        information.
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Radio Broadcast Transcript</th>
        </tr>
        <tr>
          <td>Weather Report #1</td>
          <td>
            In Rome the temperature is currently 62 degrees with a barometric
            pressure reading of 0.58. At 10pm the dew point was measured to be
            52 degrees. The skies are clear and wind coming from the south with
            the precipitation measured at 0.24. The Tiber is continuing to rise
            with a gauge reading of 20 and 6 tenths.
          </td>
        </tr>
        <tr>
          <td>Weather Report #2</td>
          <td>
            In Stockholm the temperature is currently 40 degrees with a
            barometric pressure reading of 0.90. At 10pm the dew point was
            measured to be 58 degrees. The skies are cloudy and the wind coming
            from the northeast with the precipitation measured at 0.98. There
            are low cumulus clouds covering about 4 tenths of the sky and coming
            in from the northeast. The Söderström is continuing to rise with a
            gauge reading of 54 and 1 tenth.
          </td>
        </tr>
        <tr>
          <td>Weather Report #3</td>
          <td>
            In Paris the temperature is currently 54 degrees with a
            barometricpressure reading of 0.96. At 3pm the dew point was
            measured to be 74 degrees. It is currently snowing and the wind
            coming from the northwest with the precipitation measured at 0.02.
            The Seine is continuing to fall with a gauge reading of 18 and 6
            tenths.
          </td>
        </tr>
        <tr>
          <td>Weather Report #4</td>
          <td>
            In Tokyo the temperature is currently 100 degrees with a barometric
            pressure reading of 0.02. At 7am the dew point was measured to be 66
            degrees. It is currently calm and cloudy with the precipitation
            measured at 0.08. The sky is fully covered with nimbus clouds that
            are coming in from the northeast. A maximum wind speed of 16 was
            measured coming from the northwest. The Sumida is continuing to rise
            with a gauge reading of 32 and 4 tenths.
          </td>
        </tr>
        <tr>
          <td>Weather Report #5</td>
          <td>
            In Los Angeles the temperature is currently 100 degrees with a
            barometric pressure reading of 0.94. It is currently raining and the
            wind coming from the northwest with the precipitation measured at
            0.44. There are low cumulus clouds covering about 2 tenths of the
            sky and coming in from the south. The Los Angeles River is rising
            and reporting a gauge reading of 1 and 6 tenths below zero.
          </td>
        </tr>
      </StyledTable>
      <p>
        Weather data is transmitted in the following pattern when broadcasted
        using the codebook:
      </p>
      <ol>
        <li>Name of station</li>
        <li>Pressure & Temperature</li>
        <li>Dew Point</li>
        <li>Direction of wind, state of weather, precipitation</li>
        <li>Upper Clouds</li>
        <li>Lower Clouds</li>
        <li>Current wind velocity and maximum temperature</li>
        <li>Maximum wind velocity and temperature</li>
        <li>River observation</li>
      </ol>
      <p>
        Not every weather report will have all the possible data elements. Based
        on this structure, the data from each weather report can be organized in
        the following tables:
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Station</th>
          <th>Pres. + Temp.</th>
          <th>Dew + Time</th>
          <th>Wind</th>
          <th>Clouds</th>
          <th>Max Wind</th>
          <th>River</th>
        </tr>
        <tr>
          <td>Weather Report #1</td>
          <td>Rome</td>
          <td>0.58, 62</td>
          <td>10pm, 52</td>
          <td>South, Clear, 0.24</td>
          <td></td>
          <td></td>
          <td>Rise 20′ 6 tenths</td>
        </tr>
        <tr>
          <td>Weather Report #2</td>
          <td>Stockholm</td>
          <td>0.90, 40</td>
          <td>10pm, 58</td>
          <td>NE, Cloudy, 0.98</td>
          <td>Cumulus Low 4 tenths, NE</td>
          <td></td>
          <td>Rise 54′ 1 tenth</td>
        </tr>
        <tr>
          <td>Weather Report #3</td>
          <td>Paris</td>
          <td>0.96, 54</td>
          <td>3pm, 74</td>
          <td>NW, Snow, 0.02</td>
          <td></td>
          <td></td>
          <td>Fall, 18′ 6 tenth</td>
        </tr>
        <tr>
          <td>Weather Report #4</td>
          <td>Tokyo</td>
          <td>0.02, 100</td>
          <td>7am, 66</td>
          <td>Calm, Cloudy, 0.08</td>
          <td>Fully covered Nimbus, NE</td>
          <td>16, NW</td>
          <td>Rise 32′, 4 tenth</td>
        </tr>
        <tr>
          <td>Weather Report #5</td>
          <td>Los Angeles</td>
          <td>0.94, 100</td>
          <td></td>
          <td>NW, Rain, .44</td>
          <td>Cumulus Low 2 tenths, South</td>
          <td></td>
          <td>Rise -1′, 6 tenth</td>
        </tr>
      </StyledTable>
      <p>
        The codebook has lookup tables for each of these items. The code words
        can be uncovered as follows:
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Station</th>
          <th>Pres. + Temp.</th>
          <th>Dew + Time</th>
          <th>Wind</th>
          <th>Clouds</th>
          <th>Max Wind</th>
          <th>River</th>
        </tr>
        <tr>
          <td>Weather Report #1</td>
          <td>Rome</td>
          <td>0.58, 62</td>
          <td>10pm, 52</td>
          <td>South, Clear, 0.24</td>
          <td></td>
          <td></td>
          <td>Rise 20′ 6 tenths</td>
        </tr>
        <tr>
          <td></td>
          <td>Rome</td>
          <td>Monarch</td>
          <td>Latin</td>
          <td>Murder</td>
          <td></td>
          <td></td>
          <td>Senate</td>
        </tr>
        <tr>
          <td>Weather Report #2</td>
          <td>Stockholm</td>
          <td>0.90, 40</td>
          <td>10pm, 58</td>
          <td>NE, Cloudy, 0.98</td>
          <td>Cumulus Low 4 tenths, NE</td>
          <td></td>
          <td>Rise 54′ 1 tenth</td>
        </tr>
        <tr>
          <td></td>
          <td>Stockholm</td>
          <td>Won</td>
          <td>Laurel</td>
          <td>Detonate</td>
          <td>Medal</td>
          <td></td>
          <td>Stick</td>
        </tr>
        <tr>
          <td>Weather Report #3</td>
          <td>Paris</td>
          <td>0.96, 54</td>
          <td>3pm, 74</td>
          <td>NW, Snow, 0.02</td>
          <td></td>
          <td></td>
          <td>Fall, 18′ 6 tenth</td>
        </tr>
        <tr>
          <td></td>
          <td>Paris</td>
          <td>Time</td>
          <td>King</td>
          <td>Solar</td>
          <td></td>
          <td></td>
          <td>Throne</td>
        </tr>
        <tr>
          <td>Weather Report #4</td>
          <td>Tokyo</td>
          <td>0.02, 100</td>
          <td>7am, 66</td>
          <td>Calm, Cloudy, 0.08</td>
          <td>Fully covered Nimbus, NE</td>
          <td>16, NW</td>
          <td>Rise 32′, 4 tenth</td>
        </tr>
        <tr>
          <td></td>
          <td>Toyko</td>
          <td>All</td>
          <td>Catch</td>
          <td>Evolve</td>
          <td>Rodent</td>
          <td>Voice</td>
          <td>Shock</td>
        </tr>
        <tr>
          <td>Weather Report #5</td>
          <td>Los Angeles</td>
          <td>0.94, 100</td>
          <td></td>
          <td>NW, Rain, .44</td>
          <td>Cumulus Low 2 tenths, South</td>
          <td></td>
          <td>Rise -1′, 6 tenth</td>
        </tr>
        <tr>
          <td></td>
          <td>Los Angeles</td>
          <td>Tell</td>
          <td></td>
          <td>Singer</td>
          <td>Mamma</td>
          <td></td>
          <td>James</td>
        </tr>
      </StyledTable>
      <p>
        The next portion of the puzzle is identifying the person clued in by
        each set of code words. These individuals are:
      </p>
      <StyledTable>
        <tr>
          <th>Description of Person</th>
          <th>Person</th>
        </tr>
        <tr>
          <td>Rome Monarch Latin Murder Senate</td>
          <td>Julius Caesar</td>
        </tr>
        <tr>
          <td>Stockholm Won Laurel Detonate Medal Stick</td>
          <td>Alfred Nobel</td>
        </tr>
        <tr>
          <td>Paris Time King Solar Throne</td>
          <td>Louis XIV</td>
        </tr>
        <tr>
          <td>Tokyo All Catch Evolve Rodent Voice Shock</td>
          <td>Ikue Otani (voice of Pikachu)</td>
        </tr>
        <tr>
          <td>Los Angeles Tell Singer Mamma James</td>
          <td>Etta James</td>
        </tr>
      </StyledTable>
      <p>
        The final portion of the puzzle is understanding what to do with the
        list of names. This is where the final clues in the original note are
        used. The note indicates being retired. There are also lines on the left
        side of the note which can be realized to be hurricane paths. The last
        clue says to use both last and first names. Based on these clues, the
        dataset for retired hurricane names should be reviewed and compared
        against the already uncovered names. The solver will discover that each
        name contains an extra letter compared to a retired hurricane name. The
        list of 5 letters can be extracted from this comparison.
      </p>
      <StyledTable>
        <tr>
          <th>Description</th>
          <th>Name</th>
          <th>Retired Hurricane</th>
          <th>Extra Letter</th>
        </tr>
        <tr>
          <td>Julius Caesar</td>
          <td>Caesar</td>
          <td>Cesar</td>
          <td>A</td>
        </tr>
        <tr>
          <td>Alfred Nobel</td>
          <td>Nobel</td>
          <td>Noel</td>
          <td>B</td>
        </tr>
        <tr>
          <td>Louis XIV</td>
          <td>Louis</td>
          <td>Luis</td>
          <td>O</td>
        </tr>
        <tr>
          <td>Ikue Otani (voice of Pikachu)</td>
          <td>Ikue</td>
          <td>Ike</td>
          <td>U</td>
        </tr>
        <tr>
          <td>Etta James</td>
          <td>Etta</td>
          <td>Eta</td>
          <td>T</td>
        </tr>
      </StyledTable>
      <p>
        The verification for which names to use can also be found by looking up
        the retired hurricane’s path and comparing it to the note. The 5
        hurricanes paths also provide a sorting to use for the 5 extracted
        letters. When sorted, the letters will spell the final answer,{" "}
        <Mono>
          <strong>ABOUT</strong>
        </Mono>
        .
      </p>
    </>
  );
};

export default Solution;
