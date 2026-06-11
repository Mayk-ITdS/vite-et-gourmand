import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type ReasonDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  label?: string;
  defaultValue?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
};

export const ReasonDialog = ({
  open,
  title,
  description,
  label = "Motif",
  defaultValue = "",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  loading = false,
  onCancel,
  onConfirm,
}: ReasonDialogProps) => {
  const [reason, setReason] = useState(defaultValue);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      fullWidth
      maxWidth="sm"
      aria-labelledby="reason-dialog-title"
    >
      <DialogTitle id="reason-dialog-title">{title}</DialogTitle>

      <DialogContent>
        {description && (
          <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
        )}

        <TextField
          autoFocus
          fullWidth
          multiline
          minRows={3}
          label={label}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          disabled={loading}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={loading}
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={() => onConfirm(reason)}
          color="error"
          variant="contained"
          disabled={loading || reason.trim().length === 0}
        >
          {loading ? "Traitement..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReasonDialog;
