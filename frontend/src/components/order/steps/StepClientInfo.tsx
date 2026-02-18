import { TextField } from "@mui/material";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setClientInfo, setStep } from "@/store/orders/orderSlice";

export default function StepClientInfo() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const client = useAppSelector((state) => state.orders.client);

  const [phone, setPhone] = useState(client.phone || "");

  if (!authUser) return null;

  const handleNext = () => {
    dispatch(
      setClientInfo({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
        phone: phone,
      }),
    );

    dispatch(setStep(+1));
  };

  return (
    <div className="space-y-6">
      <TextField
        label="First Name"
        fullWidth
        value={authUser.firstName}
        disabled
      />

      <TextField
        label="Last Name"
        fullWidth
        value={authUser.lastName}
        disabled
      />

      <TextField label="Email" fullWidth value={authUser.email} disabled />

      <TextField
        label="Mobile"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={handleNext}
        className="w-full rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 transition"
      >
        Continuer
      </button>
    </div>
  );
}
