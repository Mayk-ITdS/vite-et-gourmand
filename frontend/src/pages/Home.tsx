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
    <div className="min-h-screen mx-auto w-max-6xl bg-background bg-gradient-to-b from primary/5 via-background to-background">
      <header className="px-4 py-2"></header>
      <main className="mx-auto container md:px-0">
        <div className="mx-2 grid gap-8 md:grid-cols-2 sx:grid-cols-1 md:items-center">
          <div className="space-y-10 text-center items-center">
            <Badge className="text-lg" variant="secondary">
              Catering • Bordeaux
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight">
              Catering premium sans stress
            </h1>
            <p className="text-muted-foreground">
              Choisis un menu, indique la date et l’adresse, notre equipe
              s’occupe du reste.
            </p>
            <div className="flex flex-col gap-4 justify-around w-full md:flex-row">
              <Button size={"lg"} className="text-lg">
                Découvrir les menus
              </Button>
              <Button size={"lg"} className="text-lg">
                Demander un devis
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden w-3/4 m-auto w-max-200 py-10 px-5 shadow-lg backdrop-blur-xl">
            <CardContent className="p-0">
              <div className="h-56 w-full bg-gradient-to-br from-primary/20 to-transparent">
                <div className="overflow-hidden w-full h-full">
                  <div className="carousel-track w-max flex h-full">
                    {[...demoFoodImages, ...demoFoodImages].map(
                      (src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt="food image"
                          className="w-80 shrink-0 h-full slide mr-2 object-cover"
                        />
                      )
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
