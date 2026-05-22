import AdminCrudPage from "../components/AdminCrudPage";
import { usersResource } from "../resources/userREsource";

const AdminGestionUsers = () => <AdminCrudPage resource={usersResource} />;
export default AdminGestionUsers;
