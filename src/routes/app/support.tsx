import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, Mail, Phone, MessageCircle, FileText, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/app/support")({
  component: SupportPage,
  head: () => ({ meta: [{ title: "Support — LB Budget" }] }),
});

function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Support</h1>
        <p className="text-sm text-muted-foreground">Besoin d'aide ? Nous sommes là pour vous.</p>
      </div>

      {/* Contact */}
      <div className="grid gap-4 sm:grid-cols-3">
        <a href="mailto:Lbcloudadmin@gmail.com" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange"><Mail className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-sm font-bold">Email</h3>
            <p className="text-xs text-muted-foreground">Lbcloudadmin@gmail.com</p>
          </div>
        </a>
        <a href="tel:+33660061723" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success"><Phone className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-sm font-bold">Téléphone</h3>
            <p className="text-xs text-muted-foreground">+33 6 60 06 17 23</p>
          </div>
        </a>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/10 text-navy"><MessageCircle className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-sm font-bold">Chat en direct</h3>
            <p className="text-xs text-muted-foreground">Lun-Ven, 9h-18h</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-orange" /> Questions fréquentes</h3>
        <div className="space-y-3">
          {[
            { q: "Comment créer mon premier budget ?", a: "Allez dans Budget > Nouveau budget, choisissez le type (mensuel, par catégorie...) et définissez le montant." },
            { q: "Comment importer mes transactions ?", a: "Dans Dépenses, cliquez sur Import CSV. Le fichier doit contenir les colonnes : date, description, montant, catégorie." },
            { q: "Comment fonctionne l'assistant IA ?", a: "L'assistant analyse vos données en temps réel et vous donne des conseils personnalisés. Posez-lui une question !" },
            { q: "Mes données sont-elles sécurisées ?", a: "Oui, toutes les données sont stockées localement sur votre appareil et chiffrées." },
            { q: "Comment annuler mon abonnement ?", a: "Paramètres > Abonnement > Annuler. Votre accès reste actif jusqu'à la fin de la période payée." },
          ].map((item) => (
            <details key={item.q} className="group rounded-xl border border-border/60">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium hover:bg-secondary/30 transition">{item.q}</summary>
              <p className="px-4 pb-3 text-xs text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-bold text-navy mb-4">Envoyer un message</h3>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nom</label>
              <input className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Sujet</label>
            <select className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange">
              <option>Question générale</option>
              <option>Bug technique</option>
              <option>Demande de fonctionnalité</option>
              <option>Facturation</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Message</label>
            <textarea rows={4} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 resize-none" />
          </div>
          <button type="submit" className="rounded-xl bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 transition">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
