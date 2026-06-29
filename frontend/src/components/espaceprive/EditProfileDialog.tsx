import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { updateProfile } from "@/store/slices/userProfileSlice";
import { type Profile } from "@/types/UserProps";

type Props = {
  open: boolean;
  onClose: () => void;
  profile: Profile | null;
};

type ProfileForm = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  country: string;
};

const createInitialUserForm = (initialProfile: Profile | null): ProfileForm => ({
  firstName: initialProfile?.firstName ?? "",
  lastName: initialProfile?.lastName ?? "",
  mobileNumber: initialProfile?.mobileNumber ?? "",
  city: initialProfile?.city ?? "",
  street: initialProfile?.street ?? "",
  houseNumber:
    initialProfile?.houseNumber !== undefined && initialProfile?.houseNumber !== null
      ? String(initialProfile.houseNumber)
      : "",
  zipCode: initialProfile?.zipCode ?? "",
  country: initialProfile?.country ?? "",
});

const EditProfileDialog = ({ open, onClose, profile }: Props) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<ProfileForm>(() => createInitialUserForm(profile));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(createInitialUserForm(profile));
      setError(null);
    }
  }, [open, profile]);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);

      await dispatch(
        updateProfile({
          firstName: form.firstName,
          lastName: form.lastName,
          mobileNumber: form.mobileNumber,
          city: form.city,
          street: form.street,
          houseNumber: Number(form.houseNumber) || 0,
          zipCode: form.zipCode,
          country: form.country,
        }),
      ).unwrap();

      onClose();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la mise à jour du profil",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Modifier le profil</DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          gap={2}
          mt={1}
        >
          <TextField
            label="Prénom"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <TextField
            label="Nom"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <TextField
            label="Téléphone"
            value={form.mobileNumber}
            onChange={(e) => handleChange("mobileNumber", e.target.value)}
          />
          <TextField
            label="Rue"
            value={form.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />
          <TextField
            label="Numéro"
            value={form.houseNumber}
            onChange={(e) => handleChange("houseNumber", e.target.value)}
          />
          <TextField
            label="Code postal"
            value={form.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
          />
          <TextField
            label="Ville"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <TextField
            label="Pays"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
          {error && (
            <Box
              sx={{
                border: "1px solid rgba(239,68,68,0.25)",
                bgcolor: "rgba(239,68,68,0.08)",
                color: "#b91c1c",
                borderRadius: 2,
                p: 1.5,
                fontSize: 14,
              }}
            >
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={saving}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditProfileDialog;
