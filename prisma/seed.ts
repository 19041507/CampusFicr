import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);
  const admin = await prisma.user.upsert({ where: { email: "admin@campus.com" }, update: {}, create: { name: "Administrador Campus", email: "admin@campus.com", passwordHash, role: "ADMIN", course: "Gestão" } });
  const professor = await prisma.user.upsert({ where: { email: "professor@campus.com" }, update: {}, create: { name: "Professor Radar", email: "professor@campus.com", passwordHash, role: "TEACHER", course: "Tecnologia" } });
  const aluno = await prisma.user.upsert({ where: { email: "aluno@campus.com" }, update: {}, create: { name: "Aluno Teste", email: "aluno@campus.com", passwordHash, role: "STUDENT", course: "Sistemas de Informação" } });

  const locations: Array<{ name: string; type: string; description: string; block: string }> = [
    { name: "Biblioteca", type: "Estudo", description: "Espaço para leitura, empréstimo de livros e computadores de pesquisa.", block: "A" },
    { name: "Secretaria", type: "Serviço", description: "Atendimento de documentos, matrícula e informações acadêmicas.", block: "A" },
    { name: "Coordenação", type: "Serviço", description: "Sala da coordenação dos cursos e suporte aos alunos.", block: "A" },
    { name: "Laboratório de Informática 1", type: "Laboratório", description: "Laboratório para aulas práticas de programação.", block: "B" },
    { name: "Laboratório de Informática 2", type: "Laboratório", description: "Laboratório para projetos e atividades em grupo.", block: "B" },
    { name: "Sala 101", type: "Sala", description: "Sala de aula próxima à entrada principal.", block: "A" },
    { name: "Sala 204", type: "Sala", description: "Sala de aula no campus.", block: "A" },
    { name: "Cantina", type: "Alimentação", description: "Área de alimentação e convivência dos alunos.", block: "B" },
    { name: "Auditório", type: "Evento", description: "Local para palestras, apresentações e eventos acadêmicos.", block: "B" },
    { name: "Banheiro principal", type: "Serviço", description: "Banheiro próximo à recepção no campus.", block: "A" },
    { name: "Bloco A", type: "Bloco", description: "Prédio principal com secretaria, salas e biblioteca.", block: "A" },
    { name: "Bloco B", type: "Bloco", description: "Prédio dos laboratórios, auditório e cantina.", block: "B" }
  ];

  for (const location of locations) {
    const slug = location.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const loc = await prisma.campusLocation.upsert({
      where: { id: `seed-${slug}` },
      update: {},
      create: {
        id: `seed-${slug}`,
        name: location.name,
        type: location.type,
        description: location.description,
        block: location.block,
        floor: null
      }
    });
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
