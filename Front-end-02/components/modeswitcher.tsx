'use client';

import { useState } from 'react';
import { BetterTooltip } from './ui/tooltip';

export function ModeSwitcher({
  mode,
  setMode,
}: {
  mode: 'manual' | 'fetch';
  setMode: (mode: 'manual' | 'fetch') => void;
}) {
  const toggleMode = () => {
    setMode(mode === 'manual' ? 'fetch' : 'manual');
  };

  return (
    <BetterTooltip
      content={mode === 'manual' ? 'Switch to Automatic Testing' : 'Switch to Manual Testing'}
      align="start"
    >
      <button
        onClick={toggleMode}
        className="p-2 bg-gray-200/75 dark:bg-gray-700/75 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {mode === 'manual' ? (
          <span className="text-foreground font-bold">Manual</span>
        ) : (
          <span className="text-foreground font-bold">Automatic</span>
        )}
      </button>
    </BetterTooltip>
  );
}