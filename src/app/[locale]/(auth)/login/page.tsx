"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleFakeLogin = async () => {
    const res = await signIn("credentials", {
      username: "fake@example.com",
      password: "fake123",
      redirect: false,
    });

    if (!res?.error) {
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleFakeLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        התחבר כמשתמש לדוגמה
      </button>
    </div>
  );
};

export default LoginPage;
