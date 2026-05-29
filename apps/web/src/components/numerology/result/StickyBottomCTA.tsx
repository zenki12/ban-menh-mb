import { Button } from "../../ui";

type StickyBottomCTAProps = {
  price: string;
  ctaLabel: string;
  onClick: () => void;
};

export function StickyBottomCTA({ price, ctaLabel, onClick }: StickyBottomCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--bm-border-subtle)] bg-[var(--bm-bg-panel)]/95 p-4 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        <p className="bg-[image:var(--bm-gradient-gold-text)] bg-clip-text text-xl font-bold text-transparent">
          {price}
        </p>
        <Button size="md" onClick={onClick}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
