export function required(value: FormDataEntryValue | null) { return String(value || "").trim(); }
export function asInt(value: FormDataEntryValue | null, fallback = 1) { const n = Number(value); return Number.isFinite(n) ? n : fallback; }
export function safeUrl(value: FormDataEntryValue | null) { const text = required(value); return text.length > 0 ? text : null; }
