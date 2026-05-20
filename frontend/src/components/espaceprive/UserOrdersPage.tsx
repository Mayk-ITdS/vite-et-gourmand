import { useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import OrdersTable from "@/components/ui/widgets/OrdersTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyOrders } from "@/store/orders/userOrdersSlice";

const UserOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.userOrders.list);
  const status = useAppSelector((state) => state.userOrders.status);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;

    return orders.filter((order: any) => {
      const currentStatus = String(
        order.status ?? order.current_status ?? order.reservation_status ?? "",
      ).toLowerCase();

      return currentStatus === statusFilter;
    });
  }, [orders, statusFilter]);

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
            <Typography
              variant="h5"
              sx={{ mb: 1 }}
            >
              Mes commandes
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.65)" }}
            >
              Consultez l’ensemble de vos commandes et accédez au détail du suivi.
            </Typography>
          </Box>

          <TextField
            select
            size="small"
            label="Filtrer par statut"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="all">Tous les statuts</MenuItem>
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="confirmed">Accepté</MenuItem>
            <MenuItem value="en préparation">En préparation</MenuItem>
            <MenuItem value="en cours de livraison">En livraison</MenuItem>
            <MenuItem value="livré">Livré</MenuItem>
            <MenuItem value="terminée">Terminée</MenuItem>
            <MenuItem value="cancelled">Annulée</MenuItem>
          </TextField>
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 2,
            p: 2,
          }}
        >
          <OrdersTable
            orders={filteredOrders}
            loading={status === "loading"}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default UserOrdersPage;
