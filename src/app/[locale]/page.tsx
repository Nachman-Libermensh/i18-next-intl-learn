"use client";
import { Link } from "@/i18n/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Home() {
  const { data: session } = useSession();
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {session ? (
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {t("welcome", { name: session.user?.name ?? "" })}
                </h2>
                <p className="mt-2 text-gray-600">
                  {t("email", { email: session.user?.email ?? "" })}
                </p>
              </div>

              <div className="space-y-3">
                {session.user?.employer && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-700 font-medium text-center">
                      {t("status.employer")}
                    </p>
                  </div>
                )}
                {session.user?.employee && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700 font-medium text-center">
                      {t("status.employee")}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => signOut()}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 text-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {t("title")}
                </h2>
                <p className="mt-2 text-gray-600">{t("pleaseLogin")}</p>
              </div>

              <Link
                href="/login"
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t("login")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
