import { Stepper, Step, StepLabel } from "@mui/material";

import { useAppSelector } from "@/store/hooks";

const steps = ["Client", "Événement", "Menu", "Résumé"];

export default function OrderStepper() {
  const step = useAppSelector((state) => state.orders.step);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
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
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
