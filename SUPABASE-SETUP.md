# Configuration Supabase — LB Budget Pro

## 1. Créer le projet

1. Va sur https://supabase.com/dashboard
2. Connecte-toi avec ton compte **lionelbeledjo-dotcom**
3. Clique **New Project**
4. Nom : `lb-budget-pro`
5. Mot de passe DB : choisis-en un fort
6. Région : **West EU (Paris)** pour la latence
7. Clique **Create new project**

## 2. Récupérer les clés

1. Va dans **Settings > API**
2. Copie :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
3. Crée un fichier `.env` à la racine du projet avec :
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## 3. Créer les tables via Table Editor

Va dans **Table Editor** et crée chaque table ci-dessous.

### Table : `profiles`
| Colonne | Type | Options |
|---------|------|---------|
| id | uuid | PK, default: auth.uid() |
| email | text | not null |
| full_name | text | |
| avatar_url | text | |
| plan | text | default: 'free' |
| created_at | timestamptz | default: now() |

**RLS** : Enable, policy "Users can read/update own profile" → `auth.uid() = id`

### Table : `transactions`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| type | text | not null (revenu/depense) |
| montant | numeric | not null |
| categorie | text | not null |
| description | text | |
| date | text | not null |
| recurrence | text | |

**RLS** : `auth.uid() = user_id`

### Table : `budgets`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| categorie | text | not null |
| limite | numeric | not null |
| depense | numeric | default: 0 |
| periode | text | default: 'mensuel' |
| couleur | text | |

**RLS** : `auth.uid() = user_id`

### Table : `factures`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| nom | text | not null |
| montant | numeric | not null |
| date_echeance | text | not null |
| statut | text | default: 'a_payer' |
| recurrence | text | |
| categorie | text | |

**RLS** : `auth.uid() = user_id`

### Table : `epargne`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| nom | text | not null |
| objectif | numeric | not null |
| actuel | numeric | default: 0 |
| type | text | |
| date_cible | text | |

**RLS** : `auth.uid() = user_id`

### Table : `dettes`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| nom | text | not null |
| montant_initial | numeric | not null |
| montant_restant | numeric | not null |
| taux_interet | numeric | |
| mensualite | numeric | |
| date_fin | text | |

**RLS** : `auth.uid() = user_id`

### Table : `investissements`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| nom | text | not null |
| type | text | not null |
| montant_investi | numeric | not null |
| valeur_actuelle | numeric | not null |
| date_achat | text | |
| rendement | numeric | |

**RLS** : `auth.uid() = user_id`

### Table : `abonnements`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| nom | text | not null |
| montant | numeric | not null |
| frequence | text | default: 'mensuel' |
| categorie | text | |
| date_debut | text | |
| actif | boolean | default: true |

**RLS** : `auth.uid() = user_id`

### Table : `objectifs`
| Colonne | Type | Options |
|---------|------|---------|
| id | text | PK |
| user_id | uuid | not null, FK → auth.users(id) |
| titre | text | not null |
| description | text | |
| progression | numeric | default: 0 |
| date_cible | text | |
| atteint | boolean | default: false |
| categorie | text | |

**RLS** : `auth.uid() = user_id`

## 4. Activer RLS sur TOUTES les tables

Pour chaque table :
1. Clique sur la table
2. Va dans l'onglet **RLS**
3. Active **Enable RLS**
4. Ajoute une policy :
   - Name : `Users manage own data`
   - Target roles : `authenticated`
   - USING expression : `auth.uid() = user_id`
   - WITH CHECK expression : `auth.uid() = user_id`

Pour `profiles` :
   - USING : `auth.uid() = id`
   - WITH CHECK : `auth.uid() = id`

## 5. Auth Settings

1. Va dans **Authentication > Providers**
2. Active **Email** (déjà activé par défaut)
3. Désactive **Confirm email** si tu veux tester sans vérification
4. Optionnel : Active **Google** provider pour login social

## 6. Trigger pour créer le profil auto

Va dans **SQL Editor** et exécute :
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

Une fois fait, donne-moi l'URL et la clé anon pour que je configure le `.env`.
