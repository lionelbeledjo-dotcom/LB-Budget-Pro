import { createFileRoute } from "@tanstack/react-router";
import { Settings, User, Bell, Shield, Globe, Palette, Database, Camera, Save, Check } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

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

  const [editName, setEditName] = useState(fullName);
  const [editingName, setEditingName] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [editingPwd, setEditingPwd] = useState(false);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const [prefs, setPrefs] = useState({
    devise: "EUR (€)",
    langue: "Français",
    dateFormat: "JJ/MM/AAAA",
    timezone: "Europe/Paris (UTC+2)",
    firstDay: "Lundi",
  });
  const [editingPrefs, setEditingPrefs] = useState(false);

  const [notifs, setNotifs] = useState({
    budget: true,
    factures: true,
    resume: false,
    ia: true,
    push: true,
  });

  const [theme, setTheme] = useState("Clair");
  const [accentColor, setAccentColor] = useState("#FF6B00");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const saveName = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: editName } });
    if (!error) {
      showToast("Nom mis à jour !");
      setEditingName(false);
    } else {
      showToast("Erreur : " + error.message);
    }
    setSaving(false);
  };

  const savePassword = async () => {
    if (newPassword.length < 6) { showToast("Minimum 6 caractères"); return; }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (!error) {
      showToast("Mot de passe changé !");
      setEditingPwd(false);
      setNewPassword("");
    } else {
      showToast("Erreur : " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-success/90 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          <Check className="h-4 w-4" /> {toast}
        </div>
      )}

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
              <span className="rounded-full bg-success/10 px-3 py-0.5 text-xs font-semibold text-success">Actif</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Profil éditable */}
        <Section icon={User} title="Informations personnelles">
          {editingName ? (
            <div className="flex items-center gap-2 rounded-xl bg-secondary/30 px-4 py-2.5">
              <input value={editName} onChange={e => setEditName(e.target.value)} className="flex-1 bg-transparent text-sm font-medium outline-none" autoFocus />
              <button onClick={saveName} disabled={saving} className="rounded-lg bg-success/10 p-1.5 text-success hover:bg-success/20 transition"><Save className="h-3.5 w-3.5" /></button>
              <button onClick={() => setEditingName(false)} className="rounded-lg bg-secondary p-1.5 hover:bg-secondary/80 transition text-muted-foreground">✕</button>
            </div>
          ) : (
            <FieldEditable label="Nom complet" value={fullName} onEdit={() => setEditingName(true)} />
          )}
          <Field label="Email" value={email} />
          <Field label="Rôle" value={plan} badge />
          <Field label="Méthode de connexion" value={provider} />
          <Field label="Membre depuis" value={createdAt} />
        </Section>

        {/* Préférences éditables */}
        <Section icon={Globe} title="Préférences">
          {editingPrefs ? (
            <>
              <SelectField label="Devise" value={prefs.devise} options={["EUR (€)", "USD ($)", "XAF (FCFA)", "GBP (£)"]} onChange={v => setPrefs(p => ({...p, devise: v}))} />
              <SelectField label="Langue" value={prefs.langue} options={["Français", "English", "Español"]} onChange={v => setPrefs(p => ({...p, langue: v}))} />
              <SelectField label="Format de date" value={prefs.dateFormat} options={["JJ/MM/AAAA", "MM/DD/YYYY", "YYYY-MM-DD"]} onChange={v => setPrefs(p => ({...p, dateFormat: v}))} />
              <SelectField label="Fuseau horaire" value={prefs.timezone} options={["Europe/Paris (UTC+2)", "Africa/Douala (UTC+1)", "America/New_York (UTC-4)"]} onChange={v => setPrefs(p => ({...p, timezone: v}))} />
              <SelectField label="Premier jour" value={prefs.firstDay} options={["Lundi", "Dimanche"]} onChange={v => setPrefs(p => ({...p, firstDay: v}))} />
              <button onClick={() => { setEditingPrefs(false); showToast("Préférences sauvegardées"); }} className="w-full rounded-xl bg-orange-gradient py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition mt-2">
                Sauvegarder
              </button>
            </>
          ) : (
            <>
              <Field label="Devise" value={prefs.devise} />
              <Field label="Langue" value={prefs.langue} />
              <Field label="Format de date" value={prefs.dateFormat} />
              <Field label="Fuseau horaire" value={prefs.timezone} />
              <Field label="Premier jour de la semaine" value={prefs.firstDay} />
              <button onClick={() => setEditingPrefs(true)} className="w-full rounded-xl border border-border bg-background py-2.5 text-sm font-medium hover:bg-secondary transition mt-2">
                Modifier les préférences
              </button>
            </>
          )}
        </Section>

        {/* Notifications interactives */}
        <Section icon={Bell} title="Notifications">
          <ToggleField label="Alertes budget dépassé" checked={notifs.budget} onChange={() => setNotifs(n => ({...n, budget: !n.budget}))} />
          <ToggleField label="Rappels de factures" checked={notifs.factures} onChange={() => setNotifs(n => ({...n, factures: !n.factures}))} />
          <ToggleField label="Résumé hebdomadaire par email" checked={notifs.resume} onChange={() => setNotifs(n => ({...n, resume: !n.resume}))} />
          <ToggleField label="Conseils de l'assistant IA" checked={notifs.ia} onChange={() => setNotifs(n => ({...n, ia: !n.ia}))} />
          <ToggleField label="Notifications push" checked={notifs.push} onChange={() => setNotifs(n => ({...n, push: !n.push}))} />
        </Section>

        {/* Sécurité */}
        <Section icon={Shield} title="Sécurité">
          {editingPwd ? (
            <div className="space-y-2">
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe (min 6 car.)"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" autoFocus />
              <div className="flex gap-2">
                <button onClick={savePassword} disabled={saving} className="flex-1 rounded-xl bg-orange-gradient py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
                  {saving ? "Sauvegarde..." : "Changer le mot de passe"}
                </button>
                <button onClick={() => { setEditingPwd(false); setNewPassword(""); }} className="rounded-xl border border-border px-4 py-2.5 text-sm hover:bg-secondary transition">Annuler</button>
              </div>
            </div>
          ) : (
            <FieldEditable label="Mot de passe" value="••••••••••" onEdit={() => setEditingPwd(true)} />
          )}
          <Field label="Authentification 2FA" value="Désactivée" />
          <Field label="Dernière connexion" value={lastLogin} />
          <Field label="Sessions actives" value="1 appareil" />
        </Section>

        {/* Apparence */}
        <Section icon={Palette} title="Apparence">
          <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Thème</span>
            <select value={theme} onChange={e => { setTheme(e.target.value); showToast("Thème changé"); }} className="rounded-lg border-0 bg-transparent text-sm font-medium outline-none cursor-pointer">
              <option>Clair</option>
              <option>Sombre</option>
              <option>Auto</option>
            </select>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Couleur d'accent</span>
            <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="h-7 w-7 cursor-pointer rounded-lg border-0" />
          </div>
          <Field label="Police" value="Plus Jakarta Sans" />
        </Section>

        {/* Données */}
        <Section icon={Database} title="Données & confidentialité">
          <div className="space-y-2">
            <button onClick={() => showToast("Export CSV lancé — fichier bientôt prêt")} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Exporter toutes mes données (CSV)
            </button>
            <button onClick={() => showToast("Téléchargement des factures...")} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary transition">
              Télécharger mes factures
            </button>
            <button onClick={() => { if (confirm("Supprimer définitivement votre compte ? Cette action est irréversible.")) showToast("Demande de suppression envoyée"); }} className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10 transition">
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

function FieldEditable({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        <button onClick={onEdit} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold hover:bg-secondary/80 transition">Modifier</button>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="rounded-lg border-0 bg-transparent text-sm font-medium outline-none cursor-pointer text-right">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2.5 cursor-pointer" onClick={onChange}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className={`h-5 w-9 rounded-full transition ${checked ? "bg-orange" : "bg-border"}`}>
        <div className={`h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition ${checked ? "translate-x-4.5" : "translate-x-0.5"}`} />
      </div>
    </div>
  );
}
