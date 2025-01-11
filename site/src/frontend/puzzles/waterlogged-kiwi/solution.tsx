import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { DiaryEntry } from "./puzzle";

const DATA: [string, string, string, string, string][] = [
  ["1865", "Hii! I just…", "COPLEYSQUAREPARK", "3 (Practical Chemistry)", "P"],
  ["1910", "It’s been…", "FARIBORZMASEEHHALL", "10 (Chem E)", "A"],
  ["1916", "Going to…", "GRADUATESTUDENTCOUNCIL", "11 (Sanitary E)", "U"],
  ["1946", "Haha why…", "HAYDENLIBRARY", "7 (Bio & Public Health)", "L"],
  ["1955", "Somehow…", "CHARLESMVESTSTUDENTSTREET", "8 (Physics)", "M"],
  ["1957", "“Cool” is…", "HAROLDEEDGERTONSTROBEALLEY", "18 (Mathematics)", "R"],
  ["1975", "Huh, the…", "THEMITRADIOSOCIETY", "11 (Regional Planning)", "O"],
  [
    "1999",
    "OMG I got…",
    "CENTERFORULTRACOLDATOMS",
    "22 (Nuclear Science)",
    "M",
  ],
  ["2020", "Oh how I…", "NERDXING", "2 (Mech E)", "E"],
  ["2024", "Look at…", "BARKERENGINEERINGLIBRARY", "21 (Humanities)", "R"],
];

const StyledTable = styled.table`
  margin: 1em 0;
  td:not(:last-child),
  th:not(:last-child) {
    padding-right: 1em;
  }
`;

const Highlight = styled.span`
  background-color: #00ff00;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a list of diary entries that could be written
        by an MIT student. They must realize that each of the entries and its
        associated scribble contain the following three things:
      </p>
      <ol>
        <li>
          A reference to events relevant to MIT history that allows solvers to
          determine the year in which they were written
        </li>
        <li>A reference to a course offered during that time period</li>
        <li>
          A mention of a plaque, sign, or text written on an object in
          present-day, and a signal to solvers that they must note these
        </li>
      </ol>
      <p>
        The entries are presented in alphabetical order of the texts to be noted
        to provide confirmation of this. Solvers must identify all of the above
        things mentioned in each entry and then reorder the entries
        chronologically. These are highlighted alongside the diary entries
        below.
      </p>
      <p>
        The scribbles without enumerations are to assist solvers in figuring out
        how extraction works. It tells them that the final cluephrase is split
        and that there are two different extractions. It also tells them to drop
        the final word of the answer.
      </p>
      <p>
        The course number (at the time period) must be used to index into the
        noted text to give letters that spell out <Mono>PAUL M ROMER</Mono>,
        after reordering the entries chronologically. Additionally, the first
        letters of the entries spell out <Mono>HIGH SCHOOL</Mono>. Combining the
        two, Paul M Romer was an MIT alumnus who went to the high school{" "}
        <Mono>PHILLIPS EXETER ACADEMY</Mono>. Based on the scribble, we know we
        must drop the last word to get the answer{" "}
        <PuzzleAnswer>PHILLIPS EXETER</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Year</th>
          <th>Diary Entry</th>
          <th>Text Noted</th>
          <th>Course Number</th>
          <th>Letter</th>
        </tr>
        {DATA.map(([year, diary, text, course, letter], i) => (
          <tr key={i}>
            <td>{year}</td>
            <td>
              {i === 5 ? (
                <>
                  {diary.slice(0, 1)}
                  <strong>{diary.slice(1, 2)}</strong>
                  {diary.slice(2)}
                </>
              ) : (
                <>
                  <strong>{diary.slice(0, 1)}</strong>
                  {diary.slice(1)}
                </>
              )}
            </td>
            <td>{text}</td>
            <td>{course}</td>
            <td>
              <strong>{letter}</strong>
            </td>
          </tr>
        ))}
      </StyledTable>
      <h3>Diary Entries in order and References (Highlighted)</h3>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Hii! I just began my first year as a college student! I suppose it’s
          the first year for the school too.{" "}
          <Highlight>
            (Implying that this is 1865, the first year of MIT)
          </Highlight>{" "}
          Seems appropriate to start cataloging things.{" "}
          <Highlight>
            (A slight clue that course catalogs will be useful)
          </Highlight>{" "}
          I do like the classes here—practically, chemistry is all I need.{" "}
          <Highlight>(Course 3 at the time—Practical Chemistry)</Highlight>{" "}
          Maybe that’s why I spent all my time having fun right beside campus.
        </div>
        <div>
          Scribble: There’s a park right beside a church there now, what was it
          called, again? (6 6 4)
        </div>
        <div>
          <Highlight>
            Park beside the church near MIT campus in 1865 (Trinity Church) is{" "}
            <Mono>COPLEY SQUARE PARK</Mono>
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          It’s been fun here. All those years with my friends, going to those
          silly chemical engineering{" "}
          <Highlight>(Course 10 at the time—Chemical Engineering)</Highlight>{" "}
          classes is going to be a thing of the past. Did you know, last summer
          I stayed at this luxury castle-like hotel across the river? They
          celebrated its two year anniversary when I was there! It was right
          beside the river—makes sense, given its name.{" "}
          <Highlight>
            (The hotel mentioned is Maseeh Hall, now a dorm, but at the time, a
            hotel named Riverbank Court. It was built in 1900, so the year of
            the entry is 1902)
          </Highlight>
        </div>
        <div>
          Scribble: I still look at the building name in big black letters when
          I pass by it. (8 6 4)
        </div>
        <div>
          <Highlight>
            The name of the building now is <Mono>FARIBORZ MASEEH HALL</Mono>{" "}
            written outside.
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Going to move into my new dorm. Oh hey, it’s a Moving Day, in more
          ways than one.{" "}
          <Highlight>
            (It is Moving Day, the day when MIT switched campuses from Boston to
            Cambridge—in 1916)
          </Highlight>{" "}
          It’s going to be a big transition, but I’m sure president Maclaurin{" "}
          <Highlight>
            (The MIT president at the time, to provide an additional clue to the
            time period)
          </Highlight>{" "}
          will make sure everything goes smoothly. I’m glad there’s at least a
          gym. It seems sufficiently sanitary{" "}
          <Highlight>(Course 11—Sanitary Engineering)</Highlight>, which is a
          relief, I don’t know what I’d expected.
        </div>
        <div>
          Scribble: It’s not really a gym though, it’s an exam room. I do
          remember seeing the name of some sort of group that started with a G
          on a door in that building though. (8 7 7)
        </div>
        <div>
          <Highlight>
            The place that was a gym in 1916 but is now an exam room is the
            third floor of Walker Memorial. In that building, there is the room
            for the <Mono>GRADUATE STUDENT COUNCIL</Mono>, which is the text to
            be noted.
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Haha why would they even do this? There must be something wrong with
          the authors’ biologies for them to think this was a good idea{" "}
          <Highlight>(Course 7—Biology and Public Health)</Highlight>. What is
          the point of writing a book about a building that you’re not even
          going to start building for another four years? It did turn out pretty
          nice though.{" "}
          <Highlight>
            (These refer to the construction of Hayden Library, which the book
            was written about in 1946, but only was constructed in 1950)
          </Highlight>
        </div>
        <div>
          Scribble: I like looking at its name in those 3D silver letters now
          every time I pass by it. (6 7)
        </div>
        <div>
          <Highlight>
            The 3D silver letters are the one that say{" "}
            <Mono>HAYDEN LIBRARY</Mono> near its entrance
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Somehow it’s been a decade since they dissolved that groovy lab,{" "}
          <Highlight>
            (The Radiation Lab, or “Rad” Lab, for short was made for war
            efforts)
          </Highlight>{" "}
          but the “temporary” building is still there. I still can’t stop
          thinking about it though. When I visit where it was, I can’t help but
          marvel at the physics <Highlight>(Course 8—Physics)</Highlight> of the
          building itself.
        </div>
        <div>
          Scribble: It’s a different building now—some signs attached to the
          ceiling seem to claim there’s a road inside the building? That’s
          weird. (7 1 4 7 6)
        </div>
        <div>
          <Highlight>
            These refer to the sign that says{" "}
            <Mono>CHARLES M VEST STUDENT STREET</Mono>
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          “Cool” is the first word that comes to mind when I see this picture
          that was taken just last year. The contrast with the red background is
          striking, and a mere drop is brought to life{" "}
          <Highlight>
            (The picture here is the famous “Milk Drop Coronet” picture, taken
            in 1957 by Harold Edgerton)
          </Highlight>
          —I don’t know how he did it, I can’t even begin to fathom the math{" "}
          <Highlight>(Course 18—Mathematics)</Highlight> of it.
        </div>
        <div>
          Scribble: I see the sign with his name like a “flashing light” when I
          look up along the infinite. (6 1 8 6 5)
        </div>
        <div>
          <Highlight>
            There is a sign along the third floor of the infinite that says{" "}
            <Mono>HAROLD E EDGERTON STROBE ALLEY</Mono>
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Huh, the planning in this region was pretty good{" "}
          <Highlight>
            (Course 11 at the time—City and Regional Planning)
          </Highlight>
          . It’s been half a century{" "}
          <Highlight>
            (Walker Memorial, which is being referenced here, was first used in
            1916, so now it is 1966)
          </Highlight>{" "}
          and the murals in this hall are still as pretty as ever{" "}
          <Highlight>
            (There is a scribble here that says “Is this a code I’m supposed to
            use? No, I don’t think I will”, this is a joke about Morss Hall
            (which sounds like Morse [code]))
          </Highlight>{" "}
          I don’t suppose that’s what students come here for, though.
        </div>
        <div>
          Scribble: I go for a group on the top floor whose name is on the door.
          They have a 4-letter acronym, not to be confused with another group in
          the basement. (3 3 5 7)
        </div>
        <div>
          <Highlight>
            The group here is <Mono>THE MIT RADIO SOCIETY</Mono> (which has
            acronym W1MX, not to be confused with WMBR in the basement)
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          OMG I got in! I’m currently on campus for CPW, and I can’t be happier-
          it’s the first time it’s open to all admitted students{" "}
          <Highlight>(This happened first in 1999)</Highlight>. Past students
          must have gone nuclear{" "}
          <Highlight>(Course 24—Nuclear Science)</Highlight> on admin to get
          them to finally do this. I especially love that building with the
          biggest lecture hall.{" "}
          <Highlight>
            (This last bit refers to the biggest lecture hall on campus, 26-100)
          </Highlight>
        </div>
        <div>
          Scribble: That building now has loads of bananas. Well, I work at the
          lab a floor above that. If you don’t know what it is, check out the
          “chilly” sign up above! (6 3 9 5)
        </div>
        <div>
          <Highlight>
            There is the sign for the lab above the Banana Lounge, it says{" "}
            <Mono>CENTER FOR ULTRACOLD ATOMS</Mono>
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Oh how I wish I could be back on campus. Zoom really doesn’t have the
          same kind of charm.{" "}
          <Highlight>(This happened during the pandemic, in 2020)</Highlight>{" "}
          (Btw did you know it’s actually Zoom Communications? We just drop the
          last word). My friends keep making fun of me, the stereotype really is
          that MIT is filled with a bunch of geeks whose every action is
          mechanical
          <Highlight>(Course 2—Mechanical Engineering)</Highlight>.
        </div>
        <div>
          Scribble: Lol every time I pass by that “street sign” beneath the
          Gala, I’m reminded of it (4 4)
        </div>
        <div>
          <Highlight>
            The “street sign” here is that of a hack from the past, which says{" "}
            <Mono>NERD XING</Mono>
          </Highlight>
        </div>
      </DiaryEntry>
      <DiaryEntry>
        <div>Dear Diary,</div>
        <div>
          Look at what they’re doing now. I don’t think frosh should have an
          option to not be a part of a mailing list like this{" "}
          <Highlight>
            (This was in 2024, when the mailing list Dormspam was made opt-in)
          </Highlight>
          , where’s the humanity <Highlight>(Course 21—Humanities)</Highlight>{" "}
          in that? I feel like it splits the students into two, those who now
          opt-in and those who don’t. But it was such a good way to tell
          everyone something, even if that something was announcing a ticket
          sale in Lobby 10.
        </div>
        <div>
          Scribble: What’s that written beside the elevators over there? (6 11
          7)
        </div>
        <div>
          <Highlight>
            Written beside the elevators in Lobby 10 (on the first floor, where
            a ticket sale might happen) is the text{" "}
            <Mono>BARKER ENGINEERING LIBRARY</Mono>
          </Highlight>
        </div>
      </DiaryEntry>
    </>
  );
};

export default Solution;
