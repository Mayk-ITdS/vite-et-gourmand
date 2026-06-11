import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import api from "@/utils/api";

type MyReviewStatus = "pending" | "approved" | "rejected";

type MyReview = {
  _id: string;
  orderId: number;
  content: string;
  score: number;
  isApproved?: boolean;
  status?: MyReviewStatus;
  rejectionReason?: string | null;
};

const resolveStatus = (review: MyReview): MyReviewStatus => {
  if (review.status) return review.status;
  return review.isApproved ? "approved" : "pending";
};

const statusChip: Record<
  MyReviewStatus,
  { label: string; color: "default" | "success" | "warning" | "error" }
> = {
  pending: { label: "En attente de modération", color: "warning" },
  approved: { label: "Publié", color: "success" },
  rejected: { label: "Refusé", color: "error" },
};

const MyReviewsPanel = () => {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const { data } = await api.get("/reviews/mine");
        if (active) {
          setReviews(Array.isArray(data) ? data : []);
        }
      } catch {
        if (active) setReviews([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  if (loading || reviews.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Mes avis
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        {reviews.map((review) => {
          const status = resolveStatus(review);
          const chip = statusChip[status];

          return (
            <Box
              key={review._id}
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2,
                p: 2,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Réservation #{review.orderId} — Note {review.score}/5
                </Typography>

                <Chip
                  size="small"
                  label={chip.label}
                  color={chip.color}
                />
              </Box>

              <Typography variant="body2">{review.content}</Typography>

              {status === "rejected" && (
                <Box
                  sx={{
                    mt: 1.5,
                    borderRadius: 1.5,
                    border: "1px solid rgba(244,67,54,0.4)",
                    background: "rgba(244,67,54,0.08)",
                    p: 1.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#f48a82" }}
                  >
                    Avis refusé pour non-respect des standards
                  </Typography>

                  {review.rejectionReason && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, color: "rgba(255,255,255,0.75)" }}
                    >
                      Motif : {review.rejectionReason}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MyReviewsPanel;
