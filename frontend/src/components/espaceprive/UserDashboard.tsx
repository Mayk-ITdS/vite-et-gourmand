import { useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import OrdersTable from "@/components/espaceprive/OrdersTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyOrders } from "@/store/orders/userOrdersSlice";

import { useOrdersActionManager } from "./useOrdersActionManager";
import MyReviewsPanel from "./MyReviewsPanel";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.userOrders.list);
  const status = useAppSelector((state) => state.userOrders.status);
  const { handleSubmitReview } = useOrdersActionManager();

  useEffect(() => {
    void dispatch(fetchMyOrders());
  }, [dispatch]);

  const activeOrders = orders.filter(
    (ord) => !["cancelled", "completed"].includes(ord.history[0]?.status ?? ""),
  );

  return (
    <Paper
      variant="glass"
      elevation={2}
      sx={{ borderRadius: "12px", p: { xs: 2, md: 3 } }}
    >
      <Box sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "#d4af37", letterSpacing: "0.18em" }}
          >
            Espace personnel
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: 1 }}
          >
            Tableau de bord
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.65)" }}
          >
            Retrouvez vos dernières commandes, leur suivi et les actions disponibles.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <SummaryCard
            label="Commandes totales"
            value={orders.length}
          />
          <SummaryCard
            label="Commandes en cours"
            value={activeOrders.length}
          />
          <SummaryCard
            label="Avis possibles"
            value={
              orders.filter((order) => {
                const latestStatus = order.history.at(-1)?.status ?? "";

                return ["completed", "terminée"].includes(
                  String(latestStatus).toLowerCase(),
                );
              }).length
            }
          />
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Dernières commandes</Typography>

            <Button
              component={Link}
              to="/espaceprive/orders"
              size="small"
              variant="outlined"
            >
              Voir toutes
            </Button>
          </Box>

          <OrdersTable
            orders={orders}
            loading={status === "loading"}
            onSubmitReview={handleSubmitReview}
          />
        </Box>

        <MyReviewsPanel />
      </Box>
    </Paper>
  );
};

const SummaryCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        p: 2.5,
        background:
          "linear-gradient(135deg, rgba(126,37,59,0.18), rgba(212,175,55,0.06))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "transform 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(212,175,55,0.35)",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.7)" }}
      >
        {label}
      </Typography>

      <Typography
        variant="h4"
        sx={{ mt: 1, fontWeight: 700 }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default UserDashboard;
