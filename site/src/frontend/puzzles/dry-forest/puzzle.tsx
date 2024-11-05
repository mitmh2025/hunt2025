import React from "react";
import { createGlobalStyle, styled } from "styled-components";
import Deutsch from "./assets/Deutsch.ttf";
import Ink from "./assets/ink.png";

// Font from https://www.fontsquirrel.com/fonts/Deutsch-Gothic
const Fonts = createGlobalStyle`
  @font-face {
    font-family: "Deutsch";
    src: url(${Deutsch});
    font-weight: normal;
    font-style: normal;
  }
`;

const SizedImage = styled.img`
  width: 1.25ch;
  height: 1em;
  vertical-align: text-bottom;
`;

const InkBlotch = () => {
  return <SizedImage src={Ink} alt="●" />;
};

const FontParagraph = styled.p`
  font-family: "Deutsch";
`;

const Puzzle = () => {
  return (
    <>
      <Fonts />
      <p className="puzzle-flavor">
        After the last winter, swordsman Jürgen Parros released his most recent
        manuscript. Though it was splotched with ink in places, it contained
        detailed, riveting accounts of knights settling their differences on the
        battlefield.
      </p>
      <hr />
      <FontParagraph>
        An account of the first battle in the war between two noble houses. The
        invaders bore a curious coat of arms:{" "}
        <i>
          Argent, an annulet sable within which a wheel Or voided with a block
          letter {<InkBlotch />} sable cottised Or, at base a bar gemel Or
          enhanced within which a bar gemel sable within which a bar argent.
        </i>{" "}
        That of the defenders was equally curious:{" "}
        <i>
          Sable, an escutcheon argent voided with fess argent, in chief of which
          block letters{" "}
          {
            <>
              <InkBlotch />
              <InkBlotch />
            </>
          }{" "}
          argent, in base of which a crown argent, in chief a bar argent abased,
          in base a bar argent.
        </i>{" "}
        The lines of stalwart soldiers charged forward, each side breaking
        through briefly before being repelled. After the invaders broke through
        a second time, their champion challenged a defending knight to single
        combat. They exchanged heavy blows in turn, until one such blow from the
        invaders’ knight knocked loose the helmet of his opponent. The invader
        then pulled the defender’s tabard over his head, defeating him in
        embarrassing fashion, and the defenders’ line retreated to lick their
        wounds. The invaders retreated as well, presumably to gloat.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the third battle in the war between two noble houses. The
        invaders marched under most unorthodox heraldry:{" "}
        <i>
          Argent, an annulet azure debruised with a pile bevilly issuant from
          sinister azure, at chief a barrulet azure, in base a bar azure
          enhanced.
        </i>{" "}
        The defenders had an unusual standard as well:{" "}
        <i>
          Azure, a{" "}
          <>
            <InkBlotch />
            <InkBlotch />
            <InkBlotch />
            <InkBlotch />
            <InkBlotch />
          </>{" "}
          leaf argent, garnished with the entire name of the noble house argent,
          in base a bar argent enhanced.
        </i>{" "}
        How uncouth, to embellish one’s blazon with so many words? The invaders
        clearly had the better of this battle, penetrating the defenses several
        times, with the defenders striking only one serious blow at the
        invaders’ flank in response. Eventually, a knight from each side broke
        away from the lines of soldiers, circling from afar, each sizing the
        other up. Suddenly they lunged towards each other, the defending knight
        striking first with a vicious pommel blow, knocking the invader to the
        ground. The invader sprung back to his feet, and the two knights engaged
        again. Each struck at the other in turn, the invader hewing at his
        opponent’s armored ribs, the defender thrusting at his opponent’s face,
        stymied by his visor. The defender, vigorously dodging, lost his sallet;
        he in turn struck a high blow against the invader, but lost his footing
        and collapsed on top of him, both falling to the battlefield. After
        extricating themselves from the flanges of each other’s armor, the
        knights returned to their own ranks, their soldiers emboldened.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the first battle in the war between two noble houses. The
        invaders sported rare colors:{" "}
        <i>
          Argent, an annulet sable winged dexter itself charged with roundel
          tenné, a chief tenné.
        </i>{" "}
        The defenders marched under a garish flag:{" "}
        <i>
          Vert, a base argent with bar sable, a{" "}
          {
            <>
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
            </>
          }{" "}
          cottised argent and sable debrused with letter {<InkBlotch />}, at
          chief a bar argent.
        </i>{" "}
        The armies seemed evenly matched, with the defenders pushing the
        invading soldiers back and in turn being made to retreat. At one point,
        a defending knight tackled a common soldier and knocked him prone on the
        battlefield; a knight of the invading army came to his man’s defense.
        The defender, caught by surprise, managed only to knock loose the
        invader knight’s helmet before being knocked to the ground with a single
        blow and slinking away to rejoin his comrades.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the third battle in the war between two noble houses. The
        invaders displayed their banner:{" "}
        <i>
          Argent, a dolphin embowed sable with tail azure, at chief a barrulet
          azure, in base a bar vert cottised azure.
        </i>{" "}
        The defenders displayed their own:{" "}
        <i>
          Azure, a letter {<InkBlotch />} celeste voided with pile nowy issuing
          from the base in bend dexter in chief of which a lozenge gules, in
          base a bar celeste cottised gules.
        </i>{" "}
        The defenders were gaining the upper hand, having routed two bands of
        enemy soldiers. A knight strode forth from the ranks of the invaders and
        issued an overconfident challenge to a defending knight. He was soundly
        defeated, only able to land a single glancing blow, while the defender
        pummeled him repeatedly and eventually forced him to yield. The invader
        slunk away while the defending army cheered on their champion.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the second battle in the war between two noble houses. The
        invaders’ blazon was quite peculiar:{" "}
        <i>
          Argent, a chief azure, an annulet azure in chief once invected itself
          charged with a leaf gules debruised by a{" "}
          {
            <>
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
            </>
          }{" "}
          party per pale argent and sable, at base bars azure and celeste.
        </i>{" "}
        The defenders’ standard was more traditional, albeit gaudy:{" "}
        <i>
          Gules, a fess argent cottised Or, an escutcheon azure with orle Or the
          chief of which gules and garnished with the word{" "}
          {
            <>
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
            </>
          }{" "}
          argent charged with a lion’s head erased Or with eye gules, in chief a
          barrulet azure.
        </i>{" "}
        The invaders had the clear advantage, having outflanked the bedraggled
        defenders twice. A knight from each army took offense with each other,
        each knight striking an unchivalrous blow at the other’s back before
        turning face to face and locking swords. They began to swing wildly,
        striking only air, before the invader knight finally landed several
        solid blows on the defender and driving him to one knee.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the second battle in the war between two noble houses. The
        invaders had a distasteful coat of arms:{" "}
        <i>
          Azure, a chief tenné cottised argent, an annulet azure in chief once
          engrailed within which tenné all charged with the name of the noble
          house azure, in base three bars argent, tenné, and argent.
        </i>{" "}
        That of the defenders was ostentatious:{" "}
        <i>
          Azure, a star argent debruised with a crescent gules two bars argent
          with a gyron sinister azure semy of estoiles itself with a roundel
          gules cottised argent, the chief cottised gules and argent, the base
          cottised argent and gules.
        </i>{" "}
        The defenders were quite successful in repelling the invaders, and had
        confidently executed two counterattacks. As the lines of soldiers
        clashed again, a defending knight cravenly tripped an invading soldier.
        The invaders closed ranks around their comrade, and an invader knight
        took his place to face the defender. The two men circled and feinted
        before engaging and exchanging a few easily parried blows. With a strong
        riposte, the invader dislodged the defender’s helmet, but he swung too
        hard and allowed himself to be struck from behind. The defender rained
        down blow after blow upon him until he fell to the earth and limped back
        to safety.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the second battle in the war between two noble houses. The
        invaders had a simple standard:{" "}
        <i>
          Argent, a lion’s head erased to sinister argent, the chief and base Or
          cottised sable.
        </i>{" "}
        The defenders had a much more detailed blazon:{" "}
        <i>
          Vert, a fess argent, a bear’s head erased party per fess gules and
          vert indented cottised argent in chief of which a roundel Or, at base
          a barrulet argent.
        </i>{" "}
        After some time, the defenders outflanked the invaders and forced a
        brief retreat. The defenders were further incensed when a knight of the
        invaders struck a most ignoble blow against a defending soldier; he was
        subsequently attacked by many defenders at once (a similarly ignoble
        act, I will note!) A defender knight pulled the invader out of the melee
        and the two began rather ineffectual single combat, both knights failing
        to land any solid blows, and both eventually collapsing on top of each
        other. Each knight returned, abashed, to their own ranks.
      </FontParagraph>
      <hr />
      <FontParagraph>
        An account of the third battle in the war between two noble houses. The
        invaders bore peculiar heraldry:{" "}
        <i>
          Argent, the base gules cottised azure, charged with the word{" "}
          {
            <>
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
            </>
          }{" "}
          gules and the word{" "}
          {
            <>
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
              <InkBlotch />
            </>
          }{" "}
          azure, the cross of which instead displayed as a longsword, in chief
          two barrulets azure.
        </i>{" "}
        The defenders bore their own:{" "}
        <i>
          Azure, a base Or bars gemel argent and azure enhanced, an annulet Or,
          in chief of which a cow courant argent, in base of which two swords
          argent with hilts Or in saltire, hilts in base.
        </i>{" "}
        The battle was clearly over, the invaders routed, when chaos broke out.
        The armies came together one last time with such force and lack of
        purpose that they simply began pushing against each other like a pile of
        unruly pigs. Eventually two pairs of knights broke out from the pile.
        One pair struggled briefly, traded a couple blows, and fell to the
        ground. The fight between the other two was more spectacular - they
        circled around the battlefield, swinging heavily, nearly losing their
        balance. The defender nearly forced the invader to the ground before
        accepting his surrender and allowing him and his compatriots to retreat.
      </FontParagraph>
    </>
  );
};

export default Puzzle;
