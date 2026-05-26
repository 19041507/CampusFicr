export const dynamic = "force-dynamic";

import { ClipboardList, MessageSquare, SearchCheck, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LocationForm } from "@/components/AdminForms";
import { Pagination } from "@/components/Pagination";
import { StatCard } from "@/components/StatCard";
import { markReturned } from "@/lib/actions";
import { requireUser } from "@/lib/auth";
import { dateBR, roleLabel, statusLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type AdminSearchParams = Record<string, string | undefined> & { locaisPage?: string; objetosPage?: string; usuariosPage?: string; };

export default async function AdminPage({ searchParams }: { searchParams: AdminSearchParams }) {
  await requireUser(["ADMIN"]);
  const locaisPage = Math.max(Number(searchParams.locaisPage || "1"), 1);
  const objetosPage = Math.max(Number(searchParams.objetosPage || "1"), 1);
  const usuariosPage = Math.max(Number(searchParams.usuariosPage || "1"), 1);
  const locationsPageSize = 6;
  const itemsPageSize = 6;
  const usersPageSize = 6;

  const [userTotal, usersTotal, lost, found, returned, feedbacks, locationsTotal, itemsTotal, users, locations, items] = await Promise.all([
    prisma.user.count(), prisma.user.count(), prisma.lostFoundItem.count({ where: { status: "LOST" } }), prisma.lostFoundItem.count({ where: { status: "FOUND" } }), prisma.lostFoundItem.count({ where: { status: "RETURNED" } }), prisma.classFeedback.count(), prisma.campusLocation.count(), prisma.lostFoundItem.count(),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, skip: (usuariosPage - 1) * usersPageSize, take: usersPageSize }),
    prisma.campusLocation.findMany({ orderBy: { createdAt: "desc" }, skip: (locaisPage - 1) * locationsPageSize, take: locationsPageSize }),
    prisma.lostFoundItem.findMany({ orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } }, skip: (objetosPage - 1) * itemsPageSize, take: itemsPageSize })
  ]);

  return (
    <main className="page-shell">
      <section className="ficr-hero soft-grid rounded-[2rem] p-6 text-white shadow-soft md:p-8"><p className="font-black text-sky-200">Administração</p><h1 className="mt-2 text-4xl font-black">Painel administrativo</h1><p className="mt-3 max-w-2xl text-blue-50">Gerencie locais, acompanhe cadastros, usuários e status de objetos.</p></section>
      <section className="mt-6 grid gap-5 md:grid-cols-4"><StatCard title="Usuários" value={userTotal} icon={Users} /><StatCard title="Perdidos" value={lost} icon={SearchCheck} /><StatCard title="Encontrados" value={found} icon={ClipboardList} hint={`${returned} devolvidos`} /><StatCard title="Feedbacks" value={feedbacks} icon={MessageSquare} /></section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card><h2 className="mb-4 text-xl font-black text-blue-950">Cadastrar local do campus</h2><LocationForm /></Card>
        <Card><div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-xl font-black text-blue-950">Locais cadastrados</h2><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{locationsTotal} locais</span></div><div className="overflow-x-auto rounded-3xl border border-blue-100"><table className="w-full text-left text-sm"><thead className="table-head"><tr><th className="table-cell">Local</th><th className="table-cell">Tipo</th><th className="table-cell">Bloco</th><th className="table-cell">QR</th></tr></thead><tbody>{locations.map((location) => <tr key={location.id} className="border-t border-blue-50"><td className="table-cell font-black text-blue-950">{location.name}</td><td className="table-cell">{location.type}</td><td className="table-cell">{location.block || "-"}</td><td className="table-cell text-blue-700">/mapa/local/{location.id.slice(0, 6)}</td></tr>)}{!locations.length && <tr><td className="table-cell text-slate-500">Nenhum local.</td></tr>}</tbody></table></div><Pagination currentPage={locaisPage} totalPages={Math.ceil(locationsTotal / locationsPageSize)} basePath="/admin" searchParams={searchParams} pageParam="locaisPage" /></Card>
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Card><div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-xl font-black text-blue-950">Objetos recentes</h2><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{itemsTotal} objetos</span></div><div className="space-y-3">{items.map((item) => <div key={item.id} className="flex flex-col justify-between gap-3 rounded-3xl border border-blue-100 bg-blue-50/50 p-4 md:flex-row md:items-center"><div><div className="flex flex-wrap items-center gap-2"><b className="text-blue-950">{item.title}</b><Badge value={item.status}>{statusLabel(item.status)}</Badge></div><p className="mt-1 text-sm text-slate-500">{item.location} • {item.user.name} • {dateBR(item.createdAt)}</p></div>{item.status !== "RETURNED" && <form action={markReturned}><input type="hidden" name="id" value={item.id} /><Button variant="secondary">Marcar devolvido</Button></form>}</div>)}{!items.length && <p className="text-sm text-slate-500">Nenhum objeto cadastrado.</p>}</div><Pagination currentPage={objetosPage} totalPages={Math.ceil(itemsTotal / itemsPageSize)} basePath="/admin" searchParams={searchParams} pageParam="objetosPage" /></Card>
        <Card><div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-xl font-black text-blue-950">Usuários recentes</h2><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{usersTotal} usuários</span></div><div className="space-y-3">{users.map((user) => <div key={user.id} className="flex items-center justify-between rounded-3xl border border-blue-100 bg-white p-4"><div><b className="text-blue-950">{user.name}</b><p className="text-sm text-slate-500">{user.email}</p></div><Badge value={user.role}>{roleLabel(user.role)}</Badge></div>)}{!users.length && <p className="text-sm text-slate-500">Nenhum usuário cadastrado.</p>}</div><Pagination currentPage={usuariosPage} totalPages={Math.ceil(usersTotal / usersPageSize)} basePath="/admin" searchParams={searchParams} pageParam="usuariosPage" /></Card>
      </section>
    </main>
  );
}
