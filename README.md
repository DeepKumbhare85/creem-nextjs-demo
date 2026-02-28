# Creem + Next.js Demo

A minimal Next.js demo showcasing how to accept one-time payments and subscriptions using [Creem](https://www.creem.io), with order persistence via [Neon](https://neon.tech) (PostgreSQL) and [Drizzle ORM](https://orm.drizzle.team).

## Features

- One-time product checkout (lifetime access)
- Subscription checkout (monthly billing)
- Webhook handler with HMAC signature verification
- Order persistence in a Neon PostgreSQL database via Drizzle ORM
- Payment success page

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | [Next.js 16](https://nextjs.org)    |
| Payments   | [Creem](https://www.creem.io) (`@creem_io/nextjs`) |
| Database   | [Neon](https://neon.tech) (serverless PostgreSQL) |
| ORM        | [Drizzle ORM](https://orm.drizzle.team) |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) |
| Language   | TypeScript                          |

## Project Structure

```
app/
├── page.tsx                    # Landing page with checkout buttons
├── success/page.tsx            # Post-payment success page
└── api/
    ├── checkout/route.ts       # Creem checkout handler
    └── webhook/creem/route.ts  # Creem webhook receiver
db/
└── schema.ts                   # Drizzle ORM schema (orders table)
drizzle.config.ts               # Drizzle Kit configuration
```

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org)
- [pnpm](https://pnpm.io) (`npm i -g pnpm`)
- A [Creem](https://www.creem.io) account with at least one product created
- A [Neon](https://neon.tech) project (free tier works)

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-username/creem-nextjs-demo.git
cd creem-nextjs-demo
pnpm install
```

### 2. Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

| Variable               | Description                                                                     |
|------------------------|---------------------------------------------------------------------------------|
| `CREEM_API_KEY`        | Your Creem API key (test or live). Found in Creem dashboard → API Keys.         |
| `CREEM_WEBHOOK_SECRET` | Webhook signing secret. Found in Creem dashboard → Webhooks.                    |
| `DATABASE_URL`         | Neon PostgreSQL connection string. Found in Neon console → Connection Details.  |

### 3. Push the database schema

```bash
pnpm drizzle-kit push
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Webhook Setup (Local Development)

Creem needs a publicly accessible URL to deliver webhook events. Use [ngrok](https://ngrok.com) to expose your local server:

```bash
ngrok http 3000
```

Then register the forwarding URL as a webhook endpoint in your Creem dashboard:

```
https://<your-ngrok-id>.ngrok-free.app/api/webhook/creem
```

### Supported Webhook Events

| Event                   | Action                                              |
|-------------------------|-----------------------------------------------------|
| `checkout.completed`    | Logs payment details (extend to grant access)       |
| `subscription.paid`     | Inserts a new order row into the database           |
| `subscription.canceled` | Logs cancellation (extend to revoke access)         |

## Database Schema

```sql
CREATE TABLE "order" (
  id         SERIAL PRIMARY KEY,
  customerId VARCHAR(255) NOT NULL,
  productId  VARCHAR(255) NOT NULL UNIQUE,
  amount     INTEGER      NOT NULL,
  status     VARCHAR(50)  NOT NULL
);
```

## Available Scripts

| Command                   | Description                           |
|---------------------------|---------------------------------------|
| `pnpm dev`                | Start the development server          |
| `pnpm build`              | Build for production                  |
| `pnpm start`              | Start the production server           |
| `pnpm lint`               | Run ESLint                            |
| `pnpm drizzle-kit push`   | Push schema changes to the database   |
| `pnpm drizzle-kit studio` | Open Drizzle Studio (DB GUI)          |

## Deployment

Deploy to [Vercel](https://vercel.com) in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/creem-nextjs-demo)

After deploying, add all three environment variables (`CREEM_API_KEY`, `CREEM_WEBHOOK_SECRET`, `DATABASE_URL`) in the Vercel project settings, and update the webhook URL in Creem dashboard to your production domain.

## License

MIT
