import { BookOpen, MapPinned, QrCode, Radar, SearchCheck } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { LostFoundCard } from "@/components/LostFoundCard";
import { LocationCard } from "@/components/LocationCard";
import { StatCard } from "@/components/StatCard";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await requireUser();
  const [items, locations, lostCount] = await Promise.all([
    prisma.lostFoundItem.findMany({ take: 3, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } } }),
    prisma.campusLocation.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
    prisma.lostFoundItem.count({ where: { status: { in: ["LOST", "FOUND"] } } })
  ]);
  return <main className="mx-auto max-w-7xl px-4 py-8">
    <section className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-slate-900 p-6 text-white shadow-soft md:p-8"><p className="font-semibold text-blue-100">Bem-vindo, {user.name}</p><h1 className="mt-2 text-3xl font-black md:text-5xl">Seu painel do aluno</h1><p className="mt-3 max-w-2xl text-blue-50">Acesse o mapa por QR Code, procure objetos e envie feedback anônimo das aulas.</p><div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/mapa" variant="secondary">Abrir mapa</ButtonLink><ButtonLink href="/feedback" className="bg-slate-950 hover:bg-slate-800">Enviar feedback</ButtonLink></div></section>
    <section className="mt-6 grid gap-5 md:grid-cols-3"><StatCard title="Objetos ativos" value={lostCount} icon={SearchCheck}/><StatCard title="Locais cadastrados" value={locations.length} icon={MapPinned}/><StatCard title="QR Code" value="Rápido" icon={QrCode} hint="Use o link do local para simular o QR."/></section>
    <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]"><div><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Últimos achados e perdidos</h2><ButtonLink href="/achados-perdidos" variant="secondary">Ver todos</ButtonLink></div><div className="grid gap-4 md:grid-cols-3">{items.length ? items.map((item) => <LostFoundCard key={item.id} item={item}/>) : <Card>Nenhum objeto cadastrado ainda.</Card>}</div></div><div><h2 className="mb-4 text-2xl font-black">Locais úteis</h2><div className="grid gap-4">{locations.length ? locations.map((location) => <LocationCard key={location.id} location={location}/>) : <Card>Nenhum local cadastrado.</Card>}</div></div></section>
    <Card className="mt-8"><div className="flex gap-4"><span className="rounded-2xl bg-violet-50 p-3 text-violet-600"><BookOpen /></span><div><h2 className="text-xl font-black">Como usar o QR Code?</h2><p className="mt-2 leading-7 text-slate-600">Cada local possui uma rota interna como <b>/mapa/local/id</b>. Essa rota pode ser impressa em QR Code e colada em placas pelo campus.</p></div></div></Card>
  </main>;
}
