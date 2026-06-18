"use client";

import {
  createError,
  type AppError,
  type User as SharedUser,
} from "@banmenh/shared";
import {
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { firebaseAuth } from "../firebase/client";

type AuthContextValue = {
  user: SharedUser | null;
  loading: boolean;
  isAnonymous: boolean;
  error: AppError | null;
  signInWithGoogle: () => Promise<void>;
  signInAnonymouslyFn: () => Promise<void>;
  linkAnonymousToGoogle: () => Promise<void>;
  signOutFn: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function mapFirebaseUser(fbUser: FirebaseUser): SharedUser {
  const now = new Date().toISOString();
  return {
    id: fbUser.uid,
    email: fbUser.email ?? undefined,
    displayName: fbUser.displayName ?? undefined,
    photoURL: fbUser.photoURL ?? undefined,
    provider: fbUser.isAnonymous ? "anonymous" : "google",
    createdAt: fbUser.metadata.creationTime ?? now,
    updatedAt: now,
  };
}

function mapFirebaseError(err: unknown): AppError | null {
  if (typeof err !== "object" || err === null) return null;
  const code = (err as { code?: string }).code ?? "";
  console.warn("[AuthProvider] Firebase auth failed:", code || err);
  if (
    code === "auth/cancelled-popup-request" ||
    code === "auth/popup-closed-by-user"
  ) {
    return null;
  }
  if (code === "auth/unauthorized-domain") {
    return {
      ...createError("AUTH_INVALID_TOKEN"),
      message: "Domain Vercel chưa được thêm vào Firebase Authorized domains.",
    };
  }
  if (code === "auth/operation-not-allowed") {
    return {
      ...createError("AUTH_INVALID_TOKEN"),
      message: "Google Sign-in chưa được bật trong Firebase Authentication.",
    };
  }
  if (code === "auth/popup-blocked") {
    return {
      ...createError("AUTH_INVALID_TOKEN"),
      message: "Trình duyệt đã chặn popup đăng nhập. Vui lòng cho phép popup rồi thử lại.",
    };
  }
  if (code === "auth/network-request-failed") return createError("NETWORK_ERROR");
  if (code === "auth/invalid-credential") return createError("AUTH_INVALID_TOKEN");
  return createError("INTERNAL_ERROR");
}

function createGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

/** Gọi /api/auth/session để ensure Firestore user doc — non-blocking. */
async function syncSessionToFirestore(fbUser: FirebaseUser): Promise<void> {
  try {
    const credential = await fbUser.getIdToken();
    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
  } catch (err) {
    console.warn("[AuthProvider] syncSession failed (non-blocking):", err);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SharedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (fbUser) => {
      setUser(fbUser ? mapFirebaseUser(fbUser) : null);
      setLoading(false);
      if (fbUser) {
        // Ensure Firestore user doc — không await để không block UI
        void syncSessionToFirestore(fbUser);
      }
    });
    return unsubscribe;
  }, []);

  async function signInWithGoogle() {
    setError(null);
    try {
      await signInWithPopup(firebaseAuth, createGoogleProvider());
    } catch (err) {
      const mapped = mapFirebaseError(err);
      if (mapped) setError(mapped);
    }
  }

  async function signInAnonymouslyFn() {
    setError(null);
    try {
      await signInAnonymously(firebaseAuth);
    } catch (err) {
      const mapped = mapFirebaseError(err);
      if (mapped) setError(mapped);
    }
  }

  async function linkAnonymousToGoogle() {
    setError(null);
    const current = firebaseAuth.currentUser;
    if (!current) {
      setError(createError("AUTH_REQUIRED"));
      return;
    }
    try {
      await linkWithPopup(current, createGoogleProvider());
    } catch (err) {
      const mapped = mapFirebaseError(err);
      if (mapped) setError(mapped);
    }
  }

  async function signOutFn() {
    setError(null);
    try {
      await signOut(firebaseAuth);
    } catch (err) {
      const mapped = mapFirebaseError(err);
      if (mapped) setError(mapped);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAnonymous: user?.provider === "anonymous",
        error,
        signInWithGoogle,
        signInAnonymouslyFn,
        linkAnonymousToGoogle,
        signOutFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
