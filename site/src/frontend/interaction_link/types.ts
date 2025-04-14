export type InteractionLinkState = {
  epoch: number;
  interactionLinks: Record<
    string /* trigger slug */,
    { title: string; slug: string } /* interaction */
  >;
};
