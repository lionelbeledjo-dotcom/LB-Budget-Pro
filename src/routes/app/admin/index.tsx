import { createFileRoute } from "@tanstack/react-router";
import { Users, CreditCard, BarChart3, Activity, Mail, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export const Route = createFileRoute("/app/admin/")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Dashboard Admin — LB Budget" }] }),
});

function AdminDashboard() {
  const { isSuperAdmin } = useAuthStore();

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldCheck className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 font-display text-xl font-bold text-navy">Accès refusé</h2>
        <p className="mt-2 text-sm text-muted-foreground">Réservé aux administrateurs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Dashboard Administrateur</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de la plateforme LB Budget</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI icon={Users} label="Utilisateurs totaux" value="1,247" trend="+12%" color="text-navy" />
        <KPI icon={CreditCard} label="Abonnements actifs" value="843" trend="+8%" color="text-orange" />
        <KPI icon={BarChart3} label="MRR" value="7 587 €" trend="+15%" color="text-success" />
        <KPI icon={Activity} label="Sessions / jour" value="3,420" trend="+5%" color="text-navy" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Dernières inscriptions</h3>
          <div className="space-y-2">
            {[
              { nom: "Marie Dupont", email: "marie@email.com", plan: "Pro", date: "16/06/2026" },
              { nom: "Thomas Martin", email: "thomas@email.com", plan: "Gratuit", date: "15/06/2026" },
              { nom: "Sophie Bernard", email: "sophie@email.com", plan: "Premium", date: "14/06/2026" },
              { nom: "Lucas Moreau", email: "lucas@email.com", plan: "Pro", date: "13/06/2026" },
              { nom: "Emma Petit", email: "emma@email.com", plan: "Gratuit", date: "12/06/2026" },
            ].map(u => (
              <div key={u.email} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{u.nom}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <div className="text-right">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.plan === "Premium" ? "bg-orange/10 text-orange" : u.plan === "Pro" ? "bg-navy/10 text-navy" : "bg-secondary text-muted-foreground"}`}>{u.plan}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{u.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-sm font-bold text-navy mb-3">Revenus récents</h3>
            <div className="space-y-2">
              {[
                { mois: "Juin 2026", montant: "7 587 €" },
                { mois: "Mai 2026", montant: "6 892 €" },
                { mois: "Avril 2026", montant: "6 234 €" },
              ].map(r => (
                <div key={r.mois} className="flex justify-between rounded-xl bg-secondary/30 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{r.mois}</span>
                  <span className="font-bold text-success">{r.montant}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-sm font-bold text-navy mb-3">Alertes</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-xl bg-orange/5 px-3 py-2">
                <AlertTriangle className="h-4 w-4 text-orange" />
                <span className="text-xs">3 tickets en attente</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-success/5 px-3 py-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-xs">+23 inscrits cette semaine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ icon: Icon, label, value, trend, color }: { icon: React.ElementType; label: string; value: string; trend: string; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-xl bg-secondary ${color}`}><Icon className="h-4.5 w-4.5" /></div>
        <span className="text-[11px] font-semibold text-success">{trend}</span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-bold text-navy">{value}</p>
    </div>
  );
}
