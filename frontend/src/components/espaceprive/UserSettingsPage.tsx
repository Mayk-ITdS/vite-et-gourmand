import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import EditProfileDialog from "@/components/espaceprive/EditProfileDialog";

const UserSettingsPage = () => {
  const profile = useAppSelector((state) => state.profile.data);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Paper
      variant="glass"
      elevation={2}
      sx={{ borderRadius: "12px", p: 3 }}
    >
      <Box sx={{ display: "grid", gap: 3 }}>
        <Box>
          <Typography
            variant="h5"
            sx={{ mb: 1 }}
          >
            Paramètres du compte
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.65)" }}
          >
            Consultez et modifiez vos informations personnelles.
          </Typography>
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 2,
            p: 2,
            display: "grid",
            gap: 1.5,
          }}
        >
          <ProfileRow
            label="Prénom"
            value={profile?.firstName}
          />
          <ProfileRow
            label="Nom"
            value={profile?.lastName}
          />
          <ProfileRow
            label="Email"
            value={profile?.email}
          />
          <ProfileRow
            label="Téléphone"
            value={profile?.phone}
          />
          <ProfileRow
            label="Ville"
            value={profile?.city}
          />
          <ProfileRow
            label="Pays"
            value={profile?.country}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={() => setOpenEdit(true)}
          >
            Modifier mes informations
          </Button>
        </Box>

        <EditProfileDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          profile={profile}
        />
      </Box>
    </Paper>
  );
};

const ProfileRow = ({ label, value }: { label: string; value?: string | null }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.6)" }}
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{ textAlign: "right" }}
      >
        {value || "—"}
      </Typography>
    </Box>
  );
};

export default UserSettingsPage;
