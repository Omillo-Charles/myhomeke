import type { Metadata } from "next";
import { chirp, mulish, outfit } from "@/components/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jade Apartments",
  description: "Jade Apartments",
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
