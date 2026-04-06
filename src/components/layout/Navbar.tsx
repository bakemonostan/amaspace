import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const CONTACT_BAR_PX = 40;

function navLinkClass(active: boolean) {
  return active
    ? "font-semibold text-orange underline decoration-2 decoration-orange underline-offset-[10px]"
    : "text-slate-600 decoration-transparent hover:text-navy";
}

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSheetTop, setMobileSheetTop] = useState("7rem");

  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    mobileMenuBtnRef.current?.setAttribute("aria-expanded", mobileOpen ? "true" : "false");
  }, [mobileOpen]);

  const isHome = pathname === "/";
  const isServices = pathname === "/services" || pathname.startsWith("/services/");
  const isProducts = pathname === "/products" || pathname.startsWith("/products/");
  const isPortfolio = pathname === "/projects" || pathname.startsWith("/projects/");

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  useEffect(() => {
    const syncTop = () => {
      setMobileSheetTop(window.scrollY > CONTACT_BAR_PX ? "4.5rem" : "7rem");
    };
    syncTop();
    window.addEventListener("scroll", syncTop, { passive: true });
    return () => window.removeEventListener("scroll", syncTop);
  }, []);


  const closeAll = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-nav">
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={closeAll}>
          <BrandLogo variant="mark" />
          <span className="font-heading text-lg font-bold text-navy">Amaspace</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className={`text-sm ${navLinkClass(isHome)}`}>Home</Link>
          <Link to="/services" className={`text-sm ${navLinkClass(isServices)}`}>Services</Link>

          <Link to="/products" className={`text-sm ${navLinkClass(isProducts)}`}>Products</Link>
          <Link to="/projects" className={`text-sm ${navLinkClass(isPortfolio)}`}>Portfolio</Link>
        </nav>

        <div className="hidden md:block">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-2 rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <button
          ref={mobileMenuBtnRef}
          type="button"
          className="relative z-[120] inline-flex items-center justify-center rounded-md p-2 text-navy md:hidden"
          aria-controls="mobile-nav-sheet"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-0 left-0 right-0 z-[110] bg-navy/45 md:hidden"
              style={{ top: mobileSheetTop }}
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-nav-sheet"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 z-[115] flex flex-col overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-[0_-8px_32px_rgba(12,35,64,0.12)] md:hidden"
              style={{ top: mobileSheetTop }}
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
            >
              <div className="container-site flex flex-1 flex-col py-4">
                <div className="flex flex-col gap-1">
                  <Link
                    to="/"
                    className={`border-l-4 py-2 pl-3 text-sm ${isHome ? "border-orange font-semibold text-orange" : "border-transparent text-slate-700"}`}
                    onClick={closeAll}
                  >
                    Home
                  </Link>
                  <Link
                    to="/services"
                    className={`border-l-4 py-2 pl-3 text-sm ${isServices ? "border-orange font-semibold text-orange" : "border-transparent text-slate-700"}`}
                    onClick={closeAll}
                  >
                    Services
                  </Link>
                  <Link
                    to="/products"
                    className={`border-l-4 py-2 pl-3 text-sm ${isProducts ? "border-orange font-semibold text-orange" : "border-transparent text-slate-700"}`}
                    onClick={closeAll}
                  >
                    Products
                  </Link>
                  <Link
                    to="/projects"
                    className={`border-l-4 py-2 pl-3 text-sm ${isPortfolio ? "border-orange font-semibold text-orange" : "border-transparent text-slate-700"}`}
                    onClick={closeAll}
                  >
                    Portfolio
                  </Link>

                  <Link
                    to="/request-quote"
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-orange py-3 text-sm font-semibold text-white"
                    onClick={closeAll}
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
