# Samichlaus Verein Dietlikon Webseite

- Run development server (`npm run dev`)
- Use Supabase
  - Links
  - Start / Stop Service / Anon key
  - Link Staging Project
  - Make DB changes
  - Use Auth locally
  - Deploy Edge Functions
  - Sync Storage Buckets
  - Generate TS Types

Local Supabase: http://127.0.0.1:54323
Local DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Local Mail Testing URL: http://127.0.0.1:54324

Links:

- https://supabase.com/docs/guides/cli/getting-started#installing-the-supabase-cli
- https://supabase.com/docs/guides/cli/getting-started#running-supabase-locally

Commands used:

```bash
npm install

supabase start

supabase login

supabase link

# DB pull only as remote project member possible
supabase db pull && supabase migration up

supabase db pull --local
# Run after db pull and migration
supabase gen types typescript --local > types/database.types.ts

supabase status

supabase stop

# After env changes apply then (macOS:)
source .env
```

Template .env:

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
```

> From Shadcn UI are all components.

Checklist before staging/prod:

- [ ] Update local email templates with remote ones

> IMPORTANT: http://localhost:3000 doesn't work the same as http://127.0.0.1:3000
