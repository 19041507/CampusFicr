export const dynamic = "force-dynamic";

import { CheckCircle2, Radar } from "lucide-react";
import { Card } from "@/components/Card";
import { FeedbackForm } from "@/components/FeedbackForm";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FeedbackPage(){
  await requireUser();
  const teachers = await prisma.user.findMany({ where: { role: "TEACHER" }, select: { id: true, name: true }, orderBy: { name: "asc" } });
  return (
    <main className="page-shell max-w-5xl">
      <section className="ficr-hero soft-grid rounded-[2rem] p-6 text-white shadow-soft md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div><span className="inline-flex rounded-2xl bg-white/15 p-3"><Radar size={34}/></span><h1 className="mt-4 text-4xl font-black">Professor Radar</h1><p className="mt-2 max-w-2xl text-blue-50">Envie feedback anônimo para melhorar as aulas. O professor não vê seu nome.</p></div>
          <div className="rounded-3xl bg-white/12 p-4 text-sm backdrop-blur"><p className="flex items-center gap-2 font-black"><CheckCircle2 size={16}/> Rápido e anônimo</p><p className="mt-1 text-blue-100">Leva menos de 1 minuto.</p></div>
        </div>
      </section>
      <Card className="mt-6 p-6 md:p-8">{teachers.length ? <FeedbackForm teachers={teachers}/> : <p>Nenhum professor cadastrado ainda.</p>}</Card>
    </main>
  );
}
