const AdminDashboard = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold tracking-wide">System Overview</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value="124" />
        <StatCard title="Active Menus" value="12" />
        <StatCard title="Users" value="87" />
        <StatCard title="Revenue" value="18 450€" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: any) => (
  <div className="bg-[#1f2937] border border-white/10 p-6 rounded-xl">
    <p className="text-sm text-gray-400">{title}</p>
    <h3 className="text-2xl font-semibold mt-4">{value}</h3>
  </div>
);
export default AdminDashboard;
