export const dynamic = "force-dynamic";

import { MessageSquareText, Percent, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { StatCard } from "@/components/StatCard";
import { requireUser } from "@/lib/auth";
import { paceLabel } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function ProfessorPage(){
 const user = await requireUser(["TEACHER", "ADMIN"]);
 const teacherId = user.role === "TEACHER" ? user.id : undefined;
 const feedbacks = await prisma.classFeedback.findMany({ where: teacherId ? { teacherId } : undefined, orderBy: { createdAt: "desc" }, include: { teacher: { select: { name: true } } } });
 const total = feedbacks.length;
 const avgUnderstanding = total ? (feedbacks.reduce((s,f)=>s+f.contentUnderstood,0)/total).toFixed(1) : "0";
 const avgClarity = total ? (feedbacks.reduce((s,f)=>s+f.clarity,0)/total).toFixed(1) : "0";
 const examples = total ? Math.round(feedbacks.filter(f=>f.needMoreExamples).length/total*100) : 0;
 const paceCounts = feedbacks.reduce<Record<string, number>>((acc,f)=>{acc[f.classPace]=(acc[f.classPace]||0)+1; return acc;},{});
 const topPace = Object.entries(paceCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || "GOOD";
 const topics = feedbacks.filter(f=>f.confusingTopic).slice(0,8);
 return (
  <main className="page-shell">
    <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">Painel do professor</p><h1 className="page-title mt-2">Radar das aulas</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600">Dados agregados e comentários anônimos para entender pontos fortes e pontos que precisam de reforço.</p></div><Badge value={topPace}>Ritmo: {paceLabel(topPace)}</Badge></section>
    <section className="mt-6 grid gap-5 md:grid-cols-4"><StatCard title="Feedbacks" value={total} icon={MessageSquareText}/><StatCard title="Entendimento" value={avgUnderstanding} icon={Star}/><StatCard title="Clareza" value={avgClarity} icon={TrendingUp}/><StatCard title="Pedem exemplos" value={`${examples}%`} icon={Percent}/></section>
    <section className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><Card><h2 className="text-xl font-black text-blue-950">Ritmo mais citado</h2><div className="mt-4"><Badge value={topPace}>{paceLabel(topPace)}</Badge></div>{Object.entries(paceCounts).map(([pace,count])=><div key={pace} className="mt-4"><div className="flex justify-between text-sm font-black"><span>{paceLabel(pace)}</span><span>{count}</span></div><div className="mt-2 h-3 rounded-full bg-blue-50"><div className="h-3 rounded-full bg-blue-700" style={{ width: `${total ? count/total*100 : 0}%` }}/></div></div>)}</Card><Card><h2 className="text-xl font-black text-blue-950">Tópicos confusos</h2><div className="mt-4 flex flex-wrap gap-2">{topics.length ? topics.map(t => <span key={t.id} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-black text-blue-700">{t.confusingTopic}</span>) : <p className="text-slate-500">Nenhum tópico registrado.</p>}</div></Card></section>
    <Card className="mt-6"><h2 className="text-xl font-black text-blue-950">Comentários anônimos</h2><div className="mt-4 grid gap-3">{feedbacks.filter(f=>f.comment).map(f => <div key={f.id} className="rounded-3xl border border-blue-100 bg-blue-50/50 p-4"><div className="flex flex-wrap gap-2"><Badge value={f.classPace}>{paceLabel(f.classPace)}</Badge>{user.role === "ADMIN" && <span className="text-xs font-black text-slate-500">Professor: {f.teacher.name}</span>}</div><p className="mt-2 text-sm leading-6 text-slate-700">{f.comment}</p></div>)}{!feedbacks.some(f=>f.comment) && <p className="text-slate-500">Sem comentários ainda.</p>}</div></Card>
  </main>
 );
}
