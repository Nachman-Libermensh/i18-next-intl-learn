"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("common.localeSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "he" : "en";
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      {t("switchLocale", {
        locale: otherLocale === "he" ? "עברית" : "English",
      })}
    </Link>
  );
}
