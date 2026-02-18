import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

import { setPrestation, setStep } from "@/store/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type EventForm = {
  street: string;
  houseNumber: number;
  zipCode: string;
  city: string;
  date: string;
  time: string;
};

export default function StepEventDetails() {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state: any) => state.orders);

  const { register, handleSubmit } = useForm<EventForm>({
    defaultValues: order.event || {},
  });

  const onSubmit = (data: EventForm) => {
    dispatch(
      setPrestation({
        address: `${(data.street, data.houseNumber)}`,
        city: data.city,
        date: data.date,
        time: data.time,
        distanceKm: 0,
      }),
    );
    dispatch(setStep(2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 gap-6"
    >
      <TextField
        label="Event Date"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        {...register("date", { required: true })}
      />

      <TextField
        label="Event Time"
        type="time"
        fullWidth
        InputLabelProps={{ shrink: true }}
        {...register("time", { required: true })}
      />

      <TextField
        label="Street"
        fullWidth
        {...register("street", { required: true })}
      />

      <TextField
        label="House Number"
        type="number"
        fullWidth
        {...register("houseNumber", { valueAsNumber: true, required: true })}
      />

      <TextField
        label="Zip Code"
        fullWidth
        {...register("zipCode", { required: true })}
      />

      <TextField
        label="City"
        fullWidth
        {...register("city", { required: true })}
      />

      <Button
        type="submit"
        className="
          col-span-2 mt-6
          bg-white/10
          backdrop-blur-md
          border border-white/20
          text-white
          hover:bg-white/20
          transition-all duration-300
        "
      >
        Continuer
      </Button>
    </form>
  );
}
