import type { CampusLocation } from "@prisma/client";
import { Building2, QrCode } from "lucide-react";
import { ButtonLink } from "./Button";
import { Card } from "./Card";
export function LocationCard({ location }: { location: CampusLocation }) {
  return <Card className="h-full"><div className="flex items-start gap-3"><span className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Building2 size={22}/></span><div><h3 className="text-lg font-black">{location.name}</h3><p className="text-sm font-semibold text-blue-600">{location.type}</p></div></div><p className="mt-3 text-sm leading-6 text-slate-600">{location.description}</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600"><span className="rounded-full bg-slate-100 px-3 py-1">Bloco {location.block || "-"}</span><span className="rounded-full bg-slate-100 px-3 py-1">Andar {location.floor || "-"}</span><span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><QrCode size={13}/>QR</span></div><ButtonLink href={`/mapa/local/${location.id}`} className="mt-5 w-full">Ver detalhes</ButtonLink></Card>;
}
