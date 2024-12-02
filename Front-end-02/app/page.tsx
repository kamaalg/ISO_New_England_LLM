'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard page without adding to the history stack
    router.replace('/dashboard');
  }, [router]);

  return null; // Optionally, return null to avoid rendering anything
}