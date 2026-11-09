
"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export const HeaderWrapper = () => {
  const pathname = usePathname();

  // These sections already have their own layouts and navigation.
  const hideGlobalHeader =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/setup") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/interview");

  if (hideGlobalHeader) {
    return null;
  }

  return <Header />;
};
