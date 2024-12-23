import React from "react";
import { styled } from "styled-components";
import solution01 from "./assets/solution.png";

const BBspan = styled.span`
  background-color: #a4c2f4;
`;

const HMspan = styled.span`
  background-color: #d5a6bd;
`;

const WAspan = styled.span`
  background-color: #b6d7a8;
`;

const BBtd = styled.td`
  background-color: #a4c2f4;
`;

const HMtd = styled.td`
  background-color: #d5a6bd;
`;

const WAtd = styled.td`
  background-color: #b6d7a8;
`;

const ExtractionTd = styled.td`
  background-color: #00ff00;
`;

const SolutionImg = styled.img`
  width: 624px;
  height: 82.67px;
`;

const Solution = () => {
  return (
    <>
      <p>
        All of the rebuses are puns/parodies of famous songs as clued by puzzle
        title &ldquo;Zing it Again&rdquo; (Zing sounds like Sing and is also a
        reference towards &ldquo;Zingers&rdquo;). Each of these puns/parodies is
        from a specific source as indicated by the three sets of initials BB,
        HM, and WA in final image. &nbsp;Colors added to solution document for
        easier tracking. These three sources are:
      </p>
      <ul>
        <li>
          <BBspan>BB: Bob&rsquo;s Burgers daily special puns</BBspan>
        </li>
        <li>
          <HMspan>HM: Hannah Montana episode title puns</HMspan>
        </li>
        <li>
          <WAspan>WA: Weird Al parodies</WAspan>
        </li>
      </ul>
      <p>
        As you solve the rebuses you will likely notice that the index A/B is
        such that B is the length of the band name. The band names are also
        given in alphabetical order.
      </p>
      <p>
        Below are the solutions for each rebus in given order (pictures to be
        put in final solution doc):
      </p>

      <table>
        <tr>
          <th>
            <p>Img</p>
          </th>
          <th>
            <p>Rebus (Song parody/pun)</p>
          </th>
          <th>
            <p>Reference Song/Lyrics</p>
          </th>
          <th>
            <p>Band Name</p>
          </th>
        </tr>
        <tr>
          <td>1</td>
          <WAtd>
            <p>ODE TO A SUPERHERO</p>
          </WAtd>
          <td>
            <p>PIANO MAN</p>
          </td>
          <td>
            <p>BILLY JOEL</p>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <WAtd>
            <p>ACHY BREAKY SONG</p>
          </WAtd>
          <td>
            <p>ACHY BREAKY HEART</p>
          </td>
          <td>
            <p>BILLY RAY CYRUS</p>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <BBtd>
            <p>SEALED WITH A SWISS</p>
          </BBtd>
          <td>
            <p>SEALED WITH A KISS</p>
          </td>
          <td>
            <p>BRIAN HYLAND</p>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <BBtd>
            <p>CAULIFLOWER ME MAYBE</p>
          </BBtd>
          <td>
            <p>CALL ME MAYBE</p>
          </td>
          <td>
            <p>CARLY RAE JEPSEN</p>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <WAtd>
            <p>WHITE &amp; NERDY</p>
          </WAtd>
          <td>
            <p>RIDIN DIRTY</p>
          </td>
          <td>
            <p>CHAMILLIONAIRE</p>
          </td>
        </tr>
        <tr>
          <td>6</td>
          <HMtd>
            <p>JOANNIE B. GOODE</p>
          </HMtd>
          <td>
            <p>JOHNNY B. GOODE</p>
          </td>
          <td>
            <p>CHUCK BERRY</p>
          </td>
        </tr>
        <tr>
          <td>7</td>
          <WAtd>
            <p>GIRLS JUST WANT TO HAVE LUNCH</p>
          </WAtd>
          <td>
            <p>GIRLS JUST WANNA HAVE FUN</p>
          </td>
          <td>
            <p>CYNDI LAUPER</p>
          </td>
        </tr>
        <tr>
          <td>8</td>
          <BBtd>
            <p>CHEVRE WHICH WAY BUT LOOSE</p>
          </BBtd>
          <td>
            <p>EVERY WHICH WAY BUT LOOSE</p>
          </td>
          <td>
            <p>EDDIE RABBITT</p>
          </td>
        </tr>
        <tr>
          <td>9</td>
          <BBtd>
            <p>SHAKE YOUR HONEY MAKER</p>
          </BBtd>
          <td>
            <p>SHAKE YOUR MONEYMAKER</p>
          </td>
          <td>
            <p>ELMORE JAMES</p>
          </td>
        </tr>
        <tr>
          <td>10</td>
          <HMtd>
            <p>DON&#39;T GO BREAKING MY TOOTH</p>
          </HMtd>
          <td>
            <p>DON&#39;T GO BREAKING MY HEART</p>
          </td>
          <td>
            <p>ELTON JOHN AND KIKI DEE</p>
          </td>
        </tr>
        <tr>
          <td>11</td>
          <WAtd>
            <p>SHE DRIVES LIKE CRAZY</p>
          </WAtd>
          <td>
            <p>SHE DRIVES ME CRAZY</p>
          </td>
          <td>
            <p>FINE YOUNG CANNIBALS</p>
          </td>
        </tr>
        <tr>
          <td>12</td>
          <HMtd>
            <p>B-B-B-BAD TO THE CHROME</p>
          </HMtd>
          <td>
            <p>B-B-B-BAD TO THE BONE</p>
          </td>
          <td>
            <p>GEORGE THOROGOOD AND THE DESTROYERS</p>
          </td>
        </tr>
        <tr>
          <td>13</td>
          <BBtd>
            <p>SWEET CHILI O&#39; MINE</p>
          </BBtd>
          <td>
            <p>SWEET CHILD O&#39; MINE</p>
          </td>
          <td>
            <p>GUNS N ROSES</p>
          </td>
        </tr>
        <tr>
          <td>14</td>
          <HMtd>
            <p>I AM MAMAW, HEAR ME ROAR!</p>
          </HMtd>
          <td>
            <p>I AM WOMAN, HEAR ME ROAR!</p>
          </td>
          <td>
            <p>HELEN REDDY</p>
          </td>
        </tr>
        <tr>
          <td>15</td>
          <BBtd>
            <p>IN RICOTTA DA VIDA</p>
          </BBtd>
          <td>
            <p>IN-A-GADDA-DA-VIDA</p>
          </td>
          <td>
            <p>IRON BUTTERFLY</p>
          </td>
        </tr>
        <tr>
          <td>16</td>
          <HMtd>
            <p>IT&#39;S A MANNEQUIN&#39;S WORLD</p>
          </HMtd>
          <td>
            <p>IT&#39;S A MAN&#39;S MAN&#39;S MAN&#39;S WORLD</p>
          </td>
          <td>
            <p>JAMES BROWN</p>
          </td>
        </tr>
        <tr>
          <td>17</td>
          <WAtd>
            <p>LIVING WITH A HERNIA</p>
          </WAtd>
          <td>
            <p>LIVING IN AMERICA</p>
          </td>
          <td>
            <p>JAMES BROWN</p>
          </td>
        </tr>
        <tr>
          <td>18</td>
          <WAtd>
            <p>I LOVE ROCKY ROAD</p>
          </WAtd>
          <td>
            <p>I LOVE ROCK N ROLL</p>
          </td>
          <td>
            <p>JOAN JETT AND THE BLACKHEARTS</p>
          </td>
        </tr>
        <tr>
          <td>19</td>
          <BBtd>
            <p>PUT ME IN POACHED</p>
          </BBtd>
          <td>
            <p>PUT ME IN COACH</p>
          </td>
          <td>
            <p>JOHN FOGERTY</p>
          </td>
        </tr>
        <tr>
          <td>20</td>
          <HMtd>
            <p>GOOD GOLLY, MISS DOLLY</p>
          </HMtd>
          <td>
            <p>GOOD GOLLY, MISS MOLLY</p>
          </td>
          <td>
            <p>LITTLE RICHARD</p>
          </td>
        </tr>
        <tr>
          <td>21</td>
          <BBtd>
            <p>SHUT UP AND SWISS ME</p>
          </BBtd>
          <td>
            <p>SHUT UP AND KISS ME</p>
          </td>
          <td>
            <p>MARY CHAPIN CARPENTER</p>
          </td>
        </tr>
        <tr>
          <td>22</td>
          <HMtd>
            <p>TORN BETWEEN TWO HANNAHS</p>
          </HMtd>
          <td>
            <p>TORN BETWEEN TWO LOVERS</p>
          </td>
          <td>
            <p>MARY MACGREGOR</p>
          </td>
        </tr>
        <tr>
          <td>23</td>
          <WAtd>
            <p>THE BRADY BUNCH</p>
          </WAtd>
          <td>
            <p>THE SAFETY DANCE</p>
          </td>
          <td>
            <p>MEN WITHOUT HATS</p>
          </td>
        </tr>
        <tr>
          <td>24</td>
          <HMtd>
            <p>DON&#39;T STOP &#39;TIL YOU GET THE PHONE</p>
          </HMtd>
          <td>
            <p>DON&#39;T STOP &#39;TIL YOU GET ENOUGH</p>
          </td>
          <td>
            <p>MICHAEL JACKSON</p>
          </td>
        </tr>
        <tr>
          <td>25</td>
          <WAtd>
            <p>FAT</p>
          </WAtd>
          <td>
            <p>BAD</p>
          </td>
          <td>
            <p>MICHAEL JACKSON</p>
          </td>
        </tr>
        <tr>
          <td>26</td>
          <WAtd>
            <p>PARTY IN THE CIA</p>
          </WAtd>
          <td>
            <p>PARTY IN THE USA</p>
          </td>
          <td>
            <p>MILEY CYRUS</p>
          </td>
        </tr>
        <tr>
          <td>27</td>
          <WAtd>
            <p>SMELLS LIKE NIRVANA</p>
          </WAtd>
          <td>
            <p>SMELLS LIKE TEEN SPIRIT</p>
          </td>
          <td>
            <p>NIRVANA</p>
          </td>
        </tr>
        <tr>
          <td>28</td>
          <HMtd>
            <p>BYE BYE BALL</p>
          </HMtd>
          <td>
            <p>BYE BYE BYE</p>
          </td>
          <td>
            <p>NSYNC</p>
          </td>
        </tr>
        <tr>
          <td>29</td>
          <BBtd>
            <p>50 WAYS TO LEAVE YOUR GUAVA</p>
          </BBtd>
          <td>
            <p>50 WAYS TO LEAVE YOUR LOVER</p>
          </td>
          <td>
            <p>PAUL SIMON</p>
          </td>
        </tr>
        <tr>
          <td>30</td>
          <HMtd>
            <p>ME AND RICO DOWN BY THE SCHOOLYARD</p>
          </HMtd>
          <td>
            <p>ME AND JULIO DOWN BY THE SCHOOLYARD</p>
          </td>
          <td>
            <p>PAUL SIMON</p>
          </td>
        </tr>
        <tr>
          <td>31</td>
          <BBtd>
            <p>CHARBROIL FAIR</p>
          </BBtd>
          <td>
            <p>SCARBOROUGH FAIR</p>
          </td>
          <td>
            <p>SIMON AND GARFUNKEL</p>
          </td>
        </tr>
        <tr>
          <td>32</td>
          <BBtd>
            <p>BABY GOT BAK CHOY</p>
          </BBtd>
          <td>
            <p>BABY GOT BACK</p>
          </td>
          <td>
            <p>SIR MIX A LOT</p>
          </td>
        </tr>
        <tr>
          <td>33</td>
          <BBtd>
            <p>VIDEO KILLED THE RADICCHIO STAR</p>
          </BBtd>
          <td>
            <p>VIDEO KILLED THE RADIO STAR</p>
          </td>
          <td>
            <p>THE BUGGLES</p>
          </td>
        </tr>
        <tr>
          <td>34</td>
          <HMtd>
            <p>NEW KID IN SCHOOL</p>
          </HMtd>
          <td>
            <p>NEW KID IN TOWN</p>
          </td>
          <td>
            <p>THE EAGLES</p>
          </td>
        </tr>
        <tr>
          <td>35</td>
          <WAtd>
            <p>PRETTY FLY FOR A RABBI</p>
          </WAtd>
          <td>
            <p>PRETTY FLY FOR A WHITE GUY</p>
          </td>
          <td>
            <p>THE OFFSPRING</p>
          </td>
        </tr>
        <tr>
          <td>36</td>
          <HMtd>
            <p>DE-DO-DO-DO DA-DON&#39;T-DON&#39;T, DON&#39;T, TELL MY SECRET</p>
          </HMtd>
          <td>
            <p>DE-DO-DO-DO, DE-DA-DA-DA IS ALL I WANT TO SAY TO YOU</p>
          </td>
          <td>
            <p>THE POLICE</p>
          </td>
        </tr>
        <tr>
          <td>37</td>
          <WAtd>
            <p>GUMP</p>
          </WAtd>
          <td>
            <p>LUMP</p>
          </td>
          <td>
            <p>THE PRESIDENTS OF THE UNITED STATES OF AMERICA</p>
          </td>
        </tr>
        <tr>
          <td>38</td>
          <BBtd>
            <p>GREEN A LITTLE BEAN OF ME</p>
          </BBtd>
          <td>
            <p>DREAM A LITTLE BIT OF ME</p>
          </td>
          <td>
            <p>WAYNE KING AND HIS ORCHESTRA</p>
          </td>
        </tr>
      </table>
      <p>
        You need to next group them into their respective source category. The
        sort is provided through the image at the bottom (e.g. &ldquo;four
        seasons&rdquo; for Bob&rsquo;s Burger means sort by seasons). Sorting
        and indexing into the band names will produce another song pun/parody
        from the respective source.
      </p>
      <h3>Bob&rsquo;s Burgers (BB)</h3>
      <p>Sort = Seasons</p>
      <table>
        <tr>
          <th>BB Season</th>
          <th>Rebus Extracts to</th>
          <th>Actual Song/Lyrics</th>
          <th>Band</th>
          <th>Index</th>
          <th>Ext</th>
        </tr>
        <tr>
          <td>
            <p>1</p>
          </td>
          <BBtd>
            <p>CHEVRE WHICH WAY BUT LOOSE</p>
          </BBtd>
          <td>
            <p>EVERY WHICH WAY BUT LOOSE</p>
          </td>
          <td>
            <p>EDDIE RABBITT</p>
          </td>
          <td>
            <p>10</p>
          </td>
          <ExtractionTd>I</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>2</p>
          </td>
          <BBtd>
            <p>SHAKE YOUR HONEY MAKER</p>
          </BBtd>
          <td>
            <p>SHAKE YOUR MONEYMAKER</p>
          </td>
          <td>
            <p>ELMORE JAMES</p>
          </td>
          <td>
            <p>5</p>
          </td>
          <ExtractionTd>R</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>3</p>
          </td>
          <BBtd>
            <p>50 WAYS TO LEAVE YOUR GUAVA</p>
          </BBtd>
          <td>
            <p>50 WAYS TO LEAVE YOUR LOVER</p>
          </td>
          <td>
            <p>PAUL SIMON</p>
          </td>
          <td>
            <p>2</p>
          </td>
          <ExtractionTd>A</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>4</p>
          </td>
          <BBtd>
            <p>CHARBROIL FAIR</p>
          </BBtd>
          <td>
            <p>SCARBOROUGH FAIR</p>
          </td>
          <td>
            <p>SIMON AND GARFUNKEL</p>
          </td>
          <td>
            <p>14</p>
          </td>
          <ExtractionTd>N</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>5</p>
          </td>
          <BBtd>
            <p>SWEET CHILI O&#39; MINE</p>
          </BBtd>
          <td>
            <p>SWEET CHILD O&#39; MINE</p>
          </td>
          <td>
            <p>GUNS N&#39; ROSES</p>
          </td>
          <td>
            <p>4</p>
          </td>
          <ExtractionTd>S</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>6</p>
          </td>
          <BBtd>
            <p>PUT ME IN POACHED</p>
          </BBtd>
          <td>
            <p>PUT ME IN COACH</p>
          </td>
          <td>
            <p>JOHN FOGERTY</p>
          </td>
          <td>
            <p>6</p>
          </td>
          <ExtractionTd>O</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>7</p>
          </td>
          <BBtd>
            <p>VIDEO KILLED THE RADICCHIO STAR</p>
          </BBtd>
          <td>
            <p>VIDEO KILLED THE RADIO STAR</p>
          </td>
          <td>
            <p>THE BUGGLES</p>
          </td>
          <td>
            <p>1</p>
          </td>
          <ExtractionTd>T</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>8</p>
          </td>
          <BBtd>
            <p>SHUT UP AND SWISS ME</p>
          </BBtd>
          <td>
            <p>SHUT UP AND KISS ME</p>
          </td>
          <td>
            <p>MARY CHAPIN CARPENTER</p>
          </td>
          <td>
            <p>12</p>
          </td>
          <ExtractionTd>A</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>9</p>
          </td>
          <BBtd>
            <p>SEALED WITH A SWISS</p>
          </BBtd>
          <td>
            <p>SEALED WITH A KISS</p>
          </td>
          <td>
            <p>BRIAN HYLAND</p>
          </td>
          <td>
            <p>2</p>
          </td>
          <ExtractionTd>R</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>10</p>
          </td>
          <BBtd>
            <p>IN RICOTTA DA VIDA</p>
          </BBtd>
          <td>
            <p>IN-A-GADDA-DA-VIDA</p>
          </td>
          <td>
            <p>IRON BUTTERFLY</p>
          </td>
          <td>
            <p>3</p>
          </td>
          <ExtractionTd>O</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>11</p>
          </td>
          <BBtd>
            <p>GREEN A LITTLE BEAN OF ME</p>
          </BBtd>
          <td>
            <p>DREAM A LITTLE BIT OF ME</p>
          </td>
          <td>
            <p>WAYNE KING AND HIS ORCHESTRA</p>
          </td>
          <td>
            <p>1</p>
          </td>
          <ExtractionTd>W</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>12</p>
          </td>
          <BBtd>
            <p>BABY GOT BAK CHOY</p>
          </BBtd>
          <td>
            <p>BABY GOT BACK</p>
          </td>
          <td>
            <p>SIR MIX A LOT</p>
          </td>
          <td>
            <p>7</p>
          </td>
          <ExtractionTd>A</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>13</p>
          </td>
          <BBtd>
            <p>CAULIFLOWER ME MAYBE</p>
          </BBtd>
          <td>
            <p>CALL ME MAYBE</p>
          </td>
          <td>
            <p>CARLY RAE JEPSEN</p>
          </td>
          <td>
            <p>5</p>
          </td>
          <ExtractionTd>Y</ExtractionTd>
        </tr>
      </table>
      <p>Extracts to I RAN SO TARO WAY</p>
      <h3>Hannah Montana (HM)</h3>
      <p>
        Sort = Punny Titles (note both episode and actual song titles will work
        if you interpret it as &ldquo;title&rdquo;)
      </p>
      <table>
        <tr>
          <th>
            <p>HM sort</p>
          </th>
          <th>
            <p>Rebus Extracts to</p>
          </th>
          <th>
            <p>Actual Song/Lyrics</p>
          </th>
          <th>
            <p>Band</p>
          </th>
          <th>
            <p>Index</p>
          </th>
          <th>
            <p>Ext</p>
          </th>
        </tr>
        <tr>
          <td>
            <p>1</p>
          </td>
          <HMtd>
            <p>B-B-B-BAD TO THE CHROME</p>
          </HMtd>
          <td>
            <p>B-B-B-BAD TO THE BONE</p>
          </td>
          <td>
            <p>GEORGE THOROGOOD AND THE DESTROYERS</p>
          </td>
          <td>31</td>
          <ExtractionTd>S</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>2</p>
          </td>
          <HMtd>
            <p>BYE BYE BALL</p>
          </HMtd>
          <td>
            <p>BYE BYE BYE</p>
          </td>
          <td>
            <p>NSYNC</p>
          </td>
          <td>5</td>
          <ExtractionTd>C</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>3</p>
          </td>
          <HMtd>
            <p>CALIFORNIA SCREAMIN</p>
          </HMtd>
          <td>
            <p>CALIFORNIA DREAMIN</p>
          </td>
          <td>
            <p>THE MAMAS &amp; THE PAPAS</p>
          </td>
          <td>2</td>
          <ExtractionTd>H</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>4</p>
          </td>
          <HMtd>
            <p>DE-DO-DO-DO DA-DON&#39;T-DON&#39;T, DON&#39;T, TELL MY SECRET</p>
          </HMtd>
          <td>
            <p>DE-DO-DO-DO, DE-DA-DA-DA IS ALL I WANT TO SAY TO YOU</p>
          </td>
          <td>
            <p>THE POLICE</p>
          </td>
          <td>5</td>
          <ExtractionTd>O</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>5</p>
          </td>
          <HMtd>
            <p>DON&#39;T STOP &#39;TIL YOU GET THE PHONE</p>
          </HMtd>
          <td>
            <p>DON&#39;T STOP &#39;TIL YOU GET ENOUGH</p>
          </td>
          <td>
            <p>MICHAEL JACKSON</p>
          </td>
          <td>13</td>
          <ExtractionTd>O</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>6</p>
          </td>
          <HMtd>
            <p>GOOD GOLLY, MISS DOLLY</p>
          </HMtd>
          <td>
            <p>GOOD GOLLY, MISS MOLLY</p>
          </td>
          <td>
            <p>LITTLE RICHARD</p>
          </td>
          <td>5</td>
          <ExtractionTd>L</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>7</p>
          </td>
          <HMtd>
            <p>I AM MAMAW, HEAR ME ROAR!</p>
          </HMtd>
          <td>
            <p>I AM WOMAN, HEAR ME ROAR!</p>
          </td>
          <td>
            <p>HELEN REDDY</p>
          </td>
          <td>10</td>
          <ExtractionTd>Y</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>8</p>
          </td>
          <HMtd>
            <p>IT&#39;S A MANNEQUIN&#39;S WORLD</p>
          </HMtd>
          <td>
            <p>IT&#39;S A MAN&#39;S MAN&#39;S MAN&#39;S WORLD</p>
          </td>
          <td>
            <p>JAMES BROWN</p>
          </td>
          <td>6</td>
          <ExtractionTd>B</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>9</p>
          </td>
          <HMtd>
            <p>JOANNIE B. GOODE</p>
          </HMtd>
          <td>
            <p>JOHNNY B. GOODE</p>
          </td>
          <td>
            <p>CHUCK BERRY</p>
          </td>
          <td>3</td>
          <ExtractionTd>U</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>10</p>
          </td>
          <HMtd>
            <p>MASCOT LOVE</p>
          </HMtd>
          <td>
            <p>MUSKRAT LOVE</p>
          </td>
          <td>
            <p>CAPTAIN &amp; TENNILLE</p>
          </td>
          <td>15</td>
          <ExtractionTd>L</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>11</p>
          </td>
          <HMtd>
            <p>NEW KID IN SCHOOL</p>
          </HMtd>
          <td>
            <p>NEW KID IN TOWN</p>
          </td>
          <td>
            <p>THE EAGLES</p>
          </td>
          <td>7</td>
          <ExtractionTd>L</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>12</p>
          </td>
          <HMtd>
            <p>TORN BETWEEN TWO HANNAHS</p>
          </HMtd>
          <td>
            <p>TORN BETWEEN TWO LOVERS</p>
          </td>
          <td>
            <p>MARY MACGREGOR</p>
          </td>
          <td>4</td>
          <ExtractionTd>Y</ExtractionTd>
        </tr>
      </table>
      <p>Extracts to SCHOOLY BULLY</p>
      <h3>Weird Al (WA)</h3>
      <p>Sort = Album numbers</p>
      <table>
        <tr>
          <th>
            <p>WA Album</p>
          </th>
          <th>
            <p>Rebus Extracts to</p>
          </th>
          <th>
            <p>Actual Song/Lyrics</p>
          </th>
          <th>
            <p>Band</p>
          </th>
          <th>
            <p>Index</p>
          </th>
          <th>
            <p>Ext</p>
          </th>
        </tr>
        <tr>
          <td>
            <p>1</p>
          </td>
          <WAtd>
            <p>I LOVE ROCKY ROAD</p>
          </WAtd>
          <td>
            <p>I LOVE ROCK N ROLL</p>
          </td>
          <td>
            <p>JOAN JETT &amp; THE BLACKHEARTS</p>
          </td>
          <td>8</td>
          <ExtractionTd>T</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>2</p>
          </td>
          <WAtd>
            <p>THE BRADY BUNCH</p>
          </WAtd>
          <td>
            <p>THE SAFETY DANCE</p>
          </td>
          <td>
            <p>MEN WITHOUT HATS</p>
          </td>
          <td>11</td>
          <ExtractionTd>H</ExtractionTd>
        </tr>
        <tr>
          <td>3</td>
          <WAtd>
            <p>GIRLS JUST WANT TO HAVE LUNCH</p>
          </WAtd>
          <td>
            <p>GIRLS JUST WANNA HAVE FUN</p>
          </td>
          <td>
            <p>CYNDI LAUPER</p>
          </td>
          <td>10</td>
          <ExtractionTd>E</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>4</p>
          </td>
          <WAtd>
            <p>LIVING WITH A HERNIA</p>
          </WAtd>
          <td>
            <p>LIVING IN AMERICA</p>
          </td>
          <td>
            <p>JAMES BROWN</p>
          </td>
          <td>5</td>
          <ExtractionTd>S</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>5</p>
          </td>
          <WAtd>
            <p>FAT</p>
          </WAtd>
          <td>
            <p>BAD</p>
          </td>
          <td>
            <p>MICHAEL JACKSON</p>
          </td>
          <td>5</td>
          <ExtractionTd>A</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>6</p>
          </td>
          <WAtd>
            <p>SHE DRIVES LIKE CRAZY</p>
          </WAtd>
          <td>
            <p>SHE DRIVES ME CRAZY</p>
          </td>
          <td>
            <p>FINE YOUNG CANNIBALS</p>
          </td>
          <td>9</td>
          <ExtractionTd>G</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>7</p>
          </td>
          <WAtd>
            <p>SMELLS LIKE NIRVANA</p>
          </WAtd>
          <td>
            <p>SMELLS LIKE TEEN SPIRIT</p>
          </td>
          <td>
            <p>NIRVANA</p>
          </td>
          <td>5</td>
          <ExtractionTd>A</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>8</p>
          </td>
          <WAtd>
            <p>ACHY BREAKY SONG</p>
          </WAtd>
          <td>
            <p>ACHY BREAKY HEART</p>
          </td>
          <td>
            <p>BILLY RAY CYRUS</p>
          </td>
          <td>1</td>
          <ExtractionTd>B</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>9</p>
          </td>
          <WAtd>
            <p>GUMP</p>
          </WAtd>
          <td>
            <p>LUMP</p>
          </td>
          <td>
            <p>THE PRESIDENTS OF THE UNITED STATES OF AMERICA</p>
          </td>
          <td>35</td>
          <ExtractionTd>E</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>10</p>
          </td>
          <WAtd>
            <p>PRETTY FLY FOR A RABBI</p>
          </WAtd>
          <td>
            <p>PRETTY FLY FOR A WHITE GUY</p>
          </td>
          <td>
            <p>THE OFFSPRING</p>
          </td>
          <td>12</td>
          <ExtractionTd>G</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>11</p>
          </td>
          <WAtd>
            <p>ODE TO A SUPERHERO</p>
          </WAtd>
          <td>
            <p>PIANO MAN</p>
          </td>
          <td>
            <p>BILLY JOEL</p>
          </td>
          <td>2</td>
          <ExtractionTd>I</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>12</p>
          </td>
          <WAtd>
            <p>WHITE &amp; NERDY</p>
          </WAtd>
          <td>
            <p>RIDIN DIRTY</p>
          </td>
          <td>
            <p>CHAMILLIONAIRE</p>
          </td>
          <td>10</td>
          <ExtractionTd>N</ExtractionTd>
        </tr>
        <tr>
          <td>
            <p>13</p>
          </td>
          <WAtd>
            <p>PARTY IN THE CIA</p>
          </WAtd>
          <td>
            <p>PARTY IN THE USA</p>
          </td>
          <td>
            <p>MILEY CYRUS</p>
          </td>
          <td>10</td>
          <ExtractionTd>S</ExtractionTd>
        </tr>
      </table>
      <p>Extracts to THE SAGA BEGINS</p>
      <p>
        For the final acrostic, if you try to index into the above three
        intermediate solutions, you won&rsquo;t be able to. Notably the Hannah
        Montana extraction has very large indexes which won&rsquo;t work. You
        instead need to repeat the mechanic a second time (&ldquo;Zing it
        again&rdquo;) and convert the songs to the respective band names. Doing
        so with the three intermediate solutions:
      </p>
      <table>
        <tr>
          <th>
            <p>Set</p>
          </th>
          <th>
            <p>Intermediate Solution</p>
          </th>
          <th>
            <p>Actual Song</p>
          </th>
          <th>
            <p>Band</p>
          </th>
        </tr>
        <tr>
          <td>
            <p>BB</p>
          </td>
          <td>
            <p>I RAN SO TARO WAY</p>
          </td>
          <td>
            <p>I RAN SO FAR AWAY</p>
          </td>
          <td>
            <p>A FLOCK OF SEAGULLS</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>HM</p>
          </td>
          <td>
            <p>SCHOOLY BULLY</p>
          </td>
          <td>
            <p>WOOLY BULLY</p>
          </td>
          <td>
            <p>SAM THE SHAM AND THE PHARAOHS</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>WA</p>
          </td>
          <td>
            <p>THE SAGA BEGINS</p>
          </td>
          <td>
            <p>AMERICAN PIE</p>
          </td>
          <td>
            <p>DON MCLEAN</p>
          </td>
        </tr>
      </table>
      <p>If you use the band names in the acrostic index you get</p>
      <p>
        <SolutionImg
          alt="Solved extraction: HERECOMESTHESUN"
          src={solution01}
        />
      </p>
      <p>
        The acrostic spells out HEAR COMES THE PUN. This is a pun on the Beatles
        song title &quot;HERE COMES THE SUN&quot;. It is also a joke setup for
        the final answer. Repeat the mechanic of Song pun -&gt; Band a third
        time (&ldquo;Zing it again&rdquo;) and get the final answer THE BEATLES
        (which is also a pun).
      </p>
    </>
  );
};

export default Solution;
