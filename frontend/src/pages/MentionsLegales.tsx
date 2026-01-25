import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const glassCard =
  "border border-border/60 bg-background/60 backdrop-blur-xl shadow-sm";

const sections = [
  { id: "editeur", label: "Éditeur" },
  { id: "hebergement", label: "Hébergement" },
  { id: "contact", label: "Contact" },
  { id: "pi", label: "Propriété intellectuelle" },
  { id: "donnees", label: "Données & cookies" },
  { id: "droit", label: "Droit applicable" },
];

export default function MentionsLegales() {
  const updated = new Date().toLocaleDateString("fr-FR");

  return (
    <div className="space-y-8 container">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-primary/10 via-background to-background p-6 md:p-8">
        <Badge variant="secondary">Informations légales</Badge>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Mentions légales
        </h1>
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
          <section id="editeur">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Éditeur du site
                </h2>
                <p className="text-sm text-muted-foreground">
                  Informations d’identification de l’éditeur du site.
                </p>
                <Separator />

                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <p>
                    <span className="font-medium">Nom commercial :</span> Vites
                    &amp; Gourmand
                  </p>
                  <p>
                    <span className="font-medium">Adresse :</span> 10 Place de
                    la Bourse, 33000 Bordeaux, France
                  </p>
                  <p>
                    <span className="font-medium">E-mail :</span>{" "}
                    contact@vites-gourmand.fr (à confirmer)
                  </p>
                  <p>
                    <span className="font-medium">Téléphone :</span> +33 5 00 00
                    00 00 (à confirmer)
                  </p>
                </div>

                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <p>
                    <span className="font-medium">Statut :</span> (SAS / SARL) —
                    to be comppleted
                  </p>
                  <p>
                    <span className="font-medium">RCS :</span> Bordeaux — à to
                    be completed
                  </p>
                  <p>
                    <span className="font-medium">SIRET :</span>
                  </p>
                  <p>
                    <span className="font-medium">TVA :</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="hebergement">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Hébergement
                </h2>
                <p className="text-sm text-muted-foreground">AWS</p>
                <Separator />
                <p className="text-sm">
                  <span className="font-medium">Hébergeur :</span>
                  (nom, adresse, contact).
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="contact">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Contact
                </h2>
                <p className="text-sm text-muted-foreground">
                  Canal de support et demandes légales.
                </p>
                <Separator />
                <p className="text-sm">
                  Pour toute question, vous pouvez écrire à{" "}
                  <span className="font-medium">contact@vites-gourmand.fr</span>{" "}
                  (à confirmer).
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="pi">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Propriété intellectuelle
                </h2>
                <Separator />
                <p className="text-sm">
                  Les contenus du site (textes, images, identité visuelle,
                  composants UI) sont protégés. Toute reproduction non autorisée
                  est interdite sans accord écrit.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="donnees">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Données personnelles &amp; cookies
                </h2>
                <p className="text-sm text-muted-foreground">
                  Résumé (à aligner avec ta vraie implémentation).
                </p>
                <Separator />
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>
                    Données utilisées pour la gestion du compte, des commandes
                    et de la relation client.
                  </li>
                  <li>
                    Cookies nécessaires : authentification (session), panier /
                    commande.
                  </li>
                  <li>
                    Droits RGPD : accès, rectification, suppression, opposition
                    — contact DPO à compléter.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="droit">
            <Card className={glassCard}>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Droit applicable
                </h2>
                <Separator />
                <p className="text-sm">
                  Droit français. En cas de litige, privilégier une résolution
                  amiable avant action.
                </p>
              </CardContent>
            </Card>
          </section>

          <p className="text-xs text-muted-foreground">
            Ce document est un modèle pour projet/ECF. Pour une mise en
            production réelle, il serait adopte et valide.
          </p>
        </div>
      </div>
    </div>
  );
}
