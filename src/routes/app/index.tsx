import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, BarChart3,
  Target, AlertTriangle, ArrowUpRight, ArrowDownRight, RefreshCcw,
} from "lucide-react";
import { useFinanceStore } from "@/lib/store/finance-store";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, AreaChart, Area,
} from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Tableau de bord — LB Budget" }] }),
});

function Dashboard() {
  const { transactions, budgets, epargne, dettes, investissements, abonnements, objectifs } = useFinanceStore();

  const revenus = transactions.filter((t) => t.type === "revenu").reduce((s, t) => s + t.montant, 0);
  const depenses = transactions.filter((t) => t.type === "depense").reduce((s, t) => s + t.montant, 0);
  const solde = revenus - depenses;
  const totalEpargne = epargne.reduce((s, e) => s + e.actuel, 0);
  const totalDettes = dettes.reduce((s, d) => s + d.soldeRestant, 0);
  const totalInvestissements = investissements.reduce((s, i) => s + i.valeurActuelle, 0);
  const abonnementsMensuel = abonnements.filter((a) => a.actif).reduce((s, a) => s + (a.frequence === "mensuel" ? a.montant : a.montant / 12), 0);
  const budgetPrincipal = budgets.find((b) => b.type === "mensuel");
  const budgetRestant = budgetPrincipal ? budgetPrincipal.montant - budgetPrincipal.depense : 0;
  const objectifsAtteints = objectifs.filter((o) => o.statut === "atteint").length;

  const depensesParCategorie = transactions
    .filter((t) => t.type === "depense")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.categorie] = (acc[t.categorie] || 0) + t.montant;
      return acc;
    }, {});

  const pieData = Object.entries(depensesParCategorie)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ["#0A2E5C", "#FF6B00", "#10B981", "#6366F1", "#F59E0B", "#EC4899"];

  const cashFlowData = [
    { mois: "Jan", revenus: 4200, depenses: 3100 },
    { mois: "Fév", revenus: 4200, depenses: 2900 },
    { mois: "Mar", revenus: 4500, depenses: 3400 },
    { mois: "Avr", revenus: 4200, depenses: 3200 },
    { mois: "Mai", revenus: 4700, depenses: 3500 },
    { mois: "Juin", revenus: revenus || 4500, depenses: depenses || 2300 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de vos finances — Juin 2026</p>
      </div>

      {/* KPI Cards - cliquables */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <KPICard icon={Wallet} label="Solde global" value={solde} color="navy" trend={+5.2} to="/app/revenus" />
        <KPICard icon={TrendingUp} label="Revenus du mois" value={revenus} color="success" trend={+12.0} to="/app/revenus" />
        <KPICard icon={TrendingDown} label="Dépenses du mois" value={depenses} color="destructive" trend={-3.5} to="/app/depenses" />
        <KPICard icon={PiggyBank} label="Épargne totale" value={totalEpargne} color="success" to="/app/epargne" />
        <KPICard icon={BarChart3} label="Investissements" value={totalInvestissements} color="navy" trend={+8.1} to="/app/investissements" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard icon={CreditCard} label="Dette totale" value={totalDettes} color="destructive" to="/app/dettes" />
        <KPICard icon={Wallet} label="Budget restant" value={budgetRestant} color="orange" to="/app/budget" />
        <KPICard icon={Target} label="Objectifs atteints" value={objectifsAtteints} color="success" isCurrency={false} suffix={`/ ${objectifs.length}`} to="/app/objectifs" />
        <KPICard icon={RefreshCcw} label="Abonnements / mois" value={abonnementsMensuel} color="orange" to="/app/abonnements" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy">Flux de trésorerie</h3>
          <p className="text-xs text-muted-foreground mb-4">Revenus vs Dépenses (6 derniers mois)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mois" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}€`} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} €`} />
                <Area type="monotone" dataKey="revenus" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="depenses" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Link to="/app/depenses" className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition cursor-pointer">
          <h3 className="font-display text-sm font-bold text-navy">Répartition des dépenses</h3>
          <p className="text-xs text-muted-foreground mb-4">Par catégorie ce mois-ci</p>
          {pieData.length > 0 ? (
            <div className="flex items-center gap-4">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} €`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2 text-xs">
                {pieData.map((d, i) => (
                  <li key={d.name} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-foreground">{d.name}</span>
                    <span className="ml-auto font-semibold">{d.value.toLocaleString("fr-FR")} €</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">Aucune dépense enregistrée</p>
          )}
        </Link>

        <Link to="/app/budget" className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition cursor-pointer">
          <h3 className="font-display text-sm font-bold text-navy">Budgets en cours</h3>
          <p className="text-xs text-muted-foreground mb-4">Progression mensuelle</p>
          {budgets.length > 0 ? (
            <div className="space-y-4">
              {budgets.slice(0, 5).map((b) => {
                const pct = Math.min(100, Math.round((b.depense / b.montant) * 100));
                const overBudget = pct > 90;
                return (
                  <div key={b.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{b.nom}</span>
                      <span className={overBudget ? "text-destructive font-semibold" : "text-muted-foreground"}>
                        {b.depense.toLocaleString("fr-FR")} € / {b.montant.toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full transition-all ${overBudget ? "bg-destructive" : pct > 70 ? "bg-orange" : "bg-success"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">Aucun budget créé</p>
          )}
        </Link>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy">Revenus vs Dépenses</h3>
          <p className="text-xs text-muted-foreground mb-4">Comparaison mensuelle</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mois" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}€`} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} €`} />
                <Bar dataKey="revenus" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="depenses" fill="#0A2E5C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <Link to="/app/factures" className="block rounded-2xl border border-orange/30 bg-orange/5 p-4 hover:bg-orange/10 transition">
        <div className="flex items-center gap-2 text-orange">
          <AlertTriangle className="h-4 w-4" />
          <h3 className="font-display text-sm font-bold">Alertes importantes</h3>
        </div>
        <ul className="mt-2 space-y-1 text-xs text-foreground/80">
          <li>• Budget "Loisirs & Sorties" utilisé à 79% — attention au dépassement</li>
          <li>• Facture EDF de 85 € à payer avant le 25 juin</li>
          <li>• Votre carte Visa a un solde de 800 € (taux 18.5%)</li>
        </ul>
      </Link>
    </div>
  );
}

function KPICard({
  icon: Icon, label, value, color, trend, isCurrency = true, suffix, to,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "navy" | "success" | "destructive" | "orange";
  trend?: number;
  isCurrency?: boolean;
  suffix?: string;
  to: string;
}) {
  const colorMap = {
    navy: "text-navy bg-navy/5",
    success: "text-success bg-success/10",
    destructive: "text-destructive bg-destructive/10",
    orange: "text-orange bg-orange/10",
  };

  return (
    <Link to={to} className="rounded-2xl border border-border bg-card p-4 shadow-card hover:shadow-elegant hover:border-orange/30 transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${colorMap[color]}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${trend >= 0 ? "text-success" : "text-destructive"}`}>
            {trend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-xl font-bold text-foreground">
          {isCurrency ? `${value.toLocaleString("fr-FR")} €` : value}
          {suffix && <span className="text-sm text-muted-foreground ml-1">{suffix}</span>}
        </p>
      </div>
    </Link>
  );
}
