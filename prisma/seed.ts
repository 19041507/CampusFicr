import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);
  const admin = await prisma.user.upsert({ where: { email: "admin@campus.com" }, update: {}, create: { name: "Administrador Campus", email: "admin@campus.com", passwordHash, role: "ADMIN", course: "Gestão" } });
  const professor = await prisma.user.upsert({ where: { email: "professor@campus.com" }, update: {}, create: { name: "Professor Radar", email: "professor@campus.com", passwordHash, role: "TEACHER", course: "Tecnologia" } });
  const aluno = await prisma.user.upsert({ where: { email: "aluno@campus.com" }, update: {}, create: { name: "Aluno Teste", email: "aluno@campus.com", passwordHash, role: "STUDENT", course: "Sistemas de Informação" } });

  const locations = [
    ["Biblioteca", "Estudo", "Espaço para leitura, empréstimo de livros e computadores de pesquisa.", "A", "1"],
    ["Secretaria", "Serviço", "Atendimento de documentos, matrícula e informações acadêmicas.", "A", "Térreo"],
    ["Coordenação", "Serviço", "Sala da coordenação dos cursos e suporte aos alunos.", "A", "2"],
    ["Laboratório de Informática 1", "Laboratório", "Laboratório para aulas práticas de programação.", "B", "1"],
    ["Laboratório de Informática 2", "Laboratório", "Laboratório para projetos e atividades em grupo.", "B", "2"],
    ["Sala 101", "Sala", "Sala de aula próxima à entrada principal.", "A", "1"],
    ["Sala 204", "Sala", "Sala de aula no segundo andar.", "A", "2"],
    ["Cantina", "Alimentação", "Área de alimentação e convivência dos alunos.", "B", "Térreo"],
    ["Auditório", "Evento", "Local para palestras, apresentações e eventos acadêmicos.", "B", "Térreo"],
    ["Banheiro térreo", "Serviço", "Banheiro próximo à recepção.", "A", "Térreo"],
    ["Bloco A", "Bloco", "Prédio principal com secretaria, salas e biblioteca.", "A", "Todos"],
    ["Bloco B", "Bloco", "Prédio dos laboratórios, auditório e cantina.", "B", "Todos"]
  ];
  for (const [name, type, description, block, floor] of locations) {
    const loc = await prisma.campusLocation.upsert({ where: { id: `seed-${name.toLowerCase().replace(/\s+/g, "-")}` }, update: {}, create: { id: `seed-${name.toLowerCase().replace(/\s+/g, "-")}`, name, type, description, block, floor } });
    await prisma.campusLocation.update({ where: { id: loc.id }, data: { qrCode: `/mapa/local/${loc.id}` } });
  }

  if (await prisma.lostFoundItem.count() === 0) {
    await prisma.lostFoundItem.createMany({ data: [
      { title: "Mochila preta", description: "Mochila com caderno e estojo, perdida perto da biblioteca.", category: "Mochila", status: "LOST", location: "Biblioteca", contact: "(81) 99999-0000", userId: aluno.id },
      { title: "Carteira marrom", description: "Carteira encontrada na cantina e deixada com o responsável.", category: "Documento", status: "FOUND", location: "Cantina", contact: "secretaria@campus.com", userId: admin.id },
      { title: "Garrafa azul", description: "Garrafa devolvida ao dono após contato.", category: "Garrafa", status: "RETURNED", location: "Sala 204", contact: "professor@campus.com", userId: professor.id }
    ] });
  }

  if (await prisma.classFeedback.count() === 0) {
    await prisma.classFeedback.createMany({ data: [
      { teacherId: professor.id, className: "Programação", subject: "Funções", contentUnderstood: 4, classPace: "GOOD", needMoreExamples: false, clarity: 5, confusingTopic: "Parâmetros", comment: "A aula foi clara e os exemplos ajudaram." },
      { teacherId: professor.id, className: "Banco de Dados", subject: "Relacionamentos", contentUnderstood: 3, classPace: "FAST", needMoreExamples: true, clarity: 3, confusingTopic: "Cardinalidade", comment: "Poderia ter mais exercícios práticos." },
      { teacherId: professor.id, className: "Web", subject: "Rotas", contentUnderstood: 5, classPace: "GOOD", needMoreExamples: false, clarity: 4, confusingTopic: null, comment: "Gostei da explicação." }
    ] });
  }
}
main().finally(async () => prisma.$disconnect());
