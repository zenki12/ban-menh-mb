"use client";

import { useEffect, useState } from "react";

export function useTarotProfileName(displayName?: string | null) {
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const authenticatedName = displayName?.trim();
    if (!authenticatedName) return;
    setProfileName((current) => current.trim() || authenticatedName);
  }, [displayName]);

  return [profileName, setProfileName] as const;
}
