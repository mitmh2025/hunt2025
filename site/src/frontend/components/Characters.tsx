import React from "react";
import { styled } from "styled-components";
import BabyPhoto from "../hub/assets/baby.png";
import BilliePhoto from "../hub/assets/billie.png";
import CarterPhoto from "../hub/assets/carter.png";
import GladysPhoto from "../hub/assets/gladys.png";
import KatrinaPhoto from "../hub/assets/katrina.png";
import PapaPhoto from "../hub/assets/papa.png";
import RoverPhoto from "../hub/assets/rover.png";
import SidecarPhoto from "../hub/assets/sidecar.png";
import YouPhoto from "../hub/assets/you.png";

const PersonaSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-bottom: 2rem;

  h2 {
    padding: 0;
  }

  h3 {
    font-size: 1.5rem;
  }

  ul {
    padding: 0 0 0 1rem;
    margin: 0;
    border-left: 0.25rem solid var(--gold-500);
    list-style: none;
  }

  li + li {
    margin-top: 1rem;
  }
`;

const Persona = styled.li`
  display: flex;
  border: 1px solid var(--gold-700);
  border-radius: 2px;
  gap: 1rem;
  padding: 1rem;

  img {
    flex: 0;
    max-width: 180px;
    background-color: var(--gray-400);
    border-radius: 2px;
  }

  div.content {
    flex: 1;
  }

  p {
    font-weight: 300;
  }
`;

const Characters = () => {
  return (
    <>
      <h1>Characters</h1>
      <PersonaSection>
        <h2>The Suspects</h2>
        <ul>
          <Persona>
            <img src={PapaPhoto} />
            <div className="content">
              <a id="papa" />
              <h3>Robert “Papa” Finster (he/him)</h3>
              <p>
                Papa is the head of the Finster crime family that runs the
                MITropolis underworld. He’s a hard man who rose to the top the
                hard way, but rumors are he’s going soft in his old age. And
                while he’s our client, we can’t rule out that the old man isn’t
                somehow involved.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={GladysPhoto} />
            <div className="content">
              <a id="rover" />
              <h3>Gladys Finster (she/her)</h3>
              <p>
                Papa’s oldest daughter, Gladys is the face of the family’s
                legitimate front, Finster & Daughters Jewelers. Prim and proper.
                She’s engaged to Ferdinand Carter, but anyone with eyes can tell
                she’s not thrilled about it – she’s in it for the business.
                Maybe stealing the diamond is her way of avoiding an unwanted
                merger.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={BabyPhoto} />
            <div className="content">
              <a id="baby" />
              <h3>Teresa “Baby” Finster (she/her)</h3>
              <p>
                Papa’s youngest daughter, Baby is the wild child of the family.
                I should know, I’ve gotten her out of a few jams in the past.
                Nothing too serious, the sort of youthful indiscretions common
                to her generation – but her exploits tend to be a little more
                frequent and interesting than most. Maybe stealing the diamond
                is her idea of a practical joke.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={CarterPhoto} />
            <div className="content">
              <a id="carter" />
              <h3>Ferdinand Carter (he/him)</h3>
              <p>
                The scion of Carter Brothers Jewelers, Carter has recently
                returned from Europe with the famous Shadow Diamond, leverage
                he’s used to work his way into the Finster family – both
                financially and personally. He’s in love with Gladys, so he
                might be blinded to what’s going on. But maybe he’s got cold
                feet and decided not to let go of the diamond.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={SidecarPhoto} />
            <div className="content">
              <a id="sidecar" />
              <h3>Colt Sidecar (he/him)</h3>
              <p>
                Papa’s right hand man, Sidecar’s a mean bartender. Clever and
                loyal, he’s been with Papa since the beginning. But maybe too
                clever and not loyal enough. He certainly knows how to keep a
                secret. No one believes Sidecar is his real name, but also no
                one knows what it actually is. And a prize like the Shadow
                Diamond might be worth burning even the strongest bridges.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={RoverPhoto} />
            <div className="content">
              <a id="you" />
              <h3>Roy “Rover” Canoso (he/him)</h3>
              <p>
                Rover is the Finster family’s chauffeur and muscle. The family’s
                Duesenberg Model J is his pride and joy. The strong silent type,
                no one really knows what’s going on in that big head of his. He
                wants to climb higher in the organization, but Sidecar is
                standing in his way. But no one’s patience lasts forever. Taking
                the diamond might be his idea of a severance package.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={KatrinaPhoto} />
            <div className="content">
              <a id="katrina" />
              <h3>Katrina Jay (she/her)</h3>
              <p>
                Katrina is the latest in the long line of Baby’s belles. She’s a
                fashion designer fresh on the scene – no one knows much else
                about her. She’s the wild card in this. Maybe she’s using Baby
                to get closer to Finster Family resources. Maybe she’s using
                Baby to get her hands on the diamond. Or maybe she’s just a
                young woman in love.
              </p>
            </div>
          </Persona>
        </ul>
      </PersonaSection>
      <PersonaSection>
        <h2>The Extras</h2>
        <p>(Content about bartenders, "press", etc goes here)</p>
      </PersonaSection>
      <PersonaSection>
        <h2>The Detectives</h2>
        <ul>
          <Persona>
            <img src={BilliePhoto} />
            <div className="content">
              <a id="billie" />
              <h3>Billie O'Ryan</h3>
              <p>
                That’s me, Billie O’Ryan, private investigator. I’ve worked the
                streets of MITropolis for a while. I know the ins and outs of
                the city. I know not to trust anybody – including my clients.
                But it’s hard making it alone. I’m looking for a new partner at
                the Two P.I. Noir Detective Agency. Could be you.
              </p>
            </div>
          </Persona>
          <Persona>
            <img src={YouPhoto} />
            <div className="content">
              <a id="you" />
              <h3>You</h3>
              <p>
                This is a big case. I had to recruit some outside help. That’s
                you. You’re all recruits in the Billie O’Ryan Detective Academy.
                If you do a good enough job, you just might be that partner I’m
                looking for.
              </p>
            </div>
          </Persona>
        </ul>
      </PersonaSection>
    </>
  );
};

export default Characters;
