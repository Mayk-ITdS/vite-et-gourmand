import { Button, TextField } from "@mui/material";
import { SectionSurface } from "@/layouts/SectionSurface";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    toast.success("Merci pour votre message. Nous vous répondrons rapidement.");
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <SectionSurface>
        <div className="p-10 bg-[rgba(40,18,25,0.55)] backdrop-blur-xl">
          <h1 className="text-3xl tracking-widest text-[#facc15] font-light">
            CONTACT PRIVILÉGIÉ
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Discutons de votre projet gastronomique
          </p>
        </div>
      </SectionSurface>

      <SectionSurface>
        <div className="p-10 bg-[rgba(30,15,20,0.6)] backdrop-blur-xl rounded-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Nom complet"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              variant="outlined"
            />
          </div>

          <TextField
            label="Téléphone"
            name="phone"
            fullWidth
            value={form.phone}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            label="Votre message"
            name="message"
            fullWidth
            multiline
            rows={4}
            value={form.message}
            onChange={handleChange}
            variant="outlined"
          />

          <Button
            onClick={handleSubmit}
            className="
              w-full h-14
              text-lg font-semibold
              rounded-2xl
              bg-gradient-to-r from-[#6e2c30] to-[#b36a6f]
              shadow-[0_10px_30px_rgba(140,50,55,0.5)]
              hover:scale-[1.02]
              transition-all duration-300
            "
          >
            Envoyer la demande
          </Button>
        </div>
      </SectionSurface>
    </div>
  );
}
