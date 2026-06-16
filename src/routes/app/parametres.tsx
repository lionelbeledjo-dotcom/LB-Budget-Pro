import { createFileRoute } from "@tanstack/react-router";
import { Settings, User, Bell, Shield, Globe, Palette } from "lucide-react";

export const Route = createFileRoute("/app/parametres")({
  component: ParametresPage,
  head: () => ({ meta: [{ title: "Paramètres — LB Budget" }] }),
});

function ParametresPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Paramètres</h1>
        <p className="text-sm text-muted-foreground">Configurez votre compte et vos préférences</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section icon={User} title="Profil">
          <Field label="Nom complet" value="Lionel B." />
          <Field label="Email" value="lbcloudadmin@gmail.com" />
          <Field label="Plan" value="Pro" badge />
        </Section>

        <Section icon={Globe} title="Préférences">
          <Field label="Devise" value="EUR (€)" />
          <Field label="Langue" value="Français" />
          <Field label="Format de date" value="JJ/MM/AAAA" />
        </Section>

        <Section icon={Bell} title="Notifications">
          <Toggle label="Alertes budget dépassé" checked />
          <Toggle label="Rappels de factures" checked />
          <Toggle label="Résumé hebdomadaire" checked={false} />
          <Toggle label="Conseils de l'assistant IA" checked />
        </Section>

        <Section icon={Shield} title="Sécurité">
          <Field label="Mot de passe" value="••••••••" />
          <Field label="Authentification 2FA" value="Désactivée" />
          <Field label="Dernière connexion" value="Aujourd'hui, 10:30" />
        </Section>

        <Section icon={Palette} title="Apparence">
          <Field label="Thème" value="Clair" />
          <Field label="Couleur d'accent" value="Orange (#FF6B00)" />
        </Section>

        <Section icon={Settings} title="Données">
          <div className="space-y-2">
            <button className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Exporter toutes mes données
            </button>
            <button className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10 transition">
              Supprimer mon compte
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-orange" />
        <h3 className="font-display text-sm font-bold text-navy">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, badge }: { label: string; value: string; badge?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      {badge ? (
        <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-xs font-semibold text-orange">{value}</span>
      ) : (
        <span className="text-sm font-medium">{value}</span>
      )}
    </div>
  );
}

function Toggle({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className={`h-5 w-9 rounded-full transition ${checked ? "bg-orange" : "bg-border"}`}>
        <div className={`h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition ${checked ? "translate-x-4.5" : "translate-x-0.5"}`} />
      </div>
    </div>
  );
}
