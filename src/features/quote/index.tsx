import { useId, useState } from "react";
import { ChevronDown, Clock, FileText, Mail, MapPin, Phone, Send } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Screen } from "@/components/ui/Screen";

const SITE = {
  phoneDisplay: "+234 807 981 3950",
  phoneHref: "tel:+2348079813950",
  emailDisplay: "amaspaceproject@yahoo.com",
  emailHref: "mailto:amaspaceproject@yahoo.com",
  addressLines: ["No. S2 Premier 1 Estate", "Lekki-Epe Express, Lagos"],
} as const;

const SERVICE_OPTIONS = [
  { value: "fire-safety-systems", label: "Fire safety systems" },
  { value: "hvac", label: "HVAC" },
  { value: "electrical-engineering", label: "Electrical engineering" },
  { value: "plumbing", label: "Plumbing & public health" },
  { value: "other", label: "Other / multiple disciplines" },
] as const;

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue";

const labelClass = "mb-1.5 block text-sm font-semibold text-navy";

export function RequestQuoteScreen() {
  const formId = useId();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Screen>
      <Seo
        title="Request a quote"
        description="Submit your engineering scope to Amaspace for a structured quote—MEP, fire safety, and building services. We aim to respond within 24 business hours with a clear proposal."
      />
      <section className="bg-[#f4f7fa] py-12 md:py-16 lg:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div className="lg:col-span-5">
              <h1 className="font-heading text-3xl font-extrabold text-navy md:text-4xl">Start your project</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Provide us with the initial details of your engineering requirements. Our technical team will review
                your submission and contact you promptly to discuss specifications and provide a comprehensive
                proposal.
              </p>

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-navy">Rapid response</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Expect to hear from an engineer within 24 business hours.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <FileText className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-navy">Detailed proposals</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      We provide clear, itemized quotes outlining scope, timelines, and technical approaches.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 rounded-2xl bg-navy p-6 text-white shadow-card md:p-8">
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden />
                    <a href={SITE.phoneHref} className="text-white/90 hover:text-orange">
                      {SITE.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden />
                    <a href={SITE.emailHref} className="break-all text-white/90 hover:text-orange">
                      {SITE.emailDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden />
                    <span className="text-white/90">
                      {SITE.addressLines[0]}
                      <br />
                      {SITE.addressLines[1]}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:p-8 lg:p-10">
                {sent ? (
                  <div className="py-6 text-center md:py-10">
                    <p className="font-heading text-xl font-bold text-navy">Thank you</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Your request has been received. We will contact you shortly at the details you provided.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${formId}-first`} className={labelClass}>
                          First name <span className="text-orange">*</span>
                        </label>
                        <input
                          id={`${formId}-first`}
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor={`${formId}-last`} className={labelClass}>
                          Last name <span className="text-orange">*</span>
                        </label>
                        <input
                          id={`${formId}-last`}
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${formId}-email`} className={labelClass}>
                          Company email <span className="text-orange">*</span>
                        </label>
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor={`${formId}-phone`} className={labelClass}>
                          Phone number
                        </label>
                        <input
                          id={`${formId}-phone`}
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-company`} className={labelClass}>
                        Company name <span className="text-orange">*</span>
                      </label>
                      <input
                        id={`${formId}-company`}
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-service`} className={labelClass}>
                        Primary service required <span className="text-orange">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id={`${formId}-service`}
                          name="service"
                          required
                          defaultValue=""
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="" disabled>
                            Select a service area
                          </option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          aria-hidden
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-details`} className={labelClass}>
                        Project details &amp; scope <span className="text-orange">*</span>
                      </label>
                      <textarea
                        id={`${formId}-details`}
                        name="details"
                        required
                        rows={5}
                        placeholder="Please describe your project scale, facility type, and specific engineering needs..."
                        className={`${inputClass} resize-y min-h-[120px]`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="cta-glow-primary flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3.5 text-sm font-semibold text-white hover:bg-orange-hover"
                    >
                      Submit request
                      <Send className="h-4 w-4" aria-hidden />
                    </button>

                    <p className="text-center text-xs text-slate-500">
                      By submitting, you agree to our{" "}
                      <a href="#" className="font-medium text-blue underline-offset-2 hover:underline">
                        privacy policy
                      </a>{" "}
                      regarding data handling.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Screen>
  );
}
