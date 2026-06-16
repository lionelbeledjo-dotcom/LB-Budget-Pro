import { createFileRoute } from "@tanstack/react-router";
import { Settings, User, Bell, Shield, Globe, Palette, Database, Camera } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export const Route = createFileRoute("/app/parametres")({
  component: ParametresPage,
  head: () => ({ meta: [{ title: "Paramètres — LB Budget" }] }),
});

function ParametresPage() {
  const { user, isSuperAdmin } = useAuthStore();
  const fullName = user?.user_metadata?.full_name || "Utilisateur";
  const email = user?.email || "—";
  const plan = isSuperAdmin ? "Super Admin" : "Pro";
  const lastLogin = user?.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "—";
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "—";
  const provider = user?.app_metadata?.provider === "google" ? "Google" : "Email";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Paramètres</h1>
        <p className="text-sm text-muted-foreground">Configurez votre compte et vos préférences</p>
      </div>

      {/* Profile header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-navy-gradient text-2xl font-bold text-white shadow-elegant">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-orange text-white shadow-glow hover:brightness-110 transition">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">{fullName}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${isSuperAdmin ? "bg-navy/10 text-navy" : "bg-orange/10 text-orange"}`}>
                {plan}
              </span>
              <span className="rounded-full bg-success/10 px-3 py-0.5 text-xs font-semibold text-success">
                Actif
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section icon={User} title="Informations personnelles">
          <Field label="Nom complet" value={fullName} />
          <Field label="Email" value={email} />
          <Field label="Rôle" value={plan} badge />
          <Field label="Méthode de connexion" value={provider} />
          <Field label="Membre depuis" value={createdAt} />
        </Section>

        <Section icon={Globe} title="Préférences">
          <Field label="Devise" value="EUR (€)" />
          <Field label="Langue" value="Français" />
          <Field label="Format de date" value="JJ/MM/AAAA" />
          <Field label="Fuseau horaire" value="Europe/Paris (UTC+2)" />
          <Field label="Premier jour de la semaine" value="Lundi" />
        </Section>

        <Section icon={Bell} title="Notifications">
          <Toggle label="Alertes budget dépassé" checked />
          <Toggle label="Rappels de factures" checked />
          <Toggle label="Résumé hebdomadaire par email" checked={false} />
          <Toggle label="Conseils de l'assistant IA" checked />
          <Toggle label="Notifications push" checked />
        </Section>

        <Section icon={Shield} title="Sécurité">
          <Field label="Mot de passe" value="••••••••••" />
          <Field label="Authentification 2FA" value="Désactivée" />
          <Field label="Dernière connexion" value={lastLogin} />
          <Field label="Sessions actives" value="1 appareil" />
        </Section>

        <Section icon={Palette} title="Apparence">
          <Field label="Thème" value="Clair" />
          <Field label="Couleur d'accent" value="Orange (#FF6B00)" />
          <Field label="Police" value="Plus Jakarta Sans" />
          <Field label="Mode compact" value="Désactivé" />
        </Section>

        <Section icon={Database} title="Données & confidentialité">
          <div className="space-y-2">
            <button className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Exporter toutes mes données (CSV)
            </button>
            <button className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Télécharger mes factures
            </button>
            <button className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10 transition">
              Supprimer mon compte définitivement
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
