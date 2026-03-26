import { CTABanner } from "@/components/layout/CTABanner";
import { PageHero } from "@/components/layout/PageHero";
import { Screen } from "@/components/ui/Screen";

type BasicPageProps = {
  title: string;
  sub?: string;
};

export function BasicPage({ title, sub }: BasicPageProps) {
  return (
    <Screen>
      <PageHero title={title} sub={sub} />
      <div className="container-site py-10 text-slate-700">
        <p>Page scaffold is ready based on your architecture and route spec.</p>
      </div>
      <CTABanner />
    </Screen>
  );
}
