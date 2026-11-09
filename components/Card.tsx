// components/Card.tsx
import React from "react";
import classNames from "classnames";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div
    className={classNames(
      "rounded-lg p-6 bg-surface shadow-card border border-border",
      className,
    )}
  >
    {children}
  </div>
);
