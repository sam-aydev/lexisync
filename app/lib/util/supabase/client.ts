import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // createBrowserClient automatically uses a singleton pattern under the hood 
  // so it only creates one instance of the client per browser session, 
  // preventing memory leaks during React re-renders.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}