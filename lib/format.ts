export function dateBR(date: Date) { return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date); }
export function statusLabel(status: string) { return { LOST: "Perdido", FOUND: "Encontrado", RETURNED: "Devolvido" }[status] || status; }
export function roleLabel(role: string) { return { STUDENT: "Aluno", TEACHER: "Professor", ADMIN: "Admin" }[role] || role; }
export function paceLabel(pace: string) { return { SLOW: "Lento", GOOD: "Bom", FAST: "Rápido" }[pace] || pace; }
