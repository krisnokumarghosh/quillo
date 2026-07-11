import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quillo | Read. Write. Share.",
    template: "%s | Quillo",
  },
  description: "A modern blogging platform to write and share your stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interFont.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] overflow-x-hidden">
        <main>{children}</main>
      </body>
    </html>
  );
}
