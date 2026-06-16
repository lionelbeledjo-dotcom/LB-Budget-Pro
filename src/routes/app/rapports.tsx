import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, BarChart3, Calendar } from "lucide-react";
import { useFinanceStore } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/rapports")({
  component: RapportsPage,
  head: () => ({ meta: [{ title: "Rapports — LB Budget" }] }),
});

function RapportsPage() {
  const { transactions, budgets, epargne, dettes, investissements } = useFinanceStore();
  const revenus = transactions.filter((t) => t.type === "revenu").reduce((s, t) => s + t.montant, 0);
  const depenses = transactions.filter((t) => t.type === "depense").reduce((s, t) => s + t.montant, 0);

  const exportCSV = () => {
    const headers = "Date;Type;Catégorie;Description;Montant\n";
    const rows = transactions.map((t) => `${t.date};${t.type};${t.categorie};${t.description};${t.montant}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "lb-budget-transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Rapports</h1>
          <p className="text-sm text-muted-foreground">Analysez et exportez vos données financières</p>
        </div>
      </div>

      {/* Export actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <button onClick={exportCSV} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition text-left">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success"><Download className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-sm font-bold">Export CSV</h3>
            <p className="text-xs text-muted-foreground">Toutes les transactions</p>
          </div>
        </button>
        <button className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition text-left opacity-60">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange"><FileText className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-sm font-bold">Export PDF</h3>
            <p className="text-xs text-muted-foreground">Bientôt disponible</p>
          </div>
        </button>
        <button className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition text-left opacity-60">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/10 text-navy"><BarChart3 className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-sm font-bold">Export Excel</h3>
            <p className="text-xs text-muted-foreground">Bientôt disponible</p>
          </div>
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2"><Calendar className="h-5 w-5" /> Résumé mensuel — Juin 2026</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-success/5 border border-success/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Revenus</p>
            <p className="font-display text-xl font-bold text-success">{revenus.toLocaleString("fr-FR")} €</p>
          </div>
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Dépenses</p>
            <p className="font-display text-xl font-bold text-destructive">{depenses.toLocaleString("fr-FR")} €</p>
          </div>
          <div className="rounded-xl bg-navy/5 border border-navy/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Solde net</p>
            <p className={`font-display text-xl font-bold ${revenus - depenses >= 0 ? "text-success" : "text-destructive"}`}>{(revenus - depenses).toLocaleString("fr-FR")} €</p>
          </div>
          <div className="rounded-xl bg-orange/5 border border-orange/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Taux d'épargne</p>
            <p className="font-display text-xl font-bold text-orange">{revenus > 0 ? Math.round(((revenus - depenses) / revenus) * 100) : 0}%</p>
          </div>
        </div>
      </div>

      {/* Report types */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: "Rapport mensuel", desc: "Analyse complète du mois en cours", period: "Juin 2026" },
          { title: "Rapport trimestriel", desc: "Comparaison sur 3 mois", period: "T2 2026" },
          { title: "Rapport annuel", desc: "Vue d'ensemble de l'année", period: "2026" },
          { title: "Rapport personnalisé", desc: "Choisissez vos dates", period: "Sur mesure" },
        ].map((r) => (
          <div key={r.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-navy">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{r.period}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
