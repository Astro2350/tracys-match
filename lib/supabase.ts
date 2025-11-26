import { createClient } from "@supabase/supabase-js";

function getEnv(name: string) {
  const raw = process.env[name];
  const value = raw?.trim();

  if (!value || value === "undefined" || value === "null") {
    throw new Error(
      `Missing Supabase environment variable: ${name}.\n` +
        "Copy .env.example to .env.local and paste in your project URL and anon key from Supabase."
    );
  }

  return value;
}

function assertUrl(value: string, name: string) {
  try {
    const parsed = new URL(value);
    if (!/^https?:$/.test(parsed.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error(
      `Invalid Supabase URL in ${name}. Confirm it matches the Project URL from your Supabase settings.`
    );
  }

  return value;
}

const resolvedSupabaseUrl = assertUrl(getEnv("NEXT_PUBLIC_SUPABASE_URL"), "NEXT_PUBLIC_SUPABASE_URL");
const resolvedSupabaseAnonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(resolvedSupabaseUrl, resolvedSupabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
