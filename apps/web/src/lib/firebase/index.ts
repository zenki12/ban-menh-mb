// Barrel export — chỉ export client-safe symbols.
// KHÔNG export adminAuth từ đây (server-only, sẽ vỡ client bundle).
export { firebaseApp, firebaseAuth } from "./client";
