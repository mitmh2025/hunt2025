import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  border-spacing: 8px;
`;

const DATA: {
  name: string;
  link: string;
  keyword: string;
  index: number;
  letter: string;
}[] = [
  {
    name: "Rickroll",
    link: "https://knowyourmeme.com/memes/rickroll",
    keyword: "STRANGERS",
    index: 1,
    letter: "S",
  },
  {
    name: "Eat hot chip",
    link: "https://knowyourmeme.com/memes/eat-hot-chip-and-lie",
    keyword: "BISEXUAL",
    index: 4,
    letter: "E",
  },
  {
    name: "Bee Movie",
    link: "https://knowyourmeme.com/memes/bee-movie-script-according-to-all-known-laws-of-aviation",
    keyword: "AVIATION",
    index: 8,
    letter: "N",
  },
  {
    name: "IQ Rick & Morty",
    link: "https://knowyourmeme.com/memes/to-be-fair-you-have-to-have-a-very-high-iq-to-understand-rick-and-morty",
    keyword: "NARODNAYA VOLYA",
    index: 5,
    letter: "D",
  },
  {
    name: "Castellanos",
    link: "https://knowyourmeme.com/memes/a-drive-into-deep-left-field-by-castellanos",
    keyword: "HOME RUN",
    index: 6,
    letter: "U",
  },
  {
    name: "Mesothelioma",
    link: "https://knowyourmeme.com/memes/mesothelioma-ad-copypasta",
    keyword: "MESOTHELIOMA",
    index: 3,
    letter: "S",
  },
  {
    name: "Navy seal",
    link: "https://knowyourmeme.com/memes/navy-seal-copypasta",
    keyword: "GORILLA",
    index: 2,
    letter: "O",
  },
  {
    name: "Holds up spork",
    link: "https://knowyourmeme.com/memes/katy-t3h-pengu1n-of-d00m",
    keyword: "RANDOM",
    index: 3,
    letter: "N",
  },
  {
    name: "Who was phone",
    link: "https://knowyourmeme.com/memes/then-who-was-phone",
    keyword: "HONEY",
    index: 4,
    letter: "E",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle breaks one of the core rules of Mystery Hunt: you have to
        share information with other teams to solve it!
      </p>
      <p>
        Each team is given one{" "}
        <a href="https://archive.is/nVN8t" target="_blank" rel="noreferrer">
          emoji chain text
        </a>
        , also known as an{" "}
        <a
          href="https://knowyourmeme.com/memes/emojipasta"
          target="_blank"
          rel="noreferrer"
        >
          Emojipasta
        </a>
        . There are 9 variants in total, but each team only sees one. Each one
        explicitly says in the text, “Send this to 9️⃣other mystery hunt teams
        👬”.
      </p>
      <p>
        Teams are, therefore, supposed to send their emojipasta to hunters on
        other teams, and hopefully get back other ones in return. Once teams
        have acquired most or all of the 9 total emojipastas (as hinted by the
        number 9 in the forwarding instructions of each emojipasta), they can
        see the full set of emojipastas:
      </p>
      <hr />
      <p>
        We aren’t 🔲🔲🔲🔲🔲🔲🔲🔲🔲to affection 🏩 💌 ❤️‍🔥. You’re aware 👀of the
        guidelines 📏, as am I ☝️. A complete 🕳️devotion 🙏 is what i’m noodling
        🧠on. You wouldn’t ⛔receive this from another man 🧑‍💼. I just want to
        communicate 🗣️my sentiment 💭. I need 🪡 for you to comprehend 📚. Send
        this to 9️⃣other mystery hunt teams 👬. If you get zero 😵back, your
        mobile 📱phone has no 🚫juice 🧃. If you get 4️⃣back, you’re werking
        👯‍♀️🪩🕺that booty 🏴‍☠️. If you get all 9️⃣back, you’re chomping 🫦chips 🥔
        and perjuring 🙊🙊🙊with the best 🤩!
      </p>
      <p>
        Any lady 💃birthed past the early 🌅90’s 💾is unable to prepare 🍳food
        🌭… their only knowledge 🧠is Burger 🍔King 👑, power ⚡️up👆they cell
        📱, shake 🪇butt 🧈, be 🔲🔲🔲🔲🔲🔲🔲🔲, consume spicy 🥵potato 🥔, and
        fabricate🏗️👷‍♀️🪡. Send this to 9️⃣other mystery hunt teams 👬. If you get
        none 🫥 back 😭you’re confined 🪢 to what mankind considers possible
        😪If you get 8️⃣back you’re ready to get your body 🛌off the ground ⛳.
        If you get all 9️⃣back then you’re lifting off 🛫 and soaring! 📈
      </p>
      <p>
        In line 📈 with each agreed-upon code 🤝 🔐of 🔲🔲🔲🔲🔲🔲🔲🔲, an
        apiforme 🐝 simply cannot ⛔be cap🧢able of liftoff 🚀. Its membraneous
        appendages 💪 are not big enough 🤏 to lift 🛗its tiny obese carcass 💀
        from the earth 🌍. The apiforme 💤, naturally, soars 🕊️ regardless 😗,
        since members of its family 👨‍👨‍👧‍👧disregard what people 🧍consider
        achievable 🏆. Send this to 9️⃣ other mystery hunt teams 👬. If you get
        none back you’re cryptically ⚰️referring to Turgenev’s Russian 🇷🇺 epic
        📕 📖 😔if you get 5️⃣back you’ve got the intellectual 🧠capacity ⚡ to
        appreciate the jokes 🃏. If you get all 9️⃣back then the ladies 😎can see
        👁️your tattoo ✍️!{" "}
      </p>
      <p>
        well 😏 by all accounts 💸you must have intelligence 🤓 in the topmost
        🔝 percentage 📈 to comprehend Ralph 👴 and Morgan 👦. The jokes 😆 are
        intensely 😵understated 🪫; if one were lacking 🫥 a sturdy 🪵 hold 🤝
        of abstract 💭science 🧑‍🔬, many of the japes would fly 🪁🪂 above the
        standard audience’s cranium 😶‍🌫️. additionally ➕, there’s Ralph’s cynical
        viewpoint 🔭, which is adeptly interlaced 🪡🧵into his psyche 🤯- his
        internal tenets 📝 pull deeply 🎣 from 🔲🔲🔲🔲🔲🔲🔲🔲🔲 🔲🔲🔲🔲🔲
        books 📚, as an example. Send this to 9️⃣other mystery hunt teams 👬. If
        you get none ❎back, it’s a shutout game. If you get 6️⃣back, you’re
        working for Wolf 🦊. If you get all 9️⃣back, you’re a man 👱of god ⛪ ⛩️
        🛕 🕍 🕌.
      </p>
      <p>
        I’m proud 🏳️‍🌈of me ☝️and believe 🧠that I am a person 🧑‍of religion 🙏📿
        🙏, as there’s a ball ⚾hit into the far left ☭☭☭ lawn by Castellanos 🟥
        🧢and that will end up a 🔲🔲🔲🔲 🔲🔲🔲. Therefore, it’s a four 🏌️- oh
        🅾️game. I’m unsure 🤔if I will don these headphones 🎧🎧🎧again. I’m
        unaware 🤐if i will wear them 🎧for the crimsons 🟥. I have no idea
        ⛔💡if it will be for my super 🦸visors 🧢at Coyote 🦊. Send this to
        9️⃣other mystery hunt teams 👬. If you get zero 😵back, it’s ☠️
        metastasized ☠️. If you get 3️⃣back, you’re getting legislation ⚖️
        🧑‍⚖️counsel ⛑️. If you get all 9️⃣back, you’re entitled to a cash 💰payout!
      </p>
      <p>
        If you 🫵or someone you care 👨‍❤️‍👨for came down with
        🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲, you might qualify ✍️for cash 💰 🤑 💵payment.
        That ◀️ is a unusual ⁉️carcinoma 🦠caused by a fibrous 🧪mineral 🪨.
        Contact 👁️👈with that mineral 💎in marinas 🚢, factories 🏭, HVAC
        systems 🥵, buildings 🏗️, or cars 🚗can get you 😵😵😵. Don’t wait,
        phone 1-800 LEGAL ⚖️ AMERICA 🇺🇸right away ⏲️for no-cost 🛑 💰law
        🧑‍⚖️advice 💁and money 🤑pamphlet 📜! Send this to 9️⃣ other mystery hunt
        teams 👬. If you don’t get any 🙅 back 🔙, you’re erased ✏️ from the
        land mass 🌎! if you get 2️⃣ back, you’re starting ▶️ to think 💭 again.
        If you get all 9️⃣back then you’re primed ⚔️ for the tempest! ⛈️
      </p>
      <p>
        what 🤬 did i just 🤬hear from you, you tiny female ♀️ dog 🐕? i placed
        first 🥇 among my peers ⚓️ in the blue 🟦 sea lions 🦭, and i’ve often
        been present 🎁 for covert 🕵️ attacks on terrorist 👿 organizations, and
        I have a body 🪦 count 🔢 of several hundred 😵. i was 🏫 educated 🎒 in
        🔲🔲🔲🔲🔲🔲🔲strategy 🗺️and i am the most 🔝decorated 🎖️of my rank in
        my whole 🕳️ country’s 🇧🇫 army 🪖. to me, you mean naught ⛔but another
        big-box store 🎯. Send this to 9️⃣other mystery hunt teams 👬. If you get
        ZERO ❌ back ◀️ you’re lowering your 🍴spork 😔if you get 3️⃣back you’re
        making friends 👫and waffles 🧇🧇 🧈🍁if you get all 9️⃣back, you’re T3H
        BEST 🔝^_^ 🔝 UwU at making alot of new SPONTANEOUS 🙃 😀🙃 freinds
        🤝!!!
      </p>
      <p>
        h0wdy 🤠 all 👋ive just 🛬 arrived 🈁❣️!!!❗!! * 🔼 raises 🏕️ camp
        cutlery 🥄🍴* i’m called kathy 🦗 but u 🫵 can refer to me 💁 as the auk
        🦤 of calamity 💀💣:!!!!!! lmao 😂🤣.. u can all 👨‍👩‍👦‍👦tell 🗣️ that i’m very
        ❗ ✓🔲🔲🔲🔲🔲🔲!!! such is the reason i’m in this ⬇️ place 🌐 💻, 2
        connect with spontaneous 🧀 folks as myself ^_^ i’m 156 months 👧 of age
        (but sophisticated 🍷!!) i enjoy viewing 👁️Intruder 👾Zed 👽 alongside
        my sweetheart 👩‍❤️‍💋‍👩(im queer 🏳️‍🌈👭 if u disagree get 👏over 👏 it 👏🙄 💁)
        it’s our topmost 😍 production 📺 to view 🛋️!! on account 📝 of it’s
        COMPLEEEEETELY irregular 🚫⬛!!! Send this to 9️⃣ other mystery hunt
        teams 👬. If you get none ⛔️back ⏮️, you’re calling 📱a dead 😵🪦☠️ dad
        🧓. If you get 4️⃣back, yur kissing 😽💋😘ur lady 👧. If you get all
        9️⃣back, THEN YOU 🫵WERE CELLPHONE 📱📱📱!
      </p>
      <p>
        So ur 👉with ur 👉🔲🔲🔲🔲🔲 and yur 👉kissing 😽💋😘 when your cell
        ☎️goes off 📲. U pick it 🆙n the speaker 🗣️is “wut ❓❔❓r u
        accomplishing 💪with my child 👨‍👧?” U relay 📣to ur lady 💃 n she say 📣
        “my father 🧓is deceased 😵🪦☠️”. THEREFORE WHENCE 😳😳😳 HANDSET 👋🂡🂡🂡
        WAS??? Send this to 9️⃣other mystery hunt teams 👬. If you get none
        😶back, I won’t forfeit ❌you above 🆙. If you get 1️⃣back, I won’t lease
        🏠you below 🔽. If you get all 9️⃣back, I won’t jog 🏃in a circle ⚫and
        maroon 🏝️you.
      </p>
      <hr />
      <p>
        Each emojipasta has two parts: a “body section”, followed by a
        “forwarding section” (where it tells you to forward the text to 9 other
        teams). These are mismatched: the body section and the forwarding
        section are referencing two different well-known copypastas or memes.
        You can reassemble the original emojipastas and figure out the order by
        arranging them in a cycle: take the emoji pasta you’re given, and break
        it into the two sections—with the body section referencing copypasta A,
        and the forwarding section referencing copypasta B. Then, find the next
        one where the body section is referencing copypasta B and the forwarding
        section is referencing copypasta C, etc. The list above has the
        emojipastas in the order given by this cycle (so each forwarding section
        matches up with the following body section).
      </p>
      <p>
        It’s important to note that it’s ambiguous where the cycle starts, but
        the puzzle should be solvable regardless. Each forwarding section
        references outcomes for getting 0 responses back, getting 9 (all)
        responses back, and one more response number. Use the varying response
        number to index into the key word noted by the 🔲🔲🔲s in the body
        section of the emojipasta that matches that forwarding section:
      </p>
      <p>
        <StyledTable>
          <tr>
            <th>Copypasta</th>
            <th>Key word (🔲s)</th>
            <th>Index (from matching forwarding section)</th>
            <th>Letter</th>
          </tr>
          {DATA.map(({ name, link, keyword, index, letter }, i) => (
            <tr key={i}>
              <td>
                <a href={link} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </td>
              <td>{keyword}</td>
              <td>{index}</td>
              <td>{letter}</td>
            </tr>
          ))}
        </StyledTable>
      </p>
      <p>
        Depending on where you start in the cycle, you could end up with
        something like <Mono>DUSONESEN</Mono>, but you can just rotate through
        until you get to <Mono>SEND US </Mono>. Teams then, as instructed, send
        a funny emoji chain text to HQ in exchange for the actual answer, which
        is
        <PuzzleAnswer>xPIDAKALA WAR</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
