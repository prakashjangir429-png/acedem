# Digitonix Academy

## Run locally

```bash
npm install
npm run dev
```

Local development reads and edits page content in `content/pages/*.json`. Blog posts, leads and uploaded images use `.data/` locally. To use the same private Blob store locally, pull the project's OIDC environment with the Vercel CLI or set `BLOB_READ_WRITE_TOKEN` locally.

## Deploy on Vercel

Vercel functions cannot persist writes to the deployed project files. The deployed admin stores its JSON files in a **private Vercel Blob store**. No MongoDB is needed.

1. In **Vercel → Project → Storage**, create a Blob store with **Private** access and connect it to the project. New connections supply `BLOB_STORE_ID` and authenticate automatically through Vercel OIDC; older connections may supply `BLOB_READ_WRITE_TOKEN`. Use the same store for Production and Preview only if they should share content.
2. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` for the admin login. See `.env.example` and `scripts/setup-admin.cjs`.
3. Redeploy after the store is connected. Do not expose any Blob credentials with a `NEXT_PUBLIC_` prefix.

The deployed site uses bundled page JSON as initial content. The first admin save creates a persistent private JSON override in Blob; later deployments keep that edit. Custom pages, blog and lead collections are JSON files in Blob. Uploaded images are private WebP files served through `/api/images/[id]`. If the Blob connection is missing, bundled pages still load but admin writes report the missing configuration.

To move edits from a local workspace, choose **Admin → Page content → Export full backup** locally, then **Restore backup** in the deployed admin after Blob is connected. The backup contains pages, blog posts, leads and uploaded images. Individual page editors also support JSON export and import.
