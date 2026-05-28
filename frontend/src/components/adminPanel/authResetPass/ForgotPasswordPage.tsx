import { useForm } from "react-hook-form";
import { toast } from "sonner";

import api from "@/utils/api";
import { Button } from "@/components/ui/button";

type ForgotPasswordForm = {
  email: string;
};

const inputClass =
  "w-full rounded-md bg-background/80 px-4 py-3 text-sm text-foreground " +
  "focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50";

const errorClass = "text-xs text-red-300 mt-1";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await api.post("/auth/forgot-password", data);

      toast.success(
        "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
      );
    } catch (e) {
      toast.error(String(e));
    }
  };

  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-md rounded-2xl bg-white/10 p-8 text-white">
        <h1 className="mb-4 text-2xl font-semibold">Mot de passe oublié</h1>
        <p className="mb-6 text-sm text-white/75">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email requis",
              })}
              className={inputClass}
              placeholder="Votre email"
            />

            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            Envoyer le lien
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
