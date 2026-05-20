import Link from "next/link";
import AdminIssues from "../../components/AdminIssues";
import AdminAuthGate from "../../components/AdminAuthGate";

export default function AdminDashboard() {
  return (
    <div className="font-body-md text-on-background antialiased overflow-x-hidden min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-slate-50 font-public-sans tracking-tight fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-4 md:px-8 py-3 max-w-full">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black text-slate-900 dark:text-slate-50">CivicConnect India</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Explore</Link>
          <Link href="/report" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Report</Link>
          <Link href="/admin" className="text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-50 pb-1 font-bold">Admin</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/report" className="bg-primary text-white px-4 py-2 rounded-xl text-button font-button active:opacity-80 transition-all duration-200">
            Report Issue
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-600 cursor-pointer p-2 hover:bg-slate-100 rounded-full">notifications</span>
            <span className="material-symbols-outlined text-slate-600 cursor-pointer p-2 hover:bg-slate-100 rounded-full">account_circle</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-[64px]">
        {/* Side Navigation Bar */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4 gap-2 sticky top-[64px]">
          <div className="flex items-center gap-3 px-2 py-4 mb-2">
            <img className="w-10 h-10 rounded-full border border-slate-200" alt="Admin Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfmgpZBTDZihwMJ3uEksP3U_WDB4kpnhfw5Xvk5FdXIS1bFte0qvPgYFE9wiu0ESqYLEWMUHbvobM-T0rF5Vi6U7TMPVk7eEIrGh-x0RssYgqR-TXLejPzhrF_AUw4UqQcyYwYv0gAnJ9y44fgreX5zDQwaXPiz5D1GO576gzXAR0YMH5ycvqRxJa-X99rhsuY2KS3aEiE3o2GXc2Q8QrmL-dhpkP7WSzApredQAZXFJMtivzDCIjUvS6Vxj6meENwUDGAOlR07rFz" />
            <div>
              <h4 className="font-h3 text-sm font-bold text-slate-900">Civic Portal</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Official Management</p>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-md">
              <span className="material-symbols-outlined">map</span>
              <span className="font-body-sm font-medium">Overview Map</span>
            </Link>
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-md">
              <span className="material-symbols-outlined">assignment_late</span>
              <span className="font-body-sm font-medium">Issue Tracker</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-md">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-body-sm font-medium">Admin Panel</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-md">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-body-sm font-medium">User Settings</span>
            </Link>
          </nav>
          <button className="mt-4 w-full py-3 bg-error text-white font-button text-sm rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">emergency_home</span>
            Emergency Dispatch
          </button>
          <div className="mt-auto pt-4 border-t border-slate-100">
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-md">
              <span className="material-symbols-outlined">help</span>
              <span className="font-body-sm font-medium">Help Center</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          {/* Header & Filters Section */}
          <div className="max-w-container-max mx-auto mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-h1 text-h1 text-on-surface mb-2">Pending Issues</h1>
                <p className="text-body-md text-slate-600 max-w-2xl">High-priority infrastructure and utility reports requiring immediate institutional response and resolution from local departments.</p>
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-semibold transition-all">Pending</button>
                <button className="px-6 py-2 text-slate-500 hover:text-slate-800 rounded-full text-sm font-semibold transition-all">Resolved</button>
              </div>
            </div>
          </div>

          {/* Issues Bento Grid */}
          <AdminAuthGate>
            <AdminIssues />
          </AdminAuthGate>
        </main>
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe md:hidden bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(15,23,42,0.05)] rounded-t-xl">
        <Link href="/" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform active:scale-95">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Explore</span>
        </Link>
        <Link href="/report" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Report</span>
        </Link>
        <Link href="/admin" className="flex flex-col items-center justify-center text-slate-900 dark:text-white scale-110 transition-transform active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Admin</span>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="w-full py-8 px-4 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 z-10 relative">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-slate-900 dark:text-slate-50">CivicConnect India</span>
          <p className="text-xs font-public-sans text-slate-600 dark:text-slate-400">© 2024 National Utility Reporting Portal. Institutional Reliability & Security.</p>
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-xs font-public-sans text-slate-600 dark:text-slate-400 no-underline hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200">Privacy Policy</Link>
          <Link href="#" className="text-xs font-public-sans text-slate-600 dark:text-slate-400 no-underline hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200">Terms of Service</Link>
          <Link href="#" className="text-xs font-public-sans text-slate-600 dark:text-slate-400 no-underline hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200">API Docs</Link>
          <Link href="#" className="text-xs font-public-sans text-slate-600 dark:text-slate-400 no-underline hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200">Contact Support</Link>
        </div>
      </footer>
    </div>
  );
}
