import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { glassCardWine } from "./MentionsLegales";

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
    <div className="container mx-auto max-w-6xl py-16 space-y-10">
      <header className="space-y-3">
        <Badge
          variant="secondary"
          className="text-[#c2a56a] bg-[rgba(90,4,20,0.4)] text-sm px-2"
        >
          Vente & utilisation
        </Badge>
        <h1 className="text-4xl text-[#e8dfcf] font-semibold tracking-tight">
          Conditions générales
        </h1>
        <p className="text-sm text-[#e8dfcf] text-muted-foreground">
          Dernière mise à jour : {updated}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <aside className="md:sticky md:top-28 h-fit">
          <Card className={glassCardWine}>
            <CardContent className="p-5">
              <p className="text-sm font-medium">Sommaire</p>
              <Separator className="my-3 opacity-60" />
              <nav className="flex flex-col gap-1 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-md px-2 py-2 text-[#e8dfcf] text-muted-foreground hover:bg-white/10 hover:text-foreground transition"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-8">
          <section id="objet">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Objet</h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  Les présentes conditions encadrent l’utilisation du site et la
                  passation de commandes de prestations de catering pour un
                  événement (date, lieu, paramètres).
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="commande">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Commande</h2>
                <Separator />
                <ul className="list-disc pl-5 text-[#e8dfcf] text-sm space-y-2 leading-relaxed">
                  <li>
                    Le client sélectionne des menus et renseigne les
                    informations liées à l’événement.
                  </li>
                  <li>
                    Un récapitulatif est présenté avant validation finale.
                  </li>
                  <li>
                    La commande est confirmée après validation et paiement (le
                    cas échéant).
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="prix">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Prix & paiement</h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  Les prix sont exprimés en euros et précisés avant la
                  validation de la commande. Les options et frais
                  complémentaires sont détaillés.
                </p>
                <p className="text-sm text-[#e8dfcf] text-muted-foreground">
                  À adapter selon le prestataire de paiement et le workflow
                  retenu.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="execution">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">
                  Exécution de la prestation
                </h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  La prestation est exécutée à la date et à l’adresse indiquées.
                  Le client garantit l’exactitude des informations transmises.
                </p>
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  Les contraintes alimentaires doivent être communiquées lors de
                  la commande.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="annulation">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">
                  Annulation / modification
                </h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  Toute demande d’annulation ou de modification doit être
                  effectuée dans les meilleurs délais. Des frais peuvent
                  s’appliquer selon l’avancement de la prestation.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="responsabilite">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Responsabilité</h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  La responsabilité de la société ne saurait être engagée en cas
                  de force majeure ou d’informations erronées fournies par le
                  client.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="donnees">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Données</h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf] leading-relaxed">
                  Les traitements de données personnelles sont décrits dans les
                  Mentions légales et la politique de confidentialité.
                </p>
              </CardContent>
            </Card>
          </section>

          <p className="text-xs text-muted-foreground pt-4">
            Document fourni à titre de modèle dans le cadre d’un projet
            pédagogique.
          </p>
        </div>
      </div>
    </div>
  );
}
