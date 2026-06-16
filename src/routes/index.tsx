import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet, Receipt, PiggyBank, CreditCard, TrendingUp, Calendar,
  BarChart3, Sparkles, Trophy, Globe2, Shield, CheckCircle2,
  ArrowRight, Star, Menu, ChevronRight, Mail, Phone,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LB Budget — Prenez le contrôle de votre avenir financier" },
      { name: "description", content: "Tableau de bord premium de finances personnelles : budgets, dépenses, factures, épargne, dettes, investissements et IA." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogosBar />
      <Features />
      <DashboardPreview />
      <Modules />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────── NAV */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#dashboard", label: "Tableau de bord" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg font-extrabold tracking-tight text-navy">
            LB <span className="text-orange">Budget</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth" className="text-sm font-semibold text-foreground/80 hover:text-foreground">Se connecter</Link>
          <Link to="/auth" className="inline-flex items-center gap-1.5 rounded-full bg-orange-gradient px-5 py-2.5 text-sm font-semibold text-orange-foreground shadow-glow transition hover:brightness-110">
            Commencer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background px-4 py-3 md:hidden">
          {links.map(l => (
            <a key={l.href} href={l.href} className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Link to="/auth" className="mt-2 block rounded-full bg-orange-gradient px-4 py-2 text-center text-sm font-semibold text-orange-foreground">Commencer</Link>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-xl bg-navy-gradient shadow-elegant">
      <Wallet className="h-5 w-5 text-white" strokeWidth={2.5} />
    </div>
  );
}

/* ─────────────────────────────────────────── HERO */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-1.5 text-xs font-semibold text-orange">
            <Sparkles className="h-3.5 w-3.5" /> Nouveau · Assistant financier IA
          </div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl md:text-7xl">
            Prenez le contrôle de<br />
            <span className="text-orange">votre avenir financier</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Planifiez votre budget, suivez revenus et dépenses, gérez vos dettes, faites croître votre épargne et ne manquez plus aucune facture — tout dans un tableau de bord premium.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/app" className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-3.5 text-base font-semibold text-orange-foreground shadow-glow transition hover:brightness-110">
              Essai gratuit 14 jours <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#dashboard" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition hover:bg-secondary">
              Voir le tableau de bord
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> 14 jours gratuits</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Sans carte bancaire</div>
            <div className="hidden items-center gap-1.5 sm:flex"><CheckCircle2 className="h-4 w-4 text-success" /> Annulation à tout moment</div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── DASHBOARD MOCKUP */
function DashboardMock() {
  return (
    <div className="relative rounded-3xl border border-border bg-card p-3 shadow-elegant sm:p-4">
      <div className="overflow-hidden rounded-2xl border border-border">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border bg-navy-gradient px-5 py-3">
          <div className="flex items-center gap-2 text-white">
            <Wallet className="h-4 w-4" />
            <span className="font-display text-sm font-bold">PLANIFICATEUR BUDGET MENSUEL</span>
          </div>
          <div className="hidden gap-1 sm:flex">
            {["Mensuel", "Revenus", "Dépenses", "Factures", "Épargne", "Dettes", "Tableau"].map((t, i) => (
              <span key={t} className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${i === 0 ? "bg-orange text-white" : "text-white/70"}`}>{t}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-3 bg-background p-3 sm:p-5 md:grid-cols-3">
          <PanelCard title="APERÇU DU MOIS">
            <Row label="Mois" value="Mai 2026" />
            <Row label="Objectif budget" value="5 500 €" />
            <Row label="Total revenus" value="5 850 €" valueClass="text-success font-semibold" />
            <Row label="Total dépenses" value="3 820 €" valueClass="text-destructive font-semibold" />
            <Row label="Total factures" value="950 €" valueClass="text-orange font-semibold" />
            <Row label="Total épargne" value="650 €" valueClass="text-success font-semibold" />
            <div className="mt-3 rounded-lg bg-success/10 px-3 py-2 text-center">
              <div className="text-[10px] font-bold tracking-wider text-success">RESTE À BUDGÉTISER</div>
              <div className="font-display text-lg font-extrabold text-success">1 350 €</div>
            </div>
          </PanelCard>

          <PanelCard title="VUE D'ENSEMBLE" wide>
            <Donut />
          </PanelCard>

          <PanelCard title="FLUX DE TRÉSORERIE">
            <Row label="Total revenus" value="5 850 €" valueClass="text-success font-semibold" />
            <Row label="Total dépenses" value="-3 820 €" valueClass="text-destructive font-semibold" />
            <Row label="Total factures" value="-950 €" valueClass="text-orange font-semibold" />
            <Row label="Total épargne" value="-650 €" valueClass="text-success font-semibold" />
            <Row label="Total dettes" value="-430 €" valueClass="text-destructive font-semibold" />
            <div className="mt-3 rounded-lg bg-success/10 px-3 py-2 text-center">
              <div className="text-[10px] font-bold tracking-wider text-success">RESTE À BUDGÉTISER</div>
              <div className="font-display text-lg font-extrabold text-success">1 350 €</div>
            </div>
          </PanelCard>

          <PanelCard title="REVENUS VS DÉPENSES">
            <Bars />
          </PanelCard>

          <PanelCard title="TOP CATÉGORIES DÉPENSES">
            <table className="w-full text-[11px]">
              <thead className="text-muted-foreground">
                <tr className="text-left"><th className="py-1 font-medium">Catégorie</th><th className="font-medium">Réel</th><th className="text-right font-medium">%</th></tr>
              </thead>
              <tbody>
                {[
                  ["Logement", "1 450 €", "37.9%"],
                  ["Alimentation", "620 €", "16.2%"],
                  ["Transport", "450 €", "11.8%"],
                  ["Services", "320 €", "8.4%"],
                  ["Assurance", "280 €", "7.3%"],
                  ["Autres", "700 €", "18.4%"],
                ].map(r => (
                  <tr key={r[0]} className="border-t border-border/60"><td className="py-1.5">{r[0]}</td><td>{r[1]}</td><td className="text-right">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </PanelCard>

          <PanelCard title="PROGRESSION ÉPARGNE">
            <Row label="Objectif" value="5 000 €" />
            <Row label="Épargné" value="2 450 €" />
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px]"><span>Progression</span><span className="font-semibold text-success">49.0%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-success" style={{ width: "49%" }} />
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-navy px-3 py-2 text-center">
              <div className="text-[10px] font-bold tracking-wider text-white/70">RESTE À BUDGÉTISER</div>
              <div className="font-display text-lg font-extrabold text-white">1 350 €</div>
            </div>
          </PanelCard>
        </div>
      </div>

      {/* Floating mini-cards */}
      <div className="pointer-events-none absolute -left-4 -top-4 hidden rotate-[-4deg] rounded-xl border border-border bg-card p-3 shadow-glow md:block">
        <div className="text-[10px] font-bold tracking-wider text-navy">REVENUS +12%</div>
        <div className="font-display text-lg font-extrabold text-success">5 850 €</div>
      </div>
      <div className="pointer-events-none absolute -right-4 -bottom-4 hidden rotate-[4deg] rounded-xl border border-border bg-card p-3 shadow-elegant md:block">
        <div className="text-[10px] font-bold tracking-wider text-orange">FACTURES PAYÉES</div>
        <div className="font-display text-lg font-extrabold text-navy">12 / 14</div>
      </div>
    </div>
  );
}

function PanelCard({ title, children, wide }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-3 shadow-card ${wide ? "md:row-span-1" : ""}`}>
      <div className="mb-2 rounded-md bg-navy px-2 py-1 text-center text-[10px] font-bold tracking-wider text-white">{title}</div>
      <div className="px-1">{children}</div>
    </div>
  );
}
function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between border-b border-border/40 py-1 text-[12px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={valueClass || "text-foreground"}>{value}</span>
    </div>
  );
}

function Donut() {
  // Simple SVG donut
  const data = [
    { label: "Dépenses", value: 65.3, color: "var(--navy)" },
    { label: "Factures", value: 16.2, color: "var(--orange)" },
    { label: "Épargne", value: 11.1, color: "var(--success)" },
    { label: "Dettes", value: 7.4, color: "oklch(0.65 0.15 220)" },
  ];
  let offset = 0;
  const C = 2 * Math.PI * 36;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        <circle cx="50" cy="50" r="36" fill="none" stroke="var(--secondary)" strokeWidth="14" />
        {data.map((d, i) => {
          const len = (d.value / 100) * C;
          const el = (
            <circle key={i} cx="50" cy="50" r="36" fill="none" stroke={d.color} strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return el;
        })}
        <text x="50" y="48" textAnchor="middle" transform="rotate(90 50 50)" className="fill-foreground" fontSize="9" fontWeight="700">5 850 €</text>
        <text x="50" y="58" textAnchor="middle" transform="rotate(90 50 50)" className="fill-muted-foreground" fontSize="5">Total Revenus</text>
      </svg>
      <ul className="space-y-1.5 text-[11px]">
        {data.map(d => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
            <span className="text-foreground">{d.label}</span>
            <span className="ml-auto font-semibold text-muted-foreground">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bars() {
  return (
    <div className="flex h-32 items-end justify-around gap-4 px-2">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-semibold text-success">5 850 €</span>
        <div className="w-10 rounded-t bg-success" style={{ height: "100%" }} />
        <span className="text-[10px] text-muted-foreground">Revenus</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-semibold text-navy">3 820 €</span>
        <div className="w-10 rounded-t bg-navy" style={{ height: "65%" }} />
        <span className="text-[10px] text-muted-foreground">Dépenses</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── LOGOS / TRUST */
function LogosBar() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Plus de 50 000 personnes font confiance à LB Budget pour leurs finances
        </p>
        <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
          {["NORTHWIND", "ACME", "STRIDE", "PINEAPP", "VANTAGE", "LUMEN"].map(n => (
            <span key={n} className="font-display text-sm font-bold tracking-widest text-muted-foreground">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── FEATURES */
function Features() {
  const items = [
    { icon: Wallet, color: "navy", title: "Budget intelligent", desc: "Planifiez vos budgets mensuels par catégorie avec enveloppes et reports automatiques." },
    { icon: Receipt, color: "orange", title: "Factures sous contrôle", desc: "Suivez les échéances, factures récurrentes et rappels de paiement au bon moment." },
    { icon: PiggyBank, color: "success", title: "Épargne en pilote auto", desc: "Créez des objectifs avec barres de progression, jalons et contributions automatiques." },
    { icon: CreditCard, color: "navy", title: "Éliminez vos dettes", desc: "Calculateurs boule de neige et avalanche pour le chemin le plus rapide vers zéro dette." },
    { icon: TrendingUp, color: "orange", title: "Suivi investissements", desc: "Actions, ETF, crypto et immobilier — tout dans une seule vue de performance." },
    { icon: Sparkles, color: "success", title: "Assistant financier IA", desc: "Analyses personnalisées, prévisions et recommandations sur chaque écran." },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Fonctionnalités</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Tout ce qu'il faut pour maîtriser votre argent</h2>
          <p className="mt-4 text-lg text-muted-foreground">Douze modules puissants dans un tableau de bord simple et élégant.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ${color === "navy" ? "bg-navy" : color === "orange" ? "bg-orange-gradient" : "bg-success"}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── DASHBOARD PREVIEW */
function DashboardPreview() {
  const tabs = ["Budget mensuel", "Revenus", "Dépenses", "Factures", "Épargne", "Dettes", "Investissements"];
  return (
    <section id="dashboard" className="bg-navy-gradient py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Tableau de bord</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Visualisez vos finances en un coup d'œil</h2>
          <p className="mt-4 text-lg text-white/70">Une source unique de vérité avec sept trackers spécialisés.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => (
            <span key={t} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${i === 0 ? "bg-orange text-white" : "bg-white/10 text-white/80"}`}>{t}</span>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-white p-3 shadow-elegant">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── MODULES */
function Modules() {
  const mods = [
    { icon: BarChart3, title: "Rapports & Analyses", desc: "Graphiques interactifs camembert, barres et lignes. Export PDF ou Excel." },
    { icon: Calendar, title: "Vue Calendrier", desc: "Factures, salaires et jalons sur un seul planificateur financier." },
    { icon: Trophy, title: "Objectifs & Défis", desc: "Mois sans dépenses, sprints d'épargne et badges de réussite." },
    { icon: Globe2, title: "Multi-devises", desc: "EUR, USD, GBP, XAF, XOF et conversion automatique." },
    { icon: Shield, title: "Sécurité bancaire", desc: "Chiffrement au repos et en transit. Isolation des données par utilisateur." },
    { icon: Sparkles, title: "Gestion abonnements", desc: "Détectez les abonnements oubliés et économisez des centaines d'euros par an." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-3 md:grid-cols-3">
          {mods.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── TESTIMONIALS */
function Testimonials() {
  const t = [
    { q: "LB Budget m'a fait sentir en contrôle de mes finances pour la première fois. J'ai remboursé 12 000 € de dettes en 8 mois.", n: "Amélie R.", r: "Designer produit" },
    { q: "L'assistant IA détecte des choses que je ne remarquerais jamais. C'est comme un coach financier dans ma poche.", n: "Marc L.", r: "Développeur" },
    { q: "Des tableaux de bord magnifiques et un workflow sans prise de tête. On budget enfin à deux.", n: "Sophie & Thomas", r: "Jeunes mariés" },
  ];
  return (
    <section className="bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Nos utilisateurs adorent</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Résultats réels, personnes réelles</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.map(x => (
            <figure key={x.n} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="flex gap-0.5 text-orange">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-foreground">"{x.q}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold text-navy">{x.n}</div>
                <div className="text-muted-foreground">{x.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── PRICING */
function Pricing() {
  const plans = [
    {
      name: "Gratuit", price: "0 €", tag: "Commencez dès aujourd'hui",
      features: ["Budget de base", "Suivi des dépenses", "Suivi des revenus", "1 devise"],
      cta: "Commencer", highlight: false,
    },
    {
      name: "Pro", price: "9 €", tag: "Le plus populaire",
      features: ["Tout du Gratuit", "Analyses avancées", "Assistant IA", "Budgets illimités", "Exports PDF"],
      cta: "Essai Pro gratuit", highlight: true,
    },
    {
      name: "Premium", price: "19 €", tag: "Pour les ambitieux",
      features: ["Tout du Pro", "Suivi investissements", "Prévisions financières", "Multi-devises", "Support prioritaire"],
      cta: "Passer Premium", highlight: false,
    },
  ];
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Tarifs</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Des forfaits simples pour chaque étape</h2>
          <p className="mt-4 text-lg text-muted-foreground">Commencez gratuitement. Évoluez quand vous voulez. Annulez à tout moment.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map(p => (
            <div key={p.name} className={`relative rounded-3xl border bg-card p-8 ${p.highlight ? "border-orange shadow-glow md:-translate-y-3" : "border-border shadow-card"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Le plus populaire</div>
              )}
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{p.tag}</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-navy">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold text-navy">{p.price}</span>
                <span className="text-muted-foreground">/mois</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition ${p.highlight ? "bg-orange-gradient text-orange-foreground shadow-glow hover:brightness-110" : "border border-border bg-card text-foreground hover:bg-secondary"}`}>
                {p.cta} <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── FAQ */
function FAQ() {
  const items = [
    { q: "LB Budget est-il gratuit ?", a: "Oui — le plan Gratuit couvre les budgets, le suivi des revenus et dépenses pour toujours. Passez en Pro uniquement quand vous avez besoin de l'IA ou des investissements." },
    { q: "Mes données financières sont-elles sécurisées ?", a: "Oui. Toutes les données sont chiffrées en transit et au repos. La sécurité par ligne garantit que vous seul accédez à vos comptes." },
    { q: "Supportez-vous plusieurs devises ?", a: "EUR, USD, GBP, XAF et XOF sont supportés, avec conversion automatique sur tous les rapports." },
    { q: "Puis-je exporter mes données ?", a: "Les plans Pro et Premium incluent les exports PDF et Excel pour tout rapport et toute période." },
    { q: "Puis-je annuler à tout moment ?", a: "Absolument. Votre abonnement peut être annulé en un clic — sans justification." },
  ];
  return (
    <section id="faq" className="bg-card/50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Questions fréquentes</h2>
        </div>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
          {items.map((it, i) => <FAQItem key={i} {...it} />)}
        </div>
      </div>
    </section>
  );
}
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="block w-full px-6 py-5 text-left">
      <div className="flex items-center justify-between gap-4">
        <span className="font-display font-semibold text-navy">{q}</span>
        <ChevronRight className={`h-4 w-4 shrink-0 text-muted-foreground transition ${open ? "rotate-90 text-orange" : ""}`} />
      </div>
      {open && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>}
    </button>
  );
}

/* ─────────────────────────────────────────── CTA */
function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-navy-gradient p-10 text-center shadow-elegant sm:p-16">
          <div className="absolute inset-0 -z-0 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 0%, var(--orange), transparent)" }} />
          <div className="relative">
            <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">Commencez à construire votre patrimoine</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">Rejoignez des milliers de personnes qui maîtrisent enfin leurs finances.</p>
            <Link to="/app" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-3.5 text-base font-semibold text-orange-foreground shadow-glow transition hover:brightness-110">
              Créer mon compte gratuit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── FOOTER */
function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-lg font-extrabold text-navy">LB <span className="text-orange">Budget</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Prenez le contrôle de votre avenir financier.</p>
          </div>
          <FooterCol title="Produit" links={["Fonctionnalités", "Tableau de bord", "Tarifs", "FAQ"]} />
          <FooterCol title="Entreprise" links={["À propos", "Blog", "Carrières", "Presse"]} />
          <div>
            <h4 className="font-display text-sm font-bold text-navy">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange" /> lbcloudadmin@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange" /> +33 6 60 06 17 23</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© LB Budget. Tous droits réservés.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Confidentialité</a>
            <a href="#" className="hover:text-foreground">Conditions</a>
            <a href="#" className="hover:text-foreground">Sécurité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold text-navy">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(l => <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>)}
      </ul>
    </div>
  );
}
