import type { LostFoundItem, User } from "@prisma/client";
import { MapPin, Phone } from "lucide-react";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { dateBR, statusLabel } from "@/lib/format";

export function LostFoundCard({ item }: { item: LostFoundItem & { user: Pick<User, "name"> } }) {
  return (
    <Card className="h-full transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wide text-blue-600">{item.category}</p><h3 className="mt-1 text-lg font-black text-blue-950">{item.title}</h3></div><Badge value={item.status}>{statusLabel(item.status)}</Badge></div>
      {item.imageUrl && <div className="mt-4 h-32 rounded-3xl border border-blue-100 bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})` }} />}
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
      <div className="mt-4 space-y-2 text-sm font-semibold text-slate-600"><p className="flex items-center gap-2"><MapPin size={16} className="text-blue-700"/>{item.location}</p><p className="flex items-center gap-2"><Phone size={16} className="text-blue-700"/>{item.contact}</p></div>
      <div className="mt-4 border-t border-blue-50 pt-3 text-xs font-semibold text-slate-500">Cadastrado por {item.user.name} • {dateBR(item.createdAt)}</div>
    </Card>
  );
}
