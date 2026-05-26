import type { CampusLocation } from "@prisma/client";
import { Building2, QrCode } from "lucide-react";
import { ButtonLink } from "./Button";
import { Card } from "./Card";

export function LocationCard({ location }: { location: CampusLocation }) {
  return (
    <Card className="group h-full transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="flex items-start gap-3"><span className="rounded-2xl bg-blue-700 p-3 text-white shadow-lg shadow-blue-700/20"><Building2 size={22}/></span><div><h3 className="text-lg font-black text-blue-950">{location.name}</h3><p className="text-sm font-black text-blue-700">{location.type}</p></div></div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{location.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-blue-900"><span className="rounded-full bg-blue-50 px-3 py-1">Bloco {location.block || "-"}</span><span className="rounded-full bg-blue-50 px-3 py-1">Andar {location.floor || "-"}</span><span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1"><QrCode size={13}/>QR</span></div>
      <ButtonLink href={`/mapa/local/${location.id}`} className="mt-5 w-full">Ver detalhes</ButtonLink>
    </Card>
  );
}
