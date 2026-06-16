import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BarChart3, Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useFinanceStore, type Investissement } from "@/lib/store/finance-store";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/app/investissements")({
  component: InvestissementsPage,
  head: () => ({ meta: [{ title: "Investissements — LB Budget" }] }),
});

const TYPES: { value: Investissement["type"]; label: string }[] = [
  { value: "action", label: "Actions" },
  { value: "etf", label: "ETF" },
  { value: "crypto", label: "Crypto" },
  { value: "immobilier", label: "Immobilier" },
  { value: "autre", label: "Autre" },
];

const COLORS = ["#0A2E5C", "#FF6B00", "#10B981", "#6366F1", "#F59E0B"];

function InvestissementsPage() {
  const { investissements, addInvestissement, removeInvestissement, updateInvestissement } = useFinanceStore();
  const totalInvesti = investissements.reduce((s, i) => s + i.montantInvesti, 0);
  const valeurTotale = investissements.reduce((s, i) => s + i.valeurActuelle, 0);
  const gainTotal = valeurTotale - totalInvesti;
  const rendement = totalInvesti > 0 ? ((gainTotal / totalInvesti) * 100).toFixed(1) : "0";

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", type: "etf" as Investissement["type"], montantInvesti: "", valeurActuelle: "", dateAchat: "", quantite: "", symbole: "" });

  const resetForm = () => { setForm({ nom: "", type: "etf", montantInvesti: "", valeurActuelle: "", dateAchat: "", quantite: "", symbole: "" }); setEditId(null); setShowForm(false); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom: form.nom, type: form.type, montantInvesti: Number(form.montantInvesti), valeurActuelle: Number(form.valeurActuelle), dateAchat: form.dateAchat, quantite: form.quantite ? Number(form.quantite) : undefined, symbole: form.symbole || undefined };
    if (editId) updateInvestissement(editId, data);
    else addInvestissement(data);
    resetForm();
  };

  const startEdit = (i: Investissement) => {
    setForm({ nom: i.nom, type: i.type, montantInvesti: String(i.montantInvesti), valeurActuelle: String(i.valeurActuelle), dateAchat: i.dateAchat, quantite: i.quantite ? String(i.quantite) : "", symbole: i.symbole || "" });
    setEditId(i.id); setShowForm(true);
  };

  const repartition = TYPES.map((t) => ({
    name: t.label,
    value: investissements.filter((i) => i.type === t.value).reduce((s, i) => s + i.valeurActuelle, 0),
  })).filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Investissements</h1>
          <p className="text-sm text-muted-foreground">Portefeuille : <span className="font-semibold text-navy">{valeurTotale.toLocaleString("fr-FR")} €</span> · Rendement : <span className={`font-semibold ${gainTotal >= 0 ? "text-success" : "text-destructive"}`}>{gainTotal >= 0 ? "+" : ""}{rendement}%</span></p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card text-center">
          <p className="text-xs text-muted-foreground">Total investi</p>
          <p className="font-display text-xl font-bold text-navy">{totalInvesti.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card text-center">
          <p className="text-xs text-muted-foreground">Valeur actuelle</p>
          <p className="font-display text-xl font-bold text-navy">{valeurTotale.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card text-center">
          <p className="text-xs text-muted-foreground">Plus/Moins-value</p>
          <p className={`font-display text-xl font-bold ${gainTotal >= 0 ? "text-success" : "text-destructive"}`}>
            {gainTotal >= 0 ? "+" : ""}{gainTotal.toLocaleString("fr-FR")} €
          </p>
        </div>
      </div>

      {/* Répartition pie */}
      {repartition.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Répartition des actifs</h3>
          <div className="flex items-center gap-6">
            <div className="h-44 w-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={repartition} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                    {repartition.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} €`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 text-xs">
              {repartition.map((d, i) => (
                <li key={d.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                  <span>{d.name}</span>
                  <span className="ml-auto font-semibold">{d.value.toLocaleString("fr-FR")} €</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4">
          <h3 className="font-display font-bold text-navy">{editId ? "Modifier" : "Nouvel investissement"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div><label className="text-xs font-medium text-muted-foreground">Nom</label><input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Investissement["type"] })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">{TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Symbole</label><input value={form.symbole} onChange={(e) => setForm({ ...form, symbole: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="CW8, TTE, BTC..." /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Montant investi (€)</label><input type="number" step="0.01" value={form.montantInvesti} onChange={(e) => setForm({ ...form, montantInvesti: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Valeur actuelle (€)</label><input type="number" step="0.01" value={form.valeurActuelle} onChange={(e) => setForm({ ...form, valeurActuelle: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Date d'achat</label><input type="date" value={form.dateAchat} onChange={(e) => setForm({ ...form, dateAchat: e.target.value })} required className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange" /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">{editId ? "Modifier" : "Ajouter"}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">Annuler</button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Actif</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Investi</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Valeur</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">+/-</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {investissements.map((i) => {
              const gain = i.valeurActuelle - i.montantInvesti;
              const pct = ((gain / i.montantInvesti) * 100).toFixed(1);
              return (
                <tr key={i.id} className="hover:bg-secondary/30 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium">{i.nom}</div>
                    {i.symbole && <span className="text-xs text-muted-foreground">{i.symbole}</span>}
                  </td>
                  <td className="px-4 py-3"><span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-medium text-navy">{TYPES.find((t) => t.value === i.type)?.label}</span></td>
                  <td className="px-4 py-3 text-right">{i.montantInvesti.toLocaleString("fr-FR")} €</td>
                  <td className="px-4 py-3 text-right font-semibold">{i.valeurActuelle.toLocaleString("fr-FR")} €</td>
                  <td className={`px-4 py-3 text-right font-semibold ${gain >= 0 ? "text-success" : "text-destructive"}`}>
                    <span className="flex items-center justify-end gap-1">
                      {gain >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {gain >= 0 ? "+" : ""}{pct}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => startEdit(i)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => removeInvestissement(i.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {investissements.length === 0 && (
          <div className="p-12 text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">Aucun investissement</p>
          </div>
        )}
      </div>
    </div>
  );
}
