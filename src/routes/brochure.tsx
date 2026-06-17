import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Check } from "lucide-react";

export const Route = createFileRoute("/brochure")({
  component: BrochurePage,
  head: () => ({ meta: [{ title: "Brochure — LB Budget Pro" }] }),
});

function BrochurePage() {
  return (
    <div className="min-h-screen bg-white print:bg-white">
      <div className="mx-auto max-w-[900px] shadow-2xl print:shadow-none">

        {/* HERO */}
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0A2E5C_0%,#1a4a8a_100%)] px-16 py-20 text-center text-white">
          <div className="absolute -right-20 -top-1/2 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.15)_0%,transparent_70%)]" />
          <div className="relative">
            <div className="mb-8 inline-flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold">LB <span className="text-[#FF6B00]">Budget</span></span>
            </div>
            <h1 className="font-[Plus_Jakarta_Sans] text-[42px] font-extrabold leading-tight">Prenez le contrôle total<br/>de vos finances personnelles</h1>
            <p className="mx-auto mt-4 max-w-[600px] text-lg opacity-85">La plateforme intelligente qui centralise, analyse et optimise votre gestion financière grâce à l'intelligence artificielle.</p>
            <div className="mt-8 inline-block rounded-full bg-[#FF6B00] px-6 py-2 text-sm font-bold tracking-wide">APPLICATION WEB PREMIUM</div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 bg-[linear-gradient(135deg,#0A2E5C_0%,#1a4a8a_100%)] px-16 py-12 text-center text-white">
          {[
            { val: "15+", label: "Modules financiers" },
            { val: "IA", label: "Assistant intelligent" },
            { val: "99.9%", label: "Disponibilité" },
            { val: "256-bit", label: "Chiffrement SSL" },
          ].map(s => (
            <div key={s.label}>
              <div className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-[#FF6B00]">{s.val}</div>
              <div className="mt-1 text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* QU'EST-CE QUE C'EST */}
        <div className="px-16 py-16">
          <h2 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-[#0A2E5C]">Qu'est-ce que LB Budget ?</h2>
          <p className="mt-2 text-[#64748B]">Une application web de gestion financière tout-en-un pour les particuliers et entrepreneurs.</p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Tableau de bord", desc: "Vue synthétique avec graphiques temps réel et indicateurs clés." },
              { icon: "💳", title: "Suivi des dépenses", desc: "Catégorisation automatique, import CSV, visualisation par période." },
              { icon: "📋", title: "Factures", desc: "Créez, envoyez et suivez vos factures. Alertes d'échéance." },
              { icon: "🏦", title: "Épargne & Objectifs", desc: "Définissez des objectifs et suivez votre progression." },
              { icon: "📈", title: "Investissements", desc: "Suivi de portefeuille, performances et diversification." },
              { icon: "🤖", title: "Assistant IA", desc: "Conseils personnalisés et détection d'anomalies." },
              { icon: "🔄", title: "Abonnements", desc: "Centralisez et optimisez vos charges récurrentes." },
              { icon: "💰", title: "Budget mensuel", desc: "Enveloppes budgétaires avec alertes en temps réel." },
              { icon: "📅", title: "Calendrier financier", desc: "Échéances et paiements sur un calendrier interactif." },
            ].map(f => (
              <div key={f.title} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#0A2E5C,#1a4a8a)] text-lg text-white">{f.icon}</div>
                <h3 className="font-[Plus_Jakarta_Sans] text-base font-bold text-[#0A2E5C]">{f.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* POURQUOI NOUS */}
        <div className="bg-[#F8FAFC] px-16 py-16">
          <h2 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-[#0A2E5C]">Pourquoi choisir LB Budget ?</h2>
          <p className="mt-2 text-[#64748B]">Performance, simplicité et sécurité.</p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { num: "1", title: "Interface ultra-rapide", desc: "Chargement instantané grâce au rendu hybride SSR/SPA." },
              { num: "2", title: "Sécurité bancaire", desc: "SSL 256-bit, 2FA, isolation par utilisateur (RLS)." },
              { num: "3", title: "Intelligence artificielle", desc: "Analyse de vos habitudes et conseils personnalisés." },
              { num: "4", title: "Tout-en-un", desc: "Budget, dépenses, factures, épargne, investissements centralisés." },
              { num: "5", title: "Accessible partout", desc: "Web responsive : ordi, tablette ou mobile sans installation." },
              { num: "6", title: "Connexion Google", desc: "Inscrivez-vous en un clic avec votre compte Google." },
            ].map(w => (
              <div key={w.num} className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <div className="grid h-9 w-9 min-w-[36px] place-items-center rounded-xl bg-[#FF6B00] text-sm font-extrabold text-white">{w.num}</div>
                <div>
                  <h4 className="font-[Plus_Jakarta_Sans] text-[15px] font-bold text-[#0A2E5C]">{w.title}</h4>
                  <p className="mt-1 text-[13px] text-[#64748B]">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLANS */}
        <div className="px-16 py-16">
          <h2 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-[#0A2E5C]">Nos offres</h2>
          <p className="mt-2 text-[#64748B]">Choisissez le plan adapté. Évoluez à tout moment.</p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <PlanCard name="Gratuit" price="0€" features={["1 compte bancaire","Suivi dépenses basique","Budget mensuel","Tableau de bord"]} />
            <PlanCard name="Pro ⭐" price="9€" featured features={["5 comptes bancaires","Tous les modules","Export CSV & PDF","Assistant IA (50 req/mois)","Factures illimitées","Import automatique"]} />
            <PlanCard name="Premium" price="19€" features={["Comptes illimités","Assistant IA illimité","Export API","Support prioritaire 24/7","Rapports avancés","Multi-devises"]} />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#F8FAFC] px-16 py-16 text-center">
          <h2 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-[#0A2E5C]">Prêt à transformer votre gestion financière ?</h2>
          <p className="mt-3 text-[#64748B]">Rejoignez des milliers d'utilisateurs qui ont repris le contrôle.</p>
          <a href="/auth" className="mt-8 inline-block rounded-2xl bg-[linear-gradient(135deg,#FF6B00,#FF8C33)] px-10 py-4 text-base font-bold text-white shadow-[0_6px_20px_rgba(255,107,0,0.3)]">
            Créer mon compte gratuitement →
          </a>
          <p className="mt-4 text-sm text-[#64748B]">
            <a href="https://lbbudgetpro.lovable.app" className="font-semibold text-[#FF6B00]">lbbudgetpro.lovable.app</a>
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] px-16 py-6 text-xs text-[#64748B]">
          <span>© 2026 LB Budget — Tous droits réservés</span>
          <span>lbcloudadmin@gmail.com | +33 6 60 06 17 23</span>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ name, price, features, featured }: { name: string; price: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 p-8 text-center ${featured ? "scale-[1.03] border-[#FF6B00] bg-[linear-gradient(180deg,#FFF7ED_0%,white_30%)] shadow-[0_8px_30px_rgba(255,107,0,0.12)]" : "border-[#E2E8F0]"}`}>
      <div className="font-[Plus_Jakarta_Sans] text-xl font-extrabold text-[#0A2E5C]">{name}</div>
      <div className="mt-3 font-[Plus_Jakarta_Sans] text-4xl font-extrabold text-[#0A2E5C]">{price}<span className="text-base font-medium text-[#64748B]">/mois</span></div>
      <ul className="my-6 space-y-2 text-left">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 border-b border-[#F1F5F9] py-2 text-[13px]">
            <Check className="h-4 w-4 text-[#10B981]" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full rounded-xl py-3.5 text-sm font-bold ${featured ? "bg-[linear-gradient(135deg,#FF6B00,#FF8C33)] text-white shadow-[0_4px_15px_rgba(255,107,0,0.3)]" : "border border-[#E2E8F0] bg-[#F8FAFC] text-[#0A2E5C]"}`}>
        {featured ? "Choisir le Plan Pro" : `Choisir ${name}`}
      </button>
    </div>
  );
}
