import { Link } from "@tanstack/react-router";

export function SiteCta() {
  return (
    <section className="bg-orange py-12 text-center text-white sm:py-16">
      <div className="container-site max-w-3xl">
        <h2 className="text-balance font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
          Ready to elevate your building&apos;s performance?
        </h2>
        <p className="mt-4 text-base text-white/90">
          Contact our engineering team to discuss your requirements and receive a structured consultation aligned with
          your programme and budget.
        </p>
        <Link
          to="/request-quote"
          className="cta-glow-on-orange mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-orange hover:bg-white/95"
        >
          Request a quote now
        </Link>
      </div>
    </section>
  );
}
