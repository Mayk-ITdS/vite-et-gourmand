import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Table, TableFooter, TableHead } from "@mui/material";
const columns = ["", "Order", "Price", "Status", "Date", "Actions"];
type OrdersTableProps = {
  orders: any[];
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
          {Array.from(orders).map((order) => (
            <TableRow key={order.res_id}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Order #{order.res_id}</TableCell>
              <TableCell align="right">{order.total_price}€</TableCell>
              <TableCell>{order.res_status}</TableCell>
              <TableCell>{order.date_res_for}</TableCell>
              <TableCell>…</TableCell>
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
