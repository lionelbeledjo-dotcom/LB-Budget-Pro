import { useFinanceStore } from "./finance-store";
import {
  DEMO_TRANSACTIONS, DEMO_BUDGETS, DEMO_FACTURES,
  DEMO_EPARGNE, DEMO_DETTES, DEMO_INVESTISSEMENTS,
  DEMO_ABONNEMENTS, DEMO_OBJECTIFS,
} from "../data/demo-data";

export function initDemoData() {
  const store = useFinanceStore.getState();

  if (store.transactions.length > 0) return;

  DEMO_TRANSACTIONS.forEach((t) => store.addTransaction(t));
  DEMO_BUDGETS.forEach((b) => store.addBudget(b));
  DEMO_FACTURES.forEach((f) => store.addFacture(f));
  DEMO_EPARGNE.forEach((e) => store.addEpargne(e));
  DEMO_DETTES.forEach((d) => store.addDette(d));
  DEMO_INVESTISSEMENTS.forEach((i) => store.addInvestissement(i));
  DEMO_ABONNEMENTS.forEach((a) => store.addAbonnement(a));
  DEMO_OBJECTIFS.forEach((o) => store.addObjectif(o));
}
