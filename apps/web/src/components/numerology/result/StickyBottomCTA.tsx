"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui";

type Props = {
  onUnlock: () => void;
};

export function StickyBottomCTA({ onUnlock }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`bm-sticky-cta ${visible ? "visible" : ""}`}
      role="region"
      aria-label="Mở khóa báo cáo"
    >
      <div className="bm-sticky-cta-inner">
        <div className="bm-sticky-cta-price">99.000đ</div>
        <Button variant="primary" onClick={onUnlock}>
          Mở khóa toàn bộ →
        </Button>
      </div>
    </div>
  );
}
