import AdminCrudPage from "@/components/adminPanel/adminCRUDs/components/AdminCrudPage";
import { reviewsModerationResource } from "@/components/adminPanel/adminCRUDs/resources/employeeResources";

const EmployeeReviews = () => <AdminCrudPage resource={reviewsModerationResource} />;

export default EmployeeReviews;
