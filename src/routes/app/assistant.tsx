import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, Bot, User, Lightbulb, TrendingDown, PiggyBank, AlertTriangle } from "lucide-react";
import { useFinanceStore } from "@/lib/store/finance-store";

export const Route = createFileRoute("/app/assistant")({
  component: AssistantPage,
  head: () => ({ meta: [{ title: "Assistant IA — LB Budget" }] }),
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

function generateInsights(store: ReturnType<typeof useFinanceStore.getState>) {
  const insights: string[] = [];
  const revenus = store.transactions.filter((t) => t.type === "revenu").reduce((s, t) => s + t.montant, 0);
  const depenses = store.transactions.filter((t) => t.type === "depense").reduce((s, t) => s + t.montant, 0);
  const tauxEpargne = revenus > 0 ? ((revenus - depenses) / revenus) * 100 : 0;

  if (tauxEpargne < 20) insights.push(`⚠️ Votre taux d'épargne est de ${tauxEpargne.toFixed(0)}%. L'objectif recommandé est de 20% minimum.`);
  if (tauxEpargne >= 20) insights.push(`✅ Bravo ! Votre taux d'épargne de ${tauxEpargne.toFixed(0)}% est excellent.`);

  const abonnements = store.abonnements.filter((a) => a.actif);
  const totalAbo = abonnements.reduce((s, a) => s + (a.frequence === "mensuel" ? a.montant : a.montant / 12), 0);
  if (totalAbo > revenus * 0.1) insights.push(`💡 Vos abonnements représentent ${((totalAbo / revenus) * 100).toFixed(0)}% de vos revenus. Essayez de rester sous 10%.`);

  const dettesHautTaux = store.dettes.filter((d) => d.tauxInteret > 10);
  if (dettesHautTaux.length > 0) insights.push(`🚨 Vous avez ${dettesHautTaux.length} dette(s) à taux élevé (>10%). Priorisez leur remboursement.`);

  const fondsUrgence = store.epargne.find((e) => e.type === "urgence");
  if (!fondsUrgence) insights.push("💰 Conseil : créez un fonds d'urgence couvrant 3 à 6 mois de dépenses.");
  else if (fondsUrgence.actuel < depenses * 3) insights.push(`💰 Votre fonds d'urgence couvre ${(fondsUrgence.actuel / depenses).toFixed(1)} mois. Visez au minimum 3 mois.`);

  return insights;
}

function AssistantPage() {
  const store = useFinanceStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const insights = generateInsights(store);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);

    let response = "Je suis votre assistant financier IA. ";
    const q = input.toLowerCase();
    if (q.includes("épargne") || q.includes("epargne")) {
      const total = store.epargne.reduce((s, e) => s + e.actuel, 0);
      response = `Votre épargne totale est de ${total.toLocaleString("fr-FR")} €. ${total > 5000 ? "C'est un bon début !" : "Essayez d'augmenter vos versements mensuels."}`;
    } else if (q.includes("dette")) {
      const total = store.dettes.reduce((s, d) => s + d.soldeRestant, 0);
      response = `Votre dette totale est de ${total.toLocaleString("fr-FR")} €. ${store.dettes.some((d) => d.tauxInteret > 10) ? "Priorité : remboursez les dettes à taux élevé en premier (méthode avalanche)." : "Continuez vos remboursements réguliers."}`;
    } else if (q.includes("budget")) {
      const b = store.budgets.find((b) => b.type === "mensuel");
      response = b ? `Votre budget mensuel est de ${b.montant.toLocaleString("fr-FR")} €. Vous avez dépensé ${b.depense.toLocaleString("fr-FR")} € (${Math.round((b.depense / b.montant) * 100)}%).` : "Vous n'avez pas encore de budget mensuel. Je vous conseille d'en créer un !";
    } else if (q.includes("investissement") || q.includes("portefeuille")) {
      const total = store.investissements.reduce((s, i) => s + i.valeurActuelle, 0);
      response = `Votre portefeuille vaut ${total.toLocaleString("fr-FR")} €. Diversifiez entre actions, ETF et immobilier pour réduire le risque.`;
    } else if (q.includes("conseil") || q.includes("recommandation")) {
      response = insights.length > 0 ? insights.join("\n\n") : "Vos finances sont en bonne santé ! Continuez ainsi.";
    } else {
      response = "Je peux vous aider avec : votre épargne, vos dettes, votre budget, vos investissements, ou vous donner des conseils personnalisés. Que souhaitez-vous savoir ?";
    }

    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: response }]);
    }, 500);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Assistant IA</h1>
        <p className="text-sm text-muted-foreground">Votre conseiller financier personnel</p>
      </div>

      {/* Quick insights */}
      <div className="grid gap-3 sm:grid-cols-2">
        {insights.slice(0, 4).map((insight, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-orange/10 text-orange">
              {i === 0 ? <TrendingDown className="h-4 w-4" /> : i === 1 ? <Lightbulb className="h-4 w-4" /> : i === 2 ? <AlertTriangle className="h-4 w-4" /> : <PiggyBank className="h-4 w-4" />}
            </div>
            <p className="text-sm text-foreground/80">{insight}</p>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="border-b border-border bg-navy/5 px-5 py-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-orange" />
          <h3 className="font-display text-sm font-bold text-navy">Conversation</h3>
        </div>
        <div className="h-80 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Bot className="h-5 w-5" />
              <p className="text-sm">Bonjour ! Je suis votre assistant financier. Posez-moi une question sur vos finances, votre budget, vos dettes ou vos investissements.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-orange/10 text-orange"><Bot className="h-4 w-4" /></div>}
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-navy text-white" : "bg-secondary text-foreground"}`}>
                <p className="whitespace-pre-line">{m.content}</p>
              </div>
              {m.role === "user" && <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy/10 text-navy"><User className="h-4 w-4" /></div>}
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Posez une question sur vos finances..."
            className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
          />
          <button onClick={handleSend} className="grid h-10 w-10 place-items-center rounded-xl bg-orange text-white hover:bg-orange/90 transition">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
