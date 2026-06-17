import { createFileRoute } from "@tanstack/react-router";
import { Users, Search, Ban, Mail, Eye, X, Check, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/admin/users")({
  component: AdminUsersPage,
  head: () => ({ meta: [{ title: "Utilisateurs — Admin LB Budget" }] }),
});

const INITIAL_USERS = [
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
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("Tous");
  const [selectedUser, setSelectedUser] = useState<typeof INITIAL_USERS[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter(u => {
    const matchSearch = u.nom.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "Tous" || u.plan === filterPlan;
    return matchSearch && matchPlan;
  });

  const toggleSuspend = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, statut: u.statut === "Suspendu" ? "Actif" : "Suspendu" } : u));
  };

  const changePlan = (id: number, newPlan: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, plan: newPlan } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Utilisateurs</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou email..."
              className="rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 w-64"
            />
          </div>
          <select
            value={filterPlan}
            onChange={e => setFilterPlan(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-orange"
          >
            <option>Tous</option>
            <option>Gratuit</option>
            <option>Pro</option>
            <option>Premium</option>
          </select>
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
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition">
                  <td className="px-4 py-3">
                    <p className="font-medium">{u.nom}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.plan}
                      onChange={e => changePlan(u.id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold outline-none cursor-pointer ${u.plan === "Premium" ? "bg-orange/10 text-orange" : u.plan === "Pro" ? "bg-navy/10 text-navy" : "bg-secondary text-muted-foreground"}`}
                    >
                      <option>Gratuit</option>
                      <option>Pro</option>
                      <option>Premium</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.statut === "Actif" ? "bg-success/10 text-success" : u.statut === "Suspendu" ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"}`}>{u.statut}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.sessions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setSelectedUser(u); setShowModal(true); }} className="rounded-lg p-1.5 hover:bg-secondary transition" title="Voir le profil"><Eye className="h-3.5 w-3.5" /></button>
                      <a href={`mailto:${u.email}`} className="rounded-lg p-1.5 hover:bg-secondary transition" title="Envoyer un email"><Mail className="h-3.5 w-3.5" /></a>
                      <button onClick={() => toggleSuspend(u.id)} className={`rounded-lg p-1.5 transition ${u.statut === "Suspendu" ? "hover:bg-success/10 text-success" : "hover:bg-destructive/10 text-destructive"}`} title={u.statut === "Suspendu" ? "Réactiver" : "Suspendre"}>
                        {u.statut === "Suspendu" ? <Check className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Aucun utilisateur trouvé.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal profil */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-elegant" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-navy">Profil utilisateur</h3>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1 hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              <Row label="Nom" value={selectedUser.nom} />
              <Row label="Email" value={selectedUser.email} />
              <Row label="Plan" value={selectedUser.plan} />
              <Row label="Statut" value={selectedUser.statut} />
              <Row label="Sessions" value={String(selectedUser.sessions)} />
              <Row label="Inscription" value={selectedUser.date} />
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={() => toggleSuspend(selectedUser.id)} className="flex-1 rounded-xl bg-orange/10 py-2.5 text-sm font-semibold text-orange hover:bg-orange/20 transition">
                {selectedUser.statut === "Suspendu" ? "Réactiver" : "Suspendre"}
              </button>
              <button onClick={() => deleteUser(selectedUser.id)} className="flex-1 rounded-xl bg-destructive/10 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/20 transition">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between rounded-xl bg-secondary/30 px-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
