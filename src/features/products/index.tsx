import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { BasicPage } from "@/features/common/BasicPage";

type ProductCategory = {
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
  };
  image?: unknown;
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
] as const;

const categoriesQuery = `
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
    "slug": slug.current
  },
  "image": coalesce(productImage, productImages[0])
}
`;

function getProductImage(image: unknown, index: number) {
  if (image) {
    return urlFor(image).width(720).height(520).fit("crop").url();
  }
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export function ProductsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => sanityClient.fetch<ProductCategory[]>(categoriesQuery),
  });

  const products = useQuery({
    queryKey: ["products-list"],
    queryFn: () => sanityClient.fetch<ProductItem[]>(productsQuery),
  });

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

  return (
    <Screen>
      <section className="bg-[#f4f7fa] py-12 md:py-16">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-pill border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
              Product catalogue
            </p>
            <h1 className="mt-4 font-heading text-3xl font-extrabold text-navy md:text-5xl">Industrial control products</h1>
            <p className="mt-3 text-slate-600">
              Discover reliable control and fire safety products tailored for industrial and commercial projects.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:p-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, codes, or descriptions..."
                className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  activeCategory === "all"
                    ? "bg-blue text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                }`}
              >
                All
              </button>
              {(categories.data ?? []).map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    activeCategory === category.slug
                      ? "bg-blue text-white"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {category.title} <span className="opacity-70">({category.productCount})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-navy">{filteredProducts.length}</span> products found
            </p>
          </div>

          {products.isLoading ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="aspect-[4/3] animate-pulse bg-slate-100" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-12 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {products.isError ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Unable to load products from Sanity right now. Please try again.
            </div>
          ) : null}

          {!products.isLoading && !products.isError ? (
            filteredProducts.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product, index) => (
                  <article
                    key={product._id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <img
                      src={getProductImage(product.image, index)}
                      alt={product.title}
                      className="aspect-[4/3] w-full object-cover"
                      width={400}
                      height={300}
                    />
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue">
                        {product.category?.title ?? "General"}
                      </p>
                      <h2 className="mt-2 font-heading text-lg font-bold text-navy">{product.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {product.shortDescription?.trim() ||
                          "Reliable industrial-grade component engineered for stable performance and long service life."}
                      </p>
                      <div className="mt-4">
                        <Link
                          to="/products/$categorySlug/$productSlug"
                          params={{
                            categorySlug: product.category?.slug ?? "general",
                            productSlug: product.slug,
                          }}
                          className="inline-flex text-sm font-semibold text-blue hover:underline"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
                <p className="font-medium text-navy">No products match your search.</p>
                <p className="mt-2 text-sm text-slate-600">Try another keyword or select a different category.</p>
              </div>
            )
          ) : null}
        </div>
      </section>
    </Screen>
  );
}

export function ProductCategoryScreen() {
  return <BasicPage title="Product Category" sub="Products filtered by selected category." />;
}

export function ProductDetailScreen() {
  return <BasicPage title="Product Detail" sub="Specs, gallery, and related products." />;
}
