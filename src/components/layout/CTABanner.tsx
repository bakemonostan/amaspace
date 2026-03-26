import { Link } from "@tanstack/react-router";

export function CTABanner() {
  return (
    <section className="container-site mt-12">
      <div className="rounded-xl bg-navy px-6 py-10 text-white">
        <h2 className="font-heading text-3xl font-bold">Ready to start your project?</h2>
        <p className="mt-2 text-white/80">Tell us your requirements and we will respond within 24 hours.</p>
        <Link
          to="/request-quote"
          className="mt-6 inline-block rounded-md bg-orange px-6 py-3 font-semibold text-white hover:bg-orange-hover"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
