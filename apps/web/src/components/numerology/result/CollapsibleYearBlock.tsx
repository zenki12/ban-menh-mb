"use client";

import { useState, type ReactNode } from "react";

type CollapsibleYearBlockProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  heading: string;
};

export function CollapsibleYearBlock({
  children,
  defaultOpen = false,
  heading,
}: CollapsibleYearBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bm-collapsible">
      <button
        aria-expanded={open}
        className="bm-collapsible-trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>{heading}</span>
        <svg
          className={`bm-chevron ${open ? "bm-chevron-open" : ""}`}
          fill="currentColor"
          height="16"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      {open ? <div className="bm-collapsible-body">{children}</div> : null}
    </div>
  );
}
