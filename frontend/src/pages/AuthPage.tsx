import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { loginUser, registerUser, type RegisterPayload } from "@/store/menus/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { toClientError } from "@/store/funcs/toClientError";
import { setAuthToken } from "@/utils/api";

type Mode = "login" | "register";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white " +
  "placeholder:text-white/34 focus:outline-none focus:ring-2 focus:ring-[#a43c57] disabled:opacity-50";

const errorClass = "mt-1 text-xs text-red-300";

const AuthorizationPage = () => {
  const [mode, setMode] = useState<Mode>("login");
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);
  // const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();

  const regex = () => {
    return /^(?=.*([A-Z]))(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();

  const onSubmit = async (data: RegisterPayload) => {
    if (mode === "register") {
      try {
        await dispatch(registerUser(data)).unwrap();
        // setMessageType("success");
        setMessage("Compte créé. Vous pouvez maintenant vous connecter.");
        setMode("login");
      } catch (e) {
        // setMessageType("error");
        setMessage("Registration failed");
        toast.error("Registration failed");
        return toClientError(e);
      }
    } else {
      try {
        const resultAction = await dispatch(
          loginUser({ email: data.email, password: data.password }),
        );
        if (loginUser.fulfilled.match(resultAction)) {
          const { token, user } = resultAction.payload;
          setAuthToken(token);
          if (user.role === "admin") {
            void navigate("/admin");
          } else if (user.role === "employee") {
            void navigate("/employee");
          } else {
            void navigate("/espaceprive");
          }
          toast("Login Successful");
        }
      } catch (e) {
        toClientError(e);
      }
    }
  };
  return (
    <section className="mx-auto max-w-[1180px] py-16">
      <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(17,20,26,0.98),rgba(9,11,15,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.35)] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hidden border-r border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(166,61,89,0.28),transparent_28%),linear-gradient(180deg,rgba(20,14,20,0.92),rgba(10,12,17,0.88))] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.32em] text-white/55">
              Espace prive
            </span>
            <h1 className="mt-6 font-display text-5xl text-[#f8f1ea]">
              {mode === "login" ? "Connexion" : "Inscription"}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/62">
              Une interface resserrée, sombre et premium inspirée de la maquette hi-fi,
              pour gérer vos commandes, vos devis et votre suivi client.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5 text-sm text-white/62">
            <p>Commandes centralisées</p>
            <p className="mt-2">Facturation et statut en temps réel</p>
            <p className="mt-2">Support premium et récupération de mot de passe</p>
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-6 lg:hidden">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.32em] text-white/55">
                Espace prive
              </span>
              <h1 className="mt-5 font-display text-4xl text-[#f8f1ea]">
                {mode === "login" ? "Connexion" : "Inscription"}
              </h1>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)] md:p-7">
              <div className="mb-6 flex rounded-full border border-white/10 bg-black/20 p-1">
                {(["login", "register"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={[
                      "flex-1 rounded-full px-4 py-2 text-sm transition",
                      mode === m
                        ? "bg-[linear-gradient(135deg,#a43c57,#742b3f)] text-white shadow-[0_16px_35px_rgba(116,43,63,0.32)]"
                        : "text-white/54 hover:text-white",
                    ].join(" ")}
                  >
                    {m === "login" ? "Connexion" : "Inscription"}
                  </button>
                ))}
              </div>

              {message && (
                <div className="mb-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {message}
                </div>
              )}

              <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                          <p className={errorClass}>{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <input
                          {...register("lastName", { required: "Nom requis" })}
                          className={inputClass}
                          placeholder="Nom"
                        />
                        {errors.lastName && (
                          <p className={errorClass}>{errors.lastName.message}</p>
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
                          <p className={errorClass}>{errors.houseNumber.message}</p>
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
                      {errors.city && <p className={errorClass}>{errors.city.message}</p>}
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
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Mot de passe requis",
                      ...(mode === "register" && {
                        pattern: {
                          value: regex(),
                          message: "Mot de masse incorrect",
                        },
                        minLength: {
                          value: 10,
                          message: "Minimum 10 caractères",
                        },
                      }),
                    })}
                    className={inputClass}
                    placeholder="Mot de passe sécurisé"
                  />
                  {errors.password && (
                    <p className={errorClass}>{errors.password.message}</p>
                  )}
                </div>
                {mode === "login" && (
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-white/75 underline-offset-4 transition hover:text-white hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 h-12 w-full rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] text-white shadow-[0_18px_40px_rgba(116,43,63,0.32)] hover:opacity-95"
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
