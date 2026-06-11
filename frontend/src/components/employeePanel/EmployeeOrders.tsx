import AdminCrudPage from "@/components/adminPanel/adminCRUDs/components/AdminCrudPage";
import { ordersConfirmResource } from "@/components/adminPanel/adminCRUDs/resources/employeeResources";

const EmployeeOrders = () => <AdminCrudPage resource={ordersConfirmResource} />;

export default EmployeeOrders;
