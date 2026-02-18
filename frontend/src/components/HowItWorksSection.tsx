import { Link } from "react-router-dom";
import {
  Sparkle,
  PhoneCall,
  FileText,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";

const steps = [
  {
    step: "01",
    title: "Exprimez votre idée",
    desc: "Choisissez un thème ou décrivez votre événement en quelques mots : chic, wine, intimiste, corporate. Nous cadrons vos envies et contraintes.",
    icon: Sparkle,
    href: "/menus",
    cta: "Découvrir les thèmes & menus",
  },
  {
    step: "02",
    title: "Échangez avec un chef de projet",
    desc: "Un interlocuteur dédié analyse votre besoin, affine la logistique et vous conseille sur les menus et accords mets & vins.",
    icon: PhoneCall,
    href: "/contact",
    cta: "Planifier un échange",
  },
  {
    step: "03",
    title: "Recevez une proposition détaillée",
    desc: "Une offre claire et structurée, avec options, planning et budget, accessible sur votre espace personnel ou par e-mail.",
    icon: FileText,
    href: "/userpanel",
    cta: "Consulter ma proposition",
  },
  {
    step: "04",
    title: "Validez, nous orchestrons le jour J",
    desc: "Ajustez les derniers détails, confirmez la prestation, puis laissez-nous coordonner l’exécution et le service.",
    icon: CheckCircle,
    href: "/userpanel",
    cta: "Finaliser ma demande",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="w-full py-12">
      <div className="mx-auto h-auto px-8 space-y-8">
        <header className="text-center space-y-12">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Comment ça marche
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Un parcours fluide, humain et maîtrisé - de l’idée initiale à
            l’exécution le jour J.
          </p>
        </header>
        <div className="xl:flex:wrap flex 2xl:flex-row flex-col justify-center gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="
                  relative
                  rounded-2xl
                  flex-col
                  border border-white/15
                  bg-white/10 backdrop-blur-xl
                  shadow-[0_24px_80px_rgba(0,0,0,0.4)]
                  transition-transform duration-300 hover:scale-[1.015]
                "
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%)]" />
                <div className="relative flex flex-col p-3 space-y-6">
                  <div className="flex min-h-50 gap-12 flex-col md:flex-row items-center justify-between">
                    <div
                      className="
                        h-24 w-24 rounded-2xl
                        bg-[linear-gradient(135deg,rgba(102,4,20,0.85),rgba(61,24,31,0.65))]
                        border border-white/15
                        flex items-center justify-center
                      "
                    >
                      <Icon size={48} weight="duotone" className="text-white" />
                    </div>
                    <div className="space-y-6 flex-1">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {s.title}
                      </h3>
                      <p className="text-md max-w-150 text-white/80 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={s.href}
                    className="
                      group inline-flex items-center justify-between
                      rounded-lg
                      h-15
                      max-w-[50%]
                      border border-white/20
                      bg-white/10
                      px-5 py-3
                      text-sm
                      text-center 
                      font-medium text-white
                      transition
                      hover:bg-white/20
                    "
                  >
                    {s.cta}
                    <ArrowRight
                      size={28}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
