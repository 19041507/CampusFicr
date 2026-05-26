export const dynamic = "force-dynamic";

import { Plus, SearchCheck } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { LostFoundCard } from "@/components/LostFoundCard";
import { Pagination } from "@/components/Pagination";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ItemStatus, Prisma } from "@prisma/client";

export default async function AchadosPage({ searchParams }: { searchParams: { q?: string; status?: string; category?: string; page?: string } }) {
  await requireUser();
  const q = searchParams.q?.trim();
  const rawStatus = searchParams.status;
  const status = rawStatus === "LOST" || rawStatus === "FOUND" || rawStatus === "RETURNED" ? rawStatus as ItemStatus : undefined;
  const category = searchParams.category?.trim();
  const page = Math.max(Number(searchParams.page || "1"), 1);
  const pageSize = 9;
  const where: Prisma.LostFoundItemWhereInput = { AND: [q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }] } : {}, status ? { status } : {}, category ? { category } : {}] };
  const categories = await prisma.lostFoundItem.findMany({ distinct: ["category"], select: { category: true }, orderBy: { category: "asc" } });
  const [totalItems, items, lost, found] = await Promise.all([
    prisma.lostFoundItem.count({ where }),
    prisma.lostFoundItem.findMany({ where, include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.lostFoundItem.count({ where: { status: "LOST" } }),
    prisma.lostFoundItem.count({ where: { status: "FOUND" } })
  ]);
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <main className="page-shell">
      <section className="grid gap-6 lg:grid-cols-[1fr_.9fr] lg:items-end">
        <div><p className="eyebrow">Achados e perdidos</p><h1 className="page-title mt-2">Objetos do campus</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600">Uma página direta para cadastrar, buscar e recuperar objetos de forma organizada.</p></div>
        <div className="flex flex-wrap gap-2 lg:justify-end"><ButtonLink href="/achados-perdidos/novo-perdido" variant="danger"><Plus size={16}/>Objeto perdido</ButtonLink><ButtonLink href="/achados-perdidos/novo-encontrado"><Plus size={16}/>Objeto encontrado</ButtonLink></div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="bg-orange-50"><p className="text-sm font-black text-orange-700">Perdidos</p><p className="mt-1 text-3xl font-black text-orange-800">{lost}</p></Card>
        <Card className="bg-blue-50"><p className="text-sm font-black text-blue-700">Encontrados</p><p className="mt-1 text-3xl font-black text-blue-950">{found}</p></Card>
        <Card><p className="text-sm font-black text-slate-500">Resultado atual</p><p className="mt-1 text-3xl font-black text-blue-950">{totalItems}</p></Card>
      </section>

      <Card className="mt-6">
        <form className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]"><input className="input" name="q" placeholder="Buscar por mochila, sala, carteira..." defaultValue={q || ""}/><select className="input" name="status" defaultValue={status || ""}><option value="">Todos status</option><option value="LOST">Perdido</option><option value="FOUND">Encontrado</option><option value="RETURNED">Devolvido</option></select><select className="input" name="category" defaultValue={category || ""}><option value="">Categorias</option>{categories.map(c => <option key={c.category}>{c.category}</option>)}</select><button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800"><SearchCheck size={16}/>Filtrar</button></form>
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.length ? items.map((item) => <LostFoundCard key={item.id} item={item}/>) : <Card>Nenhum objeto encontrado.</Card>}</div>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/achados-perdidos" searchParams={searchParams as Record<string, string | undefined>}/>
    </main>
  );
}
