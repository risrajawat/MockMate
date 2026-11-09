"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

export const HeaderWrapper = () => {
  const pathname = usePathname();
  // Hide header on authentication pages
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return null;
  }
  return <Header />;
};

