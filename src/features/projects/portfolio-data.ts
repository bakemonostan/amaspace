/**
 * Project summaries sourced from Amaspace Corporate Profile (Past / Present projects).
 * Imagery uses stock photos as placeholders until CMS assets exist.
 */
export type PortfolioProject = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  status: "completed" | "ongoing";
};

export const portfolioProjects: PortfolioProject[] = [
  {
    category: "Commercial",
    title: "Cornerstone Towers",
    description:
      "Supply and installation of MEP services for a premium office development on Victoria Island, Lagos—coordinated mechanical, electrical, and plumbing delivery.",
    tags: ["MEP", "High-rise", "Lagos"],
    imageUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "City skyline and high-rise buildings",
    status: "completed",
  },
  {
    category: "Security & ELV",
    title: "Everty-one Limited",
    description:
      "Security systems integration including access control, CCTV surveillance, and biometric systems for a Victoria Island, Lagos facility.",
    tags: ["Access control", "CCTV", "Biometrics"],
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Office building exterior and entrance",
    status: "completed",
  },
  {
    category: "Retail",
    title: "Gateway Mall Abuja",
    description:
      "Fire safety, security systems, and external lighting for a major retail destination in Abuja—aligned with operational and safety requirements.",
    tags: ["Fire safety", "Security", "Lighting"],
    imageUrl:
      "https://images.unsplash.com/photo-1555529669-2269763671c0?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Shopping mall interior",
    status: "completed",
  },
  {
    category: "Industrial",
    title: "Shoprite cold room warehouse",
    description:
      "Supply and installation of aspiration smoke detection for cold room warehouse operations—early warning in challenging environmental conditions.",
    tags: ["VESDA", "Fire detection", "Warehouse"],
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Warehouse storage aisles",
    status: "completed",
  },
  {
    category: "Retail",
    title: "Black Bell Mall Ikota",
    description:
      "End-to-end MEP services for a retail mall at Ikota—power, mechanical services, and plumbing coordinated for tenant readiness.",
    tags: ["MEP", "Retail"],
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Retail store interior",
    status: "completed",
  },
  {
    category: "Retail",
    title: "Miskay Fashion Store Lekki",
    description:
      "MEP installation for a fashion retail flagship on Lekki—reliable services packaged for a high-traffic showroom environment.",
    tags: ["MEP", "Fit-out"],
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Fashion retail boutique interior",
    status: "completed",
  },
  {
    category: "Commercial",
    title: "Precise Lighting HQ Lagos",
    description:
      "MEP scope for headquarters facilities supporting lighting and electrical operations—distribution, lighting circuits, and building services.",
    tags: ["Electrical", "MEP"],
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern office workspace",
    status: "completed",
  },
  {
    category: "Hospitality",
    title: "Blu Atlantic Hotel Lagos",
    description:
      "MEP installation for a hospitality property—guest comfort, back-of-house services, and reliable building systems for 24/7 operation.",
    tags: ["MEP", "Hospitality"],
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Hotel lobby and reception",
    status: "completed",
  },
  {
    category: "Residential",
    title: "120 Apartment Lekki",
    description:
      "Extra-low-voltage and life-safety package: CCTV, access control, parking barriers, and fire safety systems for a multi-unit residential development.",
    tags: ["ELV", "Fire safety", "Access"],
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern residential apartment building exterior",
    status: "ongoing",
  },
  {
    category: "Retail",
    title: "Miskay Fashion House Accra",
    description:
      "MEP services for Miskay Fashion House in Accra, Ghana—cross-border delivery with the same quality and coordination standards as our Nigeria work.",
    tags: ["MEP", "Ghana"],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Retail storefront and street",
    status: "ongoing",
  },
];
