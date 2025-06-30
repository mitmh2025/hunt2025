import type { ParamsDictionary } from "express-serve-static-core";
import React from "react";
import { styled } from "styled-components";
import { Math, MI } from "../../components/MathML";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../../components/PageLayout";
import { deviceMax, sizeMax } from "../../utils/breakpoints";
import { type PageRenderer } from "../../utils/renderApp";

const Credits = styled.div`
  h2,
  h3 {
    text-align: center;
  }

  h2 {
    padding: 0;
    margin: 3rem auto 1rem auto;
    font-size: 1.75rem;
    display: table;
    white-space: nowrap;
    max-width: ${sizeMax.sm};
    width: 100%;

    &:before,
    &:after {
      border-top: 5px double var(--gold-800);
      content: "";
      display: table-cell;
      position: relative;
      top: calc(1rem + 3px);
      width: 45%;
    }
    &:before {
      right: 1.5%;
    }
    &:after {
      left: 1.5%;
    }
  }

  h3 {
    padding: 0;
    margin: 1rem 0 0.5rem 0;
  }

  dl {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  dd {
    margin: 0;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  dl.credits-large {
    dt {
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: 1.5rem;
    }
  }

  dl.credits-stack {
    text-align: center;

    dd {
      margin-bottom: 0.5rem;
    }
  }

  dl.credits-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    &.credits-compact {
      row-gap: 0.25rem;
    }

    &.credits-ultracompact {
      row-gap: 0;
    }

    dt {
      text-align: right;
    }
  }

  dl.credits-list {
    dt {
      text-align: center;
      font-size: 1.25rem;
      margin: 1rem 0 0.5rem 0;
      font-family: var(--headline-font);
    }

    dd ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      margin-bottom: 1rem;

      li {
        flex: 0 0 25%;
        text-align: center;

        @media ${deviceMax.md} {
          flex-basis: 33%;
        }

        @media ${deviceMax.sm} {
          flex-basis: 50%;
        }
      }
    }
  }

  .credits-blurb {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 1.5rem auto;
    font-style: italic;
  }
`;

const handler: PageRenderer<ParamsDictionary> = () => {
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Credits</PageTitle>
        </PageHeader>
        <PageMain>
          <p>
            <a href={`/2025/`}>← Back home</a>
          </p>

          <Credits>
            <h2>Executive Committee</h2>

            <dl className="credits-stack credits-large">
              <dt>Benevolent Dictator</dt>
              <dd>James Douberley</dd>

              <dt>Editors-in-Chief</dt>
              <dd>
                <ul>
                  <li>Robin Deits</li>
                  <li>Li-Mei Lim</li>
                  <li>Henry Wong</li>
                </ul>
              </dd>

              <dt>Head of Operations</dt>
              <dd>Michele Pratusevich</dd>

              <dt>Head of Experience</dt>
              <dd>Grant Elliott</dd>

              <dt>Heads of Tech</dt>
              <dd>
                <ul>
                  <li>Evan Broder</li>
                  <li>Drew Fisher</li>
                </ul>
              </dd>

              <dt>Deputy Head of Operations</dt>
              <dd>Molly Frey</dd>

              <dt>Deputy Head of Experience &amp; Liaison to Puzzles</dt>
              <dd>Erin Price</dd>
            </dl>

            <h2>Puzzles</h2>

            <dl className="credits-row">
              <dt>Editors-in-Chief</dt>
              <dd>
                <ul>
                  <li>Robin Deits</li>
                  <li>Li-Mei Lim</li>
                  <li>Henry Wong</li>
                </ul>
              </dd>

              <dt>Head of Testsolving</dt>
              <dd>Anisa Schardl</dd>

              <dt>Head of Factchecking</dt>
              <dd>Melanie Matchett Wood</dd>

              <dt>Stakeout Round Captain</dt>
              <dd>Hubert Hwang</dd>

              <dt>Lead Editors</dt>
              <dd>
                <ul>
                  <li>Anna Brunner</li>
                  <li>Nathan Fung</li>
                  <li>David Greenspan</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Jonathan Lay</li>
                  <li>Jesse Moeller</li>
                  <li>Julian West</li>
                  <li>Melanie Matchett Wood</li>
                </ul>
              </dd>

              <dt>MITropolis Press Corps</dt>
              <dd>
                <ul>
                  <li>Leland Aldridge</li>
                  <li>Steve Banzaert</li>
                  <li>Anna Brunner</li>
                  <li>Rebecca Chang</li>
                  <li>Robin Deits</li>
                  <li>James Douberley</li>
                  <li>Drew Fisher</li>
                  <li>Nathan Fung</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Li-Mei Lim</li>
                  <li>Jesse Moeller</li>
                  <li>Atul Shatavart Nadig</li>
                  <li>Erin Price</li>
                  <li>Arcturus Wang</li>
                  <li>Henry Wong</li>
                  <li>Melanie Matchett Wood</li>
                </ul>
              </dd>
            </dl>

            <dl className="credits-list">
              <dt>Editors</dt>
              <dd>
                <ul>
                  <li>Leland Aldridge</li>
                  <li>J. Heléne Andersson</li>
                  <li>Steve Banzaert</li>
                  <li>Matt Behlmann</li>
                  <li>Elan Blaustein</li>
                  <li>Evan Broder</li>
                  <li>Anna Brunner</li>
                  <li>Alex Churchill</li>
                  <li>Mike Crawford</li>
                  <li>Sid Creutz</li>
                  <li>Will Day</li>
                  <li>Robin Deits</li>
                  <li>James Douberley</li>
                  <li>Cyrus Eyster</li>
                  <li>Joel Fried</li>
                  <li>Nathan Fung</li>
                  <li>Chris Gatesman</li>
                  <li>Amanda Giermann</li>
                  <li>Wesley Graybill</li>
                  <li>David Greenspan</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Tanya Khovanova</li>
                  <li>Jonathan Lay</li>
                  <li>Li-Mei Lim</li>
                  <li>Teddy McArthur</li>
                  <li>Jesse Moeller</li>
                  <li>Joanna Murray</li>
                  <li>Laura Nicholson</li>
                  <li>Michele Pratusevich</li>
                  <li>Erin Price</li>
                  <li>Chris Pringle</li>
                  <li>tinaun</li>
                  <li>Arcturus Wang</li>
                  <li>Julian West</li>
                  <li>Henry Wong</li>
                  <li>Melanie Matchett Wood</li>
                  <li>Rad Z</li>
                </ul>
              </dd>

              <dt>Factcheckers</dt>
              <dd>
                <ul>
                  <li>Simone Agha</li>
                  <li>Leland Aldridge</li>
                  <li>J. Heléne Andersson</li>
                  <li>Mark Asdoorian</li>
                  <li>Steve Banzaert</li>
                  <li>Jeremy Braun</li>
                  <li>Anna Brunner</li>
                  <li>Joseph Timothy Foley</li>
                  <li>Nathan Fung</li>
                  <li>Amanda Giermann</li>
                  <li>James Harvey</li>
                  <li>Li-Mei Lim</li>
                  <li>Chris Lyon</li>
                  <li>Mike Mannis</li>
                  <li>Teddy McArthur</li>
                  <li>mona</li>
                  <li>Nine Morch</li>
                  <li>Atul Shatavart Nadig</li>
                  <li>Erin Price</li>
                  <li>Bahman Rabii</li>
                  <li>rfong</li>
                  <li>Anisa Schardl</li>
                  <li>Alex St Claire</li>
                  <li>John Toomey</li>
                  <li>Henry Wong</li>
                  <li>Melanie Matchett Wood</li>
                </ul>
              </dd>

              <dt>Authors and Testsolvers</dt>
              <dd>
                <ul>
                  <li>Simone Agha</li>
                  <li>Leland Aldridge</li>
                  <li>Kat Allen</li>
                  <li>David Anderson</li>
                  <li>J. Heléne Andersson</li>
                  <li>Mark Asdoorian</li>
                  <li>Denis Auroux</li>
                  <li>Steve Banzaert</li>
                  <li>Matt Behlmann</li>
                  <li>Kirsti Biggs</li>
                  <li>Elan Blaustein</li>
                  <li>dRachel Bowens-Rubin</li>
                  <li>Nathaniel Boyer</li>
                  <li>Jeremy Braun</li>
                  <li>Aaron Broder</li>
                  <li>Austin Broder</li>
                  <li>Eric Broder</li>
                  <li>Evan Broder</li>
                  <li>Sue Broder</li>
                  <li>Anna Brunner</li>
                  <li>Becca Chang</li>
                  <li>Joanna Cheng</li>
                  <li>Alex Churchill</li>
                  <li>Tom Cochrane</li>
                  <li>Dan Collins</li>
                  <li>Jeremy Conrad</li>
                  <li>Ross Corliss</li>
                  <li>Sid Creutz</li>
                  <li>Dalton Daniel</li>
                  <li>Will Day</li>
                  <li>Robin Deits</li>
                  <li>James Douberley</li>
                  <li>Sam Duffley</li>
                  <li>Caroline Elliott</li>
                  <li>Grant Elliott</li>
                  <li>Rebecca Engelke</li>
                  <li>Zachary Eucker</li>
                  <li>Cyrus Eyster</li>
                  <li>Alex Fernandes</li>
                  <li>Drew Fisher</li>
                  <li>Brie Frame</li>
                  <li>Sam Freilich</li>
                  <li>Molly Frey</li>
                  <li>Joel Fried</li>
                  <li>Keri Ashton Fullwood</li>
                  <li>Nathan Fung</li>
                  <li>Chris Gatesman</li>
                  <li>Mark Gatesman</li>
                  <li>Kelly Gatesman</li>
                  <li>Nicholas Georgiou</li>
                  <li>Amanda Giermann</li>
                  <li>Wesley Graybill</li>
                  <li>David Greenspan</li>
                  <li>Eric Haines</li>
                  <li>Kate Hart</li>
                  <li>James Harvey</li>
                  <li>Ben Haytack</li>
                  <li>Madeline Hickman</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Brad Johnson</li>
                  <li>Hits Jones</li>
                  <li>Emilie Josephs</li>
                  <li>Steven Keyes</li>
                  <li>Tanya Khovanova</li>
                  <li>Jess Knapp</li>
                  <li>Jonathan Lay</li>
                  <li>Emilia Lazer-Walker</li>
                  <li>Mark Leach</li>
                  <li>Sarah Leadbeater</li>
                  <li>Li-Mei Lim</li>
                  <li>Laina Lomina</li>
                  <li>Rachel Lord</li>
                  <li>Peter Lorenz</li>
                  <li>Genie Luzwick</li>
                  <li>Chris Lyon</li>
                  <li>Mike Mannis</li>
                  <li>Eric Marion</li>
                  <li>Teddy McArthur</li>
                  <li>Jesse Moeller</li>
                  <li>Nine Morch</li>
                  <li>Stephanie Murray</li>
                  <li>Joanna Murray</li>
                  <li>Robert “Fro” Myers</li>
                  <li>Atul Shatavart Nadig</li>
                  <li>Laura Nicholson</li>
                  <li>John O’Brien</li>
                  <li>Liz Oppenheim</li>
                  <li>Baltazar Ortiz</li>
                  <li>Dan Pappas</li>
                  <li>phyphor</li>
                  <li>Kawika Pierson</li>
                  <li>Chris Post</li>
                  <li>Michele Pratusevich</li>
                  <li>Erin Price</li>
                  <li>Chris Pringle</li>
                  <li>Bahman Rabii</li>
                  <li>Tom Rackham</li>
                  <li>rfong</li>
                  <li>Miriam Rittenberg</li>
                  <li>Michelle Rosen</li>
                  <li>Chris Roske</li>
                  <li>Andrew Russell</li>
                  <li>Dee Ruttenberg</li>
                  <li>Matt Scanlan</li>
                  <li>Anisa Schardl</li>
                  <li>Liz Schell</li>
                  <li>Ariel Schwartz</li>
                  <li>Fuzzy Shonaldmann</li>
                  <li>Ollie Shonaldmann</li>
                  <li>John Silvio</li>
                  <li>Kevin Simmons</li>
                  <li>Quentin Smith</li>
                  <li>Jason Sproul</li>
                  <li>Alex St Claire</li>
                  <li>Richard Tibbetts</li>
                  <li>Aletta Tibbetts</li>
                  <li>tinaun</li>
                  <li>Karen Rustad Tolva</li>
                  <li>John Toomey</li>
                  <li>EmFay Urban</li>
                  <li>Stratton Vakirtzis</li>
                  <li>Steven Vanderveer</li>
                  <li>Jennifer Wang</li>
                  <li>Helena Wang</li>
                  <li>Arcturus Wang</li>
                  <li>Julian West</li>
                  <li>Max Wolf</li>
                  <li>Henry Wong</li>
                  <li>Melanie Matchett Wood</li>
                  <li>Rad Z</li>
                </ul>
              </dd>
            </dl>

            <h2>Experience</h2>

            <dl className="credits-row">
              <dt>Head of Experience</dt>
              <dd>Grant Elliott</dd>

              <dt>Deputy Head of Experience &amp; Liaison to Puzzles</dt>
              <dd>Erin Price</dd>

              <dt>Event Leads</dt>
              <dd>
                <ul>
                  <li>Leland Aldridge</li>
                  <li>Wesley Graybill</li>
                </ul>
              </dd>
            </dl>

            <h3>Art</h3>

            <dl className="credits-row credits-compact">
              <dt>Art Lead</dt>
              <dd>Simone Agha</dd>

              <dt>Additional Artists</dt>
              <dd>
                <ul>
                  <li>Anna Brunner</li>
                  <li>Becca Chang</li>
                  <li>Rebecca Engelke</li>
                  <li>Keri Ashton Fullwood</li>
                  <li>Gareth Hinds</li>
                  <li>Sarah Leadbeater</li>
                  <li>Li-Mei Lim</li>
                  <li>Nine Morch</li>
                  <li>rfong</li>
                  <li>tinaun</li>
                  <li>Karen Rustad Tolva</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>

              <dt>Web Design Lead</dt>
              <dd>Karen Rustad Tolva</dd>

              <dt>Pin Design</dt>
              <dd>
                <ul>
                  <li>Simone Agha</li>
                  <li>Karen Rustad Tolva</li>
                </ul>
              </dd>

              <dt>T-shirt Design</dt>
              <dd>Karen Rustad Tolva</dd>

              <dt>Coin Design</dt>
              <dd>Gareth Hinds</dd>
            </dl>

            <dl className="credits-row credits-ultracompact">
              <dt>Hub Page Design</dt>
              <dd>Simone Agha</dd>

              <dt>Hub Page Character Portraits</dt>
              <dd>Nine Morch</dd>

              <dt>Additional Hub Page Art</dt>
              <dd>
                <ul>
                  <li>Rebecca Engelke</li>
                  <li>Karen Rustad Tolva</li>
                  <li>Nine Morch</li>
                </ul>
              </dd>

              <dt>Corkboard Texture</dt>
              <dd>
                <a href="https://www.tilingtextures.com/light-cork-board/">
                  Tiling Textures
                </a>
              </dd>
            </dl>

            <dl className="credits-row credits-ultracompact">
              <dt>Interview at the Art Gallery</dt>
              <dd>Nine Morch</dd>

              <dt>Interview at the Casino</dt>
              <dd>Nine Morch</dd>

              <dt>Interview at the Jewelry Store</dt>
              <dd>Keri Ashton Fullwood</dd>

              <dt>Interview at the Boardwalk</dt>
              <dd>Karen Rustad Tolva</dd>
            </dl>

            <div className="credits-blurb">
              Special thanks to Lucid Clairvoyant of the Providence Crime
              Syndication for allowing use of their art from the MIT Mystery
              Heist.
            </div>

            <h3>Productions</h3>

            <dl className="credits-row credits-compact">
              <dt>Productions Lead</dt>
              <dd>J. Heléne Andersson</dd>

              <dt>Story Lead</dt>
              <dd>Caroline Elliott</dd>

              <dt>Scripts Lead</dt>
              <dd>John Silvio</dd>

              <dt>Additional Writers</dt>
              <dd>
                <ul>
                  <li>Simone Agha</li>
                  <li>Kat Allen</li>
                  <li>Brad Johnson</li>
                  <li>Jess Knapp</li>
                  <li>Teddy McArthur</li>
                  <li>Karen Rustad Tolva</li>
                </ul>
              </dd>

              <dt>Cinematographer</dt>
              <dd>Quentin Smith</dd>

              <dt>Voiceover Director</dt>
              <dd>Tucker Elliott</dd>

              <dt>Video Editors</dt>
              <dd>
                <ul>
                  <li>David Greenspan</li>
                  <li>Chris Pentacoff</li>
                  <li>rfong</li>
                </ul>
              </dd>

              <dt>Sets and Props Leads</dt>
              <dd>
                <ul>
                  <li>Brie Frame</li>
                  <li>Emilie Josephs</li>
                  <li>Sarah Leadbeater</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>

              <dt>Fabrication Coordinator</dt>
              <dd>Arcturus Wang</dd>

              <dt>Build Team</dt>
              <dd>
                <ul>
                  <li>dRachel Bowens-Rubin</li>
                  <li>Steve Banzaert</li>
                  <li>Sid Creutz</li>
                  <li>Sam Duffley</li>
                  <li>Mitch Fredrick</li>
                  <li>Fabiola Hernandez</li>
                  <li>Madeline Hickman</li>
                  <li>Kevin Hwang</li>
                  <li>Jesse Moeller</li>
                  <li>Robert “Fro” Myers</li>
                  <li>Chris Pentacoff</li>
                  <li>Arthur Petron</li>
                  <li>Chris Post</li>
                  <li>Kendra Pugh</li>
                  <li>rfong</li>
                  <li>Chris Roske</li>
                  <li>Will Vahle</li>
                </ul>
              </dd>

              <dt>Costumes Lead</dt>
              <dd>Sue Broder</dd>

              <dt>Additional Costumers</dt>
              <dd>
                <ul>
                  <li>J. Heléne Andersson</li>
                  <li>Nicole Berdy</li>
                  <li>Keri Ashton Fullwood</li>
                  <li>Emilie Josephs </li>
                  <li>Anisa Schardl</li>
                  <li>Liz Schell</li>
                </ul>
              </dd>

              <dt>Composers</dt>
              <dd>
                <ul>
                  <li>Denis Auroux</li>
                  <li>Karen Tingley</li>
                  <li>Kat Allen</li>
                </ul>
              </dd>

              <dt>Musicians</dt>
              <dd>Steve Banzaert</dd>

              <dt>Stage Managers</dt>
              <dd>
                <ul>
                  <li>J. Heléne Andersson</li>
                  <li>Emilie Josephs</li>
                </ul>
              </dd>
            </dl>

            <h3>Cast</h3>

            <dl className="credits-row credits-compact">
              <dt>Billie O’Ryan</dt>
              <dd>
                <ul>
                  <li>Hubert Hwang</li>
                  <li>Ross Corliss</li>
                  <li>Alex Fernandes</li>
                </ul>
              </dd>

              <dt>Robert “Papa” Finster</dt>
              <dd>
                <ul>
                  <li>Teddy McArthur</li>
                  <li>Max Wolf</li>
                </ul>
              </dd>

              <dt>Teresa “Baby” Finster</dt>
              <dd>
                <ul>
                  <li>Jess Knapp</li>
                  <li>Simone Agha</li>
                  <li>Anisa Schardl</li>
                </ul>
              </dd>

              <dt>Katrina Jay</dt>
              <dd>
                <ul>
                  <li>Nine Morch</li>
                  <li>Laura Corliss</li>
                </ul>
              </dd>

              <dt>Gladys Finster</dt>
              <dd>
                <ul>
                  <li>Erin Price</li>
                  <li>Joanna Murray</li>
                </ul>
              </dd>

              <dt>Ferdinand Carter</dt>
              <dd>
                <ul>
                  <li>tinaun</li>
                  <li>Brad Johnson</li>
                </ul>
              </dd>

              <dt>Roy “Rover” Canoso</dt>
              <dd>
                <ul>
                  <li>Joel Fried</li>
                  <li>Molly Frey</li>
                </ul>
              </dd>

              <dt>Colt Sidecar</dt>
              <dd>Atul Shatavart Nadig</dd>

              <dt>James Bluebook</dt>
              <dd>James Douberley</dd>

              <dt>Heckler</dt>
              <dd>John Silvio</dd>

              <dt>Docents</dt>
              <dd>
                <ul>
                  <li>Caroline Elliott</li>
                  <li>Grant Elliott</li>
                  <li>Emilie Josephs</li>
                  <li>John Toomey</li>
                </ul>
              </dd>

              <dt>Ms. Terry Hunter the Radio Host</dt>
              <dd>Kat Allen</dd>

              <dt>Roger the Sailor</dt>
              <dd>Elan Blaustein</dd>

              <dt>Arcade Owner</dt>
              <dd>Molly Frey</dd>

              <dt>Judith Calvert the Gallery Owner</dt>
              <dd>Karen Rustad Tolva</dd>

              <dt>Micah Flint the Gemcutter</dt>
              <dd>Andrew Russell</dd>

              <dt>Card Sharks</dt>
              <dd>
                <ul>
                  <li>Alex Churchill</li>
                  <li>Molly Frey</li>
                </ul>
              </dd>
            </dl>

            <h2>Operations</h2>

            <dl className="credits-row">
              <dt>Head of Operations</dt>
              <dd>Michele Pratusevich</dd>
            </dl>

            <dl className="credits-row">
              <dt>Deputies Ops</dt>
              <dd>
                <ul>
                  <li>Molly Frey</li>
                  <li>Sarah Leadbeater</li>
                  <li>Laura Nicholson</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>

              <dt>HQ Boss</dt>
              <dd>
                <ul>
                  <li>Nicole Berdy</li>
                  <li>Laura Nicholson</li>
                  <li>Michele Pratusevich</li>
                </ul>
              </dd>

              <dt>Gala Boss</dt>
              <dd>
                <ul>
                  <li>Sarah Leadbeater</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>
            </dl>

            <dl className="credits-row credits-compact">
              <dt>Interactive Puzzle Dispatch</dt>
              <dd>
                <ul>
                  <li>Nicole Berdy</li>
                  <li>Kate Hart</li>
                  <li>Joanna Murray</li>
                </ul>
              </dd>

              <dt>Set Logistics Crew</dt>
              <dd>
                <ul>
                  <li>Steve Banzaert</li>
                  <li>dRachel Bowens-Rubin</li>
                  <li>Sid Creutz</li>
                  <li>Sam Duffley</li>
                  <li>Brie Frame</li>
                  <li>Mitch Fredrick</li>
                  <li>Fabiola Hernandez</li>
                  <li>Madeline Hickman</li>
                  <li>Kevin Hwang</li>
                  <li>Sarah Leadbeater</li>
                  <li>Jesse Moeller</li>
                  <li>Chris Pentacoff</li>
                  <li>Arthur Petron</li>
                  <li>Chris Post</li>
                  <li>Kendra Pugh</li>
                  <li>rfong </li>
                  <li>Chris Roske</li>
                  <li>Quentin Smith</li>
                  <li>Jason Sproul</li>
                  <li>Will Vahle</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>

              <dt>Interactive Puzzle Operator Leads</dt>
              <dd>
                <ul>
                  <li>Steve Banzaert</li>
                  <li>Sam Duffley</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Robert “Fro” Myers</li>
                  <li>Ollie Shonaldmann</li>
                  <li>Jennifer Wang</li>
                </ul>
              </dd>
            </dl>

            <dl className="credits-list">
              <dt>Interactive Puzzle Operators</dt>
              <dd>
                <ul>
                  <li>Kat Allen</li>
                  <li>Heidi Ashih</li>
                  <li>Denis Auroux</li>
                  <li>Steve Banzaert</li>
                  <li>Elan Blaustein</li>
                  <li>Carles Boix</li>
                  <li>dRachel Bowens-Rubin</li>
                  <li>Jeremy Braun</li>
                  <li>Joanna Cheng</li>
                  <li>Dan Collins</li>
                  <li>Jeremy Conrad</li>
                  <li>Sid Creutz</li>
                  <li>Sam Duffley</li>
                  <li>Rebecca Engelke</li>
                  <li>Alex Fernandes</li>
                  <li>Keri Ashton Fullwood</li>
                  <li>Amanda Giermann</li>
                  <li>Wesley Graybill</li>
                  <li>Jeff Grove</li>
                  <li>Eric Haines</li>
                  <li>Kate Hart</li>
                  <li>James Harvey</li>
                  <li>Ben Haytack</li>
                  <li>Fabiola Hernandez</li>
                  <li>Madeline Hickman</li>
                  <li>Casey Holman</li>
                  <li>Josh Howe</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Brad Johnson</li>
                  <li>Steven Keyes</li>
                  <li>Tanya Khovanova</li>
                  <li>Jess Knapp</li>
                  <li>Mark Leach</li>
                  <li>Laina Lomina</li>
                  <li>Genie Luzwick</li>
                  <li>Chris Lyon</li>
                  <li>Eric Marion</li>
                  <li>Joanna Murray</li>
                  <li>Robert “Fro” Myers</li>
                  <li>Lex Nemzer</li>
                  <li>Laura Nicholson</li>
                  <li>Dan Pappas</li>
                  <li>Chris Pentacoff</li>
                  <li>Arthur Petron</li>
                  <li>Chris Post</li>
                  <li>Kendra Pugh</li>
                  <li>rfong</li>
                  <li>Miriam Rittenberg</li>
                  <li>Chris Roske</li>
                  <li>Angela Rupinen</li>
                  <li>Andrew Russell</li>
                  <li>Dee Ruttenberg</li>
                  <li>Michael Scarito</li>
                  <li>Anisa Schardl</li>
                  <li>Ariel Schwartz</li>
                  <li>“Curly” Ben Sena</li>
                  <li>Atul Shatavart Nadig</li>
                  <li>Jess Sheehan</li>
                  <li>Ollie Shonaldmann</li>
                  <li>Quentin Smith</li>
                  <li>Jason Sproul</li>
                  <li>Gita Srivastava</li>
                  <li>Aletta Tibbetts</li>
                  <li>Richard Tibbetts</li>
                  <li>Karen Rustad Tolva</li>
                  <li>John Toomey</li>
                  <li>Helena Wang</li>
                  <li>Jennifer Wang</li>
                  <li>Phil Webster</li>
                  <li>Max Wolf</li>
                </ul>
              </dd>

              <dt>Bartenders</dt>
              <dd>
                <ul>
                  <li>Simone Agha</li>
                  <li>Leland Aldridge</li>
                  <li>Kat Allen</li>
                  <li>David Anderson</li>
                  <li>J. Heléne Andersson</li>
                  <li>Heidi Ashih</li>
                  <li>Denis Auroux</li>
                  <li>Steve Banzaert</li>
                  <li>Elan Blaustein</li>
                  <li>Carles Boix</li>
                  <li>dRachel Bowens-Rubin</li>
                  <li>Jeremy Braun</li>
                  <li>Eric Broder</li>
                  <li>Evan Broder</li>
                  <li>Sue Broder</li>
                  <li>Anna Brunner</li>
                  <li>Rebecca Chang</li>
                  <li>Joanna Cheng</li>
                  <li>Dan Collins</li>
                  <li>Jeremy Conrad</li>
                  <li>Laura Corliss</li>
                  <li>Ross Corliss</li>
                  <li>Caroline Elliott</li>
                  <li>Grant Elliott</li>
                  <li>Rebecca Engelke</li>
                  <li>Alex Fernandes</li>
                  <li>Drew Fisher</li>
                  <li>Joel Fried</li>
                  <li>Keri Ashton Fullwood</li>
                  <li>Amanda Giermann</li>
                  <li>Wesley Graybill</li>
                  <li>Jeff Grove</li>
                  <li>Eric Haines</li>
                  <li>Kate Hart</li>
                  <li>James Harvey</li>
                  <li>Ben Haytack</li>
                  <li>Fabiola Hernandez</li>
                  <li>Casey Holman</li>
                  <li>Josh Howe</li>
                  <li>Brad Johnson</li>
                  <li>Steven Keyes</li>
                  <li>Jess Knapp</li>
                  <li>Mark Leach</li>
                  <li>Sarah Leadbeater</li>
                  <li>Laina Lomina</li>
                  <li>Genie Luzwick</li>
                  <li>Chris Lyon</li>
                  <li>Eric Marion</li>
                  <li>Teddy McArthur</li>
                  <li>Jesse Moeller</li>
                  <li>Nine Morch</li>
                  <li>Joanna Murray</li>
                  <li>Lex Nemzer</li>
                  <li>Laura Nicholson</li>
                  <li>Dan Pappas</li>
                  <li>Arthur Petron</li>
                  <li>Erin Price</li>
                  <li>Kendra Pugh</li>
                  <li>rfong </li>
                  <li>Chris Roske</li>
                  <li>Angela Rupinen</li>
                  <li>Andrew Russell</li>
                  <li>Dee Ruttenberg</li>
                  <li>Michael Scarito</li>
                  <li>Anisa Schardl</li>
                  <li>Ariel Schwartz</li>
                  <li>“Curly” Ben Sena</li>
                  <li>Atul Shatavart Nadig</li>
                  <li>Jess Sheehan</li>
                  <li>Fuzzy Shonaldmann</li>
                  <li>Ollie Shonaldmann</li>
                  <li>Quentin Smith</li>
                  <li>Jason Sproul</li>
                  <li>Gita Srivastava</li>
                  <li>Aletta Tibbetts</li>
                  <li>Richard Tibbetts</li>
                  <li>Karen Rustad Tolva</li>
                  <li>John Toomey</li>
                  <li>EmFay Urban</li>
                  <li>Arcturus Wang</li>
                  <li>Helena Wang</li>
                  <li>Phil Webster</li>
                  <li>Max Wolf</li>
                  <li>Melanie Matchett Wood</li>
                </ul>
              </dd>

              <dt>Weekend Warriors</dt>
              <dd>
                <ul>
                  <li>Simone Agha</li>
                  <li>Leland Aldridge</li>
                  <li>Kat Allen</li>
                  <li>David Anderson</li>
                  <li>J. Heléne Andersson</li>
                  <li>Mark Asdoorian</li>
                  <li>Heidi Ashih</li>
                  <li>Denis Auroux</li>
                  <li>Steve Banzaert</li>
                  <li>Nicole Berdy</li>
                  <li>Elan Blaustein</li>
                  <li>Carles Boix</li>
                  <li>dRachel Bowens-Rubin</li>
                  <li>Jeremy Braun</li>
                  <li>Eric Broder</li>
                  <li>Evan Broder</li>
                  <li>Sue Broder</li>
                  <li>Anna Brunner</li>
                  <li>Rebecca Chang</li>
                  <li>Joanna Cheng</li>
                  <li>Dan Collins</li>
                  <li>Jeremy Conrad</li>
                  <li>Laura Corliss</li>
                  <li>Ross Corliss</li>
                  <li>Sid Creutz</li>
                  <li>Robin Deits</li>
                  <li>James Douberley</li>
                  <li>Sam Duffley</li>
                  <li>Caroline Elliott</li>
                  <li>Grant Elliott</li>
                  <li>Rebecca Engelke</li>
                  <li>Cyrus Eyster</li>
                  <li>Alex Fernandes</li>
                  <li>Drew Fisher</li>
                  <li>Brie Frame</li>
                  <li>Sam Freilich</li>
                  <li>Molly Frey</li>
                  <li>Joel Fried</li>
                  <li>Keri Ashton Fullwood</li>
                  <li>Nathan Fung</li>
                  <li>Amanda Giermann</li>
                  <li>Wesley Graybill</li>
                  <li>David Greenspan</li>
                  <li>Jeff Grove</li>
                  <li>Eric Haines</li>
                  <li>Kate Hart</li>
                  <li>James Harvey</li>
                  <li>Ben Haytack</li>
                  <li>Fabiola Hernandez</li>
                  <li>Madeline Hickman</li>
                  <li>Casey Holman</li>
                  <li>Josh Howe</li>
                  <li>Hubert Hwang</li>
                  <li>Kevin Hwang</li>
                  <li>Brad Johnson</li>
                  <li>Emilie Josephs</li>
                  <li>Steven Keyes</li>
                  <li>Tanya Khovanova</li>
                  <li>Jess Knapp</li>
                  <li>Mark Leach</li>
                  <li>Sarah Leadbeater</li>
                  <li>Li-Mei Lim</li>
                  <li>Fenny Lin</li>
                  <li>Laina Lomina</li>
                  <li>Genie Luzwick</li>
                  <li>Chris Lyon</li>
                  <li>Eric Marion</li>
                  <li>Teddy McArthur</li>
                  <li>Jesse Moeller</li>
                  <li>Nine Morch</li>
                  <li>Joanna Murray</li>
                  <li>Robert “Fro” Myers</li>
                  <li>Lex Nemzer</li>
                  <li>Laura Nicholson</li>
                  <li>Dan Pappas</li>
                  <li>Chris Pentacoff</li>
                  <li>Arthur Petron</li>
                  <li>Chris Post</li>
                  <li>Michele Pratusevich</li>
                  <li>Erin Price</li>
                  <li>Kendra Pugh</li>
                  <li>rfong</li>
                  <li>Miriam Rittenberg</li>
                  <li>Chris Roske</li>
                  <li>Angela Rupinen</li>
                  <li>Andrew Russell</li>
                  <li>Dee Ruttenberg</li>
                  <li>Michael Scarito</li>
                  <li>Anisa Schardl</li>
                  <li>Ariel Schwartz</li>
                  <li>“Curly” Ben Sena</li>
                  <li>Atul Shatavart Nadig</li>
                  <li>Jess Sheehan</li>
                  <li>Fuzzy Shonaldmann</li>
                  <li>Ollie Shonaldmann</li>
                  <li>John Silvio</li>
                  <li>Quentin Smith</li>
                  <li>Jason Sproul</li>
                  <li>Gita Srivastava</li>
                  <li>Aletta Tibbetts</li>
                  <li>Richard Tibbetts</li>
                  <li>tinaun</li>
                  <li>Karen Rustad Tolva</li>
                  <li>John Toomey</li>
                  <li>EmFay Urban</li>
                  <li>Will Vahle</li>
                  <li>Arcturus Wang</li>
                  <li>Helena Wang</li>
                  <li>Jennifer Wang</li>
                  <li>Phil Webster</li>
                  <li>Max Wolf</li>
                  <li>Henry Wong</li>
                  <li>Melanie Matchett Wood</li>
                </ul>
              </dd>
            </dl>

            <dl className="credits-row">
              <dt>Puzzle Club Logistics</dt>
              <dd>
                <ul>
                  <li>Rebecca Chang</li>
                  <li>Atul Shatavart Nadig</li>
                </ul>
              </dd>

              <dt>Puzzle Club Treasurer</dt>
              <dd>Rachel Ai</dd>

              <dt>Puzzle Club Outreach</dt>
              <dd>Ella Sheffield</dd>

              <dt>Historical Wisdom Givers</dt>
              <dd>
                <ul>
                  <li>John Bromels</li>
                  <li>CJ Quines</li>
                </ul>
              </dd>
            </dl>

            <div className="credits-blurb">
              Thanks to Steve Ewing of Stand Inside Media who joined us all
              weekend as archival videographer.
            </div>

            <h2>Tech</h2>

            <dl className="credits-row">
              <dt>Heads of Tech</dt>
              <dd>
                <ul>
                  <li>Evan Broder</li>
                  <li>Drew Fisher</li>
                </ul>
              </dd>
            </dl>

            <dl className="credits-row credits-compact">
              <dt>Site Lead</dt>
              <dd>Drew Fisher</dd>

              <dt>Infrastructure Lead</dt>
              <dd>Quentin Smith</dd>

              <dt>Flex Lead</dt>
              <dd>Fuzzy Shonaldmann</dd>

              <dt>Puzzle Tech Lead</dt>
              <dd>James Harvey</dd>

              <dt>Archive Lead</dt>
              <dd>Evan Broder</dd>
            </dl>
            <h3>Radio</h3>
            <dl className="credits-row credits-compact">
              <dt>Radio Lead</dt>
              <dd>Evan Broder</dd>

              <dt>Radio Team</dt>
              <dd>
                <ul>
                  <li>Steve Banzaert</li>
                  <li>Sarah Leadbeater</li>
                  <li>Quentin Smith</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>

              <dt>Radio Assembly Team</dt>
              <dd>
                <ul>
                  <li>J. Heléne Andersson</li>
                  <li>Steve Banzaert</li>
                  <li>Evan Broder</li>
                  <li>Sue Broder</li>
                  <li>Anna Brunner</li>
                  <li>James Douberley</li>
                  <li>Brie Frame</li>
                  <li>Emilie Josephs</li>
                  <li>Steven Keyes</li>
                  <li>Sarah Leadbeater</li>
                  <li>Li-Mei Lim</li>
                  <li>Jesse Moeller</li>
                  <li>Robert “Fro” Myers</li>
                  <li>Chris Post</li>
                  <li>Michele Pratusevich</li>
                  <li>Erin Price</li>
                  <li>rfong</li>
                  <li>Quentin Smith</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>
            </dl>
            <h3>Typesetting</h3>
            <dl className="credits-row credits-compact">
              <dt>Lead Typesetter</dt>
              <dd>Ariel Schwartz</dd>

              <dt>Typesetters</dt>
              <dd>
                <ul>
                  <li>Evan Broder</li>
                  <li>Mike Crawford</li>
                  <li>Drew Fisher</li>
                  <li>James Harvey</li>
                  <li>Hubert Hwang</li>
                  <li>Michele Pratusevich</li>
                  <li>Fuzzy Shonaldmann</li>
                  <li>Quentin Smith</li>
                  <li>Arcturus Wang</li>
                </ul>
              </dd>
            </dl>

            <h2 id="radio-music">Radio Music</h2>

            <p>
              The{" "}
              <Math>
                <MI>2π</MI>
              </Math>{" "}
              radio broadcast during Mystery Hunt featured the following music:
            </p>

            <ul>
              <li>
                <a href="https://freemusicarchive.org/music/aldus-x/single/chroma/">
                  Chroma
                </a>{" "}
                by Aldus-X, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/beat-mekanik/single/good-ol-days-2024-remaster/">
                  Good Ol Days - 2024 Remaster
                </a>{" "}
                by Beat Mekanik, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/beat-mekanik/single/the-urban-gentry/">
                  The Urban Gentry
                </a>{" "}
                by Beat Mekanik, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Benny_Golbin/single/Blues_for_Oliver/">
                  Blues for Oliver
                </a>{" "}
                by Benny Golbin, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/Grey_Grey_Joe/">
                  Grey Grey Joe
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/Laser_Focus/">
                  Laser Focus
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/Pacing_1670/">
                  Pacing
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/Spins_and_Never_Falls/">
                  Spins and Never Falls
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/The_Caspian_Sea/">
                  The Caspian Sea
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/Tower_of_Mirrors/">
                  Tower of Mirrors
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Blue_Dot_Sessions/TinyTiny_Trio/Velvet_Ladder/">
                  Velvet Ladder
                </a>{" "}
                by Blue Dot Sessions, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Boom_Boom_Beckett/Boom_boom_baby/09_-_Boom_Boom_Beckett_-_After_All/">
                  After All
                </a>{" "}
                by Boom Boom Beckett, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Boom_Boom_Beckett/Boom_boom_baby/04_-_Boom_Boom_Beckett_-_Barbagil/">
                  Barbagil
                </a>{" "}
                by Boom Boom Beckett, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Boom_Boom_Beckett/Boom_boom_baby/05_-_Boom_Boom_Beckett_-_C_est_pareil/">
                  C est pareil
                </a>{" "}
                by Boom Boom Beckett, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Boom_Boom_Beckett/Boom_boom_baby/07_-_Boom_Boom_Beckett_-_Nella_Nostra_Bellezza/">
                  Nella Nostra Bellezza
                </a>{" "}
                by Boom Boom Beckett, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Boom_Boom_Beckett/Boom_boom_baby/03_-_Boom_Boom_Beckett_-_To_Be_a_Master_P/">
                  To Be a Master P.
                </a>{" "}
                by Boom Boom Beckett, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://pixabay.com/music/comedy-super-hero-track-by-brolefilmer-13690/">
                  Super Hero, Track by, Brolefilmer
                </a>{" "}
                by brolefilmer, used under the Pixabay license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/crowander/from-the-piano-solo-piano/hello/">
                  Hello
                </a>{" "}
                by Crowander, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/crowander/from-the-piano-solo-piano/humbug/">
                  Humbug
                </a>{" "}
                by Crowander, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/crowander/from-the-piano-solo-piano/jerrys-back/">
                  Jerry’s Back
                </a>{" "}
                by Crowander, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/crowander/from-the-bass-funkjazzrock/the-puddle/">
                  The Puddle
                </a>{" "}
                by Crowander, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/blue-tales/ataraxy/">
                  ataraxy
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/car-train-1/b-road/">
                  b-road
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/foretime/back-then/">
                  Back Then
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/little-night-thoughts/bats/">
                  bats
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/one-tune-twelve-pieces/big-band-1/">
                  big band
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/summer-life/busy-bees/">
                  Busy Bees
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/vulnerability/childhood-pictures-1/">
                  childhood pictures
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/attitude/city-tour/">
                  City Tour
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/cocktail-reception/cocktail-reception/">
                  cocktail reception
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/jannowitzbrucke/cruise-around/">
                  cruise around
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/go-down-moses/didnt-my-lord-deliver-daniel/">
                  Didn´t My Lord Deliver Daniel
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/jannowitzbrucke/evening-traffic/">
                  evening traffic
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/foretime/gambol/">
                  Gambol
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/cocktail-reception/garden-party/">
                  garden party
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/memory/getaway/">
                  getaway
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/go-down-moses/goin-to-set-down-an-rest-a-while/">
                  Goin´ to Set Down an´ Rest a While
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/go-down-moses/he-never-said-a-mumbling-word/">
                  He Never Said a Mumbling Word
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/vulnerability/hindsight/">
                  hindsight
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/car-train-1/holiday-traffic/">
                  holiday traffic
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/one-tune-twelve-pieces/lounge/">
                  lounge
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/minor-alienation/minor-sadness/">
                  minor sadness
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/summer-life/night-elves/">
                  Night Elves
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/summer-life/night-ride/">
                  Night Ride
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/car-train-1/night-sleeper/">
                  night sleeper
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/car-train-1/old-steam-train/">
                  old steam train
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/attitude/rainy-streets/">
                  Rainy Streets
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/attitude/romp/">
                  Romp
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/cocktail-reception/rooftop-garden/">
                  rooftop garden
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/brain-fried/spring-flowers/">
                  Spring Flowers
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/jannowitzbrucke/suburban-train/">
                  suburban train
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/vulnerability/sunset-boulevard/">
                  sunset boulevard
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/one-tune-twelve-pieces/swingin/">
                  swingin
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/brain-fried/the-universe/">
                  The Universe
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/car-train-1/train-journey/">
                  train journey
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/attitude/waltzing-mouse/">
                  Waltzing Mouse
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Dee_Yan-Key/holiday-and-winter-moods/winter-winds/">
                  Winter Winds
                </a>{" "}
                by Dee Yan-Key, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/a-feather/">
                  A Feather
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/a-left-hook/">
                  A Left Hook
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/blue-is-all-thats-left/">
                  Blue Is All That’s Left
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/ici/">
                  Ici
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/mark/">
                  Mark
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/time-out-space-out/">
                  Time-Out, Space-Out
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/eric-van-der-westen/the-crown-lobster-trilogy-selection/water-surface/">
                  Water Surface
                </a>{" "}
                by Eric Van der Westen, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/holiznacc0/orphaned-media-pt-2/sailing-away/">
                  Sailing Away
                </a>{" "}
                by HoliznaCC0, used under the CC0 license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jesse_Spillane/Sky_Ship/Jesse_Spillane_-_Sky_Ship_-_01_Gorgon_Original/">
                  Gorgon Original
                </a>{" "}
                by Jesse Spillane, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jesse_Spillane/Sky_Ship/Jesse_Spillane_-_Sky_Ship_-_08_Hands_of_a_Pedestrian/">
                  Hands of a Pedestrian
                </a>{" "}
                by Jesse Spillane, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jesse_Spillane/the-big-idea-machine/scratch-pad/">
                  Scratch Pad
                </a>{" "}
                by Jesse Spillane, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jonah_Dempcy/Syncretic_Beliefs/jonah_dempcy_-_01_-_azurescent/">
                  Azurescent
                </a>{" "}
                by Jonah Dempcy, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jonah_Dempcy/Syncretic_Beliefs/jonah_dempcy_-_02_-_lumen_arcanum/">
                  Lumen Arcanum
                </a>{" "}
                by Jonah Dempcy, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jonah_Dempcy/Syncretic_Beliefs/jonah_dempcy_-_07_-_mother_matrix_most_mysterious/">
                  Mother Matrix Most Mysterious
                </a>{" "}
                by Jonah Dempcy, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jonah_Dempcy/Syncretic_Beliefs/jonah_dempcy_-_06_-_reticulating_flux/">
                  Reticulating Flux
                </a>{" "}
                by Jonah Dempcy, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Jonah_Dempcy/Syncretic_Beliefs/jonah_dempcy_-_04_-_upsurge/">
                  Upsurge
                </a>{" "}
                by Jonah Dempcy, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-organ-boogie-2120/">
                  Organ Boogie
                </a>{" "}
                by JuliusH, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-springtime-big-band-swing-music-618/">
                  Springtime - Big Band Swing Music
                </a>{" "}
                by JuliusH, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-swing-sax-big-band-miller-style-2669/">
                  Swing Sax - Big Band Miller Style
                </a>{" "}
                by JuliusH, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-swing-train-big-band-miller-style-2667/">
                  Swing Train - Big Band Miller Style
                </a>{" "}
                by JuliusH, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-waldhorn-orchester-french-horn-orchestra-2778/">
                  Waldhorn Orchester - French Horn Orchestra
                </a>{" "}
                by JuliusH, used under the Pixabay license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Kevin_MacLeod/Jazz_Sampler/Backed_Vibes_Clean_1973/">
                  Backed Vibes Clean
                </a>{" "}
                by Kevin MacLeod, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Kevin_MacLeod/Jazz_Sampler/Off_to_Osaka_1502/">
                  Off to Osaka
                </a>{" "}
                by Kevin MacLeod, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/lafaena/not-shift-free-will/sassy-jazzy/">
                  Sassy Jazzy
                </a>{" "}
                by LaFaena, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/m33-project/bluesy-jazzy/jazzy-reel/">
                  Jazzy Reel
                </a>{" "}
                by M33 Project, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/maarten-schellekens/free-music/sax-and-piano-free-track/">
                  Sax and Piano (free track)
                </a>{" "}
                by Maarten Schellekens, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Marcos_H_Bolanos/True_Stories/a-simple-life/">
                  A Simple Life
                </a>{" "}
                by Marcos H. Bolanos, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-the-circus-marched-down-bourbon-street-new-orleans-jazz-192179/">
                  The Circus Marched Down Bourbon Street - New Orleans Jazz
                </a>{" "}
                by melodyayresgriffiths, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-big-band-165241/">
                  Big Band
                </a>{" "}
                by Music_For_Videos, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-big-band-jazz-160866/">
                  Big Band Jazz
                </a>{" "}
                by Music_For_Videos, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-spy-164938/">Spy</a>{" "}
                by Music_For_Videos, used under the Pixabay license
              </li>
              <li>
                <a href="https://pixabay.com/music/big-band-big-band-swing-jazzy-optimism-219324/">
                  Big Band Swing - Jazzy Optimism
                </a>{" "}
                by MusicInMedia, used under the Pixabay license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/patrick-davies/single/a-body-in-the-alley/">
                  A Body In The Alley
                </a>{" "}
                by Patrick Davies, used under the CC0 license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Rob_Walker/single/Art_of_the_Groove_w_Brent_Jensen/">
                  Art of the Groove (w/ Brent Jensen)
                </a>{" "}
                by Rob Walker, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Somewhere_Off_Jazz_Street/A_quiet_light/Somewhere_off_Jazz_Street_-_A_Quiet_Light_-_06_Dawn/">
                  Dawn
                </a>{" "}
                by Somewhere Off Jazz Street, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Somewhere_Off_Jazz_Street/A_quiet_light/Somewhere_off_Jazz_Street_-_A_Quiet_Light_-_02_Echo/">
                  Echo
                </a>{" "}
                by Somewhere Off Jazz Street, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Somewhere_Off_Jazz_Street/A_quiet_light/Somewhere_off_Jazz_Street_-_A_Quiet_Light_-_04_Gave/">
                  Gave
                </a>{" "}
                by Somewhere Off Jazz Street, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/Somewhere_Off_Jazz_Street/A_quiet_light/Somewhere_off_Jazz_Street_-_A_Quiet_Light_-_03_Ghost/">
                  Ghost
                </a>{" "}
                by Somewhere Off Jazz Street, used under the CC BY-NC license
              </li>
              <li>
                <a href="https://pixabay.com/music/traditional-jazz-comedy-swing-202933/">
                  Comedy Swing
                </a>{" "}
                by WaveMaster, used under the Pixabay license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/William_Ross/Aim_to_Stay/William_Ross_Chernoffs_Nomads_-_Aim_to_Stay_-_04_Ahmad/">
                  Ahmad
                </a>{" "}
                by William Ross Chernoff’s Nomads, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/William_Ross/Aim_to_Stay/William_Ross_Chernoffs_Nomads_-_Aim_to_Stay_-_05_Four-Way/">
                  Four-Way
                </a>{" "}
                by William Ross Chernoff’s Nomads, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/William_Ross/Aim_to_Stay/William_Ross_Chernoffs_Nomads_-_Aim_to_Stay_-_02_In_Shadows/">
                  In Shadows
                </a>{" "}
                by William Ross Chernoff’s Nomads, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/William_Ross/Aim_to_Stay/William_Ross_Chernoffs_Nomads_-_Aim_to_Stay_-_01_Makie_Elkino/">
                  Makie Elkino
                </a>{" "}
                by William Ross Chernoff’s Nomads, used under the CC BY license
              </li>
              <li>
                <a href="https://freemusicarchive.org/music/xennial/single/blue-house-boogie/">
                  Blue House Boogie
                </a>{" "}
                by Xennial, used under the CC BY license
              </li>
            </ul>
          </Credits>
        </PageMain>
      </>
    </PageWrapper>
  );

  return { node, title: "Credits" };
};

export default handler;
