import AdminCrudPage from "../components/AdminCrudPage";
import { reviewsModerationResource } from "../resources/employeeResources";
const AdminGestionEmployees = () => (
  <AdminCrudPage resource={reviewsModerationResource} />
);
export default AdminGestionEmployees;
