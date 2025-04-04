"use client"; // ✅ Must be the first line

import { ThemeProvider } from "../components/theme-context";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider>
      <div>
         (
          <div className="absolute top-4 left-4">
            <img src="/icon.jpg" alt="Corner ID Logo" width={40} />
          </div>
        )
        {children}
      </div>
    </ThemeProvider>
  );
}
