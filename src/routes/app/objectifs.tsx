import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Target, Pencil, Trash2, CheckCircle2, Trophy } from "lucide-react";
import { useFinanceStore, type Objectif } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/objectifs")({
  component: ObjectifsPage,
  head: () => ({ meta: [{ title: "Objectifs — LB Budget" }] }),
});

const TYPES: { value: Objectif["type"]; label: string }[] = [
  { value: "epargne", label: "Épargne" },
  { value: "remboursement", label: "Remboursement" },
  { value: "revenu", label: "Revenu" },
  { value: "depense", label: "Réduction dépense" },
  { value: "personnalise", label: "Personnalisé" },
];

function ObjectifsPage() {
  const { objectifs, addObjectif, removeObjectif, updateObjectif } = useFinanceStore();
  const enCours = objectifs.filter((o) => o.statut === "en_cours");
  const atteints = objectifs.filter((o) => o.statut === "atteint");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", description: "", type: "epargne" as Objectif["type"], cible: "", actuel: "", dateObjectif: "" });

  const resetForm = () => { setForm({ nom: "", description: "", type: "epargne", cible: "", actuel: "", dateObjectif: "" }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, description: form.description || undefined, type: form.type, cible: Number(form.cible), actuel: Number(form.actuel), dateObjectif: form.dateObjectif || undefined, statut: "en_cours" as const };
    if (editId) updateObjectif(editId, data);
    else addObjectif(data);
    resetForm();
  };

  const markDone = (id: string) => updateObjectif(id, { statut: "atteint" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Objectifs</h1>
          <p className="text-sm text-muted-foreground">{enCours.length} en cours · {atteints.length} atteints</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Nouvel objectif
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvel objectif"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div><label className="text-xs font-medium text-muted-foreground">Nom</label><input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Objectif["type"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">{TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Cible (€)</label><input type="number" step="0.01" value={form.cible} onChange={(e) => setForm({ ...form, cible: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Actuel (€)</label><input type="number" step="0.01" value={form.actuel} onChange={(e) => setForm({ ...form, actuel: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Date objectif</label><input type="date" value={form.dateObjectif} onChange={(e) => setForm({ ...form, dateObjectif: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Créer"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* En cours */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enCours.map((o) => {
          const pct = Math.min(100, Math.round((o.actuel / o.cible) * 100));
          return (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange"><Target className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-display text-sm font-bold">{o.nom}</h3>
                    <p className="text-xs text-muted-foreground">{TYPES.find((t) => t.value === o.type)?.label}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  <button onClick={() => markDone(o.id)} className="p-1.5 text-success hover:text-success/80" title="Marquer atteint"><CheckCircle2 className="h-3.5 w-3.5" /></button>
                  <button onClick={() => removeObjectif(o.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-orange">{pct}%</span>
                  <span className="text-muted-foreground">{o.actuel.toLocaleString("fr-FR")} € / {o.cible.toLocaleString("fr-FR")} €</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-orange transition-all" style={{ width: `${pct}%` }} />
                </div>
                {o.dateObjectif && <p className="mt-2 text-xs text-muted-foreground">Échéance : {new Date(o.dateObjectif).toLocaleDateString("fr-FR")}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Atteints */}
      {atteints.length > 0 && (
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-success mb-3"><Trophy className="h-5 w-5" /> Objectifs atteints</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {atteints.map((o) => (
              <div key={o.id} className="rounded-xl border border-success/30 bg-success/5 p-4">
                <h3 className="font-display text-sm font-bold text-success">{o.nom}</h3>
                <p className="text-xs text-muted-foreground">{o.cible.toLocaleString("fr-FR")} € atteints</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {objectifs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Target className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 font-display text-lg font-bold text-foreground/50">Aucun objectif</h3>
          <p className="mt-1 text-sm text-muted-foreground">Définissez des objectifs financiers pour rester motivé.</p>
        </div>
      )}
    </div>
  );
}
