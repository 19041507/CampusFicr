import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

let setupPromise: Promise<void> | null = null;

async function run(sql: string) {
  await prisma.$executeRawUnsafe(sql);
}

export async function ensureDatabaseReady() {
  if (setupPromise) return setupPromise;

  setupPromise = (async () => {
    await run(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');
      END IF;
    END $$;`);

    await run(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ItemStatus') THEN
        CREATE TYPE "ItemStatus" AS ENUM ('LOST', 'FOUND', 'RETURNED');
      END IF;
    END $$;`);

    await run(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ClassPace') THEN
        CREATE TYPE "ClassPace" AS ENUM ('SLOW', 'GOOD', 'FAST');
      END IF;
    END $$;`);

    await run(`CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "passwordHash" TEXT NOT NULL,
      "role" "Role" NOT NULL DEFAULT 'STUDENT',
      "course" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    await run(`CREATE TABLE IF NOT EXISTS "CampusLocation" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "floor" TEXT,
      "block" TEXT,
      "qrCode" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    await run(`CREATE TABLE IF NOT EXISTS "LostFoundItem" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "status" "ItemStatus" NOT NULL,
      "location" TEXT NOT NULL,
      "contact" TEXT NOT NULL,
      "imageUrl" TEXT,
      "userId" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    await run(`CREATE TABLE IF NOT EXISTS "ClassFeedback" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "teacherId" TEXT NOT NULL,
      "className" TEXT NOT NULL,
      "subject" TEXT NOT NULL,
      "contentUnderstood" INTEGER NOT NULL,
      "classPace" "ClassPace" NOT NULL,
      "needMoreExamples" BOOLEAN NOT NULL,
      "clarity" INTEGER NOT NULL,
      "confusingTopic" TEXT,
      "comment" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    await run(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'LostFoundItem_userId_fkey') THEN
        ALTER TABLE "LostFoundItem" ADD CONSTRAINT "LostFoundItem_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
    END $$;`);

    await run(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ClassFeedback_teacherId_fkey') THEN
        ALTER TABLE "ClassFeedback" ADD CONSTRAINT "ClassFeedback_teacherId_fkey"
        FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
    END $$;`);

    const userCount = await prisma.user.count();
    if (userCount === 0) {
      const passwordHash = await bcrypt.hash("123456", 10);
      const [admin, teacher, student] = await Promise.all([
        prisma.user.create({ data: { name: "Administrador CampusFICR", email: "admin@campus.com", passwordHash, role: "ADMIN", course: "Gestão Acadêmica" } }),
        prisma.user.create({ data: { name: "Professor Radar", email: "professor@campus.com", passwordHash, role: "TEACHER", course: "Sistemas de Informação" } }),
        prisma.user.create({ data: { name: "Aluno Teste", email: "aluno@campus.com", passwordHash, role: "STUDENT", course: "Sistemas de Informação" } })
      ]);

      const locations = await prisma.campusLocation.createMany({
        data: [
          { name: "Biblioteca", type: "Estudo", description: "Espaço para leitura, pesquisa e trabalhos em grupo.", block: "A", floor: "1º andar", qrCode: "/mapa/biblioteca" },
          { name: "Secretaria", type: "Atendimento", description: "Atendimento acadêmico, declarações e documentos.", block: "A", floor: "Térreo", qrCode: "/mapa/secretaria" },
          { name: "Coordenação", type: "Acadêmico", description: "Coordenação dos cursos e atendimento aos alunos.", block: "B", floor: "2º andar", qrCode: "/mapa/coordenacao" },
          { name: "Laboratório de Informática 1", type: "Laboratório", description: "Laboratório para aulas práticas e projetos.", block: "B", floor: "1º andar", qrCode: "/mapa/lab-1" },
          { name: "Laboratório de Informática 2", type: "Laboratório", description: "Ambiente para programação e atividades digitais.", block: "B", floor: "2º andar", qrCode: "/mapa/lab-2" },
          { name: "Sala 101", type: "Sala", description: "Sala de aula do primeiro andar.", block: "A", floor: "1º andar", qrCode: "/mapa/sala-101" },
          { name: "Sala 204", type: "Sala", description: "Sala de aula do segundo andar.", block: "A", floor: "2º andar", qrCode: "/mapa/sala-204" },
          { name: "Cantina", type: "Serviço", description: "Área de alimentação e convivência.", block: "C", floor: "Térreo", qrCode: "/mapa/cantina" },
          { name: "Auditório", type: "Evento", description: "Local para palestras, eventos e apresentações.", block: "C", floor: "Térreo", qrCode: "/mapa/auditorio" },
          { name: "Banheiro térreo", type: "Serviço", description: "Banheiros próximos à entrada principal.", block: "A", floor: "Térreo", qrCode: "/mapa/banheiro-terreo" },
          { name: "Bloco A", type: "Bloco", description: "Entrada principal, secretaria e salas.", block: "A", floor: "Todos", qrCode: "/mapa/bloco-a" },
          { name: "Bloco B", type: "Bloco", description: "Laboratórios e coordenação.", block: "B", floor: "Todos", qrCode: "/mapa/bloco-b" }
        ]
      });

      await prisma.lostFoundItem.createMany({
        data: [
          { title: "Garrafa azul", description: "Garrafa térmica azul esquecida perto da cantina.", category: "Garrafa", status: "FOUND", location: "Cantina", contact: "secretaria@campus.com", userId: student.id },
          { title: "Carteira preta", description: "Carteira perdida entre o Bloco A e a Biblioteca.", category: "Documento", status: "LOST", location: "Bloco A", contact: "aluno@campus.com", userId: student.id },
          { title: "Caderno de programação", description: "Caderno encontrado no Laboratório de Informática 1.", category: "Material escolar", status: "RETURNED", location: "Laboratório de Informática 1", contact: "professor@campus.com", userId: admin.id }
        ]
      });

      await prisma.classFeedback.createMany({
        data: [
          { teacherId: teacher.id, className: "Programação Web", subject: "Next.js e Prisma", contentUnderstood: 4, classPace: "GOOD", needMoreExamples: true, clarity: 4, confusingTopic: "Server Actions", comment: "A aula foi boa, mas poderia ter mais exemplos." },
          { teacherId: teacher.id, className: "Banco de Dados", subject: "Relacionamentos", contentUnderstood: 5, classPace: "GOOD", needMoreExamples: false, clarity: 5, confusingTopic: null, comment: "Explicação clara." },
          { teacherId: teacher.id, className: "Programação Web", subject: "Deploy na Vercel", contentUnderstood: 3, classPace: "FAST", needMoreExamples: true, clarity: 3, confusingTopic: "Variáveis de ambiente", comment: "O ritmo foi um pouco rápido." }
        ]
      });

      void locations;
    }
  })().catch((error) => {
    setupPromise = null;
    throw error;
  });

  return setupPromise;
}
