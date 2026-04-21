import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Box,
  Cpu,
  Cylinder,
  Droplets,
  Flame,
  Package,
  Radio,
  Search,
  Shield,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";
import { BasicPage } from "@/features/common/BasicPage";
import { ProductDetail } from "@/features/products/ProductDetail";
import { sanityClient } from "@/lib/sanity/client";
import { majorCategoriesWithProductCountQuery } from "@/lib/sanity/queries/products.queries";
import { urlFor } from "@/lib/sanity/image";

type MajorCategoryHero = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  productCount: number;
};

type ProductSubCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  productCount: number;
};

type ProductItem = {
  _id: string;
  title: string;
  slug: string;
  productCode?: string;
  shortDescription?: string;
  category?: {
    title: string;
    slug: string;
    icon?: string;
    color?: string;
  };
  image?: unknown;
};

const subCategoriesQuery = `
*[_type == "productCategory" && categoryType == "sub" && isActive == true] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "productCount": count(*[_type == "product" && references(^._id)])
}
`;

const productsQuery = `
*[_type == "product"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  productCode,
  shortDescription,
  "category": category->{
    title,
    "slug": slug.current,
    icon,
    color
  },
  "image": coalesce(productImage, productImages[0])
}
`;

const ICONS: Record<string, LucideIcon> = {
  package: Package,
  cpu: Cpu,
  microchip: Cpu,
  droplets: Droplets,
  droplet: Droplets,
  water: Droplets,
  cylinder: Cylinder,
  gas: Cylinder,
  flame: Flame,
  fire: Flame,
  shield: Shield,
  bell: Bell,
  alarm: Bell,
  radio: Radio,
  zap: Zap,
  lightning: Zap,
  box: Box,
};

function categoryIconFromSanity(iconName?: string | null): LucideIcon {
  if (!iconName?.trim()) return Package;
  const k = iconName.trim().toLowerCase().replace(/[\s_-]+/g, "");
  return ICONS[k] ?? Package;
}

function categoryBadgeClass(color?: string | null): string {
  if (color === "fire") return "bg-fire text-white";
  if (color === "orange") return "bg-orange text-white";
  return "bg-blue text-white";
}

function getProductImage(image: unknown): string | null {
  if (image) {
    return urlFor(image).width(720).height(520).fit("max").url();
  }
  return null;
}

export function ProductsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const majors = useQuery({
    queryKey: ["product-major-categories"],
    queryFn: () => sanityClient.fetch<MajorCategoryHero[]>(majorCategoriesWithProductCountQuery),
  });

  const subCategories = useQuery({
    queryKey: ["product-sub-categories"],
    queryFn: () => sanityClient.fetch<ProductSubCategory[]>(subCategoriesQuery),
  });

  const products = useQuery({
    queryKey: ["products-list"],
    queryFn: () => sanityClient.fetch<ProductItem[]>(productsQuery),
  });

  const highlightCards = useMemo(() => {
    const majorList = majors.data ?? [];
    if (majorList.length > 0) {
      return majorList.map((m) => ({
        _id: m._id,
        title: m.title,
        description: m.description,
        icon: m.icon,
        productCount: m.productCount,
      }));
    }
    const subs = [...(subCategories.data ?? [])].sort((a, b) => b.productCount - a.productCount);
    return subs.map((s) => ({
      _id: s._id,
      title: s.title,
      description: s.description,
      icon: undefined as string | undefined,
      productCount: s.productCount,
    }));
  }, [majors.data, subCategories.data]);

  const filteredProducts = useMemo(() => {
    const items = products.data ?? [];
    const q = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const inCategory = activeCategory === "all" || item.category?.slug === activeCategory;
      if (!inCategory) return false;
      if (!q) return true;

      const haystack = [
        item.title,
        item.productCode ?? "",
        item.shortDescription ?? "",
        item.category?.title ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [products.data, activeCategory, searchTerm]);

  const loading = majors.isLoading || subCategories.isLoading || products.isLoading;
  const error = majors.isError || subCategories.isError || products.isError;

  return (
    <Screen>
      <Seo
        title="Fire safety & building products"
        description="Browse fire detection, alarm, suppression, and building-system products for commercial and industrial projects in Nigeria—Sanity-backed catalogue with categories and technical listings."
      />
      <section className="relative overflow-hidden bg-navy pb-20 pt-10 text-white md:pb-24 md:pt-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(17,86,204,0.22),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-navy"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:48px_48px]"
          aria-hidden
        />

        <div className="container-site relative z-10">
          <nav className="text-sm text-white/55" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-white/35" aria-hidden>
                /
              </li>
              <li className="text-white/90">Products</li>
            </ol>
          </nav>
          <h1 className="mt-6 font-heading text-2xl font-extrabold uppercase tracking-wide text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Fire safety &amp; building products
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Fire detection, alarm, and suppression products plus building-system components—specified for commercial and
            industrial projects and aligned with recognised standards.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f7fa] pb-14 pt-0 md:pb-20">
        <div className="container-site relative z-10 -mt-14 md:-mt-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlightCards.map((card, index) => {
              const Icon = categoryIconFromSanity(card.icon);
              return (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -5 }}
                  className="group cursor-default rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-blue hover:shadow-lg md:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors duration-300 group-hover:border-blue/45 group-hover:text-blue">
                    <Icon className="h-5 w-5 transition-colors duration-300" aria-hidden />
                  </div>
                  <h2 className="mt-4 font-heading text-sm font-extrabold uppercase leading-snug tracking-wide text-navy transition-colors duration-300 group-hover:text-navy md:text-base">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {card.description?.trim() ||
                      "Engineered products and systems for demanding building environments, with documentation and support from our team."}
                  </p>
                  <p className="mt-5 inline-flex rounded-pill border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs font-medium text-slate-600 transition-colors duration-300 group-hover:border-blue/25 group-hover:bg-blue-light/40">
                    {card.productCount} {card.productCount === 1 ? "product" : "products"}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-600 md:mt-12 md:text-base">
            Discover reliable control and fire safety products tailored for industrial and commercial projects.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-200/90 bg-white p-4 shadow-card md:mt-8 md:p-6"
          >
            <label htmlFor="products-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <input
                id="products-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, codes, or descriptions..."
                className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue focus:ring-2 focus:ring-blue/20"
              />
            </div>

            <p className="mb-3 mt-6 text-[11px] font-bold uppercase tracking-wider text-slate-500">Browse by category</p>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                aria-pressed={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 rounded-md px-3 py-2 text-xs font-semibold transition-colors duration-200 md:text-sm ${
                  activeCategory === "all"
                    ? "bg-blue text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                All{products.data ? ` (${products.data.length})` : ""}
              </motion.button>
              {(subCategories.data ?? []).map((cat) => (
                <motion.button
                  key={cat._id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={activeCategory === cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`shrink-0 rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors duration-200 md:text-sm ${
                    activeCategory === cat.slug
                      ? "bg-blue text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {cat.title}{" "}
                  <span className="opacity-80">({cat.productCount})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {!loading && !error ? (
            <p className="mt-6 text-sm text-slate-700">
              <span className="font-semibold text-navy">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          ) : null}

          {error ? (
            <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Unable to load products from Sanity right now. Please try again.
            </div>
          ) : null}

          {loading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="aspect-[5/4] animate-pulse bg-slate-100" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!loading && !error ? (
            filteredProducts.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => {
                  const imgUrl = getProductImage(product.image);
                  const badgeLabel = (product.category?.title ?? "Product").toUpperCase();
                  const badgeClass = categoryBadgeClass(product.category?.color);
                  const catSlug = product.category?.slug ?? "general";
                  const PlaceholderIcon = categoryIconFromSanity(product.category?.icon);

                  return (
                    <motion.article
                      key={product._id}
                      layout={false}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-blue/70 hover:shadow-lg"
                    >
                      <div className="relative aspect-[5/4] bg-slate-100 transition-colors duration-300 group-hover:bg-slate-50">
                        <span
                          className={`absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] truncate px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
                        >
                          {badgeLabel}
                        </span>
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={product.title}
                            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300 transition-colors duration-300 group-hover:text-blue/80">
                            <PlaceholderIcon className="h-14 w-14" aria-hidden />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5 pt-4">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="min-w-0 flex-1 font-heading text-base font-bold leading-snug text-navy">
                            {product.title}
                          </h2>
                          {product.productCode?.trim() ? (
                            <span className="shrink-0 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium uppercase text-slate-600">
                              {product.productCode.trim()}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                          {product.shortDescription?.trim() ||
                            "Reliable component engineered for stable performance and long service life in building services applications."}
                        </p>
                        <Link
                          to="/products/$categorySlug/$productSlug"
                          params={{ categorySlug: catSlug, productSlug: product.slug }}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-navy transition-colors group-hover:text-blue"
                        >
                          View details
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="font-heading font-bold text-navy">No products match your filters</p>
                <p className="mt-2 text-sm text-slate-600">
                  Try another search term, pick &ldquo;All&rdquo;, or select a different category.
                </p>
              </div>
            )
          ) : null}
        </div>
      </section>
    </Screen>
  );
}

function slugToLabel(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function ProductCategoryScreen() {
  const { categorySlug } = useParams({ from: "/products/$categorySlug/" });
  const label = slugToLabel(categorySlug);

  return (
    <>
      <Seo
        title={`${label} products`}
        description={`${label} products in the Amaspace catalogue—fire safety and building products for professional MEP and life-safety projects in Nigeria.`}
        pathname={`/products/${categorySlug}`}
      />
      <BasicPage title="Product Category" sub="Products filtered by selected category." />
    </>
  );
}

export function ProductDetailScreen() {
  const { categorySlug, productSlug } = useParams({ from: "/products/$categorySlug/$productSlug" });
  return <ProductDetail categorySlug={categorySlug} productSlug={productSlug} />;
}
