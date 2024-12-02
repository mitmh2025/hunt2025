import * as aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";
// eslint-disable-next-line import/default -- eslint can't parse the CommonJS module
import postmarkTransport from "nodemailer-postmark-transport";
import { type TeamRegistration } from "../../lib/api/frontend_contract";

export type Mailer = {
  sendEmail({
    to,
    subject,
    plainText,
  }: {
    to: string | string[];
    subject: string;
    plainText: string;
  }): void | PromiseLike<void>;
};

class MockMailer {
  sendEmail({
    to,
    subject,
    plainText,
  }: {
    to: string | string[];
    subject: string;
    plainText: string;
  }) {
    console.log("Email would be sent to", to);
    console.log("Subject:", subject);
    console.log("Text:\n", plainText);
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

  async sendEmail({
    to,
    subject,
    plainText,
  }: {
    to: string | string[];
    subject: string;
    plainText: string;
  }) {
    await this.transporter.sendMail({
      ...this.sendDefaults,
      to,
      subject,
      text: plainText,
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
