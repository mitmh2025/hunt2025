import React from "react";
import { styled } from "styled-components";
import Crossword from "../../../components/Crossword";
import rootUrl from "../../../utils/rootUrl";
import { HARDLYSAFE_LABELS } from "./data";

const Arrow = styled.span`
  color: var(--black);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a
          href={`${rootUrl}/puzzles/and_now_a_puzzling_word_from_our_sponsors`}
        >
          Back to main puzzle
        </a>
      </p>
      <Crossword labels={HARDLYSAFE_LABELS} />
      <h3>Across</h3>
      <div>1. Paris-Roubaix prizes, in addition to money</div>
      <div>5. What an 8-Across does, briefly</div>
      <div>8. One taking the shot?</div>
      <div>12. One of three Pittsburgh rivers</div>
      <div>13. What a movie might do to a popular book</div>
      <div>16. Small bit of midriff jewelry</div>
      <div>19. Cruel pleasure</div>
      <div>20. Red or dead, but not redemption</div>
      <div>21. Divided up, as a shell</div>
      <div>22. Too-common football ailment</div>
      <div>23. Common beer pong quaff</div>
      <div>25. One with few lunch tables to choose from, perhaps</div>
      <div>27. Zion locale, in modernity</div>
      <div>29. One who might eat pork and shrimp</div>
      <div>30. Require, biblically</div>
      <div>31. Quinceañeras and b’nai mitzvah, for example</div>
      <div>33. Founder of a local Back Bay and Beacon Hill market</div>
      <div>35. Greek, to Homer</div>
      <div>37. Rapid ____ (the T, often in name only)</div>
      <div>41. Like a hound’s ears</div>
      <div>43. ____-buy (mortgage type)</div>
      <div>44. Type of tree, or the furniture made from it</div>
      <div>47. Fury</div>
      <div>49. Woodworking tool, or a sound reminiscent of it</div>
      <div>50. Standing alternative</div>
      <div>51. One-ups</div>
      <div>53. Dodge spin-off</div>
      <div>54. Suffix with mob or miss</div>
      <div>55. Orthographic face-off</div>
      <div>56. Partner of shoulda and woulda</div>
      <div>58. Diplomas earned on Francis Avenue in Cambridge</div>
      <div>62. Give slack</div>
      <div>63. At once!</div>
      <div>64. Work, in local slang</div>
      <div>65. Winter solstice mo.</div>
      <div>66. AIM queries</div>
      <h3>Down</h3>
      <div>1. Dark room displaying a pinhole image</div>
      <div>2. Bertha’s home in Jane Eyre</div>
      <div>3. Marriage duration, traditionally</div>
      <div>4. Singled-out parts, in music</div>
      <div>5. Chief of the magi</div>
      <div>6. MIT. suffix</div>
      <div>7. Marble originally from Japan</div>
      <div>8. Colonnade, classically</div>
      <div>9. WTO rule</div>
      <div>10. Latin word above a lion, in classic movies</div>
      <div>11. Has never made a 3-Down vow, perhaps</div>
      <div>14. Prefix for many airborne dinos</div>
      <div>15. Unsound actions?</div>
      <div>17. Expensive letters to wear, perhaps</div>
      <div>18. Graeber special interest</div>
      <div>24. “Not a chance!”</div>
      <div>25. “Baby on Board” item</div>
      <div>26. Piglet older than a suckling</div>
      <div>28. Make a beeline for</div>
      <div>30. Light, in the Quran</div>
      <div>32. Pointy glacial feature</div>
      <div>34. Measurement dist. for the Enterprise</div>
      <div>36. Center skyscraper in Chicago or Los Angeles</div>
      <div>38. Up-and-coming actresses</div>
      <div>39. “We’re on!”</div>
      <div>40. Boat parts that might be mizzen or fore</div>
      <div>42. Had quite a few too many</div>
      <div>44. SLED alternative</div>
      <div>45. “You’re gonna need a bigger boat”, surprisingly</div>
      <div>46. Many a pet’s least-favorite place</div>
      <div>
        48. “I’ll leave other examples as an exercise for the reader,”
        repetitively
      </div>
      <div>51. “You ___ can!”</div>
      <div>52. Leatherman competitor</div>
      <div>55. Like 49 US state legislatures</div>
      <div>57. Starry major or minor</div>
      <div>59. UN workers’ agency</div>
      <div>60. Lead-in to noir</div>
      <div>61. “Leave this chalkboard alone!”, briefly</div>
    </>
  );
};

export default Puzzle;
