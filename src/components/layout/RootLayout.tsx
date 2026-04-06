import { useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteCta } from "@/components/layout/SiteCta";
import { TopContactBar } from "@/components/layout/TopContactBar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideSiteCta = pathname === "/request-quote" || pathname.startsWith("/request-quote/");

  return (
    <ErrorBoundary>
      <OrganizationJsonLd />
      <TopContactBar />
      <Navbar />
      <main>
        <PageTransition />
      </main>
      {!hideSiteCta ? <SiteCta /> : null}
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </ErrorBoundary>
  );
}
