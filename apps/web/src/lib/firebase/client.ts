// Firebase client SDK — dùng được ở cả client component và server component.
// Singleton pattern: chỉ khởi tạo một lần dù module được import nhiều lần.

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Thiếu biến môi trường bắt buộc: ${key}. Kiểm tra .env.local theo .env.example.`,
    );
  }
  return value;
}

function createFirebaseConfig() {
  return {
    apiKey: getRequiredEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: getRequiredEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: getRequiredEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: getRequiredEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getRequiredEnv(
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    ),
    appId: getRequiredEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  };
}

function getFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    return initializeApp(createFirebaseConfig());
  }
  return getApp();
}

export const firebaseApp: FirebaseApp = getFirebaseApp();
export const firebaseAuth: Auth = getAuth(firebaseApp);
