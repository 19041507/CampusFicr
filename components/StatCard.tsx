import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

export function StatCard({ title, value, icon: Icon, hint }: { title: string; value: string | number; icon: LucideIcon; hint?: string }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-blue-950">{value}</p>
          {hint && <p className="mt-1 text-xs font-semibold text-slate-500">{hint}</p>}
        </div>
        <span className="rounded-2xl bg-blue-700 p-3 text-white shadow-lg shadow-blue-700/20"><Icon size={22}/></span>
      </div>
    </Card>
  );
}
