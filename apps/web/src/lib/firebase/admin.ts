// Chỉ dùng trong server context. KHÔNG import vào client component.
// firebase-admin không chạy trên Edge runtime — route handler phải set
// export const runtime = "nodejs".

import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

function getAdminApp() {
  if (getApps().length > 0) return getApp();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    throw new Error(
      "Thiếu FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL hoặc FIREBASE_PRIVATE_KEY. Kiểm tra .env.local.",
    );
  }

  // Xử lý escaped newline khi key được lưu dạng JSON string trong env.
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export const adminAuth: Auth = getAuth(getAdminApp());
