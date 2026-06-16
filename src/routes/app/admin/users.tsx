import { createFileRoute } from "@tanstack/react-router";
import { Users, Search, Filter, MoreHorizontal, Ban, Mail, Eye } from "lucide-react";

export const Route = createFileRoute("/app/admin/users")({
  component: AdminUsersPage,
  head: () => ({ meta: [{ title: "Utilisateurs — Admin LB Budget" }] }),
});

const USERS = [
  { id: 1, nom: "Marie Dupont", email: "marie@email.com", plan: "Pro", statut: "Actif", date: "16/06/2026", sessions: 45 },
  { id: 2, nom: "Thomas Martin", email: "thomas@email.com", plan: "Gratuit", statut: "Actif", date: "15/06/2026", sessions: 12 },
  { id: 3, nom: "Sophie Bernard", email: "sophie@email.com", plan: "Premium", statut: "Actif", date: "14/06/2026", sessions: 89 },
  { id: 4, nom: "Lucas Moreau", email: "lucas@email.com", plan: "Pro", statut: "Suspendu", date: "13/06/2026", sessions: 3 },
  { id: 5, nom: "Emma Petit", email: "emma@email.com", plan: "Gratuit", statut: "Actif", date: "12/06/2026", sessions: 27 },
  { id: 6, nom: "Hugo Leroy", email: "hugo@email.com", plan: "Pro", statut: "Actif", date: "11/06/2026", sessions: 56 },
  { id: 7, nom: "Léa Girard", email: "lea@email.com", plan: "Premium", statut: "Actif", date: "10/06/2026", sessions: 134 },
  { id: 8, nom: "Antoine Roux", email: "antoine@email.com", plan: "Gratuit", statut: "Inactif", date: "08/06/2026", sessions: 0 },
];

function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Utilisateurs</h1>
          <p className="text-sm text-muted-foreground">Gérez les comptes de vos clients</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Rechercher..." className="rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 w-56" />
          </div>
          <button className="rounded-xl border border-border p-2.5 hover:bg-secondary transition">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left font-semibold text-navy">Utilisateur</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Plan</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Statut</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Sessions</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Inscription</th>
                <th className="px-4 py-3 text-right font-semibold text-navy">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition">
                  <td className="px-4 py-3">
                    <p className="font-medium">{u.nom}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.plan === "Premium" ? "bg-orange/10 text-orange" : u.plan === "Pro" ? "bg-navy/10 text-navy" : "bg-secondary text-muted-foreground"}`}>{u.plan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.statut === "Actif" ? "bg-success/10 text-success" : u.statut === "Suspendu" ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"}`}>{u.statut}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.sessions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-lg p-1.5 hover:bg-secondary transition" title="Voir"><Eye className="h-3.5 w-3.5" /></button>
                      <button className="rounded-lg p-1.5 hover:bg-secondary transition" title="Email"><Mail className="h-3.5 w-3.5" /></button>
                      <button className="rounded-lg p-1.5 hover:bg-destructive/10 text-destructive transition" title="Suspendre"><Ban className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
