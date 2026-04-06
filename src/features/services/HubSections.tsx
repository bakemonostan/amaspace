import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Droplets,
  Flame,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Wind,
  Zap,
} from "lucide-react";

const IMG_MEPF =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=960&q=80";
const IMG_SUPPLY =
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=720&q=80";
const IMG_MAINT =
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=960&q=80";

const mepfTiles = [
  {
    title: "HVAC systems",
    sub: "Precision cooling, ventilation & smoke control",
    icon: Wind,
  },
  {
    title: "Electrical",
    sub: "Power distribution, protection & lighting",
    icon: Zap,
  },
  {
    title: "Plumbing",
    sub: "Water, drainage & public health services",
    icon: Droplets,
  },
  {
    title: "Firefighting",
    sub: "Detection, alarm & suppression systems",
    icon: Flame,
  },
] as const;

const maintenanceBullets = [
  "24/7 emergency technical support",
  "Preventive maintenance & asset registers",
  "Compliance and safety walk-downs with reporting",
  "Coordinated shutdowns and handover documentation",
] as const;

export function ServicesMepfContractingSection() {
  return (
    <section className="border-t border-slate-100 bg-white py-14 md:py-20">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
              <img
                src={IMG_MEPF}
                alt="Construction and MEP site coordination"
                className="aspect-[4/3] w-full object-cover lg:aspect-square"
                width={800}
                height={800}
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <span
              className="pointer-events-none absolute -right-2 top-0 select-none font-heading text-[7rem] font-extrabold leading-none text-slate-100 md:text-[9rem]"
              aria-hidden
            >
              01
            </span>
            <h2 className="relative font-heading text-2xl font-bold text-navy md:text-3xl">MEPF contracting</h2>
            <p className="relative mt-4 text-base leading-relaxed text-slate-600">
              End-to-end mechanical, electrical, plumbing, and fire engineering for commercial, industrial, and mixed-use
              developments—from design support and procurement through installation, testing, commissioning, and
              handover.
            </p>
            <div className="relative mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {mepfTiles.map(({ title, sub, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-100 bg-[#f8fafc] p-4 shadow-sm transition hover:border-orange/20 hover:shadow-md"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/15 text-orange">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="mt-3 font-heading text-xs font-bold uppercase tracking-wide text-navy">{title}</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-600">{sub}</p>
                </div>
              ))}
            </div>
            <Link
              to="/request-quote"
              className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-6 py-3.5 text-sm font-semibold text-white hover:bg-orange-hover sm:w-auto"
            >
              Start your project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ServicesProductsSupplySection() {
  return (
    <section className="border-t border-slate-100 bg-[#f4f7fa] py-14 md:py-20">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">Products &amp; supply</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We align specifications with trusted OEM and distribution channels—including Siemens-class fire safety and
              control products—so your site receives genuine equipment, correct spares, and warranty-backed support.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue">
                  <ShieldCheck className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-navy">Fire safety &amp; detection</p>
                  <p className="mt-1 text-sm text-slate-600">Listed panels, devices, and suppression-compatible kits.</p>
                </div>
              </li>
              <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue">
                  <LayoutDashboard className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-navy">MEP hardware &amp; controls</p>
                  <p className="mt-1 text-sm text-slate-600">Switchgear, cable systems, BMS/ELV interfaces as required.</p>
                </div>
              </li>
            </ul>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-blue bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy hover:border-navy"
            >
              Browse products
              <Package className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative w-full max-w-md">
              <div className="aspect-square overflow-hidden rounded-full border-8 border-white shadow-card">
                <img
                  src={IMG_SUPPLY}
                  alt="Industrial control and electrical equipment"
                  className="h-full w-full object-cover"
                  width={480}
                  height={480}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ServicesMaintenanceSection() {
  return (
    <section className="border-t border-slate-100 bg-white py-14 md:py-20">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-navy shadow-card">
              <img
                src={IMG_MAINT}
                alt="Engineer reviewing building systems"
                className="aspect-[4/3] w-full object-cover opacity-95"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <span
              className="pointer-events-none absolute -right-2 top-0 select-none font-heading text-[7rem] font-extrabold leading-none text-slate-100 md:text-[9rem]"
              aria-hidden
            >
              05
            </span>
            <h2 className="relative font-heading text-2xl font-bold text-navy md:text-3xl">MEPF maintenance</h2>
            <p className="relative mt-4 text-base leading-relaxed text-slate-600">
              Keep critical building services reliable with structured maintenance programmes, documented inspections, and
              rapid response when issues arise—aligned with your operations and statutory obligations.
            </p>
            <ul className="relative mt-6 space-y-3">
              {maintenanceBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <blockquote className="relative mt-8 border-l-4 border-orange bg-blue-light/50 py-4 pl-4 pr-4 text-sm italic leading-relaxed text-slate-700">
              Our maintenance teams focus on reducing unplanned downtime and extending asset life—so facilities stay
              occupant-ready and audit-friendly.
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ServicesWhySection() {
  return (
    <section className="border-t border-slate-100 bg-[#f4f7fa] py-14 md:py-16">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card lg:col-span-7"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-heading text-xl font-bold text-navy md:text-2xl">Why choose Amaspace?</h2>
            <div className="mt-6 space-y-5">
              <div>
                <p className="font-heading text-sm font-bold text-orange">Registered entity</p>
                <p className="mt-1 text-sm text-slate-600">
                  Amaspace Building Service Company is a fully registered engineering-led contractor, delivering
                  multidisciplinary projects with clear governance and accountable site leadership.
                </p>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-orange">Quality &amp; safety culture</p>
                <p className="mt-1 text-sm text-slate-600">
                  ISO 9001–aligned processes, disciplined HSE practices, and measurable handover standards on every
                  engagement.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center rounded-2xl border border-navy bg-navy p-8 text-white shadow-card lg:col-span-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Global partners</p>
            <p className="mt-3 font-heading text-lg font-bold">Trusted OEM &amp; distribution relationships</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              We collaborate with leading equipment manufacturers and specialist suppliers so specifications, spares, and
              technical support stay consistent from design through operation.
            </p>
            <p className="mt-6 font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
              Siemens-class fire &amp; control ecosystems
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
