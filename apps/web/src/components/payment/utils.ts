import type { ProductModule } from "@banmenh/shared";

export type PaymentModule = ProductModule | (string & {});

export function moduleToSlug(module: PaymentModule): string {
  return module === "numerology" ? "than-so-hoc" : module;
}

export function buildModulePath(module: PaymentModule, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${moduleToSlug(module)}${normalizedPath}`;
}

export function appendSearchParams(path: string, params: URLSearchParams): string {
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}
