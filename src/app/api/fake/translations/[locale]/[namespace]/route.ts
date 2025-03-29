import { NextResponse } from 'next/server';

type Locale = 'he' | 'en';
type Namespace = 'home' | 'about';
type TranslationValue = string | { [key: string]: string | TranslationValue };

const mockTranslations: Record<Locale, Record<Namespace, TranslationValue>> = {
  he: {
    home: {
      title: "דף הבית",
      welcome: "ברוך הבא {name}",
      status: {
        employee: "עובד",
        employer: "מעסיק"
      }
    },
    about: {
      title: "אודות",
      description: "תיאור מהדאטאבייס"
    }
  },
  en: {
    home: {
      title: "Home",
      welcome: "Welcome {name}",
      status: {
        employee: "Employee",
        employer: "Employer"
      }
    },
    about: {
      title: "About",
      description: "Description from DB"
    }
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchTranslations(locale: string, namespace: string) {
  await delay(500); // Simulate network delay
  return mockTranslations[locale as Locale]?.[namespace as Namespace] ?? {};
}

// export const runtime = 'edge';
// export const revalidate = 3600; // Cache for 1 hour

export async function GET(
  request: Request,
  { params }: { params: { locale: string; namespace: string } }
) {
  try {
    const translations = await fetchTranslations(params.locale, params.namespace);
    
    return NextResponse.json({
      translations,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch translations', error },
      { status: 500 }
    );
  }
}