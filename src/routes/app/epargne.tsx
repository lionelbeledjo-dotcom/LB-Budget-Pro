import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, PiggyBank, Pencil, Trash2, Target } from "lucide-react";
import { useFinanceStore, type ObjectifEpargne } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/epargne")({
  component: EpargnePage,
  head: () => ({ meta: [{ title: "Épargne — LB Budget" }] }),
});

const TYPES: { value: ObjectifEpargne["type"]; label: string }[] = [
  { value: "urgence", label: "Fonds d'urgence" },
  { value: "vacances", label: "Vacances" },
  { value: "immobilier", label: "Immobilier" },
  { value: "automobile", label: "Automobile" },
  { value: "personnalise", label: "Personnalisé" },
];

function EpargnePage() {
  const { epargne, addEpargne, removeEpargne, updateEpargne } = useFinanceStore();
  const totalEpargne = epargne.reduce((s, e) => s + e.actuel, 0);
  const totalObjectif = epargne.reduce((s, e) => s + e.objectif, 0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", type: "personnalise" as ObjectifEpargne["type"], objectif: "", actuel: "", dateObjectif: "" });

  const resetForm = () => { setForm({ nom: "", type: "personnalise", objectif: "", actuel: "", dateObjectif: "" }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, type: form.type, objectif: Number(form.objectif), actuel: Number(form.actuel), dateObjectif: form.dateObjectif || undefined };
    if (editId) updateEpargne(editId, data);
    else addEpargne(data);
    resetForm();
  };

  const startEdit = (ep: ObjectifEpargne) => {
    setForm({ nom: ep.nom, type: ep.type, objectif: String(ep.objectif), actuel: String(ep.actuel), dateObjectif: ep.dateObjectif || "" });
    setEditId(ep.id); setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Épargne</h1>
          <p className="text-sm text-muted-foreground">Total épargné : <span className="font-semibold text-success">{totalEpargne.toLocaleString("fr-FR")} €</span> / {totalObjectif.toLocaleString("fr-FR")} €</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Nouvel objectif
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvel objectif d'épargne"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nom</label>
              <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Vacances au Japon" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ObjectifEpargne["type"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Objectif (€)</label>
              <input type="number" step="0.01" value={form.objectif} onChange={(e) => setForm({ ...form, objectif: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Montant actuel (€)</label>
              <input type="number" step="0.01" value={form.actuel} onChange={(e) => setForm({ ...form, actuel: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Date objectif</label>
              <input type="date" value={form.dateObjectif} onChange={(e) => setForm({ ...form, dateObjectif: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Créer"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {epargne.map((ep) => {
          const pct = Math.min(100, Math.round((ep.actuel / ep.objectif) * 100));
          return (
            <div key={ep.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success">
                    <PiggyBank className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold">{ep.nom}</h3>
                    <p className="text-xs text-muted-foreground">{TYPES.find((t) => t.value === ep.type)?.label}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(ep)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => removeEpargne(ep.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-success">{pct}%</span>
                  <span className="text-muted-foreground">{ep.actuel.toLocaleString("fr-FR")} € / {ep.objectif.toLocaleString("fr-FR")} €</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-success transition-all" style={{ width: `${pct}%` }} />
                </div>
                {ep.dateObjectif && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="h-3 w-3" /> Objectif : {new Date(ep.dateObjectif).toLocaleDateString("fr-FR")}
                  </p>
                )}
                <p className="mt-1 text-xs font-semibold text-navy">Reste : {(ep.objectif - ep.actuel).toLocaleString("fr-FR")} €</p>
              </div>
            </div>
          );
        })}
      </div>

      {epargne.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 font-display text-lg font-bold text-foreground/50">Aucun objectif d'épargne</h3>
          <p className="mt-1 text-sm text-muted-foreground">Définissez vos objectifs pour suivre votre progression.</p>
        </div>
      )}
    </div>
  );
}
