"use client";
import React from "react";
import classNames from "classnames";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export const Button = ({ variant = "primary", className, children, ...props }: ButtonProps) => {
  const base = "rounded px-4 py-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary: "bg-primary text-on-background hover:bg-primary/90 focus-visible:ring-primary",
    secondary: "bg-surface text-on-background border border-border hover:bg-surface/90 focus-visible:ring-primary",
  };
  return (
    <button
      className={classNames(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

