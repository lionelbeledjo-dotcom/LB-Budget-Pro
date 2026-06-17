import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CreditCard, FileText, PiggyBank, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useFinanceStore } from "@/lib/store/finance-store";
import { useState } from "react";

export const Route = createFileRoute("/app/calendrier")({
  component: CalendrierPage,
  head: () => ({ meta: [{ title: "Calendrier — LB Budget" }] }),
});

function CalendrierPage() {
  const { factures, abonnements, transactions, addTransaction, addFacture } = useFinanceStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [form, setForm] = useState({ label: "", montant: "", type: "depense" as "depense" | "revenu" | "facture" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const events = [
    ...factures.filter((f) => f.statut !== "payee").map((f) => ({ date: f.dateEcheance, label: f.nom, montant: f.montant, type: "facture" as const })),
    ...abonnements.filter((a) => a.actif).map((a) => ({ date: a.dateProchainPaiement, label: a.nom, montant: a.montant, type: "abonnement" as const })),
    ...transactions.filter((t) => t.recurrence === "mensuel").map((t) => ({ date: t.date, label: t.description, montant: t.montant, type: t.type === "revenu" ? "revenu" as const : "depense" as const })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setShowAdd(true);
  };

  const handleAdd = () => {
    if (!form.label || !form.montant) return;
    const montant = parseFloat(form.montant);
    if (isNaN(montant)) return;

    if (form.type === "facture") {
      addFacture({ nom: form.label, montant, dateEcheance: selectedDate, statut: "a_payer", recurrence: "unique", categorie: "Autre" });
    } else {
      addTransaction({ type: form.type, montant, categorie: "Autre", description: form.label, date: selectedDate, recurrence: "unique" });
    }

    setForm({ label: "", montant: "", type: "depense" });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Calendrier financier</h1>
          <p className="text-sm text-muted-foreground">Cliquez sur un jour pour ajouter un événement</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="rounded-xl border border-border p-2 hover:bg-secondary transition"><ChevronLeft className="h-4 w-4" /></button>
          <span className="px-3 font-display text-sm font-bold text-navy capitalize">
            {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
          </span>
          <button onClick={nextMonth} className="rounded-xl border border-border p-2 hover:bg-secondary transition"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: offset }).map((_, i) => <div key={`empty-${i}`} />)}
          {days.map((day) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvents = events.filter((e) => e.date === dateStr);
            const isToday = isCurrentMonth && day === today.getDate();
            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`min-h-[70px] rounded-xl border p-1.5 text-xs cursor-pointer transition hover:border-orange/50 hover:bg-orange/5 ${isToday ? "border-orange bg-orange/5" : "border-border/50"}`}
              >
                <span className={`font-semibold ${isToday ? "text-orange" : "text-foreground"}`}>{day}</span>
                {dayEvents.slice(0, 2).map((e, i) => (
                  <div key={i} className={`mt-0.5 truncate rounded px-1 py-0.5 text-[9px] font-medium ${e.type === "revenu" ? "bg-success/10 text-success" : e.type === "facture" ? "bg-orange/10 text-orange" : "bg-navy/10 text-navy"}`}>
                    {e.label}
                  </div>
                ))}
                {dayEvents.length > 2 && <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 2}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-sm font-bold text-navy mb-4">Prochains événements</h3>
        <div className="space-y-3">
          {events.slice(0, 10).map((e, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/30 px-4 py-3">
              <div className={`grid h-8 w-8 place-items-center rounded-lg ${e.type === "revenu" ? "bg-success/10 text-success" : e.type === "facture" ? "bg-orange/10 text-orange" : e.type === "abonnement" ? "bg-navy/10 text-navy" : "bg-destructive/10 text-destructive"}`}>
                {e.type === "revenu" ? <PiggyBank className="h-4 w-4" /> : e.type === "facture" ? <FileText className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{e.label}</p>
                <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("fr-FR")}</p>
              </div>
              <span className={`font-display text-sm font-bold ${e.type === "revenu" ? "text-success" : "text-foreground"}`}>
                {e.type === "revenu" ? "+" : "-"}{e.montant.toLocaleString("fr-FR")} €
              </span>
            </div>
          ))}
          {events.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">Aucun événement à venir</p>}
        </div>
      </div>

      {/* Modal ajout */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-elegant" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-navy">Ajouter un événement</h3>
              <button onClick={() => setShowAdd(false)} className="rounded-lg p-1 hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Date : {new Date(selectedDate).toLocaleDateString("fr-FR")}</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-orange">
                  <option value="depense">Dépense</option>
                  <option value="revenu">Revenu</option>
                  <option value="facture">Facture à payer</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium">Description</label>
                <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="Ex: Loyer, Salaire..." className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
              </div>
              <div>
                <label className="text-xs font-medium">Montant (€)</label>
                <input type="number" value={form.montant} onChange={e => setForm(f => ({ ...f, montant: e.target.value }))} placeholder="0.00" className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
              </div>
              <button onClick={handleAdd} className="w-full rounded-xl bg-orange-gradient py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
