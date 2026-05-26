import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";
export function StatCard({ title, value, icon: Icon, hint }: { title: string; value: string | number; icon: LucideIcon; hint?: string }) {
  return <Card><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-slate-500">{title}</p><p className="mt-2 text-3xl font-black text-slate-900">{value}</p>{hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}</div><span className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Icon size={22}/></span></div></Card>;
}
