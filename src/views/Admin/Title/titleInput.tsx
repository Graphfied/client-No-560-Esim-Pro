"use client";
import { UpdateSiteTitle } from "@/actions/UpdateSiteTitle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function TitleInput({ Title }: { Title: string }) {
  const [title, setTitle] = useState(Title);
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleButtonClick = async () => {
    // You can perform any action you want with the entered title
    // console.log("Entered Title:", title);
    try {
      setisLoading(true);

      const response = await UpdateSiteTitle({
        title: title,
      });
      toast.success(`Site Title Update ${title}`);
      window.location.reload();
      return response;
    } catch (error: any) {
      console.log("Unable to update the title", error.message);
      toast.error("Unable to update the title", error.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="flex flex-col bg-white rounded-md p-4 mt-5 items-start gap-y-4 sm:w-full lg:max-w-[60%]">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Enter site tile"
        className="mt-1 p-2 border rounded-md w-full"
      />
      <Button
        disabled={isLoading}
        onClick={handleButtonClick}
        className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] w-full"
      >
        Submit
      </Button>
    </div>
  );
}
