import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type {
  AdminField,
  AdminFormData,
  AdminFormValue,
  AdminOptionValue,
  AdminRow,
} from "../adminCrud.types";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

type ResourceFormDialogProps = {
  open: boolean;
  fields: AdminField[];
  initialValues?: AdminRow | null;
  onClose: () => void;
  onSubmit: (data: AdminFormData) => Promise<void> | void;
};
const adminSelectSx: SxProps<Theme> = {
  "& .MuiInputLabel-root": {
    color: "#cbd5e1",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fbbf24",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "#0f172a",
    borderRadius: "0.75rem",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(251,191,36,0.7)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fbbf24",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.1)",
  },
  "& .MuiSvgIcon-root": {
    color: "#cbd5e1",
  },
};
const adminSelectMenuProps = {
  PaperProps: {
    sx: {
      mt: 1,
      maxHeight: 280,
      borderRadius: "0.75rem",
      border: "1px solid rgba(255,255,255,0.1)",
      backgroundColor: "#020617",
      backgroundImage: "none",
      color: "#e5e7eb",
      boxShadow: "0 24px 80px rgba(0,0,0,0.55)",

      scrollbarWidth: "none",
      msOverflowStyle: "none",

      "&::-webkit-scrollbar": {
        display: "none",
      },

      "& .MuiList-root": {
        paddingTop: "0.35rem",
        paddingBottom: "0.35rem",
      },

      "& .MuiMenuItem-root": {
        fontSize: "0.875rem",
        minHeight: "2.5rem",
      },

      "& .MuiMenuItem-root:hover": {
        backgroundColor: "rgba(251,191,36,0.12)",
      },

      "& .Mui-selected": {
        backgroundColor: "rgba(251,191,36,0.18) !important",
      },

      "& .MuiCheckbox-root": {
        color: "#94a3b8",
      },

      "& .MuiCheckbox-root.Mui-checked": {
        color: "#fbbf24",
      },
    },
  },
};
const isOptionValue = (value: unknown): value is AdminOptionValue => {
  return typeof value === "string" || typeof value === "number";
};

const toOptionValueArray = (value: unknown): AdminOptionValue[] => {
  if (!Array.isArray(value)) return [];

  return value.filter(isOptionValue);
};

const toInputValue = (value: unknown): string | number => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return "";
};

const buildInitialFormValues = (
  fields: AdminField[],
  initialValues?: AdminRow | null,
): AdminFormData => {
  return fields.reduce<AdminFormData>((acc, field) => {
    const existingValue = initialValues?.[field.name];

    if (field.type === "multiselect") {
      acc[field.name] = toOptionValueArray(existingValue);
      return acc;
    }

    if (field.type === "boolean") {
      acc[field.name] = Boolean(existingValue);
      return acc;
    }

    if (field.type === "number") {
      acc[field.name] =
        typeof existingValue === "number" || typeof existingValue === "string"
          ? existingValue
          : "";
      return acc;
    }

    if (existingValue !== undefined && existingValue !== null) {
      acc[field.name] = toInputValue(existingValue);
      return acc;
    }

    acc[field.name] = "";
    return acc;
  }, {});
};

const normalizeFormValues = (
  fields: AdminField[],
  values: AdminFormData,
): AdminFormData => {
  return fields.reduce<AdminFormData>((acc, field) => {
    const value = values[field.name];

    if (field.type === "number") {
      acc[field.name] = value === "" ? null : Number(value);
      return acc;
    }

    if (field.type === "boolean") {
      acc[field.name] = Boolean(value);
      return acc;
    }

    if (field.type === "multiselect") {
      acc[field.name] = toOptionValueArray(value);
      return acc;
    }

    acc[field.name] = value;
    return acc;
  }, {});
};

const ResourceFormDialog = ({
  open,
  fields,
  initialValues,
  onClose,
  onSubmit,
}: ResourceFormDialogProps) => {
  const [formValues, setFormValues] = useState<AdminFormData>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(initialValues);

  const title = useMemo(() => {
    return isEditMode ? "Modifier l’élément" : "Ajouter un élément";
  }, [isEditMode]);

  useEffect(() => {
    if (!open) return;

    setFormValues(buildInitialFormValues(fields, initialValues));
  }, [open, fields, initialValues]);

  if (!open) {
    return null;
  }

  const updateField = (name: string, value: AdminFormValue) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const payload = normalizeFormValues(fields, formValues);
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="
          flex max-h-[100dvh] w-full flex-col overflow-hidden
          rounded-t-3xl border border-white/10 bg-slate-950 shadow-2xl
          sm:max-h-[calc(100dvh-2rem)] sm:max-w-2xl sm:rounded-2xl
        "
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">
              Renseignez les champs du formulaire administratif.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-slate-400 hover:bg-white/10 hover:text-white"
          >
            Fermer
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="no-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            {fields.map((field) => {
              const value = formValues[field.name];

              if (field.type === "textarea") {
                return (
                  <div
                    key={field.name}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-slate-200">
                      {field.label}
                      {field.required && <span className="ml-1 text-red-400">*</span>}
                    </label>

                    <textarea
                      value={toInputValue(value)}
                      required={field.required}
                      placeholder={field.placeholder}
                      onChange={(event) => updateField(field.name, event.target.value)}
                      className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-400"
                    />
                  </div>
                );
              }

              if (field.type === "select") {
                const selectedValue = isOptionValue(value) ? value : "";

                return (
                  <FormControl
                    fullWidth
                    key={field.name}
                    margin="normal"
                    required={field.required}
                    sx={adminSelectSx}
                  >
                    <InputLabel>{field.label}</InputLabel>

                    <Select<AdminOptionValue | "">
                      value={selectedValue}
                      label={field.label}
                      MenuProps={adminSelectMenuProps}
                      onChange={(event) => {
                        const rawValue = event.target.value;

                        const selectedOption = field.options?.find(
                          (option) => String(option.value) === String(rawValue),
                        );

                        updateField(field.name, selectedOption?.value ?? "");
                      }}
                    >
                      <MenuItem value="">
                        <em>Sélectionner...</em>
                      </MenuItem>

                      {field.options?.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              if (field.type === "multiselect") {
                const selectedValues = toOptionValueArray(value);

                return (
                  <FormControl
                    fullWidth
                    key={field.name}
                    margin="normal"
                    sx={adminSelectSx}
                  >
                    <InputLabel>{field.label}</InputLabel>

                    <Select<AdminOptionValue[]>
                      multiple
                      label={field.label}
                      value={selectedValues}
                      MenuProps={adminSelectMenuProps}
                      onChange={(event) => {
                        const nextValue = event.target.value;

                        updateField(
                          field.name,
                          typeof nextValue === "string"
                            ? nextValue.split(",")
                            : toOptionValueArray(nextValue),
                        );
                      }}
                      renderValue={(selected) =>
                        selected
                          .map((selectedValue) => {
                            const option = field.options?.find(
                              (opt) => opt.value === selectedValue,
                            );

                            return option?.label ?? String(selectedValue);
                          })
                          .join(", ")
                      }
                    >
                      {field.options?.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          <Checkbox checked={selectedValues.includes(option.value)} />
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              if (field.type === "boolean") {
                return (
                  <label
                    key={field.name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-slate-200"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(event) => updateField(field.name, event.target.checked)}
                      className="h-4 w-4"
                    />
                    {field.label}
                  </label>
                );
              }

              if (field.type === "image") {
                const imageSrc = typeof value === "string" ? value : "";

                return (
                  <div
                    key={field.name}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-slate-200">
                      {field.label}
                      {field.required && <span className="ml-1 text-red-400">*</span>}
                    </label>

                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt="Aperçu"
                        className="h-40 w-full rounded-xl border border-white/10 object-cover"
                      />
                    )}

                    <input
                      type="text"
                      value={imageSrc}
                      required={field.required}
                      placeholder={field.placeholder ?? "/assets-webp/menu-example.webp"}
                      onChange={(event) => updateField(field.name, event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-400"
                    />
                  </div>
                );
              }

              return (
                <div
                  key={field.name}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-slate-200">
                    {field.label}
                    {field.required && <span className="ml-1 text-red-400">*</span>}
                  </label>

                  <input
                    type={field.type === "number" ? "number" : field.type}
                    value={toInputValue(value)}
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-400"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t border-white/10 bg-slate-950 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceFormDialog;
