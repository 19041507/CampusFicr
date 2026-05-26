import { notFound } from "next/navigation";
import { ArrowLeft, Building2, QrCode } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function LocalPage({ params }: { params: { id: string } }) {
  await requireUser();
  const location = await prisma.campusLocation.findUnique({ where: { id: params.id } });
  if (!location) notFound();
  const url = location.qrCode || `/mapa/local/${location.id}`;
  return <main className="mx-auto max-w-4xl px-4 py-8"><Link href="/mapa" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600"><ArrowLeft size={16}/> Voltar</Link><Card className="mt-4"><div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"><div><span className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600"><Building2 /></span><h1 className="mt-4 text-4xl font-black">{location.name}</h1><p className="mt-2 font-bold text-blue-600">{location.type}</p><p className="mt-4 leading-7 text-slate-600">{location.description}</p><div className="mt-5 flex flex-wrap gap-2 text-sm font-bold"><span className="rounded-full bg-slate-100 px-3 py-1">Bloco {location.block || "-"}</span><span className="rounded-full bg-slate-100 px-3 py-1">Andar {location.floor || "-"}</span></div></div><div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center"><QrCode className="mx-auto text-slate-900" size={48}/><div className="mt-4 grid grid-cols-5 gap-1">{Array.from({length:25}).map((_,i)=><span key={i} className={`h-5 rounded ${i%2===0 || i%7===0 ? "bg-slate-900" : "bg-white"}`} />)}</div><p className="mt-4 text-xs font-bold text-slate-500">QR Code deste local</p><p className="mt-1 break-all text-xs text-slate-500">{url}</p></div></div></Card></main>;
}
