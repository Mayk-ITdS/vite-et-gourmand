import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const glassCard = `
  border border-white/10
  text-white
  bg-[rgba(10,15,40,0.5)]
  backdrop-blur-[18px]
  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
  transition-shadow
  hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)]
`;
export const glassCardWine = `bg-[rgba(90,4,20,0.4)] backdrop-blur-xl text-[#c2a56a] border border-white/10 hover:translate-y-[-2px]
hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)] hover:cursor-pointer
transition-all duration-300`;

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
    <div className="container mx-auto max-w-6xl py-16 space-y-10">
      <header className="space-y-3 ">
        <Badge
          variant="secondary"
          className="bg-[rgba(90,4,20,0.4)] text-sm text-[#c2a56a]"
        >
          Informations légales
        </Badge>
        <h1 className="text-4xl font-semibold text-[#e8dfcf] tracking-tight">
          Mentions légales
        </h1>
        <p className="text-sm text-muted-foreground">
          Dernière mise à jour : {updated}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <aside className="md:sticky md:top-28 h-fit">
          <Card className={glassCardWine}>
            <CardContent className="p-5">
              <p className="text-sm font-medium text-[#c2a56a]">Sommaire</p>
              <Separator className="my-3" />
              <nav className="flex flex-col gap-1 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-md text-[#e8dfcf] px-2 py-2 text-muted-foreground hover:bg-background/60 hover:text-foreground transition"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* CONTENT */}
        <div className="space-y-8">
          <section id="editeur">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#c2a56a]">
                  Éditeur du site
                </h2>
                <Separator />

                <div className="grid gap-3 text-[#e8dfcf] text-sm md:grid-cols-2">
                  <p>
                    <span className="font-medium">Nom commercial :</span> Vites
                    &amp; Gourmand
                  </p>
                  <p>
                    <span className="font-medium">Adresse :</span> 10 Place de
                    la Bourse, 33000 Bordeaux
                  </p>
                  <p>
                    <span className="font-medium">Email :</span>{" "}
                    contact@vites-gourmand.fr
                  </p>
                  <p>
                    <span className="font-medium">Téléphone :</span> +33 5 00 00
                    00 00
                  </p>
                  <p>
                    <span className="font-medium">Statut :</span> Société en
                    cours de création
                  </p>
                  <p>
                    <span className="font-medium">RCS :</span> Bordeaux (à
                    venir)
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="hebergement">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#c2a56a]">
                  Hébergement
                </h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf]">
                  Hébergement assuré par{" "}
                  <span className="font-medium text-[#e8dfcf]">AWS</span>{" "}
                  (Amazon Web Services).
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="contact">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#c2a56a]">
                  Contact
                </h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf]">
                  Pour toute demande légale ou technique, vous pouvez écrire à
                  <span className="font-medium text-[#e8dfcf]">
                    {" "}
                    contact@vites-gourmand.fr
                  </span>
                  .
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="pi">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#c2a56a]">
                  Propriété intellectuelle
                </h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf]">
                  L’ensemble des contenus (textes, images, identité visuelle,
                  composants UI) est protégé par le droit de la propriété
                  intellectuelle. Toute reproduction non autorisée est
                  interdite.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="donnees">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#c2a56a]">
                  Données personnelles & cookies
                </h2>
                <Separator />
                <ul className="list-disc pl-5 text-sm text-[#e8dfcf] space-y-2">
                  <li>
                    Données utilisées pour la gestion des comptes et commandes.
                  </li>
                  <li>Cookies fonctionnels : authentification, panier.</li>
                  <li>Droits RGPD : accès, rectification, suppression.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="droit">
            <Card className={glassCardWine}>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#c2a56a]">
                  Droit applicable
                </h2>
                <Separator />
                <p className="text-sm text-[#e8dfcf]">
                  Le présent site est soumis au droit français. En cas de
                  litige, une solution amiable sera privilégiée.
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
