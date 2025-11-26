# tracy's match

A Next.js app that lets daters and their trusted curators collaborate privately. Authentication, password resets, and role routing are powered by Supabase Auth with secure client-side sessions.

## Prerequisites

1. Create a Supabase project.
2. Enable email/password auth and set a custom confirm redirect to `http://localhost:3000/choose-role` (or your deployed URL).
3. Create a `profiles` table to store user roles:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('dater','curator')),
  inserted_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;
create policy "Users manage their own profile" on public.profiles
  for select using (auth.uid() = id)
  with check (auth.uid() = id);
```

4. Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key (use the exact Project URL, not "undefined" or placeholders):

```bash
cp .env.example .env.local
```

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and use the signup/login flows. Email verification is required before role selection. Password resets are handled via `/reset-password` and honor Supabase recovery links.

## Security notes

- Sessions use Supabase's secure cookies with auto-refresh enabled in `lib/supabase.ts`.
- Signup enforces strong passwords and requires email confirmation.
- Login enforces the same password policy and offers password-reset links.
- Dashboards verify both authentication and the saved role before rendering; errors gracefully sign users out.

## Deploying

Deploy to Vercel or any Next.js host. Ensure the Supabase redirect URLs include your deployed domain for email confirmation and password recovery.
