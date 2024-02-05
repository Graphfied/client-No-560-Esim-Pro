import { getAdminUserData } from "@/actions/getAdminUserData";
import AdminUserTable from "@/views/Admin/UserPage/AdminUserTable";

const AdminUserPage = async () => {
  const userData: any = await getAdminUserData();

  // console.log("🚀 ~ AdminUserPage ~ rewardHistoryData:", rewardHistoryData);
  return (
    <div className=" my-7 px-7">
      {/* Heading */}
      <div className=" mb-3">
        <h1 className=" text-xl font-medium">Manage users</h1>
        <p className="">Manage budgets for users</p>
      </div>

      <div className="">
        <AdminUserTable data={userData} />
      </div>
    </div>
  );
};

export default AdminUserPage;
