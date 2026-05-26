"use client";

import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-[calc(100vh-82px)] place-items-center px-4 py-12">
      <section className="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-50 text-blue-700"><AlertTriangle size={30} /></span>
        <h1 className="mt-5 text-3xl font-black text-blue-950">Algo deu errado</h1>
        <p className="mt-3 leading-7 text-slate-600">Verifique se a <b>DATABASE_URL</b> da Vercel está apontando para o banco Neon correto. O sistema tenta preparar as tabelas automaticamente no primeiro uso.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => reset()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 font-black text-white shadow-soft transition hover:bg-blue-800"><RotateCcw size={18} /> Tentar novamente</button>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-5 py-3 font-black text-blue-800 transition hover:bg-blue-100"><Home size={18} /> Voltar ao início</Link>
        </div>
      </section>
    </main>
  );
}
