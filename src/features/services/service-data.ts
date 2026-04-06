import type { LucideIcon } from "lucide-react";
import {
  Bell,
  ClipboardList,
  CloudAlert,
  Droplets,
  Wind,
  Zap,
} from "lucide-react";

export type ServiceSlug = "fire-safety-systems" | "hvac" | "electrical-engineering";

export type FireCard = {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  /** Short CTA shown on the card */
  cta: string;
  /** Where the whole card navigates */
  linkTo: "/products" | "/request-quote";
};

type Certification = { abbr: string; name: string };

export type ServicePageConfig =
  | {
      layout: "fire";
      slug: ServiceSlug;
      heroBadge: string;
      title: string;
      heroSub: string;
      heroCta: string;
      whyTitle: string;
      whyBody: string;
      certifications: Certification[];
      cards: FireCard[];
    }
  | {
      layout: "split";
      slug: ServiceSlug;
      heroTitle: string;
      heroSub: string;
      icon: LucideIcon;
      sectionTitle: string;
      sectionBody: string;
      offerings: string[];
      imagePosition: "left" | "right";
      imageUrl: string;
      imageAlt: string;
    };

export const SERVICE_SLUGS: ServiceSlug[] = ["fire-safety-systems", "hvac", "electrical-engineering"];

export const servicePages: Record<ServiceSlug, ServicePageConfig> = {
  "fire-safety-systems": {
    layout: "fire",
    slug: "fire-safety-systems",
    heroBadge: "Specialized division",
    title: "Fire Safety Systems",
    heroSub:
      "Protecting lives and assets through rigorously engineered, compliant, and reliable fire detection and suppression solutions—aligned with international guidance and local project requirements.",
    heroCta: "Request fire system audit",
    whyTitle: "Why Amaspace for fire safety?",
    whyBody:
      "We design, procure, install, test, commission, and maintain fire life-safety systems with disciplined QA/HSE oversight. Our teams coordinate with architects, MEP contractors, and facility operators so detection, notification, and suppression work together under applicable codes and site-specific risk profiles.",
    certifications: [
      { abbr: "NFPA", name: "National Fire Protection Association frameworks" },
      { abbr: "FM", name: "FM Global–aligned equipment and installation practice" },
      { abbr: "UL", name: "Listed devices and assemblies where specified" },
    ],
    cards: [
      {
        title: "Detection & alarm",
        description:
          "Intelligent addressable fire alarm and smoke detection networks with clear zoning, monitoring, and integration paths for voice evacuation where required.",
        bullets: [
          "Smoke & heat detectors",
          "Aspirating systems (VESDA)",
          "Voice evacuation integration",
        ],
        icon: Bell,
        cta: "Browse detection products",
        linkTo: "/products",
      },
      {
        title: "Water-based suppression",
        description:
          "Hydraulically informed layouts for reliable wet, dry, and deluge-style protection tailored to occupancy and hazard class.",
        bullets: [
          "Automatic sprinkler systems",
          "Fire hydrants & hose reels",
          "Fire pump rooms",
        ],
        icon: Droplets,
        cta: "Discuss suppression scope",
        linkTo: "/request-quote",
      },
      {
        title: "Gaseous & special hazard",
        description:
          "Clean-agent and special-hazard solutions for server rooms, archives, and mission-critical plant where water-based systems are unsuitable.",
        bullets: ["FM-200 & Novec 1230 systems", "Inergen systems", "Server room protection"],
        icon: CloudAlert,
        cta: "Request special-hazard design",
        linkTo: "/request-quote",
      },
      {
        title: "Maintenance & audits",
        description:
          "Scheduled testing, servicing, and compliance documentation so systems stay ready for inspection and real-world events.",
        bullets: ["Annual system certification", "Corrective maintenance", "Flow testing"],
        icon: ClipboardList,
        cta: "Book maintenance / audit",
        linkTo: "/request-quote",
      },
    ],
  },
  hvac: {
    layout: "split",
    slug: "hvac",
    heroTitle: "Heating, ventilation & air conditioning",
    heroSub:
      "Comprehensive mechanical comfort and smoke-control solutions for commercial and residential buildings—design through commissioning and maintenance.",
    icon: Wind,
    sectionTitle: "Heating, ventilation & air conditioning (HVAC)",
    sectionBody:
      "Our professionals carry deep experience in design, procurement, installation, troubleshooting, and maintenance of HVAC systems and controls. We focus on reliable operation, energy-conscious selections, and coordination with electrical and fire safety interfaces.",
    offerings: [
      "Packaged rooftop air conditioning systems",
      "Mini split & multi split systems",
      "Variable refrigerant flow (VRF) systems",
      "Commercial kitchen hood & make-up air",
      "Smoke extract systems",
      "General HVAC controls",
    ],
    imagePosition: "right",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "HVAC equipment and building mechanical services",
  },
  "electrical-engineering": {
    layout: "split",
    slug: "electrical-engineering",
    heroTitle: "Electrical engineering",
    heroSub:
      "Safe, efficient power from the medium-voltage grid to the final outlet—distribution, backup, metering, and smart lighting for commercial and industrial facilities.",
    icon: Zap,
    sectionTitle: "Electrical engineering",
    sectionBody:
      "Our electrical engineering scope covers medium and low voltage distribution, substations and transformers at 33 kV and 11 kV, alternative generation, metering and billing, and dependable final circuits for operations and occupant safety. We align execution with accepted codes and client operating standards.",
    offerings: [
      "MV/LV distribution & substations (33 kV / 11 kV)",
      "Power distribution boards & switchgear integration",
      "UPS & backup generation",
      "Power metering & billing",
      "Smart LED lighting & street-light infrastructure",
      "Earthing & lightning protection",
    ],
    imagePosition: "left",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Electrical engineer reviewing power distribution equipment",
  },
};

export function getServiceConfig(slug: string): ServicePageConfig | undefined {
  return servicePages[slug as ServiceSlug];
}
