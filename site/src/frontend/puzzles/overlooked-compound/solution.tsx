import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledP = styled.p`
  margin-left: 16px;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
`;

const StyledTd = styled.td`
  padding: 0px 8px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a puzzle about hidden letters. Solvers should notice some
        strange word choices throughout the diary entry, starting with three in
        the first sentence. Each of these words can have a single letter added
        within it to make a word that fits the context correctly. The final
        sentence hints at this: “find everything missing.” With those letters
        added, the passage looks like this:
      </p>
      <StyledP>
        Once again I have s[p]oiled my chance to put a f[e]ather in my cap, so
        my st[r]eak continues and my mood is quite sombre. These days British
        detectives such as myself are often called upon by ch[i]ef inspectors in
        the Netherlands, and I found myself working a most fantastic kidnapping
        and murder case involving the bar[o]n in Amsterdam. Edgar Allan Poe
        couldn’t have assembled a stranger brea[d]th of personalities; even the
        Shah was there - Mohammad Reza Pahlavi. Count on me to gather the entire
        ca[s]t of suspects together for maximum drama, just like in my favourite
        stories. Ordinarily (well, sometimes), I would c[h]ase a few more leads
        and eliminate any personal b[i]ases, but I thought I was already
        hol[d]ing all the cards, so perhaps I was overly precipitous in
        d[e]riving a theory and convening everybody. Ingeniously, while they all
        sat rapt with attention, I produced the stunning, decisive evidence -
        that the Ming vase was, in fact, a replica. Goodness knows they cur[s]ed
        me but somehow I kept my po[i]se and hand[l]ed their vitriol gracefully!
      </StyledP>
      <StyledP>
        Sur[e]ly I could not have known that the baron himself was making vases
        for the pri[n]ce, providing a perfect alibi. Lethargy is overcoming me
        now, so I will wrap up this, ahem, postmortem. The mistaken accusation
        (it s[t]ings for the baron to call it false) was entirely reasonable, I
        thought, given the vase and the stipulated ransom. One day perhaps we’ll
        look back at that ridiculous scene and the ensuing s[c]andal and laugh
        together over a pint. Restitution might be necessary first, though, as
        rather than t[h]anks, I earned the entire royal family’s animus. Lessons
        learned: not every case can have a sensational reve[a]l and a
        spectacular ending. Ostentatious explanations are just my nature I
        suppose, but I must keep t[r]ying to re[s]train myself and remember to
        look back over my notes to find everything that is missing!
      </StyledP>
      <p>
        Taken together, the inserted letters spell PERIODS HIDE SILENT CHARS.
        This is a hint towards additional, more subtle hidden letters. Hidden
        between each sentence within each paragraph is a single silent letter,
        hidden by the periods ending the sentences. The missing letter forms a
        word with the trailing letters of the previous sentence and the initial
        letters of the next sentence, and the missing letter is silent in the
        new word (which disambiguates which letters should be added to form a
        new word).
      </p>
      <StyledTable>
        <tr>
          <th>Silent Letter</th>
          <th>Hidden Word</th>
        </tr>
        <tr>
          <StyledTd>A</StyledTd>
          <StyledTd>bre[a]th</StyledTd>
        </tr>
        <tr>
          <StyledTd>N</StyledTd>
          <StyledTd>dam[n]ed</StyledTd>
        </tr>
        <tr>
          <StyledTd>S</StyledTd>
          <StyledTd>vi[s]count</StyledTd>
        </tr>
        <tr>
          <StyledTd>W</StyledTd>
          <StyledTd>s[w]ord</StyledTd>
        </tr>
        <tr>
          <StyledTd>E</StyledTd>
          <StyledTd>dy[e]ing</StyledTd>
        </tr>
        <tr>
          <StyledTd>R</StyledTd>
          <StyledTd>ca[r]go</StyledTd>
        </tr>
        <tr>
          <StyledTd>S</StyledTd>
          <StyledTd>i[s]let</StyledTd>
        </tr>
        <tr>
          <StyledTd>P</StyledTd>
          <StyledTd>tem[p]t</StyledTd>
        </tr>
        <tr>
          <StyledTd>E</StyledTd>
          <StyledTd>som[e]one</StyledTd>
        </tr>
        <tr>
          <StyledTd>E</StyledTd>
          <StyledTd>int[e]rest</StyledTd>
        </tr>
        <tr>
          <StyledTd>C</StyledTd>
          <StyledTd>mus[c]le</StyledTd>
        </tr>
        <tr>
          <StyledTd>H</StyledTd>
          <StyledTd>g[h]ost</StyledTd>
        </tr>
      </StyledTable>
      <p>
        The extraction is the silent letters themselves, instructing the solver
        to <Mono>ANSWER SPEECH</Mono>, giving the final answer:{" "}
        <Mono>
          <strong>SPEECH</strong>
        </Mono>
        .
      </p>
      <p>
        Note that a silent R is required (in ca[r]go), which is enabled by using
        a British narrator, as mentioned in the passage and hinted via British
        English spellings of sombre and favourite.
      </p>
      <p>
        <div>Author’s Note:</div>
        <div>
          This puzzle started out as a much longer detective story based on the
          phrase “it was quiet, a little too quiet.” When it was simplified and
          then the answer SPEECH was assigned, I still had that in mind and
          immediately thought about the{" "}
          <a
            href="https://tvtropes.org/pmwiki/pmwiki.php/Main/SummationGathering"
            target="_blank"
            rel="noreferrer"
          >
            Summation Gathering trope
          </a>
          . I find that trope both ridiculous and yet satisfying. If you also
          enjoy it, I recommend the{" "}
          <a
            href="https://lawrenceblock.com/series/bernie/"
            target="_blank"
            rel="noreferrer"
          >
            Bernie Rhodenbarr books
          </a>{" "}
          by Lawrence Block, in which the protagonist is actually a burglar who
          continually ends up having to solve murder mysteries.
        </div>
      </p>
    </>
  );
};

export default Solution;
