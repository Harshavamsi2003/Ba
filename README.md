# Baby Blossom Naturopathy — Website

Premium, responsive React site for **Baby Blossom Naturopathy Fertility & Wellness Clinic**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Project structure

```
public/                 favicon, manifest, robots, og-image
src/
  assets/               images, hero photos, icons, logo, founder portrait
    hero/               desktop + mobile hero photos (auto-rotating)
    icons/services|values|journey/
    logo/  founder/
  components/           Navbar, Hero, About, Services, Journey,
                        Testimonials, Contact, Footer, FloatingActions,
                        Reveal, SEO, CountUp
  pages/                Home, Founder, NotFound
  data/site.js          ALL text content — edit here to update the site
  styles/               one CSS file per component (+ global.css tokens)
```

## Editing content
- **Text, services, testimonials, founder bio, contact details** → `src/data/site.js`
- **Colors / fonts** → CSS variables at the top of `src/styles/global.css`
- **Hero photos** → replace files in `src/assets/hero/` (keep the same names)

## Notes
- Testimonials are placeholders — replace them in `src/data/site.js` when you have real ones.
- The booking form opens WhatsApp pre-filled with the enquiry (no backend needed).
  To use a real backend/email later, swap the `submit` handler in `src/components/Contact.jsx`.
- Update the phone number, email and Google Maps address in `src/data/site.js`.

## Brand theme (logo colours)
The entire site is themed from the clinic logo. All colours live as CSS
variables at the top of `src/styles/global.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--indigo` | `#3C2A98` | primary — buttons, links, headings, icon glyphs |
| `--indigo-deep` | `#2A1D6B` | hover / dark headings |
| `--indigo-ink` | `#211656` | dark bands (footer, journey, CTA) |
| `--lime` | `#C6DA00` | accent — rings, dividers, highlights |
| `--lime-deep` | `#93A400` | legible lime for small text |
| `--heart` | `#E32C2E` | "love" accents (used sparingly) |

**Icons** are one uniform indigo glyph across every section; each section
then gets its own badge *frame* (ring / disc colour) defined under
`ICON BADGE SYSTEM` in `global.css` — so they're consistent yet distinct.
To retheme, change the tokens once and the whole site follows.

## Responsive / fluid scaling
The site adapts fluidly to every screen size and browser-zoom level:
- **Fluid root font-size** (`html{font-size:clamp(...)}`) so all rem-based
  type scales smoothly and reflows gracefully when zooming in/out.
- **Fluid icon badges** (`clamp()` widths) so icons resize with the viewport.
- **Fluid container padding** and section spacing via `clamp()`.
- **Full breakpoint ladder** — grids step 4→3→2→1 columns with no awkward
  middle states; navbar tightens at ≤1180px and collapses to a hamburger
  at ≤1024px.
- Verified with **zero horizontal overflow from 320px up to 1440px+**.

## Update — navbar, hero logos, Founder page & flat icon system
- **Navbar**: text darkened for clear visibility; subtitle strengthened; duplicate
  "Contact" removed (Book Appointment covers it); added **About Us** and **Founder**
  page links.
- **Hero**: four credibility "logos" (Happy Families, Years of Experience,
  Specialized Therapies, Personalized Care) added below the CTAs in a frosted panel.
- **About**: the old stat row was removed from this section; two buttons (About Us /
  Meet the Founder) added; Core Values now use four unique flat icons.
- **New pages**: `/founder` (dedicated founder page) and a reworked company-focused
  `/about-us`, both with rich content and animations.
- **Icon system**: rebuilt as flat, no-shading, CSS-masked glyphs tinted with the
  logo's purple & green. Each badge is monochrome (no colour mixing) and tones
  ALTERNATE per item, so every icon reads unique. Wellness feature row converted to
  text tags (icons removed).
- **Contact**: phone updated to +91 99940 54290 (everywhere via central data);
  "Open in Google Maps" link points to the exact clinic pin.
