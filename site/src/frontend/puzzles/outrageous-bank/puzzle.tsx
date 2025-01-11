import React from "react";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";

const DATA = [
  "O idee care se răspândește prin imitație în cadrul unui grup social",
  "Llavor d'alzina",
  "Nicht gerade, gebogen",
  "Perte périodique de plumes ou d'une couche externe",
  "Cosa si fa quando si ha sete",
  "Culoare între alb și negru",
  "Lo que hago dos veces para cortar una vez",
  "Doce pulgadas",
  "Founder of the PRC",
  "Lo que no es tuyo",
  "Loc pitoresc pentru cazare și mic dejun",
  "Cède facilement au toucher",
  "Termine breve per un potente veicolo a due ruote",
  "Limp",
  "Unitat bàsica de vers",
  "Hij is niet je zus",
  "Cóctel playero colombiano con tres licores",
  "Een deel van een boom of struik",
  "La pièce d'échecs la moins puissante",
  "Nickname for Margaret",
  "Spiritueller Lehrer",
  "Tawdry",
  "Een keuze zonder het juiste antwoord te weten",
  "Pertànyent a mi",
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">Where have I heard this song before?</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/sDvfnpNFVKU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <a
        className={COPY_ONLY_CLASS}
        href="https://www.youtube.com/watch?v=sDvfnpNFVKU"
      >
        [Video link]
      </a>
      <br className={COPY_ONLY_CLASS} />
      <details>
        <summary>Transcript</summary>
        <p>
          {DATA.map((datum, i) => (
            <React.Fragment key={i}>
              {datum}
              <br />
            </React.Fragment>
          ))}
        </p>
      </details>
    </>
  );
};

export default Puzzle;
