import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const missingEnv = [
  !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
  !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
].filter(Boolean);

if (missingEnv.length) {
  throw new Error(
    `Missing Supabase environment variables: ${missingEnv.join(", ")}.\n` +
      "Copy .env.example to .env.local and paste in your project URL and anon key from Supabase."
  );
}

const resolvedSupabaseUrl = supabaseUrl!;
const resolvedSupabaseAnonKey = supabaseAnonKey!;

export const supabase = createClient(resolvedSupabaseUrl, resolvedSupabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
