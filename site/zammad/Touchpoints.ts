export type TouchpointType = {
  type: "submission" | "activity" | "pickup";
  description: string;
  created_if:
    | { type: "slug_unlocked"; slug: string }
    | { type: "slug_partially_solved"; slug: string; answer: string }
    | { type: "gate_satisfied"; gate: string; puzzle_slug: string };
  closed_action?: { type: "satisfy_gate"; gate: string };
};

const Touchpoints = {
  half_baked_submission: {
    type: "submission",
    description: "Submission: GIVE US DOUGH",
    created_if: {
      type: "slug_partially_solved",
      slug: "half_baked",
      answer: "GIVE US DOUGH",
    },
  },
  dada_shaves_split_ends_activity: {
    type: "activity",
    description: "Activity: LAUNCH DART AT TGT IPO",
    created_if: {
      type: "slug_partially_solved",
      slug: "dada_shaves_split_ends",
      answer: "LAUNCH DART AT TGT IPO",
    },
  },
  in_communicado_tonight_activity: {
    type: "activity",
    description: "Activity: In Communicado Tonight",
    created_if: {
      type: "slug_unlocked",
      slug: "in_communicado_tonight",
    },
  },
  in_communicado_tonight_submission: {
    type: "submission",
    description: "Submission: LAST CALL",
    created_if: {
      type: "slug_partially_solved",
      slug: "in_communicado_tonight",
      answer: "LAST CALL",
    },
  },
  a_recipe_for_success_submission: {
    type: "submission",
    description: "Submission: FLIRT WITH BARTENDER",
    created_if: {
      type: "slug_partially_solved",
      slug: "a_recipe_for_success",
      answer: "FLIRT WITH BARTENDER",
    },
  },
  kindred_spirits_pickup: {
    type: "pickup",
    description: "Pickup: BUY A FLIGHT",
    created_if: {
      type: "slug_partially_solved",
      slug: "kindred_spirits",
      answer: "BUY A FLIGHT",
    },
  },
  mitropolitan_house_of_fashion_submission: {
    type: "submission",
    description: "Submission: WORK IT AT OUR GALA",
    created_if: {
      type: "slug_partially_solved",
      slug: "mitropolitan_house_of_fashion",
      answer: "WORK IT AT OUR GALA",
    },
  },
  drunkens_and_flagons_pickup: {
    type: "pickup",
    description: "Pickup: GO PAY TAB",
    created_if: {
      type: "slug_partially_solved",
      slug: "drunkens_and_flagons",
      answer: "GO PAY TAB",
    },
  },
  art_history_submission: {
    type: "submission",
    description: "Submission: [Alternate Diamond History]",
    created_if: {
      type: "slug_partially_solved",
      slug: "art_history",
      answer: "TAKE OUT FINGERPAINTS MAKE UP ALTERNATE STOLEN DIAMOND HISTORY",
    },
  },
  eponymous_forensic_accountant_pickup: {
    type: "pickup",
    description: "Pickup: Eponymous Forensic Accountant",
    created_if: {
      type: "slug_unlocked",
      slug: "eponymous_forensic_accountant",
    },
    closed_action: { type: "satisfy_gate", gate: "ptg01" },
  },
  the_inspectre_pickup: {
    type: "pickup",
    description: "Pickup: The Inspectre",
    created_if: { type: "slug_unlocked", slug: "the_inspectre" },
    closed_action: { type: "satisfy_gate", gate: "ptg02" },
  },
  synthetic_tagsonomy_pickup: {
    type: "pickup",
    description: "Pickup: Synthetic Tagsonomy",
    created_if: { type: "slug_unlocked", slug: "synthetic_tagsonomy" },
    closed_action: { type: "satisfy_gate", gate: "mdg02" },
  },
  mystery_os_pickup: {
    type: "pickup",
    description: "Pickup: Mystery O’s",
    created_if: { type: "slug_unlocked", slug: "mystery_os" },
    closed_action: { type: "satisfy_gate", gate: "sog01" },
  },
  educational_rite_of_passage_pickup: {
    type: "pickup",
    description: "Pickup: Educational Rite of Passage",
    created_if: { type: "slug_unlocked", slug: "educational_rite_of_passage" },
    closed_action: { type: "satisfy_gate", gate: "mdg01" },
  },
  anything_is_popsicle_pickup: {
    type: "pickup",
    description: "Pickup: Anything is Popsicle",
    created_if: { type: "slug_unlocked", slug: "anything_is_popsicle" },
    closed_action: { type: "satisfy_gate", gate: "sog03" },
  },
  how_i_earned_my_gold_star_activity: {
    type: "activity",
    description: "Activity: WIN AT SUMO",
    created_if: {
      type: "slug_partially_solved",
      slug: "how_i_earned_my_gold_star",
      answer: "WIN AT SUMO",
    },
  },
  a_b_c_easy_as_1_2_3_submission: {
    type: "submission",
    description: "Submission: SPELL FOR US",
    created_if: {
      type: "slug_partially_solved",
      slug: "a_b_c_easy_as_1_2_3",
      answer: "SPELL FOR US",
    },
  },
  and_now_a_puzzling_word_from_our_sponsors_pickup: {
    type: "pickup",
    description: "Pickup: And Now, a Puzzling Word From Our Sponsors",
    created_if: {
      type: "gate_satisfied",
      gate: "ptg14",
      puzzle_slug: "and_now_a_puzzling_word_from_our_sponsors",
    },
    closed_action: { type: "satisfy_gate", gate: "ptg15" },
  },
  the_thief_activity: {
    type: "activity",
    description: "Activity: The Thief",
    created_if: {
      type: "slug_unlocked",
      slug: "the_thief",
    },
    closed_action: { type: "satisfy_gate", gate: "mdg13" },
  },
} satisfies Record<string, TouchpointType>;

export default Touchpoints;
export type TouchpointSlug = keyof typeof Touchpoints;
