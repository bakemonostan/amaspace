import { Link, useParams } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Flame } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";
import { BasicPage } from "@/features/common/BasicPage";
import { ServiceLandingView } from "@/features/services/ServiceLanding";
import { truncateMeta } from "@/lib/seo/truncate";
import {
  getServiceConfig,
  servicePages,
  SERVICE_SLUGS,
  type ServiceSlug,
} from "@/features/services/service-data";

function hubIconFor(slug: ServiceSlug): LucideIcon {
  const cfg = servicePages[slug];
  if (cfg.layout === "split") return cfg.icon;
  return Flame;
}

export function ServicesScreen() {
  return (
    <Screen>
      <Seo
        title="Engineering services"
        description="MEP, fire life-safety, electrical, and mechanical building services for Nigeria—code-aligned design and installation, coordinated delivery, and ISO 9001 quality with strong HSE practices."
      />
      <section className="bg-[#f4f7fa] py-12 md:py-16">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-pill border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
              Engineering services
            </p>
            <h1 className="mt-4 font-heading text-3xl font-extrabold text-navy md:text-5xl">MEP & fire safety</h1>
            <p className="mt-3 text-slate-600">
              Comprehensive mechanical, electrical, and fire life-safety solutions—aligned with codes, coordinated on
              site, and delivered with disciplined QA and HSE oversight.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SERVICE_SLUGS.map((slug) => {
              const cfg = servicePages[slug];
              const title = cfg.layout === "fire" ? cfg.title : cfg.sectionTitle;
              const blurb = cfg.heroSub;
              const Icon = hubIconFor(slug);
              return (
                <Link
                  key={slug}
                  to="/services/$serviceSlug"
                  params={{ serviceSlug: slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:border-blue/25 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4 p-6 pb-0">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy transition group-hover:bg-blue/10 group-hover:text-blue">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h2 className="font-heading text-lg font-bold leading-snug text-navy group-hover:text-blue">
                        {title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 flex-1 px-6 text-sm leading-relaxed text-slate-600 line-clamp-4">{blurb}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 px-6 py-4">
                    <span className="text-sm font-semibold text-blue">View service</span>
                    <ArrowRight
                      className="h-4 w-4 text-blue transition group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="text-center md:text-left">
              <h3 className="font-heading text-lg font-bold text-navy">Product catalogue</h3>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Browse fire detection and related equipment from our Sanity-backed catalogue.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-5 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover md:mt-0 md:w-auto"
            >
              View products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </Screen>
  );
}

export function ServiceDetailScreen() {
  const { serviceSlug } = useParams({ from: "/services/$serviceSlug" });
  const config = getServiceConfig(serviceSlug);

  if (!config) {
    return (
      <>
        <Seo title="Service not found" description="The requested service page does not exist on Amaspace." noindex />
        <BasicPage title="Service not found" sub="This service page does not exist." />
      </>
    );
  }

  const pageTitle = config.layout === "fire" ? config.title : config.sectionTitle;
  const pageDescription = truncateMeta(config.heroSub);

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={`/services/${serviceSlug}`}
      />
      <ServiceLandingView config={config} />
    </>
  );
}
