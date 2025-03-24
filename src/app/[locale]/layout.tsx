/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Assistant } from "next/font/google";

import "@/app/[locale]/globals.css";
import AuthProvider from "@/context/AuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // טעינת קובץ התרגומים
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/Icons/mainLogo.png" sizes="any" />
      </head>
      <body className={assistant.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>{children}</AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
