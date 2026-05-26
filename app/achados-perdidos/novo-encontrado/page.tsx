import { SearchCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { ItemForm } from "@/components/ItemForm";
import { requireUser } from "@/lib/auth";

export default async function NovoEncontradoPage(){
  await requireUser();
  return <main className="page-shell max-w-4xl"><Card className="p-6 md:p-8"><div className="mb-6 flex gap-4"><span className="rounded-2xl bg-blue-50 p-3 text-blue-700"><SearchCheck /></span><div><h1 className="text-3xl font-black text-blue-950">Cadastrar objeto encontrado</h1><p className="mt-2 text-slate-600">Informe onde encontrou e como o dono pode entrar em contato.</p></div></div><ItemForm status="FOUND"/></Card></main>;
}
