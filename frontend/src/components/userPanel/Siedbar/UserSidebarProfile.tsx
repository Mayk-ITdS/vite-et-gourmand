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
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: "#6E0F1A" }}>{user.firstName?.[0]}</Avatar>

        <Box>
          <Typography>
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography>{profile?.email}</Typography>
          <Typography>
            {profile?.city}, {profile?.country}
          </Typography>
        </Box>
      </Box>

      <Button size="small" onClick={() => setOpenEdit(true)}>
        Edit profile
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
