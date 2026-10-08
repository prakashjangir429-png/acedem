# Editing website content

All public page bodies and page SEO metadata are loaded on the server from `content/pages/*.json` using `node:fs/promises`. There is no browser fetch for page content. Pages use SSR (`force-dynamic`); save a JSON file and refresh the page to see the change. React's request-scoped cache keeps metadata and rendering on the same content snapshot without caching across requests.

## Files and routes

- `home.json`: `/`
- `contact.json`, `courses.json`, `curriculum.json`, `career.json`: their matching routes
- `course-<slug>.json`: `/courses/<slug>`
- `curriculum-<slug>.json`: `/curriculum/<slug>`
- A new `about.json`: `/about` (existing fixed routes take precedence)
- `data.json`: shared data for navigation and legacy components. This file is imported into those components; it is not the runtime page source. Edit each page's JSON to change its rendered sections.

The navigation and footer layouts remain separate components. Adding a JSON page does not automatically add it to navigation.

## Page structure

```json
{
  "version": 1,
  "metadata": {
    "title": "About Us | Digitonix Academy",
    "description": "Learn about our academy.",
    "keywords": ["digital marketing training"],
    "canonical": "/about",
    "noIndex": false
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "eyebrow": "Meet the academy",
      "heading": "Learn. Create. Grow.",
      "description": "Practical learning for your next step.",
      "buttons": [{"label": "Explore courses", "href": "/courses"}]
    },
    {
      "id": "values",
      "type": "cards",
      "heading": "What we believe",
      "items": [{"title": "Learn by doing", "description": "Build practical projects."}]
    }
  ]
}
```

## Sections

Move objects within `sections` to reorder them. Add `"enabled": false` to hide a section. Give every section a unique `id` consisting of lowercase letters, numbers and hyphens, starting with a letter. The ID also works as a URL anchor.

Supported types:

| Type | Required content |
| --- | --- |
| `hero` | `heading`; optional `eyebrow`, `description`, `buttons` |
| `cta` | `heading`, `buttons` |
| `cards` | `items` with `title`; optional description, features, detail, eyebrow, highlight, href, linkLabel |
| `modules` | `items` with title, category and items containing name/desc |
| `features` | `items`: strings |
| `stats` | `items`: value (number), suffix, label |
| `testimonials` | `items`: name, role, text, rating (0–5) |
| `faq` | `items`: question/answer |
| `contact` | heading, contacts (label/value/optional href), buttons and form configuration; copy contact.json |

All section types support `heading`, `description`, `eyebrow`, `id`, and `enabled`. Buttons use `label` and `href`. Links accept local paths, HTTPS URLs, mailto, tel and anchors; JavaScript URLs are rejected. Text is rendered through React rather than raw HTML.

Use one enabled `hero` section per page for a single main heading. Content is validated with Zod before rendering. Invalid JSON or schema errors identify the file on the server; they are not silently replaced with stale content. Unknown pages return 404, and file keys cannot traverse outside the content directory.

## Deployment and next stages

This filesystem-based SSR layer requires a Node.js server; static export is not supported. Ensure deployment includes the `content` directory. Runtime JSON editing needs persistent writable storage; ephemeral/serverless filesystem writes are not durable.

This stage does not implement dashboard authentication, JSON editing APIs, lead storage/source tracking, MongoDB blogs, CKEditor, or public blog pages. The enquiry form still prepares an email draft and does not store or send a lead. These will be added on top of this content layer.

The resources page uses resource-library (searchable cards with category, format, href and optional download) and latest-blogs (server-rendered published stories with a configurable limit) sections. Edit content/pages/resources.json or /admin/pages/resources. Downloadable templates live in public/resources.
