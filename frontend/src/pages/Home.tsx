import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/ui/Navbar";
import { demoFoodImages } from "@/lib/demoImages";
import Equipe from "@/components/ui/Equipe";
import { teamData } from "@/lib/teamData";
const Home = () => {
  return (
    <div className="min-h-screen mx-auto max-w-6xl py-12 bg-background bg-gradient-to-b from primary/5 via background to-background">
      <header className="px-4 py-2">
        <Navbar />
        <Separator className="my-4" />
      </header>
      <main className="mx-auto px-4 py-3">
        <div className="grid gap-8 md:grid-cols-2 sx:grid-cols-1 md:items-center">
          <div className="space-y-6 flex flex-col text-center items-center">
            <Badge className="text-md" variant="secondary">
              Catering • Bordeaux
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight">
              Catering premium sans stress
            </h1>
            <p className="text-muted-foreground">
              Choisis un menu, indique la date et l’adresse, notre equipe
              s’occupe du reste.
            </p>
            <div className="fle">
              <Button className="text-md">Découvrir les menus</Button>
              <Button className="text-md">Demander un devis</Button>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/20 to-transparent">
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
        <Equipe members={teamData} />
      </main>
    </div>
  );
};
export default Home;
