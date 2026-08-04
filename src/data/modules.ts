import { site } from "@/lib/site";

export interface ModuleItem {
  number: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

export const modules: ModuleItem[] = [
  {
    number: "01",
    title: "Presença & Consciência Corporal",
    description:
      "O primeiro passo da jornada: habitar o próprio corpo. Práticas guiadas para trazer você de volta ao instante presente e ao território mais íntimo — você mesma.",
    benefits: [
      "Escuta corporal profunda",
      "Respiração consciente",
      "Fim do piloto automático",
    ],
    image: site.images.modules[0],
  },
  {
    number: "02",
    title: "Energia Feminina & Ciclos",
    description:
      "Compreenda o próprio ritmo. Aprenda a fluir com as fases da sua energia através da sabedoria da Medicina Chinesa e do feminino cíclico.",
    benefits: [
      "Autoconhecimento cíclico",
      "Equilíbrio hormonal e emocional",
      "Reconexão com sua natureza",
    ],
    image: site.images.modules[1],
  },
  {
    number: "03",
    title: "Movimento & Potência Interior",
    description:
      "Práticas de movimento consciente que despertam vitalidade, expressão e a força feminina que já existe em você.",
    benefits: [
      "Desbloqueio energético",
      "Corpo mais leve e presente",
      "Expressão autêntica",
    ],
    image: site.images.modules[2],
  },
  {
    number: "04",
    title: "Mindfulness & Ritual Diário",
    description:
      "Integre a jornada na sua rotina. Rituais curtos, poderosos e permanentes para transformar a maneira como você começa e termina os seus dias.",
    benefits: [
      "Rotina de autocuidado real",
      "Menos ansiedade, mais foco",
      "Presença que se sustenta",
    ],
    image: site.images.modules[3],
  },
];
