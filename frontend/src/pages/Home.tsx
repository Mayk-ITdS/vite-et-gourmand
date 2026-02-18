import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import salmon from "@/assets/salmon1.jpg";
import veganDish from "@/assets/vegan1.jpg";
import romanticEvening from "@/assets/romantic1.jpg";
import corpoEvent from "@/assets/corpo1.avif";
import Equipe from "@/components/ui/Equipe";
import { teamData } from "@/lib/teamData";
import Avis from "@/components/ui/Avis";
import { opinions } from "@/lib/mockData";
import CTAChefCall from "@/components/CTAChefCall";
import HowItWorksSection from "@/components/HowItWorksSection";
import { cn } from "@/lib/utils";

import { glassCard } from "./MentionsLegales";


const Home = () => {
  return (
    <div className=" w-full">
      <section
        className="relative
    left-1/2 -translate-x-1/2
    w-screen
    h-[75vh] lg:h-[80vh]
    min-h-[620px] max-h-[820px]
    mt-[-32px]
    overflow-hidden"
      >
        <div className="absolute w-[100vw] inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[salmon, veganDish, romanticEvening, corpoEvent].map((src) => (
            <img
              key={src}
              src={src}
              className="h-full w-full object-cover"
              alt=""
            />
          ))}
        </div>
        <div
          className={cn(
            "absolute inset-0 bg-black/45 backdrop-blur-[1px]",
            glassCard,
          )}
        />
        <div className="relative z-10 h-full flex items-end pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl px-8">
            <div className="max-w-6xl space-y-8">
              <span className="inline-block rounded-full text-center border md:text-xl border-white/20 bg-white/10 px-4 py-1 text-sm backdrop-blur">
                Occasions privées & événements professionnels
              </span>

              <h1 className="md:text-3xl text-md font-semibold tracking-tight leading-tight text-white">
                Des expériences culinaires pensées
                <br />
                pour les moments qui comptent
              </h1>

              <p className="text-2xl text-white/80">
                Dîners privés, soirées entre proches, événements d’entreprise ou
                occasions singulières — chaque prestation est conçue sur mesure,
                du menu à l’orchestration.
              </p>

              <p className="text-xl text-white/60">
                Gastronomie de saison • Accords mets & vins • Coordination
                complète
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  to="/menus"
                  className="rounded-xl bg-primary px-8 py-4 text-primary-foreground font-medium hover:bg-primary/90 transition"
                >
                  Découvrir les menus
                </Link>
                <Link
                  to="#callback"
                  className="rounded-xl border border-white/30 px-8 py-4 text-white hover:bg-white/10 transition"
                >
                  Être rappelé par un chef de projet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex relative w-full py-14">
        <div className="mx-auto flex flex-col w-full px-10 space-y-6">
          <header className="flex space-y-6 flex-col justify-center items-center py-12">
            <span className="text-sm md:text-xl uppercase tracking-widest text-primary/90">
              Notre savoir-faire
            </span>

            <h2 className="text-xl md:text-2xl w-full text-center font-semibold leading-tight">
              Une organisation culinaire
              <br />
              maîtrisée de bout en bout
            </h2>

            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              Chaque événement repose sur une orchestration précise entre
              cuisine,
              <br /> service et coordination logistique - pour une exécution
              fluide, sans approximation.
            </p>
          </header>
          <div className="flex flex-col md:flex-row py-6 w-full gap-10">
            {[
              {
                title: "expérience",
                desc: "Événementiel premium",
              },
              {
                title: "Menus sur mesure",
                desc: "Cuisine adaptée à chaque occasion",
              },
              {
                title: "Clients exigeants",
                desc: "Particuliers & entreprises",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl w-full text-center items-center justify-center md:h-auto min-h-10 space-y-6 flex w-[40%] flex-col border border-white/20 bg-white/5 backdrop-blur-xl p-8"
              >
                <h3 className="text-xl text-center font-medium">
                  {item.title}
                </h3>
                <p className="mt-2 text-lg text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Equipe members={teamData} />
      <HowItWorksSection />
      <Avis opinions={opinions} />

      <CTAChefCall />
      <section className="container mx-auto max-w-5xl py-32 text-center space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          Prêt à organiser votre événement ?
        </h2>
        <p className="text-lg text-muted-foreground">
          Découvrez nos menus ou obtenez un devis personnalisé.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Button size="lg" className="text-xl px-10">
            Voir les menus
          </Button>
          <Button size="lg" variant="secondary" className="text-xl px-10">
            Demander un devis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
