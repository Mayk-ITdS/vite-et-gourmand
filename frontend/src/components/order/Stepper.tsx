import { Stepper, Step, StepButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStep } from "@/store/orders/orderSlice";

const steps = ["Client", "Événement", "Menu", "Résumé"];

export default function OrderStepper() {
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.orders.step);

  const handleStepChange = (targetStep: number) => {
    if (targetStep >= step) {
      return;
    }

    dispatch(setStep(targetStep));
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <Stepper
        activeStep={step}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={() => handleStepChange(index)}
              disabled={index >= step}
              sx={{
                "& .MuiStepLabel-label": {
                  color: "#ccc",
                  fontWeight: 500,
                },
                "& .MuiStepLabel-label.Mui-active": {
                  color: "#D4AF37",
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "#D4AF37",
                },
                "&.Mui-disabled": {
                  cursor: index < step ? "pointer" : "default",
                },
              }}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
