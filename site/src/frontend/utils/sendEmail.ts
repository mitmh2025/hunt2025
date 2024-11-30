import nodemailer from "nodemailer";

const SMTP_USERNAME = process.env.SMTP_USERNAME ?? "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? "";
const SMTP_HOST = process.env.SMTP_HOST ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "");
const SMTP_FROM = process.env.SMTP_FROM ?? "";

if (
  process.env.NODE_ENV !== "development" &&
  (!SMTP_USERNAME || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT || !SMTP_FROM)
) {
  throw new Error("SMTP configuration is missing in production");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  requireTLS: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
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
  if (process.env.NODE_ENV === "development" && !SMTP_HOST) {
    console.log("Email would be sent to", to);
    console.log("Subject:", subject);
    console.log("Text:\n", plainText);
    return;
  }

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    text: plainText,
  });
}
