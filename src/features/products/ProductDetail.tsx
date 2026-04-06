import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  Layers,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";
import { sanityClient } from "@/lib/sanity/client";
import { productBySlugQuery } from "@/lib/sanity/queries/products.queries";
import { productDetailIcon } from "@/features/products/product-detail-icons";
import { truncateMeta } from "@/lib/seo/truncate";

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-slate-600 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h3 className="mb-3 mt-8 font-heading text-xl font-bold text-navy first:mt-0">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="mb-2 mt-6 font-heading text-lg font-bold text-navy first:mt-0">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-base text-slate-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-base text-slate-600">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={typeof value?.href === "string" ? value.href : "#"}
        className="font-medium text-blue underline-offset-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export type ProductDetailDoc = {
  _id: string;
  title: string;
  slug: string;
  productCode?: string;
  shortDescription?: string;
  fullDescription?: PortableTextBlock[];
  badgeLabel?: string;
  keyFeatures?: string[];
  detailHighlightsSectionTitle?: string;
  detailHighlights?: { icon?: string; title?: string; description?: string }[];
  specificationsIntro?: string;
  technicalLeadNote?: string;
  specifications?: { label?: string; value?: string }[];
  datasheetUrl?: string;
  installationBookingUrl?: string;
  documents?: {
    title?: string;
    subtitle?: string;
    url?: string;
    sizeBytes?: number;
    fileName?: string;
  }[];
  productImage?: string | null;
  productImages?: (string | null)[] | null;
  category?: {
    title?: string;
    slug?: string;
    icon?: string;
    color?: string;
    parent?: { title?: string; slug?: string };
  };
  relatedManual?: ProductCard[];
  relatedSuggested?: ProductCard[];
};

type ProductCard = {
  _id: string;
  title: string;
  slug: string;
  productCode?: string;
  shortDescription?: string;
  categorySlug?: string;
  imageUrl?: string | null;
};

function placeholderImage(seed: string) {
  const s = encodeURIComponent(seed.slice(0, 48));
  return `https://picsum.photos/seed/${s}/960/720`;
}

function formatFileSize(bytes: number | null | undefined): string {
  if (bytes == null || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  const dec = n >= 10 || i === 0 ? 0 : 1;
  return `${n.toFixed(dec)} ${units[i]}`;
}

function categoryBadgeClass(color?: string | null): string {
  if (color === "fire") return "bg-fire text-white";
  if (color === "orange") return "bg-orange text-white";
  return "bg-blue text-white";
}

function pickRelated(product: ProductDetailDoc, limit = 6): ProductCard[] {
  const self = product._id;
  const manual = (product.relatedManual ?? []).filter((p) => p._id !== self && p.categorySlug);
  if (manual.length > 0) {
    return manual.slice(0, limit);
  }
  const sug = (product.relatedSuggested ?? []).filter((p) => p._id !== self && p.categorySlug);
  return sug.slice(0, limit);
}

function buildDocumentRows(product: ProductDetailDoc) {
  const rows = [...(product.documents ?? [])].filter((d) => d.title?.trim());
  const withUrls = rows
    .map((d) => {
      const url = d.url?.trim();
      if (!url) return null;
      const size = formatFileSize(d.sizeBytes);
      const ext = d.fileName?.split(".").pop()?.toUpperCase();
      const subtitle =
        d.subtitle?.trim() ||
        [ext && `${ext}`, size && `· ${size}`].filter(Boolean).join(" ");
      return { title: d.title!.trim(), subtitle: subtitle || undefined, url };
    })
    .filter(Boolean) as { title: string; subtitle?: string; url: string }[];

  if (withUrls.length === 0 && product.datasheetUrl?.trim()) {
    withUrls.push({
      title: "Product datasheet",
      subtitle: "External link",
      url: product.datasheetUrl.trim(),
    });
  }
  return withUrls;
}

type BodyProps = {
  product: ProductDetailDoc;
  categorySlug: string;
  productSlug: string;
};

function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">{kicker}</p>
      ) : null}
      <h2 className="mt-2 font-heading text-2xl font-bold text-navy md:text-3xl">{title}</h2>
      {sub ? <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{sub}</p> : null}
      <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-orange to-orange/40" aria-hidden />
    </div>
  );
}

function ProductDetailBody({ product, categorySlug, productSlug }: BodyProps) {
  const galleryUrls = useMemo(() => {
    const ordered: string[] = [];
    const push = (u?: string | null) => {
      const t = u?.trim();
      if (t && !ordered.includes(t)) ordered.push(t);
    };
    push(product.productImage);
    (product.productImages ?? []).forEach((u) => push(u));
    if (ordered.length === 0) push(placeholderImage(product._id));
    return ordered;
  }, [product]);

  const [heroSrc, setHeroSrc] = useState(() => galleryUrls[0] ?? placeholderImage(product._id));

  const related = useMemo(() => pickRelated(product), [product]);

  const docRows = useMemo(() => buildDocumentRows(product), [product]);

  const badge =
    product.badgeLabel?.trim() ||
    (product.category?.title ? product.category.title.toUpperCase() : "PRODUCT");
  const highlightsTitle =
    product.detailHighlightsSectionTitle?.trim() || "Unmatched Technical Superiority";
  const keyFeatures = (product.keyFeatures ?? []).map((s) => s.trim()).filter(Boolean);
  const specs = (product.specifications ?? [])
    .filter((r) => r.label?.trim() && r.value?.trim())
    .map((r) => ({ label: r.label!.trim(), value: r.value!.trim() }));
  const highlights = (product.detailHighlights ?? []).filter((h) => h.title?.trim());
  const specPreview = specs.slice(0, 5);
  const hasFullDescription = Array.isArray(product.fullDescription) && product.fullDescription.length > 0;

  const seoDesc = truncateMeta(product.shortDescription ?? product.title);

  const jumpClass =
    "inline-flex items-center gap-1.5 rounded-pill border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-sm transition hover:border-orange/40 hover:text-orange";

  return (
    <Screen>
      <Seo title={product.title} description={seoDesc} pathname={`/products/${categorySlug}/${productSlug}`} />

      <div className="relative">
        {/* Hero atmosphere */}
        <div className="relative overflow-hidden bg-navy pb-20 pt-4 text-white md:pb-24 md:pt-6">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(17,86,204,0.45),transparent_58%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-navy"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:56px_56px]"
            aria-hidden
          />

          <div className="container-site relative z-10">
            <nav className="text-xs text-white/55 md:text-sm" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link to="/" className="transition hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="text-white/25" aria-hidden>
                  <ChevronRight className="inline h-3.5 w-3.5" />
                </li>
                <li>
                  <Link to="/products" className="transition hover:text-white">
                    Products
                  </Link>
                </li>
                <li className="text-white/25" aria-hidden>
                  <ChevronRight className="inline h-3.5 w-3.5" />
                </li>
                <li className="text-white/85">{product.category?.title ?? "Category"}</li>
                <li className="text-white/25" aria-hidden>
                  <ChevronRight className="inline h-3.5 w-3.5" />
                </li>
                <li className="font-semibold text-orange">{product.title}</li>
              </ol>
            </nav>

            <div className="mt-8 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange">Product catalogue</p>
              <h1 className="mt-2 font-heading text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-[2.65rem]">
                {product.title}
              </h1>
              {product.category?.parent?.title ? (
                <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white/90">
                    <Layers className="h-3.5 w-3.5 opacity-80" aria-hidden />
                    {product.category.parent.title}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-white/35" aria-hidden />
                  <span>{product.category.title}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Overlapping product shell */}
        <div className="container-site relative z-10 -mt-14 md:-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_24px_80px_rgba(12,35,64,0.12)] md:p-8 lg:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
              {/* Gallery */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/80 shadow-inner">
                  <span
                    className={`absolute left-4 top-4 z-10 max-w-[min(100%-2rem,280px)] truncate rounded-pill px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide shadow-md ${categoryBadgeClass(product.category?.color)}`}
                  >
                    {badge}
                  </span>
                  <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_30%_20%,rgba(17,86,204,0.12),transparent_45%)]" />
                  <div className="relative flex aspect-[5/4] items-center justify-center p-8 md:p-12">
                    <img
                      src={heroSrc}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_12px_32px_rgba(12,35,64,0.15)]"
                      width={960}
                      height={720}
                    />
                  </div>
                </div>
                {galleryUrls.length > 1 ? (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                    {galleryUrls.map((url, i) => {
                      const active = url === heroSrc;
                      return (
                        <button
                          key={`${url}-${i}`}
                          type="button"
                          aria-label={`Show image ${i + 1}`}
                          aria-pressed={active}
                          className={`h-[4.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 shadow-sm transition ${
                            active
                              ? "border-orange ring-2 ring-orange/25"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          onClick={() => setHeroSrc(url)}
                        >
                          <img src={url} alt="" className="h-full w-full rounded-lg object-cover" />
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* Summary + CTAs */}
              <div className="lg:col-span-6">
                <div className="lg:sticky lg:top-28">
                  {product.productCode?.trim() ? (
                    <p className="inline-flex items-center rounded-lg border border-blue/20 bg-blue-light/60 px-3 py-1 font-mono text-sm font-semibold text-blue">
                      SKU · {product.productCode.trim()}
                    </p>
                  ) : null}

                  <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                    {product.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">ISO 9001 quality</span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">Project quotations</span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">Engineering support</span>
                  </div>

                  {keyFeatures.length > 0 ? (
                    <ul className="mt-6 space-y-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                      {keyFeatures.map((line) => (
                        <li key={line} className="flex gap-3 text-sm text-slate-800">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white shadow-sm">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </span>
                          <span className="leading-snug">{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {specPreview.length > 0 ? (
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          At-a-glance
                        </span>
                        {specs.length > specPreview.length ? (
                          <a href="#technical-specs" className="text-xs font-semibold text-blue hover:underline">
                            Full table ({specs.length})
                          </a>
                        ) : null}
                      </div>
                      <dl className="divide-y divide-slate-100">
                        {specPreview.map((row) => (
                          <div key={row.label} className="grid grid-cols-[1fr_auto] gap-3 px-4 py-2.5 text-sm">
                            <dt className="font-medium text-slate-700">{row.label}</dt>
                            <dd className="text-right font-mono text-xs text-slate-600 md:text-sm">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      to="/request-quote"
                      className="cta-glow-primary inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-6 py-3.5 text-sm font-semibold text-white hover:bg-orange-hover sm:flex-none"
                    >
                      Request a quote
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    {product.installationBookingUrl?.trim() ? (
                      <a
                        href={product.installationBookingUrl.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/20 hover:bg-slate-50 sm:flex-none"
                      >
                        Book installation
                      </a>
                    ) : (
                      <Link
                        to="/request-quote"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/20 hover:bg-slate-50 sm:flex-none"
                      >
                        Book installation
                      </Link>
                    )}
                  </div>

                  {(hasFullDescription || specs.length > 0 || docRows.length > 0 || highlights.length > 0) && (
                    <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                      <span className="w-full text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        On this page
                      </span>
                      {highlights.length > 0 ? (
                        <a href="#product-highlights" className={jumpClass}>
                          <Sparkles className="h-3.5 w-3.5 text-orange" aria-hidden />
                          Highlights
                        </a>
                      ) : null}
                      {specs.length > 0 ? (
                        <a href="#technical-specs" className={jumpClass}>
                          <ClipboardList className="h-3.5 w-3.5 text-blue" aria-hidden />
                          Specifications
                        </a>
                      ) : null}
                      {hasFullDescription ? (
                        <a href="#product-description" className={jumpClass}>
                          <FileText className="h-3.5 w-3.5 text-slate-500" aria-hidden />
                          Description
                        </a>
                      ) : null}
                      {docRows.length > 0 ? (
                        <a href="#technical-docs" className={jumpClass}>
                          <Download className="h-3.5 w-3.5 text-blue" aria-hidden />
                          Downloads
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {highlights.length > 0 ? (
        <section
          id="product-highlights"
          className="scroll-mt-28 border-t border-slate-200/80 bg-gradient-to-b from-[#f4f7fa] to-white py-16 md:py-20"
        >
          <div className="container-site">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Capability</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-navy md:text-3xl">{highlightsTitle}</h2>
              <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-orange" aria-hidden />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => {
                const Icon = productDetailIcon(h.icon);
                return (
                  <motion.div
                    key={`${h.title}-${i}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card transition hover:border-orange/20 hover:shadow-card-hover"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange/15 to-orange/5 text-orange">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-bold text-navy">{h.title}</h3>
                    {h.description?.trim() ? (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.description.trim()}</p>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="technical-specs"
        className="scroll-mt-28 border-t border-slate-200/80 bg-white py-16 md:py-20"
      >
        <div className="container-site">
          {specs.length > 0 ? (
            <>
              <SectionTitle
                kicker="Engineering data"
                title="Technical specifications"
                sub={
                  product.specificationsIntro?.trim() ||
                  "Row-by-row parameters for submittals, tender schedules, and on-site verification."
                }
              />
              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-6">
                  {product.technicalLeadNote?.trim() ? (
                    <aside className="rounded-2xl border border-blue/25 bg-gradient-to-br from-blue-light to-blue-light/40 p-5 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue">Technical lead note</p>
                      <p className="mt-2 text-base italic leading-relaxed text-navy">
                        &ldquo;{product.technicalLeadNote.trim()}&rdquo;
                      </p>
                    </aside>
                  ) : null}
                  {!product.technicalLeadNote?.trim() && !product.specificationsIntro?.trim() ? (
                    <p className="text-sm leading-relaxed text-slate-600">
                      Pair this table with your drawings and panel schedules. Optional lead notes can sit alongside the
                      grid when you need consultant-facing commentary.
                    </p>
                  ) : null}
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-[0_2px_24px_rgba(12,35,64,0.06)]">
                  <div className="grid grid-cols-2 gap-0 bg-gradient-to-r from-navy to-navy-light px-4 py-3.5 text-[11px] font-bold uppercase tracking-wide text-white md:px-5">
                    <span>Parameter</span>
                    <span className="text-right md:text-left">Metric</span>
                  </div>
                  <div className="divide-y divide-slate-200 bg-white">
                    {specs.map((row, i) => (
                      <div
                        key={`${row.label}-${i}`}
                        className={`grid grid-cols-2 gap-0 px-4 py-3.5 text-sm md:px-5 ${i % 2 === 1 ? "bg-slate-50/90" : ""}`}
                      >
                        <span className="pr-3 font-medium text-navy">{row.label}</span>
                        <span className="text-right font-mono text-xs leading-relaxed text-slate-700 md:text-left md:text-sm">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-3xl rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 p-8 text-center md:p-10">
              <ClipboardList className="mx-auto h-10 w-10 text-slate-300" aria-hidden />
              <h2 className="mt-4 font-heading text-xl font-bold text-navy md:text-2xl">Technical specifications</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
                There isn&apos;t a published parameter table for this SKU yet. Request a quote and our engineers will
                share cutsheets, approvals context, and compatibility notes for your package.
              </p>
              <Link
                to="/request-quote"
                className="cta-glow-primary mt-6 inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover"
              >
                Request datasheet pack
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      {hasFullDescription ? (
        <section
          id="product-description"
          className="scroll-mt-28 border-t border-slate-200/80 bg-[#f4f7fa] py-16 md:py-20"
        >
          <div className="container-site">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card md:p-10">
                <SectionTitle kicker="Deep dive" title="Product description" />
                <div className="mt-8 border-l-4 border-orange pl-5 md:pl-6">
                  <PortableText value={product.fullDescription!} components={ptComponents} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="technical-docs"
        className="scroll-mt-28 border-t border-slate-200/80 bg-gradient-to-b from-blue-light/40 to-white py-16 md:py-20"
      >
        <div className="container-site">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <SectionTitle
              kicker="Assets"
              title="Technical documentation"
              sub="Datasheets, IOMs, and PDFs you publish for this SKU are listed here for engineers and consultants."
            />
            {docRows.length > 0 ? (
              <div className="grid w-full max-w-2xl flex-1 gap-4 sm:grid-cols-2">
                {docRows.map((doc) => (
                  <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-blue/35 hover:shadow-card-hover"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-blue-light text-white shadow-sm">
                      <FileText className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-sm font-bold text-navy group-hover:text-blue">
                        {doc.title}
                      </span>
                      {doc.subtitle ? (
                        <span className="mt-1 block text-xs text-slate-500">{doc.subtitle}</span>
                      ) : null}
                    </span>
                    <Download className="h-5 w-5 shrink-0 text-blue transition group-hover:translate-y-0.5" aria-hidden />
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm md:max-w-md md:p-8">
                <p className="text-sm leading-relaxed text-slate-600">
                  No files are linked for this product in the CMS yet. Ask us for the latest revision-controlled PDFs for
                  your discipline—fire, electrical, or MEP coordination.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline"
                >
                  Contact for documents
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-slate-200/80 bg-white py-16 md:py-20">
          <div className="container-site">
            <SectionTitle
              kicker="Also specified"
              title="Similar protective systems"
              sub="Curated in Sanity—or auto-suggested from the same sub-category."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => {
                const thumb = p.imageUrl?.trim() ?? placeholderImage(p._id);
                const code = p.productCode?.trim();
                return (
                  <motion.article
                    key={p._id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-24px" }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:border-orange/25 hover:shadow-card-hover"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden bg-slate-100">
                      <img
                        src={thumb}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-80" />
                      {code ? (
                        <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-orange shadow-sm">
                          {code}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-heading text-base font-bold text-navy group-hover:text-blue">{p.title}</h3>
                      {p.shortDescription?.trim() ? (
                        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
                          {p.shortDescription.trim()}
                        </p>
                      ) : null}
                      <Link
                        to="/products/$categorySlug/$productSlug"
                        params={{ categorySlug: p.categorySlug!, productSlug: p.slug }}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue hover:underline"
                      >
                        View details
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-slate-200/80 bg-[#f4f7fa] py-14 md:py-18">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 text-white shadow-[0_24px_64px_rgba(12,35,64,0.35)] md:px-12 md:py-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/20 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="font-heading text-2xl font-bold md:text-3xl">Need a full MEPF solution?</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                  Design, procurement, installation, and maintenance—from detection and panels through mechanical and
                  electrical integration.
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row md:w-auto">
                <Link
                  to="/request-quote"
                  className="cta-glow-primary inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-7 py-3.5 text-sm font-semibold text-white hover:bg-orange-hover"
                >
                  Consult our specialists
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Screen>
  );
}

type Props = { categorySlug: string; productSlug: string };

export function ProductDetail({ categorySlug, productSlug }: Props) {
  const q = useQuery({
    queryKey: ["product-detail", categorySlug, productSlug],
    queryFn: () =>
      sanityClient.fetch<ProductDetailDoc | null>(productBySlugQuery, { categorySlug, productSlug }),
  });

  const product = q.data;

  if (q.isLoading) {
    return (
      <Screen>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-navy py-20">
          <Loader2 className="h-9 w-9 animate-spin text-orange" aria-hidden />
          <span className="text-sm text-white/70">Loading product…</span>
          <span className="sr-only">Loading product</span>
        </div>
      </Screen>
    );
  }

  if (q.isError || !product) {
    return (
      <Screen>
        <Seo title="Product not found" description="This catalogue item is unavailable." noindex />
        <section className="bg-[#f4f7fa] py-20">
          <div className="container-site text-center">
            <h1 className="font-heading text-2xl font-bold text-navy">Product not found</h1>
            <p className="mt-2 text-slate-600">The product may have moved or the link is incorrect.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline"
            >
              Back to products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </Screen>
    );
  }

  return (
    <ProductDetailBody
      key={product._id}
      product={product}
      categorySlug={categorySlug}
      productSlug={productSlug}
    />
  );
}
