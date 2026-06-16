"use client";

import dynamic from "next/dynamic";

const GalaxyBackgroundDynamic = dynamic(
  () =>
    import("./GalaxyBackground").then((m) => ({
      default: m.GalaxyBackground,
    })),
  { ssr: false },
);

export function GalaxyBackgroundLazy() {
  return <GalaxyBackgroundDynamic />;
}
