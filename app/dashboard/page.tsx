export const dynamic = "force-dynamic";

import { BookOpen, ChevronRight, MapPinned, QrCode, Radar, SearchCheck } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { LostFoundCard } from "@/components/LostFoundCard";
import { LocationCard } from "@/components/LocationCard";
import { StatCard } from "@/components/StatCard";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await requireUser();
  const [items, locations, activeItems, totalLocations] = await Promise.all([
    prisma.lostFoundItem.findMany({ take: 3, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true } } } }),
    prisma.campusLocation.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
    prisma.lostFoundItem.count({ where: { status: { in: ["LOST", "FOUND"] } } }),
    prisma.campusLocation.count()
  ]);

  return (
    <main className="page-shell">
      <section className="ficr-hero soft-grid rounded-[2rem] p-6 text-white shadow-soft md:p-9">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="font-black text-sky-200">Bem-vindo, {user.name}</p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">Painel do aluno</h1>
            <p className="mt-4 max-w-2xl text-blue-50">Acesse rapidamente o mapa do campus, registre objetos e envie feedback anônimo das aulas.</p>
            <div className="mt-7 flex flex-wrap gap-3"><ButtonLink href="/mapa" variant="secondary">Abrir mapa <ChevronRight size={17}/></ButtonLink><ButtonLink href="/feedback" className="bg-blue-950 hover:bg-blue-900">Enviar feedback</ButtonLink></div>
          </div>
          <div className="grid gap-3 rounded-3xl bg-white/12 p-4 backdrop-blur sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-4 text-blue-950"><MapPinned className="text-blue-700"/><p className="mt-3 text-2xl font-black">{totalLocations}</p><p className="text-sm font-bold text-slate-500">locais no mapa</p></div>
            <div className="rounded-3xl bg-white p-4 text-blue-950"><SearchCheck className="text-blue-700"/><p className="mt-3 text-2xl font-black">{activeItems}</p><p className="text-sm font-bold text-slate-500">objetos ativos</p></div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <StatCard title="Objetos ativos" value={activeItems} icon={SearchCheck}/>
        <StatCard title="Locais cadastrados" value={totalLocations} icon={MapPinned}/>
        <StatCard title="QR Code" value="Ativo" icon={QrCode} hint="Cada local tem uma rota própria."/>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3"><div><p className="eyebrow">Comunidade</p><h2 className="section-title">Últimos objetos</h2></div><ButtonLink href="/achados-perdidos" variant="secondary">Ver todos</ButtonLink></div>
          <div className="grid gap-4 md:grid-cols-3">{items.length ? items.map((item) => <LostFoundCard key={item.id} item={item}/>) : <Card>Nenhum objeto cadastrado ainda.</Card>}</div>
        </div>
        <div>
          <div className="mb-4"><p className="eyebrow">Navegação</p><h2 className="section-title">Locais úteis</h2></div>
          <div className="grid gap-4">{locations.length ? locations.map((location) => <LocationCard key={location.id} location={location}/>) : <Card>Nenhum local cadastrado.</Card>}</div>
        </div>
      </section>

      <Card className="mt-8 border-blue-200 bg-blue-50/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4"><span className="rounded-2xl bg-blue-700 p-3 text-white"><BookOpen /></span><div><h2 className="text-xl font-black text-blue-950">Como usar o QR Code?</h2><p className="mt-2 leading-7 text-blue-900/80">Cada local possui uma rota interna. Essa rota pode ser impressa como QR Code e colada em placas do campus para acesso imediato.</p></div></div>
          <ButtonLink href="/mapa" className="shrink-0">Ver mapa</ButtonLink>
        </div>
      </Card>
    </main>
  );
}
