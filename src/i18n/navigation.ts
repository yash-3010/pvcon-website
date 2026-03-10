import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation helpers — use these instead of next/link and next/navigation
// when you need locale-prefixed hrefs (e.g. /de/about, /zh/blog)
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
