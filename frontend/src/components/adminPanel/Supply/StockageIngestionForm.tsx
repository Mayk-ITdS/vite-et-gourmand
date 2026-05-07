import { useForm, useWatch, type UseFormRegister } from "react-hook-form";
import api from "@/utils/api";
import type { DeliveryMode } from "./supplyTypes";
import type { StockFormData } from "./types/buildStockPayload";
import buildStockPayload, { initialStockFormValues } from "./types/buildStockPayload";
import IngredientsArray, { type IngredientsArrayProps } from "./IngredientsArray";
import { useEffect } from "react";

interface StockIngestionFormProps {
  mode: DeliveryMode;
  onModeChange: (mode: DeliveryMode) => void;
  onPreviewChange: (data: ReturnType<typeof buildStockPayload>) => void;
}

export const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-gray px-3 py-2 text-black text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200";
export const numberInputClass = `${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none text-right [&::-webkit-inner-spin-button]:appearance-none`;

export const labelClass = "text-sm font-medium text-black text-neutral-700";

const StockIngestionForm = ({ mode, onModeChange, onPreviewChange }: StockIngestionFormProps) => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: {},
  } = useForm<StockFormData>({
    defaultValues: initialStockFormValues,
  });
  const watchedData = useWatch({
    control,
  });

  const handleModeChange = (newMode: DeliveryMode) => {
    onModeChange(newMode);
    setValue("product_type", newMode === "lineage" ? "raw" : "semi", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  useEffect(() => {
    try {
      const previewPayload = buildStockPayload(watchedData as StockFormData, mode);
      onPreviewChange(previewPayload);
    } catch (err) {
      onPreviewChange(buildStockPayload(initialStockFormValues, mode));
    }
  }, [watchedData, mode, onPreviewChange]);

  const onSubmit = async (data: StockFormData) => {
    try {
      const payload = buildStockPayload(data, mode);
      console.log(data);
      const res = await api.post("admin/stock/ingest", {
        mode,
        payload,
      });
      return res.data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">Nouvelle ingestion de stock</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Créez un lot entrant dans le stock via la procédure centrale d’ingestion.
          </p>
        </div>

        <div className="inline-flex rounded-2xl border bg-neutral-50 p-1">
          <button
            type="button"
            onClick={() => handleModeChange("lineage")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === "lineage"
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Matière première
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("synthesis")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === "synthesis"
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Produit composé
          </button>
        </div>
      </div>

      {mode === "lineage" ? (
        <RawDeliveryFields register={register} />
      ) : (
        <SynthesisFields control={control} register={register} />
      )}

      <div className="mt-6 flex items-center justify-between border-t pt-5">
        <p className="text-sm text-neutral-500">
          Statut appliqué automatiquement:{" "}
          <span className="font-medium text-neutral-900">arrived</span>
        </p>

        <button
          type="submit"
          className="rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Enregistrer l’ingestion
        </button>
      </div>
    </form>
  );
};
const RawDeliveryFields = ({ register }: { register: UseFormRegister<any> }) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border bg-neutral-50 p-4">
        <p className="text-sm font-semibold text-neutral-900">Mode lineage</p>
        <p className="mt-1 text-sm text-neutral-500">
          Ce mode crée un lot de matière première et l’enregistre comme son propre ingrédient de
          base.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom du produit">
          <input
            {...register("product_name", {
              required: "Le nom du produit est obligatoire",
            })}
            className={inputClass}
          />
        </Field>

        <Field label="Producteur">
          <input
            {...register("producer_name", {
              required: "Le nom du producteur est obligatoire",
            })}
            className={inputClass}
            placeholder="Ferme du Soleil"
          />
        </Field>

        <Field label="Régime">
          <select {...register("diet_type")} className={inputClass} defaultValue="Vegan">
            <option value="Vegetarien">Vegetarien</option>
            <option value="Vegan">Vegan</option>
            <option value="Classique">Classique</option>
          </select>
        </Field>

        <Field label="Calories">
          <input {...register("calories")} type="number" className={inputClass} placeholder="18" />
        </Field>

        <Field label="Prix du lot">
          <input
            {...register("price_lot", {
              required: "Prix du lot",
            })}
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="24.50"
          />
        </Field>

        <Field label="Quantité du lot">
          <input
            {...register("lot_quantity")}
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="10"
          />
        </Field>

        <Field label="Unité">
          <select {...register("unit")} className={inputClass} defaultValue="kg">
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
            <option value="szt">szt</option>
          </select>
        </Field>

        <Field label="Type produit">
          <input {...register("product_type")} className={inputClass} value="raw" readOnly />
        </Field>

        <Field label="Date d’arrivée">
          <input {...register("arrival_date")} type="date" className={inputClass} />
        </Field>

        <Field label="Date d’expiration">
          <input
            {...register("expiration_date", {
              required: "La date d'expiration est obligatoire",
            })}
            type="date"
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
};

const SynthesisFields = ({ control, register }: IngredientsArrayProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border bg-neutral-50 p-4">
        <p className="text-sm font-semibold text-neutral-900">Mode synthesis</p>
        <p className="mt-1 text-sm text-neutral-500">
          Ce mode crée un produit semi-fini ou fini et associe une liste d’ingrédients à ce lot.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom du produit">
          <input
            className={inputClass}
            placeholder="Sauce tomate maison"
            {...register("product_name", {
              required: "Le nom du produit est obligatoire",
            })}
          />
        </Field>

        <Field label="Producteur">
          <input
            className={inputClass}
            placeholder="Cuisine Centrale"
            {...register("producer_name", {
              required: "Le nom du producteur est obligatoire",
            })}
          />
        </Field>

        <Field label="Type produit">
          <select
            {...register("product_type", {
              required: "Le type de produit est obligatoire",
            })}
            className={inputClass}
            defaultValue="semi"
          >
            <option value="semi">semi</option>
            <option value="finished">finished</option>
          </select>
        </Field>

        <Field label="Régime">
          <select
            {...register("diet_type", {
              required: "Le régime est obligatoire",
            })}
            className={inputClass}
            defaultValue="Vegan"
          >
            <option value="Vegetarien">Vegetarien</option>
            <option value="Vegan">Vegan</option>
            <option value="Classique">Classique</option>
          </select>
        </Field>

        <Field label="Prix du lot">
          <input
            {...register("price_lot", {
              required: "Le prix du lot est obligatoire",
            })}
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="18.90"
          />
        </Field>

        <Field label="Quantité du lot">
          <input
            {...register("lot_quantity", {
              required: "La quantité du lot est obligatoire",
            })}
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="5"
          />
        </Field>

        <Field label="Unité">
          <select
            {...register("unit", {
              required: "L'unité est obligatoire",
            })}
            className={inputClass}
            defaultValue="kg"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
            <option value="szt">szt</option>
          </select>
        </Field>

        <Field label="Date d’arrivée">
          <input
            {...register("arrival_date", {
              required: "La date d’arrivée est obligatoire",
            })}
            type="date"
            className={inputClass}
          />
        </Field>

        <Field label="Date d’expiration">
          <input
            {...register("expiration_date", {
              required: "La date d’expiration est obligatoire",
            })}
            type="date"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-950">Ingrédients</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Version UI prête. La logique dynamique d’ajout/suppression reste à implémenter.
            </p>
          </div>
        </div>
        <IngredientsArray control={control} register={register} />
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => {
  return (
    <label className="space-y-2">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
};

export default StockIngestionForm;
