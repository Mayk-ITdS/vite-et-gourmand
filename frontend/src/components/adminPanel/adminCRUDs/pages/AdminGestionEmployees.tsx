import AdminCrudPage from "../components/AdminCrudPage";
import { employeesResource } from "../resources/userREsource";

const AdminGestionEmployees = () => <AdminCrudPage resource={employeesResource} />;
export default AdminGestionEmployees;
