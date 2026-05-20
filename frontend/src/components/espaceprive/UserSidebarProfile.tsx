import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import type { Profile } from "@/types/UserProps";

import EditProfileDialog from "./EditProfileDialog";

const UserSidebarProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state): Profile | null => state.profile.data);
  const [openEdit, setOpenEdit] = useState(false);

  if (!user) return null;

  const firstName = profile?.firstName ?? user.firstName ?? "";
  const lastName = profile?.lastName ?? user.lastName ?? "";
  const email = profile?.email ?? user.email ?? "";
  const city = profile?.city ?? "";
  const country = profile?.country ?? "";

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Avatar sx={{ bgcolor: "#6E0F1A" }}>
          {firstName?.[0]?.toUpperCase() ?? "U"}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={600}>
            {firstName} {lastName}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.65)" }}
          >
            {email}
          </Typography>

          {(city || country) && (
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.55)" }}
            >
              {[city, country].filter(Boolean).join(", ")}
            </Typography>
          )}
        </Box>
      </Box>

      <Button
        size="small"
        onClick={() => setOpenEdit(true)}
        sx={{ mt: 2 }}
      >
        Modifier le profil
      </Button>

      <EditProfileDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        profile={profile}
      />
    </Box>
  );
};

export default UserSidebarProfile;
