// Barrel export — Firestore adapters (server context only).
export { firestoreUserRepository, ensureUser } from "./user-repository";
export { firestoreEntitlementRepository } from "./entitlement-repository";
export {
  firestorePurchaseRepository,
  updatePurchaseProviderRef,
} from "./purchase-repository";
