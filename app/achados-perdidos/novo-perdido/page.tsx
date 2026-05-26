import { AlertCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { ItemForm } from "@/components/ItemForm";
import { requireUser } from "@/lib/auth";

export default async function NovoPerdidoPage(){
  await requireUser();
  return <main className="page-shell max-w-4xl"><Card className="p-6 md:p-8"><div className="mb-6 flex gap-4"><span className="rounded-2xl bg-orange-50 p-3 text-orange-600"><AlertCircle /></span><div><h1 className="text-3xl font-black text-blue-950">Cadastrar objeto perdido</h1><p className="mt-2 text-slate-600">Preencha os dados para que outros alunos possam ajudar a encontrar.</p></div></div><ItemForm status="LOST"/></Card></main>;
}
