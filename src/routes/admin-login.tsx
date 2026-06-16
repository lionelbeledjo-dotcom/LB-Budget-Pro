import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
  head: () => ({ meta: [{ title: "Admin — LB Budget" }] }),
});

const SUPER_ADMIN_EMAIL = "lbcloudadmin@gmail.com";

function AdminLoginPage() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email !== SUPER_ADMIN_EMAIL) {
      setError("Accès réservé aux administrateurs.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Identifiants incorrects.");
    } else {
      navigate({ to: "/app/admin" });
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email !== SUPER_ADMIN_EMAIL) {
      setError("Seul l'email administrateur est autorisé.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin-login`,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Email de réinitialisation envoyé à l'adresse admin.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-gradient px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10 border border-white/20 shadow-elegant">
            <ShieldCheck className="h-8 w-8 text-orange" />
          </div>
          <h2 className="mt-4 font-display text-lg font-bold text-white/90">Administration</h2>
          <p className="text-sm text-white/50">LB Budget — Panneau de contrôle</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-elegant">
          {mode === "login" && (
            <>
              <h1 className="font-display text-xl font-bold text-white">Connexion Admin</h1>
              <p className="mt-1 text-sm text-white/60">Accès réservé au super administrateur</p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/80">Email administrateur</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                      className="w-full rounded-xl border border-white/20 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                      placeholder="admin@lbbudget.com" />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-white/80">Mot de passe</label>
                    <button type="button" onClick={() => { setMode("forgot"); setError(""); setSuccess(""); }} className="text-xs font-medium text-orange hover:underline">
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                      className="w-full rounded-xl border border-white/20 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                      placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && <div className="rounded-lg bg-destructive/20 border border-destructive/30 px-3 py-2 text-sm text-red-300">{error}</div>}

                <button type="submit" disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-gradient py-3 text-sm font-semibold text-orange-foreground shadow-glow transition hover:brightness-110 disabled:opacity-60">
                  {loading ? "Vérification..." : "Accéder au panneau admin"} <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          )}

          {mode === "forgot" && (
            <>
              <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Retour
              </button>
              <h1 className="font-display text-xl font-bold text-white">Réinitialisation</h1>
              <p className="mt-1 text-sm text-white/60">Un lien sera envoyé à l'email administrateur</p>

              <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/80">Email administrateur</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                      className="w-full rounded-xl border border-white/20 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                      placeholder="admin@lbbudget.com" />
                  </div>
                </div>

                {error && <div className="rounded-lg bg-destructive/20 border border-destructive/30 px-3 py-2 text-sm text-red-300">{error}</div>}
                {success && <div className="rounded-lg bg-success/20 border border-success/30 px-3 py-2 text-sm text-green-300">{success}</div>}

                <button type="submit" disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-60">
                  {loading ? "Envoi..." : "Envoyer le lien"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/auth" className="text-xs text-white/40 hover:text-white/70 transition">
            ← Retour à la connexion client
          </Link>
        </div>
      </div>
    </div>
  );
}
