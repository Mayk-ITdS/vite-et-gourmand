import AvisCarousel from "../AvisCarousel";

const Avis = () => {
  return (
    <section className="py-28">
      <div className="flex flex-col items-center justify-center px-4 space-y-14">
        <header className="text-center space-y-4">
          <h2 className="text-2xl md:text-2xl font-semibold tracking-tight">
            Ils nous ont fait confiance
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Particuliers et entreprises nous confient leurs événements les plus
            importants.
          </p>
        </header>

        <AvisCarousel />
      </div>
    </section>
  );
};

export default Avis;
