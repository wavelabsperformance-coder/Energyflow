import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Star,
  ArrowRight,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Infinity as InfinityIcon,
  Clock,
  Lock,
  ChevronUp,
  Instagram,
  Mail,
  MessageCircle,
  Plus,
  HelpCircle,
} from "lucide-react";
import { site, tickerPhrases } from "@/lib/site";
import { modules } from "@/data/modules";
import { prints } from "@/data/prints";
import { faq } from "@/data/faq";

/* ---------------- tracking ---------------- */
type WinWithDL = Window & { dataLayer?: Array<Record<string, unknown>> };
function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as WinWithDL;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}

/* ---------------- head ---------------- */
export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => {
    const title = "Jornada EnergyFlow — Reconexão, consciência e potência interior";
    const description =
      "Uma jornada 100% online de reconexão feminina com Jamilly Pacheco. Acesso vitalício, R$97,00, pagamento único, garantia de 7 dias.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "robots", content: "index,follow" },
      ],
      links: [{ rel: "canonical", href: "/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Jornada EnergyFlow",
            description,
            provider: { "@type": "Organization", name: "EnergyFlow" },
            instructor: { "@type": "Person", name: "Jamilly Pacheco" },
            offers: {
              "@type": "Offer",
              price: 47,
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: site.checkoutUrl,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "312",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
});

/* ---------------- reveal ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add("in-view");
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------------- scroll depth + page view ---------------- */
function useScrollDepth() {
  useEffect(() => {
    track("view_page");
    const marks = [25, 50, 75, 100];
    const fired = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement;
      const pct = Math.round(((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100);
      for (const m of marks) if (pct >= m && !fired.has(m)) { fired.add(m); track(`scroll_${m}`); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ---------------- primitives ---------------- */
function CTA({ children, source, className = "", full = false }: { children: React.ReactNode; source: string; className?: string; full?: boolean }) {
  return (
    <a
      href={site.checkoutUrl}
      target="_blank"
      rel="noopener"
      onClick={() => { track(source); track("checkout_click", { source }); }}
      className={`btn-primary group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold tracking-wide shadow-xl shadow-[color:var(--burgundy)]/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[color:var(--burgundy)]/40 active:scale-[0.98] ${full ? "w-full" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </a>
  );
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`group relative inline-flex items-center gap-2 rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
        dark
          ? "bg-white/10 text-[color:var(--rose)] border border-white/15 backdrop-blur-md shadow-inner"
          : "bg-gradient-to-r from-white/90 via-[color:var(--offpink)]/60 to-white/90 text-[color:var(--burgundy)] border border-[color:var(--burgundy)]/20 backdrop-blur-md shadow-md shadow-[color:var(--burgundy)]/5"
      }`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--rose)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--burgundy)]" />
      </span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">{children}</span>
    </span>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} de 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)] drop-shadow-sm" />
      ))}
    </div>
  );
}

/* ---------------- page ---------------- */
function LandingPage() {
  useReveal();
  useScrollDepth();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-[color:var(--burgundy)] selection:text-white">
      <Hero />
      <Ticker />
      <ParaQuem />
      <Transformar />
      <Mentora />
      <Modulos />
      <Incluso />
      <Diferenciais />
      <Depoimentos />
      <Garantia />
      <Investimento />
      <UltimaChamada />
      <Faq />
      <Footer />
      <FloatingWhats />
      <BackToTop />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoStarted, setVideoStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => {
      if (!videoStarted) {
        setVideoStarted(true);
        track("video_start");
      }
    };

    const onEnd = () => track("video_complete");

    v.addEventListener("play", onPlay);
    v.addEventListener("ended", onEnd);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("ended", onEnd);
    };
  }, [videoStarted]);

  const enableSound = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    v.volume = 1;
    v.play();

    setSoundEnabled(true);
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-white via-[color:var(--offpink)]/20 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[color:var(--rose)] opacity-40 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6">
        <div className="reveal flex items-center justify-center gap-2 sm:gap-4 max-w-full overflow-hidden">
          <span className="h-px w-8 sm:w-12 shrink bg-gradient-to-r from-transparent to-[color:var(--burgundy)]/40" />
          
          <div className="shrink-0 rounded-full p-0.5 bg-gradient-to-r from-[color:var(--burgundy)]/20 via-[color:var(--rose)] to-[color:var(--burgundy)]/20 shadow-sm">
            <Kicker>
              <span className="font-semibold">{site.product}</span>
              <span className="opacity-40">•</span>
              <span className="font-normal text-[color:var(--burgundy)]/80">{site.edition}</span>
            </Kicker>
          </div>

          <span className="h-px w-8 sm:w-12 shrink bg-gradient-to-l from-transparent to-[color:var(--burgundy)]/40" />
        </div>

        <div className="reveal mx-auto w-full max-w-4xl">
          <div className="group relative overflow-hidden rounded-3xl p-1.5 bg-gradient-to-b from-white via-white/40 to-[color:var(--rose)]/30 shadow-[0_32px_96px_-16px_rgba(107,15,36,0.3)] border border-white">
            <div className="relative overflow-hidden rounded-[22px]">
              <video
                ref={videoRef}
                className="aspect-video w-full object-cover"
                src={site.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--burgundy)]/20 via-transparent to-transparent" />

              {!soundEnabled && (
                <button
                  onClick={enableSound}
                  className="absolute inset-0 flex items-center justify-center bg-black/5 transition hover:bg-black/20"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[color:var(--burgundy)] shadow-xl transition transform group-hover:scale-105">
                    <VolumeX className="h-4 w-4 text-[color:var(--burgundy)]" /> Ativar Som
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="reveal mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-balance text-[color:var(--burgundy)] sm:text-6xl md:text-7xl">
            Uma jornada de <em className="italic font-normal text-[color:var(--burgundy)]">reconexão</em>,
            <br className="hidden sm:block" />
            consciência e potência interior.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Não são apenas aulas. É uma jornada de retorno para si mesma — 100%
            online, com acesso imediato e vitalício.
          </p>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-foreground/80">
            {[
              { icon: <Sparkles className="h-4 w-4" />, t: "100% Online" },
              { icon: <InfinityIcon className="h-4 w-4" />, t: "Acesso vitalício" },
              { icon: <Clock className="h-4 w-4" />, t: "Comece hoje" },
              { icon: <ShieldCheck className="h-4 w-4" />, t: "Garantia de 7 dias" },
            ].map((b) => (
              <li key={b.t} className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-1.5 shadow-sm border border-[color:var(--burgundy)]/10">
                <span className="text-[color:var(--burgundy)]">
                  {b.icon}
                </span>
                {b.t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3">
            <CTA source="cta_hero">
              Quero começar minha Jornada
            </CTA>

            <span className="text-xs font-medium text-muted-foreground/80 tracking-wide">
              Pagamento único de {site.price} • Sem mensalidade
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Ticker
function Ticker() {
  const items = [...tickerPhrases, ...tickerPhrases];

  return (
    <section
      aria-label="Manifesto"
      className="relative overflow-hidden border-y border-white/10 bg-[color:var(--burgundy)] py-4 text-white shadow-lg"
    >
      <div className="flex w-max animate-ticker whitespace-nowrap">
        {items.map((p, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 font-display text-lg italic tracking-wide text-white/90"
          >
            {p}
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--rose)]" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PARA QUEM É ---------------- */
function ParaQuem() {
  const items = [
    "Mulheres que sentem que se perderam de si no ritmo dos dias.",
    "Quem busca reconexão real — não conteúdo motivacional descartável.",
    "Quem sente ansiedade constante e quer voltar a habitar o corpo.",
    "Quem quer autoconhecimento com profundidade, sem espiritualidade rasa.",
    "Quem valoriza estética, sofisticação e prática de qualidade.",
    "Quem prefere aprender no próprio ritmo, com acesso vitalício.",
  ];
  return (
    <section className="bg-[color:var(--offpink)]/40 py-24 md:py-32 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20 items-start">
          <div className="reveal sticky top-10">
            <Kicker>Para quem é</Kicker>
            <h2 className="mt-6 font-display text-4xl leading-[1.15] text-[color:var(--burgundy)] sm:text-5xl">
              Feita para mulheres que desejam viver com mais presença — de dentro para fora.
            </h2>
          </div>
          <ul className="reveal grid gap-4 sm:grid-cols-2">
            {items.map((t, i) => (
              <li 
                key={i} 
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--burgundy)]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[color:var(--burgundy)]/30 hover:shadow-xl hover:shadow-[color:var(--burgundy)]/5 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-display text-2xl font-bold text-[color:var(--rose)] group-hover:text-[color:var(--burgundy)] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-pretty leading-relaxed text-foreground/85 font-medium text-sm sm:text-base">{t}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRANSFORMAR ---------------- */
function Transformar() {
  const before = ["Ruído mental constante", "Corpo em piloto automático", "Autoestima instável", "Ansiedade difusa"];
  const after = ["Clareza e foco", "Presença corporal", "Autoestima ancorada", "Equilíbrio emocional"];
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Kicker>O que você vai transformar</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Pequenas mudanças que reorganizam a maneira como você vive.
          </h2>
        </div>

        <div className="reveal mt-16 grid items-center gap-12 md:grid-cols-2">
          <div className="grid gap-6 sm:grid-cols-2 md:order-1">
            <div className="rounded-2xl border border-black/5 bg-stone-50 p-6">
              <p className="inline-block text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mb-4 pb-2 border-b border-black/10 w-full">
                Antes
              </p>
              <ul className="space-y-4">
                {before.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground/60">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/30 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[color:var(--burgundy)] bg-[color:var(--burgundy)] p-6 text-white shadow-xl shadow-[color:var(--burgundy)]/20">
              <p className="inline-block text-xs font-bold uppercase tracking-wider text-[color:var(--rose)] mb-4 pb-2 border-b border-white/15 w-full">
                Depois
              </p>
              <ul className="space-y-4">
                {after.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm font-semibold text-white">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--rose)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:order-2">
            <div className="relative p-2 rounded-3xl bg-gradient-to-b from-[color:var(--offpink)] to-white border border-[color:var(--burgundy)]/10 shadow-2xl">
              <img
                src={site.images.transform}
                alt="Mulher em estado de presença e serenidade"
                width={1400}
                height={1000}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MENTORA (Visual Reeditado) ---------------- */
function Mentora() {
  const especialidades = [
    { title: "Mindfulness", desc: "Atenção plena e presença" },
    { title: "Medicina Chinesa", desc: "Equilíbrio energético" },
    { title: "Terapias Integrativas", desc: "Cuidado holístico" },
    { title: "Consciência Corporal", desc: "Reconexão com o corpo" },
    { title: "Feminino Cíclico", desc: "Sabedoria das fases" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--offpink)]/60 via-white to-[color:var(--offpink)]/30 py-20 md:py-32 border-y border-[color:var(--burgundy)]/15">
      {/* Luz ambiente de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[color:var(--rose)]/35 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        
        {/* ================= LAYOUT MOBILE (< md) ================= */}
        <div className="flex flex-col gap-8 md:hidden">
          
          {/* 1. TÍTULO NOVO & MARCANTE */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--burgundy)]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--burgundy)] border border-[color:var(--burgundy)]/15 mb-3">
              <Sparkles className="h-3 w-3 text-[color:var(--burgundy)]" />
              <span>Sua Mentora & Condução</span>
            </div>

            <h2 className="font-display text-4xl font-normal leading-[1.05] text-[color:var(--burgundy)] tracking-tight">
              Jamilly Pacheco
            </h2>
            
            <div className="mt-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[color:var(--burgundy)]/40" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--burgundy)]/80">
                Especialista Integrativa
              </p>
            </div>
          </div>

          {/* 2. IMAGEM COM MOLDURA EDITORIAL */}
          <div className="reveal">
            <div className="relative mx-auto max-w-md">
              <div className="relative p-2.5 rounded-[28px] bg-white border border-[color:var(--burgundy)]/15 shadow-[0_25px_60px_-15px_rgba(107,15,36,0.18)]">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={site.images.mentora}
                    alt="Jamilly Pacheco, mentora da Jornada EnergyFlow"
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--burgundy)]/30 via-transparent to-transparent" />
                </div>

                {/* Badge no canto do card */}
                <div className="absolute -bottom-3 right-4 rounded-xl border border-[color:var(--burgundy)]/15 bg-white px-3.5 py-2 shadow-lg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--rose)] animate-pulse" />
                  <span className="font-display text-xs font-semibold text-[color:var(--burgundy)]">
                    EnergyFlow
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. TEXTO E BLOQUINHOS REESTILIZADOS */}
          <div className="reveal">
            <p className="text-base leading-relaxed text-foreground/85 font-normal">
              Especialista em consciência corporal, desenvolvimento feminino, mindfulness, Medicina Chinesa,
              massoterapia, terapias integrativas e energia — Jamilly criou a Jornada EnergyFlow para conduzir
              mulheres de volta ao próprio centro.
            </p>
            
            {/* BLOQUINHOS NOVO DESIGN */}
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--burgundy)]/60 mb-3">
                Pilares de Especialidade
              </p>
              
              <div className="grid gap-2.5 sm:grid-cols-2">
                {especialidades.map((e) => (
                  <div 
                    key={e.title}
                    className="flex items-center gap-3 rounded-2xl border border-[color:var(--burgundy)]/15 bg-white/90 p-3 shadow-sm"
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[color:var(--offpink)] text-[color:var(--burgundy)]">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[color:var(--burgundy)]">{e.title}</p>
                      <p className="text-[10px] text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================= LAYOUT DESKTOP (>= md) ================= */}
        <div className="hidden md:grid md:grid-cols-[1fr_1.2fr] md:gap-16 lg:gap-20 items-center">
          
          {/* FOTO DESKTOP */}
          <div className="reveal">
            <div className="relative">
              <div aria-hidden className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-[color:var(--burgundy)]/20 via-[color:var(--rose)]/30 to-transparent blur-lg" />
              
              <div className="relative p-3.5 rounded-[32px] bg-white border border-[color:var(--burgundy)]/15 shadow-[0_32px_80px_-16px_rgba(107,15,36,0.18)]">
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={site.images.mentora}
                    alt="Jamilly Pacheco, mentora da Jornada EnergyFlow"
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--burgundy)]/20 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-5 right-8 rounded-2xl border border-[color:var(--burgundy)]/15 bg-white px-5 py-3 shadow-2xl backdrop-blur-md flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-[color:var(--offpink)] text-[color:var(--burgundy)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-bold text-[color:var(--burgundy)]">
                      Método Exclusivo
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                      Jornada EnergyFlow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TEXTO DESKTOP */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--burgundy)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[color:var(--burgundy)] border border-[color:var(--burgundy)]/15 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--burgundy)]" />
              <span>Sua Mentora & Condução</span>
            </div>

            <h2 className="font-display text-5xl lg:text-6xl font-normal leading-[1.05] text-[color:var(--burgundy)] tracking-tight">
              Jamilly Pacheco
            </h2>
            
            <div className="mt-3 flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[color:var(--burgundy)]/30" />
              <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--burgundy)]/75">
                Especialista Integrativa & Consciência Corporal
              </p>
            </div>

            <p className="text-lg leading-relaxed text-foreground/85 font-normal">
              Especialista em consciência corporal, desenvolvimento feminino, mindfulness, Medicina Chinesa,
              massoterapia, terapias integrativas e energia — Jamilly criou a Jornada EnergyFlow para conduzir
              mulheres de volta ao próprio centro.
            </p>

            {/* BLOQUINHOS DESKTOP */}
            <div className="mt-8 pt-6 border-t border-[color:var(--burgundy)]/15">
              <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--burgundy)]/70 mb-4">
                Pilares da Mentoria
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {especialidades.map((e) => (
                  <div 
                    key={e.title}
                    className="flex items-center gap-3 rounded-2xl border border-[color:var(--burgundy)]/15 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[color:var(--burgundy)]/30 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--offpink)] text-[color:var(--burgundy)]">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[color:var(--burgundy)]">{e.title}</p>
                      <p className="text-[11px] text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------------- MÓDULOS ---------------- */
/* ---------------- MÓDULOS (Refatorado) ---------------- */
function Modulos() {
  return (
    <section id="modulos" className="bg-[color:var(--burgundy)] py-24 md:py-32 text-white shadow-2xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Kicker dark>A Jornada em 4 módulos</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
            Um percurso desenhado como um ritual.
          </h2>
        </div>
        <div className="mt-20 space-y-16">
          {modules.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={m.number} className="reveal rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12 backdrop-blur-md grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={flip ? "md:order-2" : ""}>
                  <div className="p-2 rounded-2xl bg-white/10 border border-white/10 shadow-2xl w-full">
                    <img
                      src={m.image}
                      alt={m.title}
                      width={1200}
                      height={1500}
                      loading="lazy"
                      className="w-full h-auto max-h-[500px] aspect-[4/5] rounded-xl object-contain md:object-cover"
                    />
                  </div>
                </div>
                <div className={flip ? "md:order-1" : ""}>
                  <span className="font-display text-5xl font-light text-[color:var(--rose)]">{m.number}</span>
                  <h3 className="mt-2 font-display text-3xl text-white sm:text-4xl">{m.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/80 font-light">{m.description}</p>
                  <ul className="mt-6 space-y-3">
                    {m.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm font-medium text-white/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--rose)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- INCLUSO ---------------- */
function Incluso() {
  const items = [
    { icon: <Sparkles className="h-5 w-5" />, t: "4 módulos completos" },
    { icon: <InfinityIcon className="h-5 w-5" />, t: "Acesso vitalício" },
    { icon: <Play className="h-5 w-5" />, t: "Práticas guiadas em vídeo" },
    { icon: <MessageCircle className="h-5 w-5" />, t: "Comunidade exclusiva" },
    { icon: <ArrowRight className="h-5 w-5" />, t: "Atualizações futuras inclusas" },
    { icon: <Clock className="h-5 w-5" />, t: "Acesso imediato após a compra" },
  ];
  return (
    <section className="bg-stone-50 py-24 md:py-32 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Kicker>O que está incluso</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Tudo o que você recebe ao entrar.
          </h2>
        </div>
        <ul className="reveal mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it.t} className="flex items-center gap-4 rounded-2xl border border-[color:var(--burgundy)]/10 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[color:var(--burgundy)] text-white shadow-md shadow-[color:var(--burgundy)]/20">
                {it.icon}
              </span>
              <span className="font-semibold text-foreground/90">{it.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- DIFERENCIAIS ---------------- */
function Diferenciais() {
  const items = [
    { t: "Método integrado", d: "Uma síntese rara entre Medicina Chinesa, mindfulness e consciência corporal." },
    { t: "Estética editorial", d: "Uma experiência com curadoria visual — porque presença também é ambiente." },
    { t: "No seu ritmo", d: "100% gravado. Você abre quando quer, quantas vezes quiser, para sempre." },
    { t: "Sem enrolação", d: "Nada de conteúdo motivacional descartável. Prática que se sustenta." },
  ];
  return (
    <section className="bg-gradient-to-br from-[color:var(--burgundy)] to-[#4A0A19] py-24 text-white md:py-32 shadow-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <Kicker dark>Diferenciais</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Por que esta jornada é diferente de tudo que você já conheceu.
          </h2>
        </div>
        <div className="reveal mt-16 grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <div key={it.t} className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[color:var(--rose)]">/ {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-2xl font-medium">{it.t}</h3>
              <p className="mt-3 text-white/80 leading-relaxed font-light">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DEPOIMENTOS ---------------- */
function Depoimentos() {
  const items = [...prints, ...prints];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; startLeft: number }>({
    active: false,
    startX: 0,
    startLeft: 0,
  });

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) track("testimonial_view");
    }, { threshold: 0.5 });
    const el = document.getElementById("depoimentos");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const speed = 40;

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (!pausedRef.current && !dragRef.current.active) {
          el.scrollLeft += speed * dt;
        }
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft <= 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.active) return;
    el.scrollLeft = dragRef.current.startLeft - (e.clientX - dragRef.current.startX);
  };
  const endDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <section id="depoimentos" className="overflow-hidden py-24 md:py-32 bg-[color:var(--offpink)]/20 border-b border-black/5">
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <Kicker>Depoimentos</Kicker>
        <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
          Mulheres que voltaram para si.
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Stars />
          <span className="text-sm font-semibold text-muted-foreground">4,9 • +300 alunas</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground/80">Prints reais, enviados por alunas na comunidade.</p>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; endDrag(); }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
        className="no-scrollbar mt-14 flex cursor-grab items-start gap-6 overflow-x-auto overscroll-x-contain px-6 active:cursor-grabbing py-4"
        style={{ touchAction: "pan-x pan-y" }}
      >
        {items.map((p, i) => (
          <figure
            key={i}
            className="w-[280px] shrink-0 select-none overflow-hidden rounded-3xl border border-[color:var(--burgundy)]/10 bg-white p-3 shadow-lg shadow-[color:var(--burgundy)]/5 sm:w-[330px] transition-transform hover:-translate-y-1"
          >
            <img
              src={p.url}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="pointer-events-none w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-2 px-1 pb-1">
              <span className="rounded-full bg-[color:var(--burgundy)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--burgundy)]">
                Cliente verificada
              </span>
              <Stars n={5} />
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 text-center">
        <CTA source="cta_middle">Quero começar minha Jornada</CTA>
      </div>
    </section>
  );
}

/* ---------------- GARANTIA ---------------- */
function Garantia() {
  return (
    <section className="bg-gradient-to-b from-white via-[color:var(--offpink)]/30 to-white py-20 border-b border-black/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal relative overflow-hidden rounded-[32px] border border-[color:var(--burgundy)]/20 bg-white p-8 md:p-12 shadow-2xl shadow-[color:var(--burgundy)]/10">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[color:var(--rose)]/30 blur-3xl" />
          
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12 relative z-10">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[color:var(--burgundy)] p-6 text-center text-white shadow-xl shadow-[color:var(--burgundy)]/25">
              <ShieldCheck className="h-12 w-12 text-[color:var(--rose)]" />
              <span className="font-display text-xl font-medium tracking-tight">7 Dias</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--rose)]">Garantidos</span>
            </div>

            <div>
              <Kicker>Garantia incondicional</Kicker>
              <h2 className="mt-3 font-display text-3xl text-[color:var(--burgundy)] sm:text-4xl">
                7 dias para sentir. Sem nenhum risco.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80 font-normal">
                Entre, assista aos vídeos, pratique e sinta o método em sua rotina. Se em até 7 dias você perceber que este ritual não é para você, devolvemos 100% do seu investimento sem complicações ou burocracia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- INVESTIMENTO ---------------- */
function Investimento() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) track("investment_view");
    }, { threshold: 0.4 });
    const el = document.getElementById("investimento");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="investimento" className="relative overflow-hidden bg-gradient-to-b from-[color:var(--offpink)]/40 via-white to-[color:var(--offpink)]/30 py-24 md:py-32 border-b border-black/5">
      <div className="mx-auto max-w-4xl px-6">
        <div className="reveal text-center">
          <Kicker>Investimento</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Um pagamento único. Uma jornada para a vida inteira.
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-md mx-auto">
            Acesso vitalício para você fazer no seu ritmo, quantas vezes desejar.
          </p>
        </div>

        <div className="reveal mt-12 overflow-hidden rounded-[36px] border border-[color:var(--burgundy)]/20 bg-white shadow-[0_40px_120px_-30px_rgba(107,15,36,0.3)]">
          <div className="bg-[color:var(--burgundy)] px-6 sm:px-8 py-10 text-center text-white relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--rose)] border border-white/20 mb-3">
              Oferta Especial
            </span>
            <p className="font-display text-3xl sm:text-4xl font-normal">Jornada EnergyFlow</p>
            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/80">
              Curso 100% Online • Acesso Vitalício • Suporte em Comunidade
            </p>
          </div>

          <div className="px-5 py-10 sm:px-14 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pagamento único de apenas</span>
            <div className="mt-2 flex items-center justify-center gap-1">
              <p className="font-display text-6xl font-normal text-[color:var(--burgundy)] sm:text-7xl">{site.price}</p>
            </div>
            
            {/* Texto em uma única linha no mobile */}
            <p className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 whitespace-nowrap overflow-hidden text-ellipsis">
              Sem mensalidades <span className="mx-0.5 sm:mx-1 text-[color:var(--rose)]">•</span> Sem cobranças recorrentes
            </p>

            <div className="my-8 sm:my-10 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            <ul className="mx-auto grid max-w-md gap-4 text-left">
              {[
                "Acesso vitalício e imediato a todo o conteúdo",
                "4 Módulos completos com práticas gravadas",
                "Comunidade exclusiva de alunas",
                "Garantia incondicional de 7 dias"
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm font-medium text-foreground/90">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--offpink)] text-[color:var(--burgundy)]">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              {/* Ajuste no botão para não quebrar texto no mobile */}
              <CTA source="cta_middle" full className="py-4 sm:py-5 text-sm sm:text-lg whitespace-nowrap px-4 sm:px-8">
                Garantir Meu Acesso Agora
              </CTA>
              
              <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-muted-foreground whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[color:var(--burgundy)] shrink-0" /> Ambiente 100% seguro
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--burgundy)] shrink-0" /> Hotmart
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ÚLTIMA CHAMADA (Refatorado) ---------------- */
function UltimaChamada() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--burgundy)] py-28 md:py-36 text-white shadow-2xl">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--rose)]/30 blur-[120px]" />
      </div>

      <div className="reveal relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Kicker dark>O momento de começar</Kicker>
        <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-6xl">
          A decisão de voltar para você está em suas mãos.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-white/85 font-light leading-relaxed">
          Nada muda até que você decida mudar a sua rotina. Escolha habitar o seu corpo com mais <em className="italic font-normal text-[color:var(--rose)]">presença</em>, leveza e potência.
        </p>
        
        {/* Card em Rosé Editorial / Clean & Sofisticado */}
        <div className="mt-10 mx-auto max-w-sm rounded-3xl bg-[color:var(--offpink)] p-8 text-[color:var(--burgundy)] border border-[color:var(--rose)]/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--rose)]/40 blur-xl" />
          
          <span className="relative inline-block rounded-full bg-[color:var(--burgundy)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[color:var(--burgundy)] border border-[color:var(--burgundy)]/15 mb-3">
            Acesso Imediato
          </span>

          <p className="relative font-display text-6xl font-normal tracking-tight text-[color:var(--burgundy)] my-2">
            {site.price}
          </p>
          
          <p className="relative text-xs font-bold uppercase tracking-wider text-[color:var(--burgundy)]/75">
            Pagamento único • Acesso vitalício
          </p>

          <div className="relative mt-6 pt-4 border-t border-[color:var(--burgundy)]/15 flex items-center justify-center gap-2 text-xs font-semibold text-[color:var(--burgundy)]/85">
            <ShieldCheck className="h-4 w-4 text-[color:var(--burgundy)]" />
            <span>Garantia incondicional de 7 dias</span>
          </div>
        </div>

        <div className="mt-10">
          <CTA source="cta_footer" className="bg-[color:var(--offpink)] text-[color:var(--burgundy)] hover:bg-white hover:shadow-xl font-bold px-10 py-5 text-lg">
            Quero começar minha Jornada
          </CTA>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[color:var(--offpink)]/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="reveal text-center">
          <Kicker>Perguntas frequentes</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Tudo o que você precisa saber.
          </h2>
          <p className="mt-3 text-muted-foreground text-sm">
            Tire suas dúvidas antes de dar o primeiro passo na sua jornada.
          </p>
        </div>

        <ul className="reveal mt-12 space-y-4">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li 
                key={item.q} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "border-[color:var(--burgundy)]/30 bg-white shadow-lg shadow-[color:var(--burgundy)]/5" 
                    : "border-black/5 bg-white/80 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => { setOpen(isOpen ? null : i); if (!isOpen) track("faq_open", { q: item.q }); }}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium text-[color:var(--burgundy)] sm:text-xl">
                    {item.q}
                  </span>
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${isOpen ? "bg-[color:var(--burgundy)] text-white rotate-45" : "bg-[color:var(--offpink)] text-[color:var(--burgundy)]"}`}>
                    <Plus className="h-4 w-4" />
                  </div>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="px-6 pb-6 pt-0 leading-relaxed text-foreground/80 text-base border-t border-black/5 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-[color:var(--burgundy)] py-16 text-white border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-display text-3xl font-normal">EnergyFlow</p>
          <p className="mt-2 max-w-md text-sm text-white/70 font-light">
            Uma jornada de reconexão, consciência e potência interior. Com Jamilly Pacheco.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={site.instagram} target="_blank" rel="noopener" onClick={() => track("instagram_click")}
             className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:bg-white/10" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener" onClick={() => track("whatsapp_support_click", { source: "footer" })}
             className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:bg-white/10" aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>
          <a href={`mailto:${site.email}`}
             className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:bg-white/10" aria-label="E-mail">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-xs text-white/60 sm:flex sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} EnergyFlow. Todos os direitos reservados.</p>
        <p className="mt-2 sm:mt-0">
          Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/wavelabsperformance/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition hover:text-white/80 underline underline-offset-4"
          >
            Wave Labs Performance
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ---------------- WHATSAPP FLOAT ---------------- */
function FloatingWhats() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener"
      onClick={() => track("whatsapp_support_click", { source: "float" })}
      aria-label="Suporte via WhatsApp"
      className="animate-wa-pulse fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------------- BACK TO TOP ---------------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onS = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed bottom-24 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--burgundy)]/15 bg-white text-[color:var(--burgundy)] shadow-lg transition hover:-translate-y-1 active:scale-95"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}