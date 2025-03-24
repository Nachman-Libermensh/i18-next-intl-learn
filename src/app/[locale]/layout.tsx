/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Assistant } from "next/font/google";

import "@/app/[locale]/globals.css";
import AuthProvider from "@/context/AuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LanguageSwitcher";

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
  const t = await getTranslations("Navigation");

  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/Icons/mainLogo.png" sizes="any" />
      </head>
      <body className={assistant.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Header */}
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <Link href={"/"} className="text-xl font-semibold">
                  {t("home")}
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t("about")}
                </Link>
              </div>
              <LocaleSwitcher />
            </div>
          </nav>
          <AuthProvider>{children}</AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
