'use client';

import { useWindowSize } from 'usehooks-ts';

import { SidebarToggle } from '@/components/sidebar-toggle';
import { ThemeSwitcher } from '@/components/themeswitcher';
import { BetterTooltip } from '@/components/ui/tooltip';
import { useSidebar } from './ui/sidebar';

export function ChatHeader() {
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      {(!open || windowWidth < 768) && (
        <BetterTooltip content="Toggle Theme">
            <ThemeSwitcher />
        </BetterTooltip>
      )}
    </header>
  );
}
