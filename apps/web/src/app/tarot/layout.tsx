import "../../styles/tarot-workflow.css";
import "../../styles/tarot-workflow-landing.css";
import "../../styles/tarot-workflow-stage.css";
import "../../styles/tarot-deck-ritual.css";
import "../../styles/tarot-spread-reveal.css";
import "../../styles/tarot-ai-reading.css";
import "../../styles/tarot-reading-card-detail.css";
import "../../styles/tarot-profile-fields.css";
import "../../styles/tarot-history.css";
import "../../styles/tarot-dictionary.css";
import "../../styles/tarot-combo-library.css";
import "../../styles/tarot-daily-card.css";
import "../../styles/tarot-clarify-warning.css";

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
