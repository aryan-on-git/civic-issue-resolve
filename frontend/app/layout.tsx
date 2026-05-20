import type { Metadata } from "next";
import "./globals.css";
import ClientAuthShell from "../components/ClientAuthShell";

export const metadata: Metadata = {
  title: "CivicConnect India",
  description: "Institutional Reliability & Civic Duty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body-md text-on-background min-h-screen flex flex-col antialiased">
        <ClientAuthShell>{children}</ClientAuthShell>
      </body>
    </html>
  );
}
