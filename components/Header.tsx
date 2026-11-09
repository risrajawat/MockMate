"use client";
import React from "react";
import classNames from "classnames";
import { Icon } from "./Icon";

export const Header = () => (
  <header className="bg-surface border-b border-border p-4 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <Icon name="mic" className="text-primary" />
      <h1 className="text-h2 font-display text-primary">MockMate Premium</h1>
    </div>
    <nav className="space-x-4">
      <a href="/dashboard" className="text-body-md hover:text-primary">Dashboard</a>
      <a href="/setup" className="text-body-md hover:text-primary">Setup</a>
      <a href="/interview" className="text-body-md hover:text-primary">Interview</a>
    </nav>
  </header>
);

