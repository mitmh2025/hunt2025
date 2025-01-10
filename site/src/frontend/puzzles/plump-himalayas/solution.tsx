import React from "react";
import { Mono } from "../../components/StyledUI";

const Solution = () => {
  return (
    <>
      <p>
        For this puzzle, teams are tasked to send one person (specifically their
        “biggest escape room enthusiast”, hereafter called “the player”) to a
        specified location, and await further instructions. The rest of the team
        got a live interface with a stream of a room containing three walls,
        three posters, a “window” with a blind, a fire alarm, a shelf with a
        plant, a rug, a security camera, and a desk with a lamp and a box, among
        other things.
      </p>

      <p>
        When the player arrives on the stream, the display comes to life with
        two additional items: a list of tasks that need to be completed, and two
        drop downs that allow individual teammates to submit a verb and a noun.
        After a brief polling period, the verb and the noun with the most votes
        are sent to a screen in the room which displays
        <Mono>[VERB]</Mono> the <Mono>[NOUN]</Mono>. This is (theoretically) how
        teams are able to communicate to the player how to complete the tasks in
        the room.
      </p>

      <p>
        Initially, the only task is to <Mono>OPEN</Mono> the <Mono>CHEST</Mono>.
        Once the player inspects the chest and finds it locked, the following
        tasks appear:
      </p>

      <ul>
        <li>
          Draw the blinds: the player needs to pull the blind down. They find a
          picture leading to liquid.
        </li>
        <li>
          Toss the rubbish: the player needs to put all the scraps of paper into
          the wastebasket.
        </li>
        <li>
          Straighten the pictures: three pictures on various walls are not
          straight in their frames. The player needs to either level the frames
          or the pictures, depending on start state.
        </li>
        <li>
          Water the plant: the players can use the “ice water” they find to
          water a plant on a shelf.
        </li>
      </ul>

      <p>
        Upon completing these four tasks, a new task appears: Pull the fire
        alarm. Teams can send the commands to <Mono>PULL</Mono> the{" "}
        <Mono>LEVER</Mono> until their player does so. Once done, the far side
        panel of the desk opens and a skeleton falls out.
      </p>

      <p>These four new tasks are available for the team:</p>
      <ul>
        <li>
          Illuminate the skull: the skull of the skeleton is screwed into an
          edison socket on the torso. Once unscrewed, the player can unscrew the
          lightbulb from the desk lamp and screw in the skull. Upon doing so, a
          bulb inside of it lights up, and they can see “<Mono>I:9</Mono>”
          written in the eyes.
        </li>
        <li>
          Fork the outlet: the skeleton has a fork in one hand. The player needs
          to use the fork to poke into the exposed outlet into which the lamp is
          “plugged”. When they do, a lightbulb turns on behind the outlet cover
          and the player can read “<Mono>II:8</Mono>”.
        </li>
        <li>
          Hide the body: the skeleton’s torso is just short enough that it can
          be rolled up into the rug on the floor. On the bottom of the rug, the
          player can read a piece of tape that says “<Mono>III:7</Mono>”.
        </li>
        <li>
          Rotate the Camera: there is a security camera high up on the wall with
          the window and fire alarm. The player should hopefully be too short to
          reach it on their own, but they can use one of the skeleton’s detached
          legs to reach the camera and push it away. On the side of a piece of
          tape that says “<Mono>IV:2</Mono>”.
        </li>
      </ul>

      <p>
        Assuming the player has completed all of these tasks, the only thing
        left for them to do is <Mono>OPEN</Mono> the <Mono>CHEST</Mono>. They
        can use the combination <Mono>9872</Mono> to open the combo lock on the
        box on the desk. Doing so reveals a smaller chest with a keyed
        masterlock. If they have actually completed all the tasks (as opposed to
        spinning one of the dials of the lock), then the handle of the drawer in
        the middle of the desk slides down to reveal a tiny chamber with the key
        for the chest. The player <Mono>OPEN</Mono>s the <Mono>CHEST</Mono> to
        receive a note with their answer: <Mono>PIVOT TABLE</Mono>.
      </p>
    </>
  );
};

export default Solution;
