"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pw,
    });

    if (error) setMessage(error.message);
    else window.location.href = "/choose-role";
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Log in</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-80"
        placeholder="Email"
      />

      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="border p-2 rounded w-80"
        placeholder="Password"
      />

      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-black text-white rounded"
      >
        Log In
      </button>

      {message && <p className="text-sm mt-4">{message}</p>}
    </main>
  );
}
