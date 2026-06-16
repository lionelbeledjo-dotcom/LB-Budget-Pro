import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Plus, Receipt, Pencil, Trash2, Search, Upload } from "lucide-react";
import { useFinanceStore, type Transaction } from "@/lib/store/finance-store";
import { CATEGORIES_DEPENSES } from "@/lib/data/demo-data";

export const Route = createFileRoute("/app/depenses")({
  component: DepensesPage,
  head: () => ({ meta: [{ title: "Dépenses — LB Budget" }] }),
});

function DepensesPage() {
  const { transactions, addTransaction, removeTransaction, updateTransaction } = useFinanceStore();
  const depenses = transactions.filter((t) => t.type === "depense");
  const total = depenses.reduce((s, t) => s + t.montant, 0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Toutes");
  const [form, setForm] = useState({ montant: "", categorie: "Alimentation", description: "", date: new Date().toISOString().slice(0, 10), recurrence: "unique" as Transaction["recurrence"] });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split("\n").filter(Boolean);
      lines.slice(1).forEach((line) => {
        const cols = line.split(";").length > 1 ? line.split(";") : line.split(",");
        if (cols.length >= 4) {
          addTransaction({
            type: "depense",
            date: cols[0]?.trim() || new Date().toISOString().slice(0, 10),
            categorie: cols[1]?.trim() || "Autre",
            description: cols[2]?.trim() || "",
            montant: Math.abs(Number(cols[3]?.trim().replace(",", ".") || 0)),
            recurrence: "unique",
          });
        }
      });
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const resetForm = () => { setForm({ montant: "", categorie: "Alimentation", description: "", date: new Date().toISOString().slice(0, 10), recurrence: "unique" }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { type: "depense" as const, montant: Number(form.montant), categorie: form.categorie, description: form.description, date: form.date, recurrence: form.recurrence };
    if (editId) updateTransaction(editId, data);
    else addTransaction(data);
    resetForm();
  };

  const startEdit = (t: Transaction) => {
    setForm({ montant: String(t.montant), categorie: t.categorie, description: t.description, date: t.date, recurrence: t.recurrence });
    setEditId(t.id); setShowForm(true);
  };

  const filtered = depenses.filter((t) => {
    const matchSearch = !search || t.description.toLowerCase().includes(search.toLowerCase()) || t.categorie.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Toutes" || t.categorie === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Dépenses</h1>
          <p className="text-sm text-muted-foreground">Total ce mois : <span className="font-semibold text-destructive">{total.toLocaleString("fr-FR")} €</span></p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary transition">
            <Upload className="h-4 w-4" /> Import CSV
          </button>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvelle dépense"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Montant (€)</label>
              <input type="number" step="0.01" value={form.montant} onChange={(e) => setForm({ ...form, montant: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Catégorie</label>
              <select value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">
                {CATEGORIES_DEPENSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Récurrence</label>
              <select value={form.recurrence} onChange={(e) => setForm({ ...form, recurrence: e.target.value as Transaction["recurrence"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">
                <option value="unique">Unique</option>
                <option value="mensuel">Mensuel</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Courses, loyer, abonnement..." />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Ajouter"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-orange" />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">
          <option value="Toutes">Toutes les catégories</option>
          {CATEGORIES_DEPENSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Catégorie</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Récurrence</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Montant</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-secondary/30 transition">
                <td className="px-4 py-3 text-muted-foreground">{new Date(t.date).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3 font-medium">{t.description}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-medium text-navy">{t.categorie}</span></td>
                <td className="px-4 py-3 text-muted-foreground capitalize">{t.recurrence}</td>
                <td className="px-4 py-3 text-right font-semibold text-destructive">-{t.montant.toLocaleString("fr-FR")} €</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(t)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => removeTransaction(t.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Receipt className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">Aucune dépense trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
