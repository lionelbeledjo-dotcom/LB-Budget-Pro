import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/admin/revenue")({
  component: AdminRevenuePage,
  head: () => ({ meta: [{ title: "Revenus & MRR — Admin LB Budget" }] }),
});

function AdminRevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Revenus & MRR</h1>
        <p className="text-sm text-muted-foreground">Suivi financier de la plateforme</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="MRR actuel" value="7 587 €" trend="+15%" />
        <KPI label="ARR estimé" value="91 044 €" trend="+15%" />
        <KPI label="ARPU" value="9,02 €" trend="+3%" />
        <KPI label="Churn rate" value="2.4%" trend="-0.5%" negative />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-sm font-bold text-navy mb-4">Évolution des revenus mensuels</h3>
        <div className="space-y-2">
          {[
            { mois: "Juin 2026", mrr: "7 587 €", users: 843, growth: "+10.1%" },
            { mois: "Mai 2026", mrr: "6 892 €", users: 798, growth: "+10.5%" },
            { mois: "Avril 2026", mrr: "6 234 €", users: 745, growth: "+7.9%" },
            { mois: "Mars 2026", mrr: "5 780 €", users: 702, growth: "+9.2%" },
            { mois: "Février 2026", mrr: "5 295 €", users: 651, growth: "+8.7%" },
            { mois: "Janvier 2026", mrr: "4 870 €", users: 603, growth: "+11.3%" },
          ].map(r => (
            <div key={r.mois} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-3">
              <div>
                <p className="text-sm font-medium">{r.mois}</p>
                <p className="text-xs text-muted-foreground">{r.users} abonnés payants</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-navy">{r.mrr}</p>
                <p className="text-xs text-success font-medium">{r.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Répartition par plan</h3>
          <div className="space-y-3">
            <PlanBar label="Pro (9€)" count={612} percent={72} color="bg-navy" />
            <PlanBar label="Premium (19€)" count={231} percent={28} color="bg-orange" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Transactions récentes</h3>
          <div className="space-y-2">
            {[
              { user: "Sophie B.", montant: "+19 €", type: "Premium", date: "16/06" },
              { user: "Hugo L.", montant: "+9 €", type: "Pro", date: "16/06" },
              { user: "Marie D.", montant: "+9 €", type: "Pro", date: "15/06" },
              { user: "Léa G.", montant: "+19 €", type: "Premium", date: "15/06" },
              { user: "Lucas M.", montant: "-9 €", type: "Remboursement", date: "14/06" },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{t.user}</p>
                  <p className="text-xs text-muted-foreground">{t.type} — {t.date}</p>
                </div>
                <span className={`text-sm font-bold ${t.montant.startsWith("-") ? "text-destructive" : "text-success"}`}>{t.montant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, trend, negative }: { label: string; value: string; trend: string; negative?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-navy">{value}</p>
      <span className={`text-[11px] font-semibold ${negative ? "text-success" : "text-success"}`}>{trend}</span>
    </div>
  );
}

function PlanBar({ label, count, percent, color }: { label: string; count: number; percent: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{count} users ({percent}%)</span>
      </div>
      <div className="h-2 rounded-full bg-secondary">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
