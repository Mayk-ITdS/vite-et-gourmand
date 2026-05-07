const StatCard = ({ title, value }: any) => (
  <div className="bg-[#1f2937] border border-white/10 p-6 rounded-xl">
    <p className="text-sm text-gray-400">{title}</p>
    <h3 className="text-2xl font-semibold mt-4">{value}</h3>
  </div>
);
export default StatCard;
