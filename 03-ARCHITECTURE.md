# Amaspace — Project Architecture

> Framework: Vite + React + TypeScript
> Routing: TanStack Router (file-based)
> Data: TanStack Query + Sanity v3 (@sanity/client)
> Styling: Tailwind CSS v3
> Forms: React Hook Form + Zod
> Architecture: Feature-based

---

## Full Directory Structure

```
amaspace/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│       └── og-image.jpg
│
├── src/
│   │
│   ├── routes/                          # TanStack Router file-based routes
│   │   ├── __root.tsx                   # Root layout: TopBar + Navbar + Outlet + Footer
│   │   ├── index.tsx                    # /
│   │   ├── about.tsx                    # /about
│   │   ├── services.tsx                 # /services
│   │   ├── services.$serviceSlug.tsx    # /services/:serviceSlug
│   │   ├── specializations.tsx          # /specializations
│   │   ├── specializations.$slug.tsx    # /specializations/:slug
│   │   ├── products.tsx                 # /products
│   │   ├── products.$categorySlug.tsx   # /products/:categorySlug
│   │   ├── products.$categorySlug.$productSlug.tsx  # /products/:cat/:slug
│   │   ├── projects.tsx                 # /projects
│   │   ├── request-quote.tsx            # /request-quote
│   │   └── contact.tsx                  # /contact
│   │
│   ├── features/                        # Feature modules (business logic)
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── AboutStrip.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── SpecializationsGrid.tsx
│   │   │   │   ├── ProjectsTeaser.tsx
│   │   │   │   ├── StatsRow.tsx
│   │   │   │   └── CertificationsStrip.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useHomeData.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── components/
│   │   │   │   ├── ServicesOverview.tsx
│   │   │   │   ├── ServiceBlock.tsx      # alternating image-text layout block
│   │   │   │   └── ServiceDetail.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useServices.ts
│   │   │   │   └── useServiceBySlug.ts
│   │   │   ├── types/
│   │   │   │   └── service.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── specializations/
│   │   │   ├── components/
│   │   │   │   ├── SpecializationsOverview.tsx
│   │   │   │   └── SpecializationDetail.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSpecializations.ts
│   │   │   │   └── useSpecializationBySlug.ts
│   │   │   ├── types/
│   │   │   │   └── specialization.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── products/
│   │   │   ├── components/
│   │   │   │   ├── ProductsIndex.tsx
│   │   │   │   ├── CategoryCards.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   ├── ProductImageGallery.tsx
│   │   │   │   └── SpecTable.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProducts.ts
│   │   │   │   ├── useProductBySlug.ts
│   │   │   │   ├── useProductCategories.ts
│   │   │   │   └── queryKeys.ts
│   │   │   ├── types/
│   │   │   │   └── product.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   │   ├── ProjectsGallery.tsx
│   │   │   │   ├── ProjectFilterBar.tsx
│   │   │   │   └── ProjectModal.tsx      # optional: expand project in-place
│   │   │   ├── hooks/
│   │   │   │   └── useProjects.ts
│   │   │   ├── types/
│   │   │   │   └── project.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── about/
│   │   │   ├── components/
│   │   │   │   ├── WhoWeAre.tsx
│   │   │   │   ├── MissionVision.tsx
│   │   │   │   ├── CoreValues.tsx
│   │   │   │   ├── TeamGrid.tsx
│   │   │   │   └── CertificationsStrip.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useTeamMembers.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── quote/
│   │   │   ├── components/
│   │   │   │   ├── QuoteForm.tsx
│   │   │   │   └── ContactSidebar.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useSubmitQuote.ts
│   │   │   ├── schemas/
│   │   │   │   └── quoteForm.schema.ts   # Zod schema
│   │   │   └── index.ts
│   │   │
│   │   └── contact/
│   │       ├── components/
│   │       │   ├── ContactForm.tsx
│   │       │   └── ContactInfo.tsx
│   │       ├── hooks/
│   │       │   └── useSubmitContact.ts
│   │       ├── schemas/
│   │       │   └── contactForm.schema.ts
│   │       └── index.ts
│   │
│   ├── components/                      # Shared, reusable UI
│   │   ├── layout/
│   │   │   ├── TopContactBar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageHero.tsx
│   │   │   └── CTABanner.tsx
│   │   │
│   │   └── ui/
│   │       ├── Screen.tsx               # Page wrapper shell
│   │       ├── StateHandler.tsx         # Loading/error/empty/data
│   │       ├── ErrorBoundary.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── Button.tsx
│   │       ├── Tag.tsx                  # Category pill / badge
│   │       ├── ServiceCard.tsx          # Large service card
│   │       ├── SpecCard.tsx             # Small specialization card
│   │       ├── ProductCard.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Skeleton.tsx
│   │       └── index.ts                # barrel export
│   │
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts               # Sanity client instance
│   │       ├── image.ts                # urlFor() helper
│   │       ├── queries/
│   │       │   ├── home.queries.ts
│   │       │   ├── services.queries.ts
│   │       │   ├── specializations.queries.ts
│   │       │   ├── products.queries.ts
│   │       │   ├── projects.queries.ts
│   │       │   ├── about.queries.ts
│   │       │   └── settings.queries.ts
│   │       └── types/
│   │           └── sanity.types.ts     # Generated or manually typed Sanity document types
│   │
│   ├── hooks/
│   │   ├── useStateHandlerProps.ts     # Shared TanStack Query → StateHandler adapter
│   │   └── useScreenStates.ts
│   │
│   ├── providers/
│   │   └── QueryProvider.tsx           # QueryClient + QueryClientProvider
│   │
│   ├── constants/
│   │   ├── navigation.ts               # Nav link definitions
│   │   ├── specializations.ts          # Slug → icon/color mapping
│   │   └── services.ts
│   │
│   ├── router.tsx                      # createRouter() from routeTree.gen
│   ├── routeTree.gen.ts                # AUTO-GENERATED — do not edit
│   ├── main.tsx                        # Entry point
│   └── index.css                       # Tailwind directives + CSS variables
│
├── sanity/                             # Sanity Studio (can be deployed separately)
│   ├── sanity.config.ts
│   ├── schema/
│   │   ├── index.ts                    # schema array
│   │   ├── product.ts
│   │   ├── productCategory.ts
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── specialization.ts
│   │   ├── teamMember.ts
│   │   └── siteSettings.ts
│   └── lib/
│       └── image.ts
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env
```

---

## Key File Contents

### `src/router.tsx`
```tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const createRouter = () =>
  createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

### `src/main.tsx`
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from './router'
import { QueryProvider } from './providers/QueryProvider'
import './index.css'

const router = createRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>
)
```

### `src/routes/__root.tsx`
```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { TopContactBar } from '@/components/layout/TopContactBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const Route = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <TopContactBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </ErrorBoundary>
  ),
})
```

### `src/routes/index.tsx` (Home)
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { HomeScreen } from '@/features/home'

export const Route = createFileRoute('/')({
  component: HomeScreen,
})
```

### `src/routes/products.$categorySlug.$productSlug.tsx`
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { ProductDetailScreen } from '@/features/products'

export const Route = createFileRoute('/products/$categorySlug/$productSlug')({
  component: ProductDetailScreen,
})

// In ProductDetailScreen, get params with:
// const { categorySlug, productSlug } = Route.useParams()
```

### `src/providers/QueryProvider.tsx`
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 min — content doesn't change often
      gcTime: 1000 * 60 * 30,     // 30 min cache
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
```

### `src/hooks/useStateHandlerProps.ts`
```ts
import type { UseQueryResult } from '@tanstack/react-query'

export function useStateHandlerProps<T>(query: UseQueryResult<T>) {
  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    onRetry: query.refetch,
  }
}
```

---

## Feature Module Pattern

Every feature follows this pattern:

```
features/products/
  components/
    ProductGrid.tsx        ← Pure UI component, receives data as props
    ProductCard.tsx
  hooks/
    useProducts.ts         ← TanStack Query hook
    useProductBySlug.ts
    queryKeys.ts           ← Query key factory
  types/
    product.types.ts       ← TypeScript types matching Sanity schema
  index.ts                 ← Re-exports everything the route needs
```

**Query key factory example (`queryKeys.ts`):**
```ts
export const productKeys = {
  all:          () => ['products'] as const,
  byCategory:   (cat: string) => ['products', 'category', cat] as const,
  bySlug:       (cat: string, slug: string) => ['products', cat, slug] as const,
  featured:     () => ['products', 'featured'] as const,
}
```

**Hook example (`useProducts.ts`):**
```ts
import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '@/lib/sanity/client'
import { allProductsQuery } from '@/lib/sanity/queries/products.queries'
import { productKeys } from './queryKeys'
import type { Product } from './product.types'

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all(),
    queryFn: () => sanityClient.fetch<Product[]>(allProductsQuery),
  })
}
```

**Route component using feature:**
```tsx
// src/routes/products.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ProductsIndexScreen } from '@/features/products'

export const Route = createFileRoute('/products')({
  component: ProductsIndexScreen,
})
```

**Feature screen using StateHandler:**
```tsx
// src/features/products/components/ProductsIndex.tsx
import { Screen } from '@/components/ui/Screen'
import { StateHandler } from '@/components/ui/StateHandler'
import { useStateHandlerProps } from '@/hooks/useStateHandlerProps'
import { useProducts } from '../hooks/useProducts'
import { ProductGrid } from './ProductGrid'

export function ProductsIndexScreen() {
  const query = useProducts()

  return (
    <Screen>
      <StateHandler
        {...useStateHandlerProps(query)}
        empty={<EmptyState title="No products found" />}
      >
        {(products) => <ProductGrid products={products} />}
      </StateHandler>
    </Screen>
  )
}
```

---

## Environment Variables

```env
# .env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

```ts
// src/lib/sanity/client.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn:    true,   // read-only public queries — CDN is fine
})
```

---

## package.json (key deps)

```json
{
  "dependencies": {
    "@sanity/client": "^6",
    "@sanity/image-url": "^1",
    "@tanstack/react-query": "^5",
    "@tanstack/react-router": "^1",
    "@tanstack/router-devtools": "^1",
    "@tanstack/react-query-devtools": "^5",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7",
    "zod": "^3",
    "@hookform/resolvers": "^3",
    "lucide-react": "^0.383",
    "framer-motion": "^11",
    "@portabletext/react": "^3"
  },
  "devDependencies": {
    "@tanstack/router-plugin": "^1",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "postcss": "^8",
    "tailwindcss": "^3",
    "typescript": "^5",
    "vite": "^5"
  }
}
```

---

## vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),   // MUST be before react()
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```
