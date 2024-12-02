'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from './icons';
import { BetterTooltip } from './ui/tooltip';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is only rendered on the client
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
<BetterTooltip
  content={theme === 'dark' ? 'Turn on light mode' : 'Turn on dark mode'}
  align="start"
>
  <button
    onClick={toggleTheme}
    className="p-2 bg-gray-200/75 dark:bg-gray-700/75 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
  >
    {theme === 'dark' ? (
      <SunIcon className="w-5 h-5 text-yellow-500" />
    ) : (
      <MoonIcon className="w-5 h-5 text-gray-800" />
    )}
  </button>
</BetterTooltip>
  );
}
