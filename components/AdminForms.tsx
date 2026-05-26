"use client";
import { useFormState } from "react-dom";
import { createLocation } from "@/lib/actions";
import { SubmitButton } from "./SubmitButton";
const initial = { error: "", success: "" };
export function LocationForm() {
 const [state, action] = useFormState(createLocation, initial);
 return <form action={action} className="grid gap-3 md:grid-cols-2"><div><label className="label">Nome</label><input className="input" name="name" required /></div><div><label className="label">Tipo</label><input className="input" name="type" placeholder="Serviço, Sala, Laboratório" required /></div><div><label className="label">Bloco</label><input className="input" name="block" /></div><div><label className="label">Andar</label><input className="input" name="floor" /></div><div className="md:col-span-2"><label className="label">Descrição</label><textarea className="input min-h-24" name="description" required /></div>{state?.error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700 md:col-span-2">{state.error}</p>}{state?.success && <p className="rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 md:col-span-2">{state.success}</p>}<SubmitButton>Cadastrar local</SubmitButton></form>;
}
