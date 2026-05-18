import type { NextConfig } from "next";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "development";
const allowedAppEnvs = new Set(["development", "dev", "production"]);

if (!allowedAppEnvs.has(appEnv)) {
  throw new Error("NEXT_PUBLIC_APP_ENV must be development, dev, or production.");
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_ENV: appEnv,
  },
};

export default nextConfig;
