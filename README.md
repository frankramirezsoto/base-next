# Next.js E-Commerce Template with Better Auth

A secure, production-ready Next.js template with authentication built-in. Perfect for starting your e-commerce or SaaS project.

## Features

- **Next.js 15** with App Router, TypeScript, and Tailwind CSS
- **Better Auth** for secure authentication with:
  - Email/Password authentication with email verification
  - Google OAuth
  - Apple OAuth
  - Password reset (forgot password)
  - Change password for logged-in users
- **Drizzle ORM** with PostgreSQL
- **Email Service Integration**:
  - SMTP support with Nodemailer (Gmail, Outlook, any SMTP server)
  - Email verification emails
  - Password reset emails
  - Beautiful HTML email templates
- **Toast Notifications**:
  - User-friendly error and success messages
  - Powered by Sonner
- **Security Best Practices**:
  - CSRF protection
  - Rate limiting
  - Secure password hashing (bcrypt)
  - Secure cookies (HTTP-only, SameSite)
  - Session management
  - Password reset with expiring tokens
- **Pre-built Components**:
  - Responsive navbar with user dropdown menu
  - Login and signup pages with toast feedback
  - Email verification page
  - Forgot password page
  - Reset password page
  - Change password page (for logged-in users)
  - OAuth integration

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd base-next
npm install
```

### 2. Set Up Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Better Auth - Generate a random secret (min 32 characters)
BETTER_AUTH_SECRET="your-secret-key-min-32-characters-long"

# URLs - Update for production
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (Optional - get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Apple OAuth (Optional - get from Apple Developer)
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_CLIENT_SECRET="your-apple-client-secret"
```

### 3. Set Up the Database

Run the database migration to create all authentication tables:

```bash
npm run db:push
```

Or generate and run migrations manually:

```bash
npm run db:generate
npm run db:migrate
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env.local`

### Apple OAuth

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a new App ID and Service ID
3. Configure Sign in with Apple
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/apple` (development)
   - `https://yourdomain.com/api/auth/callback/apple` (production)
5. Generate a private key and create a client secret
6. Copy the Client ID and Client Secret to your `.env.local`

## Email Verification Setup

This template includes email verification for new user signups. Email verification is **enabled by default** and users must verify their email before they can sign in.

### Email Service Integration

The template is designed to work with any email service provider. You need to implement the email sending logic in `src/lib/email/send-email.ts`.

#### Option 1: Resend (Recommended)

[Resend](https://resend.com) is a modern email API that's easy to set up.

1. Install Resend:
```bash
npm install resend
```

2. Get your API key from [Resend Dashboard](https://resend.com/api-keys)

3. Add to `.env.local`:
```env
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="onboarding@yourdomain.com"
```

4. Update `src/lib/email/send-email.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }: EmailOptions) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
  });
}
```

#### Option 2: SendGrid

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Get your API key from [SendGrid](https://sendgrid.com)

3. Add to `.env.local`:
```env
SENDGRID_API_KEY="your-sendgrid-api-key"
EMAIL_FROM="noreply@yourdomain.com"
```

4. Update `src/lib/email/send-email.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  await sgMail.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
    text,
  });
}
```

#### Option 3: SMTP (Nodemailer)

Works with any SMTP server (Gmail, Outlook, custom SMTP, etc.)

1. Install Nodemailer:
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

2. Add to `.env.local`:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

3. Update `src/lib/email/send-email.ts`:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}
```

### Development Mode

In development mode (NODE_ENV=development), emails are logged to the console instead of being sent. This allows you to test the signup flow without configuring an email service.

To test email verification in development:
1. Sign up with an email
2. Check the console for the verification link
3. Copy and paste the link into your browser

### Disabling Email Verification (Not Recommended)

If you want to disable email verification for testing:

1. Edit `src/lib/auth.ts`
2. Change `requireEmailVerification: true` to `requireEmailVerification: false`
3. Users will be able to sign in immediately after signup

**Note:** This is not recommended for production as it allows users with fake email addresses to create accounts.

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # Better Auth API routes
│   ├── login/               # Login page with forgot password link
│   ├── signup/              # Signup page
│   ├── verify-email/        # Email verification page
│   ├── forgot-password/     # Forgot password page
│   ├── reset-password/      # Reset password page (with token)
│   ├── change-password/     # Change password page (for logged-in users)
│   ├── products/            # Products page (placeholder)
│   ├── layout.tsx           # Root layout with navbar and toast provider
│   └── page.tsx             # Home page
├── components/
│   └── navbar.tsx           # Navbar with user dropdown menu
└── lib/
    ├── auth.ts              # Better Auth server configuration
    ├── auth-client.ts       # Better Auth client hooks
    ├── db/
    │   ├── index.ts         # Database connection
    │   └── schema.ts        # Database schema
    └── email/
        └── send-email.ts    # SMTP email service with nodemailer
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Security Features

This template implements several security best practices:

1. **Password Security**:
   - Minimum 8 characters requirement
   - Passwords hashed with bcrypt
   - Password stored separately from user profile

2. **Session Security**:
   - HTTP-only cookies
   - Secure cookies in production
   - Session expiration (7 days default)
   - IP address and user agent tracking

3. **CSRF Protection**:
   - Built-in CSRF protection via Better Auth
   - Trusted origins configuration

4. **Rate Limiting**:
   - 10 requests per minute per IP
   - Prevents brute force attacks

5. **Database Security**:
   - Prepared statements (SQL injection protection)
   - Foreign key constraints
   - Cascade deletes for data integrity

## Customization

### Adding More OAuth Providers

Better Auth supports many providers. To add more:

1. Install the provider package (if needed)
2. Add credentials to `.env.local`
3. Update `src/lib/auth.ts` to include the new provider
4. Add the provider button to login/signup pages

### Extending the Database Schema

1. Update `src/lib/db/schema.ts` with new tables
2. Run `npm run db:generate` to create migration
3. Run `npm run db:push` to apply changes

### Customizing the UI

- Update `src/components/navbar.tsx` for navigation changes
- Modify `src/app/login/page.tsx` and `src/app/signup/page.tsx` for auth pages
- Edit Tailwind classes for styling changes

## Production Deployment

Before deploying to production:

1. Update environment variables:
   - Set `NODE_ENV=production`
   - Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL`
   - Use a production PostgreSQL database
   - Generate a new `BETTER_AUTH_SECRET`

2. Enable email verification (optional):
   - Set up an email service (SendGrid, Resend, etc.)
   - Update `requireEmailVerification: true` in `src/lib/auth.ts`

3. Configure OAuth redirect URIs with your production domain

4. Deploy to your platform (Vercel, Netlify, etc.)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
