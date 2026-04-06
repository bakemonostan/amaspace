import { Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Flame } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";
import { BasicPage } from "@/features/common/BasicPage";
import { ServiceLandingView } from "@/features/services/ServiceLanding";
import { truncateMeta } from "@/lib/seo/truncate";
import {
  ServicesMepfContractingSection,
  ServicesMaintenanceSection,
  ServicesProductsSupplySection,
  ServicesWhySection,
} from "@/features/services/HubSections";
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
        title="Our services"
        description="MEP, fire life-safety, electrical, and mechanical building services for Nigeria—code-aligned design and installation, coordinated delivery, and ISO 9001 quality with strong HSE practices."
      />
      <section className="relative overflow-hidden bg-[#f4f7fa] py-12 md:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent"
          aria-hidden
        />
        <div className="container-site relative">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Engineered excellence</p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold text-navy md:text-5xl">Our services</h1>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-orange" aria-hidden />
            <p className="mt-5 text-base text-slate-600">
              Comprehensive building services from design through maintenance. We deliver integrated MEP, fire safety,
              security, and controls so your infrastructure stays reliable, compliant, and ready for operations.
            </p>
            <p className="mt-4 text-xs font-medium text-slate-500">
              ISO 9001 quality · Multidisciplinary teams · Safety-led delivery
            </p>
          </motion.div>
        </div>
      </section>

      <ServicesMepfContractingSection />

      <section className="bg-[#f4f7fa] py-12 md:py-16">
        <div className="container-site">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Service areas in detail
          </p>
          <h2 className="mt-2 text-center font-heading text-xl font-bold text-navy md:text-2xl">
            MEP &amp; fire safety
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Open a discipline to see scope, typical deliverables, and how we support your project team.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SERVICE_SLUGS.map((slug, i) => {
              const cfg = servicePages[slug];
              const title = cfg.layout === "fire" ? cfg.title : cfg.sectionTitle;
              const blurb = cfg.heroSub;
              const Icon = hubIconFor(slug);
              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-32px" }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                >
                  <Link
                    to="/services/$serviceSlug"
                    params={{ serviceSlug: slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-orange/25 hover:shadow-card-hover"
                  >
                    <div className="flex items-start gap-4 p-6 pb-0">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy transition duration-300 group-hover:bg-orange/10 group-hover:text-orange">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h2 className="font-heading text-lg font-bold leading-snug text-navy transition-colors group-hover:text-orange">
                          {title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-3 flex-1 px-6 text-sm leading-relaxed text-slate-600 line-clamp-4">{blurb}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 px-6 py-4">
                      <span className="text-sm font-semibold text-orange">View service</span>
                      <ArrowRight
                        className="h-4 w-4 text-orange transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 rounded-2xl border border-slate-200 border-l-4 border-l-orange bg-white p-6 shadow-card md:flex md:items-center md:justify-between md:gap-8 md:p-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
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
          </motion.div>
        </div>
      </section>

      <ServicesProductsSupplySection />
      <ServicesMaintenanceSection />
      <ServicesWhySection />
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
