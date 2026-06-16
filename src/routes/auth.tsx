import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { Wallet, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Connexion — LB Budget" }] }),
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signIn, signUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        navigate({ to: "/app" });
      }
    } else {
      if (!fullName.trim()) {
        setError("Veuillez entrer votre nom complet.");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error);
      } else {
        setSuccess("Compte créé ! Vérifiez votre email pour confirmer.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy-gradient shadow-elegant">
              <Wallet className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-navy">
              LB <span className="text-orange">Budget</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <h1 className="font-display text-2xl font-bold text-navy">
            {mode === "login" ? "Connexion" : "Créer un compte"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Accédez à votre tableau de bord financier"
              : "Commencez à gérer vos finances gratuitement"}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                    placeholder="Lionel Beledjo"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="vous@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
            )}
            {success && (
              <div className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">{success}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-gradient py-3 text-sm font-semibold text-orange-foreground shadow-glow transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Pas encore de compte ?{" "}
                <button onClick={() => { setMode("register"); setError(""); setSuccess(""); }} className="font-semibold text-orange hover:underline">
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{" "}
                <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className="font-semibold text-orange hover:underline">
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
