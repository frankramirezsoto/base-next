import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter with SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send an email using SMTP
 */
export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
      text: text || subject,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
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

/**
 * Send password reset email to user
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset your password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin: 20px 0;">
            <h1 style="color: #2563eb; margin-top: 0;">Reset Your Password</h1>
            <p>We received a request to reset your password. Click the button below to create a new password.</p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}"
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
            </p>
            <p style="color: #dc2626; font-size: 14px; margin-top: 30px;">
              This link will expire in 1 hour for security reasons.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Reset Your Password

We received a request to reset your password. Please visit the following link to create a new password:

${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
    `,
  });
}
