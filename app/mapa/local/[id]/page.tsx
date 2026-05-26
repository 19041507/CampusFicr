export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Navigation, QrCode } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function LocalPage({ params }: { params: { id: string } }) {
  await requireUser();
  const location = await prisma.campusLocation.findUnique({ where: { id: params.id } });
  if (!location) notFound();
  const url = location.qrCode || `/mapa/local/${location.id}`;
  return (
    <main className="page-shell max-w-5xl">
      <Link href="/mapa" className="inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-900"><ArrowLeft size={16}/> Voltar ao mapa</Link>
      <Card className="mt-4 overflow-hidden p-0">
        <div className="ficr-hero soft-grid p-7 text-white md:p-9"><span className="inline-flex rounded-2xl bg-white/15 p-3"><Building2 /></span><h1 className="mt-4 text-4xl font-black">{location.name}</h1><p className="mt-2 font-black text-sky-200">{location.type}</p></div>
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_300px] md:p-8">
          <div><h2 className="text-xl font-black text-blue-950">Informações do local</h2><p className="mt-3 leading-7 text-slate-600">{location.description}</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-3xl bg-blue-50 p-4"><p className="text-xs font-black uppercase tracking-wide text-blue-700">Bloco</p><p className="mt-1 text-lg font-black text-blue-950">{location.block || "Não informado"}</p></div><div className="rounded-3xl bg-blue-50 p-4"><p className="text-xs font-black uppercase tracking-wide text-blue-700">Andar</p><p className="mt-1 text-lg font-black text-blue-950">{location.floor || "Não informado"}</p></div></div><div className="mt-5 rounded-3xl border border-blue-100 bg-white p-4"><div className="flex gap-3"><Navigation className="text-blue-700"/><div><p className="font-black text-blue-950">Orientação rápida</p><p className="mt-1 text-sm leading-6 text-slate-600">Use esta página como destino do QR Code fixado no campus. Em uma versão futura, ela pode mostrar caminho passo a passo.</p></div></div></div></div>
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center"><QrCode className="mx-auto text-blue-950" size={48}/><div className="mt-4 grid grid-cols-5 gap-1">{Array.from({length:25}).map((_,i)=><span key={i} className={`h-5 rounded ${i%2===0 || i%7===0 ? "bg-blue-950" : "bg-white"}`} />)}</div><p className="mt-4 text-xs font-black uppercase tracking-wide text-blue-700">QR Code deste local</p><p className="mt-1 break-all text-xs font-semibold text-slate-500">{url}</p></div>
        </div>
      </Card>
    </main>
  );
}
