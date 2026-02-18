import { useAppSelector } from "@/store/hooks";

const AdminDataTable = () => {
  const menus = useAppSelector((state) => state.menus.list.data);
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-gray-400 text-sm border-b border-white/10">
          <th className="py-4">Name</th>
          <th>Price</th>
          <th>Status</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {menus.map((menu) => (
          <tr key={menu.menu_id} className="border-b border-white/5">
            <td className="py-4">{menu.menu_name}</td>
            <td>{menu.prix_unitaire}€</td>
            <td>
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                Active
              </span>
            </td>
            <td className="text-right space-x-2">
              <button className="text-blue-400">Edit</button>
              <button className="text-red-400">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AdminDataTable;
