import type { Metadata } from "next";
import { Footer, Header } from "../components/layout";
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
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
