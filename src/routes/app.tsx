import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/app/AppLayout";
import { initDemoData } from "@/lib/store/init-demo";
import { useAuthStore } from "@/lib/store/auth-store";
import { loadFromSupabase } from "@/lib/supabase-sync";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/app")({
  component: AppRoute,
});

function AppRoute() {
  const { user, loading, initialize } = useAuthStore();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initialize().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!user && supabaseConfigured) {
      navigate({ to: "/auth" });
      return;
    }
    if (user) {
      loadFromSupabase();
    }
    initDemoData();
  }, [ready, user]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
          <p className="mt-3 text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return <AppLayout />;
}
