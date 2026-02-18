import OrderStepper from "./Stepper";
import OrderContent from "./OrderContent";
import OrderPricingCard from "./OrderPricingCard";

export default function OrderLayout() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <OrderStepper />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2">
          <OrderContent />
        </div>
        <div className="hidden lg:block">
          <OrderPricingCard />
        </div>
      </div>
    </div>
  );
}
