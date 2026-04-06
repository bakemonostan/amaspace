import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Screen } from "@/components/ui/Screen";
import { BasicPage } from "@/features/common/BasicPage";
import { ServiceLandingView } from "@/features/services/ServiceLanding";
import { getServiceConfig, servicePages, SERVICE_SLUGS } from "@/features/services/service-data";

export function ServicesScreen() {
  return (
    <Screen>
      <section className="bg-navy py-14 text-center text-white md:py-16">
        <div className="container-site">
          <h1 className="font-heading text-3xl font-extrabold md:text-4xl">Engineering services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Comprehensive MEP and fire safety solutions driven by technical expertise, ISO-aligned quality, and safe
            delivery on site.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-14 md:py-20">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => {
            const cfg = servicePages[slug];
            const title =
              cfg.layout === "fire"
                ? cfg.title
                : cfg.sectionTitle;
            const blurb =
              cfg.layout === "fire"
                ? cfg.heroSub
                : cfg.heroSub;
            return (
              <Link
                key={slug}
                to="/services/$serviceSlug"
                params={{ serviceSlug: slug }}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <h2 className="font-heading text-lg font-bold text-navy group-hover:text-blue">{title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">{blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="container-site mt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:flex md:items-center md:justify-between md:text-left">
            <div>
              <h3 className="font-heading text-lg font-bold text-navy">Product catalogue</h3>
              <p className="mt-2 text-sm text-slate-600">
                Browse fire detection and related equipment from our Sanity-backed catalogue.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover md:mt-0"
            >
              View products
              <ArrowRight className="h-4 w-4" />
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
    return <BasicPage title="Service not found" sub="This service page does not exist." />;
  }

  return <ServiceLandingView config={config} />;
}
