import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/oauth-callback")({
  component: OAuthCallback,
});

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const notifyNewUser = (user: { id?: string; email?: string; user_metadata?: any; created_at?: string }) => {
      supabase.functions.invoke("notify-new-user", {
        body: {
          type: "INSERT",
          table: "users",
          record: {
            id: user.id,
            email: user.email,
            raw_user_meta_data: { full_name: user.user_metadata?.full_name || user.user_metadata?.name },
            created_at: user.created_at,
          },
        },
      }).catch(() => {});
    };

    const handleCallback = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && user.created_at && (Date.now() - new Date(user.created_at).getTime() < 60000)) {
            notifyNewUser(user);
          }
          navigate({ to: "/app" });
          return;
        }
      }

      const hash = window.location.hash;
      if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        if (accessToken && refreshToken) {
          const { data } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (data.session) {
            const user = data.session.user;
            if (user.created_at && (Date.now() - new Date(user.created_at).getTime() < 60000)) {
              notifyNewUser(user);
            }
            navigate({ to: "/app" });
            return;
          }
        }
      }

      navigate({ to: "/auth" });
    };
    handleCallback();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
        <p className="mt-3 text-sm text-muted-foreground">Connexion en cours...</p>
      </div>
    </div>
  );
}
