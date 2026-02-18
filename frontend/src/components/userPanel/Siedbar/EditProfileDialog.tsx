import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { updateProfile } from "@/store/slices/userProfileSlice";
import { type Profile } from "@/types/UserProps";
type Props = {
  open: boolean;
  onClose: () => void;
  profile: Profile | null;
};

const EditProfileDialog = ({ open, onClose, profile }: Props) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        city: profile.city,
        country: profile.country,
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await dispatch(updateProfile(form));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>

      <DialogContent>
        <Box display="grid" gap={2} mt={1}>
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <TextField
            label="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <TextField
            label="Country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
