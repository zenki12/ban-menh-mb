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
  async redirects() {
    return [
      {
        source: "/payment/setup",
        has: [
          {
            type: "query",
            key: "productCode",
            value: "numerology_single_report",
          },
        ],
        destination: "/than-so-hoc/payment",
        permanent: true,
      },
      {
        source: "/payment/success",
        destination: "/than-so-hoc/payment/success",
        permanent: true,
      },
      {
        source: "/payment/cancel",
        destination: "/than-so-hoc/payment/cancel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
