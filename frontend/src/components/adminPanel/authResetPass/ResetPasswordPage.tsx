import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";

type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

const inputClass =
  "w-full rounded-md bg-background/80 px-4 py-3 text-sm text-foreground " +
  "focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50";

const errorClass = "text-xs text-red-300 mt-1";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Lien de réinitialisation invalide.");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: data.newPassword,
      });

      toast.success("Mot de passe réinitialisé avec succès.");
      navigate("/auth");
    } catch (e) {
      toast.error(String(e));
    }
  };

  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-md rounded-2xl bg-white/10 p-8 text-white">
        <h1 className="mb-4 text-2xl font-semibold">Réinitialiser le mot de passe</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              type="password"
              {...register("newPassword", {
                required: "Nouveau mot de passe requis",
                minLength: {
                  value: 10,
                  message: "Minimum 10 caractères",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/,
                  message:
                    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
                },
              })}
              className={inputClass}
              placeholder="Nouveau mot de passe"
            />

            {errors.newPassword && (
              <p className={errorClass}>{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirmation requise",
                validate: (value) =>
                  value === newPassword || "Les mots de passe ne correspondent pas",
              })}
              className={inputClass}
              placeholder="Confirmer le mot de passe"
            />

            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            Réinitialiser le mot de passe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
