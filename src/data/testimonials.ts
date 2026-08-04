import t1 from "@/assets/t1.jpg";
import t3 from "@/assets/t3.jpg";
import t4 from "@/assets/t4.jpg";
import t5 from "@/assets/t5.jpg";

export interface Testimonial {
  name: string;
  location?: string;
  photo: string;
  highlight: string;
  quote: string;
  rating: number;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marina S.",
    location: "São Paulo, SP",
    photo: t1,
    highlight: "Voltei a me sentir viva",
    quote:
      "Eu não sabia o quanto estava desconectada de mim. A Jornada me devolveu presença, leveza e uma alegria que eu tinha esquecido que existia.",
    rating: 5,
    verified: true,
  },
  {
    name: "Beatriz L.",
    location: "Rio de Janeiro, RJ",
    photo: t3,
    highlight: "Minha ansiedade diminuiu de verdade",
    quote:
      "Testei terapias, apps, livros. Nada me deu o que a Jornada da Jamilly deu: um jeito real de habitar o meu corpo todos os dias.",
    rating: 5,
    verified: true,
  },
  {
    name: "Camila R.",
    location: "Florianópolis, SC",
    photo: t4,
    highlight: "Autoestima em outro nível",
    quote:
      "Foi como reencontrar uma versão de mim que eu havia deixado para trás. Hoje eu me olho no espelho com respeito e ternura.",
    rating: 5,
    verified: true,
  },
  {
    name: "Ana P.",
    location: "Belo Horizonte, MG",
    photo: t5,
    highlight: "Presença que mudou meus relacionamentos",
    quote:
      "Meu marido percebeu antes de eu perceber. A qualidade da minha presença mudou — em casa, no trabalho e comigo mesma.",
    rating: 5,
    verified: true,
  },
  {
    name: "Luiza M.",
    location: "Curitiba, PR",
    photo: t1,
    highlight: "Rotina de autocuidado real",
    quote:
      "Pela primeira vez consegui manter uma prática diária. Os rituais são curtos e cabem em qualquer semana caótica.",
    rating: 5,
    verified: true,
  },
  {
    name: "Fernanda G.",
    location: "Porto Alegre, RS",
    photo: t3,
    highlight: "Reconexão com a força feminina",
    quote:
      "Descobri um poder tranquilo dentro de mim. Não é motivação de rede social — é presença de raiz.",
    rating: 5,
    verified: true,
  },
];
