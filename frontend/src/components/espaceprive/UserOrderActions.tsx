import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserReviewDialog from "./UserReviewDialog";
import type { UserOrderDTO } from "@/store/orders/userOrdersSlice";

export interface OrderActionsProps {
  order: UserOrderDTO;
  onCancelOrder: (orderId: number | string) => Promise<void> | void;
  onEditOrder: (orderId: number | string) => void;
  onSubmitReview: (data: {
    orderId: number;
    rating: number;
    content: string;
    pseudo: string;
    avatar: string | null;
  }) => Promise<void> | void;
}

const UserOrderActions = ({
  order,
  onCancelOrder,
  onEditOrder,
  onSubmitReview,
}: OrderActionsProps) => {
  const [openReview, setOpenReview] = useState(false);
  const orderId = order.resId;
  const status = order.history[0].status;
  const canModify = !["accepted", "confirmed", "accepté"].includes(status);
  const canCancel = !["accepted", "confirmed", "accepté"].includes(status);
  const canReview = ["completed", "terminée"].includes(status);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
      {canModify && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onEditOrder(orderId)}
        >
          Modifier
        </Button>
      )}

      {canCancel && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onCancelOrder(orderId)}
        >
          Annuler
        </Button>
      )}

      {canReview && (
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenReview(true)}
        >
          Donner un avis
        </Button>
      )}

      {!canModify && !canCancel && !canReview && (
        <Button
          disabled
          size="small"
        >
          Aucune action disponible
        </Button>
      )}

      <UserReviewDialog
        open={openReview}
        orderId={orderId}
        onClose={() => setOpenReview(false)}
        onSubmitReview={onSubmitReview}
      />
    </Box>
  );
};

export default UserOrderActions;
