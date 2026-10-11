import type { Metadata } from "next";
import { chirp, mulish, outfit } from "@/components/config/fonts";
import { BRAND_NAME } from "@/components/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: `${BRAND_NAME} — find a place to call your own.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${mulish.variable} ${chirp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
