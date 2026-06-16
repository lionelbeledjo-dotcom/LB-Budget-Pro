import { supabase } from "./supabase";
import { useFinanceStore } from "./store/finance-store";
import { useAuthStore } from "./store/auth-store";

export async function syncToSupabase() {
  const { user } = useAuthStore.getState();
  if (!user) return;

  const store = useFinanceStore.getState();

  await supabase.from("transactions").upsert(
    store.transactions.map((t) => ({ ...t, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("budgets").upsert(
    store.budgets.map((b) => ({ ...b, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("factures").upsert(
    store.factures.map((f) => ({ ...f, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("epargne").upsert(
    store.epargne.map((e) => ({ ...e, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("dettes").upsert(
    store.dettes.map((d) => ({ ...d, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("investissements").upsert(
    store.investissements.map((i) => ({ ...i, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("abonnements").upsert(
    store.abonnements.map((a) => ({ ...a, user_id: user.id })),
    { onConflict: "id" }
  );

  await supabase.from("objectifs").upsert(
    store.objectifs.map((o) => ({ ...o, user_id: user.id })),
    { onConflict: "id" }
  );
}

export async function loadFromSupabase() {
  const { user } = useAuthStore.getState();
  if (!user) return;

  const store = useFinanceStore.getState();

  const [transactions, budgets, factures, epargne, dettes, investissements, abonnements, objectifs] =
    await Promise.all([
      supabase.from("transactions").select("*").eq("user_id", user.id),
      supabase.from("budgets").select("*").eq("user_id", user.id),
      supabase.from("factures").select("*").eq("user_id", user.id),
      supabase.from("epargne").select("*").eq("user_id", user.id),
      supabase.from("dettes").select("*").eq("user_id", user.id),
      supabase.from("investissements").select("*").eq("user_id", user.id),
      supabase.from("abonnements").select("*").eq("user_id", user.id),
      supabase.from("objectifs").select("*").eq("user_id", user.id),
    ]);

  if (transactions.data?.length) {
    useFinanceStore.setState({ transactions: transactions.data });
  }
  if (budgets.data?.length) {
    useFinanceStore.setState({ budgets: budgets.data });
  }
  if (factures.data?.length) {
    useFinanceStore.setState({ factures: factures.data });
  }
  if (epargne.data?.length) {
    useFinanceStore.setState({ epargne: epargne.data });
  }
  if (dettes.data?.length) {
    useFinanceStore.setState({ dettes: dettes.data });
  }
  if (investissements.data?.length) {
    useFinanceStore.setState({ investissements: investissements.data });
  }
  if (abonnements.data?.length) {
    useFinanceStore.setState({ abonnements: abonnements.data });
  }
  if (objectifs.data?.length) {
    useFinanceStore.setState({ objectifs: objectifs.data });
  }
}
