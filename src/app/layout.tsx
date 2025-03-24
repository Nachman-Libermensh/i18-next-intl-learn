import type { Metadata } from "next";
import { Assistant } from "next/font/google";

import "@/app/globals.css";
import AuthProvider from "@/context/AuthProvider";

const assistant = Assistant({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: "normal",
  display: "swap",
  subsets: ["hebrew"],
});

export const metadata: Metadata = {
  title: "I18n-Next-Intl-learning",
  description: "Learning I18n and Next-Intl.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Icons/mainLogo.png" sizes="any" />
      </head>
      <body className={assistant.className} dir="rtl">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
