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
  const status = searchParams.status as ItemStatus | undefined;
  const category = searchParams.category?.trim();
  const page = Math.max(Number(searchParams.page || "1"), 1);
  const pageSize = 9;
  const where: Prisma.LostFoundItemWhereInput = { AND: [q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }] } : {}, status ? { status } : {}, category ? { category } : {}] };
  const categories = await prisma.lostFoundItem.findMany({ distinct: ["category"], select: { category: true }, orderBy: { category: "asc" } });
  const [totalItems, items] = await Promise.all([
    prisma.lostFoundItem.count({ where }),
    prisma.lostFoundItem.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
  ]);
  const totalPages = Math.ceil(totalItems / pageSize);
  return <main className="mx-auto max-w-7xl px-4 py-8"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="font-bold text-blue-600">Achados e perdidos</p><h1 className="text-4xl font-black">Objetos do campus</h1><p className="mt-2 text-slate-600">Filtre por texto, status ou categoria.</p></div><div className="flex flex-wrap gap-2"><ButtonLink href="/achados-perdidos/novo-perdido" variant="danger"><Plus size={16}/>Objeto perdido</ButtonLink><ButtonLink href="/achados-perdidos/novo-encontrado"><Plus size={16}/>Objeto encontrado</ButtonLink></div></div>
  <Card className="mt-6"><form className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]"><input className="input" name="q" placeholder="Buscar por mochila, sala..." defaultValue={q || ""}/><select className="input" name="status" defaultValue={status || ""}><option value="">Todos status</option><option value="LOST">Perdido</option><option value="FOUND">Encontrado</option><option value="RETURNED">Devolvido</option></select><select className="input" name="category" defaultValue={category || ""}><option value="">Categorias</option>{categories.map(c => <option key={c.category}>{c.category}</option>)}</select><button className="rounded-2xl bg-slate-900 px-5 font-bold text-white"><SearchCheck size={16} className="inline"/> Filtrar</button></form></Card>
  <div className="mt-4 text-sm font-semibold text-slate-500">{totalItems} objeto(s) encontrado(s).</div><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.length ? items.map((item) => <LostFoundCard key={item.id} item={item}/>) : <Card>Nenhum objeto encontrado.</Card>}</div><Pagination currentPage={page} totalPages={totalPages} basePath="/achados-perdidos" searchParams={searchParams as Record<string, string | undefined>}/></main>;
}
