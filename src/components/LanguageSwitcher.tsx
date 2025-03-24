"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const switchLanguage = async (newLocale: string) => {
    setLoading(true);
    // שמירת השפה החדשה ב-cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/`;
    // טעינה מחדש של הדף
    router.refresh();
    setLoading(false);
  };

  return (
    <select
      value={locale}
      onChange={(e) => switchLanguage(e.target.value)}
      disabled={loading}
    >
      <option value="he">עברית</option>
      <option value="en">English</option>
    </select>
  );
}
