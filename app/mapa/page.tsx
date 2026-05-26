export const dynamic = "force-dynamic";

import { MapPinned } from "lucide-react";
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
  return <main className="mx-auto max-w-7xl px-4 py-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-bold text-blue-600">Mapa inteligente</p><h1 className="text-4xl font-black">Encontre qualquer lugar no campus</h1><p className="mt-2 text-slate-600">Pesquise por nome, tipo ou bloco. Sem Google Maps, apenas representação simples do campus.</p></div><form className="flex gap-2"><input className="input min-w-72" name="q" placeholder="Buscar Biblioteca, Bloco A..." defaultValue={q || ""}/><button className="rounded-2xl bg-blue-600 px-4 font-bold text-white">Buscar</button></form></div>
    <Card className="mt-6 bg-slate-900 text-white"><div className="mb-4 flex items-center gap-2 font-black"><MapPinned/> Representação visual</div><div className="grid gap-3 md:grid-cols-4"><div className="rounded-3xl bg-blue-500/25 p-8 text-center font-black">Bloco A</div><div className="rounded-3xl bg-emerald-500/25 p-8 text-center font-black">Bloco B</div><div className="rounded-3xl bg-violet-500/25 p-8 text-center font-black">Laboratórios</div><div className="rounded-3xl bg-orange-500/25 p-8 text-center font-black">Cantina</div></div></Card>
    <div className="mt-4 text-sm font-semibold text-slate-500">{totalLocations} local(is) encontrado(s).</div><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{locations.length ? locations.map((location) => <LocationCard key={location.id} location={location}/>) : <Card>Nenhum local encontrado.</Card>}</div><Pagination currentPage={page} totalPages={totalPages} basePath="/mapa" searchParams={searchParams as Record<string, string | undefined>}/></main>;
}
