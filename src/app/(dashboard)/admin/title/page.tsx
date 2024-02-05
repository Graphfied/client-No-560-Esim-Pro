import { GetSiteTitle } from "@/actions/getTitleKeys";
import TitleInput from "@/views/Admin/Title/titleInput";

export default async function Title() {
  const getTitle: any = await GetSiteTitle();
  return (
    <div className="my-7 px-7">
      {/* Heading */}
      <div className=" mb-3">
        <h1 className=" text-xl font-medium">Site Title</h1>
        <p className="text-txtgrey/90 font-medium text-sm">Update site title</p>
      </div>

      <TitleInput Title={getTitle[0]?.title} />
    </div>
  );
}
