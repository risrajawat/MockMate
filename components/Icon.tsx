
"use client";

import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className = "" }: IconProps) => {
  const baseProps = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: `w-6 h-6 ${className}`,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "mic":
      return (
        <svg {...baseProps}>
          <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
          <path d="M19 11a1 1 0 112 0c0 3.31-2.69 6-6 6s-6-2.69-6-6a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
          <path d="M11 18h2v3h-2z" />
        </svg>
      );

    case "play":
      return (
        <svg {...baseProps}>
          <path d="M8 5v14l11-7z" />
        </svg>
      );

    default:
      return null;
  }
};
