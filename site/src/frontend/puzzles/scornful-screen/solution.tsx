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
        The puzzle presents as a travel vlog. The unnamed vlogger is not very
        good at travel vlogging: the videos are not particularly well shot, the
        narration is awkward, and the author suffers the occasional mishap and
        malady along the way. The video ends with a request to follow the
        vlogger on their social media account, but cuts off before the vlogger
        can provide details.
      </p>
      <p>
        As indicated by the title of the puzzle and video, teams need to
        determine where the vlogger is, assisted by the video and narration.
      </p>
      <StyledTable>
        <tr>
          <th>Clip</th>
          <th>Landmark</th>
          <th>Location</th>
          <th>Evan Performed By</th>
        </tr>
        <tr>
          <td>1</td>
          <td>IKEA next to Newark Airport</td>
          <td>Elizabeth, NJ</td>
          <td>Dee Ruttenberg</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Grant Street Pier</td>
          <td>Vancouver, WA</td>
          <td>Amanda Giermann</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Chihuly “Rock Candy” Polymer Statue</td>
          <td>Akron, OH</td>
          <td>Zach Eucker</td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            “Mirror Piece I & II” by Joan Jonas, performed in the Sculpture
            Garden of the Museum of Modern Art
          </td>
          <td>New York, NY</td>
          <td>Teddy McArthur</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Fairbanks Museum and Planetarium</td>
          <td>St. Johnsbury, VT</td>
          <td>Teddy McArthur</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Vietnam Veterans Replica Wall Memorial</td>
          <td>Tupelo, MS</td>
          <td>Sid Creutz</td>
        </tr>
        <tr>
          <td>7</td>
          <td>North Carolina State Capitol</td>
          <td>Raleigh, NC</td>
          <td>Paul Hlebowitsh</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Inglewood Public Library</td>
          <td>Inglewood, CA</td>
          <td>Steven Vanderveer</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Berkshire Museum</td>
          <td>Pittsfield, MA</td>
          <td>Anisa Schardl</td>
        </tr>
      </StyledTable>
      <p>
        The first letters of these cities spell out <Mono>EVANSTRIP</Mono>. This
        is a plausible travel vlog channel name. The encouragement to visit
        their social media comes over the final clip, which is a shot of a blue
        sky (where Evan was performed by Steve Banzaert). By searching for
        “evanstrip” on the social media website Bluesky, teams discover Evan’s
        Bluesky account and the second phase of the puzzle.
      </p>
      <p>
        Evan’s account contains one threaded series of posts showing various
        locations around Greater Boston. His first post indicates that you
        “gotta really go out of your way for these hot spots, trust me!” This
        primes teams to consider how Evan got to these spots. Their previous
        experience with Evan’s travel vlog hopefully primes teams to believe
        that Evan is being disingenuous about how difficult it is to get to
        these spots. In fact, each of the thirteen pictures he has taken are
        either within an MBTA station or within a few steps of the entrance of
        an MBTA station.
      </p>
      <p>
        Each picture is accompanied by a short caption that contains one or two
        words in all capital letters. The caption accompanying each post
        corresponds to the MBTA station where the photograph was taken—each word
        represents a letter in the station name, and each sentence represents a
        word of the station name. By indexing the position of the all-caps words
        into the MBTA station’s name, teams can extract letters.
      </p>
      <StyledTable>
        <tr>
          <th>#</th>
          <th>Site</th>
          <th>Station</th>
          <th>Position of all-caps words</th>
          <th>Extraction</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Boston City Hall</td>
          <td>Government Center</td>
          <td>1, 2</td>
          <td>GO</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Seaport Market</td>
          <td>Courthouse</td>
          <td>9, 10</td>
          <td>SE</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Salt and Pepper Bridge</td>
          <td>Charles/MGH</td>
          <td>6, 7</td>
          <td>ES</td>
        </tr>
        <tr>
          <td>4</td>
          <td>TD Garden</td>
          <td>North Station</td>
          <td>7, 8</td>
          <td>TA</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Fiduciary Trust Building</td>
          <td>South Station</td>
          <td>7, 8</td>
          <td>TA</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Cardinal Cushing Memorial Park</td>
          <td>Bowdoin</td>
          <td>1, 2</td>
          <td>BO</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Lehman Hall, Harvard University</td>
          <td>Harvard</td>
          <td>2, 3</td>
          <td>AR</td>
        </tr>
        <tr>
          <td>8</td>
          <td>“Explosions” by Sergio Castillo</td>
          <td>Blandford Street</td>
          <td>5, 6</td>
          <td>DF</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Cafe Landwer, near Chestnut Hill Reservation</td>
          <td>Reservoir</td>
          <td>8, 9</td>
          <td>IR</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Old State House</td>
          <td>State</td>
          <td>1, 2</td>
          <td>ST</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Boston Public Library</td>
          <td>Copley</td>
          <td>4, 5</td>
          <td>LE</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Eagle’s Deli</td>
          <td>Cleveland Circle</td>
          <td>4, 5</td>
          <td>VE</td>
        </tr>
        <tr>
          <td>13</td>
          <td>MIT Museum</td>
          <td>Kendall/MIT</td>
          <td>6</td>
          <td>L</td>
        </tr>
      </StyledTable>
      <p>
        These letters spell out <Mono>GO SEE STATA BOARD FIRST LEVEL</Mono>.
      </p>
      <p>
        If teams follow this instruction and go to the bulletin boards on the
        first level of the Stata Center, they will find exactly one flyer from
        Evan. (Teams can confirm that this is the right flyer by noticing
        references to the previous two rounds, including mentions of Evan’s fake
        mustache from Chuck E. Cheese.) It contains Evan’s earnest but rambling
        plea for someone to help him be a good video blogger, mentioning his
        upcoming trip to Greece and his awareness that he needs to step up his
        game.
      </p>
      <p>
        His plea contains exactly nine numerals, matching the original nine
        cities that Evan’s video covered. Teams can index into these cities in
        the order they appeared in the video.
      </p>
      <StyledTable>
        <tr>
          <th>Clip</th>
          <th>City Name</th>
          <th>Index from Flyer</th>
          <th>Extraction</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Elizabeth, NJ</td>
          <td>4</td>
          <td>Z</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Vancouver, WA</td>
          <td>2</td>
          <td>A</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Akron, OH</td>
          <td>2</td>
          <td>K</td>
        </tr>
        <tr>
          <td>4</td>
          <td>New York, NY</td>
          <td>4</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>5</td>
          <td>St. Johnsbury, VT</td>
          <td>6</td>
          <td>N</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Tupelo, MS</td>
          <td>1</td>
          <td>T</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Raleigh, NC</td>
          <td>7</td>
          <td>H</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Inglewood, CA</td>
          <td>7</td>
          <td>O</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Pittsfield, MA</td>
          <td>5</td>
          <td>S</td>
        </tr>
      </StyledTable>
      <p>
        This spells out{" "}
        <Mono>
          <strong>ZAKYNTHOS</strong>
        </Mono>
        , the Greek island that Evan is traveling to and the answer to the
        puzzle.
      </p>
      <h3>Author’s Note</h3>
      <p>
        This puzzle was conceived early on in the hunt writing process and took
        over six months of planning and coordination among numerous team members
        to pull off. I want to give enormous thanks to the eight members of the
        team that went out of their way and filmed footage for the puzzle –
        thank you Dee, Amanda, Zach, Sid, Paul, Steven, Anisa, and Steve! In the
        most literal sense, this puzzle couldn’t have happened without you.
      </p>
      <p>
        We collaborated to find interesting locations in the assigned cities,
        but I left the precise mechanics of what and how to shoot up to each
        person. This included whether to shoot portrait or landscape; as it
        turns out, everyone either shot in portrait on instinct or alternated
        between portrait and landscape (in one case, in the middle of clips!).
        Everyone did a fantastic job!
      </p>
      <p>
        I also want to thank Michele, Molly, Steve, Robin, and Chris, who guided
        this through the editing process with excellent feedback, connected me
        with our Evans, and helped me scout good places to post the final flyer
        at MIT.
      </p>
      <p>
        An inspiration for this puzzle was Jet Lag, a YouTube/Nebula series
        where three friends run through various travel-related games, such as
        playing Connect 4 with the western United States, playing Capture the
        Flag using Japan’s extensive rail network, and running elaborate (and
        surprisingly strategic) games of tag throughout Europe. A hobby among
        some fans of the show is to analyze each season’s trailer to try to
        determine not only where the footage was shot, but piece together what
        they know about the season’s format and rules to guess in what order the
        places were visited and who performed the best. I saw one of these
        videos one day and said, “huh, a whole puzzle based around geolocating a
        video—or, say, a crummy travel vlog—would be pretty funny.” And then I
        submitted that into our system, and the editors said “you know, you’re
        right, a whole puzzle based around geolocating a video—or, say, a crummy
        travel vlog—WOULD be pretty funny.” And then the joke was on me, because
        then I had to actually plan it.
      </p>
      <p>
        The biggest limiting factor, as you might’ve guessed, was getting
        footage in the different cities. The final extract was always going to
        be indexing into the cities with an arbitrary number, which allowed for
        maximum practicality in what I could choose the cities to be. Evan’s
        Trip was originally Ed’s Course (“Have some Dis-course about Ed’s
        Course!”, his Bluesky bio would have read; alas), but those city
        selections didn’t work great with where our team would find themselves.
        I came into city selection with some footage already in the bank, which
        helped ease the process. My goal was to get a variety of cities across
        the country, which was helped by having team members scattered all
        across the country!
      </p>
      <p>
        In true “my first video vlog” fashion, the video was edited entirely in
        Microsoft Clipchamp, the free video editor that comes with Windows 11,
        which is more or less good enough for simple jobs.
      </p>
      <p>
        For Evan as a character, I wanted to combine the anxious earnestness of
        Griffin McElroy’s{" "}
        <a
          href="https://www.youtube.com/playlist?list=PLaDrN74SfdT5huM_hsSXESlFzdzY2oXzY"
          target="_blank"
          rel="noreferrer"
        >
          Amiibo Corner
        </a>{" "}
        and the stilted enthusiasm of Graham Stark as{" "}
        <a href="https://youtu.be/HWZhsrf7ZTU" target="_blank" rel="noreferrer">
          Dave’s Spokesman
        </a>
        . My Brother My Brother and Me and Loading Ready Run both really
        synchronize with my sense of humor.
      </p>
      <p>
        If you’re curious, the photos for the second phase were (almost) all
        shot in one day on September 28th on a one-day linkpass, and they were,
        as promised, all shot either within a station or within a few steps of
        the entrance of a station. Here’s the route I took:
      </p>
      <ul>
        <li>
          Starting with Charles/MGH and getting the shot from on the platform of
          the Salt and Pepper Bridge.
        </li>
        <li>
          Red Line down to South Station, briefly stepping outside to get a shot
          of the Fiduciary Trust Building. To the right of this picture a little
          bit is a large mural on the side of a building, but trees and angles
          didn’t let me get a decent enough shot of it. I decided to go with a
          clearer and visually distinct building.
        </li>
        <li>
          Silver Line to Courthouse. This happened to be the day of RoboBoston’s
          robotics festival in the Seaport Market. Fun fact: two separate groups
          of testsolvers said out loud “ah, jeez, does the Silver Line count? It
          shouldn’t.”
        </li>
        <li>
          Walking to State. The Old State House was a natural pick for the pic,
          and it turned out to be a pretty good angle, even with the restriction
          of being taken in the doorway of the subway entrance.
        </li>
        <li>
          Orange Line to North Station. This shot was taken inside the station
          itself, leaning up against a gated area that leads to the Commuter
          Rail trains. As you know (now, if not before the hunt), North Station
          is directly under TD Garden, and this escalator provides a direct
          connection from the trains to the games.
        </li>
        <li>
          Green Line to Government Center. The station now opens up directly
          facing City Hall, so it makes for a very easy choice as to what to
          shoot.
        </li>
        <li>
          Walk to Bowdoin. This station is only a block or two down the street
          from Government Center, and you can actually see the top of the glass
          facade of Government Center from the entrance of Bowdoin. I decided
          that the small park it opens up to was a more interesting (and
          slightly less confusing) shot.
        </li>
        <li>
          Walk back to Government Center. You can’t quite see Bowdoin from
          Government Center; the angles don’t quite work, and the entrance isn’t
          big enough.
        </li>
        <li>
          Green Line to Copley. There were three good options right at Copley–
          the Trinity Church, the Hancock, and the BPL. After getting photos of
          all three from the entrance, I ended up liking the BPL the most; it
          also led itself to text that seemed to flow well given the all-caps
          constraint.
        </li>
        <li>
          Green Line to Kenmore. Hey, you know when I shouldn’t have done all
          this? On the day of a Red Sox home game. I should have known better.{" "}
        </li>
        <li>
          Walk to Blandford Street. I could have waited for a B line to get me
          there directly, but Blandford Street is only a block or two down from
          Kenmore. Fun fact: the MBTA keeps talking about merging Blandford
          Street and BU East, much like how they merged BU West and Saint Paul
          Street to make Amory Street. If you’re going through the Mystery Hunt
          Archives twenty years from now and wondering why this puzzle is out of
          date because Blandford Street doesn’t exist… well, that’s on you for
          not considering publication time, isn’t it? It’s like being mad at a
          puzzle for referring to Tom Brady as a retired quarterback because it
          was published during his brief retirement in 2022 or prior to his
          comeback stint with the Raiders in 2027. You can’t predict the future.
        </li>
        <li>
          Walk back to Kenmore. Speaking of Red Sox, if you have family coming
          in from out of town for a Sox game, remind them that they want any
          B/C/D to Kenmore, and not the D to Fenway. Unless you don’t like your
          family, in which case, go ahead and send them to Fenway and make them
          walk.
        </li>
        <li>
          Green Line to Cleveland Circle. There is… not a lot going on visually
          at Cleveland Circle. The most notable landmark is Eagle’s Deli, where
          you can get a pretty solid burger.
        </li>
        <li>
          Walk to Reservoir. Despite what it may seem like on the MBTA map,
          Cleveland Circle and Reservoir are only a few hundred feet from each
          other. This also means that there isn’t a whole lot going on visually
          at Reservoir, either! The interesting part of Reservoir—the dang
          reservoir—is off in the distance. I improvised by getting an okay shot
          from the bus terminal at the station that gives a locatable place and
          a shot of the park in the distance.
        </li>
        <li>
          86 bus to Harvard. This shot was not just taken outside an entrance–
          it was shot THROUGH an entrance, framed by the sign for the Harvard
          MBTA stop.
        </li>
      </ul>
      <p>
        From start to finish, the route took me about four and a half hours, and
        I got asked for help navigating the subway on three separate occasions,
        which I believe officially makes me a townie. So as to save a stop, I
        shot the photo for Kendall/MIT the next day at an on-campus worksession.
        The photo is tilted up because the museum was hosting the Cambridge
        Science Festival outside, and it was pretty impossible to get a shot of
        the building without a lot of people in it.
      </p>
      <p>
        Phase three involves teams searching through a busy bulletin
        board—hopefully a busy bulletin board, this bit doesn’t work as well if
        there aren’t as many flyers as there usually are—to find Evan’s single,
        solitary flyer, which doesn’t even have any way to contact him on it.
        Hapless to the end.
      </p>
      <p>Other possible locations we considered for the flyer:</p>
      <ul>
        <li>
          The Ombudsperson’s office, 10-213, has a board right outside it and is
          a uniquely clueable place on campus with the phrase{" "}
          <Mono>OMBUDS OFFICE BOARD</Mono>.
        </li>
        <li>
          The Infinite Corridor’s solar system model has several boards across
          from the Sun and the inner planets, with the{" "}
          <Mono>INFINITE SUN BOARD</Mono> positioned directly across from the
          Sun model.
        </li>
      </ul>
      <p>
        Ultimately, picking Stata was the best choice for two reasons. One, it
        would be much easier and much less conspicuous for a team member to
        periodically check to make sure the flyer was still in place, as teams
        would expect to see us milling about Stata since the Gala was upstairs.
        Two, the idea of teams playing needle-in-a-haystack with the many, many
        bulletin boards on the first floor of Stata looking for a single
        solitary flyer was so deeply funny to me that I knew it had to happen.
      </p>
    </>
  );
};

export default Solution;
