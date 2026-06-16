import { createFileRoute } from "@tanstack/react-router";
import { Database, Server, Shield, RefreshCcw, CheckCircle, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/admin/system")({
  component: AdminSystemPage,
  head: () => ({ meta: [{ title: "Système — Admin LB Budget" }] }),
});

function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Système</h1>
        <p className="text-sm text-muted-foreground">État de l'infrastructure et maintenance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Status label="API" status="Opérationnel" ok />
        <Status label="Base de données" status="Opérationnel" ok />
        <Status label="Auth (Supabase)" status="Opérationnel" ok />
        <Status label="Stockage" status="Opérationnel" ok />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Server className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Informations système</h3>
          </div>
          <div className="space-y-2">
            <InfoRow label="Version" value="1.0.0" />
            <InfoRow label="Framework" value="TanStack Start + React" />
            <InfoRow label="Base de données" value="Supabase (PostgreSQL)" />
            <InfoRow label="Hébergement" value="Lovable" />
            <InfoRow label="CDN" value="Cloudflare" />
            <InfoRow label="Auth provider" value="Supabase Auth + Google OAuth" />
            <InfoRow label="Uptime (30j)" value="99.97%" />
            <InfoRow label="Dernière mise à jour" value="16/06/2026" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Base de données</h3>
          </div>
          <div className="space-y-2">
            <InfoRow label="Tables" value="9" />
            <InfoRow label="Lignes totales" value="~24,500" />
            <InfoRow label="Taille" value="128 MB" />
            <InfoRow label="Connexions actives" value="12 / 60" />
            <InfoRow label="RLS policies" value="Activées" />
            <InfoRow label="Backup" value="Quotidien (auto)" />
            <InfoRow label="Région" value="eu-west-1 (Irlande)" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Sécurité</h3>
          </div>
          <div className="space-y-2">
            <InfoRow label="SSL/TLS" value="Actif (Let's Encrypt)" />
            <InfoRow label="RLS" value="Toutes tables protégées" />
            <InfoRow label="Rate limiting" value="100 req/min" />
            <InfoRow label="2FA admin" value="Désactivé" />
            <InfoRow label="Audit logs" value="30 jours" />
            <InfoRow label="Dernière alerte" value="Aucune" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCcw className="h-4 w-4 text-orange" />
            <h3 className="font-display text-sm font-bold text-navy">Maintenance</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Vider le cache
            </button>
            <button className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Forcer le re-déploiement
            </button>
            <button className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Exporter les logs (7j)
            </button>
            <button className="w-full rounded-xl border border-orange/30 bg-orange/5 px-4 py-2.5 text-left text-sm font-medium text-orange hover:bg-orange/10 transition">
              Mode maintenance ON/OFF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status({ label, status, ok }: { label: string; status: string; ok: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2">
        {ok ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-destructive" />}
        <span className="text-sm font-semibold text-navy">{label}</span>
      </div>
      <p className={`mt-1 text-xs font-medium ${ok ? "text-success" : "text-destructive"}`}>{status}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between rounded-xl bg-secondary/30 px-4 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
