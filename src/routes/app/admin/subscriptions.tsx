import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, TrendingUp, Users, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app/admin/subscriptions")({
  component: AdminSubscriptionsPage,
  head: () => ({ meta: [{ title: "Abonnements — Admin LB Budget" }] }),
});

function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Abonnements</h1>
        <p className="text-sm text-muted-foreground">Suivez les souscriptions et les renouvellements</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Users} label="Gratuit" value="404" sub="32% des users" />
        <Stat icon={CreditCard} label="Pro (9€/mois)" value="612" sub="49% des users" />
        <Stat icon={TrendingUp} label="Premium (19€/mois)" value="231" sub="19% des users" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Renouvellements à venir (7j)</h3>
          <div className="space-y-2">
            {[
              { nom: "Marie Dupont", plan: "Pro", date: "17/06", montant: "9 €" },
              { nom: "Hugo Leroy", plan: "Pro", date: "18/06", montant: "9 €" },
              { nom: "Léa Girard", plan: "Premium", date: "19/06", montant: "19 €" },
              { nom: "Sophie Bernard", plan: "Premium", date: "20/06", montant: "19 €" },
              { nom: "Antoine Roux", plan: "Pro", date: "22/06", montant: "9 €" },
            ].map(r => (
              <div key={r.nom} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{r.nom}</p>
                  <p className="text-xs text-muted-foreground">{r.plan} — {r.date}</p>
                </div>
                <span className="text-sm font-bold text-success">{r.montant}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Résiliations récentes</h3>
          <div className="space-y-2">
            {[
              { nom: "Paul Durand", ancien: "Pro", date: "15/06", raison: "Trop cher" },
              { nom: "Julie Blanc", ancien: "Premium", date: "12/06", raison: "N'utilise plus" },
              { nom: "Marc Simon", ancien: "Pro", date: "10/06", raison: "Fonctionnalités manquantes" },
            ].map(r => (
              <div key={r.nom} className="flex items-center justify-between rounded-xl bg-destructive/5 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{r.nom}</p>
                  <p className="text-xs text-muted-foreground">{r.ancien} — {r.date}</p>
                </div>
                <span className="text-xs text-destructive">{r.raison}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-orange" />
        <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      </div>
      <p className="font-display text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
