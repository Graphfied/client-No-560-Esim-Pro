import { getAdminKeys } from "@/actions/getAdminKeys";
import { KeyInputs } from "@/views/Admin/API/KeyInputs";

const RewardsPage = async () => {
  const getadminKeys: any = await getAdminKeys();

  return (
    <div className="my-7 px-7">
      {/* Heading */}
      <div className=" mb-3">
        <h1 className=" text-xl font-medium">API Dashboard</h1>
        <p className="text-txtgrey/90 font-medium text-sm">
          View and update API Keys
        </p>
      </div>

      <KeyInputs adminKeys={getadminKeys[0]} />
    </div>
  );
};

export default RewardsPage;
