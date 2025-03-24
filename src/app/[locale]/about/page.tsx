import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("About");
  return {
    title: t("pageTitle"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {t("title")}
          </h1>
          <div className="prose prose-lg">
            <p className="text-gray-600">{t("description")}</p>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("features.title")}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t("features.item1")}</li>
                <li>{t("features.item2")}</li>
                <li>{t("features.item3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
