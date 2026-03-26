type PageHeroProps = {
  title: string;
  sub?: string;
};

export function PageHero({ title, sub }: PageHeroProps) {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container-site">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange">Amaspace</p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-slate-900">{title}</h1>
        {sub ? <p className="mt-3 max-w-2xl text-slate-600">{sub}</p> : null}
      </div>
    </section>
  );
}
