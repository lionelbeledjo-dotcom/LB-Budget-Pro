import type { Transaction, Budget, Facture, ObjectifEpargne, Dette, Investissement, Abonnement, Objectif } from "../store/finance-store";

export const CATEGORIES_REVENUS = [
  "Salaire", "Freelance", "Revenus locatifs", "Revenus passifs", "Dividendes", "Ventes", "Remboursements", "Autre",
];

export const CATEGORIES_DEPENSES = [
  "Logement", "Alimentation", "Transport", "Santé", "Éducation", "Loisirs",
  "Vêtements", "Assurances", "Télécommunications", "Énergie", "Restaurants",
  "Voyages", "Cadeaux", "Animaux", "Sport", "Beauté", "Autre",
];

export const DEMO_TRANSACTIONS: Omit<Transaction, "id">[] = [
  { type: "revenu", montant: 3200, categorie: "Salaire", description: "Salaire mensuel", date: "2026-06-01", recurrence: "mensuel" },
  { type: "revenu", montant: 850, categorie: "Freelance", description: "Mission design UI", date: "2026-06-05", recurrence: "unique" },
  { type: "revenu", montant: 450, categorie: "Revenus locatifs", description: "Loyer studio Bordeaux", date: "2026-06-01", recurrence: "mensuel" },
  { type: "depense", montant: 850, categorie: "Logement", description: "Loyer appartement", date: "2026-06-01", recurrence: "mensuel" },
  { type: "depense", montant: 120, categorie: "Énergie", description: "EDF + Gaz", date: "2026-06-05", recurrence: "mensuel" },
  { type: "depense", montant: 45, categorie: "Télécommunications", description: "Forfait mobile Free", date: "2026-06-03", recurrence: "mensuel" },
  { type: "depense", montant: 380, categorie: "Alimentation", description: "Courses supermarché", date: "2026-06-08", recurrence: "mensuel" },
  { type: "depense", montant: 65, categorie: "Transport", description: "Navigo", date: "2026-06-01", recurrence: "mensuel" },
  { type: "depense", montant: 150, categorie: "Restaurants", description: "Sorties restaurant", date: "2026-06-12", recurrence: "unique" },
  { type: "depense", montant: 89, categorie: "Loisirs", description: "Concert", date: "2026-06-15", recurrence: "unique" },
  { type: "depense", montant: 200, categorie: "Vêtements", description: "Achats vêtements été", date: "2026-06-10", recurrence: "unique" },
  { type: "depense", montant: 35, categorie: "Sport", description: "Abonnement salle", date: "2026-06-01", recurrence: "mensuel" },
  { type: "revenu", montant: 200, categorie: "Dividendes", description: "Dividendes ETF", date: "2026-06-15", recurrence: "unique" },
  { type: "depense", montant: 55, categorie: "Santé", description: "Pharmacie", date: "2026-06-07", recurrence: "unique" },
  { type: "depense", montant: 320, categorie: "Assurances", description: "Assurance auto", date: "2026-06-01", recurrence: "mensuel" },
];

export const DEMO_BUDGETS: Omit<Budget, "id">[] = [
  { nom: "Budget mensuel Juin", type: "mensuel", montant: 4500, depense: 2309, periode: "2026-06" },
  { nom: "Alimentation", type: "categorie", montant: 450, depense: 380, periode: "2026-06", categorie: "Alimentation" },
  { nom: "Loisirs & Sorties", type: "categorie", montant: 300, depense: 239, periode: "2026-06", categorie: "Loisirs" },
  { nom: "Transport", type: "categorie", montant: 150, depense: 65, periode: "2026-06", categorie: "Transport" },
  { nom: "Budget annuel 2026", type: "annuel", montant: 54000, depense: 14500, periode: "2026" },
];

export const DEMO_FACTURES: Omit<Facture, "id">[] = [
  { nom: "Loyer", montant: 850, dateEcheance: "2026-07-01", statut: "programmee", recurrence: "mensuel", categorie: "Logement" },
  { nom: "EDF", montant: 85, dateEcheance: "2026-06-25", statut: "a_payer", recurrence: "mensuel", categorie: "Énergie" },
  { nom: "Internet Free", montant: 29.99, dateEcheance: "2026-06-20", statut: "payee", recurrence: "mensuel", categorie: "Télécommunications" },
  { nom: "Assurance habitation", montant: 45, dateEcheance: "2026-07-05", statut: "programmee", recurrence: "mensuel", categorie: "Assurances" },
  { nom: "Impôts fonciers", montant: 1200, dateEcheance: "2026-09-15", statut: "a_payer", recurrence: "annuel", categorie: "Logement" },
];

export const DEMO_EPARGNE: Omit<ObjectifEpargne, "id">[] = [
  { nom: "Fonds d'urgence", type: "urgence", objectif: 10000, actuel: 6500, dateObjectif: "2026-12-31" },
  { nom: "Vacances Japon", type: "vacances", objectif: 5000, actuel: 2200, dateObjectif: "2027-04-01" },
  { nom: "Apport immobilier", type: "immobilier", objectif: 40000, actuel: 18500, dateObjectif: "2028-06-01" },
  { nom: "Nouvelle voiture", type: "automobile", objectif: 15000, actuel: 4800 },
];

export const DEMO_DETTES: Omit<Dette, "id">[] = [
  { nom: "Crédit immobilier", type: "immobilier", montantInitial: 180000, soldeRestant: 145000, tauxInteret: 2.1, mensualite: 850, dateDebut: "2022-03-01", dateFin: "2042-03-01" },
  { nom: "Crédit auto", type: "consommation", montantInitial: 12000, soldeRestant: 4500, tauxInteret: 3.9, mensualite: 250, dateDebut: "2024-01-01", dateFin: "2027-01-01" },
  { nom: "Carte Visa", type: "carte_credit", montantInitial: 2000, soldeRestant: 800, tauxInteret: 18.5, mensualite: 150, dateDebut: "2026-01-01" },
];

export const DEMO_INVESTISSEMENTS: Omit<Investissement, "id">[] = [
  { nom: "MSCI World ETF", type: "etf", montantInvesti: 8000, valeurActuelle: 9450, dateAchat: "2024-03-01", symbole: "CW8" },
  { nom: "Actions Total", type: "action", montantInvesti: 3000, valeurActuelle: 3680, dateAchat: "2024-06-15", quantite: 50, symbole: "TTE" },
  { nom: "Bitcoin", type: "crypto", montantInvesti: 2000, valeurActuelle: 3200, dateAchat: "2025-01-10", quantite: 0.025, symbole: "BTC" },
  { nom: "SCPI Épargne Pierre", type: "immobilier", montantInvesti: 5000, valeurActuelle: 5350, dateAchat: "2023-09-01" },
];

export const DEMO_ABONNEMENTS: Omit<Abonnement, "id">[] = [
  { nom: "Netflix", montant: 15.49, frequence: "mensuel", categorie: "Streaming", dateProchainPaiement: "2026-07-01", actif: true },
  { nom: "Spotify", montant: 10.99, frequence: "mensuel", categorie: "Musique", dateProchainPaiement: "2026-06-28", actif: true },
  { nom: "Disney+", montant: 8.99, frequence: "mensuel", categorie: "Streaming", dateProchainPaiement: "2026-07-05", actif: true },
  { nom: "Amazon Prime", montant: 69.90, frequence: "annuel", categorie: "Shopping", dateProchainPaiement: "2026-11-15", actif: true },
  { nom: "ChatGPT Plus", montant: 20, frequence: "mensuel", categorie: "SaaS", dateProchainPaiement: "2026-06-22", actif: true },
  { nom: "iCloud 200Go", montant: 2.99, frequence: "mensuel", categorie: "Stockage", dateProchainPaiement: "2026-06-30", actif: true },
  { nom: "Salle de sport", montant: 35, frequence: "mensuel", categorie: "Sport", dateProchainPaiement: "2026-07-01", actif: true },
  { nom: "Canal+", montant: 25.99, frequence: "mensuel", categorie: "Streaming", dateProchainPaiement: "2026-07-10", actif: false },
];

export const DEMO_OBJECTIFS: Omit<Objectif, "id">[] = [
  { nom: "Rembourser carte Visa", type: "remboursement", cible: 2000, actuel: 1200, dateObjectif: "2026-09-01", statut: "en_cours" },
  { nom: "Épargne 6 mois de salaire", type: "epargne", cible: 19200, actuel: 6500, dateObjectif: "2027-06-01", statut: "en_cours" },
  { nom: "Revenus passifs 500€/mois", type: "revenu", cible: 500, actuel: 200, statut: "en_cours" },
  { nom: "Réduire dépenses resto à 100€", type: "depense", cible: 100, actuel: 150, dateObjectif: "2026-07-31", statut: "en_cours" },
];
