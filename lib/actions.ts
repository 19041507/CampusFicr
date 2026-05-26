"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { ClassPace, ItemStatus, Role } from "@prisma/client";
import { prisma } from "./prisma";
import { asInt, required, safeUrl } from "./validations";
import { clearSession, requireUser, setSession } from "./auth";

export async function registerUser(_: unknown, formData: FormData) {
  const name = required(formData.get("name"));
  const email = required(formData.get("email")).toLowerCase();
  const password = required(formData.get("password"));
  const course = required(formData.get("course"));
  const role = (required(formData.get("role")) || "STUDENT") as Role;
  if (!name || !email || !password) return { error: "Preencha nome, e-mail e senha." };
  if (password.length < 6) return { error: "A senha precisa ter pelo menos 6 caracteres." };
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: "Este e-mail já está cadastrado." };
  const user = await prisma.user.create({ data: { name, email, course: course || null, role, passwordHash: await bcrypt.hash(password, 10) } });
  setSession({ id: user.id, role: user.role });
  redirect(user.role === "ADMIN" ? "/admin" : user.role === "TEACHER" ? "/professor" : "/dashboard");
}

export async function loginUser(_: unknown, formData: FormData) {
  const email = required(formData.get("email")).toLowerCase();
  const password = required(formData.get("password"));
  if (!email || !password) return { error: "Informe e-mail e senha." };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return { error: "E-mail ou senha inválidos." };
  setSession({ id: user.id, role: user.role });
  redirect(user.role === "ADMIN" ? "/admin" : user.role === "TEACHER" ? "/professor" : "/dashboard");
}

export async function logoutUser() { clearSession(); redirect("/"); }

export async function createLocation(_: unknown, formData: FormData) {
  await requireUser(["ADMIN"]);
  const name = required(formData.get("name"));
  const type = required(formData.get("type"));
  const description = required(formData.get("description"));
  if (!name || !type || !description) return { error: "Preencha nome, tipo e descrição." };
  const location = await prisma.campusLocation.create({ data: { name, type, description, floor: required(formData.get("floor")) || null, block: required(formData.get("block")) || null } });
  await prisma.campusLocation.update({ where: { id: location.id }, data: { qrCode: `/mapa/local/${location.id}` } });
  revalidatePath("/admin"); revalidatePath("/mapa");
  return { success: "Local cadastrado com sucesso." };
}

export async function createLostFoundItem(status: ItemStatus, _: unknown, formData: FormData) {
  const user = await requireUser();
  const title = required(formData.get("title"));
  const description = required(formData.get("description"));
  const category = required(formData.get("category"));
  const location = required(formData.get("location"));
  const contact = required(formData.get("contact"));
  if (!title || !description || !category || !location || !contact) return { error: "Preencha todos os campos obrigatórios." };
  await prisma.lostFoundItem.create({ data: { title, description, category, location, contact, status, imageUrl: safeUrl(formData.get("imageUrl")), userId: user.id } });
  revalidatePath("/achados-perdidos"); revalidatePath("/dashboard"); revalidatePath("/admin");
  redirect("/achados-perdidos");
}

export async function markReturned(formData: FormData) {
  await requireUser(["ADMIN"]);
  const id = required(formData.get("id"));
  if (id) await prisma.lostFoundItem.update({ where: { id }, data: { status: "RETURNED" } });
  revalidatePath("/admin"); revalidatePath("/achados-perdidos");
}

export async function createFeedback(_: unknown, formData: FormData) {
  await requireUser(["STUDENT", "ADMIN"]);
  const teacherId = required(formData.get("teacherId"));
  const className = required(formData.get("className"));
  const subject = required(formData.get("subject"));
  if (!teacherId || !className || !subject) return { error: "Professor, aula e assunto são obrigatórios." };
  await prisma.classFeedback.create({ data: {
    teacherId, className, subject,
    contentUnderstood: Math.min(5, Math.max(1, asInt(formData.get("contentUnderstood"), 3))),
    classPace: (required(formData.get("classPace")) || "GOOD") as ClassPace,
    needMoreExamples: required(formData.get("needMoreExamples")) === "true",
    clarity: Math.min(5, Math.max(1, asInt(formData.get("clarity"), 3))),
    confusingTopic: required(formData.get("confusingTopic")) || null,
    comment: required(formData.get("comment")) || null
  } });
  revalidatePath("/professor");
  return { success: "Feedback enviado de forma anônima." };
}
