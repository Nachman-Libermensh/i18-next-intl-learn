# Next.js Project with Multi-language Support

This project demonstrates the implementation of internationalization (i18n) in a Next.js application using next-intl.

## Key Features

- Support for multiple languages
- Right-to-left (RTL) and left-to-right (LTR) text direction support
- Dynamic language switching
- Type-safe translations

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/public            # Static files
/messages          # Translation files
/src
  /app
    /api
    /[locale]      # Dynamic routing by language
      layout.tsx   # Main layout
      page.tsx     # Home page
  /components      # React components
  /lib             # Helper functions
  /i18n            # Language configuration
    navigation.ts  # Routing functions
    request.ts     # Translation files source configuration
    routing.ts     # Main routing configuration, languages/defaults
```

## Available Languages

- Hebrew (he)
- English (en)

To add a new language, modify the settings in `routing.ts`.

## Adding a New Language

1. Create a new translation file in the `/messages` directory
2. Add the language code to the settings in `/src/i18n/routing.ts`
3. Make sure to include all necessary translation keys

## Implementation Guide for Existing Projects

To add multi-language support to your Next.js project, follow these steps:

1. Copy the `i18n` folder to your `src` directory or next to your `app` directory (if you're not using `src`).

2. Create a middleware file (`middleware.ts`) and copy the middleware code from this project.

3. Add a `messages` directory in your project's root folder.

4. Move all your pages and routes under a new `[locale]` directory inside the `app` directory, including the main layout.

5. Add the provider code from this project's layout file to your main layout.

6. **Important**: Add the following code to your `next.config.js` file:

```javascript
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

7. By default, this configuration doesn't display a language prefix in URLs. You can change the `prefix` setting in `routing.ts` to display the language code in URLs. This setting affects only the user experience, not the actual routing functionality.

8. Note that skipping the language prefix can cause SEO issues. If SEO is important for your project, consider adding the following code to your main layout file:

```javascript
import {routing} from '@/i18n/routing';
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
```

This will generate static paths for all languages, improving SEO. If you have issues with the main route, you can implement this in specific pages or layouts that are most important for SEO. Implementing it in the main layout will apply it to the entire application, which is preferable but might not be possible in all cases.

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization library


## Useful Links

- [Detailed Guide](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [Next.js i18n Documentation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-intl Documentation](https://next-intl.dev/)

## License

MIT

---

# פרויקט Next.js עם תמיכה בריבוי שפות

פרויקט זה מדגים יישום של מערכת רב-לשונית (i18n) באפליקציית Next.js באמצעות next-intl.

## תכונות עיקריות

- תמיכה במספר שפות
- תמיכה בכיווניות טקסט (RTL/LTR)
- החלפת שפה דינמית
- תרגומים מוגנים מבחינת טיפוסים (Type-safe)

## התחלה מהירה

1. התקנת חבילות:

```bash
npm install
```

2. הפעלת שרת הפיתוח:

```bash
npm run dev
```

פתח את [http://localhost:3000](http://localhost:3000) בדפדפן כדי לראות את התוצאה.

## מבנה הפרויקט

```
/public            # קבצים סטטיים
/messages          # קבצי תרגום
/src
  /app
    /api
    /[locale]      # ניתוב דינמי לפי שפה
      layout.tsx   # לייאוט ראשי
      page.tsx     # דף הבית
  /components      # רכיבי React
  /lib             # פונקציות עזר
  /i18n            # הגדרות השפות
    navigation.ts  # פונקציות ניתוב
    request.ts     # מגדיר מהיכן למשוך את קבצי התרגום
    routing.ts     # הגדרות ראשיות למערכת הניתוב, שפות / ברירת מחדל
```

## שפות זמינות

- עברית (he)
- אנגלית (en)

להוספת שפה חדשה, יש להוסיף בקובץ `routing.ts`.

## הוספת שפה חדשה

1. צור קובץ תרגום חדש בתיקיית `/messages`
2. הוסף את קוד השפה להגדרות בקובץ `/src/i18n/routing.ts`
3. ודא שכללת את כל מפתחות התרגום הנדרשים

## הוראות ליישום מערכת רב-לשונית בפרויקט קיים

כדי להוסיף תמיכה רב-לשונית לפרויקט Next.js קיים, בצעו את השלבים הבאים:

1. העתיקו את תיקיית `i18n` לתיקיית `src` או במקביל לתיקיית `app` (אם אינכם משתמשים ב-`src`).

2. צרו קובץ middleware (`middleware.ts`) והעתיקו את הקוד שקיים במידלוור של הפרויקט הזה.

3. הוסיפו תיקיית `messages` בתיקיית השורש של הפרויקט.

4. העבירו את כל הדפים והניתובים תחת תיקיית `[locale]` חדשה בתוך תיקיית `app`, כולל הלייאוט הראשי.

5. הוסיפו את קוד הפרובידר שנמצא בקובץ הלייאוט של הפרויקט הזה ללייאוט הראשי שלכם.

6. **חשוב מאוד**: הוסיפו את הקוד הבא לקובץ `next.config.js`:

```javascript
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

7. בהגדרת ברירת המחדל, לא מוצגת תחילית עבור השפה בכתובת URL. אפשר לשנות את הגדרת `prefix` בקובץ `routing.ts` כדי להציג את קוד השפה בכתובות. שינוי זה משפיע רק על חווית המשתמש, ולא על פונקציונליות הניתוב עצמה.

8. חשוב לדעת שדילוג על תחילית השפה עלול לגרום לבעיות SEO. אם SEO חשוב לפרויקט שלכם, כדאי להוסיף את הקוד הבא בקובץ הלייאוט הראשי:

```javascript
import {routing} from '@/i18n/routing';
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
```

קוד זה יגרום ליצירת נתיבים סטטיים עבור כל השפות, מה שישפר את ה-SEO. אם יש בעיות ביישום זה בנתיב הראשי, אפשר ליישם אותו בדפים או בלייאוטים ספציפיים שחשובים יותר מבחינת SEO. יישום בלייאוט הראשי יחיל את ההגדרה על כל האפליקציה, מה שעדיף אך ייתכן שלא יתאפשר בכל המקרים.

## טכנולוגיות בשימוש

- [Next.js](https://nextjs.org) - פריימוורק React
- [next-intl](https://next-intl-docs.vercel.app/) - ספריית בינלאומיות

## קישורים שימושיים

- [מדריך מפורט](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [תיעוד Next.js i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [תיעוד next-intl](https://next-intl.dev/)

## רישיון

MIT
