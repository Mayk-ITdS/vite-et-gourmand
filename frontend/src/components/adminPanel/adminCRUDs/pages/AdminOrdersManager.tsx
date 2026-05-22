import AdminCrudPage from "../components/AdminCrudPage";
import { ordersResource } from "../resources/userREsource";

const AdminOrdersManager = () => <AdminCrudPage resource={ordersResource} />;
export default AdminOrdersManager;
