#!/bin/bash
# Script de configuration Supabase pour LB Budget Pro
# Usage: SUPABASE_ACCESS_TOKEN=xxx bash scripts/setup-supabase.sh

set -e

PROJECT_NAME="lb-budget-pro"
ORG_ID=""
REGION="eu-west-1"

echo "=== LB Budget Pro — Configuration Supabase ==="

# Check token
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "Erreur: SUPABASE_ACCESS_TOKEN non défini."
  echo "Génère un token sur: https://supabase.com/dashboard/account/tokens"
  echo "Puis relance: SUPABASE_ACCESS_TOKEN=ton_token bash scripts/setup-supabase.sh"
  exit 1
fi

echo "1. Récupération des organisations..."
ORG_ID=$(npx supabase orgs list --output json 2>/dev/null | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const o=JSON.parse(d);console.log(o[0]?.id||'')" 2>/dev/null)

if [ -z "$ORG_ID" ]; then
  echo "Erreur: Aucune organisation trouvée. Vérifie ton token."
  exit 1
fi
echo "   Organisation: $ORG_ID"

echo "2. Création du projet '$PROJECT_NAME'..."
PROJECT_OUTPUT=$(npx supabase projects create "$PROJECT_NAME" --org-id "$ORG_ID" --region "$REGION" --output json 2>/dev/null || echo "EXIST")

if [ "$PROJECT_OUTPUT" = "EXIST" ]; then
  echo "   Le projet existe peut-être déjà, recherche..."
  PROJECT_OUTPUT=$(npx supabase projects list --output json 2>/dev/null)
  PROJECT_ID=$(echo "$PROJECT_OUTPUT" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const o=JSON.parse(d);const p=o.find(x=>x.name==='$PROJECT_NAME');console.log(p?.id||'')")
else
  PROJECT_ID=$(echo "$PROJECT_OUTPUT" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const o=JSON.parse(d);console.log(o?.id||'')")
fi

if [ -z "$PROJECT_ID" ]; then
  echo "Erreur: Impossible de créer ou trouver le projet."
  exit 1
fi
echo "   Project ID: $PROJECT_ID"

echo "3. Récupération des clés API..."
sleep 5  # Wait for project to be ready
API_KEYS=$(npx supabase projects api-keys --project-ref "$PROJECT_ID" --output json 2>/dev/null)
ANON_KEY=$(echo "$API_KEYS" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const o=JSON.parse(d);const k=o.find(x=>x.name==='anon');console.log(k?.api_key||'')")
SUPABASE_URL="https://${PROJECT_ID}.supabase.co"

echo "   URL: $SUPABASE_URL"
echo "   Anon Key: ${ANON_KEY:0:20}..."

echo "4. Écriture du fichier .env..."
cat > .env << EOL
VITE_SUPABASE_URL=$SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$ANON_KEY
EOL
echo "   .env créé ✓"

echo "5. Lien du projet et push des migrations..."
npx supabase link --project-ref "$PROJECT_ID"
npx supabase db push

echo ""
echo "=== Configuration terminée ! ==="
echo "URL: $SUPABASE_URL"
echo "Le fichier .env est configuré."
echo "Relance 'npm run dev' pour tester."
