import { useAppSelector } from "@/store/hooks";

const AdminDataTable = () => {
  const loading = useAppSelector((state) => state.adminAnalytics.loading);
  const menus = useAppSelector((state) => state.adminAnalytics.data?.menus);
  console.log(
    "ADMIN DATA:",
    useAppSelector((state) => state.adminAnalytics)
  );
  if (loading) {
    return <p className="text-white/60">Chargement du dashoard...</p>;
  } else {
    return (
      <table className="w-[50%] border-collapse">
        <thead>
          <tr className="text-left text-gray-400 text-sm border-b border-white/10">
            <th className="py-4">Menu Signature</th>
            <th>Total revenue per menu</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus &&
            menus.map((menu) => (
              <tr key={menu.menuId} className="border-b border-white/5">
                <td className="py-4">{menu.timesOrdered}</td>
                <td>{menu.totalRevenue}€</td>
                <td>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                    Active
                  </span>
                </td>
                <td className="text-right space-x-2">
                  <button className="text-blue-400 cursor-pointer">Edit</button>
                  <button className="text-red-400 cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
};
export default AdminDataTable;
