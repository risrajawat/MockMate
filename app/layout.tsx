
import type { Metadata } from "next";
import "./globals.css";
import { HeaderWrapper } from "../components/HeaderWrapper";

export const metadata: Metadata = {
  title: "Mockmate | Practice Interviews with AI Confidence",
  description:
    "Master your next interview with real-time AI feedback and voice interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container">
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}
