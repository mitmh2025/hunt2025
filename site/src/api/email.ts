import * as aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";
import { type TeamRegistration } from "../../lib/api/frontend_contract";

const EMAIL_FROM = process.env.EMAIL_FROM;

if (process.env.NODE_ENV !== "development" && !EMAIL_FROM) {
  throw new Error("SMTP configuration is missing in production");
}

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
  credentials: defaultProvider(),
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export default async function sendEmail({
  to,
  subject,
  plainText,
}: {
  to: string | string[];
  subject: string;
  plainText: string;
}) {
  if (!EMAIL_FROM) {
    console.log("Email would be sent to", to);
    console.log("Subject:", subject);
    console.log("Text:\n", plainText);
    return;
  }

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    text: plainText,
  });
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
