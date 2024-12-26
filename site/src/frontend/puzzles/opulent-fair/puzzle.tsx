import React from "react";
import { styled } from "styled-components";

const Left = styled.p`
  margin-right: 20%;
`;
const Right = styled.p`
  text-align: right;
  margin-left: 20%;
`;

const Puzzle = () => {
  return (
    <>
      <Left>
        Hey, Captain, another vessel sighted ahead. They’re signaling something.
      </Left>
      <Right>What’s the message?</Right>
      <Left>
        Not sure. Spelling something out, maybe? I think it reads TSJBH.
      </Left>
      <Right>
        …I’m not sure what they mean. Ask them what the rise and fall of the
        tide is… and ask what our magnetic bearing is from them. And let them
        know that if they have injured people, they could send them to us.
      </Right>
      <Left>
        Ok, I’ve strung it up. …Well, we’ve got a reply, after a fashion. THSB
        mean anything to you?
      </Left>
      <Right>
        Maybe they’ve heard of another vessel in distress. Ask them if they
        have. Although we have problems on our own… run up the message that we
        require a collision mat, maybe they’ll be able to respond.
      </Right>
      <Left>
        We have a new message, Captain. They’ve kept their flag up on the other
        mast. The first flag on this mast… I don’t recognize it! Have they hung
        their L sideways somehow? The flag also looks faded… Maybe TLBSR.
      </Left>
      <Right>
        Still doesn’t mean much to me. Do they look like they’re coming over
        this way? We better let them know that we’re carrying dangerous cargo.
      </Right>
      <Left>
        I’ll get to that right away. …They’ve strung up another set. T… B… then
        a pennant I don’t recognize, with a white cross… their sideways L… S.
      </Left>
      <Right>
        Could they be telling us that they’re having troubles? Let them know
        they shouldn’t abandon their vessel… and that our engines are stopped.
        We won’t be going any closer.
      </Right>
      <Left>Another response, Captain. TBSHR.</Left>
      <Right>
        Well… let them know we can send a boat over, I suppose? And don’t say
        anything yet, but prepare to send an SOS.
      </Right>
      <Left>
        Ok, I think this message is THJLS. Well, using that same strange L,
        anyway. I’m still not sure of it.
      </Left>
      <Right>Ah. Cancel the SOS. String that up.</Right>
      <Left>
        New message, Captain. TJBH. …Is that smoke on our deck?? And I’m getting
        communication over the radio! Unidentified vessel.
      </Left>
      <Right>
        Oh crap!! Ask who’s calling us, maybe they’ll be able to see. And
        there’s definitely something burning. Say we’re on fire.
      </Right>
      <Left>
        It looks like they are turning towards us, Captain, or maybe drifting.
        I’m worried. Their vessel looks really old, I don’t know that it has
        good maneuvering capabilities. …Ah, they’ve strung up THBJ.
      </Left>
      <Right>
        Well, tell them to maintain their current course. It isn’t safe for them
        to get any closer. And let them know that we have a doctor on board, if
        they need one.
      </Right>
      <Left>
        Huh, They’ve sent TBH… then a flag I don’t recognize. Blue with a gold
        square. The last one is S.
      </Left>
      <Right>
        That is strange. Let them know there’s sufficient depth of water. And… I
        may be interpreting their intent wrong, but just in case, let them know
        it’s not safe to fire any rockets right now. You’re right, though, that
        is a very old craft. I wouldn’t have guessed it was seaworthy.
      </Right>
      <Left>
        All right. They’ve sent TJRSB. You know, I was really interested in
        historic sailing vessels once. I would put that vessel at maybe 1840’s.
        And… I could be mistaken, but it looks like they’re sending boats out.
      </Left>
      <Right>
        That’s very old. A recreation, maybe? Or if not, where is it from? Well…
        Let them know they should try to land the boats where the light is
        showing, over there. Certainly not near us. Ask them where they’re bound
        for, maybe they’ll respond.
      </Right>
      <Left>They’ve now sent TSRH.</Left>
      <Right>That’s not good. Let them know that our anchor is foul.</Right>
      <Left>THSJ, Captain.</Left>
      <Right>
        Repeat our last message. And repeat that earlier message about sending
        over their injured. I think I’m starting to get a hang of what they
        want…
      </Right>
      <Left>
        Okay, they’ve now sent TRJB. They don’t look like they’re in good shape,
        although it looks much better than I’d expect a craft not updated since
        the 1840’s to look. I’ve just realized they kept T up on a separate mast
        and never took it down. Maybe I haven’t understood the messages right?
      </Left>
      <Right>
        Well, I’ve gotten in contact with the shore. Let them know a helicopter
        is coming to them, but that we’re not in our correct position to signal
        as a lightvessel. Ah, and finally, let them know that their distress
        signals are understood.
      </Right>
    </>
  );
};

export default Puzzle;
