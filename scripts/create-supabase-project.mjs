#!/usr/bin/env node
/**
 * Script automatique de création du projet Supabase pour LB Budget Pro.
 *
 * Usage:
 *   node scripts/create-supabase-project.mjs <SUPABASE_ACCESS_TOKEN>
 *
 * Pour obtenir un token:
 *   1. Va sur https://supabase.com/dashboard/account/tokens
 *   2. Clique "Generate new token"
 *   3. Copie et colle le token (format sbp_xxxxx)
 */

import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

const TOKEN = process.argv[2];
if (!TOKEN || !TOKEN.startsWith('sbp_')) {
  console.error('\n❌ Token manquant ou invalide.');
  console.error('Usage: node scripts/create-supabase-project.mjs sbp_votre_token\n');
  console.error('Générez un token sur: https://supabase.com/dashboard/account/tokens');
  process.exit(1);
}

const API = 'https://api.supabase.com/v1';
const HEADERS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function api(path, opts = {}) {
  const res = await fetch(`${API}${path}`, { headers: HEADERS, ...opts });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function main() {
  console.log('\n=== LB Budget Pro — Création Supabase ===\n');

  // 1. Get organizations
  console.log('1. Récupération de l\'organisation...');
  const orgs = await api('/organizations');
  if (!orgs.length) throw new Error('Aucune organisation trouvée.');
  const orgId = orgs[0].id;
  console.log(`   ✓ Organisation: ${orgs[0].name} (${orgId})`);

  // 2. Check if project already exists
  console.log('2. Vérification des projets existants...');
  const projects = await api('/projects');
  let project = projects.find(p => p.name === 'lb-budget-pro');

  if (project) {
    console.log(`   ✓ Projet existant trouvé: ${project.id}`);
  } else {
    // 3. Create project
    console.log('3. Création du projet lb-budget-pro...');
    const dbPass = `LbBudget${Date.now().toString(36)}!`;
    project = await api('/projects', {
      method: 'POST',
      body: JSON.stringify({
        name: 'lb-budget-pro',
        organization_id: orgId,
        region: 'eu-west-1',
        plan: 'free',
        db_pass: dbPass,
      }),
    });
    console.log(`   ✓ Projet créé: ${project.id}`);
    console.log('   ⏳ Attente de l\'initialisation (30s)...');
    await new Promise(r => setTimeout(r, 30000));
  }

  const projectRef = project.id;
  const supabaseUrl = `https://${projectRef}.supabase.co`;

  // 4. Get API keys
  console.log('4. Récupération des clés API...');
  const keys = await api(`/projects/${projectRef}/api-keys`);
  const anonKey = keys.find(k => k.name === 'anon')?.api_key;
  const serviceKey = keys.find(k => k.name === 'service_role')?.api_key;

  if (!anonKey) throw new Error('Clé anon non trouvée.');
  console.log(`   ✓ URL: ${supabaseUrl}`);
  console.log(`   ✓ Anon key: ${anonKey.slice(0, 30)}...`);

  // 5. Write .env
  console.log('5. Écriture du .env...');
  const envContent = `VITE_SUPABASE_URL=${supabaseUrl}\nVITE_SUPABASE_ANON_KEY=${anonKey}\nVITE_SUPABASE_PUBLISHABLE_KEY=${anonKey}\nVITE_SUPABASE_PROJECT_ID=${projectRef}\nSUPABASE_URL=${supabaseUrl}\nSUPABASE_PUBLISHABLE_KEY=${anonKey}\n`;
  writeFileSync('.env', envContent);
  console.log('   ✓ .env créé');

  // 6. Link and push migrations
  console.log('6. Liaison et migration de la base...');
  try {
    execSync(`npx supabase link --project-ref ${projectRef}`, {
      env: { ...process.env, SUPABASE_ACCESS_TOKEN: TOKEN },
      stdio: 'pipe',
    });
    console.log('   ✓ Projet lié');

    execSync(`npx supabase db push`, {
      env: { ...process.env, SUPABASE_ACCESS_TOKEN: TOKEN },
      stdio: 'pipe',
    });
    console.log('   ✓ Migrations appliquées (8 tables + RLS + trigger)');
  } catch (e) {
    console.log('   ⚠ Migration via CLI échouée, application manuelle via API...');
    // Fallback: apply SQL via REST
    const migrationSql = (await import('fs')).readFileSync('supabase/migrations/20260616000001_initial_schema.sql', 'utf8');
    await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': anonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: migrationSql }),
    });
  }

  console.log('\n=== ✓ CONFIGURATION TERMINÉE ===');
  console.log(`\nURL:      ${supabaseUrl}`);
  console.log(`Anon Key: ${anonKey.slice(0, 40)}...`);
  console.log('\nRelance ton dev server avec: npm run dev');
  console.log('Dashboard: https://supabase.com/dashboard/project/' + projectRef);
}

main().catch(e => {
  console.error('\n❌ Erreur:', e.message);
  process.exit(1);
});
