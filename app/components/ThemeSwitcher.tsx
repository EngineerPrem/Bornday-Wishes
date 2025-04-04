"use client";

import { useTheme } from "./ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = ["light", "dark", "red", "green", "orange"];

  return (
    <div className="p-4">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="p-2 border rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;