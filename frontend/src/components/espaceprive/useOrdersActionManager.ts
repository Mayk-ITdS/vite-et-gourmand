import { useCallback } from "react";

import { useAppDispatch } from "@/store/hooks";
import { cancelOrder } from "@/store/orders/userOrdersSlice";
import { createReview } from "@/store/reviews";

type SubmitReviewData = {
  pseudo: string;
  orderId: number;
  rating: number;
  content: string;
  avatar: string | null;
};

export const useOrdersActionManager = () => {
  const dispatch = useAppDispatch();

  const handleSubmitReview = useCallback(
    async (data: SubmitReviewData) => {
      await dispatch(
        createReview({
          resId: data.orderId,
          payload: {
            orderId: data.orderId,
            pseudo: data.pseudo,
            rating: data.rating,
            content: data.content,
            avatar: data.avatar,
          },
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const handleCancelOrder = useCallback(
    async (id: number | string) => {
      await dispatch(cancelOrder(Number(id))).unwrap();
    },
    [dispatch],
  );

  return {
    handleSubmitReview,
    handleCancelOrder,
  };
};
