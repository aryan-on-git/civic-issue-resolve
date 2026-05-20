"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { useSupabaseSession } from "../../lib/useSupabaseSession";

export default function ReportIssue() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { session, isLoading: authLoading } = useSupabaseSession();
  const user = session?.user;

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/report` },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage("Please sign in with Google to submit a report.");
      return;
    }
    if (!image) {
      setMessage("Please select an image first.");
      return;
    }

    setLoading(true);
    setMessage("Getting location...");

    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMessage("Submitting report...");

        const formData = new FormData();
        formData.append("image", image);
        formData.append("latitude", latitude.toString());
        formData.append("longitude", longitude.toString());
        formData.append("description", description);
        formData.append("reporter_id", user.id);
        if (user.email) {
          formData.append("reporter_email", user.email);
        }
        const reporterName =
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : "";
        if (reporterName) {
          formData.append("reporter_name", reporterName);
        }

        try {
          const response = await fetch("http://localhost:8000/api/submit", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            setMessage("Report submitted successfully!");
            setImage(null);
            setImagePreview(null);
            setDescription("");
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          } else {
            const errData = await response.json();
            setMessage(`Error: ${errData.detail || "Failed to submit"}`);
          }
        } catch (error) {
          setMessage("Network error occurred.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setMessage(`Location error: ${error.message}`);
        setLoading(false);
      }
    );
  };

  return (
    <>
      {/* TopNavBar */}
      <header className="bg-slate-50/95 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm border-b border-slate-200">
        <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-full">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Go back" className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-900">arrow_back</span>
            </Link>
            <h1 className="text-xl font-black text-slate-900 font-h1 tracking-tight">Report Issue</h1>
          </div>
          <div className="flex items-center gap-3">
            {authLoading ? (
              <span className="text-xs text-slate-400">Checking sign-in...</span>
            ) : user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 hidden md:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs font-semibold text-slate-900 border border-slate-200 px-3 py-1 rounded-full hover:bg-slate-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full hover:opacity-90"
              >
                Sign in with Google
              </button>
            )}
            <span className="material-symbols-outlined text-slate-500">notifications</span>
            <span className="material-symbols-outlined text-slate-900">account_circle</span>
          </div>
        </div>
      </header>

      <main className="mt-16 flex-grow flex flex-col max-w-container-max mx-auto w-full p-4 md:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-lg">
          {/* Step Indicators */}
          <div className="grid grid-cols-3 gap-sm mb-lg">
            <div className="h-1 bg-primary rounded-full"></div>
            <div className="h-1 bg-primary rounded-full"></div>
            <div className="h-1 bg-surface-container-high rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Image Capture Section */}
            <section className="space-y-sm">
              <label className="font-label-caps text-on-surface-variant">VISUAL EVIDENCE</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer border-2 border-dashed border-outline-variant bg-white rounded-xl overflow-hidden aspect-video flex flex-col items-center justify-center gap-sm transition-all hover:border-primary hover:bg-surface-container-low"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANg7hXaScyrKMcUG7htuwpRjw7BUKwvmR-sCQsd0GApMMbzsky8nId2YFh_f99MYqzfsbGp_kVbiG6nx6HmJETM4IKNYS2wsTfUh7KclmU1uzUfthOeztYJbwndXn6pogZpP34_oh-G325jDOrJw52N51lCLbY_-VyJDfFNMUx9Ciy0DMUpuqvK-lqkQgnWsqq8gnH2fhOnqlr4AX9O4eP_CmJjJdPJQPxZLyf-sqUYnIMK2DZqvqiuCiabUSC3szaKWnEuT02WPYT" />
                    <div className="z-10 flex flex-col items-center">
                      <div className="w-16 h-16 bg-primary-container text-white rounded-full flex items-center justify-center mb-md shadow-lg group-active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
                      </div>
                      <span className="font-button text-primary">Capture or Upload Image</span>
                      <p className="text-body-sm text-on-surface-variant">PNG, JPG up to 10MB</p>
                    </div>
                  </>
                )}
                <input 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
            </section>

            {/* GPS/Location Section */}
            <section className="bg-white p-md rounded-xl border border-outline-variant flex items-center gap-md">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
              </div>
              <div className="flex-grow">
                <p className="font-label-caps text-on-surface-variant">CURRENT LOCATION</p>
                <div className="flex items-center gap-sm">
                  <p className="font-body-md font-semibold text-primary">Auto-detected on Submit</p>
                  <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">Device GPS Location</p>
              </div>
              <button type="button" className="text-primary hover:bg-slate-50 p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </section>

            {/* Description Section */}
            <section className="space-y-sm">
              <label className="font-label-caps text-on-surface-variant" htmlFor="issue-description">ISSUE DESCRIPTION</label>
              <div className="relative">
                <textarea 
                  className="w-full bg-white border border-outline-variant rounded-xl p-md font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none placeholder:text-slate-400" 
                  id="issue-description" 
                  placeholder="Describe the utility issue or hazard you've encountered..." 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                ></textarea>
              </div>
              <p className="text-body-sm text-on-surface-variant text-right">{description.length} / 500 characters</p>
            </section>

            {/* Submit Action */}
            <section className="pt-lg">
              <button 
                type="submit"
                disabled={loading || !image || !user}
                className={`w-full h-[56px] rounded-xl font-button flex items-center justify-center gap-md shadow-lg active:scale-[0.98] transition-all
                  ${loading || !image || !user ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-primary hover:bg-slate-800 text-white'}`}
              >
                {loading ? (
                  <>
                    <span>Processing...</span>
                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                  </>
                ) : (
                  <>
                    <span>Submit Official Report</span>
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>
              
              {message && (
                <p className={`text-center text-sm font-medium p-3 mt-4 rounded-lg ${message.toLowerCase().includes("error") ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  {message}
                </p>
              )}

              {!authLoading && !user && (
                <p className="text-center text-body-sm text-on-surface-variant mt-md">
                  Sign in with Google to submit a report.
                </p>
              )}

              <p className="text-center text-body-sm text-on-surface-variant mt-md">
                By submitting, you agree to our Terms of Service for institutional reporting.
              </p>
            </section>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-xl">
        <div className="w-full py-8 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-container-max mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold text-slate-900 font-h3 text-lg mb-1">CivicConnect India</span>
            <p className="text-xs text-slate-600 font-public-sans text-center md:text-left">© 2024 National Utility Reporting Portal. Institutional Reliability & Security.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-md">
            <Link className="text-xs font-public-sans text-slate-600 hover:text-slate-900 transition-colors" href="#">Privacy Policy</Link>
            <Link className="text-xs font-public-sans text-slate-600 hover:text-slate-900 transition-colors" href="#">Terms of Service</Link>
            <Link className="text-xs font-public-sans text-slate-600 hover:text-slate-900 transition-colors" href="#">API Docs</Link>
            <Link className="text-xs font-public-sans text-slate-600 hover:text-slate-900 transition-colors" href="#">Contact Support</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
