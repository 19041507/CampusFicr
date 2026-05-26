"use client";

import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 py-12">
      <section className="w-full max-w-xl rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-red-50 text-red-600">
          <AlertTriangle size={30} />
        </span>
        <h1 className="mt-5 text-3xl font-black text-slate-900">Algo deu errado</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Se isso aconteceu depois de cadastrar ou entrar, confira se a <b>DATABASE_URL</b> está correta na Vercel e se o comando <b>npx prisma db push</b> já foi executado no banco Neon.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => reset()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-soft transition hover:bg-blue-700">
            <RotateCcw size={18} /> Tentar novamente
          </button>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200">
            <Home size={18} /> Voltar ao início
          </Link>
        </div>
      </section>
    </main>
  );
}
