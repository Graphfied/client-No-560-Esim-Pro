export default function TransactionTable() {
  const tableData = [
    { date: "2023-12-30", description: "OPENING BALANCE", amount: "+0.00" },
    // { date: "2023-12-30", description: "OPENING BALANCE", amount: "+0.00" },
    // { date: "2023-12-30", description: "OPENING BALANCE", amount: "+0.00" },
  ];
  return (
    <div className="my-3">
      <h2 className="text-base sm:text-lg ">Transaction History</h2>
      <table className="bg-white border border-gray-300 w-full text-gray-700 mt-2">
        <thead>
          <tr className="text-sm">
            <th className="text-left py-2 pl-2">DATE</th>
            <th className="text-left py-2 px-2">DESCRIPTION</th>
            <th className="text-right py-2 pr-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr
              key={index}
              className="text-center border border-b text-sm sm:text-base"
            >
              <td className="text-left py-1 pl-2">{item.date}</td>
              <td className="text-left py-1 px-2">{item.description}</td>
              <td className="text-right py-1 pr-2">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
