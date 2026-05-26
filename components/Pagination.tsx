import Link from "next/link";

type SearchValue = string | string[] | undefined;
type PaginationProps = { currentPage: number; totalPages: number; basePath: string; searchParams?: Record<string, SearchValue>; pageParam?: string; };

function buildHref(basePath: string, searchParams: Record<string, SearchValue>, pageParam: string, page: number) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => { if (!value || key === pageParam) return; if (Array.isArray(value)) { value.forEach((item) => item && params.append(key, item)); return; } params.set(key, value); });
  if (page > 1) params.set(pageParam, String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {}, pageParam = "page" }: PaginationProps) {
  if (totalPages <= 1) return null;
  const safeCurrent = Math.min(Math.max(currentPage, 1), totalPages);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => page === 1 || page === totalPages || Math.abs(page - safeCurrent) <= 1);
  return (
    <nav className="mt-8 flex flex-col items-center justify-between gap-3 rounded-[1.75rem] border border-blue-100 bg-white p-4 shadow-sm md:flex-row">
      <p className="text-sm font-black text-slate-500">Página <span className="text-blue-700">{safeCurrent}</span> de <span className="text-blue-700">{totalPages}</span></p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link aria-disabled={safeCurrent === 1} className={`rounded-2xl px-4 py-2 text-sm font-black transition ${safeCurrent === 1 ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`} href={buildHref(basePath, searchParams, pageParam, safeCurrent - 1)}>Anterior</Link>
        {pages.map((page, index) => { const previous = pages[index - 1]; const showDots = previous && page - previous > 1; return <span key={page} className="flex items-center gap-2">{showDots && <span className="px-1 text-slate-400">...</span>}<Link className={`h-10 min-w-10 rounded-2xl px-3 text-center text-sm font-black leading-10 transition ${page === safeCurrent ? "bg-blue-700 text-white shadow-sm" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`} href={buildHref(basePath, searchParams, pageParam, page)}>{page}</Link></span>; })}
        <Link aria-disabled={safeCurrent === totalPages} className={`rounded-2xl px-4 py-2 text-sm font-black transition ${safeCurrent === totalPages ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-blue-700 text-white hover:bg-blue-800"}`} href={buildHref(basePath, searchParams, pageParam, safeCurrent + 1)}>Próxima</Link>
      </div>
    </nav>
  );
}
