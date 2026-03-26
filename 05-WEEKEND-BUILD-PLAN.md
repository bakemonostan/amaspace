# Amaspace — Weekend Build Plan

> Goal: working, deployed site by Sunday evening.
> Stack: Vite + React + TanStack Router/Query + Sanity + Tailwind + Vercel

---

## Before You Start

- [ ] Open all 4 .md files in Cursor as context
- [ ] Have the corporate profile PDF and fire alarm catalogue PDF accessible
- [ ] Have the Variant design output open for visual reference
- [ ] Create a Sanity account at sanity.io if you don't have one
- [ ] Create a Vercel account / project

---

## SATURDAY

### ☕ Morning Block 1 — Project Scaffold (1–2 hrs)

**Goal: Running dev server with routing working**

```bash
# 1. Scaffold Vite + React + TS
npm create vite@latest amaspace -- --template react-ts
cd amaspace

# 2. Install all dependencies
npm install \
  @tanstack/react-router \
  @tanstack/react-query \
  @tanstack/react-router-devtools \
  @tanstack/react-query-devtools \
  @sanity/client \
  @sanity/image-url \
  @portabletext/react \
  react-hook-form \
  zod \
  @hookform/resolvers \
  lucide-react \
  framer-motion

npm install -D \
  @tanstack/router-plugin \
  tailwindcss \
  postcss \
  autoprefixer \
  @types/node

# 3. Init Tailwind
npx tailwindcss init -p

# 4. Setup path alias in vite.config.ts (see 03-ARCHITECTURE.md)
# 5. Configure tsconfig.json paths for @/ alias
```

- [ ] Create `src/routes/__root.tsx` with Outlet + placeholder Navbar + Footer
- [ ] Create `src/routes/index.tsx` — "Home" placeholder
- [ ] Create `src/router.tsx` and `src/main.tsx` (see 03-ARCHITECTURE.md)
- [ ] Create `src/providers/QueryProvider.tsx`
- [ ] Add Tailwind directives to `src/index.css`
- [ ] Add Google Fonts link to `index.html`
- [ ] Add CSS variables to `src/index.css` (from 01-DESIGN-SYSTEM.md)
- [ ] Run `npm run dev` — confirm it renders

---

### 🏗️ Morning Block 2 — Sanity Setup (1–1.5 hrs)

**Goal: Studio running + schemas defined + first content entered**

```bash
# In /sanity subfolder or separate terminal
npm create sanity@latest

# Choose:
# - Create new project: "amaspace"
# - Dataset: production
# - Template: Clean project with no predefined schemas
# - Add sanity to existing project? No (separate folder)
```

- [ ] Create all 7 schema files (copy from 04-SANITY-CMS.md)
- [ ] Register all schemas in `sanity/schema/index.ts`
- [ ] Run Sanity Studio locally: `npx sanity dev`
- [ ] Enter seed content:
  - [ ] 3 Product Categories
  - [ ] 6 Specializations
  - [ ] 3 Services
  - [ ] 1 siteSettings document
  - [ ] First 5 projects (with photos from PDF)
  - [ ] First 10 products (control panels: FC721, FC722, FC724, FC726 + 6 detectors)
- [ ] Copy `VITE_SANITY_PROJECT_ID` from Sanity dashboard to `.env`

---

### 🎨 Afternoon Block 1 — Shared Components (2 hrs)

**Goal: All shared UI components built, Navbar + Footer working**

Build these in order:

- [ ] `src/components/ui/Screen.tsx`
- [ ] `src/components/ui/StateHandler.tsx` + `useStateHandlerProps.ts`
- [ ] `src/components/ui/Button.tsx` (primary, secondary, ghost, link variants)
- [ ] `src/components/ui/Tag.tsx`
- [ ] `src/components/ui/SectionHeader.tsx` (label + h2 + optional sub)
- [ ] `src/components/ui/EmptyState.tsx`
- [ ] `src/components/ui/ErrorState.tsx`
- [ ] `src/components/ui/Skeleton.tsx`
- [ ] `src/components/layout/TopContactBar.tsx`
- [ ] `src/components/layout/Navbar.tsx` (with links from constants/navigation.ts)
- [ ] `src/components/layout/Footer.tsx`
- [ ] `src/components/layout/PageHero.tsx` (props: title, sub, breadcrumb)
- [ ] `src/components/layout/CTABanner.tsx`

---

### 🏠 Afternoon Block 2 — Home Page (2 hrs)

**Goal: Home page live with real Sanity data**

- [ ] `src/lib/sanity/client.ts`
- [ ] `src/lib/sanity/image.ts` (urlFor helper)
- [ ] `src/lib/sanity/queries/settings.queries.ts`
- [ ] `src/lib/sanity/queries/services.queries.ts`
- [ ] `src/lib/sanity/queries/projects.queries.ts`
- [ ] `src/features/home/hooks/useHomeData.ts`
- [ ] `src/features/home/components/HeroSection.tsx`
- [ ] `src/features/home/components/AboutStrip.tsx`
- [ ] `src/features/home/components/ServicesSection.tsx`
- [ ] `src/features/home/components/SpecializationsGrid.tsx`
- [ ] `src/features/home/components/ProjectsTeaser.tsx`
- [ ] `src/features/home/components/StatsRow.tsx`
- [ ] `src/features/home/components/CertificationsStrip.tsx`
- [ ] Wire `src/routes/index.tsx` → HomeScreen

---

## SUNDAY

### 🛍️ Morning Block 1 — Products (2.5 hrs)

**Goal: Full product catalogue working — index, category, detail**

- [ ] All GROQ queries in `src/lib/sanity/queries/products.queries.ts`
- [ ] `src/components/ui/ProductCard.tsx`
- [ ] `src/features/products/hooks/useProducts.ts`
- [ ] `src/features/products/hooks/useProductBySlug.ts`
- [ ] `src/features/products/hooks/useProductCategories.ts`
- [ ] `src/features/products/hooks/queryKeys.ts`
- [ ] `src/features/products/types/product.types.ts`
- [ ] `src/features/products/components/ProductsIndex.tsx` (category cards + product grid)
- [ ] `src/features/products/components/ProductGrid.tsx`
- [ ] `src/features/products/components/CategoryCards.tsx`
- [ ] `src/features/products/components/ProductDetail.tsx` (image, specs, description, related)
- [ ] `src/features/products/components/SpecTable.tsx`
- [ ] `src/features/products/components/ProductImageGallery.tsx`
- [ ] Wire all 3 product routes
- [ ] Enter remaining 20 products in Sanity

---

### 📁 Morning Block 2 — Projects + Services (1.5 hrs)

**Goal: Portfolio page + Services pages working**

- [ ] `src/components/ui/ProjectCard.tsx`
- [ ] `src/features/projects/hooks/useProjects.ts`
- [ ] `src/features/projects/components/ProjectsGallery.tsx`
- [ ] `src/features/projects/components/ProjectFilterBar.tsx`
- [ ] Wire `src/routes/projects.tsx`
- [ ] `src/features/services/hooks/useServices.ts`
- [ ] `src/features/services/components/ServicesOverview.tsx`
- [ ] `src/features/services/components/ServiceBlock.tsx` (alternating layout)
- [ ] Wire `src/routes/services.tsx` + `src/routes/services.$serviceSlug.tsx`

---

### 🎯 Afternoon Block 1 — Remaining Pages (1.5 hrs)

- [ ] **About** (`/about`) — WhoWeAre, Team, Values, Certifications
- [ ] **Specializations** (`/specializations` + `/$slug`) — grid + detail with related products
- [ ] **Request Quote** (`/request-quote`) — RHF + Zod form, submission handler
- [ ] **Contact** (`/contact`) — simple form + contact info

---

### 🚀 Afternoon Block 2 — Polish + Deploy (1.5 hrs)

**Goal: Live on Vercel**

- [ ] Mobile responsive pass on all pages (Tailwind breakpoints: sm, md, lg)
- [ ] Fix any Tailwind spacing/typography inconsistencies
- [ ] Framer Motion: add scroll reveal to section cards (home + products)
- [ ] Framer Motion: hero text fade-in stagger
- [ ] Stats counter animation on scroll
- [ ] Test all routes in production build: `npm run build && npm run preview`
- [ ] `git init && git add . && git commit -m "initial"`
- [ ] Push to GitHub
- [ ] Connect Vercel → GitHub repo
- [ ] Add environment variables in Vercel dashboard:
  - `VITE_SANITY_PROJECT_ID`
  - `VITE_SANITY_DATASET`
  - `VITE_SANITY_API_VERSION`
- [ ] Deploy
- [ ] Add Vercel domain to Sanity CORS origins (sanity.io/manage)
- [ ] Test live URL

---

## Shortcuts / Prioritization

If you're running behind, do these in order:

**Must have by Sunday EOD:**
1. Home page (with real data)
2. Products (index + category + detail)
3. Projects gallery
4. Request Quote form

**Can be Monday:**
- About page team section (just hardcode team data initially)
- Specialization detail pages (can reuse products page with filter)
- Services detail pages

---

## Common Gotchas

**TanStack Router plugin order in vite.config.ts:**
`TanStackRouterVite()` MUST come before `react()` in the plugins array, or the router won't generate.

**Sanity CORS:**
After deploying to Vercel, go to sanity.io/manage → your project → API → CORS origins → add your Vercel URL.

**Sanity CDN vs real-time:**
`useCdn: true` is fine for this site. If you need real-time preview (not needed here), flip to `false`.

**TanStack Router params:**
Dynamic params in file names use `$` prefix: `products.$categorySlug.$productSlug.tsx`.
Access in component with `Route.useParams()`.

**`routeTree.gen.ts`:**
Never edit this file. It's auto-generated by the TanStack Router Vite plugin on every save.

**Sanity PortableText rendering:**
Install `@portabletext/react` and use the `<PortableText>` component to render `fullDescription` rich text fields from Sanity.

```tsx
import { PortableText } from '@portabletext/react'
// ...
<PortableText value={product.fullDescription} />
```

---

## Products to Enter in Sanity

### Category: Control Panels & Detectors (control-panels-detectors)
| # | Product Code | Product Name |
|---|-------------|--------------|
| 1 | FC721-ZZ | Fire control panel (1-loop, Eco) |
| 2 | FC722-ZZ | Fire control panel (2-loop, Standard) |
| 3 | FC724-ZA | Fire control panel (4-loop, Comfort) |
| 4 | FC726 | Fire control panel (modular, 28-loop) |
| 5 | OP720 | Optical smoke detector |
| 6 | OH720 | Multi-sensor smoke detector |
| 7 | OOH740 | Multi-sensor smoke detector ASA |
| 8 | OOHC740 | Fire and CO detector, neural ASA |
| 9 | FDF241-9ASA | Flame detector (3 infrared sensors) |
| 10 | FDOOT271 | Neural radio fire detector |
| 11 | FDL__ASA | Linear smoke detector (ASA) |
| 12 | FDL242 | Linear smoke detector |
| 13 | FDCL221-Ex | Line adapter for explosive areas |
| 14 | OOH740-A9-EX | Multi-sensor detector (Ex areas) |
| 15 | FDV202 | FireCatcher Camera |
| 16 | FDM273 | Radio manual call point |
| 17 | FDA241 | Siemens ASD (aspirating, 800m²) |
| 18 | FDA222 | Siemens ASD+ (1600m²) |

### Category: Extinguishing & Suppression (extinguishing-suppression)
| # | Product Code | Product Name |
|---|-------------|--------------|
| 19 | Sinorix CDT | Constant Discharge Technology system |
| 20 | Sinorix NXN | Natural agents extinguishing (Ar/N2/CO2) |
| 21 | Sinorix al-deco Plus | Machine tool object protection |
| 22 | Sinorix al-deco STD | Machine tool protection STD |
| 23 | Sinorix Silent | Silent extinguishing (server rooms) |
| 24 | XC1001-A | Extinguishing panel Standard |
| 25 | XC1005-A | Extinguishing panel Comfort |
| 26 | XC1003-A | Extinguishing panel Rack (19") |

### Category: Cylinders & Accessories (cylinders-accessories)
| # | Product Code | Product Name |
|---|-------------|--------------|
| 27 | CYF-10-200-N2 | N2 cylinder 10L / 200bar |
| 28 | CYF-80-200-N2 | N2 cylinder 80L / 200bar |
| 29 | CYF-140-300-55 | IG55 cylinder 140L / 300bar |
| 30 | MANI50-1-80-3 | Manifold PN360 (3 cylinders) |
| 31 | MANI50-EXT437 | HP-Pipe PN360 |
| 32 | FLEX5-300 | Pilot hose DN5 PN360 |
| 33 | ACTF230-PNEUMD | Actuator pneumatic D (double) |
| 34 | ACTF230-PNEUMS | Actuator pneumatic S (single) |
| 35 | MANOF230-S315 | Pressure gauge wo contact |
| 36 | SELVAL-360 50 | Selector valve 2" DN50 |
| 37 | PSWITCH-300-5 | Pressure switch |

---

## Cursor Prompting Tips

When using Cursor to build components, reference the .md files explicitly:

```
"Using the component specs in 01-DESIGN-SYSTEM.md (Service Card section), 
build the ServiceCard component in src/components/ui/ServiceCard.tsx using 
Tailwind CSS and the CSS variables defined."

"Using the GROQ query in 04-SANITY-CMS.md (allProductsQuery), implement 
the useProducts hook in src/features/products/hooks/useProducts.ts following 
the feature pattern in 03-ARCHITECTURE.md."

"Build the ProductDetail component following the layout spec in 
02-ROUTES-AND-PAGES.md (Page 9: Product Detail) and using the design 
tokens from 01-DESIGN-SYSTEM.md."
```
