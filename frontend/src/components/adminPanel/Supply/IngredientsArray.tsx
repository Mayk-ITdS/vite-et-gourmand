import { useFieldArray } from "react-hook-form";
import type { Control, UseFormRegister } from "react-hook-form";

import { inputClass } from "./StockageIngestionForm";
import { labelClass } from "./StockageIngestionForm";
import type { StockFormData } from "./types/buildStockPayload";
import { numberInputClass } from "./StockageIngestionForm";

export type IngredientsArrayProps = {
  control: Control<StockFormData>;
  register: UseFormRegister<StockFormData>;
};

const createEmptyIngredient = (): StockFormData["ingredients"][number] => ({
  ingredient_name: "",
  ingredient_diet_type: "Vegan",
  ingredient_calories: 0,
  ingredient_quantity: 0,
  ingredient_unit: "kg",
});

const IngredientsArray = ({ control, register }: IngredientsArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="mt-4 grid gap-3">
      <button
        type="button"
        className="w-fit rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-100 hover:text-neutral-950 hover:cursor-pointer"
        onClick={() => append(createEmptyIngredient())}
      >
        Ajouter une ligne
      </button>

      {fields.map((field, index) => {
        const nameId = `ingredient-name-${field.id}`;
        const dietId = `ingredient-diet-${field.id}`;
        const caloriesId = `ingredient-calories-${field.id}`;
        const quantityId = `ingredient-quantity-${field.id}`;
        const unitId = `ingredient-unit-${field.id}`;

        return (
          <div
            key={field.id}
            className="grid gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 md:grid-cols-[1.3fr_1fr_1fr_1fr_0.7fr_auto]"
          >
            <label htmlFor={nameId} className={labelClass}>
              Nom d’un ingrédient
              <input
                {...register(`ingredients.${index}.ingredient_name` as const, {
                  required: "Le nom de l'ingrédient est obligatoire",
                })}
                id={nameId}
                className={inputClass}
                placeholder="tomates"
              />
            </label>

            <label htmlFor={dietId} className={labelClass}>
              Régime
              <select
                {...register(`ingredients.${index}.ingredient_diet_type` as const, {
                  required: "Le régime de l'ingrédient est obligatoire",
                })}
                id={dietId}
                className={inputClass}
              >
                <option value="Vegetarien">Vegetarien</option>
                <option value="Vegan">Vegan</option>
                <option value="Classique">Classique</option>
              </select>
            </label>

            <label htmlFor={caloriesId} className={labelClass}>
              Calories
              <input
                {...register(`ingredients.${index}.ingredient_calories` as const, {
                  required: "Les calories de l'ingrédient sont obligatoires",
                  valueAsNumber: true,
                })}
                id={caloriesId}
                type="number"
                className={numberInputClass}
                placeholder="18"
              />
            </label>

            <label htmlFor={quantityId} className={labelClass}>
              Quantité
              <input
                {...register(`ingredients.${index}.ingredient_quantity` as const, {
                  required: "La quantité de l'ingrédient est obligatoire",
                  valueAsNumber: true,
                })}
                id={quantityId}
                type="number"
                step="0.01"
                className={numberInputClass}
                placeholder="4"
              />
            </label>

            <label htmlFor={unitId} className={labelClass}>
              Unité
              <select
                {...register(`ingredients.${index}.ingredient_unit` as const, {
                  required: "L'unité de l'ingrédient est obligatoire",
                })}
                id={unitId}
                className={inputClass}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="szt">szt</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => remove(index)}
              className="self-end rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 hover:cursor-pointer"
            >
              Supprimer
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsArray;
