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
      { title: "LB Budget — Take Control of Your Financial Future" },
      { name: "description", content: "Premium personal finance dashboard: budgets, expenses, bills, savings, debt, investments and AI insights." },
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
    { href: "#features", label: "Features" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#pricing", label: "Pricing" },
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
          <Link to="/app" className="text-sm font-semibold text-foreground/80 hover:text-foreground">Se connecter</Link>
          <Link to="/app" className="inline-flex items-center gap-1.5 rounded-full bg-orange-gradient px-5 py-2.5 text-sm font-semibold text-orange-foreground shadow-glow transition hover:brightness-110">
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
          <a href="#pricing" className="mt-2 block rounded-full bg-orange-gradient px-4 py-2 text-center text-sm font-semibold text-orange-foreground">Get started</a>
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
            <Sparkles className="h-3.5 w-3.5" /> New · AI Financial Assistant
          </div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl md:text-7xl">
            Take control of your<br />
            <span className="text-orange">financial future</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Plan your monthly budget, track income and expenses, manage debt, grow savings, and stay on top of every bill — all in one premium fintech dashboard.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-3.5 text-base font-semibold text-orange-foreground shadow-glow transition hover:brightness-110">
              Start free trial <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#dashboard" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition hover:bg-secondary">
              See dashboard
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Free 14-day trial</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No credit card</div>
            <div className="hidden items-center gap-1.5 sm:flex"><CheckCircle2 className="h-4 w-4 text-success" /> Cancel anytime</div>
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
            <span className="font-display text-sm font-bold">MONTHLY BUDGET PLANNER</span>
          </div>
          <div className="hidden gap-1 sm:flex">
            {["Monthly", "Income", "Expense", "Bills", "Savings", "Debt", "Dashboard"].map((t, i) => (
              <span key={t} className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${i === 0 ? "bg-orange text-white" : "text-white/70"}`}>{t}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-3 bg-background p-3 sm:p-5 md:grid-cols-3">
          <PanelCard title="MONTH AT A GLANCE">
            <Row label="Month" value="May 2026" />
            <Row label="Budget Goal" value="$5,500.00" />
            <Row label="Total Income" value="$5,850.00" valueClass="text-success font-semibold" />
            <Row label="Total Expenses" value="$3,820.00" valueClass="text-destructive font-semibold" />
            <Row label="Total Bills" value="$950.00" valueClass="text-orange font-semibold" />
            <Row label="Total Savings" value="$650.00" valueClass="text-success font-semibold" />
            <div className="mt-3 rounded-lg bg-success/10 px-3 py-2 text-center">
              <div className="text-[10px] font-bold tracking-wider text-success">REMAINING / LEFT TO BUDGET</div>
              <div className="font-display text-lg font-extrabold text-success">$1,350.00</div>
            </div>
          </PanelCard>

          <PanelCard title="BUDGET OVERVIEW" wide>
            <Donut />
          </PanelCard>

          <PanelCard title="CASH FLOW SUMMARY">
            <Row label="Total Income" value="$5,850.00" valueClass="text-success font-semibold" />
            <Row label="Total Expenses" value="-$3,820.00" valueClass="text-destructive font-semibold" />
            <Row label="Total Bills" value="-$950.00" valueClass="text-orange font-semibold" />
            <Row label="Total Savings" value="-$650.00" valueClass="text-success font-semibold" />
            <Row label="Total Debt" value="-$430.00" valueClass="text-destructive font-semibold" />
            <div className="mt-3 rounded-lg bg-success/10 px-3 py-2 text-center">
              <div className="text-[10px] font-bold tracking-wider text-success">REMAINING / LEFT TO BUDGET</div>
              <div className="font-display text-lg font-extrabold text-success">$1,350.00</div>
            </div>
          </PanelCard>

          <PanelCard title="INCOME VS EXPENSES">
            <Bars />
          </PanelCard>

          <PanelCard title="TOP EXPENSE CATEGORIES">
            <table className="w-full text-[11px]">
              <thead className="text-muted-foreground">
                <tr className="text-left"><th className="py-1 font-medium">Category</th><th className="font-medium">Actual</th><th className="text-right font-medium">%</th></tr>
              </thead>
              <tbody>
                {[
                  ["Housing", "$1,450", "37.9%"],
                  ["Food", "$620", "16.2%"],
                  ["Transport", "$450", "11.8%"],
                  ["Utilities", "$320", "8.4%"],
                  ["Insurance", "$280", "7.3%"],
                  ["Other", "$700", "18.4%"],
                ].map(r => (
                  <tr key={r[0]} className="border-t border-border/60"><td className="py-1.5">{r[0]}</td><td>{r[1]}</td><td className="text-right">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </PanelCard>

          <PanelCard title="SAVINGS PROGRESS">
            <Row label="Goal" value="$5,000.00" />
            <Row label="Saved" value="$2,450.00" />
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px]"><span>Progress</span><span className="font-semibold text-success">49.0%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-success" style={{ width: "49%" }} />
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-navy px-3 py-2 text-center">
              <div className="text-[10px] font-bold tracking-wider text-white/70">LEFT TO BUDGET</div>
              <div className="font-display text-lg font-extrabold text-white">$1,350.00</div>
            </div>
          </PanelCard>
        </div>
      </div>

      {/* Floating mini-cards */}
      <div className="pointer-events-none absolute -left-4 -top-4 hidden rotate-[-4deg] rounded-xl border border-border bg-card p-3 shadow-glow md:block">
        <div className="text-[10px] font-bold tracking-wider text-navy">INCOME +12%</div>
        <div className="font-display text-lg font-extrabold text-success">$5,850</div>
      </div>
      <div className="pointer-events-none absolute -right-4 -bottom-4 hidden rotate-[4deg] rounded-xl border border-border bg-card p-3 shadow-elegant md:block">
        <div className="text-[10px] font-bold tracking-wider text-orange">BILLS PAID</div>
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
    { label: "Expenses", value: 65.3, color: "var(--navy)" },
    { label: "Bills", value: 16.2, color: "var(--orange)" },
    { label: "Savings", value: 11.1, color: "var(--success)" },
    { label: "Debt", value: 7.4, color: "oklch(0.65 0.15 220)" },
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
        <text x="50" y="48" textAnchor="middle" transform="rotate(90 50 50)" className="fill-foreground" fontSize="9" fontWeight="700">$5,850</text>
        <text x="50" y="58" textAnchor="middle" transform="rotate(90 50 50)" className="fill-muted-foreground" fontSize="5">Total Income</text>
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
        <span className="text-[10px] font-semibold text-success">$5,850</span>
        <div className="w-10 rounded-t bg-success" style={{ height: "100%" }} />
        <span className="text-[10px] text-muted-foreground">Income</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-semibold text-navy">$3,820</span>
        <div className="w-10 rounded-t bg-navy" style={{ height: "65%" }} />
        <span className="text-[10px] text-muted-foreground">Expenses</span>
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
          Trusted by 50,000+ people taking charge of their finances
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
    { icon: Wallet, color: "navy", title: "Budget with purpose", desc: "Plan monthly budgets across categories with smart envelopes and rollover." },
    { icon: Receipt, color: "orange", title: "Bills, never missed", desc: "Track due dates, recurring bills, and pay reminders right when you need them." },
    { icon: PiggyBank, color: "success", title: "Savings on autopilot", desc: "Create goals with progress bars, milestones and automatic contributions." },
    { icon: CreditCard, color: "navy", title: "Crush debt faster", desc: "Snowball and avalanche calculators show the fastest path to debt-free." },
    { icon: TrendingUp, color: "orange", title: "Investment tracker", desc: "Stocks, ETFs, crypto and real estate — all in one performance view." },
    { icon: Sparkles, color: "success", title: "AI financial assistant", desc: "Personalized insights, forecasts and recommendations on every screen." },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Features</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Everything you need to win with money</h2>
          <p className="mt-4 text-lg text-muted-foreground">Twelve powerful modules in one beautifully simple dashboard.</p>
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
  const tabs = ["Monthly Budget", "Income", "Expenses", "Bills", "Savings", "Debt", "Investments"];
  return (
    <section id="dashboard" className="bg-navy-gradient py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Dashboard</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">See your money at a glance</h2>
          <p className="mt-4 text-lg text-white/70">A single source of truth with seven specialized trackers.</p>
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
    { icon: BarChart3, title: "Reports & Analytics", desc: "Interactive pie, bar and line charts. Export to PDF or Excel." },
    { icon: Calendar, title: "Calendar View", desc: "Bills, paychecks and milestones on a single financial planner." },
    { icon: Trophy, title: "Goals & Challenges", desc: "No-spend months, savings sprints and achievement badges." },
    { icon: Globe2, title: "Multi-currency", desc: "EUR, USD, GBP, XAF, XOF and automatic conversion." },
    { icon: Shield, title: "Bank-grade security", desc: "Encrypted at rest and in transit. Row-level data isolation." },
    { icon: Sparkles, title: "Subscription manager", desc: "Spot zombie subscriptions and save hundreds every year." },
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
    { q: "LB Budget made me feel in control of my money for the first time. Paid off $12k in debt in 8 months.", n: "Amelia R.", r: "Product Designer" },
    { q: "The AI assistant catches things I'd never notice. It's like a financial coach in my pocket.", n: "Marcus L.", r: "Software Engineer" },
    { q: "Beautiful dashboards and a no-nonsense workflow. My partner and I finally budget together.", n: "Sophie & Tom", r: "Newlyweds" },
  ];
  return (
    <section className="bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Loved by users</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Real results, real people</h2>
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
      name: "Free", price: "$0", tag: "Start tracking today",
      features: ["Basic budgeting", "Expense tracking", "Income tracking", "1 currency"],
      cta: "Get started", highlight: false,
    },
    {
      name: "Pro", price: "$9", tag: "Most popular",
      features: ["Everything in Free", "Advanced analytics", "AI assistant", "Unlimited budgets", "PDF exports"],
      cta: "Start Pro trial", highlight: true,
    },
    {
      name: "Premium", price: "$19", tag: "For serious wealth-builders",
      features: ["Everything in Pro", "Investment tracking", "Financial forecasting", "Multi-currency", "Priority support"],
      cta: "Go Premium", highlight: false,
    },
  ];
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Simple plans for every stage</h2>
          <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade anytime. Cancel whenever.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map(p => (
            <div key={p.name} className={`relative rounded-3xl border bg-card p-8 ${p.highlight ? "border-orange shadow-glow md:-translate-y-3" : "border-border shadow-card"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Most popular</div>
              )}
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{p.tag}</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-navy">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold text-navy">{p.price}</span>
                <span className="text-muted-foreground">/month</span>
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
    { q: "Is LB Budget free to start?", a: "Yes — the Free plan covers budgets, income and expense tracking forever. Upgrade only when you need AI insights or investments." },
    { q: "Is my financial data secure?", a: "Yes. All data is encrypted in transit and at rest. Row-level security ensures only you can access your accounts." },
    { q: "Do you support multiple currencies?", a: "EUR, USD, GBP, XAF and XOF are supported, with automatic conversion across all reports." },
    { q: "Can I export my data?", a: "Pro and Premium plans include PDF and Excel exports for any report and time range." },
    { q: "Can I cancel anytime?", a: "Absolutely. Your subscription can be canceled in one click — no questions asked." },
  ];
  return (
    <section id="faq" className="bg-card/50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-orange">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">Questions, answered</h2>
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
            <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">Start building wealth today</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">Join thousands of people who finally feel in control of their finances.</p>
            <a href="#pricing" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-gradient px-7 py-3.5 text-base font-semibold text-orange-foreground shadow-glow transition hover:brightness-110">
              Create your free account <ArrowRight className="h-4 w-4" />
            </a>
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
            <p className="mt-3 text-sm text-muted-foreground">Take control of your financial future.</p>
          </div>
          <FooterCol title="Product" links={["Features", "Dashboard", "Pricing", "FAQ"]} />
          <FooterCol title="Company" links={["About", "Blog", "Careers", "Press"]} />
          <div>
            <h4 className="font-display text-sm font-bold text-navy">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange" /> Lbcloudadmin@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange" /> +33 6 60 06 17 23</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© LB Budget. All Rights Reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
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
