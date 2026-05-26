import { Radar } from "lucide-react";
import { Card } from "@/components/Card";
import { FeedbackForm } from "@/components/FeedbackForm";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export default async function FeedbackPage(){ await requireUser(); const teachers = await prisma.user.findMany({ where: { role: "TEACHER" }, select: { id: true, name: true }, orderBy: { name: "asc" } }); return <main className="mx-auto max-w-4xl px-4 py-8"><div className="mb-6 rounded-[2rem] bg-gradient-to-br from-violet-600 to-blue-700 p-6 text-white"><Radar size={34}/><h1 className="mt-4 text-4xl font-black">Professor Radar</h1><p className="mt-2 text-violet-50">Envie feedback anônimo para melhorar as aulas. O professor não vê seu nome.</p></div><Card>{teachers.length ? <FeedbackForm teachers={teachers}/> : <p>Nenhum professor cadastrado ainda.</p>}</Card></main>; }
