import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-full">
          <div className="flex items-center gap-8">
            <span className="text-xl font-black text-slate-900 dark:text-slate-50 font-h2 tracking-tight">CivicConnect India</span>
            <div className="hidden md:flex gap-6 items-center">
              <Link href="/" className="text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-50 pb-1 font-body-sm">Home</Link>
              <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 transition-colors font-body-sm">Explore Map</Link>
              <Link href="/admin" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 transition-colors font-body-sm">Admin</Link>
              <Link href="/report" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 transition-colors font-body-sm">Report</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/report" className="hidden md:flex items-center bg-primary text-on-primary px-lg py-sm rounded font-button hover:opacity-90 active:opacity-80 transition-all">
              Report Issue
            </Link>
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-slate-900 cursor-pointer p-2">notifications</span>
              <span className="material-symbols-outlined text-slate-900 cursor-pointer p-2">account_circle</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20 pb-24 md:pb-8">
        {/* Hero Map Section */}
        <section className="relative w-full h-[716px] min-h-[500px] bg-surface overflow-hidden">
          <div className="absolute inset-0 map-container opacity-50"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center p-md">
            <div className="w-full max-w-container-max bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-outline-variant overflow-hidden flex flex-col md:flex-row h-full">
              {/* Sidebar Controls */}
              <div className="w-full md:w-80 border-r border-outline-variant bg-surface-container-low p-lg flex flex-col gap-lg">
                <div>
                  <h1 className="font-h2 text-h2 text-primary mb-xs">National Registry</h1>
                  <p className="font-body-sm text-on-surface-variant">Real-time infrastructure monitoring across Indian territories.</p>
                </div>
                <div className="space-y-md">
                  <div className="bg-white p-md rounded-lg border border-outline-variant">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block mb-unit">SEARCH REGION</span>
                    <div className="flex items-center gap-sm bg-surface p-sm rounded border border-outline">
                      <span className="material-symbols-outlined text-slate-400">search</span>
                      <input className="bg-transparent border-none p-0 focus:ring-0 text-body-sm w-full outline-none" placeholder="Mumbai, MH" type="text" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">LAYER VISIBILITY</span>
                    <label className="flex items-center justify-between p-sm hover:bg-surface-container rounded cursor-pointer transition-colors">
                      <span className="flex items-center gap-sm font-body-sm">
                        <span className="w-3 h-3 rounded-full bg-error"></span> Pending Issues
                      </span>
                      <input defaultChecked className="rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    </label>
                    <label className="flex items-center justify-between p-sm hover:bg-surface-container rounded cursor-pointer transition-colors">
                      <span className="flex items-center gap-sm font-body-sm">
                        <span className="w-3 h-3 rounded-full bg-secondary"></span> Resolved Issues
                      </span>
                      <input defaultChecked className="rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    </label>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link href="/report" className="w-full bg-primary text-on-primary py-md rounded-lg font-button shadow-md flex items-center justify-center gap-sm hover:opacity-90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined">add_circle</span>
                    Report an Issue
                  </Link>
                </div>
              </div>

              {/* The Map Canvas */}
              <div className="flex-grow relative bg-slate-100 overflow-hidden">
                <img className="w-full h-full object-cover grayscale opacity-40" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyyhPWLimIqhaqeTRs1-VVSzRH_DgRtNF4xuGTPc5sX1rXiRF8kWazvDVrGi6isGq2wIPA9OneyOpYExRFuahG0D9YHItL2zAXTWuSEWkwNx991gBSNlkrgYAMDFEXjBeNA7oLjXu-iPncFbvGLAx4PaFBR1FhUUto8y4tWQ_ePRgXN5VQYDD43G1F3ZqlAb9_iWDR70UcsE-YhW3ydw7US8lgZD6dS4BS6kZ3dHEVD-iWa6sd0FNJB-r9uwDIKbGmqPl0DCOqzhUQ" />
                
                {/* Interactive Markers Mockup */}
                <div className="absolute top-1/4 left-1/3 group cursor-pointer z-20">
                  <div className="animate-bounce">
                    <span className="material-symbols-outlined text-error text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl border border-outline-variant p-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-30">
                    <div className="flex gap-sm mb-sm">
                      <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-surface-variant">water_drop</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-h3 text-body-sm truncate">Water Pipe Burst</p>
                        <span className="text-[10px] bg-error/10 text-error px-1.5 py-0.5 rounded font-bold uppercase">Severity: 10/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-md">
                      <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-error text-sm">schedule</span>
                        <span className="text-body-sm font-medium text-error">Pending</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant">Sector 4, New Delhi</span>
                    </div>
                    <button className="w-full bg-primary text-on-primary py-1.5 rounded text-[12px] font-button hover:opacity-90">View Details</button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 group cursor-pointer z-20">
                  <div className="animate-pulse">
                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl border border-outline-variant p-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-30">
                    <div className="flex gap-sm mb-sm">
                      <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-surface-variant">bolt</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-h3 text-body-sm truncate">Grid Maintenance</p>
                        <span className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-bold uppercase">Severity: 04/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-md">
                      <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                        <span className="text-body-sm font-medium text-secondary">Resolved</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant">Powai, Mumbai</span>
                    </div>
                    <button className="w-full bg-primary text-on-primary py-1.5 rounded text-[12px] font-button hover:opacity-90">View Details</button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-1/4">
                  <span className="material-symbols-outlined text-error text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div className="absolute top-1/3 right-1/3">
                  <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>

                {/* Map Legend / Float Stats */}
                <div className="absolute bottom-md right-md bg-white/90 backdrop-blur-md p-md rounded-lg border border-outline-variant shadow-lg flex flex-col gap-sm min-w-[200px]">
                  <h4 className="font-label-caps text-label-caps text-primary border-b border-outline-variant pb-xs">LIVE MONITORING</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-body-sm text-on-surface-variant">Active Reports</span>
                    <span className="font-h3 text-error">1,284</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body-sm text-on-surface-variant">Uptime Status</span>
                    <span className="font-h3 text-secondary">99.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Bento Grid */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 md:grid-cols-4 gap-md">
          {/* Total Issues */}
          <div className="md:col-span-2 bg-white p-lg rounded-xl border border-outline-variant flex items-center justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">CUMULATIVE TICKETS</span>
              <h2 className="font-h1 text-h1 text-primary">45,892</h2>
              <p className="text-body-sm text-on-surface-variant mt-unit flex items-center gap-unit">
                <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
                12% increase from last month
              </p>
            </div>
            <div className="p-lg bg-surface-container rounded-full">
              <span className="material-symbols-outlined text-primary text-4xl">database</span>
            </div>
          </div>

          {/* Resolved */}
          <div className="bg-white p-lg rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-secondary">RESOLVED</span>
              <span className="material-symbols-outlined text-secondary">check_circle</span>
            </div>
            <div>
              <h3 className="font-h2 text-h2 text-primary">32,105</h3>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-sm">
                <div className="bg-secondary h-1.5 rounded-full w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white p-lg rounded-xl border border-outline-variant flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-error">PENDING</span>
              <span className="material-symbols-outlined text-error">error</span>
            </div>
            <div>
              <h3 className="font-h2 text-h2 text-primary">13,787</h3>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-sm">
                <div className="bg-error h-1.5 rounded-full w-[30%]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Content Section */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="md:col-span-2">
            <h3 className="font-h2 text-h2 mb-lg">Institutional Transparency</h3>
            <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
              <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                <span className="font-button text-primary">Recent Incident Log</span>
                <button className="text-primary font-label-caps hover:underline">VIEW ALL</button>
              </div>
              <div className="divide-y divide-outline-variant">
                {/* Log Item 1 */}
                <div className="p-md flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex gap-md items-center">
                    <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-error">water_drop</span>
                    </div>
                    <div>
                      <p className="font-button text-primary">Water Pipe Burst - Sector 4</p>
                      <p className="text-body-sm text-on-surface-variant">New Delhi, NCR • Reported 2h ago</p>
                    </div>
                  </div>
                  <span className="bg-error-container text-on-tertiary-container px-sm py-unit rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>
                </div>
                {/* Log Item 2 */}
                <div className="p-md flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex gap-md items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">bolt</span>
                    </div>
                    <div>
                      <p className="font-button text-primary">Grid Maintenance - Powai</p>
                      <p className="text-body-sm text-on-surface-variant">Mumbai, MH • Resolved 5h ago</p>
                    </div>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container px-sm py-unit rounded-full text-[10px] font-bold uppercase tracking-wider">Resolved</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary text-on-primary p-lg rounded-xl flex flex-col gap-lg shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <span className="material-symbols-outlined text-[160px]">gavel</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-h3 text-h3 mb-sm">Portal Integrity</h3>
              <p className="text-body-md opacity-80 mb-lg">Our reporting system is encrypted and monitored by the National Utility Bureau to ensure every voice leads to action.</p>
              <ul className="space-y-md">
                <li className="flex items-center gap-sm text-body-sm">
                  <span className="material-symbols-outlined text-secondary-fixed">verified_user</span>
                  Blockchain Verified Reports
                </li>
                <li className="flex items-center gap-sm text-body-sm">
                  <span className="material-symbols-outlined text-secondary-fixed">update</span>
                  24/7 Departmental Oversight
                </li>
                <li className="flex items-center gap-sm text-body-sm">
                  <span className="material-symbols-outlined text-secondary-fixed">public</span>
                  Public Resolution Accountability
                </li>
              </ul>
            </div>
            <Link href="/admin" className="mt-auto bg-white text-primary py-md rounded font-button hover:bg-surface-container transition-colors active:scale-95 text-center">
              Agency Access
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 w-full border-t border-slate-200 dark:border-slate-800 py-8 px-4 mt-auto">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="font-bold text-slate-900 dark:text-slate-50 font-h3 tracking-tight">CivicConnect India</span>
            <p className="text-xs font-public-sans text-slate-600 dark:text-slate-400">© 2024 National Utility Reporting Portal. Institutional Reliability & Security.</p>
          </div>
          <div className="flex gap-6">
            <Link className="no-underline text-xs font-public-sans text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors duration-200" href="#">Privacy Policy</Link>
            <Link className="no-underline text-xs font-public-sans text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors duration-200" href="#">Terms of Service</Link>
            <Link className="no-underline text-xs font-public-sans text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors duration-200" href="#">API Docs</Link>
            <Link className="no-underline text-xs font-public-sans text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors duration-200" href="#">Contact Support</Link>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe md:hidden bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(15,23,42,0.05)]">
        <Link href="/" className="flex flex-col items-center justify-center text-slate-900 dark:text-white scale-110 tap-highlight-transparent active:scale-95 transition-transform">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Explore</span>
        </Link>
        <Link href="/report" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 tap-highlight-transparent active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Report</span>
        </Link>
        <Link href="/admin" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 tap-highlight-transparent active:scale-95 transition-transform">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Admin</span>
        </Link>
      </div>
    </>
  );
}
