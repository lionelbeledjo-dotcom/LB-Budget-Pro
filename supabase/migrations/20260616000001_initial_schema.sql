-- Profiles table (auto-created on signup)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Transactions
CREATE TABLE public.transactions (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('revenu', 'depense')),
  montant NUMERIC NOT NULL,
  categorie TEXT NOT NULL,
  description TEXT DEFAULT '',
  date TEXT NOT NULL,
  recurrence TEXT DEFAULT 'unique'
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own transactions" ON public.transactions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Budgets
CREATE TABLE public.budgets (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  categorie TEXT NOT NULL,
  limite NUMERIC NOT NULL,
  depense NUMERIC DEFAULT 0,
  periode TEXT DEFAULT 'mensuel',
  couleur TEXT
);

ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own budgets" ON public.budgets FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Factures
CREATE TABLE public.factures (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  montant NUMERIC NOT NULL,
  date_echeance TEXT NOT NULL,
  statut TEXT DEFAULT 'a_payer',
  recurrence TEXT,
  categorie TEXT
);

ALTER TABLE public.factures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own factures" ON public.factures FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Epargne
CREATE TABLE public.epargne (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  objectif NUMERIC NOT NULL,
  actuel NUMERIC DEFAULT 0,
  type TEXT,
  date_cible TEXT
);

ALTER TABLE public.epargne ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own epargne" ON public.epargne FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Dettes
CREATE TABLE public.dettes (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  montant_initial NUMERIC NOT NULL,
  montant_restant NUMERIC NOT NULL,
  taux_interet NUMERIC,
  mensualite NUMERIC,
  date_fin TEXT
);

ALTER TABLE public.dettes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own dettes" ON public.dettes FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Investissements
CREATE TABLE public.investissements (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  type TEXT NOT NULL,
  montant_investi NUMERIC NOT NULL,
  valeur_actuelle NUMERIC NOT NULL,
  date_achat TEXT,
  rendement NUMERIC
);

ALTER TABLE public.investissements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own investissements" ON public.investissements FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Abonnements
CREATE TABLE public.abonnements (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  montant NUMERIC NOT NULL,
  frequence TEXT DEFAULT 'mensuel',
  categorie TEXT,
  date_debut TEXT,
  actif BOOLEAN DEFAULT true
);

ALTER TABLE public.abonnements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own abonnements" ON public.abonnements FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Objectifs
CREATE TABLE public.objectifs (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  description TEXT,
  progression NUMERIC DEFAULT 0,
  date_cible TEXT,
  atteint BOOLEAN DEFAULT false,
  categorie TEXT
);

ALTER TABLE public.objectifs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own objectifs" ON public.objectifs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
