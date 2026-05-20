"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useSupabaseSession } from "../../lib/useSupabaseSession";

export default function LoginPage() {
  const { session, isLoading } = useSupabaseSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") ?? "/";

  useEffect(() => {
    if (!isLoading && session) {
      router.replace(redirectTarget);
    }
  }, [isLoading, redirectTarget, router, session]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${redirectTarget}` },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Sign in</h1>
        <p className="text-sm text-slate-600 mb-6">
          Use Google to continue to CivicConnect India.
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 rounded-xl font-button text-sm hover:opacity-90 disabled:opacity-60"
        >
          Continue with Google
        </button>
        {isLoading && (
          <p className="text-xs text-slate-500 mt-4">Checking session...</p>
        )}
      </div>
    </main>
  );
}
