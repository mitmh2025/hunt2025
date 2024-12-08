import React from "react";
import { SectionHeader } from "../regsite/routes/RegsiteUI";
import {
  Button,
  LabeledInputWithError,
  LabeledTextAreaWithError,
} from "./StyledUI";

const TeamManager = () => {
  function fieldProps(name: string, label: string) {
    return {
      label,
      name,
      value: "",
      error: undefined,
      autoComplete: "off",
    };
  }

  return (
    <form>
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
      <Button>Submit</Button>
    </form>
  );
};

export default TeamManager;
