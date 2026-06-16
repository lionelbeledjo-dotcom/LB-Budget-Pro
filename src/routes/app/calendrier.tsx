import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CreditCard, FileText, PiggyBank } from "lucide-react";
import { useFinanceStore } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/calendrier")({
  component: CalendrierPage,
  head: () => ({ meta: [{ title: "Calendrier — LB Budget" }] }),
});

function CalendrierPage() {
  const { factures, abonnements, transactions } = useFinanceStore();

  const events = [
    ...factures.filter((f) => f.statut !== "payee").map((f) => ({ date: f.dateEcheance, label: f.nom, montant: f.montant, type: "facture" as const })),
    ...abonnements.filter((a) => a.actif).map((a) => ({ date: a.dateProchainPaiement, label: a.nom, montant: a.montant, type: "abonnement" as const })),
    ...transactions.filter((t) => t.recurrence === "mensuel").map((t) => ({ date: t.date, label: t.description, montant: t.montant, type: t.type === "revenu" ? "revenu" as const : "depense" as const })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Calendrier financier</h1>
        <p className="text-sm text-muted-foreground">{today.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>
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
            const isToday = day === today.getDate();
            return (
              <div key={day} className={`min-h-[70px] rounded-xl border p-1.5 text-xs ${isToday ? "border-orange bg-orange/5" : "border-border/50"}`}>
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
    </div>
  );
}
