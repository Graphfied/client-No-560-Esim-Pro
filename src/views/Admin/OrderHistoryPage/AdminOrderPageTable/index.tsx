"use client";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { OrderhistoryFilters } from "../OrderHistoryFilters";
// import { DeleteAdminOrderHistory } from "@/actions/deleteAdminOrderHistory";

export const AdminOrderPageTable = ({
  data,
  usersData,
}: {
  data: {
    id?: number;
    userid?: string;
    orderid?: string;
    orderstate?:
      | "Created"
      | "Completed"
      | "Expired"
      | "Cancelled"
      | "Processing";
    merchantid?: string;
    externalid?: string;
    currencycode?: string;
    createdtime?: string;
    updatedtime?: string;
    productid?: string;
    productcategory?: string;
    cost?: string;
    title?: string;
    provider?: string;
    username?: string;
    userEmail?: string;
  }[];
  usersData: any;
}) => {
  const [filteredOrderNumber, setFilteredOrderNumber] = useState("");
  const [selectedUser, setselectedUser] = useState("");
  // console.log("🚀 ~ selectedUser:", selectedUser);

  // Use separate variables for filtering by order number and user
  let orderNumberFilteredData = data;
  let userFilteredData = data;

  // Function to format date
  const formatDateTime = (dateTimeString: string) => {
    const options: any = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateTimeString)
    );
  };

  const handleFilterChange = (orderNumber: string) => {
    // Handle order number filter change
    setFilteredOrderNumber(orderNumber);
    // You can also trigger a data fetch or update here based on the filters
  };

  const handleSortUserChange = (value: string) => {
    const userEmail = value === "ALL" ? "" : value;
    // console.log("Selected User ---> ", selectedUser);
    setselectedUser(userEmail);
  };

  const handleClearResults = () => {
    // Clear both filters when "Clear" button is clicked
    setFilteredOrderNumber("");
    setselectedUser("");
  };

  // Filter data based on the order number
  orderNumberFilteredData = data.filter((item) =>
    item.orderid?.includes(filteredOrderNumber)
  );

  userFilteredData = orderNumberFilteredData.filter((item) =>
    selectedUser === "" ? data : item.userEmail === selectedUser
  );

  // console.log("userFilteredData", userFilteredData);
  // async function handleDeleteHistory() {
  //   await DeleteAdminOrderHistory();
  // }
  return (
    <>
      <div className=" flex items-center justify-between">
        {/* <Button onClick={() => handleDeleteHistory()}>Delete all orders</Button> */}
        <OrderhistoryFilters
          usersData={usersData}
          onFilterChange={handleFilterChange}
          onSelectChange={handleSortUserChange}
          onClearResults={handleClearResults}
        />
      </div>
      <div className="my-3">
        {/* <h2 className="text-base sm:text-lg ">Transaction History</h2> */}
        <table className="bg-white border shadow-sm border-gray-300 w-full text-gray-700 mt-2">
          <thead>
            <tr className="text-sm">
              <th className="text-left py-2 pr-1 pl-2">Date</th>
              <th className="text-left py-2 px-1">Order #</th>
              <th className="text-left py-2 px-1">Status</th>
              <th className="text-left py-2 px-1">Product</th>
              <th className="text-left py-2 px-1">Provider</th>
              <th className="text-left py-2 px-1">Cost</th>
              <th className="text-left py-2 px-1">User</th>
            </tr>
          </thead>
          <tbody>
            {userFilteredData.map((item: any, index: any) => (
              <tr
                key={index}
                className="text-left border border-b text-sm sm:text-base"
              >
                <td className="text-left text-sm border sm:border-none p-1 pl-2 break-all">
                  {formatDateTime(item.updatedtime)}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.orderid}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.orderstate}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.title}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.provider}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.cost}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
