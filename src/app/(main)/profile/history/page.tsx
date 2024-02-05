import ToggleButtons from "@/views/historypage/toggleButtons";
import { getOrderHistory } from "@/actions/getOrderHistory";
import { HistoryPageData } from "@/views/historypage/HistoryPageData";

const History = async ({
  searchParams,
}: {
  searchParams: { type: string; subType: string };
}) => {
  let data = await getOrderHistory();

  return (
    <div className="max-w-[26rem] mx-auto flex pt-4 justify-center">
      <div className="flex flex-col items-center space-y-4 px-3">
        <ToggleButtons />
        {/* History */}
        <HistoryPageData data={data} searchParams={searchParams} />
      </div>
    </div>
  );
};

export default History;
