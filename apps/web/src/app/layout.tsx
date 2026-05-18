import type { Metadata } from "next";
import { Footer, GalaxyBackground, Header } from "../components/layout";
import { AuthProvider } from "../lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bản Mệnh V2",
  description: "Nền tảng tra cứu huyền học module hóa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className="relative isolate flex min-h-screen flex-col"
        suppressHydrationWarning
      >
        <GalaxyBackground />
        {/* AuthProvider là client component — Next.js cho phép wrap server layout */}
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
