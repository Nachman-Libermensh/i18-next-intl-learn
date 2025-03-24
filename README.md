# פרויקט Next.js עם תמיכה בריבוי שxxx

פרויקט זה מדגים יישום של מערכת רב-לשונית (i18n) באפליקציית Next.js באמצעות next-intl.

## תכונות עיקריות

- תמיכה במספר שxxx
- תמיכה בכיווניות טקסט (RTL/LTR)
- החלפת שפה דינמית
- תרגומים מוגנים מבחינת טיפוסים (Type-safe)

## התחלה מהירה

1. התקנת חבילות:

```bash
npm install
# או
yarn install
# או
pnpm install
```

2. הפעלת שרת הפיתוח:

```bash
npm run dev
# או
yarn dev
# או
pnpm dev
```

פתח את [http://localhost:3000](http://localhost:3000) בדפדפן כדי לראות את התוצאה.

## מבנה הפרויקט

```
/app
  /[locale]          # ניתוב דינמי לפי שפה
    /components      # קומפוננטות ייעודיות לשפה
    /lib            # פונקציות עזר
    layout.tsx      # תבנית ראשית
    page.tsx        # דף הבית
  /i18n            # הגדרות השפות
    locales        # קבצי תרגום
    settings.ts    # הגדרות בסיסיות
/public            # קבצים סטטיים
/styles           # קבצי עיצוב
```

## שפות זמינות

- עברית (he)
- אנגלית (en)

## הוספת שפה חדשה

1. צור קובץ תרגום חדש ב-`/massages`
2. הוסף את קוד השפה להגדרות ב-`/app/i18n/routing.ts`

## טכנולוגיות בשימוש

- [Next.js](https://nextjs.org)
- [next-intl](https://next-intl-docs.vercel.app/)
- [React](https://reactjs.org)

## קישורים שימושיים

- [תיעוד Next.js i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [תיעוד next-intl](https://next-intl.dev/)

## רישיון

MIT
