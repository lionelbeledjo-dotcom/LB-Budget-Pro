import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppLayout } from "@/components/app/AppLayout";
import { initDemoData } from "@/lib/store/init-demo";
import { useAuthStore } from "@/lib/store/auth-store";
import { loadFromSupabase } from "@/lib/supabase-sync";

export const Route = createFileRoute("/app")({
  component: AppRoute,
});

function AppRoute() {
  const { user, loading, initialize } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      initDemoData();
    }
    if (!loading && user) {
      loadFromSupabase();
    }
  }, [loading, user]);

  initDemoData();
  return <AppLayout />;
}
