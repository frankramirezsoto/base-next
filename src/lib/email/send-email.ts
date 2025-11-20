/**
 * Email Service Integration
 *
 * This file provides a structure for sending emails using any email service provider.
 * You can integrate services like:
 * - Resend (https://resend.com)
 * - SendGrid (https://sendgrid.com)
 * - AWS SES (https://aws.amazon.com/ses/)
 * - Postmark (https://postmarkapp.com)
 * - Nodemailer with any SMTP server
 *
 * Install your preferred email service package and implement the sendEmail function below.
 */

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using your preferred email service
 *
 * @example Using Resend:
 * ```
 * import { Resend } from 'resend';
 * const resend = new Resend(process.env.RESEND_API_KEY);
 *
 * export async function sendEmail({ to, subject, html }: EmailOptions) {
 *   await resend.emails.send({
 *     from: process.env.EMAIL_FROM!,
 *     to,
 *     subject,
 *     html,
 *   });
 * }
 * ```
 *
 * @example Using SendGrid:
 * ```
 * import sgMail from '@sendgrid/mail';
 * sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
 *
 * export async function sendEmail({ to, subject, html, text }: EmailOptions) {
 *   await sgMail.send({
 *     from: process.env.EMAIL_FROM!,
 *     to,
 *     subject,
 *     html,
 *     text,
 *   });
 * }
 * ```
 *
 * @example Using Nodemailer:
 * ```
 * import nodemailer from 'nodemailer';
 *
 * const transporter = nodemailer.createTransport({
 *   host: process.env.SMTP_HOST,
 *   port: Number(process.env.SMTP_PORT),
 *   secure: true,
 *   auth: {
 *     user: process.env.SMTP_USER,
 *     pass: process.env.SMTP_PASSWORD,
 *   },
 * });
 *
 * export async function sendEmail({ to, subject, html, text }: EmailOptions) {
 *   await transporter.sendMail({
 *     from: process.env.EMAIL_FROM,
 *     to,
 *     subject,
 *     html,
 *     text,
 *   });
 * }
 * ```
 */
export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  // TODO: Implement your email service integration here
  // For development/testing, you can log the email instead of sending it

  if (process.env.NODE_ENV === "development") {
    console.log("\n📧 Email would be sent:");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("HTML:", html);
    console.log("Text:", text);
    console.log("\n");
    return;
  }

  // In production, throw an error if email service is not configured
  throw new Error(
    "Email service not configured. Please implement the sendEmail function in src/lib/email/send-email.ts"
  );
}

/**
 * Send verification email to user
 */
export async function sendVerificationEmail(email: string, verificationUrl: string) {
  await sendEmail({
    to: email,
    subject: "Verify your email address",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin: 20px 0;">
            <h1 style="color: #2563eb; margin-top: 0;">Verify Your Email Address</h1>
            <p>Thank you for signing up! Please click the button below to verify your email address.</p>
            <div style="margin: 30px 0;">
              <a href="${verificationUrl}"
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color: #2563eb; word-break: break-all;">${verificationUrl}</a>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Verify Your Email Address

Thank you for signing up! Please visit the following link to verify your email address:

${verificationUrl}

If you didn't create an account, you can safely ignore this email.
    `,
  });
}
