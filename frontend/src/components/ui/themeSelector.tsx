import { Button } from "./button";

const themeSelector: React.FC<string> = () => {
  return (
    <section>
      <Button className="radius-0.5 bg-color-bordeaux text-center white">
        Bordeaux
      </Button>
      <Button className="radius-0.5 bg-color-bordeaux text-center white">
        Dark
      </Button>
    </section>
  );
};
export default themeSelector;
