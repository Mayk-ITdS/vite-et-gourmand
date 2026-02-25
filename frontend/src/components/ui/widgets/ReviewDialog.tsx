import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createReview } from "@/store/reviews";

type ReviewDialogProps = {
  open: boolean;
  orderId: number | null;
  onClose: () => void;
};

const ReviewDialog = ({ open, orderId, onClose }: ReviewDialogProps) => {
  const dispatch = useAppDispatch();

  const [pseudo, setPseudo] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState<number | null>(5);

  const handleSubmit = () => {
    if (!orderId) return;

    dispatch(
      createReview({
        resId: orderId,
        payload: {
          orderId,
          pseudo,
          content,
          score: score ?? 5,
          avatar: null,
        },
      }),
    );

    onClose();
    setPseudo("");
    setContent("");
    setScore(5);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: "linear-gradient(145deg, #1e1e1e, #232323)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        },
      }}
    >
      <DialogTitle>Laisser un avis</DialogTitle>

      <DialogContent>
        <TextField
          label="Pseudo"
          fullWidth
          margin="normal"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />

        <Rating
          value={score}
          onChange={(_, newValue) => setScore(newValue)}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Votre avis"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReviewDialog;
