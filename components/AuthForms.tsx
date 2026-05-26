"use client";
import { useFormState } from "react-dom";
import Link from "next/link";
import { loginUser, registerUser } from "@/lib/actions";
import { SubmitButton } from "./SubmitButton";

const initial: { error?: string; success?: string } = {};

export function LoginForm() {
  const [state, action] = useFormState(loginUser, initial);
  return (
    <form action={action} className="space-y-4">
      <div><label className="label">E-mail</label><input className="input" name="email" type="email" placeholder="aluno@campus.com" required /></div>
      <div><label className="label">Senha</label><input className="input" name="password" type="password" placeholder="123456" required /></div>
      {state?.error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-black text-red-700">{state.error}</p>}
      <SubmitButton className="w-full">Entrar</SubmitButton>
      <p className="text-center text-sm text-slate-500">Não tem conta? <Link className="font-black text-blue-700 hover:text-blue-900" href="/cadastro">Cadastre-se</Link></p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action] = useFormState(registerUser, initial);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2"><div><label className="label">Nome</label><input className="input" name="name" required /></div><div><label className="label">E-mail</label><input className="input" name="email" type="email" required /></div></div>
      <div className="grid gap-4 md:grid-cols-2"><div><label className="label">Senha</label><input className="input" name="password" type="password" minLength={6} required /></div><div><label className="label">Tipo</label><select className="input" name="role" defaultValue="STUDENT"><option value="STUDENT">Aluno</option><option value="TEACHER">Professor</option><option value="ADMIN">Admin</option></select></div></div>
      <div><label className="label">Curso</label><input className="input" name="course" placeholder="Ex.: Sistemas de Informação" /></div>
      {state?.error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-black text-red-700">{state.error}</p>}
      <SubmitButton className="w-full">Criar conta</SubmitButton>
      <p className="text-center text-sm text-slate-500">Já tem conta? <Link className="font-black text-blue-700 hover:text-blue-900" href="/login">Entrar</Link></p>
    </form>
  );
}
