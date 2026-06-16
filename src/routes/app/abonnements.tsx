import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, RefreshCcw, Pencil, Trash2, Pause, Play } from "lucide-react";
import { useFinanceStore, type Abonnement } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/abonnements")({
  component: AbonnementsPage,
  head: () => ({ meta: [{ title: "Abonnements — LB Budget" }] }),
});

function AbonnementsPage() {
  const { abonnements, addAbonnement, removeAbonnement, updateAbonnement } = useFinanceStore();
  const actifs = abonnements.filter((a) => a.actif);
  const totalMensuel = actifs.reduce((s, a) => s + (a.frequence === "mensuel" ? a.montant : a.montant / 12), 0);
  const totalAnnuel = totalMensuel * 12;
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", montant: "", frequence: "mensuel" as Abonnement["frequence"], categorie: "", dateProchainPaiement: "", actif: true });

  const resetForm = () => { setForm({ nom: "", montant: "", frequence: "mensuel", categorie: "", dateProchainPaiement: "", actif: true }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, montant: Number(form.montant), frequence: form.frequence, categorie: form.categorie, dateProchainPaiement: form.dateProchainPaiement, actif: form.actif };
    if (editId) updateAbonnement(editId, data);
    else addAbonnement(data);
    resetForm();
  };

  const startEdit = (a: Abonnement) => {
    setForm({ nom: a.nom, montant: String(a.montant), frequence: a.frequence, categorie: a.categorie, dateProchainPaiement: a.dateProchainPaiement, actif: a.actif });
    setEditId(a.id); setShowForm(true);
  };

  const toggleActive = (a: Abonnement) => updateAbonnement(a.id, { actif: !a.actif });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Abonnements</h1>
          <p className="text-sm text-muted-foreground">{actifs.length} actifs · <span className="font-semibold text-orange">{totalMensuel.toFixed(2)} €/mois</span> · {totalAnnuel.toFixed(0)} €/an</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvel abonnement"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div><label className="text-xs font-medium text-muted-foreground">Nom</label><input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Netflix, Spotify..." /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Montant (€)</label><input type="number" step="0.01" value={form.montant} onChange={(e) => setForm({ ...form, montant: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Fréquence</label><select value={form.frequence} onChange={(e) => setForm({ ...form, frequence: e.target.value as Abonnement["frequence"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange"><option value="mensuel">Mensuel</option><option value="annuel">Annuel</option></select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Catégorie</label><input value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="Streaming, SaaS..." /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Prochain paiement</label><input type="date" value={form.dateProchainPaiement} onChange={(e) => setForm({ ...form, dateProchainPaiement: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Ajouter"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {abonnements.map((a) => (
          <div key={a.id} className={`rounded-2xl border bg-card p-4 shadow-card transition ${a.actif ? "border-border" : "border-dashed border-border/60 opacity-60"}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-sm font-bold">{a.nom}</h3>
                <p className="text-xs text-muted-foreground">{a.categorie}</p>
              </div>
              <div className="flex gap-0.5">
                <button onClick={() => toggleActive(a)} className="p-1.5 text-muted-foreground hover:text-foreground" title={a.actif ? "Suspendre" : "Réactiver"}>
                  {a.actif ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => startEdit(a)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => removeAbonnement(a.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <span className="font-display text-lg font-bold text-navy">{a.montant.toLocaleString("fr-FR")} €</span>
                <span className="text-xs text-muted-foreground">/{a.frequence === "mensuel" ? "mois" : "an"}</span>
              </div>
              {a.actif && a.dateProchainPaiement && (
                <span className="text-[10px] text-muted-foreground">Prochain : {new Date(a.dateProchainPaiement).toLocaleDateString("fr-FR")}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {abonnements.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <RefreshCcw className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 font-display text-lg font-bold text-foreground/50">Aucun abonnement</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ajoutez vos abonnements pour suivre vos dépenses récurrentes.</p>
        </div>
      )}
    </div>
  );
}
