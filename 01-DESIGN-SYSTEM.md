# Amaspace — Design System

> Reference site: marandmor.com — same Nigerian MEPF market, same clean B2B aesthetic.
> This is a company credibility + services showcase + lead generation site.
> Primary conversion goal: "Request a Quote"
> NOT ecommerce. Products are a reference catalogue, not a storefront.

---

## Visual Direction

**Aesthetic:** Clean, airy, professional, approachable. White-dominant.
NOT dark. NOT industrial. NOT catalogue-heavy.
Think: established Nigerian engineering company that takes itself seriously but isn't stiff.

**What Mar&Mor does that we're matching:**
- White is the default background — navy is structural/accent only
- Lots of breathing room, generous padding
- Services and specializations are the hero content, not products
- Portfolio (past projects) is front and centre — it's the proof
- "Request a Quote" is always one click away, lives in the nav
- Thin top contact bar (phone + email) above the navbar

---

## Color Tokens

```css
:root {
  /* === BRAND === */
  --color-navy:          #0C2340;   /* Primary dark — footer, nav top-bar, hero overlays */
  --color-navy-light:    #1A3A5C;   /* Hover states on navy elements */
  --color-orange:        #E8620A;   /* Primary CTA — all buttons, icon accents, labels */
  --color-orange-hover:  #C9540A;   /* Orange hover */
  --color-blue:          #1156CC;   /* Links, secondary actions, active states */
  --color-blue-light:    #EEF4FF;   /* Blue tint backgrounds */

  /* === NEUTRALS === */
  --color-white:         #FFFFFF;
  --color-off-white:     #F7F8FA;   /* Alternating section backgrounds */
  --color-light-grey:    #EEF1F5;   /* Card backgrounds, input fields */
  --color-mid-grey:      #8A97A8;   /* Placeholder text, muted icons */
  --color-border:        #DEE4EC;   /* Card borders, dividers, input borders */
  --color-text:          #1A2535;   /* Primary body text */
  --color-text-muted:    #5A6A7A;   /* Secondary text, captions */
  --color-text-light:    #FFFFFF;   /* Text on dark backgrounds */

  /* === SEMANTIC === */
  --color-fire:          #D93025;   /* Fire safety category accent — use sparingly */
  --color-success:       #1A7F4B;
  --color-warning:       #D97706;

  /* === SHADOWS === */
  --shadow-card:         0 2px 16px rgba(12, 35, 64, 0.08);
  --shadow-card-hover:   0 8px 40px rgba(12, 35, 64, 0.15);
  --shadow-nav:          0 2px 12px rgba(12, 35, 64, 0.10);
  --shadow-dropdown:     0 8px 32px rgba(12, 35, 64, 0.14);
}
```

**Color usage rules:**
- `--color-navy` → navbar top-bar, footer, hero overlay, section accents
- `--color-orange` → ALL primary CTAs (buttons, "Request a Quote"), icon color, section label text
- `--color-blue` → text links, secondary buttons, active nav state
- `--color-white` → primary page background
- `--color-off-white` → alternating section bg (every other section)
- `--color-fire` → ONLY on fire safety specialization pages/badges. Never for errors/warnings.
- Navy as section bg: only for stats row, hero, footer, and CTA banner — not general content

---

## Typography

```css
:root {
  --font-heading: 'Montserrat', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

**Google Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

**Type Scale:**

| Token         | Size    | Weight | Font       | Usage                                    |
|---------------|---------|--------|------------|------------------------------------------|
| `--t-hero`    | 56px    | 800    | Montserrat | Hero headline                            |
| `--t-h1`      | 44px    | 700    | Montserrat | Page titles                              |
| `--t-h2`      | 36px    | 700    | Montserrat | Section headings                         |
| `--t-h3`      | 24px    | 600    | Montserrat | Card titles, subsection heads            |
| `--t-h4`      | 18px    | 600    | Montserrat | Small card titles, labels                |
| `--t-body-lg` | 18px    | 400    | Inter      | Lead paragraphs                          |
| `--t-body`    | 16px    | 400    | Inter      | Body text                                |
| `--t-body-sm` | 14px    | 400    | Inter      | Secondary text, card descriptions        |
| `--t-label`   | 12px    | 600    | Montserrat | Section labels (orange, uppercase)       |
| `--t-caption` | 12px    | 400    | Inter      | Captions, metadata                       |
| `--t-mono`    | 13px    | 400    | JetBrains  | Product codes, spec values               |

**Style rules:**
- Headings: sentence case (NOT ALL CAPS) — Mar&Mor never shouts
- Section labels (the small text above H2s): `--t-label`, orange, uppercase, `letter-spacing: 0.1em`
- Body line-height: `1.65`
- Heading line-height: `1.2`

---

## Spacing System

Base unit: `8px`

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   24px;
  --space-6:   32px;
  --space-7:   48px;
  --space-8:   64px;
  --space-9:   96px;
  --space-10:  128px;

  /* Section padding */
  --section-py: 100px;          /* Desktop vertical padding per section */
  --section-py-sm: 60px;        /* Mobile */

  /* Content max widths */
  --content-max:  1240px;
  --content-wide: 1440px;       /* For full-bleed sections with constrained inner content */
  --content-narrow: 800px;      /* For text-heavy sections (about copy, etc.) */
}
```

---

## Border Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;   /* Standard card radius */
  --radius-xl:   20px;   /* Large feature cards */
  --radius-pill: 999px;  /* Tags, pills, badges */
}
```

---

## Grid

- 12-column grid
- Gutter: `24px` (mobile), `32px` (desktop)
- Container: max `1240px`, centered, horizontal padding `24px` mobile / `40px` desktop

---

## Component Specs

### Top Contact Bar
```
Background: --color-navy
Height: 40px
Content: phone icon + number | email icon + address  (white, 13px Inter)
Position: above navbar, sticky together with nav on scroll
```

### Navbar
```
Background: white
Height: 72px
Shadow on scroll: --shadow-nav
Layout: [Logo] .... [About ▾] [Services ▾] [Specializations ▾] [Projects] [Contact] .... [Request a Quote]

Logo: left — "AMASPACE" wordmark + small hexagon icon, navy text
Nav links: Inter 500, 14px, --color-text, hover → --color-orange, underline transition
Active link: --color-orange, 2px bottom border
Dropdown: white bg, --shadow-dropdown, --radius-md, 8px padding rows

CTA Button "Request a Quote":
  background: --color-orange
  color: white
  padding: 10px 20px
  border-radius: --radius-md
  font: Montserrat 600 14px
  hover: --color-orange-hover

Mobile: hamburger → full-height slide-in overlay, navy bg, white links
```

### Hero Section
```
Height: 100dvh (or min 600px)
Background: real project photo (building/installation) + overlay rgba(12, 35, 64, 0.70)
Text: white, left-aligned
Layout:
  - Small label: "Building Services Company" — orange, --t-label, uppercase
  - H1: --t-hero, white, Montserrat 800
  - Sub paragraph: --t-body-lg, white 85% opacity, max-width 540px
  - Two buttons:
    Primary: "Request a Quote" — orange fill
    Secondary: "View Our Work" — white outline (border: 2px solid white, transparent bg)
  - Bottom row: 4 stat counters (animate on load)
    Each: large number (Montserrat 800, 40px, orange) + label (Inter, white, 13px)
```

### Section Header (reusable component)
```
Usage: top of every section
Structure:
  Line 1: --t-label, orange, uppercase, letter-spacing 0.1em   (e.g. "OUR SERVICES")
  Line 2: --t-h2, --color-text, Montserrat 700                 (e.g. "MEPF Excellence, Start to Finish")
  Line 3 (optional): --t-body-lg, --color-text-muted           (sub-description)

Alignment: left (never centered, more editorial and authoritative)
Bottom margin before section content: 48px
```

### Service Card (large — homepage services section)
```
Background: white
Border-radius: --radius-lg
Shadow: --shadow-card
Padding: 36px 32px
Hover: --shadow-card-hover, translateY(-4px), transition 0.25s ease

Contents:
  - Icon wrapper: 56px circle, --color-blue-light bg, orange icon, centered
  - Title: --t-h3, --color-text, Montserrat 600, margin-top 20px
  - Description: --t-body, --color-text-muted, line-height 1.6, margin-top 12px
  - Link: "Learn More →", --color-orange, Montserrat 600 14px, margin-top 20px

Layout in grid: 3 columns desktop / 1 column mobile
```

### Specialization Card (smaller — specializations grid)
```
Background: --color-off-white
Border-radius: --radius-md
Padding: 24px
Hover: white bg, --shadow-card, transition 0.2s

Contents (horizontal layout):
  Left: icon circle 44px, orange icon
  Right:
    Title: --t-h4, --color-text
    Description: --t-body-sm, --color-text-muted, 2 lines max

Layout: 2 columns desktop / 1 column mobile
```

### Project Card (portfolio)
```
Border-radius: --radius-lg
Overflow: hidden
Shadow: --shadow-card
Hover: --shadow-card-hover

Image area:
  Aspect ratio: 4/3
  Object-fit: cover
  Overlay on hover: rgba(12,35,64,0.55) fades in (transition 0.3s)
  Hover overlay content: project name centered in white

Content area (below image):
  Background: white
  Padding: 20px 24px
  Title: --t-h4, --color-text, Montserrat 600
  Meta: location (--t-body-sm, --color-text-muted)
  Tags: service type pills (see Tag below)
```

### Tag / Pill
```
Background: --color-blue-light
Color: --color-blue
Font: Inter 500, 11px, uppercase, letter-spacing 0.06em
Padding: 4px 10px
Border-radius: --radius-pill

Variants:
  fire:    background rgba(217,48,37,0.1), color --color-fire
  orange:  background rgba(232,98,10,0.1), color --color-orange
  grey:    background --color-light-grey, color --color-text-muted
```

### Button System
```css
/* Primary — orange */
.btn-primary {
  background: var(--color-orange);
  color: white;
  padding: 12px 28px;
  border-radius: var(--radius-md);
  font: 600 14px 'Montserrat', sans-serif;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}
.btn-primary:hover {
  background: var(--color-orange-hover);
  transform: translateY(-1px);
}

/* Secondary — navy outline */
.btn-secondary {
  background: transparent;
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
  /* same padding/font */
}
.btn-secondary:hover {
  background: var(--color-navy);
  color: white;
}

/* Ghost — for dark backgrounds */
.btn-ghost {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.6);
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.1);
}

/* Text link style */
.btn-link {
  background: none;
  border: none;
  color: var(--color-orange);
  font: 600 14px 'Montserrat';
  padding: 0;
  cursor: pointer;
}
.btn-link::after { content: ' →'; }
```

Sizes:
- `sm`: padding `8px 16px`, font `13px`
- `md` (default): padding `12px 28px`, font `14px`
- `lg`: padding `14px 36px`, font `16px`

### Stats Row
```
Background: --color-navy
Padding: 64px 0
Layout: 4 items in a row, centered, divided by subtle vertical line

Each stat:
  Number: Montserrat 800, 48px, --color-orange
  Label: Inter 400, 14px, white 70% opacity
  Separator: 1px solid rgba(255,255,255,0.15)
```

### Partner/Certification Logos Strip
```
Background: --color-off-white
Padding: 48px 0
Label above: "CERTIFICATIONS & PARTNERS", --t-label, --color-text-muted
Logos: grayscale, opacity 0.6, hover → full colour opacity 1.0
Layout: flex row, gap 48px, centered, wrap on mobile
```

### CTA Banner
```
Background: --color-navy  (OR full-width image with navy overlay)
Padding: 80px 40px
Text centered OR left-aligned with button right:
  Headline: --t-h2, white, Montserrat 700
  Sub: --t-body-lg, white 75% opacity
  Button: "Request a Quote" — orange
```

### Contact Form
```
Layout: 2-col (form left 60%, contact info right 40%) on desktop
       single col stacked on mobile

Input fields:
  Background: --color-light-grey
  Border: 1.5px solid --color-border
  Border-radius: --radius-md
  Padding: 12px 16px
  Font: Inter 400 15px
  Focus: border-color --color-orange, box-shadow 0 0 0 3px rgba(232,98,10,0.15)
  No shadows by default — flat and clean

Labels: Inter 500, 13px, --color-text, margin-bottom 6px

Textarea: min-height 140px, same style as input

Dropdown/Select: same style, custom arrow

Submit button: primary lg, full width, margin-top 24px

Error state: border-color --color-fire, helper text --color-fire 12px below
```

### Footer
```
Background: --color-navy
Padding: 64px 0 32px

Layout: 4 columns
  Col 1: Logo (white) + tagline + RC number
  Col 2: Company links (About, Team, Core Values, Journey, Partners)
  Col 3: Services links (MEPF Contracting, Products & Supply, Maintenance)
  Col 4: Contact info (address icon + address, phone icon + number, email icon + email)

All text: white 75% opacity
Link hover: white 100% opacity
Heading per col: Inter 600, 13px, uppercase, white 50% opacity, letter-spacing

Bottom bar: 1px border rgba(255,255,255,0.1) above, copyright left, RC number right
```

---

## Motion / Animation

Keep it professional and fast. This is B2B — not a creative portfolio.

```
Page load:
  Hero text: opacity 0 → 1 + translateY(20px → 0), 600ms ease, staggered (label → h1 → sub → buttons)

Scroll reveal (IntersectionObserver, threshold 0.15):
  Cards: opacity 0 → 1 + translateY(24px → 0), 400ms ease, 80ms stagger between cards
  Section headers: same reveal, no stagger

Hover transitions:
  Cards: box-shadow + translateY — 0.25s ease
  Buttons: background + translateY — 0.2s ease
  Nav links: color — 0.15s ease
  Project card overlay: opacity — 0.3s ease

Stats counter:
  Count up animation when stats section enters viewport
  Duration: 1500ms, easeOut

NO: parallax, heavy scroll effects, page transitions, autoplay video
```

---

## Imagery Guidelines

- **Hero:** Real photo of a completed Nigerian project (Cornerstone Towers, Black Bell Mall, etc.) — use photos from the corporate profile PDF. Dark navy overlay.
- **Projects:** Actual site photos from the PDF — show real work, not stock.
- **Team:** Professional headshots, white or neutral background.
- **Sections without photos:** Use subtle geometric patterns (light navy lines on off-white) as texture — not stock photos of people in hard hats.
- **Product images:** White/light grey background, isolated Siemens product shots from catalogue.
- **Aspect ratios:** 16:9 hero, 4:3 project cards, 1:1 team, 16:9 product detail main image.

---

## Sanity CMS — Why Sanity

**Chosen: Sanity v3**

Reasons over Storyblok:
1. Framework-agnostic — works perfectly with Vite + TanStack, no Next.js dependency
2. GROQ queries pair cleanly with TanStack Query `queryFn`s
3. `@sanity/client` is a simple HTTP client, easy to wrap
4. Free tier covers a showcase site (3 datasets, 500k API requests/month)
5. Storyblok is component-tree driven (designed for CMS-controlled layouts) — wrong fit for a product/project catalogue where the structure is code-defined
6. Sanity Studio is self-hostable at `/studio` or as a separate Vercel deploy — client can manage content themselves

---

## Tailwind Config Notes

```ts
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#0C2340', light: '#1A3A5C' },
        orange:  { DEFAULT: '#E8620A', hover: '#C9540A' },
        blue:    { DEFAULT: '#1156CC', light: '#EEF4FF' },
        fire:    '#D93025',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card:       '0 2px 16px rgba(12,35,64,0.08)',
        'card-hover':'0 8px 40px rgba(12,35,64,0.15)',
        nav:        '0 2px 12px rgba(12,35,64,0.10)',
      },
      borderRadius: {
        pill: '999px',
      },
    },
  },
}
```
