export const dynamic = "force-dynamic";

import { Building2, ClipboardList, MessageSquare, SearchCheck, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LocationForm } from "@/components/AdminForms";
import { StatCard } from "@/components/StatCard";
import { markReturned } from "@/lib/actions";
import { requireUser } from "@/lib/auth";
import { dateBR, roleLabel, statusLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function AdminPage(){
 await requireUser(["ADMIN"]);
 const [userTotal, users, lost, found, returned, feedbacks, locations, items] = await Promise.all([
  prisma.user.count(),
  prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  prisma.lostFoundItem.count({ where: { status: "LOST" } }),
  prisma.lostFoundItem.count({ where: { status: "FOUND" } }),
  prisma.lostFoundItem.count({ where: { status: "RETURNED" } }),
  prisma.classFeedback.count(),
  prisma.campusLocation.findMany({ orderBy: { createdAt: "desc" } }),
  prisma.lostFoundItem.findMany({ orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } }, take: 12 })
 ]);
 return <main className="mx-auto max-w-7xl px-4 py-8"><div><p className="font-bold text-blue-600">Admin</p><h1 className="text-4xl font-black">Painel administrativo</h1><p className="mt-2 text-slate-600">Gerencie locais, acompanhe cadastros e marque itens como devolvidos.</p></div><section className="mt-6 grid gap-5 md:grid-cols-4"><StatCard title="Usuários" value={userTotal} icon={Users}/><StatCard title="Perdidos" value={lost} icon={SearchCheck}/><StatCard title="Encontrados" value={found} icon={ClipboardList} hint={`${returned} devolvidos`}/><StatCard title="Feedbacks" value={feedbacks} icon={MessageSquare}/></section><section className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><Card><h2 className="mb-4 text-xl font-black">Cadastrar local do campus</h2><LocationForm /></Card><Card><h2 className="mb-4 text-xl font-black">Locais cadastrados</h2><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs uppercase text-slate-400"><tr><th className="py-2">Local</th><th>Tipo</th><th>Bloco</th><th>QR</th></tr></thead><tbody>{locations.map(l => <tr key={l.id} className="border-t border-slate-100"><td className="py-3 font-bold">{l.name}</td><td>{l.type}</td><td>{l.block || "-"}</td><td className="text-blue-600">/mapa/local/{l.id.slice(0,6)}</td></tr>)}{!locations.length && <tr><td className="py-3 text-slate-500">Nenhum local.</td></tr>}</tbody></table></div></Card></section><section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><Card><h2 className="mb-4 text-xl font-black">Objetos recentes</h2><div className="space-y-3">{items.map(item => <div key={item.id} className="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 p-4 md:flex-row md:items-center"><div><div className="flex flex-wrap items-center gap-2"><b>{item.title}</b><Badge value={item.status}>{statusLabel(item.status)}</Badge></div><p className="mt-1 text-sm text-slate-500">{item.location} • {item.user.name} • {dateBR(item.createdAt)}</p></div>{item.status !== "RETURNED" && <form action={markReturned}><input type="hidden" name="id" value={item.id}/><Button variant="secondary">Marcar devolvido</Button></form>}</div>)}</div></Card><Card><h2 className="mb-4 text-xl font-black">Usuários recentes</h2><div className="space-y-3">{users.map(user => <div key={user.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><b>{user.name}</b><p className="text-sm text-slate-500">{user.email}</p></div><Badge value={user.role}>{roleLabel(user.role)}</Badge></div>)}</div></Card></section></main>;
}
