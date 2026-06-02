"use client";

// DEV ONLY — xóa trước production
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { firebaseAuth } from "../../lib/firebase";

export default function DevTokenPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { user, loading } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    let active = true;
    if (!user) {
      setToken("");
      return;
    }

    firebaseAuth.currentUser
      ?.getIdToken()
      .then((value) => {
        if (active) setToken(value);
      })
      .catch(() => {
        if (active) setToken("");
      });

    return () => {
      active = false;
    };
  }, [user]);

  if (loading) return <main className="p-6">Đang tải...</main>;
  if (!user) return <main className="p-6">Đăng nhập trước rồi quay lại</main>;

  return (
    <main className="space-y-4 p-6">
      <button
        className="rounded border px-3 py-2"
        disabled={!token}
        onClick={() => void navigator.clipboard.writeText(token)}
        type="button"
      >
        Copy
      </button>
      {token ? <pre className="whitespace-pre-wrap break-all">{token}</pre> : <p>Đang lấy token...</p>}
    </main>
  );
}
