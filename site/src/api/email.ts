import * as aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";
import { type Address } from "nodemailer/lib/mailer";
// eslint-disable-next-line import/default -- eslint can't parse the CommonJS module
import postmarkTransport from "nodemailer-postmark-transport";
import { type TeamRegistration } from "../../lib/api/contract";

type Content =
  | {
      subject: string;
      text: string;
      html?: string;
    }
  | {
      templateAlias: string;
      templateModel: Record<string, string>;
    };

type Message = {
  to: Address | Address[];
  messageStream?: string;
} & Content;

export type Mailer = {
  sendEmail(message: Message): void | PromiseLike<void>;
};

class MockMailer {
  sendEmail(message: Message) {
    console.log("Email would be sent to", message.to);
    if ("subject" in message) {
      console.log("Subject:", message.subject);
    }
    if (message.messageStream) {
      console.log("Message stream:", message.messageStream);
    }
    if ("text" in message) {
      console.log("Text:\n", message.text);
      if (message.html) {
        console.log("HTML:\n", message.html);
      }
    } else {
      console.log("Template alias:", message.templateAlias);
      console.log("Template model:\n", message.templateModel);
    }
  }
}

class RealMailer {
  private sendDefaults: {
    from?: string;
    messageStream?: string;
  };
  private transporter: nodemailer.Transporter;

  constructor({ emailFrom }: { emailFrom: string }) {
    this.sendDefaults = {
      from: emailFrom,
    };
    if (process.env.EMAIL_TRANSPORT === "postmark") {
      const token = process.env.EMAIL_POSTMARK_TOKEN;
      if (!token) {
        throw new Error(
          "postmark transport requested without $EMAIL_POSTMARK_TOKEN",
        );
      }
      this.transporter = nodemailer.createTransport(
        postmarkTransport({
          auth: {
            apiKey: token,
          },
        }),
      );
      const stream = process.env.EMAIL_POSTMARK_STREAM;
      if (stream) {
        this.sendDefaults.messageStream = stream;
      }
    } else {
      // SES is the default transport
      const ses = new aws.SES({
        apiVersion: "2010-12-01",
        region: "us-east-1",
        credentials: defaultProvider(),
      });
      this.transporter = nodemailer.createTransport({
        SES: { ses, aws },
      });
    }
  }

  async sendEmail(message: Message) {
    await this.transporter.sendMail({
      ...this.sendDefaults,
      ...message,
    });
  }
}

export function getMailer({ emailFrom }: { emailFrom?: string }) {
  if (emailFrom) {
    return new RealMailer({ emailFrom });
  }
  return new MockMailer();
}

export function confirmationEmailTemplate({
  registration,
}: {
  registration: TeamRegistration;
}) {
  return `
Hi ${registration.contactName},

Thank you for registering your team, ${registration.name}, for the 2025 Mystery Hunt!

Your team username is: ${registration.username}
Your team password is: ${registration.password}

You can log in at https://www.mitmh2025.com/login to view and update your
registration details. Please keep your registration up-to-date if any of your
information changes.

If you have any other questions, please refer to the FAQ at https://www.mitmh2025.com
or email info@mitmh2025.com.
`;
}

export function hintResponseEmailTemplate({
  teamName,
  puzzleName,
  puzzleSlug,
  responseHTML,
}: {
  teamName: string;
  puzzleName: string;
  puzzleSlug: string;
  responseHTML: string;
}) {
  return {
    text: `
Hi ${teamName},

We've responded to your hint request for ${puzzleName}.

You can view your past requests and ask for more hints at
https://www.two-pi-noir.agency/puzzles/${puzzleSlug}/hints.

Regards,
Hunt HQ
`,
    html: `
<p>Hi ${teamName},</p>

<p>We've responded to your hint request for ${puzzleName}:</p>

<div>${responseHTML}</div>

<p>
You can view your past requests and ask for more hints at
<a href="https://www.two-pi-noir.agency/puzzles/${puzzleSlug}/hints">https://www.two-pi-noir.agency/puzzles/${puzzleSlug}/hints</a>.

<p>Regards,<br />
Hunt HQ</p>
`,
  };
}
