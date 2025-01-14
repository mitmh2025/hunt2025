import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";

export const DiaryEntry = styled.div`
  margin: 1em 0;
`;

const Blue = styled.div`
  color: #4a86e8;
  font-style: italic;
`;

const StyledImage = styled(LinkedImage)`
  display: block;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <StyledImage src={image1} alt="A page of diary entries" />
      <StyledImage src={image2} alt="A page of diary entries" />
      <StyledImage src={image3} alt="A page of diary entries" />
      <div className={COPY_ONLY_CLASS}>
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Look at what they’re doing now. I don’t think frosh should have an
            option to not be a part of a mailing list like this, where’s the
            humanity in that? I feel like it splits the students into two,
          </div>
          <Blue>Just like the final cluephrase for this!</Blue>
          <div>
            those who now opt-in and those who don’t. But it was such a good way
            to tell everyone something, even if that something was announcing a
            ticket sale in Lobby 10.
          </div>
          <Blue>
            What’s written on the plaque by the elevators over there? (6 11 7)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            OMG I got in! I’m currently on campus for CPW, and I can’t be
            happier—it’s the first time it’s open to all admitted students. Past
            students must have gone nuclear on admin to get them to finally do
            this. I especially love that building with the biggest lecture hall.
          </div>
          <Blue>
            That building now has loads of bananas. Well, I work at the lab a
            floor above that. If you don’t know what it is, check out the
            “chilly” sign up above! (6 3 9 5)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Somehow it’s been a decade since they dissolved that groovy lab, but
            the “temporary” building is still there. I still can’t stop thinking
            about it though. When I walk by, I can’t help but marvel at the
            physics of the building itself.
          </div>
          <Blue>
            It’s a different building now—some signs attached to the ceiling
            seem to claim there’s a road inside the building? That’s weird. (7 1
            4 7 6)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Hii! I just began my first year as a college student! I suppose it’s
            the first year for the school too. Seems appropriate to start
            cataloging things. I do like the classes here—practically, chemistry
            is all I need. Maybe that’s why I spent all my time having fun right
            beside campus.
          </div>
          <Blue>
            There’s a park right beside a church there now, what was it called,
            again? (6 6 4)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            It’s been fun here. All those years with my friends, going to those
            silly chemical engineering classes is going to be a thing of the
            past. Did you know, last summer I stayed at this luxury castle-like
            hotel across the river? They celebrated its two
          </div>
          <Blue>Ooh the same as the number of distinct extractions!</Blue>
          <div>
            year anniversary when I was there! It was right beside the
            river—makes sense, given its name.
          </div>
          <Blue>
            I still look at the building name in big black letters when I pass
            by it. (8 6 4)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Going to move into my new dorm. Oh hey, it’s a Moving Day, in more
            ways than one. It’s going to be a big transition, but I’m sure
            president Maclaurin will make sure everything goes smoothly. I’m
            glad there’s at least a gym on campus. It seems sufficiently
            sanitary, which is a relief, I don’t know what I’d expected.
          </div>
          <Blue>
            It’s not really a gym though, it’s an exam room. I do remember
            seeing the name of some sort of group that started with a G on a
            door in that building though. (8 7 7)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            “Cool” is the first word that comes to mind when I see this picture
            that was taken just last year. The contrast with the red background
            is striking, and a mere drop is brought to life—I don’t know how he
            did it,
          </div>
          <Blue>
            I see the sign with his name like a “flashing light” when I look up
            along the infinite. (6 1 8 6 5)
          </Blue>
          <div>I can’t even begin to fathom the math of it.</div>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Haha why would they even do this? There must be something wrong with
            the authors’ biologies for them to think this was a good idea. What
            is the point of writing a book about a building that you’re not even
            going to start building for another four years? It did turn out
            pretty nice though.
          </div>
          <Blue>
            I like looking at its name in those 3D silver letters now every time
            I pass by it. (6 7)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Oh how I wish I could be back on campus. Zoom really doesn’t have
            the same kind of charm. (Btw did you know it’s actually Zoom
            Communications? We just drop the last word).
          </div>
          <Blue>Just like you should with the final answer!</Blue>
          <div>
            My friends keep making fun of me, the stereotype really is that my
            school is filled with a bunch of geeks whose every action is
            mechanical.
          </div>
          <Blue>
            Lol every time I pass by that “street sign” a floor below the Gala,
            I’m reminded of it. (4 4)
          </Blue>
        </DiaryEntry>
        <br />
        <DiaryEntry>
          <div>Dear Diary,</div>
          <div>
            Huh, the planning in this region was pretty good. It’s been just
            over half a century since it was built and the murals in this hall
            are still as pretty as ever.
          </div>
          <Blue>
            Is this a code I’m supposed to use? No, I don’t think I will.
          </Blue>
          <div>I don’t suppose that’s what students come here for, though.</div>
          <Blue>
            I go for a group on the top floor whose name is on the door. They
            have a 4-letter acronym, not to be confused with another group in
            the basement. (3 3 5 7)
          </Blue>
        </DiaryEntry>
      </div>
    </>
  );
};

export default Puzzle;
