import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { AuthorsNote } from "../../components/PuzzleLayout";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  let children: JSX.Element = <></>;
  if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg03")) {
    children = (
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
    );
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg04")) {
    children = (
      <p>
        Any lady 💃birthed past the early 🌅90’s 💾is unable to prepare 🍳food
        🌭… their only knowledge 🧠is Burger 🍔King 👑, power ⚡️up👆they cell
        📱, shake 🪇butt 🧈, be 🔲🔲🔲🔲🔲🔲🔲🔲, consume spicy 🥵potato 🥔, and
        fabricate🏗️👷‍♀️🪡. Send this to 9️⃣other mystery hunt teams 👬. If you get
        none 🫥 back 😭you’re confined 🪢 to what mankind considers possible
        😪If you get 8️⃣back you’re ready to get your body 🛌off the ground ⛳.
        If you get all 9️⃣back then you’re lifting off 🛫 and soaring! 📈
      </p>
    );
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg05")) {
    children = (
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
        👁️your tattoo ✍️!
      </p>
    );
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg06")) {
    children = (
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
    );
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg07")) {
    <p>
      I’m proud 🏳️‍🌈of me ☝️and believe 🧠that I am a person 🧑‍of religion 🙏📿
      🙏, as there’s a ball ⚾hit into the far left ☭☭☭ lawn by Castellanos 🟥
      🧢and that will end up a 🔲🔲🔲🔲 🔲🔲🔲. Therefore, it’s a four 🏌️- oh
      🅾️game. I’m unsure 🤔if I will don these headphones 🎧🎧🎧again. I’m
      unaware 🤐if i will wear them 🎧for the crimsons 🟥. I have no idea ⛔💡if
      it will be for my super 🦸visors 🧢at Coyote 🦊. Send this to 9️⃣other
      mystery hunt teams 👬. If you get zero 😵back, it’s ☠️ metastasized ☠️. If
      you get 3️⃣back, you’re getting legislation ⚖️ 🧑‍⚖️counsel ⛑️. If you get all
      9️⃣back, you’re entitled to a cash 💰payout!
    </p>;
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg08")) {
    <p>
      If you 🫵or someone you care 👨‍❤️‍👨for came down with
      🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲, you might qualify ✍️for cash 💰 🤑 💵payment.
      That ◀️ is a unusual ⁉️carcinoma 🦠caused by a fibrous 🧪mineral 🪨.
      Contact 👁️👈with that mineral 💎in marinas 🚢, factories 🏭, HVAC systems
      🥵, buildings 🏗️, or cars 🚗can get you 😵😵😵. Don’t wait, phone 1-800
      LEGAL ⚖️ AMERICA 🇺🇸right away ⏲️for no-cost 🛑 💰law 🧑‍⚖️advice 💁and money
      🤑pamphlet 📜! Send this to 9️⃣ other mystery hunt teams 👬. If you don’t
      get any 🙅 back 🔙, you’re erased ✏️ from the land mass 🌎! if you get 2️⃣
      back, you’re starting ▶️ to think 💭 again. If you get all 9️⃣back then
      you’re primed ⚔️ for the tempest! ⛈️
    </p>;
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg09")) {
    <p>
      what 🤬 did i just 🤬hear from you, you tiny female ♀️ dog 🐕? i placed
      first 🥇 among my peers ⚓️ in the blue 🟦 sea lions 🦭, and i’ve often
      been present 🎁 for covert 🕵️ attacks on terrorist 👿 organizations, and I
      have a body 🪦 count 🔢 of several hundred 😵. i was 🏫 educated 🎒 in
      🔲🔲🔲🔲🔲🔲🔲strategy 🗺️and i am the most 🔝decorated 🎖️of my rank in my
      whole 🕳️ country’s 🇧🇫 army 🪖. to me, you mean naught ⛔but another
      big-box store 🎯. Send this to 9️⃣other mystery hunt teams 👬. If you get
      ZERO ❌ back ◀️ you’re lowering your 🍴spork 😔if you get 3️⃣back you’re
      making friends 👫and waffles 🧇🧇 🧈🍁if you get all 9️⃣back, you’re T3H
      BEST 🔝^_^ 🔝 UwU at making alot of new SPONTANEOUS 🙃 😀🙃 freinds 🤝!!!
    </p>;
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg10")) {
    <p>
      h0wdy 🤠 all 👋ive just 🛬 arrived 🈁❣️!!!❗!! * 🔼 raises 🏕️ camp cutlery
      🥄🍴* i’m called kathy 🦗 but u 🫵 can refer to me 💁 as the auk 🦤 of
      calamity 💀💣:!!!!!! lmao 😂🤣.. u can all 👨‍👩‍👦‍👦tell 🗣️ that i’m very ❗
      ✓🔲🔲🔲🔲🔲🔲!!! such is the reason i’m in this ⬇️ place 🌐 💻, 2 connect
      with spontaneous 🧀 folks as myself ^_^ i’m 156 months 👧 of age (but
      sophisticated 🍷!!) i enjoy viewing 👁️Intruder 👾Zed 👽 alongside my
      sweetheart 👩‍❤️‍💋‍👩(im queer 🏳️‍🌈👭 if u disagree get 👏over 👏 it 👏🙄 💁) it’s
      our topmost 😍 production 📺 to view 🛋️!! on account 📝 of it’s
      COMPLEEEEETELY irregular 🚫⬛!!! Send this to 9️⃣ other mystery hunt teams
      👬. If you get none ⛔️back ⏮️, you’re calling 📱a dead 😵🪦☠️ dad 🧓. If
      you get 4️⃣back, yur kissing 😽💋😘ur lady 👧. If you get all 9️⃣back, THEN
      YOU 🫵WERE CELLPHONE 📱📱📱!
    </p>;
  } else if (teamState.rounds.the_missing_diamond?.gates?.includes("mdg11")) {
    <p>
      So ur 👉with ur 👉🔲🔲🔲🔲🔲 and yur 👉kissing 😽💋😘 when your cell
      ☎️goes off 📲. U pick it 🆙n the speaker 🗣️is “wut ❓❔❓r u accomplishing
      💪with my child 👨‍👧?” U relay 📣to ur lady 💃 n she say 📣 “my father 🧓is
      deceased 😵🪦☠️”. THEREFORE WHENCE 😳😳😳 HANDSET 👋🂡🂡🂡 WAS??? Send this
      to 9️⃣other mystery hunt teams 👬. If you get none 😶back, I won’t forfeit
      ❌you above 🆙. If you get 1️⃣back, I won’t lease 🏠you below 🔽. If you
      get all 9️⃣back, I won’t jog 🏃in a circle ⚫and maroon 🏝️you.
    </p>;
  } else {
    children = (
      <p>
        Something has gone wrong while unlocking this puzzle. Please contact HQ
        to get it sorted out.
      </p>
    );
  }

  return (
    <>
      <AuthorsNote>
        If you’re not sure what you’re allowed to do to solve this puzzle,
        please contact HQ.
      </AuthorsNote>
      {children}
    </>
  );
};

export default Puzzle;
