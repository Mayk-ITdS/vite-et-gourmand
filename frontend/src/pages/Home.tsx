import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { demoFoodImages } from "@/lib/demoImages";
import Equipe from "@/components/ui/Equipe";
import { teamData } from "@/lib/teamData";
import Avis from "@/components/ui/Avis";
import { opinions } from "@/lib/mockData";

const Home = () => {
  return (
    <div className="min-h-screen mx-auto w-full">
      <header className="px-4 py-2"></header>
      <main className="mx-auto container md:px-0">
        <div className="mx-2 grid h-200 gap-8 md:grid-cols-2 sm:grid-cols-1 md:items-center">
          <div className="flex flex-col space-y-10 text-center items-center">
            <Badge className="text-2xl" variant="secondary">
              Catering • Bordeaux
            </Badge>
            <h1 className="text-7xl font-semibold tracking-tight">
              Catering premium sans stress
            </h1>
            <p className="text-muted-foreground text-xl">
              Choisis un menu, indique la date et l’adresse, notre equipe
              s’occupe du reste.
            </p>
            <div className="flex flex-col gap-4 justify-around w-full">
              <Button size={"lg"} className="text-2xl">
                Découvrir les menus
              </Button>
              <Button size={"lg"} className="text-2xl">
                Demander un devis
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden h-150 w-3/4 py-0 m-auto w-full px-2 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-0">
              <div className="h-auto w-full bg-gradient-to-br from-primary/20 to-transparent">
                <div className="overflow-hidden w-full h-full">
                  <div className="carousel-track w-max flex h-full">
                    {[...demoFoodImages, ...demoFoodImages].map(
                      (src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt="food image"
                          className="w-auto shrink-0 h-full slide mr-2 object-cover"
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Separator className="my-10" />
      </main>
      <Equipe members={teamData} />
      <Avis opinions={opinions} />
    </div>
  );
};
export default Home;
