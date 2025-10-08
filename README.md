# Subscription API

A Node.js/Express API for managing user subscriptions. Uses MongoDB (Mongoose) for persistence, JWT for authentication, Arcjet for basic bot/rate protection, and Upstash Workflows for reminder scheduling.

## Features

- User sign up / sign in with JWT
- Create, read, and manage subscriptions
- Subscription reminder workflow (Upstash)
- Email reminders (nodemailer) with templates
- Arcjet middleware for bot detection/rate limiting

## Requirements

- Node.js 18+ (some dependencies require Node >= 18)
- MongoDB (connection URI)

## Setup

1. Install dependencies

   npm install

2. Create environment files

   The project uses dotenv and expects files named like:
   - `.env.development.local`
   - `.env.production.local`

   Minimum environment variables:

   - PORT (e.g. 5000)
   - NODE_ENV (development|production)
   - DB_URI (MongoDB connection string)
   - JWT_SECRET
   - JWT_EXPIRES_IN (e.g. 1d)
   - ARCJET_KEY (optional, for Arcjet protection)
   - ARCJET_ENV (optional)
   - UPSTASH_URL / UPSTASH_TOKEN (if using Upstash)
   - SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS (for nodemailer)

3. Run the app (development)

   npm run dev

## API Endpoints

Base path: `/api/v1`

Auth
- POST /api/v1/auth/sign-up
  - Body: { name, email, password }
  - Response: { data: { token, user } }

- POST /api/v1/auth/sign-in
  - Body: { email, password }
  - Response: { data: { token, user } }

Subscriptions
- POST /api/v1/subscriptions
  - Requires `Authorization: Bearer <token>` header
  - Body: { name, price, currency, frequency, category, payment, startDate }

- GET /api/v1/subscriptions
- GET /api/v1/subscriptions/:id

Users
- GET /api/v1/users
- GET /api/v1/users/:id (requires auth)

## Email Reminders

The workflow uses Upstash Workflows to schedule reminders. The `sendReminderEmail` utility will use the SMTP configuration from env to send reminder emails.

## Troubleshooting

- Error: `EADDRINUSE` — Another process is using the configured `PORT`. Change `PORT` or stop the process using that port.
- Error: `Unauthorized` — Ensure you send a valid JWT in the Authorization header. The token must look like three dot-separated parts (header.payload.signature).
- Error: `Path 'payment' is required.` — The subscription `payment` field is required; include it in the request body.
- Error: `MissingSchemaError: Schema hasn't been registered for model "email".` — This usually means a `.populate()` call was passed incorrect arguments (e.g., `.populate('user','name','email')`). Use `.populate('user','name email')` to select multiple fields.

## Examples

Sign up and create a subscription (bash/curl):

1) Sign up

```bash
curl -X POST http://localhost:5000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"secret"}'
```

2) Use returned token to create subscription

```bash
curl -X POST http://localhost:5000/api/v1/subscriptions \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Netflix","price":10,"currency":"USD","frequency":"monthly","category":"entertainment","payment":"credit card","startDate":"2025-10-06T00:00:00.000Z"}'
```

## Next steps / improvements

- Add integration tests for auth and subscription flows
- Retry handling for email sending
- Database connection resilience and migrations

---

If you want any section expanded (detailed env examples, Postman collection, or a quick test harness), tell me which and I'll add it.
