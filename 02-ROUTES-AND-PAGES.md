# Amaspace — Routes & Pages

> TanStack Router (file-based routing, `src/routes/`).
> Feature-based architecture — routes are thin shells; logic lives in `src/features/`.
> Sanity CMS for all content (products, projects, team, services).

---

## Route Map

```
/                                    Home
/about                               About Us (company overview, team, values, journey)
/services                            Services overview
/services/$serviceSlug               Individual service detail
/specializations                     All specializations overview
/specializations/$slug               Individual specialization (e.g. fire-safety, hvac)
/products                            Product catalogue index
/products/$categorySlug              Products by category
/products/$categorySlug/$productSlug Product detail page
/projects                            Portfolio / past projects gallery
/request-quote                       Dedicated quote request form
/contact                             Contact page
```

---

## File Structure (TanStack Router file-based)

```
src/routes/
  __root.tsx                         Root layout (Navbar, Footer, TopBar, Outlet)
  index.tsx                          /  (Home)
  about.tsx                          /about
  services.tsx                       /services
  services.$serviceSlug.tsx          /services/:serviceSlug
  specializations.tsx                /specializations
  specializations.$slug.tsx          /specializations/:slug
  products.tsx                       /products
  products.$categorySlug.tsx         /products/:categorySlug
  products.$categorySlug.$productSlug.tsx  /products/:categorySlug/:productSlug
  projects.tsx                       /projects
  request-quote.tsx                  /request-quote
  contact.tsx                        /contact
```

---

## Page 1: Home `/`

**Route file:** `src/routes/index.tsx`
**Feature:** `src/features/home/`
**Purpose:** First impression — establish credibility, show what the company does, drive to services and request-a-quote.

### Sections (top → bottom):

```
1. TopContactBar        — phone + email strip (navy bg)
2. Navbar               — sticky, white bg
3. HeroSection          — full viewport, building photo + overlay, headline, 2 CTAs, stat counters
4. AboutStrip           — 2-col: company intro copy (left) + project photo (right)
5. ServicesSection      — section label + 3 large service cards
6. SpecializationsGrid  — section label + 6 smaller specialization cards
7. ProjectsTeaser       — section label + 3 project photo cards + "View All" link
8. StatsRow             — 4 stats on navy background
9. CertificationsStrip  — partner/certification logos
10. CTABanner           — "Ready to start your project?" + Request a Quote button
11. Footer
```

### Data needs:
- Featured services (3): from Sanity `service` documents with `featured: true`
- Specializations (6): from Sanity `specialization` documents
- Featured projects (3): from Sanity `project` documents with `featured: true`
- Site settings (phone, email, hero copy): from Sanity `siteSettings` singleton
- Stats: hardcoded or from `siteSettings` (10+ projects, 9+ years, ISO 9001, Siemens Partner)

### TanStack Query keys:
```ts
['home', 'hero-data']        // siteSettings
['services', 'featured']     // featured services
['specializations', 'all']   // all specializations
['projects', 'featured']     // featured projects
```

---

## Page 2: About `/about`

**Route file:** `src/routes/about.tsx`
**Feature:** `src/features/about/`
**Purpose:** Company credibility. Who they are, the team, values, journey, certifications.

### Sections:

```
1. PageHero             — short, off-white bg, "About Us" h1, breadcrumb
2. WhoWeAre             — 2-col: long-form copy + building photo
3. MissionVision        — 2 cards side by side (Mission / Vision)
4. CoreValues           — 4 value cards with icons: Excellence, Safety, Innovation, Collaboration
5. KeyPersonnel         — 2x2 grid of team member cards
6. Certifications       — logo strip: ISO 9001, Siemens, COREN, NSE
7. Industries           — icon grid of industries served
8. CTABanner            — "Work with us"
```

### Team Members (hardcoded or Sanity `teamMember` type):
```
Engr. Abayomi Amao         — CEO
Engr. Adewale Adekola      — Technical Director
Engr. Temitope Ademola Ige — Project Portfolio Manager
Mrs. Adeola Kulujo         — Head, Finance & Accounts
```

### Data needs:
- `teamMember` documents from Sanity
- `siteSettings` for company description copy

---

## Page 3: Services `/services`

**Route file:** `src/routes/services.tsx`
**Feature:** `src/features/services/`
**Purpose:** Overview of the 3 core service offerings.

### Sections:
```
1. PageHero             — "Our Services"
2. ServicesIntro        — brief paragraph
3. Service blocks (3)   — alternating left-right image layout (like Mar&Mor):
   - MEPF Contracting: description, what's included, CTA → /services/mepf-contracting
   - Products & Supply: Siemens products, MEP equipment. CTA → /products
   - Maintenance Services: ongoing support, asset management. CTA → /services/maintenance
4. SpecializationsTeaser — "Our Areas of Expertise" — links to /specializations
5. CTABanner
```

### Data needs:
- `service` documents from Sanity (all)

---

## Page 4: Service Detail `/services/$serviceSlug`

**Route file:** `src/routes/services.$serviceSlug.tsx`
**Feature:** `src/features/services/`
**Purpose:** Detailed description of a single service.

### Layout:
```
1. PageHero             — service name, breadcrumb (Home > Services > [name])
2. ServiceDetail        — 60/40 split: rich text left, image right
3. WhatWeOffer          — bulleted/card list of what's included
4. RelatedSpecializations — 2-3 specialization cards
5. RelatedProjects      — 2-3 project cards from this service area
6. CTABanner
```

### URL params: `serviceSlug` (string)
### Data needs:
```ts
['services', serviceSlug]                    // single service
['specializations', { service: serviceSlug }]
['projects', { service: serviceSlug }]
```

---

## Page 5: Specializations `/specializations`

**Route file:** `src/routes/specializations.tsx`
**Feature:** `src/features/specializations/`
**Purpose:** Overview grid of all 6 specializations.

### Layout:
```
1. PageHero
2. SpecializationsGrid  — all 6 as larger cards with icons, descriptions, "Learn More" links
3. CTA banner
```

---

## Page 6: Specialization Detail `/specializations/$slug`

**Route file:** `src/routes/specializations.$slug.tsx`
**Feature:** `src/features/specializations/`
**Purpose:** Deep dive on one area (e.g. Fire Safety). This is where Siemens products get linked in context.

### Slugs:
```
fire-safety
hvac
electrical-mep
access-control
cctv-surveillance
extra-low-voltage
```

### Layout:
```
1. PageHero             — specialization name, breadcrumb
2. OverviewSection      — rich text + main image (2-col)
3. WhatWeInstall        — list/grid of what they actually supply and install
4. RelatedProducts      — 3-col product cards (from Sanity, filtered by specialization)
5. RelatedProjects      — 3 past project cards in this area
6. DownloadCTA          — "Download our product catalogue" → links to PDF
7. CTABanner            — "Speak to our [fire safety] team"
```

### Data needs:
```ts
['specializations', slug]
['products', { specialization: slug }]
['projects', { specialization: slug }]
```

---

## Page 7: Products Index `/products`

**Route file:** `src/routes/products.tsx`
**Feature:** `src/features/products/`
**Purpose:** Browse the product catalogue by category. Reference, not ecommerce.

### Layout:
```
1. PageHero             — "Product Catalogue" + "Siemens Building Technologies Partner" badge
2. CategoryCards        — 3 large category cards:
     - Control Panels & Detectors    → /products/control-panels
     - Extinguishing & Suppression   → /products/extinguishing-suppression
     - Cylinders & Accessories       → /products/cylinders-accessories
3. AllProductsGrid      — filterable 3-col grid of all products (filter by category)
4. CatalogueBanner      — "Prefer a PDF? Download our full product catalogue"
```

### Data needs:
```ts
['productCategories', 'all']
['products', 'all']
```

---

## Page 8: Products by Category `/products/$categorySlug`

**Route file:** `src/routes/products.$categorySlug.tsx`
**Feature:** `src/features/products/`

### Layout:
```
1. PageHero             — category name, breadcrumb, description
2. ProductGrid          — 3-col grid filtered to this category
3. CTABanner
```

### Data needs:
```ts
['productCategories', categorySlug]
['products', { category: categorySlug }]
```

---

## Page 9: Product Detail `/products/$categorySlug/$productSlug`

**Route file:** `src/routes/products.$categorySlug.$productSlug.tsx`
**Feature:** `src/features/products/`
**Purpose:** Full product information. The main product reference page.

### Layout:
```
┌──────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Products > Control Panels > FC726             │
├─────────────────────────┬────────────────────────────────────────┤
│                         │  Category pill                         │
│  Product Image          │  H1: Product name                      │
│  (main image)           │  Product code  [mono font, muted]      │
│                         │  Short description                     │
│  Thumbnail strip        │  ──────────────────                    │
│  (if multiple images)   │  SPECIFICATIONS                        │
│                         │  [SpecTable]                           │
│                         │  ──────────────────                    │
│                         │  [Request a Quote]    orange btn       │
│                         │  [Download Datasheet] outline btn      │
├─────────────────────────┴────────────────────────────────────────┤
│ Full description (rich text from Sanity PortableText)            │
├──────────────────────────────────────────────────────────────────┤
│ RELATED PRODUCTS — 3 product cards                               │
└──────────────────────────────────────────────────────────────────┘
```

### Fields:
- `product.title` → H1
- `product.productCode` → mono font, muted colour, under the title
- `product.shortDescription` → paragraph under code
- `product.images[]` → gallery
- `product.specifications[]` → `{ label: string, value: string }[]` → SpecTable
- `product.fullDescription` → Sanity PortableText (rich text)
- `product.category` → pill + breadcrumb
- `product.relatedProducts[]` → 3 cards at bottom

### Data needs:
```ts
['products', categorySlug, productSlug]
['products', 'related', productSlug]
```

---

## Page 10: Projects `/projects`

**Route file:** `src/routes/projects.tsx`
**Feature:** `src/features/projects/`
**Purpose:** Portfolio. The proof. Photo-forward, filterable.

### Layout:
```
1. PageHero             — "Our Portfolio" + sub "Real work. Real results."
2. FilterBar            — tabs: All | Fire Safety | MEP | Security | HVAC
3. ProjectsGrid         — masonry or 3-col, filterable
     Each card: photo, hover overlay (project name + location), service tags below
4. CTABanner
```

### Projects to populate (from corporate profile PDF):
```
1.  Cornerstone Towers — Victoria Island, Lagos         (MEP)
2.  Everty-one Limited — Victoria Island, Lagos         (Security: Access Control, CCTV, Biometric)
3.  Gateway Mall — Abuja                                (Fire Safety, Security, External Lighting)
4.  Shoprite Cold Room Warehouse                        (Fire: Aspiration Smoke Detector)
5.  Black Bell Mall — Ikota                             (MEP)
6.  Miskay Fashion Store — Lekki                        (MEP)
7.  Precise Lighting HQ — Lagos                         (MEP)
8.  Blu Atlantic Hotel — Lagos                          (MEP)
9.  120 Apartment Complex — Lekki                       (ELV: CCTV, Access Control, Parking Barrier, Fire)
10. Miskay Fashion House — Accra, Ghana                 (MEP)
```

### Data needs:
```ts
['projects', 'all']
['projects', { filter: activeFilter }]   // client-side filter
```

---

## Page 11: Request a Quote `/request-quote`

**Route file:** `src/routes/request-quote.tsx`
**Feature:** `src/features/quote/`
**Purpose:** Primary lead generation. Dedicated page (not a modal).

### Layout:
```
1. PageHero             — short navy hero: "Request a Quote"
                          sub: "We typically respond within 24 hours."

2. QuoteForm            — wide centered card on white
   Fields:
     - Full Name *          [text]
     - Company Name *       [text]
     - Email Address *      [email]
     - Phone Number *       [tel]
     - Service Interest *   [select]:
         MEPF Contracting
         Fire Safety System
         HVAC / Mechanical
         Access Control
         CCTV & Surveillance
         Extra Low Voltage
         Products / Supply
         Maintenance
         Other
     - Project Location     [text]
     - Project Description  [textarea, 4 rows]
     - Approximate Budget   [select, optional]:
         Under ₦5M
         ₦5M – ₦20M
         ₦20M – ₦50M
         ₦50M+
         Prefer not to say
     - [Send Request]       [button, orange, full-width]

3. ContactSidebar (desktop only, right col):
   - "What happens next?" — 3 step list
   - Phone: +234 807 981 3950
   - Email: amaspaceproject@yahoo.com
   - Address: 15 Emma Abimbola Street, Lekki Phase 1
```

### Form handling: React Hook Form + Zod validation
### Submission: POST to Sanity or a serverless function / Formspree / EmailJS

---

## Page 12: Contact `/contact`

**Route file:** `src/routes/contact.tsx`
**Feature:** `src/features/contact/`
**Purpose:** General contact. Simpler than request-quote.

### Layout:
```
1. PageHero             — "Contact Us"
2. Split layout (60/40):
   Left:  ContactForm (name, email, phone, message, submit)
   Right: ContactInfo card (navy bg, white text)
          - Address (2 locations)
          - Phone
          - Email
          - Business hours
          - (Optional) embedded Google Map iframe
```

---

## Shared Layout Components

All live in `src/components/layout/`:

| Component         | Description                                           |
|-------------------|-------------------------------------------------------|
| `TopContactBar`   | Navy strip with phone + email                         |
| `Navbar`          | Sticky white nav with dropdowns + CTA                 |
| `Footer`          | Navy 4-col footer                                     |
| `PageHero`        | Short inner-page hero (props: title, sub, breadcrumb) |
| `CTABanner`       | Full-width navy or orange CTA section                 |

Shared UI in `src/components/ui/`:

| Component         | Description                                           |
|-------------------|-------------------------------------------------------|
| `Screen`          | Page shell wrapper (header/body/footer structure)     |
| `StateHandler`    | Loading/error/empty/data handler                      |
| `SectionHeader`   | Label + H2 + optional sub                             |
| `ServiceCard`     | Large service card                                    |
| `SpecCard`        | Small specialization card                             |
| `ProductCard`     | Product card with code + category pill                |
| `ProjectCard`     | Project photo card with hover overlay                 |
| `SpecTable`       | Product specification table                           |
| `Tag`             | Pill/badge with variants                              |
| `Button`          | Button with variants (primary, secondary, ghost, link)|
| `EmptyState`      | Empty list state                                      |
| `ErrorState`      | Error state with retry                                |
| `LoadingSpinner`  | Loading indicator                                     |
| `Skeleton`        | Skeleton loader (cards)                               |
