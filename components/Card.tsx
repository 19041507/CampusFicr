import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[1.75rem] border border-blue-100/80 bg-white/95 p-5 shadow-soft ring-1 ring-white/70 ${className}`}>{children}</div>;
}
