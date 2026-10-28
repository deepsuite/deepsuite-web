# DeepSuite — corporate website

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · lucide-react. Server Components by default; client components only for the header and menus, the product demo, filters and search, the table-of-contents scroll-spy, the scroll reveal and the consultation form.

The site is a **fully static export** (`output: 'export'`, `trailingSlash: true`) published to **GitHub Pages** at **https://deepsuite.app**.

```bash
npm install
npm run dev        # http://localhost:4321
npm run lint
npm run typecheck  # run `npx next typegen` first on a fresh clone
npm run build      # writes the static site to out/
```

## Structure

```
app/                         Routes (all statically generated)
  industries/[industry]/[subindustry]   In-depth analysis, or an industry brief when no analysis exists
  insights/[slug] · insights/category/[category]
  solutions/[slug] · about/* · approach · contact · privacy
  sitemap.ts · robots.ts · icon.svg
public/                      CNAME (deepsuite.app), .nojekyll, og-image.png
.github/workflows/deploy.yml Lint, type-check, build, deploy to GitHub Pages
components/
  layout/                    Header, industry mega menu, mobile navigation, footer
  home/                      Homepage sections and the interactive demo (demo-data.ts = fictional data)
  industries/ insights/ contact/ ui/
content/
  industries/taxonomy.ts     12 groups, ~100 sectors, coverage levels
  industries/articles/*.ts   In-depth analyses (one file per published sector)
  insights/articles-*.ts     Articles as typed blocks
  solutions/index.ts         Solution pages
  work.ts                    Portfolio entries (concept/reference/client — keep labels honest)
lib/                         Lookups, metadata, structured data, validation, navigation
```

## Content

- **Add a sector:** add an entry to `content/industries/taxonomy.ts`. It immediately gets a route, menu entry and a *brief* page. Brief pages are `noindex` and excluded from the sitemap.
- **Publish an in-depth analysis:** add an `IndustryArticle` file under `content/industries/articles/` and register it in `articles/index.ts`. The page switches to the full template, becomes indexable and is added to the sitemap.
- **Coverage labels** (`focus`, `expertise`, `emerging`) describe depth of domain work, not clients. Update them as capabilities mature.
- **Articles:** add an `Insight` and list it in `lib/insights.ts`. Leave `publishedAt` unset until there is a real publication date; no author is shown beyond “DeepSuite”.
- **Portfolio:** only use `kind: 'client-project'` for genuine work you have permission to publish.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` runs on every push and pull request to `main`. Each run lints, type-checks and builds the static export. Pushes to `main` (and manual runs) then deploy `out/` to GitHub Pages. Pull requests only build.

One-time setup (already applied to `deepsuite/deepsuite-web`):

- **Settings → Pages:** Source is **GitHub Actions**, and the custom domain is `deepsuite.app`. `public/CNAME` carries the same value.
- **DNS (Cloudflare, zone `deepsuite.app`):**
  - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `AAAA @` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
  - `CNAME www` → `deepsuite.github.io`
  - Set these records to **DNS only** (grey cloud) so GitHub can issue the TLS certificate. Then enable **Enforce HTTPS** in Pages settings. If you later re-enable the Cloudflare proxy, use SSL mode **Full**.
  - Leave the `app.`, `api.` and `admin.` records unchanged.
- **Build configuration:** set the values below as Actions **variables**, not secrets. They are public and compiled into the site.

## Configuration (`.env.example` · Actions variables)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and JSON-LD. Defaults to `https://deepsuite.app`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact address. Hidden everywhere until set. |
| `NEXT_PUBLIC_SCHEDULING_URL` | Optional booking link offered after a successful enquiry. |
| `NEXT_PUBLIC_CONSULTATION_ENDPOINT` | External endpoint that receives enquiries as a JSON POST. It must allow CORS from the site origin. |

## Remaining integrations

1. **Enquiry delivery.** The form posts JSON to `NEXT_PUBLIC_CONSULTATION_ENDPOINT`. In production this is set as an Actions variable to [FormSubmit.co](https://formsubmit.co) (`https://formsubmit.co/ajax/<inbox>`), which emails each enquiry as a table to the inbox. Reply-to is set to the enquirer.
   - **Activation:** the first submission makes FormSubmit email an activation link to the inbox. Nothing is delivered until it is clicked.
   - **Hide the address:** after activation, FormSubmit emails a random alias string. Replace the address in the variable with that alias (`https://formsubmit.co/ajax/<alias>`) and re-run the deploy workflow, so the inbox is not exposed in the site's JavaScript.
   - **Switching services:** the payload in `components/contact/consultation-form.tsx` (`toSubmission`) also works with Formspree. A custom endpoint can return `422 { errors }` for field errors and `429` when rate-limiting.
2. **Spam protection.** The browser side checks a honeypot field and a minimum completion time. Real protection has to live at the endpoint: rate limiting, plus a challenge such as Cloudflare Turnstile if needed.
3. **Scheduling.** Optionally set `NEXT_PUBLIC_SCHEDULING_URL`. No meeting is ever shown as booked.
4. **Legal.** `/privacy` is a working summary marked as pending legal review, and it is `noindex`. Add terms and finalize the privacy text before launch.
5. **Social profiles and contact details** are deliberately absent. Add them to the footer once they exist.
