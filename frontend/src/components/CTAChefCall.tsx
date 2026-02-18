const CTAChefCall = () => {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="
                relative overflow-hidden rounded-3xl
                border border-white/15
                bg-[linear-gradient(135deg,rgba(102,4,20,0.85),rgba(61,24,31,0.75))]
                backdrop-blur-xl
                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
              "
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%)]" />

          <div className="relative grid gap-12 p-10 md:p-16 lg:grid-cols-2 items-center">
            <div className="space-y-6 text-white">
              <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm tracking-wide">
                Accompagnement sur mesure
              </span>

              <h3 className="text-xl md:text-lg font-semibold tracking-tight">
                Un chef de projet vous rappelle
              </h3>

              <p className="max-w-xl text-md text-white/85">
                En quelques minutes, échangez avec un chef de projet dédié pour
                affiner votre événement, vos menus et vos contraintes
                logistiques.
              </p>

              <ul className="space-y-2 text-sm text-white/80">
                <li>• Conseil personnalisé & sans engagement</li>
                <li>• Expertise événements privés & corporate</li>
                <li>• Réponse rapide, claire et professionnelle</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 md:p-8">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md bg-background/80 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md bg-background/80 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <button
                  type="submit"
                  className="
                w-full mt-4
                rounded-md bg-primary px-6 py-3
                text-sm font-medium text-primary-foreground
                hover:bg-primary/90
                transition
              "
                >
                  Être rappelé par un chef de projet
                </button>

                <p className="text-xs text-white/60 text-center pt-2">
                  Réponse rapide — sans engagement
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTAChefCall;
