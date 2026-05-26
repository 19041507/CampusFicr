"use client";
import { useFormState } from "react-dom";
import type { ItemStatus } from "@prisma/client";
import { createLostFoundItem } from "@/lib/actions";
import { SubmitButton } from "./SubmitButton";
const initial = { error: "", success: "" };
export function ItemForm({ status }: { status: ItemStatus }) {
  const [state, action] = useFormState(createLostFoundItem.bind(null, status), initial);
  const isLost = status === "LOST";
  return <form action={action} className="space-y-4"><div><label className="label">Título</label><input className="input" name="title" placeholder={isLost ? "Ex.: Perdi uma mochila preta" : "Ex.: Encontrei uma carteira"} required /></div><div><label className="label">Descrição</label><textarea className="input min-h-28" name="description" required /></div><div className="grid gap-4 md:grid-cols-2"><div><label className="label">Categoria</label><input className="input" name="category" placeholder="Documento, mochila, celular..." required /></div><div><label className="label">Local</label><input className="input" name="location" placeholder={isLost ? "Onde perdeu" : "Onde encontrou"} required /></div></div><div><label className="label">Contato</label><input className="input" name="contact" placeholder="WhatsApp ou e-mail" required /></div><div><label className="label">Imagem opcional por URL</label><input className="input" name="imageUrl" type="url" placeholder="https://..." /></div>{state?.error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{state.error}</p>}<SubmitButton>{isLost ? "Cadastrar perdido" : "Cadastrar encontrado"}</SubmitButton></form>;
}
