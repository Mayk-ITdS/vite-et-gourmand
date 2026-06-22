import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Table, TableHead } from "@mui/material";

import type { UserOrderDTO } from "@/store/orders/userOrdersSlice";
import UserOrderActions, {
  type OrderActionsProps,
} from "@/components/espaceprive/UserOrderActions";
import UserOrderStatusBadge from "@/components/espaceprive/UserOrderStatusBadge";

import { useOrdersActionManager } from "./useOrdersActionManager";

const columns = ["Commande", "Montant", "Statut", "Date", "Actions"];

type OrdersTableProps = Pick<OrderActionsProps, "onSubmitReview"> & {
  orders: UserOrderDTO[];
  loading: boolean;
};

const formatDate = (value: string) =>
  value ? new Date(value).toLocaleDateString("fr-FR") : "—";

const OrdersTable = ({ orders, onSubmitReview }: OrdersTableProps) => {
  const { handleCancelOrder } = useOrdersActionManager();

  if (!orders.length) {
    return (
      <Box
        sx={{
          py: 5,
          textAlign: "center",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <Typography variant="body2">Aucune commande pour le moment.</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Desktop : tableau */}
      <TableContainer sx={{ display: { xs: "none", md: "block" }, overflowX: "auto" }}>
        <Table
          sx={{ minWidth: 560 }}
          aria-label="Mes commandes"
          size="medium"
        >
          <TableHead>
            <TableRow>
              {columns.map((el) => (
                <TableCell
                  key={el}
                  sx={{
                    color: "#d4af37",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    borderColor: "rgba(255,255,255,0.10)",
                  }}
                >
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.resId}
                sx={{
                  transition: "background 0.2s ease",
                  "&:hover": { background: "rgba(126,37,59,0.12)" },
                  "& td": { borderColor: "rgba(255,255,255,0.06)" },
                }}
              >
                <TableCell sx={{ fontWeight: 600 }}>
                  Commande&nbsp;#{order.resId}
                </TableCell>
                <TableCell>{order.totalPrice} €</TableCell>
                <TableCell>
                  <UserOrderStatusBadge status={order.history[0]?.status} />
                </TableCell>
                <TableCell>{formatDate(order.eventDate)}</TableCell>
                <TableCell>
                  <UserOrderActions
                    order={order}
                    onCancelOrder={handleCancelOrder}
                    onEditOrder={() => {}}
                    onSubmitReview={onSubmitReview}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile : cartes */}
      <Box sx={{ display: { xs: "grid", md: "none" }, gap: 1.5 }}>
        {orders.map((order) => (
          <Box
            key={order.resId}
            sx={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderLeft: "3px solid #7e253b",
              borderRadius: 2,
              p: 2,
              background:
                "linear-gradient(135deg, rgba(126,37,59,0.10), rgba(255,255,255,0.02))",
              display: "grid",
              gap: 1.25,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                Commande&nbsp;#{order.resId}
              </Typography>
              <UserOrderStatusBadge status={order.history[0]?.status} />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.85rem",
              }}
            >
              <span>{formatDate(order.eventDate)}</span>
              <span style={{ fontWeight: 600, color: "#fff" }}>{order.totalPrice} €</span>
            </Box>

            <UserOrderActions
              order={order}
              onCancelOrder={handleCancelOrder}
              onEditOrder={() => {}}
              onSubmitReview={onSubmitReview}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};
export default OrdersTable;
