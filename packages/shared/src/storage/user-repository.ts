// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Mirror docs/product-specs/data-contract.md mục 2 — collection `users`.

import type { User } from "../schemas";
import type { PaginationOptions, QueryResult, StorageContext } from "./common";

export interface UserRepository {
  getById(id: string, ctx: StorageContext): Promise<User | null>;
  getByEmail(email: string, ctx: StorageContext): Promise<User | null>;
  create(
    input: Omit<User, "id" | "createdAt" | "updatedAt">,
    ctx: StorageContext,
  ): Promise<User>;
  update(
    id: string,
    patch: Partial<Pick<User, "displayName" | "photoURL">>,
    ctx: StorageContext,
  ): Promise<User>;
  /** Dùng cho admin — list tất cả users có phân trang. */
  list(options: PaginationOptions, ctx: StorageContext): Promise<QueryResult<User>>;
}
