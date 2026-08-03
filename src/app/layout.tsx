import type { Metadata } from "next";
import "./globals.css";
import { getCurrentUser } from "@/services/user/user.actions";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "GearUp",
  description: "Rent Sports & Outdoor Gear Instantly",
};

const themeInitializerScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })()
`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body className="antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
};