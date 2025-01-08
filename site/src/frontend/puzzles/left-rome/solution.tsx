import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import { Centered, StyledOl } from "./puzzle";

const DONUT_CARD_1: { quantity: number; flavor: string; extraction: string }[] =
  [
    { quantity: 3, flavor: "UNFLAVORED", extraction: "F" },
    { quantity: 2, flavor: "GOOSEBERRY", extraction: "O" },
    { quantity: 2, flavor: "BOYSENBERRY", extraction: "O" },
    { quantity: 8, flavor: "DEGLAZED", extraction: "D" },
    { quantity: 2, flavor: "ACAIBERRY", extraction: "C" },
    { quantity: 2, flavor: "DOGBERRY", extraction: "O" },
    { quantity: 2, flavor: "SUET", extraction: "U" },
    { quantity: 2, flavor: "FROSTEDFLAKE", extraction: "R" },
    { quantity: 5, flavor: "DORITOS", extraction: "T" },
  ];

const DONUT_CARD_2: {
  quantity: number;
  rotaries: number;
  flavor: string;
  extraction: string;
}[] = [
  { quantity: 3, rotaries: 3, flavor: "UNFLAVORED", extraction: "V" },
  { quantity: 2, rotaries: 1, flavor: "GOOSEBERRY", extraction: "O" },
  { quantity: 2, rotaries: 1, flavor: "BOYSENBERRY", extraction: "Y" },
  { quantity: 8, rotaries: 2, flavor: "DEGLAZED", extraction: "" },
  { quantity: 2, rotaries: 1, flavor: "ACAIBERRY", extraction: "A" },
  { quantity: 2, rotaries: 1, flavor: "DOGBERRY", extraction: "G" },
  { quantity: 2, rotaries: 1, flavor: "SUET", extraction: "E" },
  { quantity: 2, rotaries: 0, flavor: "FROSTEDFLAKE", extraction: "R" },
  { quantity: 5, rotaries: 2, flavor: "DORITOS", extraction: "S" },
];

const ROUTES: {
  maps: string[];
  mapsNote?: string;
  instructions: {
    direction: string;
    instruction: string;
    street: string;
    odo: number;
    speed: number;
    donuts: number;
    rules: ReactNode[];
  }[];
}[] = [
  {
    maps: [
      "https://www.google.com/maps/dir/84+Massachusetts+Avenue,+Cambridge,+MA/Upland+Rd,+Cambridge,+MA+02140/Dunkin'/@42.3905341,-71.1240469,19.33z/data=!4m60!4m59!1m25!1m1!1s0x89e370aa85e7d031:0xc059c647411922c3!2m2!1d-71.0948578!2d42.3591108!3m4!1m2!1d-71.0992454!2d42.3634044!3s0x89e37754976e81ed:0xa326f78077b460b0!3m4!1m2!1d-71.081053!2d42.3612356!3s0x89e370a419104401:0x76a990f3fa6a24fc!3m4!1m2!1d-71.1032489!2d42.3619963!3s0x89e3775678402625:0x8570a32b40b0c5ad!3m4!1m2!1d-71.1238987!2d42.3821533!3s0x89e3776ada055f43:0xf387c0e8d0c06a0c!1m25!1m1!1s0x89e37715ccec6e7d:0x4fb898d2e5ccd27d!2m2!1d-71.1242347!2d42.3871958!3m4!1m2!1d-71.1220845!2d42.3877961!3s0x89e3771613cce76f:0x818fa08be5bb8417!3m4!1m2!1d-71.124464!2d42.3883933!3s0x89e37716f4af0d27:0x4adc4978cb0e9927!3m4!1m2!1d-71.1232625!2d42.3880913!3s0x89e377166a24c7db:0x28583fa2264054f5!3m4!1m2!1d-71.1258626!2d42.3925746!3s0x89e37719e16f578f:0x3e0dea6282e3c463!1m5!1m1!1s0x89e3770af945dc3b:0x43dbe5675743a9ae!2m2!1d-71.1422949!2d42.3878514!3e0!5m1!1e2?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "BEGIN at 84 Massachusetts Avenue, facing northwest",
        street: "Mass Ave",
        odo: 0.0,
        speed: 25,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "4th SIGNAL",
        street: "Sidney St Ext",
        odo: 0.4,
        speed: 25,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Main St",
        odo: 0.4,
        speed: 25,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL “AREA FOUR”",
        street: "Main St",
        odo: 0.8,
        speed: 25,
        donuts: 0,
        rules: ["Rule RETEMODEEPS (sign reads AREA FOUR, record U)"],
      },
      {
        direction: "BR",
        instruction: "5th OPP",
        street: "Memorial Dr",
        odo: 1.4,
        speed: 30,
        donuts: 0,
        rules: ["Rule COMPLACENT (ODO 0.4-1.4 on Main St)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “LOW CLEARANCE”",
        street: "Main St",
        odo: 1.4,
        speed: 30,
        donuts: 0,
        rules: ["Rule SPEEDOMETER (sign reads DANGER LOW CLEARANCE, record N)"],
      },
      {
        direction: "",
        instruction: "OBSERVE HTS “DANFORTH ST”",
        street: "Memorial Dr",
        odo: 2.3,
        speed: 40,
        donuts: 0,
        rules: [
          "Rule WHEE",
          "Rule REARVIEW (November 2020)",
          "Rule SPEEDOMETER (sign reads DANFORTH ST, record F)",
        ],
      },
      {
        direction: "BR",
        instruction: "6th OPP",
        street: "BU Bridge Rotary",
        odo: 3.1,
        speed: 25,
        donuts: 2,
        rules: [
          "Rule WHEE (ODO 1.4-3.1 on Memorial Dr)",
          "Rule ROUNDABOUT (BU Bridge Rotary)",
          "Rule WOOP WOOP WOOP",
        ],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Brookline St",
        odo: 3.2,
        speed: 25,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Mass Ave",
        odo: 4.0,
        speed: 25,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “ART MATERIALS”",
        street: "Mass Ave",
        odo: 4.1,
        speed: 25,
        donuts: 2,
        rules: ["Rule SPEEDOMETER (sign reads BLICK ART MATERIALS, record L)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL “HARVARD SQUARE”",
        street: "Mass Ave",
        odo: 5.1,
        speed: 36,
        donuts: 2,
        rules: [
          "Rule HUNGRY (655 Mass Ave, Cambridge)",
          "Rule HUNGRY (1001 Mass Ave, Cambridge)",
          "Rule COMPLACENT (ODO 4.0-5.1 on Mass Ave)",
          "Rule RETEMODEEPS (sign reads CAMBRIDGE SAVINGS BANK, record A)",
        ],
      },
      {
        direction: "BL",
        instruction: "at Y",
        street: "Mass Ave",
        odo: 5.1,
        speed: 36,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "2nd OPP",
        street: "Shepard St",
        odo: 5.7,
        speed: 36,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Walker St",
        odo: 5.9,
        speed: 36,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Linnaean St",
        odo: 6.0,
        speed: 36,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Washington Ave",
        odo: 6.2,
        speed: 31,
        donuts: 2,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Upland Rd",
        odo: 6.4,
        speed: 31,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “MT VERNON ST”",
        street: "Upland Rd",
        odo: 6.6,
        speed: 31,
        donuts: 2,
        rules: ["Rule SPEEDOMETER (sign reads MT VERNON ST, record V)"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Richdale Ave",
        odo: 6.6,
        speed: 26,
        donuts: 2,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "2nd OPP",
        street: "Buena Vista Park",
        odo: 6.7,
        speed: 21,
        donuts: 2,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Cambridge Terrace",
        odo: 6.8,
        speed: 16,
        donuts: 3,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "AL",
        instruction: "2nd OPP",
        street: "Richdale Ave",
        odo: 6.9,
        speed: 11,
        donuts: 3,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Walden St",
        odo: 7.1,
        speed: 11,
        donuts: 3,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Mass Ave",
        odo: 7.2,
        speed: 11,
        donuts: 3,
        rules: ["Rule TORUS (record O)"],
      },
      {
        direction: "",
        instruction: "OBSERVE “RINDGE AVE”",
        street: "Mass Ave",
        odo: 7.4,
        speed: 11,
        donuts: 3,
        rules: ["SPEEDOMETER (sign reads RINDGE AVE, record R)"],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Rindge Ave",
        odo: 7.4,
        speed: 11,
        donuts: 3,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “JOHN D LYNCH”",
        street: "Rindge Ave",
        odo: 7.5,
        speed: 11,
        donuts: 3,
        rules: ["Rule RETEMODEEPS (sign reads JOHN D LYNCH SQUARE, record E)"],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Alewife Brook Parkway",
        odo: 8.2,
        speed: 11,
        donuts: 3,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “DUNKIN”",
        street: "Alewife Brook Parkway",
        odo: 8.6,
        speed: 14,
        donuts: 3,
        rules: [
          "Rule SPEEDOMETER (sign reads DUNKIN DONUTS, record D)",
          "Rule HUNGRY (201 Alewife Brook Parkway, Cambridge)",
        ],
      },

      {
        direction: "BR",
        instruction: "2nd OPP",
        street: "Concord Ave",
        odo: 8.8,
        speed: 19,
        donuts: 3,
        rules: ["Rule ROUNDABOUT (Double Donuts of Doom, North)"],
      },
      {
        direction: "BR",
        instruction: "4th OPP",
        street: "Concord Ave",
        odo: 8.9,
        speed: 27,
        donuts: 3,
        rules: ["Rule ROUNDABOUT (Double Donuts of Doom, South)"],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 9.1 miles",
        street: "517 Concord Ave, Cambridge",
        odo: 9.0,
        speed: 27,
        donuts: 3,
        rules: [
          <>
            Rule DONUTS (index 3 into UNFLAVORED to extract <strong>F</strong>)
          </>,
          <>
            Rule ROTARY (there have been three rotaries, increase the index by 3
            to extract <strong>V</strong>)
          </>,
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/Dunkin',+517+Concord+Ave,+Cambridge,+MA+02138/42.3861924,-71.1160724/@42.3872155,-71.1186921,17.59z/data=!4m24!4m23!1m20!1m1!1s0x89e3770af945dc3b:0x43dbe5675743a9ae!2m2!1d-71.1422949!2d42.3878514!3m4!1m2!1d-71.1362363!2d42.3937092!3s0x89e3770f7ae3c731:0x5fd6ad41cc6d0611!3m4!1m2!1d-71.1171437!2d42.3852489!3s0x89e3773e968ef88f:0x9ee027771cab63ce!3m4!1m2!1d-71.115429!2d42.3852713!3s0x89e3773ead96c25f:0x6f9fbc1a8d844ab2!1m0!3e0?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D",
      "https://www.google.com/maps/dir/42.386082,-71.116172/Broadsheet+Coffee+Roasters,+Kirkland+Street,+Cambridge,+MA/Union+Square+Donuts,+Bow+Street,+Somerville,+MA/Dumpling+Kitchen,+Highland+Avenue,+Somerville,+MA/Dunkin'/@42.398788,-71.1140872,16.04z/data=!4m53!4m52!1m6!3m4!1m2!1d-71.1160024!2d42.3770726!3s0x89e3774145cd0629:0x4bea15f7744099dc!4e1!1m10!1m1!1s0x89e377485b5ee149:0xb94d428b3a73dfe4!2m2!1d-71.1073471!2d42.3779745!3m4!1m2!1d-71.1008672!2d42.3809923!3s0x89e3773453e981a1:0x307a1a296f6baa43!1m10!1m1!1s0x89e370cb2c5868dd:0x4fa1bbd30c0c6648!2m2!1d-71.0972156!2d42.3808329!3m4!1m2!1d-71.1010948!2d42.3833708!3s0x89e377338875d61d:0xb63133331f60bed0!1m15!1m1!1s0x89e3772fea6cd2e5:0x931be7b910316f66!2m2!1d-71.1077242!2d42.3901999!3m4!1m2!1d-71.1011801!2d42.3932554!3s0x89e3772b8788af07:0x716c170e03def7a0!3m4!1m2!1d-71.1108798!2d42.3994703!3s0x89e376d80a59b0a9:0x1baacb31c280efb9!1m5!1m1!1s0x89e376d25b100b7b:0x7bff2ce524b6a8d2!2m2!1d-71.101947!2d42.4053774!3e0?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D",
    ],
    mapsNote:
      "Google Maps will not allow the route described in steps 7-8. This intersection has been checked in person and the legality of the turn has been confirmed. This issue has been reported to Google.",
    instructions: [
      {
        direction: "",
        instruction: "BEGIN at previous DIYC, facing northwest.",
        street: "Concord Ave",
        odo: 0.0,
        speed: 23,
        donuts: 0,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Alewife Brook Parkway",
        odo: 0.1,
        speed: 28,
        donuts: 0,
        rules: ["Rule ROUNDABOUT (Double Donuts of Doom, North)"],
      },
      {
        direction: "BR",
        instruction: "2nd SIGNAL",
        street: "Rindge Ave",
        odo: 0.5,
        speed: 31,
        donuts: 0,
        rules: ["Rule HUNGRY (201 Alewife Brook Parkway, Cambridge)"],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Mass Ave",
        odo: 1.3,
        speed: 31,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “SAUR”",
        street: "Mass Ave",
        odo: 1.9,
        speed: 34,
        donuts: 0,
        rules: [
          "Rule HUNGRY (1 White St, Cambridge)",
          "Rule SPEEDOMETER (sign reads BAGELSAURUS, record G)",
        ],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Forest St",
        odo: 2.1,
        speed: 29,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Beacon St",
        odo: 2.2,
        speed: 24,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "AL",
        instruction: "1st OPP",
        street: "Oxford St",
        odo: 2.3,
        speed: 19,
        donuts: 1,
        rules: ["Rule ANGRY", "Rule TORUS (record O)"],
      },
      {
        direction: "",
        instruction: "OBSERVE HTS “COFFEE”",
        street: "Kirkland Ave",
        odo: 3.4,
        speed: 24,
        donuts: 1,
        rules: [
          "Rule COMPLACENT",
          "Rule SPEEDOMETER (sign reads COFFEE, record O)",
        ],
      },
      {
        direction: "L",
        instruction: "4th OPP",
        street: "Hawkins St",
        odo: 3.9,
        speed: 19,
        donuts: 1,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "B",
        instruction: "at Y",
        street: "Lake St",
        odo: 4.0,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "2nd OPP",
        street: "Somerville Ave",
        odo: 4.2,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Warren Ave",
        odo: 4.4,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Bow St",
        odo: 4.4,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE HTS SOL “DONUTS”",
        street: "Bow St",
        odo: 4.4,
        speed: 19,
        donuts: 1,
        rules: ["Rule RETEMODEEPS (sign reads UNION SQUARE DONUTS, record S)"],
      },
      {
        direction: "BR",
        instruction: "1st SIGNAL",
        street: "Summer St",
        odo: 4.4,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "School St",
        odo: 4.7,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Somerville Ave",
        odo: 4.9,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "5th SIGNAL",
        street: "Lowell St",
        odo: 5.5,
        speed: 22,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Highland Ave",
        odo: 5.9,
        speed: 22,
        donuts: 1,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “DUMPLING”",
        street: "Highland Ave",
        odo: 5.9,
        speed: 22,
        donuts: 1,
        rules: ["Rule RETEMODEEPS (sign reads DUMPLING KITCHEN, record E)"],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Central St",
        odo: 6.2,
        speed: 25,
        donuts: 1,
        rules: [],
      },
      {
        direction: "BL",
        instruction: "1st SIGNAL",
        street: "Medford St",
        odo: 6.5,
        speed: 25,
        donuts: 1,
        rules: [],
      },
      {
        direction: "BL",
        instruction: "2nd SIGNAL",
        street: "Broadway",
        odo: 6.9,
        speed: 25,
        donuts: 1,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "2nd SIGNAL",
        street: "Boston Ave",
        odo: 7.3,
        speed: 28,
        donuts: 1,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “NEIGHBORHOOD”",
        street: "Boston Ave",
        odo: 7.3,
        speed: 28,
        donuts: 2,
        rules: ["Rule BERRY (sign for Neighborhood Produce, record BERRY)"],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Harvard St",
        odo: 7.5,
        speed: 28,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "3rd SIGNAL",
        street: "Mystic Ave",
        odo: 8.1,
        speed: 28,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 8.2 miles",
        street: "275 Mystic Ave, Medford",
        odo: 8.2,
        speed: 28,
        donuts: 2,
        rules: [
          <>
            Rule DONUTS (index 2 into GOOSEBERRY to extract <strong>O</strong>)
          </>,
          <>
            Rule ROTARY (there has been one rotary, increase the index by 1 to
            extract <strong>O</strong>)
          </>,
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/Dunkin'/Dunkin'/@42.4243916,-71.0682943,18.88z/data=!4m54!4m53!1m45!1m1!1s0x89e376d25b100b7b:0x7bff2ce524b6a8d2!2m2!1d-71.101947!2d42.4053774!3m4!1m2!1d-71.1016062!2d42.405312!3s0x89e376d249b55027:0x81b147c39de7e8e2!3m4!1m2!1d-71.1071027!2d42.4040575!3s0x89e376d1209d4991:0x42aaada1fb03d359!3m4!1m2!1d-71.1044929!2d42.3997881!3s0x89e376d641fe82a7:0xc8a3102d0fe31527!3m4!1m2!1d-71.1051604!2d42.4018185!3s0x89e376d6e8e282db:0xa0fdf882b6ec1685!3m4!1m2!1d-71.1075981!2d42.4052023!3s0x89e376d0fbd9be31:0x5dbd5cb7f60e8d67!3m4!1m2!1d-71.1080827!2d42.4177724!3s0x89e376b7fd5f2891:0x86b5ac7620aee590!3m4!1m2!1d-71.1051705!2d42.4180696!3s0x89e376b63974ddd1:0x46350fb5eeb5e866!3m4!1m2!1d-71.0710207!2d42.4253545!3s0x89e371672e16dfef:0x3a72f0cf96e076db!1m5!1m1!1s0x89e371646f2f2981:0x16c2057c8a37695c!2m2!1d-71.065529!2d42.4238951!3e0!5m1!1e2?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "BEGIN at previous DIYC, facing southeast.",
        street: "Mystic Ave",
        odo: 0.0,
        speed: 38,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Bonner Ave",
        odo: 0.0,
        speed: 38,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Main St",
        odo: 0.4,
        speed: 33,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "",
        instruction: "OBSERVE “ALBION ST”",
        street: "Main St",
        odo: 0.7,
        speed: 33,
        donuts: 0,
        rules: ["Rule SPEEDOMETER (sign reads ALBION ST, record B)"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Higgins Ave",
        odo: 0.7,
        speed: 28,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Bow St",
        odo: 0.8,
        speed: 23,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Main St",
        odo: 0.8,
        speed: 18,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "R",
        instruction: "2nd OPP",
        street: "Ellis Ave",
        odo: 0.9,
        speed: 18,
        donuts: 0,
        rules: [],
      },
      {
        direction: "BL",
        instruction: "at Y",
        street: "Willis Ave",
        odo: 1.0,
        speed: 13,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Harvard St",
        odo: 1.3,
        speed: 13,
        donuts: 1,
        rules: ["Rule TORUS (record O)"],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Main St",
        odo: 1.4,
        speed: 13,
        donuts: 1,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “OASIS CAFE”",
        street: "Main St",
        odo: 1.4,
        speed: 13,
        donuts: 1,
        rules: ["Rule RETEMODEEPS (sign reads OASIS CAFE BAKERY, record Y)"],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Main St",
        odo: 2.1,
        speed: 13,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "3rd OPP",
        street: "Riverside Ave",
        odo: 2.3,
        speed: 16,
        donuts: 1,
        rules: ["Rule HUNGRY (154 Main St, Medford)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “BBQ BOSTON”",
        street: "Riverside Ave",
        odo: 2.4,
        speed: 16,
        donuts: 1,
        rules: ["Rule SPEEDOMETER (sign reads SURA BBQ BOSTON, record S)"],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Clippership Dr",
        odo: 2.5,
        speed: 16,
        donuts: 1,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "2nd OPP",
        street: "Salem St",
        odo: 2.8,
        speed: 21,
        donuts: 1,
        rules: [
          "Rule ROUNDABOUT (Unnamed rotary in Medford Center under I-93)",
        ],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “GINO & ROLANDA”",
        street: "Salem St",
        odo: 2.9,
        speed: 21,
        donuts: 1,
        rules: [
          "Rule SPEEDOMETER (sign reads DESIGN BY GINO & ROLANDA, record E)",
        ],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “CAROL”",
        street: "Salem St",
        odo: 3.5,
        speed: 24,
        donuts: 1,
        rules: [
          "Rule HUNGRY (430 Salem St, Medford)",
          "Rule RETEMODEEPS (sign reads CAROL CREATIONS, record N)",
        ],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “SHOP PHARMACY”",
        street: "Centre St",
        odo: 4.6,
        speed: 29,
        donuts: 2,
        rules: [
          "Rule COMPLACENT (ODO 2.4-4.4 on Salem St / Centre St)",
          "Rule BERRY (sign for Stop & Shop, record BERRY)",
        ],
      },
      {
        direction: "R",
        instruction: "2nd OPP",
        street: "Main St",
        odo: 4.8,
        speed: 29,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Eastern Ave",
        odo: 4.9,
        speed: 29,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 4.6 miles.",
        street: "57 Eastern Ave, Malden",
        odo: 5.0,
        speed: 29,
        donuts: 2,
        rules: [
          <>
            Rule DONUTS (index 2 into BOYSENBERRY to extract <strong>O</strong>)
          </>,
          <>
            Rule ROTARY (there has been one rotary, increase the index by 1 to
            extract <strong>Y</strong>)
          </>,
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/57+Eastern+Avenue,+Malden,+MA/2+Lynn+Fells+Pkwy,+Stoneham,+MA+02180/@42.3939343,-71.1000032,14.21z/data=!4m44!4m43!1m35!1m1!1s0x89e3716468d33b31:0x4f44da19ab726107!2m2!1d-71.065539!2d42.4238845!3m4!1m2!1d-71.0655364!2d42.4253754!3s0x89e371638de01f87:0xe3b3d40938cde909!3m4!1m2!1d-71.0740001!2d42.4253504!3s0x89e3715df12de51f:0x923348efb444a513!3m4!1m2!1d-71.0748836!2d42.4177169!3s0x89e371423d0098d7:0x7c0f5e5f75ef418a!3m4!1m2!1d-71.06589!2d42.4182044!3s0x89e3716f18f62767:0x877cf56978267b96!3m4!1m2!1d-71.0644637!2d42.3974563!3s0x89e3711b094a5019:0x335dc62fc413633e!3m4!1m2!1d-71.1033643!2d42.4523896!3s0x89e3740c8026771b:0xdf9c62323d037259!1m5!1m1!1s0x89e37391a21cd12d:0x36364bca2242adb3!2m2!1d-71.0828095!2d42.4574459!3e0?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "BEGIN at previous DIYC, facing northeast.",
        street: "Eastern Ave",
        odo: 0.0,
        speed: 34,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Ferry St",
        odo: 0.1,
        speed: 34,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Centre St",
        odo: 0.1,
        speed: 34,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "4th SIGNAL",
        street: "Commercial St",
        odo: 0.6,
        speed: 34,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “AUTO SERVICE EXPERTS”",
        street: "Commercial St",
        odo: 0.6,
        speed: 34,
        donuts: 0,
        rules: [
          "Rule SPEEDOMETER (sign reads MIDAS AUTO SERVICE EXPERTS, record D)",
        ],
      },
      {
        direction: "L",
        instruction: "3rd SIGNAL",
        street: "Medford St",
        odo: 1.1,
        speed: 37,
        donuts: 0,
        rules: ["Rule HUNGRY (200 Commercial St, Malden)"],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Main St",
        odo: 1.7,
        speed: 37,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “TILESTON ST”",
        street: "Main St",
        odo: 2.6,
        speed: 40,
        donuts: 0,
        rules: [
          "Rule HUNGRY (339 Main St, Everett)",
          "Rule SPEEDOMETER (sign reads TILESTON ST, record E)",
        ],
      },
      {
        direction: "BR",
        instruction: "5th OPP",
        street: "Broadway",
        odo: 2.8,
        speed: 25,
        donuts: 2,
        rules: [
          "Rule COMPLACENT (ODO 1.7-2.7 on Main St)",
          "Rule WOOP WOOP WOOP",
          "Rule ROUNDABOUT (Sweetser Circle)",
        ],
      },
      {
        direction: "BR",
        instruction: "at Y",
        street: "Alford St",
        odo: 4.0,
        speed: 35,
        donuts: 2,
        rules: [
          "Rule COMPLACENT (ODO 2.8-4.0 on Alford St)",
          "Rule ROUNDABOUT (Unnamed rotary near Sullivan Square)",
        ],
      },
      {
        direction: "BR",
        instruction: "3rd OPP",
        street: "Main St",
        odo: 4.2,
        speed: 35,
        donuts: 2,
        rules: [],
      },
      {
        direction: "BL",
        instruction: "2nd OPP",
        street: "I-93",
        odo: 4.8,
        speed: 45,
        donuts: 2,
        rules: ["Rule WHEE"],
      },
      {
        direction: "BR",
        instruction: "4th OPP",
        street: "Main St",
        odo: 9.9,
        speed: 25,
        donuts: 8,
        rules: [
          "Rule COMPLACENT (ODO 4.8-9.9 on I-93)",
          "Rule WOOP WOOP WOOP",
          "Rule GLAZED (record GLAZED)",
        ],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "South St",
        odo: 10.4,
        speed: 25,
        donuts: 8,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Pond St",
        odo: 11.4,
        speed: 25,
        donuts: 8,
        rules: ["Rule COMPLACENT (ODO 10.4-11.4 on Pond St)", "Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Lynn Fells Parkway",
        odo: 11.7,
        speed: 25,
        donuts: 8,
        rules: [],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 11.8 miles",
        street: "2 Lynn Fells Parkway, Stoneham",
        odo: 11.8,
        speed: 25,
        donuts: 8,
        rules: [
          <>
            Rule DONUTS (index 8 into DEGLAZED to extract <strong>D</strong>)
          </>,
          "Rule ROTARY (there have been two rotaries, increase the index by 2)",
          "Rule TUMMYACHE (do not extract a letter)",
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/Dunkin',+2+Lynn+Fells+Pkwy,+Stoneham,+MA+02180/632+Main+Street,+Wakefield,+MA/@42.4819149,-71.06856,16.67z/data=!4m44!4m43!1m35!1m1!1s0x89e37391994fb999:0xbf7fdab6b4ed57a3!2m2!1d-71.0828444!2d42.4574315!3m4!1m2!1d-71.0751068!2d42.4546605!3s0x89e37395e75c9b51:0xeabee85beb53f7c!3m4!1m2!1d-71.0668676!2d42.4524755!3s0x89e373b94622127b:0x19aee8811996a12d!3m4!1m2!1d-71.0598544!2d42.4659275!3s0x89e373a83aec745f:0x8d99e6f74f243476!3m4!1m2!1d-71.0661685!2d42.4823236!3s0x89e37316c990db1b:0xca23a57f4c937529!3m4!1m2!1d-71.0532908!2d42.5009032!3s0x89e3732baaee572d:0xa48db856f65392b2!3m4!1m2!1d-71.0688167!2d42.5025362!3s0x89e373346c415b25:0xf76b9ebda6a4f162!1m5!1m1!1s0x89e373375d4b45e3:0x2c5a65816392c17d!2m2!1d-71.0690053!2d42.4971219!3e0?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "BEGIN at previous DIYC, facing northeast",
        street: "Lynn Fells Parkway",
        odo: 0.0,
        speed: 27,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Fellsview Rd",
        odo: 0.1,
        speed: 27,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Conant Rd",
        odo: 0.3,
        speed: 27,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "W Wyoming Ave",
        odo: 0.7,
        speed: 22,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "",
        instruction: "OBSERVE “WAVERLY PL”",
        street: "W Wyoming Ave",
        odo: 1.0,
        speed: 22,
        donuts: 0,
        rules: ["Rule SPEEDOMETER (sign reads WAVERLY PL, record A)"],
      },
      {
        direction: "L",
        instruction: "2nd OPP",
        street: "Main St",
        odo: 1.1,
        speed: 25,
        donuts: 0,
        rules: ["Rule HUNGRY (350 Main St, Melrose)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “PHARMACY”",
        street: "Main St",
        odo: 1.4,
        speed: 25,
        donuts: 0,
        rules: ["Rule RETEMODEEPS (sign reads CVS PHARMACY, record C)"],
      },
      {
        direction: "R",
        instruction: "5th SIGNAL",
        street: "Lynn Fells Parkway",
        odo: 2.0,
        speed: 25,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Green St",
        odo: 2.1,
        speed: 25,
        donuts: 0,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "4th OPP",
        street: "Green St",
        odo: 2.2,
        speed: 30,
        donuts: 0,
        rules: ["Rule ROUNDABOUT (unnamed rotary on Green St in Melrose)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “APPLIANCE”",
        street: "Green St",
        odo: 2.3,
        speed: 30,
        donuts: 0,
        rules: ["Rule SPEEDOMETER (sign reads GRAYS APPLIANCE, record A)"],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Main St",
        odo: 2.3,
        speed: 30,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “PRIMP”",
        street: "Main St",
        odo: 3.0,
        speed: 30,
        donuts: 0,
        rules: ["Rule SPEEDOMETER (sign reads PRIMP, record I)"],
      },
      {
        direction: "R",
        instruction: "2nd SIGNAL",
        street: "Oak St",
        odo: 3.5,
        speed: 35,
        donuts: 0,
        rules: ["Rule COMPLACENT (ODO 2.3-3.5 on Main St)"],
      },
      {
        direction: "BL",
        instruction: "1st OPP",
        street: "Oak St",
        odo: 3.5,
        speed: 35,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Old Nahant Rd",
        odo: 4.6,
        speed: 30,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Farm St",
        odo: 4.7,
        speed: 25,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Water St",
        odo: 5.2,
        speed: 25,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “SHAWS”",
        street: "Water St",
        odo: 5.9,
        speed: 25,
        donuts: 1,
        rules: ["Rule BERRY (sign for Shaw’s, record BERRY)"],
      },
      {
        direction: "L",
        instruction: "3rd SIGNAL",
        street: "Main St",
        odo: 6.2,
        speed: 30,
        donuts: 1,
        rules: ["Rule COMPLACENT (ODO 5.2-6.2 on Main St)"],
      },
      {
        direction: "L",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 6.6 miles",
        street: "632 Main St, Wakefield",
        odo: 6.6,
        speed: 25,
        donuts: 2,
        rules: [
          "Rule ANGRY",
          "Rule CRAVING",
          "Rule DONUTS (index 2 into ACAIBERRY to extract C",
          <>
            Rule ROTARY (there has been one rotary, increase the inex by 1 to
            extract <strong>A</strong>)
          </>,
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/632+Main+Street,+Wakefield,+MA/Dunkin',+162+Washington+St,+Peabody,+MA+01960/@42.5026815,-71.0753627,16.46z/data=!4m44!4m43!1m35!1m1!1s0x89e373375d4b45e3:0x2c5a65816392c17d!2m2!1d-71.0690053!2d42.4971219!3m4!1m2!1d-71.0749046!2d42.503176!3s0x89e373358a210c39:0xc0539a4dc8edde94!3m4!1m2!1d-71.0728!2d42.5029448!3s0x89e37335ed7a6ebb:0x1024fda03d89b4f1!3m4!1m2!1d-71.0996088!2d42.4868781!3s0x89e3749ddb294473:0xea79c768d7a0c9f!3m4!1m2!1d-71.101454!2d42.4905035!3s0x89e3749f1caf8039:0x8b29b5722089bb8c!3m4!1m2!1d-70.9913665!2d42.512039!3s0x89e312980ef407ff:0x32a672f9c1f5dd7!3m4!1m2!1d-70.9398362!2d42.5230764!3s0x89e313a775786fc3:0xd155f8f8549b2ef1!1m5!1m1!1s0x89e3130a9dcdc1ab:0xef79f704f3fbaa7c!2m2!1d-70.9329192!2d42.5204721!3e0?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "Begin at previous DIYC, facing north.",
        street: "Main St",
        odo: 0.0,
        speed: 16,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "North Ave",
        odo: 0.1,
        speed: 16,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “DUNKIN”",
        street: "North Ave",
        odo: 0.5,
        speed: 19,
        donuts: 0,
        rules: [
          "Rule SPEEDOMETER (sign reads DUNKIN DONUTS, record D)",
          "Rule HUNGRY (225 North Ave, Wakefield)",
        ],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Chestnut St",
        odo: 0.6,
        speed: 19,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Main St",
        odo: 0.9,
        speed: 19,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "2nd SIGNAL",
        street: "North St",
        odo: 1.3,
        speed: 24,
        donuts: 0,
        rules: ["Rule TORUS (record O)"],
      },
      {
        direction: "BL",
        instruction: "1st OPP",
        street: "Broadway St",
        odo: 1.4,
        speed: 19,
        donuts: 1,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Albion St",
        odo: 2.0,
        speed: 19,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "2nd SIGNAL",
        street: "Main St / Rt 28",
        odo: 3.1,
        speed: 19,
        donuts: 1,
        rules: ["Rule COMPLACENT (ODO 0.9-2.8 on Albion St / Elm St)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “BURGER”",
        street: "Main St / Rt 28",
        odo: 3.3,
        speed: 19,
        donuts: 1,
        rules: ["Rule RETEMODEEPS (sign reads BURGER KING, record G)"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Richardson Ln",
        odo: 3.4,
        speed: 17,
        donuts: 1,
        rules: ["Rule HUNGRY (196 Main St, Stoneham)", "Rule ANGRY"],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Victoria Ln",
        odo: 3.5,
        speed: 17,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Oak St",
        odo: 3.6,
        speed: 17,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Forest St",
        odo: 4.0,
        speed: 17,
        donuts: 1,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Bonad Rd",
        odo: 4.1,
        speed: 12,
        donuts: 1,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "North St",
        odo: 4.1,
        speed: 12,
        donuts: 1,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Main St / Rt 28",
        odo: 4.5,
        speed: 12,
        donuts: 1,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "I-95",
        odo: 4.6,
        speed: 22,
        donuts: 1,
        rules: ["Rule WHEE"],
      },
      {
        direction: "BR",
        instruction: "7th OPP",
        street: "Condon Circle offramp",
        odo: 11.1,
        speed: 32,
        donuts: 1,
        rules: [
          "Rule COMPLACENT (ODO 4.3-10.9 on I-95)",
          "Rule ROUNDABOUT (Condon Circle)",
        ],
      },
      {
        direction: "BR",
        instruction: "at Y",
        street: "Condon Circle offramp",
        odo: 11.4,
        speed: 32,
        donuts: 1,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "3rd OPP",
        street: "Salem St",
        odo: 11.9,
        speed: 32,
        donuts: 1,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Washington St",
        odo: 14.5,
        speed: 37,
        donuts: 1,
        rules: ["Rule COMPLACENT (ODO 11.6-14.2 on Salem St)"],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Allens Ln",
        odo: 14.7,
        speed: 37,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Lowell St",
        odo: 15.4,
        speed: 37,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "2nd SIGNAL",
        street: "Foster St",
        odo: 15.7,
        speed: 37,
        donuts: 1,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “OLIVAS”",
        street: "Foster St",
        odo: 16.1,
        speed: 37,
        donuts: 2,
        rules: ["Rule BERRY (sign on Oliva’s Market, record BERRY)"],
      },
      {
        direction: "AL",
        instruction: "1st SIGNAL",
        street: "Washington St",
        odo: 16.2,
        speed: 37,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 16.2 miles",
        street: "162 Washington St, Peabody",
        odo: 16.2,
        speed: 37,
        donuts: 2,
        rules: [
          <>
            Rule DONUTS (index 2 into DOGBERRY to extract <strong>O</strong>)
          </>,
          <>
            Rule ROTARY (there has been one rotary, increase the index by 1 to
            extract <strong>G</strong>)
          </>,
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/162+Washington+St,+Peabody,+MA/Dunkin'/Dunkin',+980+Paradise+Rd,+Swampscott,+MA+01907/@42.4874528,-70.8943228,17.04z/data=!4m60!4m59!1m10!1m1!1s0x89e3130a9dbd49db:0xaf9aaafff4a78727!2m2!1d-70.9329103!2d42.5204626!3m4!1m2!1d-70.9256061!2d42.525175!3s0x89e313995d6bec9b:0x24bcf7d2623c011d!1m40!1m1!1s0x89e31399a4429209:0x3d3d2a5d6d8f48c1!2m2!1d-70.9268167!2d42.5270147!3m4!1m2!1d-70.9188804!2d42.5227848!3s0x89e3139caaeeb2ef:0x608baee4bf5f6994!3m4!1m2!1d-70.8980056!2d42.5239395!3s0x89e3147a8038b915:0xe9e25d74ba552979!3m4!1m2!1d-70.9000127!2d42.5150157!3s0x89e31487566a9db7:0x676ece2233e8f364!3m4!1m2!1d-70.9245717!2d42.4982875!3s0x89e3134225f850c1:0x642d3432a70ed9d0!3m4!1m2!1d-70.9014275!2d42.4860098!3s0x89e314a8b249ac31:0x24aaedc3cac3052b!3m4!1m2!1d-70.8988036!2d42.4881713!3s0x89e314a5afb93e9d:0x1bb4d8746b55dd01!3m4!1m2!1d-70.8907321!2d42.5051865!3s0x89e3148e3f801bdb:0xe2d6277867c56796!1m5!1m1!1s0x89e314aec69dcffd:0xa11e85c2bee7470!2m2!1d-70.9014557!2d42.48326!3e0?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "Begin at previous DIYC, facing east.",
        street: "Washington St",
        odo: 0.0,
        speed: 14,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Main St",
        odo: 0.6,
        speed: 14,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “BREAKING”",
        street: "Main St",
        odo: 0.9,
        speed: 14,
        donuts: 0,
        rules: ["Rule RETEMODEEPS (sign reads BREAKING GROUNDS, record S)"],
      },
      {
        direction: "R",
        instruction: "2nd SIGNAL",
        street: "Central St",
        odo: 0.9,
        speed: 14,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Walnut St",
        odo: 0.9,
        speed: 17,
        donuts: 0,
        rules: ["Rule HUNGRY (3 Central St, Peabody)"],
      },
      {
        direction: "R",
        instruction: "3rd OPP",
        street: "Howley St",
        odo: 1.4,
        speed: 17,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Boston St",
        odo: 1.6,
        speed: 17,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "3rd SIGNAL",
        street: "Bridge St",
        odo: 2.2,
        speed: 20,
        donuts: 0,
        rules: ["Rule HUNGRY (68 Boston St, Salem)"],
      },
      {
        direction: "R",
        instruction: "4th SIGNAL",
        street: "Washington St",
        odo: 2.9,
        speed: 20,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “DUNKIN”",
        street: "Washington St",
        odo: 3.2,
        speed: 23,
        donuts: 0,
        rules: [
          "Rule SPEEDOMETER (sign reads DUNKIN DONUTS, record U)",
          "Rule HUNGRY (152 Washington St, Salem)",
        ],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Norman St",
        odo: 3.2,
        speed: 23,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Margin St",
        odo: 3.2,
        speed: 23,
        donuts: 0,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "BR",
        instruction: "7th OPP",
        street: "Jackson St",
        odo: 3.7,
        speed: 18,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “TREE CIDER”",
        street: "Jackson St",
        odo: 3.7,
        speed: 18,
        donuts: 0,
        rules: [
          "Rule RETEMODEEPS (sign reads FAR FROM THE TREE CIDER HOUSE, record E)",
        ],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Highland Ave",
        odo: 4.0,
        speed: 18,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "3rd SIGNAL",
        street: "Swampscott Rd",
        odo: 5.5,
        speed: 23,
        donuts: 0,
        rules: ["Rule COMPLACENT (ODO 4.0-5.5 on Highland Ave)"],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Swampscott Rd",
        odo: 5.7,
        speed: 23,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Essex St",
        odo: 7.1,
        speed: 33,
        donuts: 0,
        rules: [
          "Rule COMPLACENT (ODO 5.7-7.1 on Swampscott Rd / Danvers Rd)",
          "Rule ROUNDABOUT (unnamed rotary at Swampscott St / First St in Salem)",
        ],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Loring Ave",
        odo: 7.9,
        speed: 33,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL “MOFFATT RD”",
        street: "Loring Ave",
        odo: 8.7,
        speed: 33,
        donuts: 0,
        rules: ["Rule RETEMODEEPS (sign reads MOFFATT RD, record T)"],
      },
      {
        direction: "BR",
        instruction: "2nd SIGNAL",
        street: "Loring Ave",
        odo: 9.0,
        speed: 38,
        donuts: 0,
        rules: ["Rule COMPLACENT (ODO 7.9-9.0 on Loring Ave)"],
      },
      {
        direction: "R",
        instruction: "2nd SIGNAL",
        street: "Lafayette St",
        odo: 9.5,
        speed: 38,
        donuts: 0,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "1st SIGNAL",
        street: "Maple St",
        odo: 10.5,
        speed: 43,
        donuts: 2,
        rules: ["Rule COMPLACENT (ODO 9.5-10.5 on Lafayette St)"],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Tedesco St",
        odo: 10.7,
        speed: 43,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "2nd SIGNAL",
        street: "Paradise Rd",
        odo: 11.8,
        speed: 23,
        donuts: 2,
        rules: [
          "Rule COMPLACENT (ODO 10.7-11.8 on Tedesco St / Vinnin St)",
          "Rule WOOP WOOP WOOP",
        ],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 12.0 miles",
        street: "980 Paradise Rd, Swampscott",
        odo: 12,
        speed: 23,
        donuts: 2,
        rules: [
          <>
            Rule DONUTS (index 2 into SUET to extract <strong>U</strong>)
          </>,
          <>
            Rule ROTARY (there has been one rotary, increase the index by 2 to
            extract <strong>E</strong>)
          </>,
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/42.4830973,-70.9009473/42.4670119,-70.9252175/42.4789712,-70.9561213/Diaz's+Bakery,+Market+Street,+Lynn,+MA/42.460553,-70.9552803/@42.4793496,-70.9328794,14.82z/data=!4m47!4m46!1m25!3m4!1m2!1d-70.9040451!2d42.4821884!3s0x89e314abd493e23b:0x836998b175be0921!3m4!1m2!1d-70.9158597!2d42.4797128!3s0x89e313532f6d5f5d:0xc9851fd658e647f3!3m4!1m2!1d-70.9230077!2d42.4722919!3s0x89e36cb091163f11:0xe18a49a8d529ef!3m4!1m2!1d-70.922276!2d42.4670972!3s0x89e36cbb85a128e1:0xe92572d98de0988d!3m4!1m2!1d-70.9247958!2d42.4657867!3s0x89e36cbc2180e815:0x15f37e364d837275!1m5!3m4!1m2!1d-70.93469!2d42.4645957!3s0x89e36cc1c56b2981:0xdc8360babbe7e34e!1m5!3m4!1m2!1d-70.9593052!2d42.469359!3s0x89e36d21eb328f65:0x4fd0275c319c6aa4!1m5!1m1!1s0x89e36ce119bdf6e9:0xa4b9c78bc2863497!2m2!1d-70.9506216!2d42.4640338!1m0!3e0?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D",
      "https://www.google.com/maps/dir/42.460527,-70.9552778/Dunkin'/@42.4603177,-70.9705471,17.21z/data=!4m14!4m13!1m5!3m4!1m2!1d-70.9661842!2d42.4595035!3s0x89e36d05519ff399:0xf9468a50f11f4e30!1m5!1m1!1s0x89e36d1026e0543b:0x3a40c101600edc12!2m2!1d-70.9685518!2d42.4605!3e0?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D",
    ],
    mapsNote:
      "Google Maps has a limit on the number of waypoints allows in a route, and this leg exceeds that number of waypoints, so its route is displayed in two separate maps.",
    instructions: [
      {
        direction: "",
        instruction: "Begin at previous DIYC, facing south.",
        street: "Paradise Rd",
        odo: 0.0,
        speed: 14,
        donuts: 0,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Paradise Rd",
        odo: 0.1,
        speed: 14,
        donuts: 0,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Essex St",
        odo: 0.4,
        speed: 14,
        donuts: 0,
        rules: [],
      },
      {
        direction: "BL",
        instruction: "4th SIGNAL",
        street: "Burrill St",
        odo: 1.4,
        speed: 19,
        donuts: 2,
        rules: ["Rule COMPLACENT (ODO 0.4-1.4 on Burrill St)"],
      },
      {
        direction: "R",
        instruction: "1st STOP",
        street: "Railroad Ave",
        odo: 1.6,
        speed: 19,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “SWAMPSCOTT PARKING”",
        street: "Railroad Ave",
        odo: 1.6,
        speed: 19,
        donuts: 2,
        rules: [
          "Rule FROSTED (sign is for Swampscott commuter rail station, record FROSTED)",
        ],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “CAPTAIN PIZZA”",
        street: "Railroad Ave",
        odo: 1.6,
        speed: 19,
        donuts: 2,
        rules: [
          "Rule RETEMODEEPS (sign reads CAPTAIN PIZZA ROAST BEEF, record F)",
        ],
      },
      {
        direction: "BR",
        instruction: "at T",
        street: "New Ocean St",
        odo: 1.9,
        speed: 19,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Eastern Ave",
        odo: 2.0,
        speed: 19,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Lynn Shore Drive",
        odo: 2.1,
        speed: 19,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “LYNN”",
        street: "Lynn Shore Drive",
        odo: 2.1,
        speed: 19,
        donuts: 2,
        rules: ["Rule SPEEDOMETER (sign reads LYNN SHORE DRIVE, record L)"],
      },
      {
        direction: "R",
        instruction: "2nd OPP",
        street: "Greystone Park",
        odo: 2.2,
        speed: 19,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "1st SIGNAL",
        street: "Lewis St",
        odo: 2.3,
        speed: 19,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “AMELIA RESTAURANT”",
        street: "Lewis St",
        odo: 2.8,
        speed: 22,
        donuts: 2,
        rules: [
          "Rule HUNGRY (116 Lewis St, Lynn)",
          "Rule SPEEDOMETER (sign reads CASA AMELIA RESTAURANT MEXICAN SALVADORIAN GUATEMALAN, record A)",
        ],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Chestnut St",
        odo: 2.9,
        speed: 22,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "5th SIGNAL",
        street: "Boston St",
        odo: 4.5,
        speed: 22,
        donuts: 2,
        rules: ["Rule COMPLACENT (ODO 2.9-4.5 on Chestnut St)"],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "N Bend St",
        odo: 4.7,
        speed: 27,
        donuts: 2,
        rules: ["Rule HUNGRY (25 Boston St, Lynn)"],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Boston St",
        odo: 4.9,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "2nd SIGNAL",
        street: "Franklin St",
        odo: 5.3,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “BAKER ST”",
        street: "Franklin St",
        odo: 5.6,
        speed: 30,
        donuts: 2,
        rules: ["Rule SPEEDOMETER (sign reads BAKER ST, record K)"],
      },
      {
        direction: "BL",
        instruction: "2nd SIGNAL",
        street: "S Common St",
        odo: 5.9,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Market St",
        odo: 5.9,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL HIT RIP “DIAZ”",
        street: "Market St",
        odo: 6.0,
        speed: 30,
        donuts: 2,
        rules: ["Rule RETEMODEEPS (sign reads DIAZ BAKERY, record E)"],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Tremont St",
        odo: 6.1,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "3rd OPP",
        street: "Summer St",
        odo: 6.5,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "7th OPP",
        street: "Breed Sq",
        odo: 7.2,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Western Ave",
        odo: 7.2,
        speed: 30,
        donuts: 2,
        rules: [],
      },
      {
        direction: "L",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 7.3 miles",
        street: "819 Western Ave, Lynn",
        odo: 7.3,
        speed: 25,
        donuts: 2,
        rules: [
          "Rule ANGRY",
          <>
            Rule DONUTS (index 2 into FROSTED FLAKE to extract{" "}
            <strong>R</strong>)
          </>,
          "Rule ROTARY (no rotaries on this leg, re-extract R)",
        ],
      },
    ],
  },
  {
    maps: [
      "https://www.google.com/maps/dir/42.4603469,-70.9681902/Dunkin'/@42.3921584,-71.0392241,17.75z/data=!4m59!4m58!1m50!3m4!1m2!1d-70.9655689!2d42.4628239!3s0x89e36d1a65f09009:0x5f30b88cb9da1c65!3m4!1m2!1d-70.9650833!2d42.4597405!3s0x89e36d054ae80477:0xba9a7aa654c5ed02!3m4!1m2!1d-70.9752265!2d42.4638176!3s0x89e36d1254aa40d5:0x25895d80f9c6e756!3m4!1m2!1d-70.9903489!2d42.455371!3s0x89e36d778acbbd09:0xdb1a2e960ea6e8cb!3m4!1m2!1d-71.018216!2d42.4636017!3s0x89e372893a786d63:0x33bda556252facd5!3m4!1m2!1d-71.024434!2d42.4648038!3s0x89e3728b65ccd955:0x74dba78dfa7a9a9c!3m4!1m2!1d-71.0371608!2d42.3968686!3s0x89e371bab073a56f:0x307bca3ba36ece1b!3m4!1m2!1d-71.0423148!2d42.3936739!3s0x89e371aec0169fb5:0xce3993348399345f!3m4!1m2!1d-71.0385722!2d42.3895747!3s0x89e371ad837a343f:0xa5a151f20bfbfe83!3m4!1m2!1d-71.0348487!2d42.3895837!3s0x89e371b3ca77264b:0xfeed3227cc23266d!1m5!1m1!1s0x89e371ae309feee3:0xdc5afe87eaf79716!2m2!1d-71.0388315!2d42.3937193!3e0!5m1!1e2?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D",
    ],
    instructions: [
      {
        direction: "",
        instruction: "Begin at previous DIYC, facing northeast.",
        street: "Western Ave",
        odo: 0.0,
        speed: 34,
        donuts: 0,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE “FEDERAL ST”",
        street: "Western Ave",
        odo: 0.2,
        speed: 39,
        donuts: 0,
        rules: [
          "Rule ROUNDABOUT (unnamed at Federal St / Western Ave, Lynn)",
          "Rule REARVIEW (November 2020)",
          "Rule SPEEDOMETER (sign reads FEDERAL ST, record D)",
        ],
      },
      {
        direction: "BR",
        instruction: "2nd OPP",
        street: "South St",
        odo: 0.3,
        speed: 39,
        donuts: 1,
        rules: ["Rule TORUS (record O)"],
      },
      {
        direction: "R",
        instruction: "1st SIGNAL",
        street: "Summer St",
        odo: 0.5,
        speed: 39,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "2nd OPP",
        street: "Cottage St",
        odo: 0.8,
        speed: 39,
        donuts: 1,
        rules: [],
      },
      {
        direction: "",
        instruction: "OBSERVE SOL RIP “LOLLYS BAKERY”",
        street: "Cottage St",
        odo: 0.8,
        speed: 39,
        donuts: 1,
        rules: [
          "Rule RETEMODEEPS (sign reads LOLLYS BAKERY PANADERIA, record R)",
        ],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Boston St",
        odo: 1.2,
        speed: 39,
        donuts: 1,
        rules: [],
      },
      {
        direction: "R",
        instruction: "4th SIGNAL",
        street: "Chestnut St",
        odo: 2.4,
        speed: 22,
        donuts: 3,
        rules: [
          "Rule COMPLACENT (ODO 1.2-2.4 on Boston St / Lincoln Ave)",
          "Rule HUNGRY (35 Lincoln Ave, Saugus)",
          "Rule WOOP WOOP WOOP",
        ],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “CEMETERY”",
        street: "Winter St",
        odo: 3.4,
        speed: 27,
        donuts: 3,
        rules: [
          "Rule COMPLACENT (ODO 2.4-3.5 on Chestnut St / Winter St)",
          "Rule SPEEDOMETER (sign reads RIVERSIDE CEMETERY, record I)",
        ],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Central St",
        odo: 3.5,
        speed: 27,
        donuts: 3,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "5th OPP",
        street: "Main St",
        odo: 3.8,
        speed: 32,
        donuts: 3,
        rules: [
          "Rule ROUNDABOUT (unnamed rotary at Central St / Main St in Saugus)",
        ],
      },
      {
        direction: "L",
        instruction: "1st OPP",
        street: "Franklin St",
        odo: 4.2,
        speed: 27,
        donuts: 3,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Vine St",
        odo: 4.8,
        speed: 27,
        donuts: 3,
        rules: [],
      },
      {
        direction: "L",
        instruction: "at T",
        street: "Main St",
        odo: 4.8,
        speed: 27,
        donuts: 3,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "2nd OPP",
        street: "US-1 South",
        odo: 5.0,
        speed: 37,
        donuts: 3,
        rules: ["Rule WHEE"],
      },
      {
        direction: "",
        instruction: "OBSERVE “LAST EXIT BEFORE TOLL”",
        street: "US-1 South",
        odo: 10,
        speed: 42,
        donuts: 3,
        rules: [
          "Rule COMPLACENT (ODO 5.0-10.0 on US-1 South)",
          "Rule SPEEDOMETER (sign reads CARTER ST CHELSEA E BOSTON LAST EXIT BEFORE TOLL, record T)",
        ],
      },
      {
        direction: "BR",
        instruction: "1st OPP",
        street: "Carter St",
        odo: 10,
        speed: 42,
        donuts: 3,
        rules: [],
      },
      {
        direction: "L",
        instruction: "2nd OPP",
        street: "Beech St",
        odo: 10.3,
        speed: 37,
        donuts: 3,
        rules: ["Rule ANGRY"],
      },
      {
        direction: "R",
        instruction: "at T",
        street: "Spruce St",
        odo: 10.5,
        speed: 37,
        donuts: 3,
        rules: [],
      },
      {
        direction: "L",
        instruction: "2nd OPP",
        street: "2nd St",
        odo: 10.9,
        speed: 37,
        donuts: 3,
        rules: [],
      },
      {
        direction: "L",
        instruction: "4th STOP",
        street: "Park St",
        odo: 11.2,
        speed: 37,
        donuts: 3,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "at Y",
        street: "Park St",
        odo: 11.3,
        speed: 37,
        donuts: 3,
        rules: [],
      },
      {
        direction: "BR",
        instruction: "at Y",
        street: "Central Ave",
        odo: 11.4,
        speed: 37,
        donuts: 3,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Shurtleff St",
        odo: 11.5,
        speed: 37,
        donuts: 3,
        rules: [],
      },
      {
        direction: "R",
        instruction: "1st OPP",
        street: "Congress Ave",
        odo: 11.5,
        speed: 37,
        donuts: 4,
        rules: ["Rule TORUS (record O)"],
      },
      {
        direction: "",
        instruction: "OBSERVE SRIP “MARIACHI”",
        street: "Everett Ave",
        odo: 11.8,
        speed: 37,
        donuts: 4,
        rules: [
          "Rule SPEEDOMETER (sign reads CASA MARIACHI RESTAURANT, record S)",
        ],
      },
      {
        direction: "R",
        instruction: "into DUNKIN’ drive-thru for DIYC. Target ODO 11.9 miles",
        street: "83 Everett Ave, Chelsea",
        odo: 11.9,
        speed: 37,
        donuts: 5,
        rules: [
          "Rule CRAVING",
          <>
            Rule DONUTS (index 5 into DORITOS to extract <strong>T</strong>)
          </>,
          <>
            Rule ROTARY (there has been two rotaries, increase the index by 2 to
            extract <strong>S</strong>)
          </>,
        ],
      },
    ],
  },
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 8px 0px;
`;

const RouteTable = styled(StyledTable)`
  table-layout: fixed;
  border-collapse: collapse;
  tr:not(:last-child) {
    border-bottom: 1px solid var(--black);
  }
  th:first-child,
  th:nth-child(2) {
    width: 32px;
  }
  th:nth-child(5),
  th:nth-child(6),
  th:nth-child(7) {
    width: 64px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        As one can discern from this puzzle’s flavor text and general theming,
        this is a Dunk(in) Konundrum.
      </p>
      <p>
        It is presented in a similar manner to a typical{" "}
        <a
          href="https://en.wikipedia.org/wiki/Regularity_rally"
          target="_blank"
          rel="noreferrer"
        >
          regularity rally
        </a>
        , also known as a time-speed-distance rally, as clued in the flavor text
        (old school spelling of “rallye”, “To Sip Dunkin”, “with regularity”,
        “get yourself into gear”). Regularity rally rules generally follow a
        similar set of principles, but there is not so much a sport governing
        body as a series of regional car nerd clubs, so a set of MIT Puzzle Club
        General Regulations are given to define the set of possible operations
        for this puzzle.
      </p>
      <p>
        Additionally, a number of Special Instructions are given. They instruct
        solvers to track their speed, a number of donuts to order, and a series
        of observed letters for each leg. They also instruct solvers that each
        leg of the rally ends at a Dunkin’ drive-thru, at which solvers must
        order their donuts and extract a letter.
      </p>
      <p>
        The last thing solvers are given before their route is a Donut Ordering
        Card (taking the place of the traditional rally control card),
        containing spaces for what quantity of what donut solvers are ordering,
        plus a column for extraction. As seasoned puzzle veterans might infer,
        extraction is simply indexing the number of donuts into the name of the
        donut.
      </p>
      <p>
        A full walkthrough of the route can be found at the end of this page.
        The completed Donut Ordering Card is as follows:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th></th>
            <th>Quantity</th>
            <th>Donut Type</th>
            <th>Extraction</th>
          </tr>
          {DONUT_CARD_1.map(({ quantity, flavor, extraction }, i) => (
            <tr key={`donut-card-1-${i}`}>
              <td>
                <strong>DIYC {i + 1}</strong>
              </td>
              <td>{quantity}</td>
              <td>{flavor}</td>
              <td>{extraction}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        This spells out the initial answer, <Mono>FOOD COURT</Mono>.
      </p>
      <p>
        After solving Papa’s Stash, solvers receive two additional Special
        Instructions:
      </p>
      <StyledOl>
        <li>
          <strong>Rule ROTARY:</strong> You haven’t lived here long, have you?
          No one calls them “roundabouts” or “traffic circles”. In any case, add
          a donut to your purchase for each one you drove on.
        </li>
        <li>
          <strong>Rule TUMMACHE:</strong> If you do not have enough donuts to
          fulfill your team’s request, do not extract any letters. Instead, feel
          shame.
        </li>
      </StyledOl>
      <p>
        By summing the original donut quantity with the rotary count, solvers
        get a new index into the donut name (except for DEGLAZED, where you do
        not have enough letters to re-extract.)
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th></th>
            <th>Quantity</th>
            <th>Donut Type</th>
            <th>Extraction</th>
          </tr>
          {DONUT_CARD_2.map(({ quantity, rotaries, flavor, extraction }, j) => (
            <tr key={`donut-card-2-${j}`}>
              <td>
                <strong>DIYC {j + 1}</strong>
              </td>
              <td>{quantity}</td>
              <td>{rotaries}</td>
              <td>{flavor}</td>
              <td>{extraction}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        This spells out the final answer, <PuzzleAnswer>VOYAGERS</PuzzleAnswer>.
      </p>
      <h3>Full route walkthrough</h3>
      <p>
        The legs are presented in ascending order of leg length, with an address
        being given only for the first leg in the route. Google Street View
        screenshots are given for the starting location of each leg. As solvers
        proceed through each leg, they can determine which leg comes next by
        looking at the remaining Google Street View screenshots. The final route
        is as follows.
      </p>
      {ROUTES.map(({ maps, mapsNote, instructions }, k) => (
        <div key={`route-${k}`}>
          <Centered>
            <div>
              <strong>LEG {k + 1}</strong>
            </div>
            {maps.map((link, l) => (
              <div key={l}>
                <a href={link} target="_blank" rel="noreferrer">
                  Google Maps{maps.length > 1 ? ` ${l + 1}` : ""}
                </a>
              </div>
            ))}
            {mapsNote && <div>{mapsNote}</div>}
          </Centered>
          <HScrollTableWrapper>
            <RouteTable>
              <tr>
                <th>#</th>
                <th>Dir.</th>
                <th>Instruction</th>
                <th>Street</th>
                <th>ODO</th>
                <th>Speed</th>
                <th>Donuts</th>
                <th>Rule(s)</th>
              </tr>
              {instructions.map(
                (
                  { direction, instruction, street, odo, speed, donuts, rules },
                  m,
                ) => (
                  <tr key={`route-${k}-instruction-${m}`}>
                    <td>{m + 1}</td>
                    <td>{direction}</td>
                    <td>{instruction}</td>
                    <td>{street}</td>
                    <td>{odo}</td>
                    <td>{speed}</td>
                    <td>{donuts}</td>
                    <td>
                      {rules.map((rule, n) => (
                        <div key={`route-${k}-instruction-${m}-rule-${n}`}>
                          {rule}
                        </div>
                      ))}
                    </td>
                  </tr>
                ),
              )}
            </RouteTable>
          </HScrollTableWrapper>
        </div>
      ))}
      <h3>Author’s Note</h3>
      <p>
        This puzzle is written in honor of Ariel’s late Grandpa Ken, a long-time
        member of the Long Beach MG Club. The club has held annual winter
        gimmick rallyes called Saint Nix Trix for 70 years in a row. Grandpa Ken
        loved puzzles of all sorts and would have been fascinated by MITMH.
      </p>
      <p>
        The authors hope that while solving this puzzle, you pictured them as{" "}
        <a
          href="https://www.youtube.com/watch?v=FSvNhxKJJyU"
          target="_blank"
          rel="noreferrer"
        >
          three Casey Afflecks in a trench coat
        </a>
        .
      </p>
    </>
  );
};

export default Solution;
