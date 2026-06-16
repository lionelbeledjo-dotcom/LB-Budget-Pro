import { createFileRoute } from "@tanstack/react-router";
import { Layers, Check, X, PenLine } from "lucide-react";

export const Route = createFileRoute("/app/admin/plans")({
  component: AdminPlansPage,
  head: () => ({ meta: [{ title: "Plans & Tarifs — Admin LB Budget" }] }),
});

const PLANS = [
  {
    nom: "Gratuit",
    prix: "0 €",
    periode: "/mois",
    couleur: "border-border",
    features: [
      { label: "1 compte bancaire", inclus: true },
      { label: "Suivi dépenses basique", inclus: true },
      { label: "Budget mensuel", inclus: true },
      { label: "Export CSV", inclus: false },
      { label: "Assistant IA", inclus: false },
      { label: "Factures illimitées", inclus: false },
    ],
    users: 404,
  },
  {
    nom: "Pro",
    prix: "9 €",
    periode: "/mois",
    couleur: "border-navy",
    features: [
      { label: "5 comptes bancaires", inclus: true },
      { label: "Tous les modules", inclus: true },
      { label: "Export CSV & PDF", inclus: true },
      { label: "Assistant IA (50 requêtes/mois)", inclus: true },
      { label: "Factures illimitées", inclus: true },
      { label: "Support prioritaire", inclus: false },
    ],
    users: 612,
  },
  {
    nom: "Premium",
    prix: "19 €",
    periode: "/mois",
    couleur: "border-orange",
    features: [
      { label: "Comptes illimités", inclus: true },
      { label: "Tous les modules", inclus: true },
      { label: "Export CSV, PDF & API", inclus: true },
      { label: "Assistant IA illimité", inclus: true },
      { label: "Factures illimitées", inclus: true },
      { label: "Support prioritaire 24/7", inclus: true },
    ],
    users: 231,
  },
];

function AdminPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Plans & Tarifs</h1>
          <p className="text-sm text-muted-foreground">Configurez les offres et fonctionnalités</p>
        </div>
        <button className="rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          + Ajouter un plan
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map(plan => (
          <div key={plan.nom} className={`rounded-2xl border-2 ${plan.couleur} bg-card p-5 shadow-card`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-navy">{plan.nom}</h3>
                <p className="text-2xl font-bold text-navy">{plan.prix}<span className="text-sm font-normal text-muted-foreground">{plan.periode}</span></p>
              </div>
              <button className="rounded-lg p-2 hover:bg-secondary transition"><PenLine className="h-4 w-4" /></button>
            </div>

            <div className="space-y-2 mb-4">
              {plan.features.map(f => (
                <div key={f.label} className="flex items-center gap-2">
                  {f.inclus ? <Check className="h-3.5 w-3.5 text-success" /> : <X className="h-3.5 w-3.5 text-muted-foreground" />}
                  <span className={`text-sm ${f.inclus ? "" : "text-muted-foreground"}`}>{f.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-secondary/30 px-3 py-2 text-center">
              <span className="text-sm font-semibold text-navy">{plan.users}</span>
              <span className="text-xs text-muted-foreground ml-1">utilisateurs actifs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
