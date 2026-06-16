import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, CreditCard, Pencil, Trash2, Calculator } from "lucide-react";
import { useFinanceStore, type Dette } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/dettes")({
  component: DettesPage,
  head: () => ({ meta: [{ title: "Dettes — LB Budget" }] }),
});

const TYPES: { value: Dette["type"]; label: string }[] = [
  { value: "immobilier", label: "Crédit immobilier" },
  { value: "consommation", label: "Crédit consommation" },
  { value: "carte_credit", label: "Carte de crédit" },
  { value: "personnel", label: "Prêt personnel" },
];

function DettesPage() {
  const { dettes, addDette, removeDette, updateDette } = useFinanceStore();
  const totalDette = dettes.reduce((s, d) => s + d.soldeRestant, 0);
  const mensualiteTotal = dettes.reduce((s, d) => s + d.mensualite, 0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", type: "consommation" as Dette["type"], montantInitial: "", soldeRestant: "", tauxInteret: "", mensualite: "", dateDebut: "", dateFin: "" });

  const resetForm = () => { setForm({ nom: "", type: "consommation", montantInitial: "", soldeRestant: "", tauxInteret: "", mensualite: "", dateDebut: "", dateFin: "" }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, type: form.type, montantInitial: Number(form.montantInitial), soldeRestant: Number(form.soldeRestant), tauxInteret: Number(form.tauxInteret), mensualite: Number(form.mensualite), dateDebut: form.dateDebut, dateFin: form.dateFin || undefined };
    if (editId) updateDette(editId, data);
    else addDette(data);
    resetForm();
  };

  const startEdit = (d: Dette) => {
    setForm({ nom: d.nom, type: d.type, montantInitial: String(d.montantInitial), soldeRestant: String(d.soldeRestant), tauxInteret: String(d.tauxInteret), mensualite: String(d.mensualite), dateDebut: d.dateDebut, dateFin: d.dateFin || "" });
    setEditId(d.id); setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Dettes</h1>
          <p className="text-sm text-muted-foreground">Solde total : <span className="font-semibold text-destructive">{totalDette.toLocaleString("fr-FR")} €</span> · Mensualités : {mensualiteTotal.toLocaleString("fr-FR")} €/mois</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvelle dette"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div><label className="text-xs font-medium text-muted-foreground">Nom</label><input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Dette["type"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">{TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Montant initial (€)</label><input type="number" step="0.01" value={form.montantInitial} onChange={(e) => setForm({ ...form, montantInitial: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Solde restant (€)</label><input type="number" step="0.01" value={form.soldeRestant} onChange={(e) => setForm({ ...form, soldeRestant: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Taux d'intérêt (%)</label><input type="number" step="0.01" value={form.tauxInteret} onChange={(e) => setForm({ ...form, tauxInteret: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Mensualité (€)</label><input type="number" step="0.01" value={form.mensualite} onChange={(e) => setForm({ ...form, mensualite: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Date début</label><input type="date" value={form.dateDebut} onChange={(e) => setForm({ ...form, dateDebut: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Date fin (optionnel)</label><input type="date" value={form.dateFin} onChange={(e) => setForm({ ...form, dateFin: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Ajouter"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dettes.map((d) => {
          const pctRembourse = Math.round(((d.montantInitial - d.soldeRestant) / d.montantInitial) * 100);
          return (
            <div key={d.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/10 text-destructive">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold">{d.nom}</h3>
                    <p className="text-xs text-muted-foreground">{TYPES.find((t) => t.value === d.type)?.label} · {d.tauxInteret}%</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(d)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => removeDette(d.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Solde restant</span>
                  <span className="font-bold text-destructive">{d.soldeRestant.toLocaleString("fr-FR")} €</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Mensualité</span>
                  <span className="font-semibold">{d.mensualite.toLocaleString("fr-FR")} €/mois</span>
                </div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Remboursé</span>
                  <span className="font-semibold text-success">{pctRembourse}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-success transition-all" style={{ width: `${pctRembourse}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulateur */}
      {dettes.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-navy">
            <Calculator className="h-4 w-4" />
            <h3 className="font-display text-sm font-bold">Simulateur de remboursement</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Avec vos mensualités actuelles de {mensualiteTotal.toLocaleString("fr-FR")} €/mois, vous serez libre de dettes dans environ {Math.ceil(totalDette / mensualiteTotal)} mois.</p>
        </div>
      )}

      {dettes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 font-display text-lg font-bold text-foreground/50">Aucune dette</h3>
          <p className="mt-1 text-sm text-muted-foreground">Bravo ! Ajoutez vos crédits pour les suivre.</p>
        </div>
      )}
    </div>
  );
}
