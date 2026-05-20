import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Table, TableFooter, TableHead } from "@mui/material";
import type { UserOrderDTO } from "@/store/orders/userOrdersSlice";
import UserOrderActions from "@/components/espaceprive/UserOrderActions";
const columns = ["", "Order", "Price", "Status", "Date", "Actions"];

type OrdersTableProps = {
  orders: UserOrderDTO[];
  loading: boolean;
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 500 }}
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <TableHead>
          <TableRow>
            {columns.map((el, key) => (
              <TableCell key={key}>{el}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.resId}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Order #{order.resId}</TableCell>
              <TableCell align="right">{order.totalPrice}€</TableCell>
              <TableCell>{order.history[0].status}</TableCell>
              <TableCell>{new Date(order.eventDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <UserOrderActions
                  order={order}
                  onCancelOrder={function (
                    orderId: number | string,
                  ): Promise<void> | void {
                    throw new Error("Function not implemented.");
                  }}
                  onEditOrder={function (orderId: number | string): void {
                    throw new Error("Function not implemented.");
                  }}
                  onSubmitReview={function (data: {
                    orderId: number | string;
                    rating: number;
                    comment: string;
                  }): Promise<void> | void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={5}
              page={0}
              onPageChange={() => {}}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
export default OrdersTable;
