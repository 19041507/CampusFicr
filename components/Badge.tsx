import type { ReactNode } from "react";
const map = {
  LOST: "bg-orange-100 text-orange-700 border-orange-200",
  FOUND: "bg-emerald-100 text-emerald-700 border-emerald-200",
  RETURNED: "bg-blue-100 text-blue-700 border-blue-200",
  STUDENT: "bg-slate-100 text-slate-700 border-slate-200",
  TEACHER: "bg-violet-100 text-violet-700 border-violet-200",
  ADMIN: "bg-rose-100 text-rose-700 border-rose-200",
  GOOD: "bg-emerald-100 text-emerald-700 border-emerald-200",
  SLOW: "bg-amber-100 text-amber-700 border-amber-200",
  FAST: "bg-red-100 text-red-700 border-red-200"
};

export function Badge({ value, children }: { value?: keyof typeof map | string; children?: ReactNode }) {
  const key = String(value || "").toUpperCase();
  const color = map[key as keyof typeof map] || "bg-slate-100 text-slate-700 border-slate-200";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${color}`}>{children || key}</span>;
}
