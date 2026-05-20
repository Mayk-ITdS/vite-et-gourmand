import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyOrders } from "@/store/orders/userOrdersSlice";
import UserOrderStatusBadge from "@/components/espaceprive/UserOrderStatusBadge";
import UserOrderTimeline from "@/components/espaceprive/UserOrderTimeline";
import UserOrderActions from "@/components/espaceprive/UserOrderActions";
// import { cancelMyOrder } from "@/store/orders/userOrdersSlice";
// import { createReview } from "@/store/reviews/reviewsSlice";

const UserOrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.userOrders.list);
  const status = useAppSelector((state) => state.userOrders.status);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, orders.length]);

  const order = useMemo(() => {
    return orders.find((item: any) => {
      const id = item.order_id ?? item.reservation_id ?? item.id;
      return String(id) === String(orderId);
    });
  }, [orders, orderId]);

  const handleCancelOrder = async (id: number | string) => {
    // await dispatch(cancelMyOrder(id)).unwrap();
    console.log("cancel order", id);
  };

  const handleEditOrder = (id: number | string) => {
    navigate(`/espaceprive/orders/${id}/edit`);
  };

  const handleSubmitReview = async (data: {
    orderId: number | string;
    rating: number;
    comment: string;
  }) => {
    // await dispatch(createReview(data)).unwrap();
    console.log("review", data);
  };

  if (status === "loading") {
    return (
      <Paper
        variant="glass"
        sx={{ borderRadius: 2, p: 3 }}
      >
        Chargement de la commande...
      </Paper>
    );
  }

  if (!order) {
    return (
      <Paper
        variant="glass"
        sx={{ borderRadius: 2, p: 3 }}
      >
        <Typography variant="h6">Commande introuvable</Typography>

        <Button
          sx={{ mt: 2 }}
          onClick={() => navigate("/espaceprive/orders")}
        >
          Retour aux commandes
        </Button>
      </Paper>
    );
  }

  const currentStatus = status;
  const history = status;

  return (
    <Paper
      variant="glass"
      elevation={2}
      sx={{ borderRadius: "12px", p: 3 }}
    >
      <Box sx={{ display: "grid", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5">Commande #{order.resId}</Typography>

            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.65)", mt: 1 }}
            >
              Détail de la prestation, suivi et actions disponibles.
            </Typography>
          </Box>

          <UserOrderStatusBadge status={currentStatus} />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <InfoBlock
            title="Informations prestation"
            rows={[
              ["Menu", order.menuId ?? "—"],
              ["Date", order.eventDate ?? "—"],
              ["Heure", order.eventDate ?? "—"],
              ["Adresse", "—"],
              ["Nombre de personnes", order.noPersons ?? "—"],
            ]}
          />

          <InfoBlock
            title="Prix"
            rows={[
              ["Prix menu", formatCurrency(order.unitPriceSnapshot)],
              ["Livraison", formatCurrency("ünknown")],
              ["Total", formatCurrency(order.totalPrice)],
            ]}
          />
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            Suivi de la commande
          </Typography>

          <UserOrderTimeline history={order.history} />
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            Actions
          </Typography>

          <UserOrderActions
            order={order}
            onCancelOrder={handleCancelOrder}
            onEditOrder={handleEditOrder}
            onSubmitReview={handleSubmitReview}
          />
        </Box>
      </Box>
    </Paper>
  );
};

const InfoBlock = ({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, unknown]>;
}) => {
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
        {title}
      </Typography>

      <Box sx={{ display: "grid", gap: 1.5 }}>
        {rows.map(([label, value]) => (
          <Box
            key={label}
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
              {String(value ?? "—")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const formatCurrency = (value: unknown) => {
  if (value === undefined || value === null || value === "") return "—";

  return `${Number(value).toFixed(2)} €`;
};

export default UserOrderDetailsPage;
