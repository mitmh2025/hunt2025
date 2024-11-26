import React from "react";
import { styled } from "styled-components";

const Group = styled.div`
  margin-bottom: 1em;
`;

const Italic = styled.span`
  font-style: italic;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;

const Indented = styled(Group)`
  font-style: italic;
  margin-left: 3rem;
`;

const Name = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Group>
        <div>
          <Italic>
            <Underlined>Cast of Characters:</Underlined>
          </Italic>
        </div>
        <div>
          <strong>Victor</strong>
        </div>
        <div>
          <strong>Sally</strong>, Victor’s wife
        </div>
        <div>
          <strong>Edith</strong>, Victor and Sally’s teenage daughter
        </div>
        <div>
          <strong>Paul</strong>, Victor’s friend and coworker
        </div>
        <div>
          <strong>Robbie</strong>, Paul’s teenage son
        </div>
        <div>
          <strong>Theo R. York</strong>, Victor and Paul’s boss
        </div>
      </Group>
      <Indented>
        (Victor, Sally, and Edith arrive at a restaurant. Victor asks the waiter
        for a table for five. The waiter leads them to a table with five chairs
        carefully arranged around it. Victor, Sally, and Edith sit down, leaving
        two lone chairs.)
      </Indented>
      <Group>
        <Name>SALLY</Name>
        <div>
          I don’t know why I agreed to dinner with Paul. He acts like he’s part
          of the intelligentsia, peddling crazy theories all the time. I think I
          need to get a drink before he gets here.
        </div>
      </Group>
      <Indented>
        (Sally gets up to go to the bar, leaving Victor and Edith sitting across
        from each other.)
      </Indented>
      <Group>
        <Name>EDITH</Name>
        <div>
          I don’t think Paul is that bad. I think Mom just has a tin ear and
          refuses to listen to anything he says.
        </div>
      </Group>
      <Indented>
        (Sally returns with a glass of wine and sits back down; a few seconds
        later, Paul walks in and sits in one of the empty chairs.)
      </Indented>
      <Group>
        <Name>PAUL</Name>
        <div>
          Robbie will be here in a second—he’s texting with a friend outside.
          Sometimes I worry that he’ll be staring at that screen while he wastes
          away to nothing.
          <Italic>(His chair suddenly makes a loud creaking noise.)</Italic> I
          think this chair is broken, I’ll take it to the manager.
        </div>
      </Group>
      <Indented>
        (Paul picks up his chair and leaves the table with it, looking for a
        manager to complain to.)
      </Indented>
      <Group>
        <Name>VICTOR</Name>
        <div>
          Paul was just telling me about a terrible game of golf he played
          yesterday with Al; he couldn’t get any of the angles right. I told
          him, don’t blame trig on Al. Par, amid all the difficulties of the
          course, can be very hard to reach!
        </div>
      </Group>
      <Indented>
        (Paul returns, carrying a new chair, along with the manager, who is also
        carrying an extra chair. Paul sits down in his new chair, and the
        manager places the extra chair across from the other empty one.)
      </Indented>
      <Group>
        <Name>PAUL</Name>
        <div>
          We brought an extra chair in case the other one is broken too. We have
          to be careful—you never know when there will be a tremendous quake,
          plan around it!
        </div>
      </Group>
      <Indented>
        (Robbie finally walks in and sits in one of the empty chairs.)
      </Indented>
      <Group>
        <Name>PAUL</Name>
        <div>
          Glad my son decided to join us! Sometimes I feel like he barely pays
          any attention to his family. He’s already spent all day watching
          Spongebob Squarep—er, am I dallying too long on this rant?{" "}
          <Italic>
            (He sees Theo walk in and sit at a nearby table by himself.)
          </Italic>{" "}
          Oh, what a coincidence, our boss is here tonight too! Victor, why
          don’t we go join him for a bit?
        </div>
      </Group>
      <Indented>
        (Victor and Paul walk over and greet Theo, who is sitting at a table
        with two extra chairs. They sit in the chairs, arranging themselves
        evenly around the table.)
      </Indented>
      <Group>
        <Name>THEO</Name>
        <div>
          Sorry, I didn’t notice you when I came in. I was busy thinking about a
          climbing trip I’m leaving for tomorrow—we might rig on Alps, a narrow
          gorge, or in a cave!{" "}
          <Italic>(He notices Sally still sitting at the other table.)</Italic>{" "}
          Sally, why don’t you come join us!
        </div>
      </Group>
      <Indented>
        (Sally brings her chair over and joins Theo, Victor, and Paul at the
        table; they rearrange their chairs to make room for her.)
      </Indented>
      <Group>
        <Name>SALLY</Name>
        <div>
          Victor and I saw an interesting movie about classical musicians last
          night—it was called String Sextet, rated R, although maybe not for the
          reasons you’d think! Well, nice chatting, but I probably shouldn’t
          leave the kids alone for too long.
        </div>
      </Group>
      <Indented>
        (Sally leaves her chair behind at Theo’s table and returns to sit in one
        of the other empty chairs next to Robbie and Edith. She attempts to make
        awkward conversation with them.)
      </Indented>
      <Group>
        <Name>SALLY</Name>
        <div>
          Robbie, I heard you recently traded in your phone for an upgraded
          model. Great swap! Edith, don’t you agree?{" "}
          <Italic>
            (Edith and Robbie are both scrolling silently on their phones.)
          </Italic>{" "}
          Maybe we should invite Theo to join us over here.
        </div>
      </Group>
      <Indented>
        (Sally waves at Theo, Paul, and Victor to come back to their table and
        join them. They come over. Paul and Victor sit in the available empty
        chairs and Theo brings over an extra chair for himself. The others make
        room for him to fit in.)
      </Indented>
      <Group>
        <Name>PAUL</Name>
        <div>
          Speaking of classical music, did I tell you all about Robbie’s latest
          trumpet recital? He can do it all. He’d toot “A”, he’d rallentando, it
          was great!
        </div>
      </Group>
      <Indented>
        (The conversations continue; everyone has great chemistry and it shapes
        up to be a perfect evening.)
      </Indented>
    </>
  );
};

export default Puzzle;
