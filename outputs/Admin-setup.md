# Academy dashboard

The dashboard lives at `/admin`. Blogs are available at `/blogs` and `/blogs/[slug]`.

1. Run `node scripts/setup-admin.cjs` in the project directory to choose your admin email and password. It stores a salted password hash and a random session secret in the ignored `.env.local` file.
2. Set `MONGODB_URI` and `MONGODB_DB` in `.env.local`. Atlas must allow your server's IP address. The database user needs read/write access to this database.
3. Set `NEXT_PUBLIC_CKEDITOR_LICENSE_KEY` to your CKEditor key and restart the server. The editor provides HTML editing until CKEditor is configured. `GPL` is only suitable when your project meets the GPL license requirements.
4. Run `npm run dev -- --webpack --hostname 127.0.0.1 --port 8888`, then open `http://127.0.0.1:8888/admin`.

Blog studio supports drafts, publishing, rich text, cover images, SEO fields and unique slugs. Published blogs render on the server; drafts are private. Blog HTML is sanitized before storage and rendering.

Use **Upload cover image** in Blog studio to choose a JPEG, PNG or WebP up to 5 MB. Images are validated, resized to at most 1600 pixels per edge, converted to WebP and stored in Atlas. The dashboard preview, public blog cards and article header all use the saved cover. Save the blog after uploading. Uploaded image URLs are public; use images intended for your website. Removing or replacing a cover detaches it from the blog without deleting the stored asset.

Ten published sample blogs include matching covers and clearly labelled sample article content. `node scripts/seed-blogs.cjs` adds missing samples without overwriting existing posts.

Lead inbox receives contact form submissions and lets you update their status. Source page and landing page are tracked in the visitor's browser session; these are attribution hints, not verified identities. Search applies to the current paginated list.

Page content provides a JSON editor and section map for every content page. Saves validate the existing schema, replace files atomically, and reject conflicting revisions. JSON editing requires a writable, persistent filesystem. Use a persistent server or volume; serverless deployments with read-only filesystems cannot support these page saves. Navbar/footer remain managed in the existing shared content/code.

Authentication uses a signed, eight-hour HttpOnly cookie. Rotate SESSION_SECRET to invalidate sessions. Changing the password hash also invalidates existing sessions. Login throttling is per server process; use an upstream shared rate limiter when running multiple instances. Never commit .env.local.

Dependency audit currently reports vulnerabilities in the existing Tailwind/PostCSS/ESLint toolchain. Review and upgrade these before production deployment. JSON edit conflict serialization is per server process; use one content-writing instance or a shared locking service for multiple instances.
