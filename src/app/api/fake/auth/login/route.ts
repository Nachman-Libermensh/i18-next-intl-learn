import { NextResponse } from "next/server";

export async function POST() {
  // תמיד מחזיר משתמש "פייק" לצורך פיתוח
  return NextResponse.json({
    id: "123",
    name: "משתמש לדוגמה",
    email: "bn8475266@gmail.com",
    token: "fake-token-123",
    employer: true,
    employee: false,
  });
}
