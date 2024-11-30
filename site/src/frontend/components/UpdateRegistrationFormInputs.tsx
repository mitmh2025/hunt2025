import React from "react";
import { styled } from "styled-components";
import { ZodNumber, ZodOptional, ZodString } from "zod";
import { MutableTeamRegistrationSchema } from "../../../lib/api/contract";
import type { MutableTeamRegistration } from "../../../lib/api/frontend_contract";
import { SectionHeader } from "../regsite/routes/RegsiteUI";
import {
  ErrorText,
  LabeledInputWithError,
  LabeledTextAreaWithError,
} from "./StyledUI";

const TEAM_GOALS = [
  "We’d like to complete the Hunt.",
  "We’d like to see the entire Hunt.",
  "We’d like to complete a milestone.",
  "We’d like to solve at least one meta.",
  "We’d like to solve at least one puzzle.",
  "We’re just curious what it’s all about.",
];

const TEAM_VALUES = [
  "Being in the running to win",
  "Solving lots of puzzles",
  "Seeing lots of different types of puzzles",
  "Really hard puzzles",
  "Weird puzzles",
  "Physical puzzles",
  "Runarounds",
  "Events",
  "Things that tie closely with MIT culture",
  "Having a good time with puzzle friends (on my team)",
  "Having a good time with puzzle friends (from other teams)",
  "Experiencing the plot of the Mystery Hunt story",
];

const TEAM_LOCATIONS = [
  {
    value: "Fully Remote",
    label:
      "Our team will be fully remote with no members present in Cambridge during Mystery Hunt.",
    detailLabel:
      "We may need to contact you during the weekend. Please provide instructions for how we can get in touch with you virtually (E.g. Zoom link, Discord server, Google Meet, etc).",
    detailKey: "teamLocationDetailsRemote",
  },
  {
    value: "Room Requested",
    label:
      "Our team will have a physical presence during Hunt and we need space at MIT for our team HQ.",
    detailLabel:
      "What specifications would you like for your team HQ? (E.g. specific rooms or room attributes.) We will do our best to accommodate requests.",
    detailKey: "teamLocationDetailsRoomRequest",
  },
  {
    value: "Room Not Required",
    label:
      "Our team will have a physical presence on or near campus. We do not need to be assigned a campus room for HQ.",
    detailLabel:
      "We will be visiting your team during the weekend. Please specify your location (department room(s), dorm, FSILG, hotel, etc) and include any special instructions we will need to access your HQ.",
    detailKey: "teamLocationDetailsNoRoomRequested",
  },
] as const;

const REFERRERS = [
  "We have Hunted in the past.",
  "On social media.",
  "Through word-of-mouth",
  "Poster on MIT’s campus",
  "MIT Mailing List",
];

const CheckedDetailsDiv = styled.div`
  display: none;

  input:checked ~ & {
    padding-left: 2em;
    display: block;
  }
`;

export default function UpdateRegistrationFormInputs({
  values,
  errors,
}: {
  values: Partial<MutableTeamRegistration>;
  errors: { [K in keyof MutableTeamRegistration]?: string };
}) {
  function fieldProps(name: keyof MutableTeamRegistration, label: string) {
    const schema = MutableTeamRegistrationSchema.shape[name];
    const required = !(schema instanceof ZodOptional);
    const inner = required ? schema : schema.unwrap();
    return {
      label: label + (required ? " (required)" : ""),
      name,
      value: String(values[name] ?? ""),
      error: errors[name],
      required,
      autoComplete: "off",
      ...(inner instanceof ZodNumber
        ? {
            type: "number",
            min: inner.minValue ?? undefined,
            max: inner.maxValue ?? undefined,
          }
        : inner instanceof ZodString
          ? {
              type: inner.isEmail ? "email" : "text",
              minLength: inner.minLength ?? (required ? 1 : 0),
              maxLength: inner.maxLength ?? 255,
            }
          : { type: "text" }),
    };
  }

  return (
    <>
      <div>
        <LabeledInputWithError {...fieldProps("name", "Team Name")} />
      </div>

      <section>
        <SectionHeader>Contact Information</SectionHeader>
        <div>
          <LabeledInputWithError
            {...fieldProps("contactName", "Contact Name")}
            autoComplete="name"
          />
        </div>
        <div>
          <LabeledInputWithError
            {...fieldProps("contactEmail", "Contact Email")}
            autoComplete="email"
          />
        </div>
        <div>
          <LabeledInputWithError
            {...fieldProps("contactPhone", "Contact Phone")}
            type="tel"
            autoComplete="tel"
          />
        </div>
        <div>
          <LabeledTextAreaWithError
            {...fieldProps("contactMailingAddress", "Contact Mailing Address")}
            autoComplete="street-address"
            rows={3}
            cols={40}
          />
        </div>
        <div>
          <LabeledInputWithError
            {...fieldProps("secondaryContactName", "Secondary Contact Name")}
          />
        </div>
        <div>
          <LabeledInputWithError
            {...fieldProps("secondaryContactEmail", "Secondary Contact Email")}
          />
        </div>
        <div>
          <LabeledInputWithError
            {...fieldProps("secondaryContactPhone", "Secondary Contact Phone")}
            type="tel"
          />
        </div>
      </section>

      <section>
        <SectionHeader>Team Information</SectionHeader>
        <LabeledInputWithError
          {...fieldProps("teamEmail", "Team-wide Email Address")}
        />
        <fieldset>
          <legend>
            What’s your team’s goal for the 2025 Mystery Hunt? (required)
          </legend>
          <div>
            {TEAM_GOALS.map((goal, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="teamGoal"
                  id={`teamGoal-${i}`}
                  value={goal}
                  defaultChecked={values.teamGoal === goal}
                  required
                />
                <label htmlFor={`teamGoal-${i}`}>{goal}</label>
              </div>
            ))}
            {errors.teamGoal && <ErrorText>{errors.teamGoal}</ErrorText>}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            Which parts of the MIT Mystery Hunt experience does your team value
            the most? (choose up to 5)
          </legend>
          <div>
            {TEAM_VALUES.map((value, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="teamValues"
                  id={`teamValues-${i}`}
                  value={value}
                  defaultChecked={values.teamValues?.includes(value)}
                />
                <label htmlFor={`teamValues-${i}`}>{value}</label>
              </div>
            ))}
            <div>
              <input
                type="checkbox"
                name="teamValues"
                id="teamValuesOtherCheck"
                value="Other"
                defaultChecked={!!values.teamValuesOther?.length}
              />
              <label htmlFor="teamValuesOtherCheck">Other</label>
              <CheckedDetailsDiv>
                <LabeledInputWithError
                  {...fieldProps("teamValuesOther", "Please specify")}
                />
              </CheckedDetailsDiv>
            </div>
            {errors.teamValues && <ErrorText>{errors.teamValues}</ErrorText>}
          </div>
        </fieldset>

        <LabeledInputWithError
          {...fieldProps(
            "teamExcitedAboutWinning",
            "Is your team excited about the prospect of winning?",
          )}
        />
        <LabeledInputWithError
          {...fieldProps(
            "teamYearEstablished",
            "In what year did your team first compete in Mystery Hunt?",
          )}
        />
        <LabeledInputWithError
          {...fieldProps(
            "teamMemberLocations",
            "Where are your team members primarily located?",
          )}
        />
      </section>

      <section>
        <SectionHeader>Team Location</SectionHeader>

        <fieldset>
          <legend>
            Which of the following describes your team’s physical location
            during the 2025 MIT Mystery Hunt? (required)
          </legend>
          <div>
            <p>
              (Note that if you are requesting space at MIT, you must register{" "}
              <strong>before December 21st</strong>. Please{" "}
              <strong>do not</strong> contact the Schedules Office directly for
              space as we have already worked with them to reserve rooms.)
            </p>
            {TEAM_LOCATIONS.map(
              ({ value, label, detailLabel, detailKey }, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name="teamLocation"
                    id={`teamLocation-${i}`}
                    value={value}
                    defaultChecked={values.teamLocation === value}
                    required
                  />
                  <label htmlFor={`teamLocation-${i}`}>{label}</label>
                  <CheckedDetailsDiv>
                    <LabeledTextAreaWithError
                      {...fieldProps(detailKey, detailLabel)}
                      rows={3}
                      cols={80}
                    />
                  </CheckedDetailsDiv>
                </div>
              ),
            )}
            {errors.teamLocation && (
              <ErrorText>{errors.teamLocation}</ErrorText>
            )}
          </div>
        </fieldset>
      </section>

      <section>
        <SectionHeader>Team Composition</SectionHeader>

        <LabeledInputWithError
          {...fieldProps("peopleTotal", "Total number of people on your team")}
        />

        <fieldset>
          <legend>How many people on your team are (all required):</legend>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <LabeledInputWithError
              {...fieldProps("peopleUndergrad", "MIT Undergraduates")}
            />
            <LabeledInputWithError
              {...fieldProps("peopleGrad", "MIT Graduate students")}
            />
            <LabeledInputWithError
              {...fieldProps("peopleAlum", "MIT Alumni")}
            />
            <LabeledInputWithError
              {...fieldProps("peopleStaff", "MIT Faculty and Staff")}
            />
            <LabeledInputWithError
              {...fieldProps(
                "peopleAffiliates",
                "MIT Affiliates (Lincoln Labs, WHOI, etc.)",
              )}
            />
            <LabeledInputWithError
              {...fieldProps(
                "peopleMinor",
                "Minors (team members who will be under 18 during Hunt who are not MIT students)",
              )}
            />
            <LabeledInputWithError
              {...fieldProps(
                "peopleOther",
                "Other (Not affiliated with MIT and not a minor)",
              )}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Campus presence:</legend>
          <div>
            <LabeledInputWithError
              {...fieldProps(
                "peopleOnCampus",
                "Number of team members who will be on or near campus during Hunt",
              )}
            />
            <LabeledInputWithError
              {...fieldProps(
                "peopleRemote",
                "Number of team members who will be fully remote during Hunt",
              )}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            Are you willing to welcome unattached Hunters (hunters with no team
            affiliation) to your team this year?
          </legend>
          <div>
            <div>
              <input
                type="radio"
                name="acceptUnattached"
                id="acceptUnattached-yes"
                value="yes"
                defaultChecked={values.acceptUnattached === true}
                required
              />
              <label htmlFor="acceptUnattached-yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="acceptUnattached"
                id="acceptUnattached-no"
                value="no"
                defaultChecked={values.acceptUnattached === false}
                required
              />
              <label htmlFor="acceptUnattached-no">No</label>
            </div>
            {errors.acceptUnattached && (
              <ErrorText>{errors.acceptUnattached}</ErrorText>
            )}
          </div>
        </fieldset>
      </section>

      <section>
        <SectionHeader>Other</SectionHeader>
        <fieldset>
          <legend>How did you hear about the Mystery Hunt?</legend>
          <div>
            {REFERRERS.map((referrer, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="referrer"
                  id={`referrer-${i}`}
                  value={referrer}
                  defaultChecked={values.referrer === referrer}
                  required
                />
                <label htmlFor={`referrer-${i}`}>{referrer}</label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                name="referrer"
                id="referrerOther"
                value="Other"
                defaultChecked={!!values.referrerOther?.length}
              />
              <label htmlFor="referrerOther">Other</label>
              <CheckedDetailsDiv>
                <LabeledInputWithError
                  {...fieldProps("referrerOther", "Please Specify")}
                />
              </CheckedDetailsDiv>
            </div>
            {errors.referrer && <ErrorText>{errors.referrer}</ErrorText>}
          </div>
        </fieldset>
      </section>
      <LabeledTextAreaWithError
        {...fieldProps(
          "otherNotes",
          "Anything else you’d like to share with us?",
        )}
      />
    </>
  );
}

export function cleanUrlEncodedDataFromRegistrationUpdate(
  formData: Record<string, string | string[]>,
): MutableTeamRegistration {
  function cleanString(s: string | undefined | string[]): string {
    if (Array.isArray(s)) {
      return s.join(", ");
    }

    return s ?? "";
  }

  function cleanNumber(s: string | undefined | string[]): number {
    if (!s) {
      return 0;
    }

    if (Array.isArray(s)) {
      const first = s[0];
      if (!first) {
        return 0;
      }
      return parseInt(first, 10);
    }

    return parseInt(s, 10);
  }

  function cleanArray(s: string | undefined | string[]): string[] {
    if (Array.isArray(s)) {
      return s;
    }

    if (!s) {
      return [];
    }

    return [s];
  }

  const teamValues = cleanArray(formData.teamValues);

  const teamLocationValues: {
    teamLocation: MutableTeamRegistration["teamLocation"];
    teamLocationDetailsRemote?: string;
    teamLocationDetailsRoomRequest?: string;
    teamLocationDetailsNoRoomRequested?: string;
  } = {
    teamLocation: cleanString(
      formData.teamLocation,
    ) as MutableTeamRegistration["teamLocation"],
  };
  TEAM_LOCATIONS.forEach(({ value, detailKey }) => {
    if (value === teamLocationValues.teamLocation) {
      teamLocationValues[detailKey] = cleanString(formData[detailKey]);
    }
  });

  return {
    name: cleanString(formData.name),
    teamEmail: cleanString(formData.teamEmail),
    contactName: cleanString(formData.contactName),
    contactEmail: cleanString(formData.contactEmail),
    contactPhone: cleanString(formData.contactPhone),
    contactMailingAddress: cleanString(formData.contactMailingAddress),
    secondaryContactName: cleanString(formData.secondaryContactName),
    secondaryContactEmail: cleanString(formData.secondaryContactEmail),
    secondaryContactPhone: cleanString(formData.secondaryContactPhone),
    teamGoal: cleanString(formData.teamGoal),
    teamValues,
    teamValuesOther: teamValues.includes("Other")
      ? (formData.teamValuesOther as string)
      : undefined,
    teamExcitedAboutWinning: cleanString(formData.teamExcitedAboutWinning),
    teamYearEstablished: cleanNumber(formData.teamYearEstablished),
    teamMemberLocations: cleanString(formData.teamMemberLocations),
    ...teamLocationValues,
    peopleTotal: cleanNumber(formData.peopleTotal),
    peopleUndergrad: cleanNumber(formData.peopleUndergrad),
    peopleGrad: cleanNumber(formData.peopleGrad),
    peopleAlum: cleanNumber(formData.peopleAlum),
    peopleStaff: cleanNumber(formData.peopleStaff),
    peopleAffiliates: cleanNumber(formData.peopleAffiliates),
    peopleMinor: cleanNumber(formData.peopleMinor),
    peopleOther: cleanNumber(formData.peopleOther),
    peopleOnCampus: cleanNumber(formData.peopleOnCampus),
    peopleRemote: cleanNumber(formData.peopleRemote),
    acceptUnattached: formData.acceptUnattached === "yes",
    referrer: cleanString(formData.referrer),
    referrerOther:
      formData.referrer === "Other"
        ? cleanString(formData.referrerOther)
        : undefined,
    otherNotes: cleanString(formData.otherNotes),
  };
}
