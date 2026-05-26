import { Card } from "@/components/Card";
import { ItemForm } from "@/components/ItemForm";
import { requireUser } from "@/lib/auth";
export default async function NovoPerdidoPage(){ await requireUser(); return <main className="mx-auto max-w-3xl px-4 py-8"><Card><h1 className="text-3xl font-black">Cadastrar objeto perdido</h1><p className="mb-6 mt-2 text-slate-600">Preencha os dados para outros alunos ajudarem a encontrar.</p><ItemForm status="LOST"/></Card></main>; }
