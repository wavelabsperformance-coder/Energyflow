import p1 from "@/assets/prints/print-1.jpeg";
import p2 from "@/assets/prints/print-2.jpeg";
import p3 from "@/assets/prints/print-3.jpeg";
import p4 from "@/assets/prints/print-4.jpeg";
import p5 from "@/assets/prints/print-5.jpeg";
import p6 from "@/assets/prints/print-6.jpeg";
import p7 from "@/assets/prints/print-7.jpeg";
import p8 from "@/assets/prints/print-8.jpeg";
import p9 from "@/assets/prints/print-9.jpeg";
import p10 from "@/assets/prints/print-10.jpeg";
import p11 from "@/assets/prints/print-11.jpeg";
import p12 from "@/assets/prints/print-12.jpeg";
import p13 from "@/assets/prints/print-13.jpeg";
import p14 from "@/assets/prints/print-14.jpeg";
import p15 from "@/assets/prints/print-15.jpeg";
import p16 from "@/assets/prints/print-16.jpeg";
import p17 from "@/assets/prints/print-17.jpeg";
import p18 from "@/assets/prints/print-18.jpeg";
import p19 from "@/assets/prints/print-19.jpeg";

export interface Print {
  url: string;
  alt: string;
}

const raw: Print[] = [
  { url: p1, alt: "Depoimento real de aluna no WhatsApp da Comunidade Empower" },
  { url: p2, alt: "Aluna terapeuta agradecendo a análise de perfil da Jamilly" },
  { url: p3, alt: "Aluna relatando mais motivação e autodesenvolvimento diário" },
  { url: p4, alt: "Mentora de branding elogiando a comunidade da Jamilly" },
  { url: p5, alt: "Aluna contando o impacto do conteúdo durante o autocuidado" },
  { url: p6, alt: "Nutricionista elogiando a análise de perfil recebida" },
  { url: p7, alt: "Depoimento de admiração pelo trabalho da Jamilly Pacheco" },
  { url: p8, alt: "Aluna dizendo que destravou a procrastinação com o método" },
  { url: p9, alt: "Aluna compartilhando conquista e despertar de prosperidade" },
  { url: p10, alt: "Aluna contando que a energia do grupo despertou vontade de se cuidar" },
  { url: p11, alt: "Aluna destacando o networking entre mulheres empreendedoras da comunidade" },
  { url: p12, alt: "Aluna dizendo que participar da comunidade foi uma das melhores escolhas" },
  { url: p13, alt: "Artista e mãe se apresentando e agradecendo por fazer parte do grupo" },
  { url: p14, alt: "Aluna ressignificando a maternidade e o retorno ao trabalho" },
  { url: p15, alt: "Aluna acompanhada pelos conteúdos da Jamilly se sentindo acolhida e inspirada" },
  { url: p16, alt: "Fotógrafa relatando visão simbólica de mulheres se apoiando" },
  { url: p17, alt: "Pedagoga agradecendo o convite e a iniciativa da comunidade" },
  { url: p18, alt: "Psicóloga celebrando o movimento de empoderamento feminino" },
  { url: p19, alt: "Mensagens de alunas celebrando a conexão dentro da comunidade" },
];

// remove duplicatas (mesma imagem enviada mais de uma vez)
export const prints: Print[] = raw.filter(
  (p, i) => raw.findIndex((o) => o.url === p.url) === i,
);
