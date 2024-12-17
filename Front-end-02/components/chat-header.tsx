'use client';

import { useWindowSize } from 'usehooks-ts';

import Link from 'next/link';
import { Button } from './ui/button';
import { SidebarToggle } from './sidebar-toggle';
import { ThemeSwitcher } from './themeswitcher';
import { BetterTooltip } from './ui/tooltip';
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
            <Button
        className=" hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        asChild
      >
        <Link href='/signin'>
        
          Sign in
        </Link>
      </Button>
    </header>
  );
}
