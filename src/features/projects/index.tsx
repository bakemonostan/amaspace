import { Screen } from "@/components/ui/Screen";
import { portfolioProjects } from "@/features/projects/portfolio-data";

export function ProjectsScreen() {
  return (
    <Screen>
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {project.status === "ongoing" ? (
                    <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-navy shadow-sm">
                      In progress
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue">{project.category}</p>
                  <h2 className="mt-2 font-heading text-lg font-bold text-navy md:text-xl">{project.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-pill border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Screen>
  );
}
