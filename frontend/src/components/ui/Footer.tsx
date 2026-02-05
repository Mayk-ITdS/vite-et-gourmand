import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full bg-primary">
      <section className="flex flex-col w-full items-center text-base text-secondary text-center justify-center mt-2">
        <Badge variant="default" className="mt-10 sm:text-xl text-2xl">
          Vites & Gourmand
        </Badge>
        <Separator className="mt-3" />
        <ul className="flex flex-wrap gap-4 py-4 mt-4 sm:text-sm px-2 justify-center text-xl">
          <li>Inquire </li>
          <li>References </li>
          <li>Media </li>
          <li>Careers</li>
        </ul>
        <ul className="flex mb-2 py-4 px-2 gap-6">
          <li>
            <Link to="/mentions" className="hover:underline">
              Mention légales
            </Link>
          </li>
          <li>
            <Link to="/conditions" className="hover:underline">
              Conditions générale
            </Link>
          </li>
        </ul>
        <div className="flex flex-wrap flex-col gap-4 py-3">
          <p>10 Place de la Bourse, 33000 Bordeaux, France</p>
          <p>+3301406832</p>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
