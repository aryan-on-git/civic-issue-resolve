"use client";

import { useEffect, useMemo, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const FALLBACK_IMAGE = "https://placehold.co/800x500?text=Issue+Image";

type Issue = {
  id: string;
  image_url?: string | null;
  latitude: number;
  longitude: number;
  category?: string | null;
  severity?: number | null;
  status?: string | null;
  description?: string | null;
  created_at?: string | null;
  reporter_email?: string | null;
  reporter_name?: string | null;
};

export default function AdminIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;

    const fetchIssues = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE}/api/issues`);
        if (!res.ok) {
          throw new Error(`Failed to fetch issues: ${res.status}`);
        }
        const data = (await res.json()) as Issue[];
        const sorted = data
          .slice()
          .sort((a, b) =>
            new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
          );

        if (isMounted) {
          setIssues(sorted);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch issues");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleIssues = useMemo(
    () => issues.filter((issue) => issue.status !== "resolved"),
    [issues]
  );

  const handleResolve = async (issueId: string) => {
    setResolvingIds((prev) => {
      const next = new Set(prev);
      next.add(issueId);
      return next;
    });

    try {
      const res = await fetch(`${API_BASE}/api/issues/${issueId}`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error(`Failed to resolve issue: ${res.status}`);
      }
      const payload = (await res.json()) as { data?: Issue };
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId
            ? { ...issue, status: payload?.data?.status ?? "resolved" }
            : issue
        )
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve issue");
    } finally {
      setResolvingIds((prev) => {
        const next = new Set(prev);
        next.delete(issueId);
        return next;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="h-48 bg-slate-100 animate-pulse" />
              <div className="p-5">
                <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse mb-3" />
                <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-full bg-slate-100 rounded animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-container-max mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto">
      {visibleIssues.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
          No pending issues yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleIssues.map((issue) => {
            const imageUrl = issue.image_url || FALLBACK_IMAGE;
            const category = issue.category || "Uncategorized";
            const severity = issue.severity ?? 0;
            const latitude = Number.isFinite(issue.latitude) ? issue.latitude.toFixed(5) : "-";
            const longitude = Number.isFinite(issue.longitude) ? issue.longitude.toFixed(5) : "-";

            const isResolving = resolvingIds.has(issue.id);

            return (
              <div
                key={issue.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 group">
                  <img className="w-full h-full object-cover" alt="Issue" src={imageUrl} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full font-label-caps text-[10px] uppercase tracking-widest border border-red-500/20">
                      {issue.status ?? "pending"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm border border-slate-200 text-center">
                    <p className="text-[10px] font-bold text-slate-500 leading-none">SEVERITY</p>
                    <p className="text-lg font-black text-error leading-tight">
                      {String(severity).padStart(2, "0")}
                    </p>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-h3 text-lg text-slate-900 leading-tight">
                        {category}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500 mt-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        <span className="text-xs font-medium">
                          {latitude}, {longitude}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-6">
                    {issue.description || "No description provided."}
                  </p>
                  {issue.reporter_email && (
                    <p className="text-xs text-slate-500 mb-4">
                      Reported by {issue.reporter_name || issue.reporter_email}
                    </p>
                  )}
                  <button
                    className="mt-auto w-full py-3 bg-primary text-white rounded-xl font-button text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    type="button"
                    onClick={() => handleResolve(issue.id)}
                    disabled={isResolving}
                    aria-disabled={isResolving}
                    title={isResolving ? "Resolving issue..." : "Mark issue as resolved"}
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {isResolving ? "Resolving..." : "Mark as Resolved"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
