import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app/admin/support")({
  component: AdminSupportPage,
  head: () => ({ meta: [{ title: "Support & Tickets — Admin LB Budget" }] }),
});

const TICKETS = [
  { id: "#1247", sujet: "Impossible d'importer mon CSV", user: "Marie Dupont", statut: "Ouvert", priority: "Haute", date: "16/06" },
  { id: "#1246", sujet: "Bug affichage graphique mobile", user: "Thomas Martin", statut: "Ouvert", priority: "Moyenne", date: "16/06" },
  { id: "#1245", sujet: "Question sur le plan Premium", user: "Sophie Bernard", statut: "En cours", priority: "Basse", date: "15/06" },
  { id: "#1244", sujet: "Erreur lors du paiement", user: "Lucas Moreau", statut: "En cours", priority: "Haute", date: "15/06" },
  { id: "#1243", sujet: "Demande d'export PDF", user: "Emma Petit", statut: "Résolu", priority: "Basse", date: "14/06" },
  { id: "#1242", sujet: "Mot de passe oublié ne fonctionne pas", user: "Hugo Leroy", statut: "Résolu", priority: "Moyenne", date: "13/06" },
  { id: "#1241", sujet: "Suggestion : mode sombre", user: "Léa Girard", statut: "Résolu", priority: "Basse", date: "12/06" },
];

function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Support & Tickets</h1>
        <p className="text-sm text-muted-foreground">Gérez les demandes de vos utilisateurs</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat icon={Mail} label="Total tickets" value="1,247" />
        <Stat icon={AlertCircle} label="Ouverts" value="8" color="text-orange" />
        <Stat icon={Clock} label="En cours" value="5" color="text-navy" />
        <Stat icon={CheckCircle} label="Résolus (30j)" value="94" color="text-success" />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left font-semibold text-navy">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Sujet</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Utilisateur</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Priorité</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Statut</th>
                <th className="px-4 py-3 text-left font-semibold text-navy">Date</th>
              </tr>
            </thead>
            <tbody>
              {TICKETS.map(t => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/20 transition cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                  <td className="px-4 py-3 font-medium">{t.sujet}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.user}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.priority === "Haute" ? "bg-destructive/10 text-destructive" : t.priority === "Moyenne" ? "bg-orange/10 text-orange" : "bg-secondary text-muted-foreground"}`}>{t.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.statut === "Ouvert" ? "bg-orange/10 text-orange" : t.statut === "En cours" ? "bg-navy/10 text-navy" : "bg-success/10 text-success"}`}>{t.statut}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <Icon className={`h-4 w-4 mb-2 ${color || "text-muted-foreground"}`} />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-bold text-navy">{value}</p>
    </div>
  );
}
