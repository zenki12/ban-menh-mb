"use client";

import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth phải được dùng bên trong <AuthProvider>. Kiểm tra apps/web/src/app/layout.tsx.",
    );
  }
  return ctx;
}
