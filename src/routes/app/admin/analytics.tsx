import { createFileRoute } from "@tanstack/react-router";
import { Activity, Globe, Smartphone, Monitor, Clock } from "lucide-react";

export const Route = createFileRoute("/app/admin/analytics")({
  component: AdminAnalyticsPage,
  head: () => ({ meta: [{ title: "Analytiques — Admin LB Budget" }] }),
});

function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Analytiques</h1>
        <p className="text-sm text-muted-foreground">Comportement et engagement des utilisateurs</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sessions / jour" value="3,420" icon={Activity} />
        <Stat label="Durée moyenne" value="8m 42s" icon={Clock} />
        <Stat label="Taux de rétention" value="78%" icon={Globe} />
        <Stat label="Utilisateurs actifs (30j)" value="892" icon={Activity} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="font-display text-sm font-bold text-navy mb-4">Pages les plus visitées</h3>
          <div className="space-y-2">
            {[
              { page: "/app (Dashboard)", vues: "12,450", pct: 35 },
              { page: "/app/depenses", vues: "8,320", pct: 24 },
              { page: "/app/budget", vues: "6,180", pct: 18 },
              { page: "/app/factures", vues: "4,230", pct: 12 },
              { page: "/app/epargne", vues: "2,890", pct: 8 },
              { page: "/app/rapports", vues: "1,050", pct: 3 },
            ].map(p => (
              <div key={p.page} className="flex items-center gap-3 rounded-xl bg-secondary/30 px-4 py-2.5">
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.page}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-secondary">
                    <div className="h-1.5 rounded-full bg-orange" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{p.vues}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-sm font-bold text-navy mb-4">Appareils</h3>
            <div className="space-y-3">
              <DeviceRow icon={Monitor} label="Desktop" pct={62} />
              <DeviceRow icon={Smartphone} label="Mobile" pct={31} />
              <DeviceRow icon={Monitor} label="Tablette" pct={7} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-sm font-bold text-navy mb-4">Top pays</h3>
            <div className="space-y-2">
              {[
                { pays: "France", pct: 45 },
                { pays: "Cameroun", pct: 22 },
                { pays: "Belgique", pct: 12 },
                { pays: "Canada", pct: 9 },
                { pays: "Suisse", pct: 7 },
              ].map(p => (
                <div key={p.pays} className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-2">
                  <span className="text-sm">{p.pays}</span>
                  <span className="text-xs font-semibold text-navy">{p.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <Icon className="h-4 w-4 text-orange mb-2" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-bold text-navy">{value}</p>
    </div>
  );
}

function DeviceRow({ icon: Icon, label, pct }: { icon: React.ElementType; label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span className="font-semibold">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary">
          <div className="h-1.5 rounded-full bg-navy" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
