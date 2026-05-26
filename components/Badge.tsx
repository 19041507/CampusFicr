import type { ReactNode } from "react";

const map = {
  LOST: "bg-orange-50 text-orange-700 border-orange-200",
  FOUND: "bg-blue-50 text-blue-700 border-blue-200",
  RETURNED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  STUDENT: "bg-blue-50 text-blue-700 border-blue-200",
  TEACHER: "bg-indigo-50 text-indigo-700 border-indigo-200",
  ADMIN: "bg-sky-50 text-sky-700 border-sky-200",
  GOOD: "bg-blue-50 text-blue-700 border-blue-200",
  SLOW: "bg-amber-50 text-amber-700 border-amber-200",
  FAST: "bg-red-50 text-red-700 border-red-200"
};

export function Badge({ value, children }: { value?: keyof typeof map | string; children?: ReactNode }) {
  const key = String(value || "").toUpperCase();
  const color = map[key as keyof typeof map] || "bg-slate-50 text-slate-700 border-slate-200";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black ${color}`}>{children || key}</span>;
}
