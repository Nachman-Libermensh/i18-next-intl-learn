import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: [
    /*
     * התאם את כל נתיבי הבקשות למעט אלה המתחילים ב:
     * - api (נתיבי API)
     * - _next/static (קבצים סטטיים)
     * - _next/image (קבצי אופטימיזציית תמונה)
     * - favicon.ico, sitemap.xml, robots.txt (קבצי מטא-דאטה)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
