import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const specializationLinks = [
  { to: "/products", label: "Fire Safety & Detection" },
  { to: "/specializations", label: "Building Management Systems (BMS)" },
  { to: "/specializations", label: "Security, CCTV & Access Control" },
] as const;

const CONTACT_BAR_PX = 40;

function navLinkClass(active: boolean) {
  return active ? "text-blue font-medium" : "text-slate-600 hover:text-navy";
}

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSpecOpen, setMobileSpecOpen] = useState(false);
  const [desktopSpecOpen, setDesktopSpecOpen] = useState(false);
  const [mobileSheetTop, setMobileSheetTop] = useState('7rem');

  const desktopSpecBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileSpecBtnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    desktopSpecBtnRef.current?.setAttribute(
      'aria-expanded',
      desktopSpecOpen ? 'true' : 'false',
    );
  }, [desktopSpecOpen]);

  useLayoutEffect(() => {
    mobileMenuBtnRef.current?.setAttribute(
      'aria-expanded',
      mobileOpen ? 'true' : 'false',
    );
  }, [mobileOpen]);

  useLayoutEffect(() => {
    mobileSpecBtnRef.current?.setAttribute(
      'aria-expanded',
      mobileSpecOpen ? 'true' : 'false',
    );
  }, [mobileSpecOpen]);

  const isHome = pathname === "/";
  const isServices = pathname === "/services" || pathname.startsWith("/services/");
  const isProducts = pathname === "/products" || pathname.startsWith("/products/");
  const isPortfolio = pathname === "/projects" || pathname.startsWith("/projects/");
  const isSpecializations =
    pathname === "/specializations" || pathname.startsWith("/specializations/");

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const syncTop = () => {
      setMobileSheetTop(window.scrollY > CONTACT_BAR_PX ? '4.5rem' : '7rem');
    };
    syncTop();
    window.addEventListener('scroll', syncTop, { passive: true });
    return () => window.removeEventListener('scroll', syncTop);
  }, []);

  return (
    <header className='sticky top-0 z-50 border-b border-slate-100 bg-white shadow-nav'>
      <div className='container-site flex h-[72px] items-center justify-between gap-4'>
        <Link
          to='/'
          className='flex items-center gap-2.5'
          onClick={() => setMobileOpen(false)}>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy font-heading text-lg font-bold text-white'>
            A
          </span>
          <span className='font-heading text-lg font-bold text-navy'>
            Amaspace
          </span>
        </Link>

        <nav className='hidden items-center gap-8 md:flex'>
          <Link
            to='/'
            className={`text-sm ${navLinkClass(isHome)}`}>
            Home
          </Link>
          <Link
            to='/services'
            className={`text-sm ${navLinkClass(isServices)}`}>
            Services
          </Link>
          <div
            className='relative group'
            onMouseEnter={() => setDesktopSpecOpen(true)}
            onMouseLeave={() => setDesktopSpecOpen(false)}
            onFocus={() => setDesktopSpecOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setDesktopSpecOpen(false);
              }
            }}>
            <button
              ref={desktopSpecBtnRef}
              type='button'
              className={`flex items-center gap-1 text-sm ${navLinkClass(isSpecializations)}`}
              aria-haspopup='true'>
              Specializations
              <ChevronDown
                className='h-4 w-4 opacity-70'
                aria-hidden
              />
            </button>
            <div className='pointer-events-none absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100'>
              <div className='rounded-lg border border-slate-100 bg-white py-2 shadow-card'>
                {specializationLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className='block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-light hover:text-navy'>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            to='/products'
            className={`text-sm ${navLinkClass(isProducts)}`}>
            Products
          </Link>
          <Link
            to='/projects'
            className={`text-sm ${navLinkClass(isPortfolio)}`}>
            Portfolio
          </Link>
        </nav>

        <div className='hidden md:block'>
          <Link
            to='/request-quote'
            className='inline-flex items-center gap-2 rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover'>
            Request a Quote
            <ArrowRight
              className='h-4 w-4'
              aria-hidden
            />
          </Link>
        </div>

        <button
          ref={mobileMenuBtnRef}
          type='button'
          className='relative z-[120] inline-flex items-center justify-center rounded-md p-2 text-navy md:hidden'
          aria-controls='mobile-nav-sheet'
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}>
          {mobileOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <>
          <button
            type='button'
            className='fixed bottom-0 left-0 right-0 z-[110] bg-navy/45 md:hidden'
            style={{ top: mobileSheetTop }}
            aria-label='Close menu'
            onClick={() => setMobileOpen(false)}
          />
          <div
            id='mobile-nav-sheet'
            className='animate-mobile-nav-in fixed bottom-0 left-0 right-0 z-[115] flex flex-col overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-[0_-8px_32px_rgba(12,35,64,0.12)] md:hidden'
            style={{ top: mobileSheetTop }}
            role='dialog'
            aria-modal='true'
            aria-label='Main navigation'>
            <div className='container-site flex flex-1 flex-col py-4'>
              <div className='flex flex-col gap-1'>
                <Link
                  to='/'
                  className='py-2 text-sm font-medium text-navy'
                  onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link
                  to='/services'
                  className='py-2 text-sm text-slate-700'
                  onClick={() => setMobileOpen(false)}>
                  Services
                </Link>
                <button
                  ref={mobileSpecBtnRef}
                  type='button'
                  className='flex w-full items-center justify-between py-2 text-left text-sm text-slate-700'
                  onClick={() => setMobileSpecOpen((s) => !s)}>
                  Specializations
                  <ChevronDown
                    className={`h-4 w-4 transition ${mobileSpecOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileSpecOpen ? (
                  <div className='ml-2 border-l border-slate-200 pl-3'>
                    {specializationLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className='block py-2 text-sm text-slate-600'
                        onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
                <Link
                  to='/products'
                  className='py-2 text-sm text-slate-700'
                  onClick={() => setMobileOpen(false)}>
                  Products
                </Link>
                <Link
                  to='/projects'
                  className='py-2 text-sm text-slate-700'
                  onClick={() => setMobileOpen(false)}>
                  Portfolio
                </Link>
                <Link
                  to='/request-quote'
                  className='mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-orange py-3 text-sm font-semibold text-white'
                  onClick={() => setMobileOpen(false)}>
                  Request a Quote
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
