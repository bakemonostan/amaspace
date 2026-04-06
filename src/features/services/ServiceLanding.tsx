import { Link } from "@tanstack/react-router";
import { Check, Flame, ShieldCheck } from "lucide-react";
import { Screen } from "@/components/ui/Screen";
import type { ServicePageConfig } from "@/features/services/service-data";

function FireServicePage({ config }: { config: Extract<ServicePageConfig, { layout: "fire" }> }) {
  return (
    <>
      <section className="bg-[#121212] pb-12 pt-16 text-white md:pb-16 md:pt-20">
        <div className="container-site">
          <p className="inline-flex items-center gap-2 rounded-pill bg-fire/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            <Flame className="h-3.5 w-3.5" aria-hidden />
            {config.heroBadge}
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-tight md:text-5xl">
            {config.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">{config.heroSub}</p>
          <Link
            to="/request-quote"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-fire px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            {config.heroCta}
            <ShieldCheck className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12 h-px w-full bg-fire" aria-hidden />
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">{config.whyTitle}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{config.whyBody}</p>
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-navy">
                Certifications & standards
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {config.certifications.map((c) => (
                  <li key={c.abbr} className="flex gap-2">
                    <span className="font-bold text-fire">{c.abbr}</span>
                    <span className="text-slate-600">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {config.cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-card"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-fire">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-navy">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="font-semibold text-fire" aria-hidden>
                          &gt;
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
