import OrderContent from "@/components/order/OrderContent";
import OrderStepper from "@/components/order/Stepper";
import OrderSidebarSummary from "@/components/order/SummaryCard";
import { SectionSurface } from "@/layouts/SectionSurface";

export default function OrderPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <SectionSurface>
        <div className="p-10 bg-[rgba(40,18,25,0.55)] backdrop-blur-xl">
          <h1 className="text-3xl tracking-widest text-[#facc15] font-light">
            COMMANDE PRIVÉE
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Configuration de votre prestation gastronomique
          </p>
        </div>
      </SectionSurface>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <SectionSurface>
            <div className="p-10 bg-[rgba(30,15,20,0.6)] backdrop-blur-xl">
              <OrderStepper />
              <div className="mt-10">
                <OrderContent />
              </div>
            </div>
          </SectionSurface>
        </div>
        <div className="lg:col-span-1">
          <OrderSidebarSummary />
        </div>
      </div>
    </div>
  );
}
