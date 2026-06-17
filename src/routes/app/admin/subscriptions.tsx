import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, TrendingUp, Users, X, Percent, Trash2, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/admin/subscriptions")({
  component: AdminSubscriptionsPage,
  head: () => ({ meta: [{ title: "Abonnements — Admin LB Budget" }] }),
});

const INITIAL_PLANS = [
  { id: "free", nom: "Gratuit", prix: 0, users: 404 },
  { id: "pro", nom: "Pro", prix: 9, users: 612 },
  { id: "premium", nom: "Premium", prix: 19, users: 231 },
];

const INITIAL_RENEWALS = [
  { id: 1, nom: "Marie Dupont", plan: "Pro", date: "17/06", montant: 9 },
  { id: 2, nom: "Hugo Leroy", plan: "Pro", date: "18/06", montant: 9 },
  { id: 3, nom: "Léa Girard", plan: "Premium", date: "19/06", montant: 19 },
  { id: 4, nom: "Sophie Bernard", plan: "Premium", date: "20/06", montant: 19 },
  { id: 5, nom: "Antoine Roux", plan: "Pro", date: "22/06", montant: 9 },
];

const INITIAL_CANCELLATIONS = [
  { id: 1, nom: "Paul Durand", ancien: "Pro", date: "15/06", raison: "Trop cher" },
  { id: 2, nom: "Julie Blanc", ancien: "Premium", date: "12/06", raison: "N'utilise plus" },
  { id: 3, nom: "Marc Simon", ancien: "Pro", date: "10/06", raison: "Fonctionnalités manquantes" },
];

function AdminSubscriptionsPage() {
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [renewals, setRenewals] = useState(INITIAL_RENEWALS);
  const [cancellations, setCancellations] = useState(INITIAL_CANCELLATIONS);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState("");
  const [promoModal, setPromoModal] = useState<number | null>(null);
  const [promoPercent, setPromoPercent] = useState("20");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const updatePrice = (planId: string) => {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price < 0) return;
    setPlans(prev => prev.map(p => p.id === planId ? { ...p, prix: price } : p));
    setEditingPlan(null);
    setNewPrice("");
    showToast(`Prix mis à jour : ${price} €/mois`);
  };

  const applyPromo = (renewalId: number) => {
    const pct = parseInt(promoPercent);
    if (isNaN(pct) || pct <= 0 || pct > 100) return;
    setRenewals(prev => prev.map(r => r.id === renewalId ? { ...r, montant: Math.round(r.montant * (1 - pct / 100) * 100) / 100 } : r));
    setPromoModal(null);
    showToast(`Promotion de ${pct}% appliquée`);
  };

  const deleteRenewal = (id: number) => {
    setRenewals(prev => prev.filter(r => r.id !== id));
    showToast("Abonnement annulé");
  };

  const deleteCancellation = (id: number) => {
    setCancellations(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-success/90 px-4 py-2.5 text-sm font-medium text-white shadow-lg animate-in fade-in">
          {toast}
        </div>
      )}

      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Abonnements</h1>
        <p className="text-sm text-muted-foreground">Gérez les plans, prix et promotions</p>
      </div>

      {/* Plans avec prix éditables */}
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map(p => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              {p.id === "free" ? <Users className="h-4 w-4 text-muted-foreground" /> : p.id === "pro" ? <CreditCard className="h-4 w-4 text-navy" /> : <TrendingUp className="h-4 w-4 text-orange" />}
              <span className="text-xs font-semibold text-muted-foreground">{p.nom}</span>
            </div>
            {editingPlan === p.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  className="w-20 rounded-lg border border-border px-2 py-1 text-lg font-bold outline-none focus:border-orange"
                  autoFocus
                />
                <span className="text-sm text-muted-foreground">€/mois</span>
                <button onClick={() => updatePrice(p.id)} className="rounded-lg bg-success/10 p-1 text-success hover:bg-success/20"><Check className="h-4 w-4" /></button>
                <button onClick={() => setEditingPlan(null)} className="rounded-lg bg-secondary p-1 hover:bg-secondary/80"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="font-display text-2xl font-bold text-navy">{p.prix} €</p>
                <span className="text-xs text-muted-foreground">/mois</span>
                {p.id !== "free" && (
                  <button onClick={() => { setEditingPlan(p.id); setNewPrice(String(p.prix)); }} className="ml-auto rounded-lg bg-secondary px-2 py-1 text-xs font-medium hover:bg-secondary/80 transition">
                    Modifier
                  </button>
                )}
              </div>
            )}
            <p className="mt-1 text-xs text-muted-foreground">{p.users} utilisateurs ({Math.round(p.users / 12.47)}%)</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Renouvellements */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Renouvellements à venir (7j)</h3>
          <div className="space-y-2">
            {renewals.map(r => (
              <div key={r.id} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{r.nom}</p>
                  <p className="text-xs text-muted-foreground">{r.plan} — {r.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-success">{r.montant} €</span>
                  <button onClick={() => { setPromoModal(r.id); setPromoPercent("20"); }} className="rounded-lg p-1 hover:bg-orange/10 text-orange transition" title="Appliquer promo">
                    <Percent className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => deleteRenewal(r.id)} className="rounded-lg p-1 hover:bg-destructive/10 text-destructive transition" title="Annuler">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {renewals.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Aucun renouvellement.</p>}
          </div>
        </div>

        {/* Résiliations */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Résiliations récentes</h3>
          <div className="space-y-2">
            {cancellations.map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-xl bg-destructive/5 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{c.nom}</p>
                  <p className="text-xs text-muted-foreground">{c.ancien} — {c.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-destructive">{c.raison}</span>
                  <button onClick={() => deleteCancellation(c.id)} className="rounded-lg p-1 hover:bg-secondary transition" title="Supprimer">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {cancellations.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Aucune résiliation.</p>}
          </div>
        </div>
      </div>

      {/* Modal promotion */}
      {promoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setPromoModal(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-elegant" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-navy">Appliquer une promotion</h3>
              <button onClick={() => setPromoModal(null)} className="rounded-lg p-1 hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <label className="text-sm font-medium">Réduction (%)</label>
            <input
              type="number"
              value={promoPercent}
              onChange={e => setPromoPercent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
              min="1" max="100"
            />
            <div className="mt-2 flex gap-2">
              {["10", "20", "30", "50"].map(p => (
                <button key={p} onClick={() => setPromoPercent(p)} className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${promoPercent === p ? "bg-orange text-white" : "bg-secondary hover:bg-secondary/80"}`}>
                  {p}%
                </button>
              ))}
            </div>
            <button onClick={() => applyPromo(promoModal)} className="mt-4 w-full rounded-xl bg-orange-gradient py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
              Appliquer la réduction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
