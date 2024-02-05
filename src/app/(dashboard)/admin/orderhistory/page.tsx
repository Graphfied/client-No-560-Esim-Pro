import { getAdminOrderHistory } from "@/actions/getAdminOrderHistory";
import { getAdminUserData } from "@/actions/getAdminUserData";
import { AdminOrderPageTable } from "@/views/Admin/OrderHistoryPage/AdminOrderPageTable";

const AdminOrderHistory = async () => {
  const getorderData = await getAdminOrderHistory();
  // // Extracting userids from orderData and fetching user data
  const getUsersData = await getAdminUserData();

  const orderDataWithNamesAndEmail: any = getorderData?.map((item) => {
    const matchingUser = getUsersData?.find(
      (user) => String(user.userid) === String(item.userid)
    );

    return {
      ...item,
      username: matchingUser?.name ? matchingUser.name : "Unknown User",
      userEmail: matchingUser?.email || "Unknown Email",
    };
  });

  return (
    <div className=" my-7 px-7">
      {/* Heading */}
      <div className=" mb-3">
        <h1 className=" text-xl font-medium">Order History</h1>
      </div>
      <AdminOrderPageTable
        data={orderDataWithNamesAndEmail}
        usersData={getUsersData}
      />
    </div>
  );
};

export default AdminOrderHistory;
