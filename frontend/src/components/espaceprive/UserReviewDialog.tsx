import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  orderId: number | string;
  open: boolean;
  onClose: () => void;
  onSubmitReview: (data: {
    orderId: number | string;
    rating: number;
    comment: string;
  }) => Promise<void> | void;
};

const UserReviewDialog = ({ orderId, open, onClose, onSubmitReview }: Props) => {
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!rating) return;

    await onSubmitReview({
      orderId,
      rating,
      comment,
    });

    setComment("");
    setRating(5);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Donner un avis</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, pt: 1 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1 }}
            >
              Votre note
            </Typography>

            <Rating
              value={rating}
              onChange={(_, value) => setRating(value)}
            />
          </Box>

          <TextField
            label="Votre commentaire"
            multiline
            minRows={4}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!rating}
        >
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserReviewDialog;
