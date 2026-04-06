import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Flame, ShieldCheck } from "lucide-react";
import { Screen } from "@/components/ui/Screen";
import type { FireCard } from "@/features/services/service-data";
import type { ServicePageConfig } from "@/features/services/service-data";

function FireCapabilityCard({ card }: { card: FireCard }) {
  const Icon = card.icon;
  const inner = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-fire ring-1 ring-red-100">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold text-navy">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {card.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="font-semibold text-fire" aria-hidden>
              &gt;
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue group-hover:text-navy">
        {card.cta}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </>
  );

  const cardClass =
    "group flex h-full min-h-[280px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-fire/25 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

  if (card.linkTo === "/products") {
    return (
      <Link to="/products" className={cardClass}>
        {inner}
      </Link>
    );
  }

  return (
    <Link to="/request-quote" className={cardClass}>
      {inner}
    </Link>
  );
}

function FireServicePage({ config }: { config: Extract<ServicePageConfig, { layout: "fire" }> }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#121212] text-white">
        <div className="container-site pb-10 pt-14 md:pb-14 md:pt-20">
          <p className="inline-flex items-center gap-2 rounded-pill bg-fire px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white">
            <Flame className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {config.heroBadge}
          </p>
          <h1 className="mt-6 max-w-[18ch] font-heading text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:max-w-none sm:text-4xl md:text-5xl">
            {config.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">{config.heroSub}</p>
          <Link
            to="/request-quote"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-fire px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:w-auto"
          >
            {config.heroCta}
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
        <div className="h-1 w-full bg-fire" aria-hidden />
      </section>

      {/* Body: intro + certifications | 2×2 cards */}
      <section className="border-b border-slate-100 bg-[#f8f9fb] py-12 md:py-16 lg:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Left column ~5/12 */}
            <div className="lg:col-span-5">
              <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">{config.whyTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{config.whyBody}</p>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-navy">
                  Certifications & standards
                </h3>
                <ul className="mt-5 space-y-4 text-sm">
                  {config.certifications.map((c) => (
                    <li key={c.abbr} className="flex gap-3 border-l-2 border-fire/80 pl-3">
                      <span className="shrink-0 font-bold text-fire">{c.abbr}</span>
                      <span className="text-slate-600">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column ~7/12 — card grid */}
            <div className="lg:col-span-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 lg:hidden">
                Capabilities
              </p>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                {config.cards.map((card) => (
                  <FireCapabilityCard key={card.title} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SplitServicePage({ config }: { config: Extract<ServicePageConfig, { layout: "split" }> }) {
  const Icon = config.icon;
  const image = (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
      <img
        src={config.imageUrl}
        alt={config.imageAlt}
        className="aspect-[4/3] w-full object-cover"
        width={800}
        height={600}
      />
    </div>
  );

  const copy = (
    <div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-navy">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h2 className="mt-5 font-heading text-2xl font-bold text-navy md:text-3xl">{config.sectionTitle}</h2>
      <p className="mt-4 text-slate-600 leading-relaxed">{config.sectionBody}</p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Key offerings</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {config.offerings.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {config.imagePosition === "left" ? (
          <>
            {image}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {image}
          </>
        )}
      </div>
    </section>
  );
}

export function ServiceLandingView({ config }: { config: ServicePageConfig }) {
  return (
    <Screen>
      {config.layout === "fire" ? (
        <FireServicePage config={config} />
      ) : (
        <>
          <section className="bg-navy py-14 text-center text-white md:py-16">
            <div className="container-site">
              <h1 className="font-heading text-3xl font-extrabold md:text-4xl">{config.heroTitle}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-white/80">{config.heroSub}</p>
            </div>
          </section>
          <SplitServicePage config={config} />
        </>
      )}
    </Screen>
  );
}
