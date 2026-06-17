import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Wallet, TrendingUp, Receipt, FileText, PiggyBank,
  CreditCard, BarChart3, CalendarDays, Sparkles, Settings, HelpCircle,
  ShieldCheck, RefreshCcw, Target, Menu, X, LogOut, Bell, User,
  Users, Activity, Mail, Database, Globe, Megaphone, Layers, Check,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

const CLIENT_NAV = [
  { to: "/app", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/app/budget", icon: Wallet, label: "Budget" },
  { to: "/app/revenus", icon: TrendingUp, label: "Revenus" },
  { to: "/app/depenses", icon: Receipt, label: "Dépenses" },
  { to: "/app/factures", icon: FileText, label: "Factures" },
  { to: "/app/epargne", icon: PiggyBank, label: "Épargne" },
  { to: "/app/dettes", icon: CreditCard, label: "Dettes" },
  { to: "/app/investissements", icon: BarChart3, label: "Investissements" },
  { to: "/app/abonnements", icon: RefreshCcw, label: "Abonnements" },
  { to: "/app/objectifs", icon: Target, label: "Objectifs" },
  { to: "/app/rapports", icon: FileText, label: "Rapports" },
  { to: "/app/calendrier", icon: CalendarDays, label: "Calendrier" },
  { to: "/app/assistant", icon: Sparkles, label: "Assistant IA" },
  { to: "/app/parametres", icon: Settings, label: "Paramètres" },
  { to: "/app/support", icon: HelpCircle, label: "Support" },
];

const ADMIN_NAV = [
  { to: "/app/admin", icon: LayoutDashboard, label: "Dashboard Admin" },
  { to: "/app/admin/users", icon: Users, label: "Utilisateurs" },
  { to: "/app/admin/subscriptions", icon: CreditCard, label: "Abonnements" },
  { to: "/app/admin/revenue", icon: BarChart3, label: "Revenus & MRR" },
  { to: "/app/admin/analytics", icon: Activity, label: "Analytiques" },
  { to: "/app/admin/support", icon: Mail, label: "Support & Tickets" },
  { to: "/app/admin/content", icon: Megaphone, label: "Contenu & Pages" },
  { to: "/app/admin/plans", icon: Layers, label: "Plans & Tarifs" },
  { to: "/app/admin/system", icon: Database, label: "Système" },
  { to: "/app/admin/domains", icon: Globe, label: "Domaines" },
  { to: "/app/parametres", icon: Settings, label: "Mon compte" },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isSuperAdmin } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    navigate({ to: isSuperAdmin ? "/admin-login" : "/auth" });
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Utilisateur";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  const navItems = isSuperAdmin ? ADMIN_NAV : CLIENT_NAV;

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link to="/app" className="flex items-center gap-2.5">
            <div className={`grid h-9 w-9 place-items-center rounded-xl shadow-elegant ${isSuperAdmin ? "bg-navy-gradient" : "bg-navy-gradient"}`}>
              {isSuperAdmin ? <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.5} /> : <Wallet className="h-5 w-5 text-white" strokeWidth={2.5} />}
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-navy">
              LB <span className="text-orange">{isSuperAdmin ? "Admin" : "Budget"}</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {isSuperAdmin && (
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Gestion plateforme</p>
          )}
          <ul className="space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.to || (item.to !== "/app" && item.to !== "/app/admin" && location.pathname.startsWith(item.to));
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-orange/10 text-orange font-semibold"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className={`h-4.5 w-4.5 ${isActive ? "text-orange" : ""}`} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white ${isSuperAdmin ? "bg-orange" : "bg-navy"}`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{userName}</p>
              <p className="truncate text-xs text-muted-foreground">{isSuperAdmin ? "Super Admin" : "Plan Pro"}</p>
            </div>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground" title="Déconnexion">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <NotificationBell />
            <Link to="/app/parametres" className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition" title="Mon profil">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Budget Loisirs utilisé à 79%", time: "Il y a 2h", read: false },
    { id: 2, text: "Facture EDF — échéance dans 3 jours", time: "Il y a 5h", read: false },
    { id: 3, text: "Nouveau revenu détecté : +2 400 €", time: "Hier", read: true },
    { id: 4, text: "Abonnement Netflix renouvelé", time: "Hier", read: true },
  ]);

  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition">
        <Bell className="h-5 w-5" />
        {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange" />}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border bg-card shadow-elegant">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h4 className="font-display text-sm font-bold text-navy">Notifications</h4>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs font-medium text-orange hover:underline">Tout marquer lu</button>
              )}
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">Aucune notification</p>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 ${n.read ? "" : "bg-orange/5"}`}>
                    <div className={`mt-0.5 h-2 w-2 rounded-full ${n.read ? "bg-transparent" : "bg-orange"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{n.text}</p>
                      <p className="text-[11px] text-muted-foreground">{n.time}</p>
                    </div>
                    <button onClick={() => dismiss(n.id)} className="text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
