'use client';

import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { ModeSwitcher } from './modeswitcher';
import { BetterTooltip } from './ui/tooltip';
import { useSidebar } from './ui/sidebar';

export function AnalyticsHeader({
  mode,
  setMode,
}: {
  mode: 'manual' | 'fetch';
  setMode: (mode: 'manual' | 'fetch') => void;
}) {
  return (
    <header className="flex bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <BetterTooltip content="Toggle Mode">
        <ModeSwitcher mode={mode} setMode={setMode} />
      </BetterTooltip>
    </header>
  );
}