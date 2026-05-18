// API client helper — client context only.
// Tự lấy Firebase ID token và thêm Authorization header.

import type { AppError } from "@banmenh/shared";
import { isAppError } from "@banmenh/shared";
import { firebaseAuth } from "../firebase/client";

/** Lấy Firebase credential string từ current user. */
async function getFirebaseCredential(): Promise<string | null> {
  const fbUser = firebaseAuth.currentUser;
  if (!fbUser) return null;
  try {
    return await fbUser.getIdToken();
  } catch {
    return null;
  }
}

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

/**
 * Fetch với Authorization: Bearer <credential> tự động.
 * Throw AppError nếu response.ok === false.
 */
export async function fetchWithAuth<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const credential = await getFirebaseCredential();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (credential) headers["Authorization"] = `Bearer ${credential}`;

  const response = await fetch(path, { ...options, headers });

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = null;
    }
    const err =
      typeof errorBody === "object" &&
      errorBody !== null &&
      "error" in errorBody &&
      isAppError((errorBody as { error: unknown }).error)
        ? (errorBody as { error: AppError }).error
        : { code: "INTERNAL_ERROR" as const, message: "Có lỗi xảy ra." };
    throw err;
  }

  return response.json() as Promise<T>;
}
