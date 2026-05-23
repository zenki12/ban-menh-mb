import { adminFirestore } from "../firebase/admin";

const COLLECTION = "admin_logs";

export async function appendAdminLog(
  action: string,
  target: string,
  details?: Record<string, unknown>,
): Promise<void> {
  try {
    await adminFirestore.collection(COLLECTION).add({
      action,
      target,
      details: details ?? {},
      createdAt: new Date().toISOString(),
      source: "admin_api",
    });
  } catch (err) {
    console.warn(
      "[admin/audit-log] append failed:",
      err instanceof Error ? err.message : "unknown",
    );
  }
}
