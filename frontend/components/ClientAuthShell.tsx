"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseSession } from "../lib/useSupabaseSession";

const PUBLIC_ROUTES = new Set(["/login"]);

export default function ClientAuthShell({ children }: { children: ReactNode }) {
  const { session, isLoading } = useSupabaseSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || PUBLIC_ROUTES.has(pathname)) {
      return;
    }

    if (!session) {
      const redirect = encodeURIComponent(pathname || "/");
      router.replace(`/login?redirect=${redirect}`);
    }
  }, [isLoading, pathname, router, session]);

  if (PUBLIC_ROUTES.has(pathname)) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="max-w-container-max mx-auto p-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-600">
          Checking sign-in status...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-container-max mx-auto p-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-600">
          Redirecting to login...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
