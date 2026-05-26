export const dynamic = "force-dynamic";

import { Building2, MapPinned, Search } from "lucide-react";
import { Card } from "@/components/Card";
import { LocationCard } from "@/components/LocationCard";
import { Pagination } from "@/components/Pagination";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export default async function MapaPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  await requireUser();
  const q = searchParams.q?.trim();
  const page = Math.max(Number(searchParams.page || "1"), 1);
  const pageSize = 9;
  const where: Prisma.CampusLocationWhereInput | undefined = q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { type: { contains: q, mode: "insensitive" } }, { block: { contains: q, mode: "insensitive" } }] } : undefined;
  const [totalLocations, locations] = await Promise.all([
    prisma.campusLocation.count({ where }),
    prisma.campusLocation.findMany({ where, orderBy: { name: "asc" }, skip: (page - 1) * pageSize, take: pageSize })
  ]);
  const totalPages = Math.ceil(totalLocations / pageSize);

  return (
    <main className="page-shell">
      <section className="grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
        <div><p className="eyebrow">Mapa inteligente</p><h1 className="page-title mt-2">Encontre qualquer lugar no campus</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600">Pesquise por nome, tipo ou bloco. A ideia é funcionar como uma central de orientação por QR Code dentro da FICR.</p></div>
        <Card className="bg-blue-950 p-4 text-white">
          <form className="grid gap-3 md:grid-cols-[1fr_auto]"><input className="input border-white/10 bg-white/95" name="q" placeholder="Buscar Biblioteca, Bloco A, Laboratório..." defaultValue={q || ""}/><button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-black text-blue-950 hover:bg-sky-300"><Search size={16}/>Buscar</button></form>
        </Card>
      </section>

      <Card className="mt-6 overflow-hidden bg-blue-950 p-0 text-white">
        <div className="soft-grid p-6">
          <div className="mb-5 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="rounded-2xl bg-white/12 p-3"><MapPinned/></span><div><h2 className="text-xl font-black">Representação visual do campus</h2><p className="text-sm text-blue-100">Modelo simples para apresentação e expansão futura.</p></div></div><span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black">{totalLocations} locais</span></div>
          <div className="grid gap-3 md:grid-cols-4">
            {["Bloco A", "Bloco B", "Laboratórios", "Cantina"].map((block, index) => <div key={block} className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center"><Building2 className="mx-auto text-sky-300"/><p className="mt-3 font-black">{block}</p><p className="mt-1 text-xs text-blue-100">Área {index + 1}</p></div>)}
          </div>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between"><p className="text-sm font-black text-slate-500">{totalLocations} local(is) encontrado(s).</p></div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{locations.length ? locations.map((location) => <LocationCard key={location.id} location={location}/>) : <Card>Nenhum local encontrado.</Card>}</div>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/mapa" searchParams={searchParams as Record<string, string | undefined>}/>
    </main>
  );
}
