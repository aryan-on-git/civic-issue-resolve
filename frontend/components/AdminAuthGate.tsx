"use client";

import type { ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { useSupabaseSession } from "../lib/useSupabaseSession";

const ADMIN_EMAILS = new Set([
  "chitraksh2705@gmail.com",
  "deeptanshunayak07@gmail.com",
]);

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  const { session, isLoading } = useSupabaseSession();
  const userEmail = session?.user?.email?.toLowerCase() ?? "";
  const isAdmin = userEmail !== "" && ADMIN_EMAILS.has(userEmail);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="max-w-container-max mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-600">
          Checking sign-in status...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-container-max mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-h3 text-lg text-slate-900 mb-2">Admin Access</h2>
          <p className="text-sm text-slate-600 mb-4">
            Sign in with Google to access the admin dashboard.
          </p>
          <button
            type="button"
            onClick={handleSignIn}
            className="bg-primary text-white px-4 py-2 rounded-lg font-button text-sm hover:opacity-90"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-container-max mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-h3 text-lg text-slate-900 mb-2">Access denied</h2>
          <p className="text-sm text-slate-600 mb-4">
            {userEmail} does not have admin permissions.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg font-button text-sm hover:opacity-90"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white border border-slate-200 rounded-xl p-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">Signed in as</p>
          <p className="text-sm font-semibold text-slate-900">{userEmail}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-button text-sm hover:opacity-90"
        >
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
