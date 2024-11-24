import React from "react";
import { styled } from "styled-components";
import type { MutableTeamRegistration } from "../../../lib/api/frontend_contract";
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

const Fieldset = styled.fieldset`
  margin: 1em 0;
`;

export default function UpdateRegistrationFormInputs({
  values,
  errors,
}: {
  values: Partial<MutableTeamRegistration>;
  errors: { [K in keyof MutableTeamRegistration]?: string };
}) {
  function fieldProps(
    name: keyof MutableTeamRegistration,
    { numeric = false, required = false, maxLength = 255 } = {},
  ) {
    return {
      name,
      value: String(values[name] ?? ""),
      error: errors[name],
      required,
      ...(numeric
        ? {
            type: "number",
          }
        : {
            type: "text",
            minLength: required ? 1 : 0,
            maxLength: maxLength,
          }),
    };
  }

  return (
    <>
      <div>
        <LabeledInputWithError
          label="Team Name (required)"
          {...fieldProps("name", { required: true })}
        />
      </div>

      <h2>Contact Information</h2>
      <div>
        <LabeledInputWithError
          label="Contact Name (required)"
          {...fieldProps("contactName", { required: true })}
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Contact Email (required)"
          {...fieldProps("contactEmail", { required: true })}
          type="email"
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Contact Phone (required)"
          {...fieldProps("contactPhone", { required: true })}
          type="tel"
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Contact Mailing Address (required)"
          {...fieldProps("contactMailingAddress", { required: true })}
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Secondary Contact Name"
          {...fieldProps("secondaryContactName")}
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Secondary Contact Email"
          {...fieldProps("secondaryContactEmail")}
          type="email"
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Secondary Contact Phone"
          {...fieldProps("secondaryContactPhone")}
          type="tel"
        />
      </div>

      <h2>Team Information</h2>
      <div>
        <LabeledInputWithError
          label="Team-wide Email Adrress (required)"
          {...fieldProps("teamEmail", { required: true })}
          type="email"
        />
      </div>
      <div>
        <Fieldset>
          <legend>
            What&apos;s your team&apos;s goal for the 2025 Mystery Hunt?
            (required)
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
        </Fieldset>
      </div>
      <div>
        <Fieldset>
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
                  label="Please specify"
                  {...fieldProps("teamValuesOther")}
                />
              </CheckedDetailsDiv>
            </div>
            {errors.teamValues && <ErrorText>{errors.teamValues}</ErrorText>}
          </div>
        </Fieldset>
      </div>
      <div>
        <LabeledInputWithError
          label="Is your team excited about the prospect of winning? (required)"
          {...fieldProps("teamExcitedAboutWinning", { required: true })}
        />
      </div>
      <div>
        <LabeledInputWithError
          label="What year was your team established? (required)"
          {...fieldProps("teamYearEstablished", {
            required: true,
            numeric: true,
          })}
        />
      </div>
      <div>
        <LabeledInputWithError
          label="Where are your team members primarily located? (required)"
          {...fieldProps("teamMemberLocations", { required: true })}
        />
      </div>

      <h2>Team Location</h2>

      <div>
        <Fieldset>
          <legend>
            Which of the following describes your team&apos;s physical location
            during the 2025 MIT Mystery Hunt?
          </legend>
          <div>
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
                      label={detailLabel}
                      {...fieldProps(detailKey, {
                        maxLength: 1024,
                      })}
                    />
                  </CheckedDetailsDiv>
                </div>
              ),
            )}
            {errors.teamLocation && (
              <ErrorText>{errors.teamLocation}</ErrorText>
            )}
          </div>
        </Fieldset>
      </div>

      <h2>Team Composition</h2>

      <div>
        <LabeledInputWithError
          label="Total number of people on your team (required)"
          {...fieldProps("peopleTotal", { required: true, numeric: true })}
        />
      </div>

      <div>
        <Fieldset>
          <legend>How many people on your team are:</legend>
          <div>
            <LabeledInputWithError
              label="MIT Undergraduates"
              {...fieldProps("peopleUndergrad", { numeric: true })}
            />
            <LabeledInputWithError
              label="MIT Graduate students"
              {...fieldProps("peopleGrad", { numeric: true })}
            />
            <LabeledInputWithError
              label="MIT Alumni"
              {...fieldProps("peopleAlum", { numeric: true })}
            />
            <LabeledInputWithError
              label="MIT Faculty and Staff"
              {...fieldProps("peopleStaff", { numeric: true })}
            />
            <LabeledInputWithError
              label="MIT Affiliates (Lincoln Labs, WHOI, etc.)"
              {...fieldProps("peopleAffiliates", { numeric: true })}
            />
            <LabeledInputWithError
              label="Minors (team members who will be under 18 during Hunt who are not MIT students)"
              {...fieldProps("peopleMinor", { numeric: true })}
            />
            <LabeledInputWithError
              label="Other (Not affiliated with MIT and not a minor)"
              {...fieldProps("peopleOther", { numeric: true })}
            />
          </div>
        </Fieldset>
      </div>

      <div>
        <Fieldset>
          <legend>Campus presence:</legend>
          <div>
            <LabeledInputWithError
              label="Number of team members who will be on or near campus during Hunt"
              {...fieldProps("peopleOnCampus", { numeric: true })}
            />
            <LabeledInputWithError
              label="Number of team members who will be fully remote during Hunt"
              {...fieldProps("peopleRemote", { numeric: true })}
            />
          </div>
        </Fieldset>
      </div>

      <div>
        <Fieldset>
          <legend>
            Are you wiling to welcome unattached Hunters to your team this year?
          </legend>
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
            <input
              type="radio"
              name="acceptUnattached"
              id="acceptUnattached-no"
              value="no"
              defaultChecked={values.acceptUnattached === false}
              required
            />
            <label htmlFor="acceptUnattached-no">No</label>
            {errors.acceptUnattached && (
              <ErrorText>{errors.acceptUnattached}</ErrorText>
            )}
          </div>
        </Fieldset>
      </div>

      <h2>Other</h2>
      <div>
        <Fieldset>
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
                  label="Please Specify"
                  {...fieldProps("referrerOther")}
                />
              </CheckedDetailsDiv>
            </div>
            {errors.referrer && <ErrorText>{errors.referrer}</ErrorText>}
          </div>
        </Fieldset>
      </div>
      <div>
        <LabeledTextAreaWithError
          label="Anything else you’d like to share with us?"
          {...fieldProps("otherNotes", { maxLength: 1024 })}
        />
      </div>
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
    secondaryContactEmail:
      cleanString(formData.secondaryContactEmail) || undefined,
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
