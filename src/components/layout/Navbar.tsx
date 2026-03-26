import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/specializations", label: "Specializations" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="font-heading text-lg font-bold text-navy">
          AMASPACE
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm text-slate-700 hover:text-orange">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/request-quote"
          className="rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-hover"
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}
