import { PageShell } from "../components/layout";
import {
  HomepageCallout,
  HomepageHero,
  HomepageModulesConstellation,
  HomepageModulesGrid,
  HomepagePricingPlans,
  HomepageStyles,
  HomepageTrustSignals,
} from "../components/homepage";

export default function HomePage() {
  return (
    <>
      <HomepageStyles />
      <div className="relative z-10">
        <PageShell containerWidth="wide" showBack={false}>
          <HomepageHero />
          <HomepageModulesGrid />
          <HomepagePricingPlans />
          <HomepageModulesConstellation />
          <HomepageCallout />
          <HomepageTrustSignals />
        </PageShell>
      </div>
    </>
  );
}
