import { useAppSelector } from "@/store/hooks";
import {
  selectAverageRevenue,
  selectTotalRevenue,
} from "@/store/slices/adminSelectors";

const RevenueSummaryCard = () => {
  const totalRevenue = useAppSelector(selectTotalRevenue);
  const average = useAppSelector(selectAverageRevenue);

  return (
    <div className="bg-[#1f2937] p-6 rounded-xl border border-white/10">
      <p className="text-gray-400 text-sm">Total Revenue</p>
      <h3 className="text-2xl font-semibold mt-2">
        {totalRevenue.toLocaleString()} €
      </h3>

      <p className="text-gray-400 text-sm mt-4">Average Revenue per Order</p>
      <h4 className="text-xl mt-2">{average.toFixed(2)} €</h4>
    </div>
  );
};
export default RevenueSummaryCard;
