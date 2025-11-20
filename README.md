# Next.js E-Commerce Template with Better Auth

A secure, production-ready Next.js template with authentication built-in. Perfect for starting your e-commerce or SaaS project.

## Features

- **Next.js 15** with App Router, TypeScript, and Tailwind CSS
- **Better Auth** for secure authentication with:
  - Email/Password authentication
  - Google OAuth
  - Apple OAuth
- **Drizzle ORM** with PostgreSQL
- **Security Best Practices**:
  - CSRF protection
  - Rate limiting
  - Secure password hashing (bcrypt)
  - Secure cookies (HTTP-only, SameSite)
  - Session management
- **Pre-built Components**:
  - Responsive navbar with auth state
  - Login and signup pages
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

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # Better Auth API routes
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.tsx           # Root layout with navbar
│   └── page.tsx             # Home page
├── components/
│   └── navbar.tsx           # Navbar with auth state
└── lib/
    ├── auth.ts              # Better Auth server configuration
    ├── auth-client.ts       # Better Auth client hooks
    └── db/
        ├── index.ts         # Database connection
        └── schema.ts        # Database schema
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
