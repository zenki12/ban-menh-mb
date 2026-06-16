import { MysticStyles } from "../components/homepage-v2/MysticStyles";
import {
  MysticBenefits,
  MysticFAQ,
  MysticHero,
  MysticHowItWorks,
  MysticModuleTabs,
  MysticStats,
} from "../components/homepage-v2";

export default function HomePage() {
  return (
    <>
      <MysticStyles />
      <main className="mystic-page">
        <MysticHero />
        <MysticStats />
        <MysticBenefits />
        <MysticModuleTabs />
        <MysticHowItWorks />
        <MysticFAQ />
      </main>
    </>
  );
}
