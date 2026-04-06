import type { LucideIcon } from "lucide-react";
import { Bell, Cloud, Cpu, Flame, Package, Radio, Shield, Zap } from "lucide-react";

/** Keys must match Sanity product.detailHighlights[].icon options. */
const MAP: Record<string, LucideIcon> = {
  radio: Radio,
  cloud: Cloud,
  shield: Shield,
  zap: Zap,
  cpu: Cpu,
  flame: Flame,
  bell: Bell,
  package: Package,
};

export function productDetailIcon(name?: string | null): LucideIcon {
  const k = name?.trim().toLowerCase() ?? "";
  return MAP[k] ?? Shield;
}
