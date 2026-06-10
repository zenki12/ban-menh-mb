import { MysticStyles } from "../components/homepage-v2/MysticStyles";
import {
  MysticFAQ,
  MysticFinalCTA,
  MysticFooter,
  MysticHero,
  MysticHowItWorks,
  MysticModuleTabs,
  MysticPillars,
  MysticPricing,
  MysticStats,
} from "../components/homepage-v2";

export default function HomePage() {
  return (
    <>
      <MysticStyles />
      <main className="mystic-page">
        <MysticHero />
        <MysticStats />
        <MysticPillars />
        <MysticModuleTabs />
        <MysticPricing />
        <MysticHowItWorks />
        <MysticFAQ />
        <MysticFinalCTA />
        <MysticFooter />
      </main>
    </>
  );
}
