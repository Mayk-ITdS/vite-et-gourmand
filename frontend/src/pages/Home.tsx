import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import salmon from "@/assets/salmon1.webp";
import veganDish from "@/assets/vegan1.webp";
import romanticEvening from "@/assets/romantic1.webp";
import corpoEvent from "@/assets/corpo1.avif";
import Equipe from "@/components/ui/Equipe";
import { teamData } from "@/lib/teamData";
import Avis from "@/components/ui/Avis";
import { opinions } from "@/lib/mockData";
import CTAChefCall from "@/components/CTAChefCall";
import HowItWorksSection from "@/components/HowItWorksSection";

const heroMetrics = [
  { label: "Menus signatures", value: "24" },
  { label: "Events prives & pro", value: "7j/7" },
  { label: "Coordination premium", value: "360°" },
];

const featuredCollections = [
  {
    image: salmon,
    title: "Tradition Francaise",
    caption: "A partir de 65 € / pers.",
    note: "Saveurs bourgeoises revisitees pour diners signatures.",
  },
  {
    image: veganDish,
    title: "Elegance Vegetale",
    caption: "A partir de 58 € / pers.",
    note: "Textures nettes, dressages lumineux et accords precis.",
  },
  {
    image: romanticEvening,
    title: "Evenement Prestige",
    caption: "A partir de 95 € / pers.",
    note: "Grandes occasions, scenographie chaude et service orchestre.",
  },
];

const savoirFaireCards = [
  {
    title: "Expérience",
    desc: "Événementiel premium avec un niveau d'exécution constant.",
  },
  {
    title: "Menus sur mesure",
    desc: "Cuisine adaptée à chaque occasion, format et niveau de service.",
  },
  {
    title: "Clients exigeants",
    desc: "Particuliers, entreprises et réceptions à forte attente visuelle.",
  },
];

const Home = () => {
  return (
    <div className="w-full space-y-16 pb-8">
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-4 pt-2 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="relative min-h-[640px] overflow-hidden rounded-[2.3rem] border border-white/10 bg-[#0e1118] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <img
              src={corpoEvent}
              alt="Mise en scene culinaire"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,9,14,0.94),rgba(7,9,14,0.66)_48%,rgba(7,9,14,0.3))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,59,87,0.4),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(236,201,111,0.14),transparent_28%)]" />

            <div className="relative flex h-full flex-col justify-between p-8 md:p-10 xl:p-12">
              <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.32em] text-white/55">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/78">
                  Experiences culinaires premium
                </span>
                <span>Prive</span>
                <span className="text-white/22">/</span>
                <span>Corporate</span>
              </div>

              <div className="max-w-3xl space-y-6">
                <h1 className="font-display text-5xl leading-[0.92] tracking-[0.01em] text-[#f8f1ea] md:text-6xl xl:text-7xl">
                  Des experiences culinaires pensees pour vos moments qui comptent.
                </h1>

                <p className="max-w-2xl text-base leading-7 text-white/68 md:text-lg">
                  Diner intimiste, reception elegante ou evenement d'entreprise: nous
                  construisons un parcours gastronomique complet, du menu a la
                  coordination du service.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/menus"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(116,43,63,0.38)] transition hover:opacity-95"
                  >
                    Decouvrir les menus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#callback"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/88 transition hover:bg-white/[0.08]"
                  >
                    Etre rappele par un chef de projet
                  </a>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.4rem] border border-white/10 bg-black/24 px-4 py-4 backdrop-blur-xl"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/36">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.96),rgba(12,14,19,0.92))] p-7 shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-[#e5c57d]/20 bg-[#e5c57d]/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.3em] text-[#f0d89a]">
                  Selection maison
                </span>
                <Sparkles className="h-5 w-5 text-[#e5c57d]" />
              </div>

              <h2 className="mt-5 font-display text-4xl leading-none text-[#f8f1ea]">
                Menus signatures pour receptions chaleureuses.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Une direction visuelle sobre, des surfaces noires satinées, une touche
                bordeaux et des assiettes hero pour porter l’univers premium de la
                maquette hi-fi.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-[#e5c57d]" />
                  Service et coordination sur mesure
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#e5c57d]" />
                  Menus adaptes de 6 a 120 convives
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-[#e5c57d]" />
                  Ambiance luxe discret et lisibilite maximale
                </li>
              </ul>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {featuredCollections.slice(0, 2).map((collection) => (
                <article
                  key={collection.title}
                  className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101319] shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/34">
                      {collection.caption}
                    </p>
                    <h3 className="font-display text-3xl text-white">
                      {collection.title}
                    </h3>
                    <p className="text-sm leading-6 text-white/58">{collection.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#e5c57d]">
              Collections signatures
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#f8f1ea] md:text-5xl">
              Une grille hi-fi plus claire pour vos menus.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/58 md:text-right">
            Nous gardons la chaleur culinaire du projet, mais avec des cartes plus denses,
            des contrastes plus nets et des appels a l’action mieux structures.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredCollections.map((collection) => (
            <article
              key={collection.title}
              className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,19,24,0.98),rgba(10,11,15,0.95))] shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,9,14,0.82))]" />
              </div>
              <div className="space-y-4 p-6">
                <h3 className="font-display text-3xl text-white">{collection.title}</h3>
                <p className="text-sm leading-7 text-white/58">{collection.note}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#e5c57d]">
                    {collection.caption}
                  </span>
                  <Link
                    to="/menus"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/82 transition hover:text-white"
                  >
                    Voir les menus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.98),rgba(10,12,17,0.96))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-8">
        <header className="space-y-4 text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#e5c57d]">
            Notre savoir-faire
          </p>
          <h2 className="font-display text-4xl text-[#f8f1ea] md:text-5xl">
            Une organisation culinaire maîtrisée de bout en bout.
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-white/58 md:text-base">
            Chaque événement repose sur une orchestration précise entre cuisine, service
            et coordination logistique pour une exécution fluide, sans approximation.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {savoirFaireCards.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/34">
                Signature
              </p>
              <h3 className="mt-4 font-display text-3xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/58">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <Equipe members={teamData} />
      <HowItWorksSection />
      <Avis opinions={opinions} />

      <div id="callback">
        <CTAChefCall />
      </div>
      <section className="container mx-auto max-w-5xl py-32 text-center space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          Prêt à organiser votre événement ?
        </h2>
        <p className="text-lg text-muted-foreground">
          Découvrez nos menus ou obtenez un devis personnalisé.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Button
            size="lg"
            className="text-xl px-10"
            asChild
          >
            <Link to="/menus">Voir les menus</Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="text-xl px-10"
            asChild
          >
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
