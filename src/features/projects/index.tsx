import { Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";
import { sanityClient } from "@/lib/sanity/client";
import { projectCardImageSrc } from "@/lib/sanity/projectCoverUrl";
import { allProjectsQuery, type SanityProjectCard } from "@/lib/sanity/queries/projects.queries";

function ProjectCoverImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full min-h-[140px] w-full flex-col items-center justify-center gap-2 bg-slate-200 text-slate-500">
        <Building2 className="h-10 w-10 shrink-0 opacity-45" aria-hidden />
        <span className="px-4 text-center text-[11px] font-medium">Photo unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function projectCardAlt(p: SanityProjectCard): string {
  const a = p.coverAlt?.trim();
  if (a) return a;
  return p.title;
}

export function ProjectsScreen() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["sanity", "projects", "all"],
    queryFn: () => sanityClient.fetch<SanityProjectCard[]>(allProjectsQuery),
  });

  return (
    <Screen>
      <Seo
        title="Project portfolio"
        description="Selected Amaspace projects across Nigeria—MEP, fire safety, security, ELV, and retail and commercial building services from Lagos to Abuja and Accra."
      />
      <section className="bg-navy py-14 text-center text-white md:py-20">
        <div className="container-site">
          <h1 className="font-heading text-3xl font-extrabold md:text-4xl lg:text-5xl">Project portfolio</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Demonstrating capability through delivered MEP, fire safety, security, and building services projects across
            Nigeria and the region.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-12 md:py-16">
        <div className="container-site">
          {isPending ? (
            <p className="text-center text-sm text-slate-600">Loading projects…</p>
          ) : isError ? (
            <p className="text-center text-sm text-red-700" role="alert">
              Could not load projects.{error instanceof Error ? ` ${error.message}` : ""}
            </p>
          ) : !data?.length ? (
            <p className="text-center text-sm text-slate-600">
              No projects in the catalogue yet. Add <strong>Project</strong> documents in Sanity Studio.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((project) => {
                const src = projectCardImageSrc(project.cover);
                const category = (project.category ?? "Project").trim() || "Project";
                const tags = project.tags?.filter(Boolean) ?? [];
                return (
                  <article
                    key={project._id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                      <ProjectCoverImage src={src} alt={projectCardAlt(project)} />
                      {project.status === "ongoing" ? (
                        <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-navy shadow-sm">
                          In progress
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-blue">{category}</p>
                      <h2 className="mt-2 font-heading text-lg font-bold text-navy md:text-xl">{project.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {project.description?.trim() || "—"}
                      </p>
                      {tags.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-pill border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Screen>
  );
}
