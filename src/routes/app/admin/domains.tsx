import { createFileRoute } from "@tanstack/react-router";
import { Globe, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/app/admin/domains")({
  component: AdminDomainsPage,
  head: () => ({ meta: [{ title: "Domaines — Admin LB Budget" }] }),
});

function AdminDomainsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Domaines</h1>
          <p className="text-sm text-muted-foreground">Gérez vos noms de domaine et DNS</p>
        </div>
        <button className="rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          + Ajouter un domaine
        </button>
      </div>

      <div className="space-y-4">
        <DomainCard
          domain="lbbudgetpro.lovable.app"
          type="Production"
          ssl={true}
          statut="Actif"
          primary
        />
        <DomainCard
          domain="lbbudget.com"
          type="Custom (à configurer)"
          ssl={false}
          statut="Non configuré"
          primary={false}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-sm font-bold text-navy mb-4">Configuration DNS requise</h3>
        <p className="text-sm text-muted-foreground mb-4">Pour connecter un domaine personnalisé, ajoutez ces enregistrements chez votre registrar :</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Nom</th>
                <th className="px-4 py-2 text-left font-semibold">Valeur</th>
                <th className="px-4 py-2 text-left font-semibold">TTL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="px-4 py-2 font-mono text-xs">CNAME</td>
                <td className="px-4 py-2 font-mono text-xs">www</td>
                <td className="px-4 py-2 font-mono text-xs">cname.lovable.app</td>
                <td className="px-4 py-2 text-muted-foreground">3600</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-4 py-2 font-mono text-xs">A</td>
                <td className="px-4 py-2 font-mono text-xs">@</td>
                <td className="px-4 py-2 font-mono text-xs">76.76.21.21</td>
                <td className="px-4 py-2 text-muted-foreground">3600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DomainCard({ domain, type, ssl, statut, primary }: { domain: string; type: string; ssl: boolean; statut: string; primary: boolean }) {
  return (
    <div className={`rounded-2xl border bg-card p-5 shadow-card ${primary ? "border-success/30" : "border-border"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className={`h-5 w-5 ${primary ? "text-success" : "text-muted-foreground"}`} />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-navy">{domain}</p>
              {primary && <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">Principal</span>}
            </div>
            <p className="text-xs text-muted-foreground">{type}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {ssl ? <CheckCircle className="h-3.5 w-3.5 text-success" /> : <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />}
            <span className="text-xs">{ssl ? "SSL actif" : "Pas de SSL"}</span>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statut === "Actif" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>{statut}</span>
        </div>
      </div>
    </div>
  );
}
