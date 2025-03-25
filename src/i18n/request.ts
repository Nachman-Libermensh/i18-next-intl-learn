import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
const namespaces = ['common', 'home', 'about', 'navigation'] as const;

const loadNamespaceMessages = async (locale: string, namespace: string) => {
console.log("loadNamespaceMessages called with locale: ", locale, "namespace: ", namespace);
  try {
    return (await import(`../../messages/${locale}/${namespace}.json`)).default;
  } catch (error) {
    console.error(`Failed to load namespace "${namespace}" for locale "${locale}"`, error);
    return {};
  }
};
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
console.log("getRequestConfig called with requested: ", requested, "locale: ", locale);
  // Load all namespace messages in parallel
  const namespacesMessages = await Promise.all(
    namespaces.map(async (namespace) => ({
      [namespace]: await loadNamespaceMessages(locale, namespace)
    }))
  );

  // Merge all namespace messages
  const messages = namespacesMessages.reduce((acc, curr) => ({
    ...acc,
    ...curr
  }), {});

  return {
    locale,
    messages,
  };
});