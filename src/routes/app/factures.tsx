import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, FileText, Pencil, Trash2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useFinanceStore, type Facture } from "@/lib/store/finance-store";
import { CATEGORIES_DEPENSES } from "@/lib/data/demo-data";

export const Route = createFileRoute("/app/factures")({
  component: FacturesPage,
  head: () => ({ meta: [{ title: "Factures — LB Budget" }] }),
});

const STATUTS: { value: Facture["statut"]; label: string; color: string }[] = [
  { value: "a_payer", label: "À payer", color: "text-orange bg-orange/10" },
  { value: "payee", label: "Payée", color: "text-success bg-success/10" },
  { value: "en_retard", label: "En retard", color: "text-destructive bg-destructive/10" },
  { value: "programmee", label: "Programmée", color: "text-navy bg-navy/10" },
];

function FacturesPage() {
  const { factures, addFacture, removeFacture, updateFacture } = useFinanceStore();
  const totalAPayer = factures.filter((f) => f.statut === "a_payer" || f.statut === "en_retard").reduce((s, f) => s + f.montant, 0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", montant: "", dateEcheance: "", statut: "a_payer" as Facture["statut"], recurrence: "mensuel" as Facture["recurrence"], categorie: "Logement" });

  const resetForm = () => { setForm({ nom: "", montant: "", dateEcheance: "", statut: "a_payer", recurrence: "mensuel", categorie: "Logement" }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, montant: Number(form.montant), dateEcheance: form.dateEcheance, statut: form.statut, recurrence: form.recurrence, categorie: form.categorie };
    if (editId) updateFacture(editId, data);
    else addFacture(data);
    resetForm();
  };

  const startEdit = (f: Facture) => {
    setForm({ nom: f.nom, montant: String(f.montant), dateEcheance: f.dateEcheance, statut: f.statut, recurrence: f.recurrence, categorie: f.categorie });
    setEditId(f.id); setShowForm(true);
  };

  const markPaid = (id: string) => updateFacture(id, { statut: "payee" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Factures</h1>
          <p className="text-sm text-muted-foreground">À payer : <span className="font-semibold text-orange">{totalAPayer.toLocaleString("fr-FR")} €</span></p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvelle facture"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div><label className="text-xs font-medium text-muted-foreground">Nom</label><input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Montant (€)</label><input type="number" step="0.01" value={form.montant} onChange={(e) => setForm({ ...form, montant: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Échéance</label><input type="date" value={form.dateEcheance} onChange={(e) => setForm({ ...form, dateEcheance: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Statut</label><select value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value as Facture["statut"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">{STATUTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Récurrence</label><select value={form.recurrence} onChange={(e) => setForm({ ...form, recurrence: e.target.value as Facture["recurrence"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"><option value="unique">Unique</option><option value="mensuel">Mensuel</option><option value="annuel">Annuel</option></select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Catégorie</label><select value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">{CATEGORIES_DEPENSES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Ajouter"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Facture</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Catégorie</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Échéance</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Statut</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Montant</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {factures.map((f) => {
              const s = STATUTS.find((st) => st.value === f.statut)!;
              return (
                <tr key={f.id} className="hover:bg-secondary/30 transition">
                  <td className="px-4 py-3 font-medium">{f.nom}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.categorie}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(f.dateEcheance).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.color}`}>{f.statut === "payee" ? <CheckCircle2 className="h-3 w-3" /> : f.statut === "en_retard" ? <AlertCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}{s.label}</span></td>
                  <td className="px-4 py-3 text-right font-semibold">{f.montant.toLocaleString("fr-FR")} €</td>
                  <td className="px-4 py-3 text-right">
                    {f.statut !== "payee" && <button onClick={() => markPaid(f.id)} className="p-1.5 text-success hover:text-success/80" title="Marquer payée"><CheckCircle2 className="h-3.5 w-3.5" /></button>}
                    <button onClick={() => startEdit(f)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => removeFacture(f.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {factures.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">Aucune facture</p>
          </div>
        )}
      </div>
    </div>
  );
}
