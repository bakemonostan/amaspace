import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const serviceLinks = [
  { to: "/services", label: "HVAC Systems" },
  { to: "/services", label: "Electrical Engineering" },
  { to: "/services", label: "Plumbing & Public Health" },
  { to: "/products", label: "Fire Safety" },
] as const;

export function Footer() {
  return (
    <footer className='bg-navy text-white py-10 md:py-0'>
      <div className='container-site pb-14 pt-20 md:pb-16 md:pt-24'>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          <div>
            <div className='flex items-center gap-2.5'>
              <span className='flex h-9 w-9 items-center justify-center rounded-md bg-white/10 font-heading text-lg font-bold text-white'>
                A
              </span>
              <span className='font-heading text-lg font-bold'>Amaspace</span>
            </div>
            <p className='mt-4 max-w-xs text-sm leading-relaxed text-white/70'>
              Credible, services-led building solutions for commercial and
              industrial facilities across Nigeria—MEP, fire safety, security,
              and project delivery you can rely on.
            </p>
            <div className='mt-5 flex gap-3 text-white/70'>
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded border border-white/20 p-2 hover:border-orange hover:text-orange'
                aria-label='LinkedIn'>
                <LinkedinIcon className='h-4 w-4' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded border border-white/20 p-2 hover:border-orange hover:text-orange'
                aria-label='X (Twitter)'>
                <TwitterIcon className='h-4 w-4' />
              </a>
            </div>
          </div>

          <div>
            <p className='font-heading text-sm font-semibold uppercase tracking-wide text-white/50'>
              Company
            </p>
            <ul className='mt-4 space-y-2.5 text-sm text-white/80'>
              <li>
                <Link
                  to='/'
                  className='hover:text-orange'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/projects'
                  className='hover:text-orange'>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='hover:text-orange'>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='hover:text-orange'>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className='font-heading text-sm font-semibold uppercase tracking-wide text-white/50'>
              Services
            </p>
            <ul className='mt-4 space-y-2.5 text-sm text-white/80'>
              {serviceLinks.map((item) => (
                <li
                  key={item.label}
                  className='flex items-center gap-2'>
                  {item.label === 'Fire Safety' ? (
                    <span
                      className='h-1.5 w-1.5 shrink-0 rounded-full bg-fire'
                      aria-hidden
                    />
                  ) : null}
                  <Link
                    to={item.to}
                    className='hover:text-orange'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='font-heading text-sm font-semibold uppercase tracking-wide text-white/50'>
              Contact
            </p>
            <ul className='mt-4 space-y-4 text-sm text-white/80'>
              <li className='flex gap-3'>
                <MapPin
                  className='mt-0.5 h-5 w-5 shrink-0 text-orange'
                  aria-hidden
                />
                <span>
                  No. S2 Premier 1 Estate
                  <br />
                  Lekki-Epe Express, Lagos
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone
                  className='h-5 w-5 shrink-0 text-orange'
                  aria-hidden
                />
                <a
                  href='tel:+2348079813950'
                  className='hover:text-orange'>
                  +234 807 981 3950
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail
                  className='h-5 w-5 shrink-0 text-orange'
                  aria-hidden
                />
                <a
                  href='mailto:amaspaceproject@yahoo.com'
                  className='hover:text-orange'>
                  amaspaceproject@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 border-t border-white/10 pt-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs text-white/50'>
              © {new Date().getFullYear()} Amaspace Building Service Company.
              All rights reserved.
            </p>
            <div className='flex flex-wrap gap-6 text-xs text-white/50'>
              <a
                href='#'
                className='hover:text-orange'>
                Privacy Policy
              </a>
              <a
                href='#'
                className='hover:text-orange'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
