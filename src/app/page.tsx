"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="container mx-auto px-4">
      <div className="min-h-screen flex flex-col items-center justify-center">
        {session ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              ברוך הבא {session.user?.name}
            </h1>
            <div className="space-y-2">
              <p className="text-gray-600">אימייל: {session.user?.email}</p>
              {session.user?.employer && (
                <p className="text-green-600 font-medium">סטטוס: מעסיק</p>
              )}
              {session.user?.employee && (
                <p className="text-blue-600 font-medium">סטטוס: עובד</p>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="mt-6 w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              התנתק
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">ברוך הבא לאתר</h1>
            <p className="text-gray-600">אנא התחבר כדי להמשיך</p>
            <Link
              href="/login"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              התחברות
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
