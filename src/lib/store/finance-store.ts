import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TransactionType = "revenu" | "depense";
export type RecurrenceType = "unique" | "mensuel" | "hebdomadaire" | "annuel";

export interface Transaction {
  id: string;
  type: TransactionType;
  montant: number;
  categorie: string;
  sousCategorie?: string;
  description: string;
  date: string;
  recurrence: RecurrenceType;
  tags?: string[];
}

export interface Budget {
  id: string;
  nom: string;
  type: "mensuel" | "annuel" | "personnalise" | "categorie" | "familial" | "professionnel" | "projet";
  montant: number;
  depense: number;
  periode: string;
  categorie?: string;
}

export interface Facture {
  id: string;
  nom: string;
  montant: number;
  dateEcheance: string;
  statut: "a_payer" | "payee" | "en_retard" | "programmee";
  recurrence: RecurrenceType;
  categorie: string;
}

export interface ObjectifEpargne {
  id: string;
  nom: string;
  type: "urgence" | "vacances" | "immobilier" | "automobile" | "personnalise";
  objectif: number;
  actuel: number;
  dateObjectif?: string;
  icone?: string;
}

export interface Dette {
  id: string;
  nom: string;
  type: "immobilier" | "consommation" | "carte_credit" | "personnel";
  montantInitial: number;
  soldeRestant: number;
  tauxInteret: number;
  mensualite: number;
  dateDebut: string;
  dateFin?: string;
}

export interface Investissement {
  id: string;
  nom: string;
  type: "action" | "etf" | "crypto" | "immobilier" | "autre";
  montantInvesti: number;
  valeurActuelle: number;
  dateAchat: string;
  quantite?: number;
  symbole?: string;
}

export interface Abonnement {
  id: string;
  nom: string;
  montant: number;
  frequence: "mensuel" | "annuel";
  categorie: string;
  dateProchainPaiement: string;
  actif: boolean;
}

export interface Objectif {
  id: string;
  nom: string;
  description?: string;
  type: "epargne" | "remboursement" | "revenu" | "depense" | "personnalise";
  cible: number;
  actuel: number;
  dateObjectif?: string;
  statut: "en_cours" | "atteint" | "abandonne";
}

interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  factures: Facture[];
  epargne: ObjectifEpargne[];
  dettes: Dette[];
  investissements: Investissement[];
  abonnements: Abonnement[];
  objectifs: Objectif[];
  devise: string;

  addTransaction: (t: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;

  addBudget: (b: Omit<Budget, "id">) => void;
  removeBudget: (id: string) => void;
  updateBudget: (id: string, b: Partial<Budget>) => void;

  addFacture: (f: Omit<Facture, "id">) => void;
  removeFacture: (id: string) => void;
  updateFacture: (id: string, f: Partial<Facture>) => void;

  addEpargne: (e: Omit<ObjectifEpargne, "id">) => void;
  removeEpargne: (id: string) => void;
  updateEpargne: (id: string, e: Partial<ObjectifEpargne>) => void;

  addDette: (d: Omit<Dette, "id">) => void;
  removeDette: (id: string) => void;
  updateDette: (id: string, d: Partial<Dette>) => void;

  addInvestissement: (i: Omit<Investissement, "id">) => void;
  removeInvestissement: (id: string) => void;
  updateInvestissement: (id: string, i: Partial<Investissement>) => void;

  addAbonnement: (a: Omit<Abonnement, "id">) => void;
  removeAbonnement: (id: string) => void;
  updateAbonnement: (id: string, a: Partial<Abonnement>) => void;

  addObjectif: (o: Omit<Objectif, "id">) => void;
  removeObjectif: (id: string) => void;
  updateObjectif: (id: string, o: Partial<Objectif>) => void;
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      budgets: [],
      factures: [],
      epargne: [],
      dettes: [],
      investissements: [],
      abonnements: [],
      objectifs: [],
      devise: "EUR",

      addTransaction: (t) => set((s) => ({ transactions: [{ ...t, id: uid() }, ...s.transactions] })),
      removeTransaction: (id) => set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),
      updateTransaction: (id, t) => set((s) => ({ transactions: s.transactions.map((x) => (x.id === id ? { ...x, ...t } : x)) })),

      addBudget: (b) => set((s) => ({ budgets: [{ ...b, id: uid() }, ...s.budgets] })),
      removeBudget: (id) => set((s) => ({ budgets: s.budgets.filter((b) => b.id !== id) })),
      updateBudget: (id, b) => set((s) => ({ budgets: s.budgets.map((x) => (x.id === id ? { ...x, ...b } : x)) })),

      addFacture: (f) => set((s) => ({ factures: [{ ...f, id: uid() }, ...s.factures] })),
      removeFacture: (id) => set((s) => ({ factures: s.factures.filter((f) => f.id !== id) })),
      updateFacture: (id, f) => set((s) => ({ factures: s.factures.map((x) => (x.id === id ? { ...x, ...f } : x)) })),

      addEpargne: (e) => set((s) => ({ epargne: [{ ...e, id: uid() }, ...s.epargne] })),
      removeEpargne: (id) => set((s) => ({ epargne: s.epargne.filter((e) => e.id !== id) })),
      updateEpargne: (id, e) => set((s) => ({ epargne: s.epargne.map((x) => (x.id === id ? { ...x, ...e } : x)) })),

      addDette: (d) => set((s) => ({ dettes: [{ ...d, id: uid() }, ...s.dettes] })),
      removeDette: (id) => set((s) => ({ dettes: s.dettes.filter((d) => d.id !== id) })),
      updateDette: (id, d) => set((s) => ({ dettes: s.dettes.map((x) => (x.id === id ? { ...x, ...d } : x)) })),

      addInvestissement: (i) => set((s) => ({ investissements: [{ ...i, id: uid() }, ...s.investissements] })),
      removeInvestissement: (id) => set((s) => ({ investissements: s.investissements.filter((i) => i.id !== id) })),
      updateInvestissement: (id, i) => set((s) => ({ investissements: s.investissements.map((x) => (x.id === id ? { ...x, ...i } : x)) })),

      addAbonnement: (a) => set((s) => ({ abonnements: [{ ...a, id: uid() }, ...s.abonnements] })),
      removeAbonnement: (id) => set((s) => ({ abonnements: s.abonnements.filter((a) => a.id !== id) })),
      updateAbonnement: (id, a) => set((s) => ({ abonnements: s.abonnements.map((x) => (x.id === id ? { ...x, ...a } : x)) })),

      addObjectif: (o) => set((s) => ({ objectifs: [{ ...o, id: uid() }, ...s.objectifs] })),
      removeObjectif: (id) => set((s) => ({ objectifs: s.objectifs.filter((o) => o.id !== id) })),
      updateObjectif: (id, o) => set((s) => ({ objectifs: s.objectifs.map((x) => (x.id === id ? { ...x, ...o } : x)) })),
    }),
    { name: "lb-budget-finance" },
  ),
);
