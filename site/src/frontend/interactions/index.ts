import { type FunctionComponent } from "react";
import { type InteractionState } from "../../../lib/api/contract";
import ConfrontCarter from "./confront_carter/interaction";
import ConfrontGladys from "./confront_gladys/interaction";
import ConfrontKatrina from "./confront_katrina/interaction";
import ConfrontPapa from "./confront_papa/interaction";
import ArtGalleryInteractionGraph from "./interview_at_the_art_gallery/graph";
import BoardwalkInteractionGraph from "./interview_at_the_boardwalk/graph";
import CasinoInteractionGraph from "./interview_at_the_casino/graph";
import JewelryStoreInteractionGraph from "./interview_at_the_jewelry_store/graph";
import TheCrimeScene from "./the_crime_scene/interaction";
import TheSafehouse from "./the_safehouse/interaction";
import TheVault from "./the_vault/interaction";
import { VirtualInteractionHandler } from "./virtual_interaction_handler";

export type InteractionDefinition =
  | {
      title: string;
      type: "virtual";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- types are hard
      handler: VirtualInteractionHandler<any, string, string, string>;
    }
  | {
      title: string;
      type: "live";
      component: FunctionComponent<{ interactionState: InteractionState }>;
    };

export const INTERACTIONS: Record<string, InteractionDefinition> = {
  interview_at_the_art_gallery: {
    title: "Interview at the Art Gallery",
    type: "virtual",
    handler: new VirtualInteractionHandler(
      "interview_at_the_art_gallery",
      ArtGalleryInteractionGraph,
    ),
  },
  interview_at_the_boardwalk: {
    title: "Interview at the Boardwalk",
    type: "virtual",
    handler: new VirtualInteractionHandler(
      "interview_at_the_boardwalk",
      BoardwalkInteractionGraph,
    ),
  },
  interview_at_the_casino: {
    title: "Interview at the Casino",
    type: "virtual",
    handler: new VirtualInteractionHandler(
      "interview_at_the_casino",
      CasinoInteractionGraph,
    ),
  },
  interview_at_the_jewelry_store: {
    title: "Interview at the Jewelry Store",
    type: "virtual",
    handler: new VirtualInteractionHandler(
      "interview_at_the_jewelry_store",
      JewelryStoreInteractionGraph,
    ),
  },
  the_crime_scene: {
    title: "The Crime Scene",
    type: "live",
    component: TheCrimeScene,
  },
  confront_carter: {
    title: "Confront Carter",
    type: "live",
    component: ConfrontCarter,
  },
  confront_gladys: {
    title: "Confront Gladys",
    type: "live",
    component: ConfrontGladys,
  },
  confront_katrina: {
    title: "Confront Katrina",
    type: "live",
    component: ConfrontKatrina,
  },
  confront_papa: {
    title: "Confront Papa",
    type: "live",
    component: ConfrontPapa,
  },
  the_safehouse: {
    title: "The Safehouse",
    type: "live",
    component: TheSafehouse,
  },
  the_vault: {
    title: "The Vault",
    type: "live",
    component: TheVault,
  },
};
