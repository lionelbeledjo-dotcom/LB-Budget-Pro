import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/AppLayout";
import { initDemoData } from "@/lib/store/init-demo";

export const Route = createFileRoute("/app")({
  component: () => {
    initDemoData();
    return <AppLayout />;
  },
});
