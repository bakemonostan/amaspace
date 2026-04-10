import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  Droplets,
  Flame,
  type LucideIcon,
  ShieldCheck,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useHomePageSections } from "@/hooks/useHomePageSections";
import { useHeroSection } from "@/hooks/useSiteContact";
import {
  mergeFeaturedSectionMeta,
  mergeSpecializedSection,
  type MergedSpecSolution,
} from "@/lib/homeSpecializedDefaults";
import { projectCardImageSrc } from "@/lib/sanity/projectCoverUrl";
import type { SanityProjectCard } from "@/lib/sanity/queries/projects.queries";

type TrustedPartner = {
  name: string;
  abbr: string;
  /** Optional: add `/public/trusted-partners/yourfile.png` and set path e.g. `/trusted-partners/acme.png` */
  logo?: string;
};

function PartnerMark({ abbr, logo }: Pick<TrustedPartner, "abbr" | "logo">) {
  const [imgOk, setImgOk] = useState(Boolean(logo));

  if (logo && imgOk) {
    return (
      <img
        src={logo}
        alt=""
        className="h-11 w-auto max-w-[120px] object-contain opacity-90 grayscale transition hover:grayscale-0"
        onError={() => setImgOk(false)}
      />
    );
  }

  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 font-heading text-[11px] font-bold tracking-tight text-navy shadow-sm"
      aria-hidden
    >
      {abbr}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SPEC_ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  wind: Wind,
  zap: Zap,
};

function SpecRowIcon({ name, isActive, accent }: { name: string; isActive: boolean; accent: "fire" | "blue" }) {
  if (!name || name === "none") {
    return <span className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />;
  }
  const Icon = SPEC_ICONS[name];
  if (!Icon) return <span className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />;
  const color =
    isActive && accent === "fire" ? "text-fire" : isActive ? "text-slate-500" : "text-slate-400";
  return <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} aria-hidden />;
}

export function HeroSection() {
  const hero = useHeroSection();

  return (
    <section className="bg-[#f4f7fa] pb-16 pt-12 md:pb-20 md:pt-16">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-pill border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
            {hero.badge}
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 font-heading text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            {hero.headlineLead} <span className="text-orange">{hero.headlineHighlight}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            {hero.subtext}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/request-quote"
              className="cta-glow-primary inline-flex items-center justify-center rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-hover"
            >
              Request a Quote
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-navy hover:border-navy"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md pb-12 lg:max-w-none lg:pb-0"
        >
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={hero.imageUrl}
              alt={hero.imageAlt}
              className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
              width={720}
              height={900}
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex max-w-[220px] items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-card md:left-6">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue text-[10px] font-bold text-blue"
              aria-hidden
            >
              ISO
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-navy">ISO 9001</p>
              <p className="text-xs text-slate-600">Quality management system compliant.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Unwavering credibility",
      body: "Trust, transparent processes, and consistent delivery aligned with ISO 9001 and rigorous internal quality standards.",
    },
    {
      icon: Wrench,
      title: "Services-led approach",
      body: "We design, procure, install, test, commission, and maintain systems tailored to each facility—not just supply.",
    },
    {
      icon: Building2,
      title: "Multi-sector expertise",
      body: "Construction, energy, data & telecoms, government, manufacturing, and natural resources—backed by multidisciplinary teams.",
    },
  ] as const;

  return (
    <section className="bg-navy py-14 text-white">
      <div className="container-site grid gap-10 md:grid-cols-3 md:gap-8">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="text-center md:text-left">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange/15 text-orange md:mx-0">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-4 font-heading text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const capabilities = [
  {
    icon: Wind,
    title: "HVAC systems",
    desc: "Design, procurement, installation, troubleshooting, and maintenance for commercial and residential buildings.",
    bullets: ["Packaged & VRF systems", "Kitchen hood & make-up air", "Smoke extract & HVAC controls"],
    learnMore: { to: "/services/$serviceSlug" as const, params: { serviceSlug: "hvac" as const } },
  },
  {
    icon: Zap,
    title: "Electrical engineering",
    desc: "Safe, efficient power from the grid to the final outlet—MV/LV distribution, metering, backup, and smart lighting.",
    bullets: ["MV/LV distribution & substations", "Backup & generation", "Smart LED & street lighting"],
    learnMore: { to: "/services/$serviceSlug" as const, params: { serviceSlug: "electrical-engineering" as const } },
  },
  {
    icon: Droplets,
    title: "Plumbing & piping",
    desc: "Water, wastewater, conveyance, and public health engineering for complex commercial infrastructure.",
    bullets: ["Treatment & conveyance", "Drainage & sewage", "Industrial piping"],
    learnMore: { to: "/services" as const },
  },
] as const;

export function CoreCapabilitiesSection() {
  return (
    <section className="bg-[#f4f7fa] py-16 md:py-20">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">Our core capabilities</h2>
          <p className="mt-3 text-slate-600">
            Integrated building services designed for optimal performance, safety, and longevity.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, desc, bullets, learnMore }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-navy">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              <ul className="mt-5 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              {"params" in learnMore ? (
                <Link
                  to={learnMore.to}
                  params={learnMore.params}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to={learnMore.to}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-navy hover:border-navy"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}

function specBorderClass(item: MergedSpecSolution, isActive: boolean) {
  if (!isActive) return "border-slate-200 bg-transparent hover:bg-slate-50/80";
  return item.accent === "fire" ? "border-fire bg-slate-50" : "border-navy bg-slate-50";
}

function specCtaClass(item: MergedSpecSolution) {
  return item.accent === "fire" ? "text-fire" : "text-blue";
}

export function SpecializedSolutionsSection() {
  const { data, isPending, isError } = useHomePageSections();
  const merged = mergeSpecializedSection(data?.specialized ?? null);
  const [pickedKey, setPickedKey] = useState<string | null>(null);
  const keys = merged.solutions.map((s) => s.key);
  const active =
    pickedKey !== null && keys.includes(pickedKey) ? pickedKey : (merged.solutions[0]?.key ?? "");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          {isPending ? (
            <p className="text-sm text-slate-600">Loading section…</p>
          ) : isError ? (
            <p className="text-sm text-red-700" role="alert">
              Could not load specialized solutions.
            </p>
          ) : (
            <>
              <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">{merged.sectionTitle}</h2>
              <p className="mt-4 max-w-lg text-slate-600">{merged.sectionIntro}</p>
              <ul className="mt-10 space-y-0">
                {merged.solutions.map((item) => {
                  const isActive = active === item.key;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => setPickedKey(item.key)}
                        className={`w-full border-l-4 py-5 pl-5 pr-3 text-left transition ${specBorderClass(item, isActive)}`}
                      >
                        <div className="flex items-start gap-3">
                          <SpecRowIcon name={item.icon} isActive={isActive} accent={item.accent} />
                          <div>
                            <p className="font-heading text-base font-bold text-navy">{item.title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                            {isActive ? (
                              <Link
                                to={item.ctaPath}
                                className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline ${specCtaClass(item)}`}
                              >
                                {item.cta}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
            <img
              src={merged.imageLeftUrl}
              alt={merged.imageLeftAlt}
              className="aspect-[3/4] w-full object-cover"
              width={400}
              height={533}
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
            <img
              src={merged.imageRightUrl}
              alt={merged.imageRightAlt}
              className="aspect-[3/4] w-full object-cover"
              width={400}
              height={533}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function featuredCardAlt(p: SanityProjectCard): string {
  const a = p.coverAlt?.trim();
  if (a) return a;
  return p.title;
}

export function FeaturedProjectsSection() {
  const { data, isPending, isError } = useHomePageSections();
  const meta = mergeFeaturedSectionMeta(data?.featuredBlock ?? null);
  const list = data?.featuredProjects ?? [];

  return (
    <section className="bg-[#f4f7fa] py-16 md:py-20">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">{meta.sectionTitle}</h2>
            <p className="mt-3 max-w-xl text-slate-600">{meta.sectionSubtitle}</p>
          </div>
          <Link
            to={meta.ctaPath}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy md:self-auto"
          >
            {meta.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {isPending ? (
            <p className="col-span-full text-center text-sm text-slate-600 md:col-span-3">Loading featured projects…</p>
          ) : isError ? (
            <p className="col-span-full text-center text-sm text-slate-600 md:col-span-3">
              Featured projects could not be loaded.
            </p>
          ) : list.length === 0 ? (
            <p className="col-span-full text-center text-sm text-slate-600 md:col-span-3">
              Add up to three projects under <strong>Featured projects (home)</strong> in Studio, or mark projects as{" "}
              <strong>featured</strong>.
            </p>
          ) : (
            list.map((p, i) => {
              const imgUrl = projectCardImageSrc(p.cover);
              const sub =
                (typeof p.subtitle === "string" && p.subtitle.trim()) ||
                p.description?.trim() ||
                "";
              return (
                <motion.article
                  key={p._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
                >
                  <img
                    src={imgUrl}
                    alt={featuredCardAlt(p)}
                    className="aspect-[4/3] w-full object-cover"
                    width={640}
                    height={480}
                  />
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-navy">{p.title}</h3>
                    {sub ? <p className="mt-1 text-sm text-slate-600 line-clamp-2">{sub}</p> : null}
                  </div>
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

const trustedPartners: TrustedPartner[] = [
  { name: "BuildCo", abbr: "BC" },
  { name: "Structura", abbr: "ST" },
  { name: "Apex Dev", abbr: "AD" },
  { name: "Metro", abbr: "MT" },
];

export function TrustedBySection() {
  return (
    <section className="bg-white py-14">
      <div className="container-site">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Trusted by industry leaders
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {trustedPartners.map(({ name, abbr, logo }) => (
            <div key={name} className="flex items-center gap-3">
              <PartnerMark abbr={abbr} logo={logo} />
              <span className="text-sm font-bold uppercase tracking-wide text-slate-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

