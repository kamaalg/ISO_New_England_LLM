'use client';

import { useTheme } from 'next-themes'; // Import useTheme for dynamic theme handling
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from './ui/sidebar';
import { BetterTooltip } from './ui/tooltip';
import { ThemeSwitcher } from './themeswitcher';
import Link from 'next/link';

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  // Dynamic classes for the links based on the theme
  const linkBaseClasses = 'flex flex-row gap-3 items-center px-2 rounded-md cursor-pointer';
  const lightModeClasses = 'bg-gray-200/75 text-black hover:bg-gray-200'; // 75% opacity
  const darkModeClasses = 'dark:bg-gray-700/75 dark:text-white dark:hover:bg-gray-800'; // 75% opacity
  const linkThemeClasses = `${lightModeClasses} ${darkModeClasses}`

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/dashboard"
              onClick={() => {
                setOpenMobile(false);
              }}
              className={`${linkBaseClasses} ${linkThemeClasses}`}
            >
              <span className="text-lg font-semibold">Chatbot</span>
            </Link>
            <Link
              href="/analytics"
              onClick={() => {
                setOpenMobile(false);
              }}
              className={`${linkBaseClasses} ${linkThemeClasses}`}
            >
              <span className="text-lg font-semibold">Analytics</span>
            </Link>
            <BetterTooltip content="Toggle Theme" align="start">
              <ThemeSwitcher />
            </BetterTooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Add Sidebar Content Here */}
      </SidebarContent>
      <SidebarFooter className="gap-0 -mx-2">
        {/* Add Footer Content Here */}
      </SidebarFooter>
    </Sidebar>
  );
}