import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const glassCard =
  "border border-border/60 bg-background/60 backdrop-blur-xl shadow-sm";

const sections = [
  { id: "objet", label: "Objet" },
  { id: "commande", label: "Commande" },
  { id: "prix", label: "Prix & paiement" },
  { id: "execution", label: "Exécution" },
  { id: "annulation", label: "Annulation / modification" },
  { id: "responsabilite", label: "Responsabilité" },
  { id: "donnees", label: "Données" },
];

export default function ConditionsGenerales() {
  const updated = new Date().toLocaleDateString("fr-FR");

  return (
    <div className="space-y-8 container">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-primary/10 via-background to-background p-6 md:p-8">
        <Badge variant="secondary">Vente & utilisation</Badge>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Conditions générales
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Dernière mise à jour : {updated}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <aside className="md:sticky md:top-24 h-fit">
          <Card className={glassCard}>
            <CardContent className="p-5">
              <p className="text-sm font-medium">Sommaire</p>
              <Separator className="my-3" />
              <nav className="flex flex-col gap-2 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-md px-2 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-6">
          <section id="objet">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">Objet</h2>
                <Separator />
                <p className="text-sm">
                  Les présentes conditions encadrent l’utilisation du site et la
                  passation de commandes de prestations de catering pour un
                  événement (date, lieu, paramètres).
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="commande">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Commande
                </h2>
                <Separator />
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    Le client sélectionne des menus/prestations et complète les
                    informations d’événement.
                  </li>
                  <li>
                    Un récapitulatif est présenté avant validation finale.
                  </li>
                  <li>
                    La commande peut être confirmée après paiement (si
                    applicable).
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="prix">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Prix &amp; paiement
                </h2>
                <Separator />
                <p className="text-sm">
                  Les prix sont affichés en euros. Les frais éventuels
                  (livraison / options) sont précisés avant validation.
                </p>
                <p className="text-sm text-muted-foreground">
                  À adapter selon ton PSP (Stripe, etc.) et ton flux “pending
                  payment”.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="execution">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Exécution de la prestation
                </h2>
                <Separator />
                <p className="text-sm">
                  La prestation est exécutée à la date et à l’adresse indiquées.
                  Le client garantit l’exactitude des informations et l’accès au
                  lieu.
                </p>
                <p className="text-sm">
                  Contraintes alimentaires (allergènes, régimes) : à communiquer
                  lors de la commande.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="annulation">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Annulation / modification
                </h2>
                <Separator />
                <p className="text-sm">
                  Toute demande doit être effectuée dès que possible. Des frais
                  peuvent s’appliquer selon l’avancement et la date d’événement.
                </p>
                <p className="text-sm text-muted-foreground">
                  À compléter : politique (J-7 / J-3 / J-1), pourcentages,
                  exceptions.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="responsabilite">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Responsabilité
                </h2>
                <Separator />
                <p className="text-sm">
                  La responsabilité ne peut être engagée en cas de force
                  majeure, ou en cas d’informations erronées fournies par le
                  client.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="donnees">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Données
                </h2>
                <Separator />
                <p className="text-sm">
                  Les traitements liés aux comptes et commandes sont décrits
                  dans les Mentions légales / politique de confidentialité.
                </p>
              </CardContent>
            </Card>
          </section>

          <p className="text-xs text-muted-foreground">
            {/* Modèle projet/ECF. Avant production : adapter CGV/CGU, rétractation,
            médiation, clauses B2C, etc. */}
          </p>
        </div>
      </div>
    </div>
  );
}
