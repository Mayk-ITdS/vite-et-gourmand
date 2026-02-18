import { useAppSelector } from "@/store/hooks";

import StepClientInfo from "./steps/StepClientInfo";
import StepEventDetails from "./steps/StepEventDetails";
import StepMenuSelection from "./steps/StepMenuSelection";
import OrderSummaryCard from "./SummaryCard";

export default function OrderContent() {
  const step = useAppSelector((state) => state.orders.step);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
      {step === 0 && <StepClientInfo />}
      {step === 1 && <StepEventDetails />}
      {step === 2 && <StepMenuSelection />}
      {step === 3 && <OrderSummaryCard />}
    </div>
  );
}
