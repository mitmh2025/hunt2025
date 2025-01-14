import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import adam from "./assets/adam.mp3";
import adamCaptions from "./assets/adam.vtt";

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
`;

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <HScrollTableWrapper>
      <TableElement>{children}</TableElement>
    </HScrollTableWrapper>
  );
};

const TableHeader = styled.thead`
  // background-color: #f4f4f4;
`;

const TableRow = styled.tr``;
const TableBody = styled.tbody``;

const TableHeaderCell = styled.th`
  border: 2px solid grey;
  padding: 12px;
`;

const TableCell = styled.td`
  border: 2px solid grey;
  padding: 12px;
`;

const Solution = () => {
  return (
    <>
      <p>
        The clues jumble together descriptions of famous ruins with facts from
        episodes of the TruTV show <cite>Adam Ruins Everything</cite> (as the
        original Adam did when he ate the apple in the Garden of Eden). However,
        one word in the description that helps identify the ruin has been
        replaced with a dummy word. The correct word is listed in the “Actually,
        it’s…” list (which is a reference to Adam Conover’s show{" "}
        <cite>Factually</cite>).
      </p>
      <p>
        The ruins are all UNESCO World Heritage Sites, and are given in
        alphabetical order by their official UNESCO titles, from the Ancient
        City of Qalhat to Tikal National Park.
      </p>
      <p>
        If the sites are sorted west-to-east, from Rapa Nui (Easter Island) to
        Nan Madol (Micronesia), the initial letters of the wrong words spell
        SORT ON UNESCO HERITAGE.
      </p>
      <p>
        Sorting by UNESCO reference number (aka dossier number), the initial
        letters of the correct words spell ADAM RUINS EPISODE NUMS. There are up
        to 26 episodes in each of the three seasons of Adam Ruins Everything.
        Matching the clues to the episodes, and using 1=A code, spells the final
        message <strong>NOW RUIN SOMETHING ELSE</strong>.
      </p>
      <p>
        Calling in that answer gets specific instructions for a task to complete
        (“Email us an obscure fact that ruins something for us”), which unlocks
        an audio message in which Adam Conover gives the final answer,{" "}
        <PuzzleAnswer>SAMGAKSAN</PuzzleAnswer>.
      </p>
      <p>
        <audio controls src={adam}>
          <track default kind="captions" srcLang="en" src={adamCaptions} />
        </audio>
      </p>
      <p>Details:</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>site description</TableHeaderCell>
            <TableHeaderCell>wrong</TableHeaderCell>
            <TableHeaderCell>Actually, it’s…</TableHeaderCell>
            <TableHeaderCell>Adams Ruins Everything clue</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              This village north of [] was visited by Marco Polo and Ibn Battuta
            </TableCell>
            <TableCell>Rajpur</TableCell>
            <TableCell>Sur</TableCell>
            <TableCell>exhibitions were sponsored by the CIA</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>[] towers of ancient temples</TableCell>
            <TableCell>Antenna </TableCell>
            <TableCell>Ogival</TableCell>
            <TableCell>Ticketmaster’s exorbitant fees</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>this famed [] at the center of the universe</TableCell>
            <TableCell>Star</TableCell>
            <TableCell>Sanctuary</TableCell>
            <TableCell>experiments on mice</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              these colossal temples represent the peak of [] architecture
            </TableCell>
            <TableCell>Origami</TableCell>
            <TableCell>Imperial Roman</TableCell>
            <TableCell>seances and child abductions</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>pyramid’s name rhymes with []</TableCell>
            <TableCell>Ozer </TableCell>
            <TableCell>Itches </TableCell>
            <TableCell>cannabis was first cultivated 8000 years ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              a well-fortified city in [] once called the “House of God“
            </TableCell>
            <TableCell>Essex </TableCell>
            <TableCell>Upper Mesopotamia</TableCell>
            <TableCell>Mickey Mouse and Ms. Pac-Man</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the “Scottish []“</TableCell>
            <TableCell>Utah </TableCell>
            <TableCell>Pompeii</TableCell>
            <TableCell>farmed salmon is dyed pink</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>This pair of missions built by the []</TableCell>
            <TableCell>Ottomans </TableCell>
            <TableCell>Society of Jesus</TableCell>
            <TableCell>deadly car crashes and graverobbing</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              These fantastic figures in the Peruvian [] depict
            </TableCell>
            <TableCell>Theater</TableCell>
            <TableCell>Desert</TableCell>
            <TableCell>the War of the Worlds and poisoned candy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the tomb of the [] is filled with thousands</TableCell>
            <TableCell>General </TableCell>
            <TableCell>Emperor</TableCell>
            <TableCell>Oscar statuettes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              These six sites, some of the world’s oldest [] buildings
            </TableCell>
            <TableCell>Euclidean </TableCell>
            <TableCell>Religious</TableCell>
            <TableCell>
              up to a hundred thousand people are kept in solitary confinement
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>wondrous []</TableCell>
            <TableCell>Cocoons </TableCell>
            <TableCell>Mastabas</TableCell>
            <TableCell>Trump wanted to build a wall</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>megalithic palaces on 100 islets of []</TableCell>
            <TableCell>Ecuador </TableCell>
            <TableCell>Micronesia</TableCell>
            <TableCell>Airbnb abuses</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>petroglyphs in a country [] of China</TableCell>
            <TableCell>Inside</TableCell>
            <TableCell>Northwest</TableCell>
            <TableCell>
              how low social mobility in the United States actually is
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              paintings of [] mammoths or sculptures of fish
            </TableCell>
            <TableCell>Nude</TableCell>
            <TableCell>Aurochs</TableCell>
            <TableCell>Facebook and Google monitor anyone</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>sculptures on [] Island</TableCell>
            <TableCell>Staten</TableCell>
            <TableCell>Easter</TableCell>
            <TableCell>
              founding fathers gave suffrage to only 6% of the population
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>vast monastery in []</TableCell>
            <TableCell>Tibet</TableCell>
            <TableCell>Naogaon</TableCell>
            <TableCell>address homelessness</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              recently destroyed most of this temple to a god who is part of a
              trinity with []
            </TableCell>
            <TableCell>Horus</TableCell>
            <TableCell>Aglibol</TableCell>
            <TableCell>concussions and overhydration</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Extraordinary circles [] of Banjul</TableCell>
            <TableCell>North </TableCell>
            <TableCell>Upstream</TableCell>
            <TableCell>immortality potions</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the capital of the kingdom that founded []</TableCell>
            <TableCell>Roanoke</TableCell>
            <TableCell>Dos Pilas</TableCell>
            <TableCell>wearing white and experiencing limerence</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        Here is the list of sites matching the descriptions, with wrong words,
        in west-to-east order. Some of these identifications are harder than
        others.
      </p>
      <p>
        Notes on identification: there are three sets of Jesuit missions that
        are UNESCO World Heritage Sites, but only one set has 2 missions; the
        others have 5 and 6. The{" "}
        <a
          href="https://musee-prehistoire-eyzies.fr/en/prehistoric-sites-valley-vezere"
          target="_blank"
          rel="noreferrer"
        >
          Vézère Valley
        </a>{" "}
        includes many examples of prehistoric cave art, including Lascaux, with
        paintings of aurochs; Les Combarelles, with paintings of mammoths; and
        l’Abri du Poisson, with a fish sculpture. In the 2010s, ISIL{" "}
        <a
          href="https://whc.unesco.org/en/news/2133/"
          target="_blank"
          rel="noreferrer"
        >
          destroyed
        </a>{" "}
        much of the Site of Palmyra.
      </p>
      <p>
        Solvers may be able to skip this intermediate step if they hit upon the
        correct final sort.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>site description</TableHeaderCell>
            <TableHeaderCell>wrong</TableHeaderCell>
            <TableHeaderCell>ruins</TableHeaderCell>
            <TableHeaderCell>N/S</TableHeaderCell>
            <TableHeaderCell>E/W</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>sculptures on Easter Island</TableCell>
            <TableCell>
              <strong>S</strong>taten
            </TableCell>
            <TableCell>Rapa Nui National Park</TableCell>
            <TableCell>-27.126</TableCell>
            <TableCell>-109.421</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              site famed for a pyramid whose name rhymes with itches
            </TableCell>
            <TableCell>
              <strong>O</strong>zer
            </TableCell>
            <TableCell>El Tajin, Pre-Hispanic City</TableCell>
            <TableCell>20.448</TableCell>
            <TableCell>-97.381</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              the capital of the kingdom that founded Dos Pilas
            </TableCell>
            <TableCell>
              <strong>R</strong>oanoke
            </TableCell>
            <TableCell>Tikal National Park</TableCell>
            <TableCell>17.224</TableCell>
            <TableCell>-89.633</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fantastic figures in the Peruvian desert</TableCell>
            <TableCell>
              <strong>T</strong>heater
            </TableCell>
            <TableCell>Lines and Geoglyphs of Nasca and Palpa</TableCell>
            <TableCell>-14.739</TableCell>
            <TableCell>-75.133</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              pair of missions built by the Society of Jesus
            </TableCell>
            <TableCell>
              <strong>O</strong>ttomans
            </TableCell>
            <TableCell>
              Jesuit Missions of La Santísima Trinidad de Paraná and Jesús de
              Tavarangue
            </TableCell>
            <TableCell>-27.132</TableCell>
            <TableCell>-55.707</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>extraordinary circles upstream of Banjul</TableCell>
            <TableCell>
              <strong>N</strong>orth
            </TableCell>
            <TableCell>Stone Circles of Senegambia</TableCell>
            <TableCell>13.692</TableCell>
            <TableCell>-14.876</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the “Scottish Pompeii“</TableCell>
            <TableCell>
              <strong>U</strong>tah
            </TableCell>
            <TableCell>Heart of Neolithic Orkney</TableCell>
            <TableCell>59.049</TableCell>
            <TableCell>-3.344</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              paintings of aurochs, mammoths, or sculptures of fish
            </TableCell>
            <TableCell>
              <strong>N</strong>ude
            </TableCell>
            <TableCell>
              Prehistoric Sites and Decorated Caves of the Vézère Valley
            </TableCell>
            <TableCell>45.054</TableCell>
            <TableCell>1.157</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              six sites, some of the world’s oldest religious buildings
            </TableCell>
            <TableCell>
              <strong>E</strong>uclidean
            </TableCell>
            <TableCell>Megalithic Temples of Malta</TableCell>
            <TableCell>36.049</TableCell>
            <TableCell>14.265</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>famed sanctuary at the center of the universe</TableCell>
            <TableCell>
              <strong>S</strong>tar
            </TableCell>
            <TableCell>Archaeological Site of Delphi</TableCell>
            <TableCell>38.481</TableCell>
            <TableCell>22.491</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>wondrous mastabas</TableCell>
            <TableCell>
              <strong>C</strong>ocoons
            </TableCell>
            <TableCell>
              Memphis and its Necropolis – the Pyramid Fields from Giza to
              Dahshur
            </TableCell>
            <TableCell>29.975</TableCell>
            <TableCell>31.135</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              colossal temples represent the peak of Imperial Roman architecture
            </TableCell>
            <TableCell>
              <strong>O</strong>rigami
            </TableCell>
            <TableCell>Baalbek</TableCell>
            <TableCell>34.006</TableCell>
            <TableCell>36.201</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              recently destroyed most of this temple to a god who is part of a
              trinity with Aglibol
            </TableCell>
            <TableCell>
              <strong>H</strong>orus
            </TableCell>
            <TableCell>Site of Palmyra</TableCell>
            <TableCell>34.569</TableCell>
            <TableCell>38.257</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              well-fortified city in Upper Mesopotamia once called the “House of
              God“
            </TableCell>
            <TableCell>
              <strong>E</strong>ssex
            </TableCell>
            <TableCell>Hatra</TableCell>
            <TableCell>35.574</TableCell>
            <TableCell>42.728</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              village north of Sur was visited by Marco Polo and Ibn Battuta
            </TableCell>
            <TableCell>
              <strong>R</strong>ajpur
            </TableCell>
            <TableCell>Ancient City of Qalhat</TableCell>
            <TableCell>22.696</TableCell>
            <TableCell>59.373</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>petroglyphs in a country northwest of China</TableCell>
            <TableCell>
              <strong>I</strong>nside
            </TableCell>
            <TableCell>
              Petroglyphs of the Archaeological Landscape of Tanbaly
            </TableCell>
            <TableCell>44.061</TableCell>
            <TableCell>76.994</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>vast monastery in Naogaon</TableCell>
            <TableCell>
              <strong>T</strong>ibet
            </TableCell>
            <TableCell>Ruins of the Buddhist Vihara at Paharpur</TableCell>
            <TableCell>25.031</TableCell>
            <TableCell>88.974</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ogival towers of ancient temples</TableCell>
            <TableCell>
              <strong>A</strong>ntenna
            </TableCell>
            <TableCell>Angkor</TableCell>
            <TableCell>13.439</TableCell>
            <TableCell>103.868</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              the tomb of the Emperor is filled with thousands
            </TableCell>
            <TableCell>
              <strong>G</strong>eneral
            </TableCell>
            <TableCell>Mausoleum of the First Qin Emperor</TableCell>
            <TableCell>34.384</TableCell>
            <TableCell>109.276</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              megalithic palaces on 100 islets of Micronesia
            </TableCell>
            <TableCell>
              <strong>E</strong>cuador
            </TableCell>
            <TableCell>
              Nan Madol: Ceremonial Centre of Eastern Micronesia
            </TableCell>
            <TableCell>6.845</TableCell>
            <TableCell>158.333</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        Here is the list of sites matching the descriptions, with links to the
        official UNESCO World Heritage Site pages.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>site description</TableHeaderCell>
            <TableHeaderCell>ruins</TableHeaderCell>
            <TableHeaderCell>UNESCO reference no.</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              recently destroyed most of this temple to a god who is part of a
              trinity with <strong>A</strong>glibol
            </TableCell>
            <TableCell>Site of Palmyra</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/23"
                target="_blank"
                rel="noreferrer"
              >
                23
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              the capital of the kingdom that founded <strong>D</strong>os Pilas
            </TableCell>
            <TableCell>Tikal National Park</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/64"
                target="_blank"
                rel="noreferrer"
              >
                64
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              paintings of <strong>A</strong>urochs, mammoths, or sculptures of
              fish
            </TableCell>
            <TableCell>
              Prehistoric Sites and Decorated Caves of the Vézère Valley
            </TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/85"
                target="_blank"
                rel="noreferrer"
              >
                85
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              wondrous <strong>M</strong>astabas
            </TableCell>
            <TableCell>
              Memphis and its Necropolis – the Pyramid Fields from Giza to
              Dahshur
            </TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/86"
                target="_blank"
                rel="noreferrer"
              >
                86
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              six sites, some of the world’s oldest <strong>R</strong>eligious
              buildings
            </TableCell>
            <TableCell>Megalithic Temples of Malta</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/132"
                target="_blank"
                rel="noreferrer"
              >
                132
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              well-fortified city in <strong>U</strong>pper Mesopotamia once
              called the “House of God“
            </TableCell>
            <TableCell>Hatra</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/277"
                target="_blank"
                rel="noreferrer"
              >
                277
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              colossal temples represent the peak of <strong>I</strong>mperial
              Roman architecture
            </TableCell>
            <TableCell>Baalbek</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/294"
                target="_blank"
                rel="noreferrer"
              >
                294
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              vast monastery in <strong>N</strong>aogaon
            </TableCell>
            <TableCell>Ruins of the Buddhist Vihara at Paharpur</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/322"
                target="_blank"
                rel="noreferrer"
              >
                322
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              famed <strong>S</strong>anctuary at the center of the universe
            </TableCell>
            <TableCell>Archaeological Site of Delphi</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/393"
                target="_blank"
                rel="noreferrer"
              >
                393
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              the tomb of the <strong>E</strong>mperor is filled with thousands
            </TableCell>
            <TableCell>Mausoleum of the First Qin Emperor</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/441"
                target="_blank"
                rel="noreferrer"
              >
                441
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              the “Scottish <strong>P</strong>ompeii“
            </TableCell>
            <TableCell>Heart of Neolithic Orkney</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/514"
                target="_blank"
                rel="noreferrer"
              >
                514
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              site famed for a pyramid whose name rhymes with <strong>I</strong>
              tches
            </TableCell>
            <TableCell>El Tajin, Pre-Hispanic City</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/631"
                target="_blank"
                rel="noreferrer"
              >
                631
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              pair of missions built by the <strong>S</strong>ociety of Jesus
            </TableCell>
            <TableCell>
              Jesuit Missions of La Santísima Trinidad de Paraná and Jesús de
              Tavarangue
            </TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/648"
                target="_blank"
                rel="noreferrer"
              >
                648
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>O</strong>gival towers of ancient temples
            </TableCell>
            <TableCell>Angkor</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/668"
                target="_blank"
                rel="noreferrer"
              >
                668
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              fantastic figures in the Peruvian <strong>D</strong>esert
            </TableCell>
            <TableCell>Lines and Geoglyphs of Nasca and Palpa</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/700"
                target="_blank"
                rel="noreferrer"
              >
                700
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              sculptures on <strong>E</strong>aster Island
            </TableCell>
            <TableCell>Rapa Nui National Park</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/715"
                target="_blank"
                rel="noreferrer"
              >
                715
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              petroglyphs in a country <strong>N</strong>orthwest of China
            </TableCell>
            <TableCell>
              Petroglyphs of the Archaeological Landscape of Tanbaly
            </TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/1145"
                target="_blank"
                rel="noreferrer"
              >
                1145
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              extraordinary circles <strong>U</strong>pstream of Banjul
            </TableCell>
            <TableCell>Stone Circles of Senegambia</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/1226"
                target="_blank"
                rel="noreferrer"
              >
                1226
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              megalithic palaces on 100 islets of <strong>M</strong>icronesia
            </TableCell>
            <TableCell>
              Nan Madol: Ceremonial Centre of Eastern Micronesia
            </TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/1503"
                target="_blank"
                rel="noreferrer"
              >
                1503
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              village north of <strong>S</strong>ur was visited by Marco Polo
              and Ibn Battuta
            </TableCell>
            <TableCell>Ancient City of Qalhat</TableCell>
            <TableCell>
              <a
                href="https://whc.unesco.org/en/list/1537"
                target="_blank"
                rel="noreferrer"
              >
                1537
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        <cite>Adam Ruins Everything</cite> clues (sorted by UNESCO World
        Heritage Site reference number), with links to the official episode
        references. (Note: <cite>Adam Ruins America</cite> is missing a
        reference page, but the clue given is mentioned in the episode’s brief
        description.)
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>episode clue</TableHeaderCell>
            <TableHeaderCell>episode</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>concussions and overhydration</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Football"
                target="_blank"
                rel="noreferrer"
              >
                Football
              </a>
            </TableCell>
            <TableCell>14</TableCell>
            <TableCell>N</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>wearing white and experiencing limerence</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Weddings"
                target="_blank"
                rel="noreferrer"
              >
                Weddings
              </a>
            </TableCell>
            <TableCell>15</TableCell>
            <TableCell>O</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Facebook and Google monitor anyone</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_the_Internet"
                target="_blank"
                rel="noreferrer"
              >
                the Internet
              </a>
            </TableCell>
            <TableCell>23</TableCell>
            <TableCell>W</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Trump wanted to build a wall</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Immigration"
                target="_blank"
                rel="noreferrer"
              >
                Immigration
              </a>
            </TableCell>
            <TableCell>18</TableCell>
            <TableCell>R</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              up to a hundred thousand people are kept in solitary confinement
            </TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Prison"
                target="_blank"
                rel="noreferrer"
              >
                Prison
              </a>
            </TableCell>
            <TableCell>21</TableCell>
            <TableCell>U</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mickey Mouse and Ms. Pac-Man</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Summer_Fun"
                target="_blank"
                rel="noreferrer"
              >
                Summer Fun
              </a>
            </TableCell>
            <TableCell>9</TableCell>
            <TableCell>I</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>séances and child abductions</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Halloween"
                target="_blank"
                rel="noreferrer"
              >
                Halloween
              </a>
            </TableCell>
            <TableCell>14</TableCell>
            <TableCell>N</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>address homelessness</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Housing"
                target="_blank"
                rel="noreferrer"
              >
                Housing
              </a>
            </TableCell>
            <TableCell>19</TableCell>
            <TableCell>S</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>experiments on mice</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Science"
                target="_blank"
                rel="noreferrer"
              >
                Science
              </a>
            </TableCell>
            <TableCell>15</TableCell>
            <TableCell>O</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Oscar statuettes</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Hollywood"
                target="_blank"
                rel="noreferrer"
              >
                Hollywood
              </a>
            </TableCell>
            <TableCell>13</TableCell>
            <TableCell>M</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>farmed salmon is dyed pink</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Restaurants"
                target="_blank"
                rel="noreferrer"
              >
                Restaurants
              </a>
            </TableCell>
            <TableCell>5</TableCell>
            <TableCell>E</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>cannabis was first cultivated 8000 years ago</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Drugs"
                target="_blank"
                rel="noreferrer"
              >
                Drugs
              </a>
            </TableCell>
            <TableCell>20</TableCell>
            <TableCell>T</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>deadly car crashes and graverobbing</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_a_Murder"
                target="_blank"
                rel="noreferrer"
              >
                A Murder
              </a>
            </TableCell>
            <TableCell>8</TableCell>
            <TableCell>H</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ticketmaster’s exorbitant fees</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Music"
                target="_blank"
                rel="noreferrer"
              >
                Music
              </a>
            </TableCell>
            <TableCell>9</TableCell>
            <TableCell>I</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the War of the Worlds and poisoned candy</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Halloween"
                target="_blank"
                rel="noreferrer"
              >
                Halloween
              </a>
            </TableCell>
            <TableCell>14</TableCell>
            <TableCell>N</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              founding fathers gave suffrage to only 6% of the population
            </TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Voting"
                target="_blank"
                rel="noreferrer"
              >
                Voting
              </a>
            </TableCell>
            <TableCell>7</TableCell>
            <TableCell>G</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              how low social mobility in the United States actually is
            </TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_America"
                target="_blank"
                rel="noreferrer"
              >
                America
              </a>
            </TableCell>
            <TableCell>5</TableCell>
            <TableCell>E</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>immortality potions</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Death"
                target="_blank"
                rel="noreferrer"
              >
                Death
              </a>
            </TableCell>
            <TableCell>12</TableCell>
            <TableCell>L</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Airbnb abuses</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Housing"
                target="_blank"
                rel="noreferrer"
              >
                Housing
              </a>
            </TableCell>
            <TableCell>19</TableCell>
            <TableCell>S</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>exhibitions were sponsored by the CIA</TableCell>
            <TableCell>
              <a
                href="https://adam-ruins-everything.fandom.com/wiki/Adam_Ruins_Art"
                target="_blank"
                rel="noreferrer"
              >
                Art
              </a>
            </TableCell>
            <TableCell>5</TableCell>
            <TableCell>E</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Solution;
