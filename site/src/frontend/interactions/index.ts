import ArtGalleryInteractionGraph from "./interview_at_the_art_gallery/graph";
// TODO: boardwalk
import CasinoInteractionGraph from "./interview_at_the_casino/graph";
import JewelryStoreInteractionGraph from "./interview_at_the_jewelry_store/graph";

export const INTERACTIONS = {
  interview_at_the_art_gallery: {
    title: "Interview at the Art Gallery",
    graph: ArtGalleryInteractionGraph,
  },
  interview_at_the_boardwalk: {
    title: "Interview at the Boardwalk",
    // TODO: implement
    // graph: BoardwalkInteractionGraph,
  },
  interview_at_the_casino: {
    title: "Interview at the Casino",
    graph: CasinoInteractionGraph,
  },
  interview_at_the_jewelry_store: {
    title: "Interview at the Jewelry Store",
    graph: JewelryStoreInteractionGraph,
  },
  meet_billie: {
    title: "Meet Billie",
  },
  the_crime_scene: {
    title: "The Crime Scene",
  },
  confront_carter: {
    title: "Confront Carter",
  },
  confront_gladys: {
    title: "Confront Gladys",
  },
  confront_katrina: {
    title: "Confront Katrina",
  },
  confront_papa: {
    title: "Confront Papa",
  },
  the_safehouse: {
    title: "The Safehouse",
  },
  the_vault: {
    title: "The Vault",
  },
};
