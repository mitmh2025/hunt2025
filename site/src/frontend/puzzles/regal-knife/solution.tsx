import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import { GRID } from "./puzzle";

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1em;
  td {
    vertical-align: middle;
    text-align: center;
  }
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  td {
    padding: 0px 8px;
  }
`;

const GRID_FILL: string[][] = [
  ["W", "W", "E", ".", ".", "L", "I", "F", "T", ".", ".", "A", "R", "R", "."],
  ["H", "I", "N", "T", ".", "O", "T", "R", "O", "S", ".", "B", "O", "O", "S"],
  ["E", "S", "T", "A", ".", "A", "S", "A", "N", "A", ".", "S", "T", "A", "Y"],
  ["Y", "E", "A", "H", ".", ".", "A", "Y", "E", "S", ".", "T", "O", "R", "N"],
  [".", ".", "N", "O", "O", "B", "S", ".", ".", "H", "E", "A", "R", "S", "E"],
  ["I", "N", "G", "E", "N", "U", "E", "S", ".", "A", "R", "I", ".", ".", "."],
  ["C", "E", "L", ".", "O", "N", "T", "O", "P", ".", "A", "N", "N", "E", "X"],
  ["E", "V", "E", "R", ".", "S", "U", "S", "A", "N", ".", "S", "I", "A", "M"],
  ["S", "E", "D", "E", "R", ".", "P", "A", "T", "E", "S", ".", "G", "S", "A"],
  [".", ".", ".", "A", "T", "A", ".", "D", "R", "O", "U", "G", "H", "T", "S"],
  ["R", "A", "M", "S", "E", "S", ".", ".", "I", "N", "P", "U", "T", ".", "."],
  ["A", "X", "I", "S", ".", "P", "A", "L", "O", ".", ".", "P", "L", "U", "M"],
  ["F", "I", "N", "E", ".", "C", "L", "O", "T", "S", ".", "T", "I", "T", "O"],
  ["T", "O", "E", "S", ".", "A", "E", "R", "I", "E", ".", "A", "N", "N", "O"],
  [".", "M", "D", "S", ".", ".", "S", "E", "C", "T", ".", ".", "E", "E", "G"],
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presents as a blank US crossword grid and two audio files,
        each containing a string of words. These correspond to the across and
        down clues of the puzzle. Teams must transcribe the audio, discern the
        proper word from potential homophones, determine where one clue starts
        and ends, and solve the crossword puzzle. Upon solving the grid, teams
        will discover that the unbroken diagonal entry (accentuated by the
        design of the grid) spells out{" "}
        <PuzzleAnswer>WITHOUT STOPPING</PuzzleAnswer>, the answer to the puzzle.
      </p>
      <HScrollTableWrapper>
        <StyledCrossword
          labels={GRID}
          fill={GRID_FILL}
          getAdditionalCellStyles={({ row, column }) =>
            row === column ? { backgroundColor: "var(--gold-400)" } : {}
          }
        />
      </HScrollTableWrapper>
      <div>
        <strong>Across</strong>
      </div>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <td>1</td>
            <td>Briefly, Cena group</td>
            <td>WWE</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Raise</td>
            <td>LIFT</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Pirate noise</td>
            <td>ARR</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Imply</td>
            <td>HINT</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Others in Madrid</td>
            <td>OTROS</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Hates</td>
            <td>BOOS</td>
          </tr>
          <tr>
            <td>17</td>
            <td>This in Barcelona</td>
            <td>ESTA</td>
          </tr>
          <tr>
            <td>18</td>
            <td>Posture</td>
            <td>ASANA</td>
          </tr>
          <tr>
            <td>19</td>
            <td>Hang around</td>
            <td>STAY</td>
          </tr>
          <tr>
            <td>20</td>
            <td>“Agreed”</td>
            <td>YEAH</td>
          </tr>
          <tr>
            <td>21</td>
            <td>Two agrees</td>
            <td>AYES</td>
          </tr>
          <tr>
            <td>22</td>
            <td>Shredded</td>
            <td>TORN</td>
          </tr>
          <tr>
            <td>23</td>
            <td>Tyros</td>
            <td>NOOBS</td>
          </tr>
          <tr>
            <td>26</td>
            <td>Last ride?</td>
            <td>HEARSE</td>
          </tr>
          <tr>
            <td>28</td>
            <td>Innocents</td>
            <td>INGENUES</td>
          </tr>
          <tr>
            <td>31</td>
            <td>NPR’s Shapiro</td>
            <td>ARI</td>
          </tr>
          <tr>
            <td>32</td>
            <td>Picture frame?</td>
            <td>CEL</td>
          </tr>
          <tr>
            <td>33</td>
            <td>Above</td>
            <td>ONTOP</td>
          </tr>
          <tr>
            <td>35</td>
            <td>An addition</td>
            <td>ANNEX</td>
          </tr>
          <tr>
            <td>39</td>
            <td>At all</td>
            <td>EVER</td>
          </tr>
          <tr>
            <td>41</td>
            <td>Lazy spinner?</td>
            <td>SUSAN</td>
          </tr>
          <tr>
            <td>43</td>
            <td>Setting in The King and I</td>
            <td>SIAM</td>
          </tr>
          <tr>
            <td>44</td>
            <td>Passover dinner</td>
            <td>SEDER</td>
          </tr>
          <tr>
            <td>46</td>
            <td>Meat pastes</td>
            <td>PATES</td>
          </tr>
          <tr>
            <td>48</td>
            <td>Where all come together and some come out, for short</td>
            <td>GSA</td>
          </tr>
          <tr>
            <td>49</td>
            <td>Starting glance?</td>
            <td>ATA</td>
          </tr>
          <tr>
            <td>51</td>
            <td>Dry spells</td>
            <td>DROUGHTS</td>
          </tr>
          <tr>
            <td>53</td>
            <td>A pharaoh</td>
            <td>RAMSES</td>
          </tr>
          <tr>
            <td>56</td>
            <td>It’s entered</td>
            <td>INPUT</td>
          </tr>
          <tr>
            <td>57</td>
            <td>A central line</td>
            <td>AXIS</td>
          </tr>
          <tr>
            <td>58</td>
            <td>An Alto you can go to?</td>
            <td>PALO</td>
          </tr>
          <tr>
            <td>61</td>
            <td>Choice</td>
            <td>PLUM</td>
          </tr>
          <tr>
            <td>64</td>
            <td>Quality</td>
            <td>FINE</td>
          </tr>
          <tr>
            <td>65</td>
            <td>Congeals</td>
            <td>CLOTS</td>
          </tr>
          <tr>
            <td>67</td>
            <td>In the former Yugoslavia, the leader</td>
            <td>TITO</td>
          </tr>
          <tr>
            <td>68</td>
            <td>Follows (the line)</td>
            <td>TOES</td>
          </tr>
          <tr>
            <td>69</td>
            <td>Specifically, a line of women’s clothing</td>
            <td>AERIE</td>
          </tr>
          <tr>
            <td>70</td>
            <td>A in A.D.</td>
            <td>ANNO</td>
          </tr>
          <tr>
            <td>71</td>
            <td>ER workers</td>
            <td>MDS</td>
          </tr>
          <tr>
            <td>72</td>
            <td>Group</td>
            <td>SECT</td>
          </tr>
          <tr>
            <td>73</td>
            <td>Thinking reader</td>
            <td>EEG</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      <div>
        <strong>Down</strong>
      </div>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <td>1</td>
            <td>Bulking protein</td>
            <td>WHEY</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sage</td>
            <td>WISE</td>
          </tr>
          <tr>
            <td>3</td>
            <td>All mixed up in</td>
            <td>ENTANGLED</td>
          </tr>
          <tr>
            <td>4</td>
            <td>A specific mauna</td>
            <td>LOA</td>
          </tr>
          <tr>
            <td>5</td>
            <td>“We’ve been framed!”</td>
            <td>ITS A SETUP</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Wear at the edges</td>
            <td>FRAY</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Hue</td>
            <td>TONE</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Forgoes</td>
            <td>ABSTAINS</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Propeller</td>
            <td>ROTOR</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Rumbles</td>
            <td>ROARS</td>
          </tr>
          <tr>
            <td>12</td>
            <td>A Chevy</td>
            <td>TAHOE</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Fierce, Obama, or Banks</td>
            <td>SASHA</td>
          </tr>
          <tr>
            <td>16</td>
            <td>Scots word in an annual song</td>
            <td>SYNE</td>
          </tr>
          <tr>
            <td>24</td>
            <td>Artsy Yoko</td>
            <td>ONO</td>
          </tr>
          <tr>
            <td>25</td>
            <td>Rears</td>
            <td>BUNS</td>
          </tr>
          <tr>
            <td>27</td>
            <td>A time</td>
            <td>ERA</td>
          </tr>
          <tr>
            <td>28</td>
            <td>Cools</td>
            <td>ICES</td>
          </tr>
          <tr>
            <td>29</td>
            <td>Actor Campbell</td>
            <td>NEVE</td>
          </tr>
          <tr>
            <td>30</td>
            <td>“Such a tragedy”</td>
            <td>SOSAD</td>
          </tr>
          <tr>
            <td>34</td>
            <td>Flag-waving</td>
            <td>PATRIOTIC</td>
          </tr>
          <tr>
            <td>36</td>
            <td>Show after Jimmy</td>
            <td>NIGHTLINE</td>
          </tr>
          <tr>
            <td>37</td>
            <td>Right on a map</td>
            <td>EAST</td>
          </tr>
          <tr>
            <td>38</td>
            <td>A short holiday?</td>
            <td>XMAS</td>
          </tr>
          <tr>
            <td>40</td>
            <td>Judge anew</td>
            <td>REASSESS</td>
          </tr>
          <tr>
            <td>42</td>
            <td>Glowing</td>
            <td>NEON</td>
          </tr>
          <tr>
            <td>45</td>
            <td>Television in Ireland</td>
            <td>RTE</td>
          </tr>
          <tr>
            <td>47</td>
            <td>Dine (on)</td>
            <td>SUP</td>
          </tr>
          <tr>
            <td>50</td>
            <td>People protecting pets</td>
            <td>ASPCA</td>
          </tr>
          <tr>
            <td>52</td>
            <td>Doctor Sanjay</td>
            <td>GUPTA</td>
          </tr>
          <tr>
            <td>53</td>
            <td>Barge</td>
            <td>RAFT</td>
          </tr>
          <tr>
            <td>54</td>
            <td>A truth</td>
            <td>AXIOM</td>
          </tr>
          <tr>
            <td>55</td>
            <td>Extracted</td>
            <td>MINED</td>
          </tr>
          <tr>
            <td>59</td>
            <td>Bar fare</td>
            <td>ALES</td>
          </tr>
          <tr>
            <td>60</td>
            <td>Legend</td>
            <td>LORE</td>
          </tr>
          <tr>
            <td>62</td>
            <td>Notable reader</td>
            <td>UTNE</td>
          </tr>
          <tr>
            <td>63</td>
            <td>Synthesizer</td>
            <td>MOOG</td>
          </tr>
          <tr>
            <td>66</td>
            <td>Series</td>
            <td>SET</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
