import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check, Star, ArrowRight, ShieldCheck, Play, Sparkles, Infinity as InfinityIcon,
  Clock, Lock, ChevronUp, Instagram, Mail, MessageCircle, Plus,
} from "lucide-react";
import { site, tickerPhrases } from "@/lib/site";
import { modules } from "@/data/modules";
import { testimonials } from "@/data/testimonials";
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
      "Uma jornada 100% online de reconexão feminina com Jamilly Pacheco. Acesso vitalício, R$47,00, pagamento único, garantia de 7 dias.";
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
      className={`btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold tracking-tight ${full ? "w-full" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="kicker">{children}</span>;
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} de 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />
      ))}
    </div>
  );
}

/* ---------------- page ---------------- */
function LandingPage() {
  useReveal();
  useScrollDepth();

  return (
    <main className="min-h-screen bg-background text-foreground">
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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => { if (!videoStarted) { setVideoStarted(true); track("video_start"); } };
    const onEnd = () => track("video_complete");
    v.addEventListener("play", onPlay);
    v.addEventListener("ended", onEnd);
    return () => { v.removeEventListener("play", onPlay); v.removeEventListener("ended", onEnd); };
  }, [videoStarted]);

  return (
    <section className="relative overflow-hidden">
      {/* soft ambient gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[color:var(--rose)] opacity-40 blur-3xl" />
        <div className="absolute right-[-10%] top-[35%] h-[420px] w-[420px] rounded-full bg-[color:var(--offpink)] opacity-70 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-10 sm:pt-14 md:pb-24 md:pt-20">
        <div className="reveal flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[color:var(--burgundy)]/40" />
          <span className="kicker">{site.product} • {site.edition}</span>
          <span className="h-px w-8 bg-[color:var(--burgundy)]/40" />
        </div>

        {/* Vídeo — mobile first (aparece logo abaixo do título em mobile via ordem) */}
        <div className="reveal mx-auto w-full max-w-4xl">
          <div className="group relative overflow-hidden rounded-3xl shadow-[0_40px_120px_-40px_rgba(107,15,36,0.45)] ring-1 ring-black/5">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src={site.heroVideo}
              poster={typeof site.heroPoster === "string" ? site.heroPoster : (site.heroPoster as unknown as { src: string }).src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--burgundy)]/25 via-transparent to-transparent" />
          </div>
        </div>

        <div className="reveal mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl leading-[1.05] text-balance text-[color:var(--burgundy)] sm:text-6xl md:text-7xl">
            Uma jornada de <em className="not-italic font-medium italic">reconexão</em>,
            <br className="hidden sm:block" /> consciência e potência interior.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Não são apenas aulas. É uma jornada de retorno para si mesma — 100% online, com acesso imediato e vitalício.
          </p>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-foreground/80">
            {[
              { icon: <Sparkles className="h-4 w-4" />, t: "100% Online" },
              { icon: <InfinityIcon className="h-4 w-4" />, t: "Acesso vitalício" },
              { icon: <Clock className="h-4 w-4" />, t: "Comece hoje" },
              { icon: <ShieldCheck className="h-4 w-4" />, t: "Garantia de 7 dias" },
            ].map((b) => (
              <li key={b.t} className="inline-flex items-center gap-2">
                <span className="text-[color:var(--burgundy)]">{b.icon}</span>{b.t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center gap-3">
            <CTA source="cta_hero">Quero começar minha Jornada</CTA>
            <span className="text-xs text-muted-foreground">Pagamento único de {site.price} • Sem mensalidade</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TICKER ---------------- */
function Ticker() {
  const items = [...tickerPhrases, ...tickerPhrases];
  return (
    <section aria-label="Manifesto" className="relative overflow-hidden border-y border-[color:var(--burgundy)]/10 bg-[color:var(--burgundy)] py-5 text-white">
      <div className="flex w-max animate-ticker whitespace-nowrap">
        {items.map((p, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-display text-lg italic tracking-wide text-white/85">
            {p}
            <span className="h-1 w-1 rounded-full bg-white/50" />
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
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div className="reveal">
          <Kicker>Para quem é</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Feita para mulheres que desejam viver com mais presença — de dentro para fora.
          </h2>
        </div>
        <ul className="reveal grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {items.map((t, i) => (
            <li key={i} className="group flex gap-4">
              <span className="mt-1 font-display text-xl text-[color:var(--burgundy)]/70">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-pretty leading-relaxed text-foreground/85">{t}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- TRANSFORMAR ---------------- */
function Transformar() {
  const before = ["Ruído mental constante", "Corpo em piloto automático", "Autoestima instável", "Ansiedade difusa"];
  const after = ["Clareza e foco", "Presença corporal", "Autoestima ancorada", "Equilíbrio emocional"];
  return (
    <section className="border-y border-black/5 bg-[color:var(--offpink)]/40">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Kicker>O que você vai transformar</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Pequenas mudanças que reorganizam a maneira como você vive.
          </h2>
        </div>

        <div className="reveal mt-16 grid items-center gap-12 md:grid-cols-2">
          <div className="grid gap-8 sm:grid-cols-2 md:order-1">
            <div>
              <p className="kicker mb-4">Antes</p>
              <ul className="space-y-3">
                {before.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground/60"><span className="mt-2 h-px w-4 bg-foreground/30" />{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker mb-4 text-[color:var(--burgundy)]">Depois</p>
              <ul className="space-y-3">
                {after.map((a) => (
                  <li key={a} className="flex items-start gap-3 font-medium text-[color:var(--burgundy)]">
                    <Check className="mt-0.5 h-5 w-5" />{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:order-2">
            <img
              src={site.images.transform}
              alt="Mulher em estado de presença e serenidade"
              width={1400}
              height={1000}
              loading="lazy"
              className="animate-soft-float aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-black/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MENTORA ---------------- */
function Mentora() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-[1fr_1.2fr]">
        <div className="reveal">
          <img
            src={site.images.mentora}
            alt="Jamilly Pacheco, mentora da Jornada EnergyFlow"
            width={1200}
            height={1500}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl ring-1 ring-black/5"
          />
        </div>
        <div className="reveal">
          <Kicker>Sua mentora</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Jamilly Pacheco
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Especialista em consciência corporal, desenvolvimento feminino, mindfulness, Medicina Chinesa,
            massoterapia, terapias integrativas e energia — Jamilly criou a Jornada EnergyFlow para conduzir
            mulheres de volta ao próprio centro.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["Mindfulness","Medicina Chinesa","Terapias Integrativas","Consciência Corporal","Feminino Cíclico"].map((t) => (
              <li key={t} className="rounded-full border border-[color:var(--burgundy)]/20 bg-white/60 px-4 py-1.5 text-xs font-medium text-[color:var(--burgundy)]">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MÓDULOS ---------------- */
function Modulos() {
  return (
    <section id="modulos" className="border-y border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Kicker>A Jornada em 4 módulos</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Um percurso desenhado como um ritual.
          </h2>
        </div>
        <div className="mt-20 space-y-24">
          {modules.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={m.number} className="reveal grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={flip ? "md:order-2" : ""}>
                  <img
                    src={m.image}
                    alt={m.title}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl ring-1 ring-black/5"
                  />
                </div>
                <div className={flip ? "md:order-1" : ""}>
                  <span className="font-display text-6xl text-[color:var(--rose)]">{m.number}</span>
                  <h3 className="mt-2 font-display text-3xl text-[color:var(--burgundy)] sm:text-4xl">{m.title}</h3>
                  <p className="mt-4 leading-relaxed text-foreground/80">{m.description}</p>
                  <ul className="mt-6 space-y-2">
                    {m.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-foreground/85">
                        <Check className="mt-0.5 h-5 w-5 text-[color:var(--burgundy)]" />{b}
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
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Kicker>O que está incluso</Kicker>
        <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
          Tudo o que você recebe ao entrar.
        </h2>
      </div>
      <ul className="reveal mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.t} className="flex items-center gap-4 border-b border-black/5 pb-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--offpink)] text-[color:var(--burgundy)]">
              {it.icon}
            </span>
            <span className="font-medium text-foreground/90">{it.t}</span>
          </li>
        ))}
      </ul>
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
    <section className="border-y border-black/5 bg-[color:var(--burgundy)] py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <span className="kicker text-[color:var(--rose)]">Diferenciais</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Por que esta jornada é diferente de tudo que você já conheceu.
          </h2>
        </div>
        <div className="reveal mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {items.map((it, i) => (
            <div key={it.t} className="border-t border-white/15 pt-6">
              <span className="font-display text-sm text-[color:var(--rose)]">/ {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-2xl">{it.t}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DEPOIMENTOS ---------------- */
function Depoimentos() {
  const items = [...testimonials, ...testimonials];
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) track("testimonial_view");
    }, { threshold: 0.5 });
    const el = document.getElementById("depoimentos");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="depoimentos" className="overflow-hidden py-24 md:py-32">
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <Kicker>Depoimentos</Kicker>
        <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
          Mulheres que voltaram para si.
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Stars />
          <span className="text-sm text-muted-foreground">4,9 • +300 alunas</span>
        </div>
      </div>

      <div className="mt-14 group">
        <div className="flex w-max animate-marquee gap-6 px-6 group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <figure
              key={i}
              className="glass w-[320px] shrink-0 rounded-3xl border border-white/60 p-6 shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.015] sm:w-[380px]"
            >
              <div className="flex items-center gap-4">
                <img src={t.photo} alt={t.name} loading="lazy" width={80} height={80} className="h-14 w-14 rounded-full object-cover ring-2 ring-[color:var(--rose)]" />
                <div className="min-w-0">
                  <figcaption className="truncate font-semibold text-foreground">{t.name}</figcaption>
                  {t.location && <p className="truncate text-xs text-muted-foreground">{t.location}</p>}
                </div>
                {t.verified && (
                  <span className="ml-auto shrink-0 rounded-full bg-[color:var(--burgundy)]/8 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[color:var(--burgundy)]">
                    Verificada
                  </span>
                )}
              </div>
              <Stars n={t.rating} />
              <p className="mt-3 font-display text-lg italic text-[color:var(--burgundy)]">"{t.highlight}"</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-foreground/80">{t.quote}</blockquote>
            </figure>
          ))}
        </div>
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
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="reveal grid items-center gap-10 rounded-3xl border border-[color:var(--burgundy)]/15 bg-white p-10 shadow-xl md:grid-cols-[auto_1fr]">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[color:var(--offpink)] text-[color:var(--burgundy)]">
          <ShieldCheck className="h-12 w-12" />
        </div>
        <div>
          <Kicker>Garantia incondicional</Kicker>
          <h2 className="mt-2 font-display text-3xl text-[color:var(--burgundy)] sm:text-4xl">7 dias para sentir. Sem risco.</h2>
          <p className="mt-3 text-foreground/80">
            Entre, viva, experimente. Se em 7 dias você sentir que não é para você, devolvemos 100% do valor —
            sem burocracia e sem perguntas.
          </p>
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
    <section id="investimento" className="border-y border-black/5 bg-[color:var(--offpink)]/40 py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="reveal">
          <Kicker>Investimento</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Um pagamento único. Uma jornada para a vida inteira.
          </h2>
        </div>

        <div className="reveal mt-14 overflow-hidden rounded-[28px] border border-[color:var(--burgundy)]/15 bg-white shadow-[0_40px_120px_-40px_rgba(107,15,36,0.35)]">
          <div className="bg-[color:var(--burgundy)] px-8 py-6 text-white">
            <p className="font-display text-2xl">EnergyFlow</p>
            <p className="text-sm text-white/70">Jornada gravada • 100% online • Acesso vitalício</p>
          </div>
          <div className="px-8 py-10 sm:px-12">
            <p className="text-sm text-muted-foreground">Pagamento único</p>
            <p className="mt-2 font-display text-6xl leading-none text-[color:var(--burgundy)] sm:text-7xl">{site.price}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Sem mensalidade • Sem renovação</p>

            <ul className="mx-auto mt-8 grid max-w-sm gap-3 text-left">
              {["Acesso imediato","Garantia de 7 dias","Pagamento seguro (Hotmart)"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-foreground/85">
                  <Check className="h-5 w-5 text-[color:var(--burgundy)]" />{t}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <CTA source="cta_middle" full>Começar Agora</CTA>
              <p className="mt-3 inline-flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Ambiente 100% seguro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ÚLTIMA CHAMADA ---------------- */
function UltimaChamada() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--rose)]/60 blur-3xl" />
      </div>
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-6xl">
          A decisão está em suas mãos.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-foreground/80">
          Nada muda até que algo mude. Que sua próxima escolha seja voltar para você.
        </p>
        <p className="mt-8 font-display text-5xl text-[color:var(--burgundy)]">{site.price}</p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Pagamento único • Acesso vitalício</p>
        <div className="mt-8">
          <CTA source="cta_footer">Quero começar minha Jornada</CTA>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <div className="reveal text-center">
          <Kicker>Perguntas frequentes</Kicker>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--burgundy)] sm:text-5xl">
            Tudo o que você precisa saber.
          </h2>
        </div>
        <ul className="reveal mt-12 divide-y divide-black/10 border-y border-black/10">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  onClick={() => { setOpen(isOpen ? null : i); if (!isOpen) track("faq_open", { q: item.q }); }}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-[color:var(--burgundy)] sm:text-xl">{item.q}</span>
                  <Plus className={`h-5 w-5 shrink-0 text-[color:var(--burgundy)] transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="pb-6 pr-10 leading-relaxed text-foreground/80">{item.a}</p>
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
    <footer className="bg-[color:var(--burgundy)] py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-display text-3xl">EnergyFlow</p>
          <p className="mt-2 max-w-md text-sm text-white/70">
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
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-xs text-white/60 sm:flex sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} EnergyFlow. Todos os direitos reservados.</p>
        <p className="mt-2 sm:mt-0">Desenvolvido por Wave Labs Performance</p>
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
      className="animate-wa-pulse fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
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
      className="fixed bottom-24 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--burgundy)]/20 bg-white text-[color:var(--burgundy)] shadow-lg transition hover:-translate-y-1"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
