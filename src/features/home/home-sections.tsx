import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  Droplets,
  Flame,
  ShieldCheck,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";

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

const heroImg =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80";
const specImgA =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80";
const specImgB =
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80";
const projectImgs = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
] as const;

export function HeroSection() {
  return (
    <section className="bg-[#f4f7fa] pb-16 pt-12 md:pb-20 md:pt-16">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-pill border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
            Engineering excellence
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 font-heading text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            Building services engineered for <span className="text-orange">reliability.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Amaspace is a fast-growing Nigerian building services firm—delivering mechanical, electrical, plumbing, fire
            safety, and security solutions with cutting-edge technology, strict quality standards, and a proven track
            record on commercial and industrial projects.
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
              src={heroImg}
              alt="Construction site with workers and building infrastructure"
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

const specItems = [
  {
    id: "fire" as const,
    title: "Fire safety systems",
    desc: "Fire alarm & smoke detection, VESDA, foam, water mist, gas suppression, sprinklers, hydrants, hose reels, and portable extinguishers—designed, installed, tested, and maintained.",
    cta: "Explore fire safety expertise",
    to: "/services/$serviceSlug" as const,
    params: { serviceSlug: "fire-safety-systems" as const },
    activeBorder: "border-fire",
    ctaClass: "text-fire",
    showFlame: true,
  },
  {
    id: "bms" as const,
    title: "Building management systems (BMS)",
    desc: "Extra-low voltage integration including BMS, access control, CCTV, fire detection, and UPS—compliant, dependable, and fully coordinated.",
    cta: "View our services",
    to: "/services" as const,
    activeBorder: "border-navy",
    ctaClass: "text-blue",
    showFlame: false,
  },
] as const;

export function SpecializedSolutionsSection() {
  const [active, setActive] = useState<(typeof specItems)[number]["id"]>("fire");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">Specialized solutions</h2>
          <p className="mt-4 max-w-lg text-slate-600">
            Critical infrastructure demands specialists. From fire life safety to intelligent building controls, we align
            systems with codes, operations, and your long-term asset strategy.
          </p>
          <ul className="mt-10 space-y-0">
            {specItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(item.id)}
                    className={`w-full border-l-4 py-5 pl-5 pr-3 text-left transition ${
                      isActive
                        ? `${item.activeBorder} bg-slate-50`
                        : "border-slate-200 bg-transparent hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {item.showFlame ? (
                        <Flame className={`mt-0.5 h-5 w-5 shrink-0 ${isActive ? "text-fire" : "text-slate-400"}`} />
                      ) : (
                        <span className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                      )}
                      <div>
                        <p className="font-heading text-base font-bold text-navy">{item.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                        {isActive ? (
                          "params" in item ? (
                            <Link
                              to={item.to}
                              params={item.params}
                              className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline ${item.ctaClass}`}
                            >
                              {item.cta}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          ) : (
                            <Link
                              to={item.to}
                              className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline ${item.ctaClass}`}
                            >
                              {item.cta}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          )
                        ) : null}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
            <img src={specImgA} alt="Commercial construction and building envelope work" className="aspect-[3/4] w-full object-cover" width={400} height={533} />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
            <img src={specImgB} alt="Engineer reviewing technical drawings and plans" className="aspect-[3/4] w-full object-cover" width={400} height={533} />
          </div>
        </div>
      </div>
    </section>
  );
}

const featuredProjects = [
  {
    title: "Cornerstone Towers",
    sub: "MEP services • Victoria Island, Lagos",
    img: projectImgs[0],
  },
  {
    title: "Gateway Mall Abuja",
    sub: "Fire safety, security & external lighting",
    img: projectImgs[1],
  },
  {
    title: "Blu Atlantic Hotel",
    sub: "MEP installation • Lagos",
    img: projectImgs[2],
  },
] as const;

export function FeaturedProjectsSection() {
  return (
    <section className="bg-[#f4f7fa] py-16 md:py-20">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">Featured projects</h2>
            <p className="mt-3 max-w-xl text-slate-600">
              A selection of completed and ongoing engineering and installation work drawn from our corporate portfolio.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy md:self-auto"
          >
            View full portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
            >
              <img
                src={p.img}
                alt={p.title}
                className="aspect-[4/3] w-full object-cover"
                width={640}
                height={480}
              />
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.sub}</p>
              </div>
            </motion.article>
          ))}
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

