const mockTranslations = {
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

// Simulate DB delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchTranslations(locale: string, namespace: string) {
  await delay(500); // Simulate network delay
  return mockTranslations[locale]?.[namespace] ?? {};
}
import { NextResponse } from 'next/server';

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
      { error: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}