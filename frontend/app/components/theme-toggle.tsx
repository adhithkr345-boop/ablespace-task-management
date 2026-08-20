'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg border border-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:text-white"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}