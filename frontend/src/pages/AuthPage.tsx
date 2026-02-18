import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  loginUser,
  registerUser,
  type RegisterPayload,
} from "@/store/menus/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toClientError } from "@/store/funcs/toClientError";
import { setAuthToken } from "@/utils/api";

type Mode = "login" | "register";

const inputClass =
  "w-full rounded-md bg-background/80 px-4 py-3 text-sm text-foreground " +
  "focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50";

const errorClass = "text-xs text-red-300 mt-1";

const AuthorizationPage = () => {
  const [mode, setMode] = useState<Mode>("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "employee") {
      navigate("/employee");
    } else if (user?.role === "user") {
      navigate("/espaceprive");
    }
  }, [user, navigate]);

  const onSubmit = async (data: RegisterPayload) => {
    if (mode === "register") {
      try {
        const resultAction = await dispatch(registerUser(data));
        if (!registerUser.fulfilled.match(resultAction)) {
          toast.error("Registration failed");
          return toClientError("Registration failed!");
        }
        toast("User successfuly registered!");
        setMode("login");
      } catch (e) {
        toClientError(e);
      }
    } else {
      try {
        const resultAction = await dispatch(
          loginUser({ email: data.email, password: data.password }),
        );
        if (loginUser.fulfilled.match(resultAction)) {
          setAuthToken(resultAction.payload.token);
          navigate("/espaceprive");
          toast("Login Successful");
        }
      } catch (e) {
        toClientError(e);
      }
    }
  };

  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,rgba(102,4,20,0.85),rgba(61,24,31,0.75))] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="relative grid gap-12 p-10 md:p-16 lg:grid-cols-2 items-center">
            <div className="space-y-6 text-white">
              <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm tracking-wide">
                Espace client & suivi premium
              </span>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {mode === "login"
                  ? "Accédez à votre espace"
                  : "Créez votre compte client"}
              </h1>

              <p className="max-w-xl text-white/85">
                Commandes, suivi en temps réel, facturation et avis client —
                tout est centralisé dans votre espace personnel.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 md:p-8">
              <div className="mb-6 flex rounded-full bg-white/10 p-1">
                {(["login", "register"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={[
                      "flex-1 rounded-full px-4 py-2 text-sm transition",
                      mode === m
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white",
                    ].join(" ")}
                  >
                    {m === "login" ? "Connexion" : "Inscription"}
                  </button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {mode === "register" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <input
                          {...register("firstName", {
                            required: "Prénom requis",
                          })}
                          className={inputClass}
                          placeholder="Prénom"
                        />
                        {errors.firstName && (
                          <p className={errorClass}>
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          {...register("lastName", { required: "Nom requis" })}
                          className={inputClass}
                          placeholder="Nom"
                        />
                        {errors.lastName && (
                          <p className={errorClass}>
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        {...register("phone", {
                          required: "Téléphone requis",
                          minLength: { value: 8, message: "Numéro invalide" },
                        })}
                        className={inputClass}
                        placeholder="Téléphone"
                      />
                      {errors.phone && (
                        <p className={errorClass}>{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <input
                          {...register("street", { required: "Rue requise" })}
                          className={inputClass}
                          placeholder="Rue"
                        />
                        {errors.street && (
                          <p className={errorClass}>{errors.street.message}</p>
                        )}
                      </div>

                      <div>
                        <input
                          type="number"
                          {...register("houseNumber", {
                            required: "Numéro requis",
                            valueAsNumber: true,
                          })}
                          className={inputClass}
                          placeholder="N°"
                        />
                        {errors.houseNumber && (
                          <p className={errorClass}>
                            {errors.houseNumber.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          {...register("zipCode", {
                            required: "Code postal requis",
                            pattern: {
                              value: /^[0-9]{4,6}$/,
                              message: "Code postal invalide",
                            },
                          })}
                          className={inputClass}
                          placeholder="Code postal"
                        />
                        {errors.zipCode && (
                          <p className={errorClass}>{errors.zipCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        {...register("city", { required: "Ville requise" })}
                        className={inputClass}
                        placeholder="Ville"
                      />
                      {errors.city && (
                        <p className={errorClass}>{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <select
                        {...register("country", { required: "Pays requis" })}
                        className={inputClass}
                      >
                        <option value="">Pays</option>
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                      </select>
                      {errors.country && (
                        <p className={errorClass}>{errors.country.message}</p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <input
                    type="email"
                    {...register("email", { required: "Email requis" })}
                    className={inputClass}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Mot de passe requis",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 caractères",
                      },
                    })}
                    className={inputClass}
                    placeholder="Mot de passe sécurisé"
                  />
                  {errors.password && (
                    <p className={errorClass}>{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2"
                >
                  {mode === "login" ? "Se connecter" : "Créer mon compte"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorizationPage;
