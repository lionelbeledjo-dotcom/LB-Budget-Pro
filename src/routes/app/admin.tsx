import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, CreditCard, BarChart3, Mail, Activity, Settings, Lock } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export const Route = createFileRoute("/app/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — LB Budget" }] }),
});

function AdminPage() {
  const { isSuperAdmin, user } = useAuthStore();

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-navy">Accès refusé</h2>
        <p className="mt-2 text-sm text-muted-foreground">Cette page est réservée aux super administrateurs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Administration</h1>
        <p className="text-sm text-muted-foreground">Panneau de contrôle — Accès super_admin</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminKPI icon={Users} label="Utilisateurs" value="1,247" trend="+12%" />
        <AdminKPI icon={CreditCard} label="Abonnements actifs" value="843" trend="+8%" />
        <AdminKPI icon={BarChart3} label="MRR" value="7 587 €" trend="+15%" />
        <AdminKPI icon={Activity} label="Sessions / jour" value="3,420" trend="+5%" />
      </div>

      {/* Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Derniers utilisateurs</h3>
          </div>
          <div className="space-y-2">
            {[
              { nom: "Marie Dupont", email: "marie@email.com", plan: "Pro", date: "15/06/2026" },
              { nom: "Thomas Martin", email: "thomas@email.com", plan: "Free", date: "14/06/2026" },
              { nom: "Sophie Bernard", email: "sophie@email.com", plan: "Premium", date: "13/06/2026" },
              { nom: "Lucas Moreau", email: "lucas@email.com", plan: "Pro", date: "12/06/2026" },
            ].map((u) => (
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

        {/* Revenue */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Revenus mensuels</h3>
          </div>
          <div className="space-y-2">
            {[
              { mois: "Juin 2026", montant: "7 587 €", users: 843 },
              { mois: "Mai 2026", montant: "6 892 €", users: 798 },
              { mois: "Avril 2026", montant: "6 234 €", users: 745 },
              { mois: "Mars 2026", montant: "5 780 €", users: 702 },
            ].map((r) => (
              <div key={r.mois} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <span className="text-sm font-medium">{r.mois}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-success">{r.montant}</span>
                  <p className="text-[10px] text-muted-foreground">{r.users} abonnés</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact requests */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Demandes de contact</h3>
          </div>
          <div className="space-y-2">
            {[
              { sujet: "Bug import CSV", statut: "Nouveau", date: "15/06" },
              { sujet: "Question facturation", statut: "En cours", date: "14/06" },
              { sujet: "Demande de fonctionnalité", statut: "Résolu", date: "12/06" },
            ].map((c) => (
              <div key={c.sujet} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <span className="text-sm">{c.sujet}</span>
                <div className="text-right">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.statut === "Nouveau" ? "bg-orange/10 text-orange" : c.statut === "En cours" ? "bg-navy/10 text-navy" : "bg-success/10 text-success"}`}>{c.statut}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Système</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between rounded-xl bg-secondary/30 px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Version</span><span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between rounded-xl bg-secondary/30 px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Uptime</span><span className="font-medium text-success">99.9%</span>
            </div>
            <div className="flex justify-between rounded-xl bg-secondary/30 px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Base de données</span><span className="font-medium">Local (localStorage)</span>
            </div>
            <div className="flex justify-between rounded-xl bg-secondary/30 px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Déploiement</span><span className="font-medium">Lovable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminKPI({ icon: Icon, label, value, trend }: { icon: React.ElementType; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-navy/5 text-navy"><Icon className="h-4.5 w-4.5" /></div>
        <span className="text-[11px] font-semibold text-success">{trend}</span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-bold text-navy">{value}</p>
    </div>
  );
}
