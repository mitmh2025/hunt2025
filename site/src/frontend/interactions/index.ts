import { VirtualInteractionHandler } from "./handler";
import ArtGalleryInteractionGraph from "./interview_at_the_art_gallery/graph";
import BoardwalkInteractionGraph from "./interview_at_the_boardwalk/graph";
import CasinoInteractionGraph from "./interview_at_the_casino/graph";
import JewelryStoreInteractionGraph from "./interview_at_the_jewelry_store/graph";

export type InteractionDefinition =
  | {
      title: string;
      type: "virtual";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- the types are too hard for me and won't matter for callers
      handler: VirtualInteractionHandler<any, any, any, any>;
    }
  | {
      title: string;
      type: "live";
      // TODO: allow specifying a function that returns a React component?
    };

export const INTERACTIONS: Record<string, InteractionDefinition> = {
  interview_at_the_art_gallery: {
    title: "Interview at the Art Gallery",
    type: "virtual",
    handler: new VirtualInteractionHandler(ArtGalleryInteractionGraph),
  },
  interview_at_the_boardwalk: {
    title: "Interview at the Boardwalk",
    type: "virtual",
    handler: new VirtualInteractionHandler(BoardwalkInteractionGraph),
  },
  interview_at_the_casino: {
    title: "Interview at the Casino",
    type: "virtual",
    handler: new VirtualInteractionHandler(CasinoInteractionGraph),
  },
  interview_at_the_jewelry_store: {
    title: "Interview at the Jewelry Store",
    type: "virtual",
    handler: new VirtualInteractionHandler(JewelryStoreInteractionGraph),
  },
  meet_billie: {
    title: "Meet Billie",
    type: "live",
  },
  the_crime_scene: {
    title: "The Crime Scene",
    type: "live",
  },
  confront_carter: {
    title: "Confront Carter",
    type: "live",
  },
  confront_gladys: {
    title: "Confront Gladys",
    type: "live",
  },
  confront_katrina: {
    title: "Confront Katrina",
    type: "live",
  },
  confront_papa: {
    title: "Confront Papa",
    type: "live",
  },
  the_safehouse: {
    title: "The Safehouse",
    type: "live",
  },
  the_vault: {
    title: "The Vault",
    type: "live",
  },
};
