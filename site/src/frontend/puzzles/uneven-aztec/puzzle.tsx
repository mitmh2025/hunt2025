import React from "react";
import { styled } from "styled-components";

const LargeText = styled.div`
  font-size: 24px;
`;

const Italics = styled.span`
  font-style: italic;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FullAccessButton = styled.span`
  background-color: #cfe2f3;
  border: 1px solid black;
  border-radius: 8px;
  height: 80px;
  font-size: 36px;
  padding: 8px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <LargeText>
        Redd, Scott and Will, Brad. (2002) “They Might Be Grad Students, But
        They’ve Got Your Number” <Italics>Mystery</Italics>, vol. 718, no. 3,
        pp. 876-962.
      </LargeText>
      <p>
        The ruthless, militant restriction of open access to scientific research
        is a critically important issue, not just for scholars, but for the
        entire world. In every scientific field, underpaid, sleep-deprived
        graduate students have had the experience of having their article
        rejected, wanting to see what other papers made the cut, and being
        unable to access the journal to review any other accepted papers.
        Placing research behind paywalls, avaricious admins and shady scientific
        journal editors have expended great effort to hide all but the first few
        pages of each scientific paper: flying into a rage because they cannot
        access all the journals they need to support their research will be very
        familiar to academics from smaller institutions, and restricting
        journals behind paywalls keeps the most useful parts of papers
        uninformative. Research is made inaccessible out of pure malice; run of
        the mill academics are embittered by the proliferation of unnecessary
        scientific journal paywalls. This will have catastrophic ramifications
        on the forward progress of science if the money grab is left unchecked;
        one journal CEO simply replied “Pay up, you [expletive] cheapskates!”
        when asked to comment.
      </p>
      <ButtonWrapper>
        <FullAccessButton>Get full access to record</FullAccessButton>
      </ButtonWrapper>
      <LargeText>Reference List</LargeText>
      <div>
        J. Adam. “Supply and Demand in the Labor Market”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Anhinga. “Metaphysical Kinematics of Passerine Habitation”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Ariadne. “Methods of Improving Tensile Strength of Natural Fibers”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bush. “Lesser Known Leaders of the Americas in the 19th Century”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Allman. “Investigating Polyphonic String Instruments”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bruit. “A Statistical Overview of Auditory Thresholds in Healthy
        Adults” <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bury. “Recent Advances in Embalming Technology”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Buuren. “Negotiation Strategies to Protect Against Bargainers in Bad
        Faith” <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Blåhval. “An Ontology of Charismatic Fauna”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bawd. “An Analysis of Common Spelling Bee Errors”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Auric. “Antagonist Archetypes in Genre Film”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bloom. “Atypical Color Phenomena in Extreme Weather Events”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Belligerent. “Behavioral Studies of Children Exhibiting
        Characteristics of Oppositional Defiant Disorder”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bronze. “Meaningful Numerals in Ancient and Modern Religion”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Alt. “Societal Effects of Inherited Positions in Post-Industrial
        Organizations” <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Berg. “Characteristics of Successful Deep-Cover Agents Throughout
        History” <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Apelido. “Naming Patterns in Cantonese-Speaking American Immigrants”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Antoinette. “Hairstyles Through the Ages” <Italics>Mystery</Italics>,
        vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Alter. “Comparison of Experiences of Octogenarians and Nonagenarians”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Broad. “Chromosomal Abnormalities in Adults”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. America. “A Polemic on the Virtues of Crossing Picket Lines”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Astley. “Accessibility Options for Musicians with Limited Vision”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Bezos. “Usage of Hair Dye in Patients with Male-Pattern Baldness”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Asterix. “Exploring the Use of Onomatopoeias in Visual Media”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Babe. “Arachnids Commonly Found in Subterranean Levels of Human
        Living Spaces” <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Aint. “Origins and Development of Negatory Slang Terminology”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
      <div>
        J. Angulata. “Protective Adaptations of Terrestrial Gastropods”{" "}
        <Italics>Mystery</Italics>, vol. 718, no. 3, pp. 876-962.
      </div>
    </>
  );
};

export default Puzzle;
