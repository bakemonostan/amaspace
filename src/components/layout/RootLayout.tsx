import { Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteCta } from "@/components/layout/SiteCta";
import { TopContactBar } from "@/components/layout/TopContactBar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideSiteCta = pathname === "/request-quote" || pathname.startsWith("/request-quote/");

  return (
    <ErrorBoundary>
      <TopContactBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!hideSiteCta ? <SiteCta /> : null}
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </ErrorBoundary>
  );
}
