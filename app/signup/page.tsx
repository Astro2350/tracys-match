"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password: pw,
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email to confirm your account.");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Create an account</h1>

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
        onClick={handleSignup}
        className="px-6 py-2 bg-black text-white rounded"
      >
        Sign Up
      </button>

      {message && <p className="text-sm mt-4">{message}</p>}
    </main>
  );
}
