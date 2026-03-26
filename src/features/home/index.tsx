import { Link } from "@tanstack/react-router";
import { CTABanner } from "@/components/layout/CTABanner";
import { Screen } from "@/components/ui/Screen";

export function HomeScreen() {
  return (
    <Screen>
      <section className="bg-navy py-24 text-white">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange">Building Services Company</p>
          <h1 className="mt-3 max-w-3xl font-heading text-5xl font-extrabold">MEPF excellence, start to finish.</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Amaspace delivers engineering, fire safety, and building systems for commercial projects.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/request-quote" className="rounded-md bg-orange px-6 py-3 font-semibold text-white">
              Request a Quote
            </Link>
            <Link to="/projects" className="rounded-md border border-white px-6 py-3 font-semibold text-white">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
      <CTABanner />
    </Screen>
  );
}
