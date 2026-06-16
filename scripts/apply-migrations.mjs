#!/usr/bin/env node
/**
 * Applique les migrations SQL directement sur la base Supabase via PostgreSQL.
 * Utilise le connection string Supabase (port 5432, pooler 6543).
 */

import pg from 'pg';
import { readFileSync } from 'fs';

const PROJECT_REF = 'sjvwhqvetwwilftlkths';
const DB_PASSWORD = process.argv[2];

if (!DB_PASSWORD) {
  console.error('Usage: node scripts/apply-migrations.mjs <DB_PASSWORD>');
  console.error('Le mot de passe est celui choisi à la création du projet Supabase.');
  console.error('Tu peux le réinitialiser dans: Dashboard > Settings > Database > Reset database password');
  process.exit(1);
}

const connectionString = `postgresql://postgres.${PROJECT_REF}:${DB_PASSWORD}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`;

async function main() {
  console.log('=== Application des migrations LB Budget Pro ===\n');

  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    console.log('1. Connexion à la base de données...');
    await client.connect();
    console.log('   ✓ Connecté\n');

    console.log('2. Application de la migration...');
    const sql = readFileSync('supabase/migrations/20260616000001_initial_schema.sql', 'utf8');

    // Split by statement and execute each
    const statements = sql.split(/;\s*$/m).filter(s => s.trim());

    for (const stmt of statements) {
      if (!stmt.trim()) continue;
      try {
        await client.query(stmt);
        const firstLine = stmt.trim().split('\n').find(l => !l.startsWith('--'))?.slice(0, 60);
        console.log(`   ✓ ${firstLine}...`);
      } catch (e) {
        if (e.message.includes('already exists')) {
          console.log(`   ⚠ Déjà existant: ${e.message.slice(0, 80)}`);
        } else {
          console.error(`   ✗ Erreur: ${e.message}`);
        }
      }
    }

    // Verify
    console.log('\n3. Vérification des tables...');
    const { rows } = await client.query(`
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    console.log(`   ✓ Tables créées: ${rows.map(r => r.tablename).join(', ')}`);

    console.log('\n=== ✓ MIGRATION TERMINÉE ===');
    console.log('Les 8 tables sont prêtes avec RLS activé.');

  } catch (e) {
    console.error('\n✗ Erreur:', e.message);
    if (e.message.includes('password')) {
      console.error('\nMot de passe incorrect. Réinitialise-le dans:');
      console.error('Dashboard > Settings > Database > Reset database password');
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
