import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, FileText, Image, PenLine, Eye, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/admin/content")({
  component: AdminContentPage,
  head: () => ({ meta: [{ title: "Contenu & Pages — Admin LB Budget" }] }),
});

function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Contenu & Pages</h1>
          <p className="text-sm text-muted-foreground">Gérez les pages, articles et annonces</p>
        </div>
        <button className="rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          + Nouveau contenu
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Pages du site</h3>
          </div>
          <div className="space-y-2">
            {[
              { titre: "Page d'accueil (Landing)", statut: "Publiée", modif: "16/06" },
              { titre: "Tarifs & Abonnements", statut: "Publiée", modif: "14/06" },
              { titre: "FAQ", statut: "Publiée", modif: "12/06" },
              { titre: "Mentions légales", statut: "Publiée", modif: "01/06" },
              { titre: "CGV", statut: "Brouillon", modif: "10/06" },
            ].map(p => (
              <div key={p.titre} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{p.titre}</p>
                  <p className="text-xs text-muted-foreground">Modifié le {p.modif}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.statut === "Publiée" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>{p.statut}</span>
                  <button className="rounded-lg p-1 hover:bg-secondary"><PenLine className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Annonces & Notifications</h3>
          </div>
          <div className="space-y-2">
            {[
              { titre: "Nouvelle fonctionnalité : Assistant IA", type: "Bannière", actif: true },
              { titre: "Maintenance prévue le 20/06", type: "Email", actif: true },
              { titre: "Black Friday : -50% sur Premium", type: "Pop-up", actif: false },
              { titre: "Bienvenue aux nouveaux inscrits", type: "In-app", actif: true },
            ].map(a => (
              <div key={a.titre} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{a.titre}</p>
                  <p className="text-xs text-muted-foreground">{a.type}</p>
                </div>
                <div className={`h-5 w-9 rounded-full transition ${a.actif ? "bg-orange" : "bg-border"}`}>
                  <div className={`h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition ${a.actif ? "translate-x-4.5" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
