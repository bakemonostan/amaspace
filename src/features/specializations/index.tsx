import { useParams } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { BasicPage } from "@/features/common/BasicPage";

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function SpecializationsScreen() {
  return (
    <>
      <Seo
        title="Specializations"
        description="Explore Amaspace technical specializations—building systems, fire and life safety, ELV, security, and integration capabilities for commercial and industrial projects in Nigeria."
      />
      <BasicPage title="Specializations" sub="Explore all technical specialization areas." />
    </>
  );
}

export function SpecializationDetailScreen() {
  const { slug } = useParams({ from: "/specializations/$slug" });
  const label = slugToTitle(slug);

  return (
    <>
      <Seo
        title={`${label}`}
        description={`${label} at Amaspace—capabilities, delivery approach, and related building services for Nigerian commercial and industrial clients.`}
        pathname={`/specializations/${slug}`}
      />
      <BasicPage title="Specialization Detail" sub="Area-specific capabilities, products, and projects." />
    </>
  );
}
