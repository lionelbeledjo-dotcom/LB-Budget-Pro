import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Wallet, Pencil, Trash2 } from "lucide-react";
import { useFinanceStore, type Budget } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/budget")({
  component: BudgetPage,
  head: () => ({ meta: [{ title: "Budget — LB Budget" }] }),
});

const TYPES: { value: Budget["type"]; label: string }[] = [
  { value: "mensuel", label: "Mensuel" },
  { value: "annuel", label: "Annuel" },
  { value: "personnalise", label: "Personnalisé" },
  { value: "categorie", label: "Par catégorie" },
  { value: "familial", label: "Familial" },
  { value: "professionnel", label: "Professionnel" },
  { value: "projet", label: "Projet" },
];

function BudgetPage() {
  const { budgets, addBudget, removeBudget, updateBudget } = useFinanceStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", type: "mensuel" as Budget["type"], montant: "", depense: "0", periode: "2026-06", categorie: "" });

  const resetForm = () => {
    setForm({ nom: "", type: "mensuel", montant: "", depense: "0", periode: "2026-06", categorie: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, type: form.type, montant: Number(form.montant), depense: Number(form.depense), periode: form.periode, categorie: form.categorie || undefined };
    if (editId) {
      updateBudget(editId, data);
    } else {
      addBudget(data);
    }
    resetForm();
  };

  const startEdit = (b: Budget) => {
    setForm({ nom: b.nom, type: b.type, montant: String(b.montant), depense: String(b.depense), periode: b.periode, categorie: b.categorie || "" });
    setEditId(b.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Budget</h1>
          <p className="text-sm text-muted-foreground">Gérez vos budgets mensuels, annuels et par catégorie</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Nouveau budget
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier le budget" : "Créer un budget"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nom</label>
              <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Budget mensuel Juin" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Budget["type"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Montant (€)</label>
              <input type="number" step="0.01" value={form.montant} onChange={(e) => setForm({ ...form, montant: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="4500" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Période</label>
              <input value={form.periode} onChange={(e) => setForm({ ...form, periode: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="2026-06" />
            </div>
            {form.type === "categorie" && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Catégorie</label>
                <input value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Alimentation" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">
              {editId ? "Modifier" : "Créer"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Budget list */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((b) => {
          const pct = Math.min(100, Math.round((b.depense / b.montant) * 100));
          const overBudget = pct > 90;
          return (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${overBudget ? "bg-destructive/10 text-destructive" : "bg-navy/5 text-navy"}`}>
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-foreground">{b.nom}</h3>
                    <p className="text-xs text-muted-foreground">{TYPES.find((t) => t.value === b.type)?.label} · {b.periode}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(b)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => removeBudget(b.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Utilisé : {pct}%</span>
                  <span className="font-semibold">{b.depense.toLocaleString("fr-FR")} € / {b.montant.toLocaleString("fr-FR")} €</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full transition-all ${overBudget ? "bg-destructive" : pct > 70 ? "bg-orange" : "bg-success"}`} style={{ width: `${pct}%` }} />
                </div>
                <p className={`mt-2 text-xs font-semibold ${overBudget ? "text-destructive" : "text-success"}`}>
                  Restant : {(b.montant - b.depense).toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Wallet className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 font-display text-lg font-bold text-foreground/50">Aucun budget</h3>
          <p className="mt-1 text-sm text-muted-foreground">Créez votre premier budget pour commencer à suivre vos finances.</p>
        </div>
      )}
    </div>
  );
}
